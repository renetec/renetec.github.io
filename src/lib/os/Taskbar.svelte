<script>
  import { getWindows, focusWindow, restoreWindow, minimizeWindow } from '$lib/stores/windows.svelte.js';
  import { getTheme, toggleTheme } from '$lib/stores/theme.svelte.js';
  import { isSoundEnabled, toggleSound, playClick } from '$lib/stores/sound.svelte.js';
  import { locale, _ } from '$lib/i18n';
  import { setLanguage } from '$lib/i18n';

  let { onStartClick } = $props();

  let time = $state('');
  let windows = $derived(getWindows());
  let theme = $derived(getTheme());
  let soundOn = $derived(isSoundEnabled());

  $effect(() => {
    function tick() {
      const now = new Date();
      time = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }
    tick();
    const interval = setInterval(tick, 30000);
    return () => clearInterval(interval);
  });

  function handleWindowClick(win) {
    playClick();
    if (win.state === 'minimized') {
      restoreWindow(win.id);
      focusWindow(win.id);
    } else {
      minimizeWindow(win.id);
    }
  }

  function handleLangToggle() {
    playClick();
    const next = $locale === 'fr' ? 'en' : 'fr';
    setLanguage(next);
  }

  function handleThemeToggle() {
    playClick();
    toggleTheme();
  }

  function handleSoundToggle() {
    toggleSound();
  }
</script>

<div class="taskbar">
  <button class="start-btn" onclick={onStartClick}>
    <span class="start-icon">⚡</span>
  </button>

  <div class="window-list">
    {#each windows as win (win.id)}
      <button
        class="window-btn"
        class:minimized={win.state === 'minimized'}
        onclick={() => handleWindowClick(win)}
      >
        {win.title}
      </button>
    {/each}
  </div>

  <div class="system-tray">
    <button class="tray-btn" onclick={handleLangToggle} title="Language">
      {$locale === 'fr' ? 'FR' : 'EN'}
    </button>
    <button class="tray-btn" onclick={handleThemeToggle} title="Theme">
      {theme === 'dark' ? '🌙' : '☀️'}
    </button>
    <button class="tray-btn" onclick={handleSoundToggle} title="Sound">
      {soundOn ? '🔊' : '🔇'}
    </button>
    <span class="clock">{time}</span>
  </div>
</div>

<style>
  .taskbar {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    height: 48px;
    background: var(--bg-tertiary);
    border-top: 1px solid var(--border-color);
    display: flex;
    align-items: center;
    padding: 0 8px;
    gap: 4px;
    z-index: 9999;
    backdrop-filter: blur(12px);
  }

  .start-btn {
    width: 40px;
    height: 36px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: transparent;
    border: 1px solid transparent;
    border-radius: 6px;
    cursor: pointer;
    transition: background 0.15s;
  }

  .start-btn:hover {
    background: rgba(255, 255, 255, 0.08);
    border-color: var(--border-color);
  }

  .start-icon {
    font-size: 1.1rem;
  }

  .window-list {
    flex: 1;
    display: flex;
    gap: 4px;
    overflow-x: auto;
    padding: 0 8px;
  }

  .window-btn {
    padding: 4px 12px;
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid transparent;
    border-radius: 4px;
    color: var(--text-primary);
    font-size: 0.75rem;
    font-family: system-ui, -apple-system, sans-serif;
    cursor: pointer;
    white-space: nowrap;
    max-width: 150px;
    overflow: hidden;
    text-overflow: ellipsis;
    transition: background 0.15s;
  }

  .window-btn:hover {
    background: rgba(255, 255, 255, 0.1);
  }

  .window-btn.minimized {
    opacity: 0.5;
  }

  .system-tray {
    display: flex;
    align-items: center;
    gap: 4px;
  }

  .tray-btn {
    padding: 4px 8px;
    background: transparent;
    border: 1px solid transparent;
    border-radius: 4px;
    color: var(--text-muted);
    font-size: 0.75rem;
    font-family: system-ui, -apple-system, sans-serif;
    cursor: pointer;
    transition: all 0.15s;
  }

  .tray-btn:hover {
    background: rgba(255, 255, 255, 0.08);
    color: var(--text-primary);
  }

  .clock {
    font-size: 0.75rem;
    color: var(--text-secondary);
    font-family: system-ui, -apple-system, sans-serif;
    padding: 0 8px;
    min-width: 50px;
    text-align: right;
  }

  @media (max-width: 768px) {
    .window-list {
      display: none;
    }

    .taskbar {
      justify-content: space-between;
    }
  }
</style>
