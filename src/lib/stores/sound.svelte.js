const STORAGE_KEY = 'portfolio-os-sound';

let enabled = $state(
  typeof window !== 'undefined'
    ? localStorage.getItem(STORAGE_KEY) !== 'false'
    : true
);

let audioContext = null;

function getContext() {
  try {
    if (!audioContext && typeof window !== 'undefined') {
      audioContext = new (window.AudioContext || window.webkitAudioContext)();
    }
  } catch (e) {
    return null;
  }
  return audioContext;
}

export function isSoundEnabled() {
  return enabled;
}

export function toggleSound() {
  enabled = !enabled;
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEY, String(enabled));
  }
}

export function playClick() {
  if (!enabled) return;
  const ctx = getContext();
  if (!ctx) return;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.frequency.value = 800;
  gain.gain.value = 0.05;
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1);
  osc.start(ctx.currentTime);
  osc.stop(ctx.currentTime + 0.1);
}

export function playOpen() {
  if (!enabled) return;
  const ctx = getContext();
  if (!ctx) return;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.frequency.value = 400;
  osc.frequency.exponentialRampToValueAtTime(800, ctx.currentTime + 0.15);
  gain.gain.value = 0.05;
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.2);
  osc.start(ctx.currentTime);
  osc.stop(ctx.currentTime + 0.2);
}

export function playClose() {
  if (!enabled) return;
  const ctx = getContext();
  if (!ctx) return;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.frequency.value = 600;
  osc.frequency.exponentialRampToValueAtTime(300, ctx.currentTime + 0.15);
  gain.gain.value = 0.05;
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);
  osc.start(ctx.currentTime);
  osc.stop(ctx.currentTime + 0.15);
}

export function playBoot() {
  if (!enabled) return;
  const ctx = getContext();
  if (!ctx) return;
  [400, 500, 700].forEach((freq, i) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.frequency.value = freq;
    osc.type = 'sine';
    gain.gain.value = 0;
    gain.gain.linearRampToValueAtTime(0.06, ctx.currentTime + i * 0.2 + 0.05);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + i * 0.2 + 0.4);
    osc.start(ctx.currentTime + i * 0.2);
    osc.stop(ctx.currentTime + i * 0.2 + 0.4);
  });
}

export function playSend() {
  if (!enabled) return;
  const ctx = getContext();
  if (!ctx) return;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.frequency.value = 500;
  osc.frequency.exponentialRampToValueAtTime(1200, ctx.currentTime + 0.2);
  gain.gain.value = 0.04;
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.25);
  osc.start(ctx.currentTime);
  osc.stop(ctx.currentTime + 0.25);
}

export function playType() {
  if (!enabled) return;
  const ctx = getContext();
  if (!ctx) return;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.frequency.value = 600 + Math.random() * 200;
  osc.type = 'square';
  gain.gain.value = 0.02;
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);
  osc.start(ctx.currentTime);
  osc.stop(ctx.currentTime + 0.05);
}
