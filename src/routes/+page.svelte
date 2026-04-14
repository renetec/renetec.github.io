<script>
  import { initTheme } from '$lib/stores/theme.svelte.js';
  import { onMount } from 'svelte';
  import BootScreen from '$lib/os/BootScreen.svelte';
  import Desktop from '$lib/os/Desktop.svelte';
  import WindowManager from '$lib/os/WindowManager.svelte';
  import Taskbar from '$lib/os/Taskbar.svelte';
  import AppLauncher from '$lib/os/AppLauncher.svelte';
  import { _ } from '$lib/i18n';

  let booted = $state(false);
  let launcherOpen = $state(false);

  onMount(() => {
    initTheme();
  });
</script>

<svelte:head>
  <title>ReneTec OS — {$_('os.tagline')}</title>
  <meta name="description" content={$_('os.metaDescription')} />
</svelte:head>

{#if !booted}
  <BootScreen onComplete={() => booted = true} />
{:else}
  <Desktop />
  <WindowManager />
  <AppLauncher open={launcherOpen} onClose={() => launcherOpen = false} />
  <Taskbar onStartClick={() => launcherOpen = !launcherOpen} />

  <div class="sr-only">
    <h1>ReneTec — Custom Software Development</h1>
    <p>{$_('os.metaDescription')}</p>
  </div>
{/if}
