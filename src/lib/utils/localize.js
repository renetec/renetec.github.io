import { locale } from 'svelte-i18n';
import { get } from 'svelte/store';

/**
 * Get localized content from bilingual object
 * @param {Object|string} content - Either a bilingual object {en: "...", fr: "..."} or a plain string
 * @returns {string} Localized content
 */
export function localize(content) {
  if (!content) return '';

  // If it's a plain string, return it as-is (backwards compatible)
  if (typeof content === 'string') {
    return content;
  }

  // If it's a bilingual object, return the appropriate language
  const currentLocale = get(locale);
  return content[currentLocale] || content.en || '';
}

/**
 * Get localized array from bilingual object
 * @param {Object|Array} content - Either a bilingual object {en: [...], fr: [...]} or a plain array
 * @returns {Array} Localized array
 */
export function localizeArray(content) {
  if (!content) return [];

  // If it's a plain array, return it as-is (backwards compatible)
  if (Array.isArray(content)) {
    return content;
  }

  // If it's a bilingual object, return the appropriate language
  const currentLocale = get(locale);
  return content[currentLocale] || content.en || [];
}
