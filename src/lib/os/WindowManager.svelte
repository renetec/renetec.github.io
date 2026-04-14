<script>
  import { getWindows } from '$lib/stores/windows.svelte.js';
  import Window from './Window.svelte';

  import Projects from '$lib/apps/Projects.svelte';
  import About from '$lib/apps/About.svelte';
  import Terminal from '$lib/apps/Terminal.svelte';
  import Mail from '$lib/apps/Mail.svelte';
  import Settings from '$lib/apps/Settings.svelte';

  const appComponents = { projects: Projects, about: About, terminal: Terminal, mail: Mail, settings: Settings };

  let windows = $derived(getWindows());
</script>

{#each windows as win (win.id)}
  <Window {win}>
    {#if appComponents[win.appId]}
      <svelte:component this={appComponents[win.appId]} />
    {/if}
  </Window>
{/each}
