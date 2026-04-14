<script>
  import { openWindow } from '$lib/stores/windows.svelte.js';
  import { playClick } from '$lib/stores/sound.svelte.js';
  import { _ } from '$lib/i18n';

  const apps = [
    { id: 'projects', icon: '💼', labelKey: 'os.projects' },
    { id: 'about', icon: '👤', labelKey: 'os.about' },
    { id: 'terminal', icon: '💻', labelKey: 'os.terminal' },
    { id: 'mail', icon: '✉️', labelKey: 'os.mail' },
    { id: 'settings', icon: '⚙️', labelKey: 'os.settings' }
  ];

  function handleDblClick(app) {
    playClick();
    openWindow(app.id, $_(app.labelKey));
  }
</script>

<div class="desktop">
  <div class="icons">
    {#each apps as app}
      <button class="icon" ondblclick={() => handleDblClick(app)}>
        <span class="icon-emoji">{app.icon}</span>
        <span class="icon-label">{$_(app.labelKey)}</span>
      </button>
    {/each}
  </div>
</div>

<style>
  .desktop {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 48px;
    overflow: hidden;
  }

  .icons {
    display: flex;
    flex-direction: column;
    gap: 8px;
    padding: 24px;
    align-items: flex-start;
  }

  .icon {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
    padding: 8px 16px;
    background: transparent;
    border: 2px solid transparent;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.15s;
    width: 80px;
  }

  .icon:hover {
    background: rgba(255, 255, 255, 0.06);
    transform: translateY(-2px);
  }

  .icon:focus-visible {
    border-color: var(--accent);
  }

  .icon-emoji {
    font-size: 2rem;
  }

  .icon-label {
    font-size: 0.7rem;
    color: var(--text-primary);
    font-family: system-ui, -apple-system, sans-serif;
    text-shadow: 0 1px 3px rgba(0, 0, 0, 0.5);
    text-align: center;
    word-break: break-word;
  }

  @media (max-width: 768px) {
    .icons {
      display: none;
    }
  }
</style>
