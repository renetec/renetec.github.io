import { register, init, getLocaleFromNavigator, locale, waitLocale } from 'svelte-i18n';

register('en', () => import('./locales/en.json'));
register('fr', () => import('./locales/fr.json'));

let initialized = false;

export async function initI18n() {
  if (initialized) return;

  // Check localStorage for saved language preference
  const savedLocale = typeof window !== 'undefined' ? localStorage.getItem('language') : null;

  // Default to French (fr) for Québec, or use saved preference
  const initialLocale = savedLocale || 'fr';

  init({
    fallbackLocale: 'en',
    initialLocale
  });

  // Wait for initial locale to load
  await waitLocale();
  initialized = true;
}

export function setLanguage(lang) {
  locale.set(lang);
  if (typeof window !== 'undefined') {
    localStorage.setItem('language', lang);
  }
}

export { locale, _ } from 'svelte-i18n';
