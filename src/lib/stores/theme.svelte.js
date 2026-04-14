const STORAGE_KEY = 'portfolio-os-theme';

let current = $state(
  typeof window !== 'undefined'
    ? localStorage.getItem(STORAGE_KEY) || 'dark'
    : 'dark'
);

export function getTheme() {
  return current;
}

export function toggleTheme() {
  current = current === 'dark' ? 'light' : 'dark';
  applyTheme();
}

export function setTheme(theme) {
  current = theme;
  applyTheme();
}

function applyTheme() {
  if (typeof window === 'undefined') return;
  document.documentElement.setAttribute('data-theme', current);
  localStorage.setItem(STORAGE_KEY, current);
}

export function initTheme() {
  if (typeof window === 'undefined') return;
  const saved = localStorage.getItem(STORAGE_KEY) || 'dark';
  current = saved;
  applyTheme();
}
