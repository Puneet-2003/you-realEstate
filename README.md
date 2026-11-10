# NOVARIS ESTATE — Super-Architectural Real Estate

An ultra-modern, cinematic luxury real estate web experience featuring scroll-driven frame-by-frame 3D architectural animation, reactive UI components, edition switching, and end-to-end mobile responsiveness.

---

## 🏛️ Features

- **Interactive Scroll-Linked Animation**: 448 high-definition 30fps frames rendered smoothly via HTML5 Canvas with GPU lerping and progressive preloading.
- **End-to-End Mobile Responsive**: Complete support across smartphones (iOS & Android), tablets, and desktops with safe-area insets, adaptive canvas DPR, and full-screen mobile menu navigation.
- **Dynamic Edition Switcher**: Seamless live toggle between:
  - *Novaris Estate* (Cinematic architectural showcase & scroll animation)
  - *Residence Aurora* (High-rise penthouse editorial showcase)
  - *Magrey & Sons Riviera* (French Riviera coastal agency view)
- **Interactive Project Portfolio**: Filterable project gallery with swipe-ready touch carousel and modal specifications.
- **Confidential Inquiry Modal**: Interactive booking form for private showings with iOS-friendly input sizing and scroll lock.

---

## 🛠️ Tech Stack

- **Framework**: React 19 + TypeScript
- **Styling**: Tailwind CSS v4 + PostCSS
- **Bundler**: Vite
- **Icons**: Lucide React
- **Server**: Node.js HTTP server

---

## 🚀 Getting Started

### Option 1: Run Vite React Application

```bash
cd novaris-estate
npm install
npm run dev
```

Visit `http://localhost:3000` in your browser.

### Option 2: Run Standalone Canvas Server

```bash
node server.js
```

Visit `http://localhost:3001` in your browser.

---

## 📦 Building for Production

```bash
cd novaris-estate
npm run build
```

Production assets will be output to `novaris-estate/dist`.
