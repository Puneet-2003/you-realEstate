import React, { useEffect, useRef } from 'react';

const TOTAL_FRAMES = 448;

export const ScrollCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Use desynchronized for minimal latency GPU rendering
    const ctx = canvas.getContext('2d', {
      alpha: false,
      desynchronized: true
    });
    if (!ctx) return;

    const frames: HTMLImageElement[] = new Array(TOTAL_FRAMES + 1);
    const loadedMap = new Uint8Array(TOTAL_FRAMES + 1);
    let lastRenderedFrame = -1;
    let animFrameId: number = 0;
    let isAnimating = false;

    const getFrameUrl = (index: number) => {
      const padded = String(index).padStart(6, '0');
      return `/extracted_frames_30fps_jpg/frames/frame_${padded}.jpg`;
    };

    // Cache bounds to avoid layout reflows during scroll
    let cachedMaxScroll = 1;
    const updateDimensions = () => {
      cachedMaxScroll = (document.documentElement.scrollHeight - window.innerHeight) || 1;

      const w = window.innerWidth;
      const h = window.innerHeight;

      // Adapt DPR for mobile battery and fill-rate
      const isMobile = window.innerWidth < 768;
      const maxDpr = isMobile ? 1.0 : 1.25;
      const dpr = Math.min(window.devicePixelRatio || 1, maxDpr);
      const targetW = Math.min(1920, Math.round(w * dpr));
      const targetH = Math.min(1080, Math.round(h * dpr));

      if (canvas.width !== targetW || canvas.height !== targetH) {
        canvas.width = targetW;
        canvas.height = targetH;
      }

      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = isMobile ? 'low' : 'medium';

      if (lastRenderedFrame > 0) {
        drawFrame(lastRenderedFrame);
      }
    };

    window.addEventListener('resize', updateDimensions, { passive: true });
    window.addEventListener('orientationchange', updateDimensions, { passive: true });
    setTimeout(updateDimensions, 100);
    setTimeout(updateDimensions, 500);
    updateDimensions();

    // Fast O(1) lookup with nearby fallback
    const getBestAvailableImage = (targetIndex: number): HTMLImageElement | null => {
      if (loadedMap[targetIndex] && frames[targetIndex]) {
        return frames[targetIndex];
      }

      for (let dist = 1; dist < TOTAL_FRAMES; dist++) {
        const lower = targetIndex - dist;
        if (lower >= 1 && loadedMap[lower] && frames[lower]) {
          return frames[lower];
        }
        const higher = targetIndex + dist;
        if (higher <= TOTAL_FRAMES && loadedMap[higher] && frames[higher]) {
          return frames[higher];
        }
      }
      return null;
    };

    const drawFrame = (index: number) => {
      const img = getBestAvailableImage(index);
      if (!img) return;

      const cw = canvas.width;
      const ch = canvas.height;
      const iw = img.naturalWidth || 1920;
      const ih = img.naturalHeight || 1080;

      // Aspect cover fit
      const scale = Math.max(cw / iw, ch / ih);
      const w = iw * scale;
      const h = ih * scale;
      const x = (cw - w) * 0.5;
      const y = (ch - h) * 0.5;

      ctx.drawImage(img, x, y, w, h);
      lastRenderedFrame = index;
    };

    // Frame targets
    let targetFrame = 1;
    let currentFrame = 1;

    // Tick only when needed
    const tick = () => {
      const diff = targetFrame - currentFrame;
      if (Math.abs(diff) < 0.05) {
        currentFrame = targetFrame;
      } else {
        currentFrame += diff * 0.28;
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

    // Load individual frame
    const loadFrame = (index: number, onComplete?: () => void) => {
      if (loadedMap[index] || frames[index]) {
        onComplete?.();
        return;
      }

      const img = new Image();
      img.src = getFrameUrl(index);

      const markReady = () => {
        frames[index] = img;
        loadedMap[index] = 1;
        if (index === 1 && lastRenderedFrame === -1) {
          drawFrame(1);
        }
        onComplete?.();
      };

      if (typeof img.decode === 'function') {
        img.decode()
          .then(markReady)
          .catch(() => {
            img.onload = markReady;
            img.onerror = () => onComplete?.();
          });
      } else {
        (img as HTMLImageElement).onload = markReady;
        (img as HTMLImageElement).onerror = () => onComplete?.();
      }
    };

    // Adaptive concurrency pool
    const loadQueue: number[] = [];
    let activeLoads = 0;
    const isMobileDevice = typeof window !== 'undefined' && window.innerWidth < 768;
    const MAX_CONCURRENT = isMobileDevice ? 4 : 6;

    const processQueue = () => {
      while (activeLoads < MAX_CONCURRENT && loadQueue.length > 0) {
        const nextIndex = loadQueue.shift();
        if (nextIndex === undefined || loadedMap[nextIndex]) continue;

        activeLoads++;
        loadFrame(nextIndex, () => {
          activeLoads--;
          processQueue();
        });
      }
    };

    // Preload initial batch
    const initialBatch = isMobileDevice ? 15 : 25;
    for (let i = 1; i <= Math.min(initialBatch, TOTAL_FRAMES); i++) {
      loadQueue.push(i);
    }
    processQueue();

    // Background loader for remaining frames
    let bgIndex = initialBatch + 1;
    const loadBackground = () => {
      if (bgIndex > TOTAL_FRAMES) return;
      if (loadQueue.length < 15) {
        if (!loadedMap[bgIndex]) {
          loadQueue.push(bgIndex);
        }
        bgIndex++;
      }
      setTimeout(loadBackground, isMobileDevice ? 40 : 25);
    };
    setTimeout(loadBackground, 200);

    // Passive scroll handler
    const onScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop || 0;
      if (scrollTop > cachedMaxScroll) {
        cachedMaxScroll = (document.documentElement.scrollHeight - window.innerHeight) || 1;
      }
      const progress = Math.max(0, Math.min(1, scrollTop / (cachedMaxScroll || 1)));
      targetFrame = 1 + progress * (TOTAL_FRAMES - 1);

      // Boost priority around current scroll position
      const center = Math.round(targetFrame);
      const lookahead = isMobileDevice ? 5 : 8;
      for (let offset = 0; offset <= lookahead; offset++) {
        const next = center + offset;
        const prev = center - offset;
        if (next <= TOTAL_FRAMES && !loadedMap[next] && !loadQueue.includes(next)) {
          loadQueue.unshift(next);
        }
        if (prev >= 1 && !loadedMap[prev] && !loadQueue.includes(prev)) {
          loadQueue.unshift(prev);
        }
      }
      processQueue();
      requestTick();
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    return () => {
      cancelAnimationFrame(animFrameId);
      window.removeEventListener('resize', updateDimensions);
      window.removeEventListener('orientationchange', updateDimensions);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <div
      className="fixed inset-0 w-full h-[100dvh] pointer-events-none z-0 overflow-hidden bg-black"
      style={{
        transform: 'translateZ(0)',
        willChange: 'transform',
        backfaceVisibility: 'hidden'
      }}
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full block"
        style={{
          transform: 'translateZ(0)',
          willChange: 'transform'
        }}
      />
    </div>
  );
};
