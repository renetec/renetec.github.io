<script>
  import { openWindow } from '$lib/stores/windows.svelte.js';
  import { playClick, playOpen } from '$lib/stores/sound.svelte.js';
  import { _ } from '$lib/i18n';

  let { open = false, onClose } = $props();

  const apps = [
    { id: 'projects', icon: '💼', labelKey: 'os.projects', descKey: 'os.projectsDesc' },
    { id: 'about', icon: '👤', labelKey: 'os.about', descKey: 'os.aboutDesc' },
    { id: 'terminal', icon: '💻', labelKey: 'os.terminal', descKey: 'os.terminalDesc' },
    { id: 'settings', icon: '⚙️', labelKey: 'os.settings', descKey: 'os.settingsDesc' }
  ];

  function launch(app) {
    playOpen();
    openWindow(app.id, $_(app.labelKey));
    onClose();
  }
</script>

{#if open}
  <!-- svelte-ignore a11y_no_static_element_interactions -->
  <div class="overlay" onclick={onClose}>
    <!-- svelte-ignore a11y_no_static_element_interactions -->
    <div class="launcher" onclick={(e) => e.stopPropagation()}>
      <div class="launcher-header">
        <h2>ReneTec OS</h2>
      </div>
      <div class="app-grid">
        {#each apps as app}
          <button class="app-item" onclick={() => launch(app)}>
            <span class="app-icon">{app.icon}</span>
            <div class="app-info">
              <span class="app-name">{$_(app.labelKey)}</span>
              <span class="app-desc">{$_(app.descKey)}</span>
            </div>
          </button>
        {/each}
      </div>
    </div>
  </div>
{/if}

<style>
  .overlay {
    position: fixed;
    inset: 0;
    bottom: 48px;
    z-index: 9998;
    background: rgba(0, 0, 0, 0.3);
    backdrop-filter: blur(4px);
  }

  .launcher {
    position: absolute;
    bottom: 0;
    left: 8px;
    width: 320px;
    max-height: 70vh;
    background: var(--bg-secondary);
    border: 1px solid var(--border-color);
    border-radius: 12px 12px 0 0;
    overflow: hidden;
    box-shadow: 0 -8px 32px rgba(0, 0, 0, 0.3);
  }

  .launcher-header {
    padding: 16px 20px;
    border-bottom: 1px solid var(--border-color);
  }

  .launcher-header h2 {
    font-size: 1rem;
    font-family: system-ui, -apple-system, sans-serif;
    color: var(--text-primary);
    margin: 0;
  }

  .app-grid {
    padding: 8px;
    display: flex;
    flex-direction: column;
    gap: 2px;
  }

  .app-item {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 10px 12px;
    background: transparent;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: background 0.15s;
    text-align: left;
    width: 100%;
    color: var(--text-primary);
  }

  .app-item:hover {
    background: rgba(255, 255, 255, 0.06);
  }

  .app-icon {
    font-size: 1.5rem;
    flex-shrink: 0;
  }

  .app-info {
    display: flex;
    flex-direction: column;
  }

  .app-name {
    font-size: 0.85rem;
    font-family: system-ui, -apple-system, sans-serif;
    font-weight: 500;
  }

  .app-desc {
    font-size: 0.7rem;
    color: var(--text-muted);
    font-family: system-ui, -apple-system, sans-serif;
  }

  @media (max-width: 768px) {
    .launcher {
      left: 0;
      right: 0;
      width: 100%;
      border-radius: 12px 12px 0 0;
    }
  }
</style>
