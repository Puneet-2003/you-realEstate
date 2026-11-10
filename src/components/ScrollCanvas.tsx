import React, { useEffect, useRef } from 'react';

const TOTAL_FRAMES = 358;
const KEYFRAME_STRIDE = 4;
// Number of initial keyframes required to warm the engine and guarantee fluid scroll
const CRITICAL_WARMUP_COUNT = 16;

export const ScrollCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Use desynchronized 2D context for minimal GPU latency
    const ctx = canvas.getContext('2d', {
      alpha: false,
      desynchronized: true
    });
    if (!ctx) return;

    // Pre-allocated frame arrays
    const frames: (HTMLImageElement | null)[] = new Array(TOTAL_FRAMES + 1).fill(null);
    const loadedMap = new Uint8Array(TOTAL_FRAMES + 1);
    const requestedMap = new Uint8Array(TOTAL_FRAMES + 1);

    let lastRenderedFrame = -1;
    let animFrameId = 0;
    let isAnimating = false;
    let isUserScrolling = false;
    let scrollIdleTimer = 0;
    let warmedUp = false;
    let loadedWarmupCount = 0;

    const getFrameUrl = (index: number) => {
      const padded = String(index).padStart(6, '0');
      return `/extracted_frames_webp/frames/frame_${padded}.webp`;
    };

    // Cache dimensions to avoid layout thrashing
    let cachedMaxScroll = 1;
    let cachedWidth = 1600;
    let cachedHeight = 900;

    const updateDimensions = () => {
      const scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight || 1;
      const innerHeight = window.innerHeight || 1;
      cachedMaxScroll = Math.max(1, scrollHeight - innerHeight);

      const w = window.innerWidth;
      const h = window.innerHeight;
      const isMobile = w < 768;

      // GPU fill-rate protection: 1600x900 on desktop, 960x540 on mobile
      const maxWidth = isMobile ? 960 : 1600;
      const maxHeight = isMobile ? 540 : 900;

      const dpr = Math.min(window.devicePixelRatio || 1, isMobile ? 1.0 : 1.25);
      const targetW = Math.min(maxWidth, Math.round(w * dpr));
      const targetH = Math.min(maxHeight, Math.round(h * dpr));

      if (canvas.width !== targetW || canvas.height !== targetH) {
        canvas.width = targetW;
        canvas.height = targetH;
        cachedWidth = targetW;
        cachedHeight = targetH;
      }

      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'medium';

      if (lastRenderedFrame > 0) {
        drawFrame(lastRenderedFrame);
      }
    };

    window.addEventListener('resize', updateDimensions, { passive: true });
    window.addEventListener('orientationchange', updateDimensions, { passive: true });
    updateDimensions();

    // Fast O(1) mathematical lookup with keyframe fallback
    const getBestAvailableImage = (targetIndex: number): HTMLImageElement | null => {
      // 1. Exact frame match
      if (loadedMap[targetIndex] && frames[targetIndex]) {
        return frames[targetIndex];
      }

      // 2. Immediate neighbor check (±1, ±2, ±3)
      for (let offset = 1; offset <= 3; offset++) {
        const lower = targetIndex - offset;
        if (lower >= 1 && loadedMap[lower] && frames[lower]) {
          return frames[lower];
        }
        const higher = targetIndex + offset;
        if (higher <= TOTAL_FRAMES && loadedMap[higher] && frames[higher]) {
          return frames[higher];
        }
      }

      // 3. Nearest keyframe check (O(1) stride math)
      const nearestKey = Math.max(1, Math.min(TOTAL_FRAMES, Math.round(targetIndex / KEYFRAME_STRIDE) * KEYFRAME_STRIDE));
      if (loadedMap[nearestKey] && frames[nearestKey]) {
        return frames[nearestKey];
      }

      // 4. Stride expansion
      for (let k = 1; k <= 15; k++) {
        const lowerK = nearestKey - k * KEYFRAME_STRIDE;
        if (lowerK >= 1 && loadedMap[lowerK] && frames[lowerK]) {
          return frames[lowerK];
        }
        const higherK = nearestKey + k * KEYFRAME_STRIDE;
        if (higherK <= TOTAL_FRAMES && loadedMap[higherK] && frames[higherK]) {
          return frames[higherK];
        }
      }

      // 5. Fallback to frame 1 if loaded
      return loadedMap[1] && frames[1] ? frames[1] : null;
    };

    // Aspect cover fit render
    const drawFrame = (index: number) => {
      const img = getBestAvailableImage(index);
      if (!img) return;

      const cw = cachedWidth;
      const ch = cachedHeight;
      const iw = img.naturalWidth || 1600;
      const ih = img.naturalHeight || 900;

      const scale = Math.max(cw / iw, ch / ih);
      const w = iw * scale;
      const h = ih * scale;
      const x = (cw - w) * 0.5;
      const y = (ch - h) * 0.5;

      ctx.drawImage(img, x, y, w, h);
      lastRenderedFrame = index;
    };

    // Frame targets for lerping
    let targetFrame = 1;
    let currentFrame = 1;

    // RAF Loop (runs ONLY when moving)
    const tick = () => {
      const diff = targetFrame - currentFrame;
      if (Math.abs(diff) < 0.04) {
        currentFrame = targetFrame;
      } else {
        currentFrame += diff * 0.24;
      }

      const frameIndex = Math.min(TOTAL_FRAMES, Math.max(1, Math.round(currentFrame)));
      if (frameIndex !== lastRenderedFrame) {
        drawFrame(frameIndex);
      }

      if (Math.abs(targetFrame - currentFrame) > 0.02) {
        animFrameId = requestAnimationFrame(tick);
      } else {
        isAnimating = false;
      }
    };

    const requestTick = () => {
      if (!isAnimating) {
        isAnimating = true;
        animFrameId = requestAnimationFrame(tick);
      }
    };

    // Loader queue with controlled concurrency
    const loadQueue: number[] = [];
    let activeLoads = 0;
    const MAX_CONCURRENT = 6;

    const loadSingleFrame = (index: number, onDone?: () => void) => {
      if (loadedMap[index] || frames[index]) {
        onDone?.();
        return;
      }

      const img = new Image();
      img.src = getFrameUrl(index);

      const markReady = () => {
        frames[index] = img;
        loadedMap[index] = 1;

        // Warm up metrics
        if (!warmedUp) {
          loadedWarmupCount++;
          const progress = Math.min(100, (loadedWarmupCount / CRITICAL_WARMUP_COUNT) * 100);
          window.dispatchEvent(new CustomEvent('novaris:progress', { detail: progress }));

          if (loadedWarmupCount >= CRITICAL_WARMUP_COUNT) {
            warmedUp = true;
            // Warm GPU texture pipeline by drawing frame 1
            drawFrame(1);
            window.dispatchEvent(new CustomEvent('novaris:ready'));
          }
        }

        if (index === 1 && lastRenderedFrame === -1) {
          drawFrame(1);
        }
        onDone?.();
      };

      if (typeof img.decode === 'function') {
        img.decode()
          .then(markReady)
          .catch(() => {
            img.onload = markReady;
            img.onerror = () => onDone?.();
          });
      } else {
        (img as HTMLImageElement).onload = markReady;
        (img as HTMLImageElement).onerror = () => onDone?.();
      }
    };

    const pumpQueue = () => {
      while (activeLoads < MAX_CONCURRENT && loadQueue.length > 0) {
        const nextIdx = loadQueue.shift();
        if (nextIdx === undefined || loadedMap[nextIdx]) continue;

        activeLoads++;
        loadSingleFrame(nextIdx, () => {
          activeLoads--;
          pumpQueue();
        });
      }
    };

    const enqueueFrame = (index: number, highPriority = false) => {
      if (index < 1 || index > TOTAL_FRAMES || loadedMap[index] || requestedMap[index]) {
        return;
      }
      requestedMap[index] = 1;
      if (highPriority) {
        loadQueue.unshift(index);
      } else {
        loadQueue.push(index);
      }
      pumpQueue();
    };

    // Priority 1: Load First Frame Immediately
    loadSingleFrame(1, () => {
      drawFrame(1);
    });

    // Priority 2: Preload initial critical track for instant warm-up
    for (let i = 1; i <= CRITICAL_WARMUP_COUNT * KEYFRAME_STRIDE; i += KEYFRAME_STRIDE) {
      enqueueFrame(i, true);
    }

    // Priority 3: Preload remaining keyframe track across entire animation
    const preloadRemainingKeyframes = () => {
      for (let i = CRITICAL_WARMUP_COUNT * KEYFRAME_STRIDE + 1; i <= TOTAL_FRAMES; i += KEYFRAME_STRIDE) {
        enqueueFrame(i, false);
      }
      enqueueFrame(TOTAL_FRAMES, false);
    };

    const keyframeTimeout = setTimeout(preloadRemainingKeyframes, 200);

    // Dynamic Window Loader for detail frames near scroll position
    const loadSurroundingWindow = (centerFrame: number) => {
      const radius = 6;
      for (let offset = 0; offset <= radius; offset++) {
        const next = centerFrame + offset;
        const prev = centerFrame - offset;
        if (next <= TOTAL_FRAMES && !loadedMap[next]) {
          enqueueFrame(next, true);
        }
        if (prev >= 1 && !loadedMap[prev]) {
          enqueueFrame(prev, true);
        }
      }
    };

    // Passive scroll listener
    const onScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop || 0;
      const progress = Math.max(0, Math.min(1, scrollTop / (cachedMaxScroll || 1)));
      targetFrame = 1 + progress * (TOTAL_FRAMES - 1);

      requestTick();

      isUserScrolling = true;
      clearTimeout(scrollIdleTimer);
      scrollIdleTimer = window.setTimeout(() => {
        isUserScrolling = false;
        loadSurroundingWindow(Math.round(targetFrame));
      }, 80);

      const current = Math.round(targetFrame);
      for (let i = -2; i <= 3; i++) {
        const idx = current + i;
        if (idx >= 1 && idx <= TOTAL_FRAMES && !loadedMap[idx]) {
          enqueueFrame(idx, true);
        }
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    // Idle background filler for remaining in-between frames
    let idleIndex = 1;
    let idleInterval: ReturnType<typeof setInterval> | null = null;
    idleInterval = setInterval(() => {
      if (isUserScrolling || loadQueue.length > 6) return;
      if (idleIndex > TOTAL_FRAMES) {
        if (idleInterval) clearInterval(idleInterval);
        return;
      }
      if (!loadedMap[idleIndex] && !requestedMap[idleIndex]) {
        enqueueFrame(idleIndex, false);
      }
      idleIndex++;
    }, 75);

    return () => {
      cancelAnimationFrame(animFrameId);
      clearTimeout(scrollIdleTimer);
      clearTimeout(keyframeTimeout);
      if (idleInterval) clearInterval(idleInterval);
      window.removeEventListener('resize', updateDimensions);
      window.removeEventListener('orientationchange', updateDimensions);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <div
      className="fixed inset-0 w-full h-[100dvh] pointer-events-none z-0 overflow-hidden bg-[#060608]"
      style={{
        contain: 'strict',
        transform: 'translate3d(0, 0, 0)',
        willChange: 'transform',
        backfaceVisibility: 'hidden'
      }}
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full block"
        style={{
          transform: 'translate3d(0, 0, 0)',
          willChange: 'transform',
          imageRendering: 'auto'
        }}
      />
    </div>
  );
};
