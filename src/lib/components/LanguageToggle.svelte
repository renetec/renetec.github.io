<script>
  import { locale } from '$lib/i18n';
  import { setLanguage } from '$lib/i18n';

  function toggleLanguage() {
    const newLang = $locale === 'fr' ? 'en' : 'fr';
    setLanguage(newLang);
  }
</script>

<button class="lang-toggle" on:click={toggleLanguage} aria-label="Toggle language">
  <span class="flag">{$locale === 'fr' ? '🇬🇧' : '🇫🇷'}</span>
  <span class="lang-text">{$locale === 'fr' ? 'EN' : 'FR'}</span>
</button>

<style>
  .lang-toggle {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem 1rem;
    background: var(--terminal-bg);
    border: 1px solid var(--terminal-border);
    border-radius: 4px;
    color: var(--terminal-text);
    font-family: 'JetBrains Mono', 'Fira Code', monospace;
    font-size: 0.9rem;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .lang-toggle:hover {
    border-color: var(--terminal-keyword);
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  }

  .flag {
    font-size: 1.2rem;
    line-height: 1;
  }

  .lang-text {
    font-weight: bold;
    color: var(--terminal-keyword);
  }

  @media (max-width: 768px) {
    .lang-toggle {
      padding: 0.4rem 0.8rem;
      font-size: 0.8rem;
    }

    .flag {
      font-size: 1rem;
    }
  }
</style>
