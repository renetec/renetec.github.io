<script>
  import { _ } from '$lib/i18n';
  import { locale, setLanguage } from '$lib/i18n';
  import { getTheme, setTheme } from '$lib/stores/theme.svelte.js';
  import { isSoundEnabled, toggleSound } from '$lib/stores/sound.svelte.js';

  const WALLPAPER_KEY = 'portfolio-os-wallpaper';

  const wallpapers = [
    { id: 'w1', gradient: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)' },
    { id: 'w2', gradient: 'linear-gradient(135deg, #0d0221 0%, #190d36 50%, #3b1f6c 100%)' },
    { id: 'w3', gradient: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 40%, #2d1b69 100%)' },
  ];

  let activeWallpaper = $state(
    typeof window !== 'undefined'
      ? localStorage.getItem(WALLPAPER_KEY) || 'w1'
      : 'w1'
  );

  function selectWallpaper(id) {
    activeWallpaper = id;
    if (typeof window !== 'undefined') {
      localStorage.setItem(WALLPAPER_KEY, id);
    }
  }

  // Derived reactive reads
  let theme = $derived(getTheme());
  let soundOn = $derived(isSoundEnabled());
  let currentLocale = $derived($locale);
</script>

<div class="settings-app">
  <h1 class="settings-title">⚙️ {$_('settings.title', { default: 'Settings' })}</h1>

  <!-- Appearance -->
  <section class="settings-group">
    <h2 class="group-heading">{$_('settings.appearance')}</h2>
    <div class="setting-row">
      <span class="setting-label">{$_('settings.appearance')}</span>
      <div class="btn-group">
        <button
          class="toggle-btn"
          class:active={theme === 'dark'}
          onclick={() => setTheme('dark')}
        >
          {$_('settings.dark')}
        </button>
        <button
          class="toggle-btn"
          class:active={theme === 'light'}
          onclick={() => setTheme('light')}
        >
          {$_('settings.light')}
        </button>
      </div>
    </div>
  </section>

  <div class="divider"></div>

  <!-- Language -->
  <section class="settings-group">
    <h2 class="group-heading">{$_('settings.language')}</h2>
    <div class="setting-row">
      <span class="setting-label">{$_('settings.language')}</span>
      <div class="btn-group">
        <button
          class="toggle-btn"
          class:active={currentLocale === 'fr'}
          onclick={() => setLanguage('fr')}
        >
          Français
        </button>
        <button
          class="toggle-btn"
          class:active={currentLocale === 'en'}
          onclick={() => setLanguage('en')}
        >
          English
        </button>
      </div>
    </div>
  </section>

  <div class="divider"></div>

  <!-- Sound -->
  <section class="settings-group">
    <h2 class="group-heading">{$_('settings.sound')}</h2>
    <div class="setting-row">
      <span class="setting-label">{$_('settings.sound')}</span>
      <div class="sound-toggle">
        <span class="sound-label">
          {soundOn ? $_('settings.soundOn') : $_('settings.soundOff')}
        </span>
        <button
          class="switch"
          class:on={soundOn}
          onclick={toggleSound}
          role="switch"
          aria-checked={soundOn}
          aria-label={$_('settings.sound')}
        >
          <span class="switch-thumb"></span>
        </button>
      </div>
    </div>
  </section>

  <div class="divider"></div>

  <!-- Wallpaper -->
  <section class="settings-group">
    <h2 class="group-heading">{$_('settings.wallpaper')}</h2>
    <div class="setting-row">
      <span class="setting-label">{$_('settings.wallpaper')}</span>
      <div class="swatch-row">
        {#each wallpapers as wp}
          <button
            class="swatch"
            class:selected={activeWallpaper === wp.id}
            style="background: {wp.gradient}"
            onclick={() => selectWallpaper(wp.id)}
            title={wp.id}
          ></button>
        {/each}
      </div>
    </div>
  </section>
</div>

<style>
  .settings-app {
    height: 100%;
    overflow-y: auto;
    font-family: system-ui, -apple-system, sans-serif;
    background: var(--bg-primary, #1a1a2e);
    color: var(--text-primary, #e2e8f0);
    padding: 24px 28px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    gap: 0;
  }

  .settings-title {
    font-size: 18px;
    font-weight: 700;
    margin: 0 0 24px;
    color: var(--text-primary, #e2e8f0);
  }

  .settings-group {
    padding: 16px 0;
  }

  .group-heading {
    font-size: 11px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: var(--text-muted, #718096);
    margin: 0 0 12px;
  }

  .setting-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
  }

  .setting-label {
    font-size: 14px;
    font-weight: 500;
    color: var(--text-primary, #e2e8f0);
  }

  .divider {
    height: 1px;
    background: var(--border-color, rgba(255,255,255,0.08));
  }

  /* Button group (theme / language toggles) */
  .btn-group {
    display: flex;
    border-radius: 8px;
    overflow: hidden;
    border: 1px solid var(--border-color, rgba(255,255,255,0.12));
  }

  .toggle-btn {
    padding: 7px 16px;
    background: transparent;
    color: var(--text-muted, #718096);
    border: none;
    font-family: system-ui, sans-serif;
    font-size: 13px;
    font-weight: 500;
    cursor: pointer;
    transition: background 0.15s, color 0.15s;
  }
  .toggle-btn:not(:last-child) {
    border-right: 1px solid var(--border-color, rgba(255,255,255,0.12));
  }
  .toggle-btn.active {
    background: var(--accent-primary, #4361ee);
    color: #fff;
  }
  .toggle-btn:not(.active):hover {
    background: var(--bg-hover, rgba(255,255,255,0.06));
    color: var(--text-primary, #e2e8f0);
  }

  /* Sound toggle */
  .sound-toggle {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .sound-label {
    font-size: 13px;
    color: var(--text-muted, #718096);
    min-width: 36px;
    text-align: right;
  }

  .switch {
    position: relative;
    width: 44px;
    height: 24px;
    border-radius: 12px;
    background: var(--bg-secondary, #16213e);
    border: 1px solid var(--border-color, rgba(255,255,255,0.15));
    cursor: pointer;
    padding: 0;
    transition: background 0.2s;
  }
  .switch.on {
    background: var(--accent-primary, #4361ee);
    border-color: var(--accent-primary, #4361ee);
  }

  .switch-thumb {
    position: absolute;
    top: 3px;
    left: 3px;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background: #fff;
    transition: transform 0.2s;
    display: block;
  }
  .switch.on .switch-thumb {
    transform: translateX(20px);
  }

  /* Wallpaper swatches */
  .swatch-row {
    display: flex;
    gap: 8px;
  }

  .swatch {
    width: 48px;
    height: 32px;
    border-radius: 6px;
    border: 2px solid transparent;
    cursor: pointer;
    padding: 0;
    transition: border-color 0.15s, transform 0.1s;
  }
  .swatch:hover {
    transform: scale(1.05);
  }
  .swatch.selected {
    border-color: var(--accent-primary, #4361ee);
    outline: 2px solid rgba(67, 97, 238, 0.4);
  }
</style>
