import { initI18n } from '$lib/i18n';

// Initialize i18n for SSR
if (typeof window === 'undefined') {
  await initI18n();
}

export const prerender = true;
export const trailingSlash = 'always';
