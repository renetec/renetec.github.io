<script>
  import { getWindows } from '$lib/stores/windows.svelte.js';
  import Window from './Window.svelte';

  import Projects from '$lib/apps/Projects.svelte';
  import About from '$lib/apps/About.svelte';
  import Terminal from '$lib/apps/Terminal.svelte';
  import Mail from '$lib/apps/Mail.svelte';
  import Settings from '$lib/apps/Settings.svelte';
  import ProjectDetail from '$lib/apps/ProjectDetail.svelte';
  import projectsData from '$lib/data/projects.json';

  const appComponents = { projects: Projects, about: About, terminal: Terminal, mail: Mail, settings: Settings };

  let windows = $derived(getWindows());

  function getProjectData(appId) {
    const projectId = appId.replace('project-', '');
    return projectsData.find(p => p.id === projectId);
  }
</script>

{#each windows as win (win.id)}
  <Window {win}>
    {#if win.appId.startsWith('project-')}
      {@const project = getProjectData(win.appId)}
      {#if project}
        <ProjectDetail {project} />
      {/if}
    {:else if appComponents[win.appId]}
      {#if win.appId === 'projects'}
        <Projects />
      {:else if win.appId === 'about'}
        <About />
      {:else if win.appId === 'terminal'}
        <Terminal />
      {:else if win.appId === 'mail'}
        <Mail />
      {:else if win.appId === 'settings'}
        <Settings />
      {/if}
    {/if}
  </Window>
{/each}
