let nextId = 1;
let windows = $state([]);
let nextZIndex = $state(10);

export function getWindows() {
  return windows;
}

export function openWindow(appId, title, opts = {}) {
  const existing = windows.find(w => w.appId === appId && !opts.allowMultiple);
  if (existing) {
    restoreWindow(existing.id);
    focusWindow(existing.id);
    return existing.id;
  }

  const id = nextId++;
  const centerX = (typeof window !== 'undefined' ? window.innerWidth : 1200) / 2 - 300;
  const centerY = (typeof window !== 'undefined' ? window.innerHeight : 800) / 2 - 250;
  const offset = (windows.length % 5) * 30;

  windows.push({
    id,
    appId,
    title,
    position: { x: centerX + offset, y: 60 + offset },
    size: { w: opts.width || 700, h: opts.height || 500 },
    minSize: { w: opts.minWidth || 400, h: opts.minHeight || 300 },
    state: 'normal',
    zIndex: nextZIndex++
  });

  return id;
}

export function closeWindow(id) {
  windows = windows.filter(w => w.id !== id);
}

export function minimizeWindow(id) {
  const win = windows.find(w => w.id === id);
  if (win) win.state = 'minimized';
}

export function maximizeWindow(id) {
  const win = windows.find(w => w.id === id);
  if (!win) return;
  if (win.state === 'maximized') {
    win.state = 'normal';
  } else {
    win.state = 'maximized';
  }
}

export function restoreWindow(id) {
  const win = windows.find(w => w.id === id);
  if (win) win.state = 'normal';
}

export function focusWindow(id) {
  const win = windows.find(w => w.id === id);
  if (win) win.zIndex = nextZIndex++;
}

export function moveWindow(id, x, y) {
  const win = windows.find(w => w.id === id);
  if (win && win.state === 'normal') {
    win.position = { x, y };
  }
}

export function resizeWindow(id, w, h) {
  const win = windows.find(w2 => w2.id === id);
  if (win && win.state === 'normal') {
    win.size = {
      w: Math.max(w, win.minSize.w),
      h: Math.max(h, win.minSize.h)
    };
  }
}

export function closeAll() {
  windows = [];
}
