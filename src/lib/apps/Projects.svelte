<script>
  import { _, locale } from '$lib/i18n';
  import { openWindow } from '$lib/stores/windows.svelte.js';
  import { playClick } from '$lib/stores/sound.svelte.js';
  import projectsData from '$lib/data/projects.json';

  let filter = $state('all');

  const categories = [
    { id: 'all', labelKey: 'projects.all' },
    { id: 'saas', labelKey: 'projects.saas' },
    { id: 'ai', labelKey: 'projects.ai' },
    { id: 'data', labelKey: 'projects.data' },
    { id: 'wordpress', labelKey: 'projects.wordpress' }
  ];

  let filtered = $derived(
    filter === 'all' ? projectsData : projectsData.filter(p => p.category === filter)
  );

  function openProject(project) {
    playClick();
    openWindow(
      `project-${project.id}`,
      project.title[$locale] || project.title.en,
      { width: 750, height: 550, allowMultiple: true }
    );
  }
</script>

<div class="projects-app">
  <div class="filter-bar">
    {#each categories as cat}
      <button
        class="filter-btn"
        class:active={filter === cat.id}
        onclick={() => { filter = cat.id; playClick(); }}
      >
        {$_(cat.labelKey)}
      </button>
    {/each}
  </div>

  <div class="project-grid">
    {#each filtered as project (project.id)}
      <button class="project-card" onclick={() => openProject(project)}>
        <span class="card-icon">{project.icon}</span>
        <h3>{project.title[$locale] || project.title.en}</h3>
        <p class="card-desc">{project.description[$locale] || project.description.en}</p>
        <div class="tech-row">
          {#each project.techStack.slice(0, 3) as tech}
            <span class="tech-badge">{tech}</span>
          {/each}
        </div>
      </button>
    {/each}
  </div>
</div>

<style>
  .projects-app { padding: 20px; height: 100%; overflow-y: auto; }
  .filter-bar { display: flex; gap: 6px; margin-bottom: 20px; flex-wrap: wrap; }
  .filter-btn { padding: 6px 14px; background: transparent; border: 1px solid var(--border-color); border-radius: 20px; color: var(--text-muted); font-size: 0.75rem; font-family: system-ui, -apple-system, sans-serif; cursor: pointer; transition: all 0.15s; }
  .filter-btn:hover, .filter-btn.active { background: var(--accent); color: var(--bg-primary); border-color: var(--accent); }
  .project-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 16px; }
  .project-card { background: var(--bg-tertiary); border: 1px solid var(--border-color); border-radius: 10px; padding: 20px; text-align: left; cursor: pointer; transition: all 0.2s; color: var(--text-primary); display: flex; flex-direction: column; gap: 8px; }
  .project-card:hover { border-color: var(--accent); transform: translateY(-2px); box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2); }
  .card-icon { font-size: 2rem; }
  .project-card h3 { font-size: 0.95rem; font-family: system-ui, -apple-system, sans-serif; margin: 0; color: var(--text-primary); }
  .card-desc { font-size: 0.75rem; color: var(--text-muted); font-family: system-ui, -apple-system, sans-serif; line-height: 1.5; margin: 0; display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden; }
  .tech-row { display: flex; gap: 6px; flex-wrap: wrap; margin-top: auto; }
  .tech-badge { font-size: 0.65rem; padding: 2px 8px; border-radius: 12px; background: rgba(255, 255, 255, 0.06); color: var(--text-muted); font-family: system-ui, -apple-system, sans-serif; }
</style>
