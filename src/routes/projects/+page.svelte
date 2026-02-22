<script>
  import { projects } from '$lib/config';
  import ProjectCard from '$lib/components/ProjectCard.svelte';
  import { _ } from '$lib/i18n';

  let statusFilter = 'all';
  let techFilter = 'all';

  // Get unique tech stack items
  $: allTech = [...new Set(projects.flatMap(p => p.tech))].sort();

  // Determine project status
  function getStatus(project) {
    return project.links?.demo ? 'live' : 'archived';
  }

  // Filter projects
  $: filteredProjects = projects.filter(project => {
    const status = getStatus(project);

    // Status filter
    if (statusFilter !== 'all' && status !== statusFilter) {
      return false;
    }

    // Tech filter
    if (techFilter !== 'all' && !project.tech.includes(techFilter)) {
      return false;
    }

    return true;
  });

  // Sort by year (newest first) and featured status
  $: sortedProjects = [...filteredProjects].sort((a, b) => {
    if (a.featured !== b.featured) {
      return a.featured ? -1 : 1;
    }
    return b.year - a.year;
  });
</script>

<svelte:head>
  <title>{$_('projects.title')} - René Tec</title>
  <meta name="description" content={$_('projects.subtitle')} />
</svelte:head>

<div class="projects-page">
  <header class="page-header">
    <h1 class="terminal-prompt">$ ls ~/projects</h1>
    <p class="subtitle">{$_('projects.subtitle')}</p>
  </header>

  <div class="filters">
    <div class="filter-group">
      <label for="status-filter">{$_('projects.status')}</label>
      <select id="status-filter" bind:value={statusFilter}>
        <option value="all">{$_('projects.statusAll')}</option>
        <option value="live">{$_('projects.statusLive')}</option>
        <option value="archived">{$_('projects.statusArchived')}</option>
      </select>
    </div>

    <div class="filter-group">
      <label for="tech-filter">{$_('projects.tech')}</label>
      <select id="tech-filter" bind:value={techFilter}>
        <option value="all">{$_('projects.allTech')}</option>
        {#each allTech as tech}
          <option value={tech}>{tech}</option>
        {/each}
      </select>
    </div>

    <div class="results-count">
      {sortedProjects.length === 1
        ? $_('projects.projectsFound').replace('{count}', sortedProjects.length)
        : $_('projects.projectsFoundPlural').replace('{count}', sortedProjects.length)
      }
    </div>
  </div>

  {#if sortedProjects.length === 0}
    <div class="no-results">
      <p>{$_('projects.noResults')}</p>
      <button on:click={() => { statusFilter = 'all'; techFilter = 'all'; }}>
        {$_('projects.clearFilters')}
      </button>
    </div>
  {:else}
    <div class="projects-grid">
      {#each sortedProjects as project (project.id)}
        <ProjectCard {project} />
      {/each}
    </div>
  {/if}
</div>

<style>
  .projects-page {
    max-width: 1200px;
    margin: 0 auto;
    padding: 2rem 1rem;
  }

  .page-header {
    margin-bottom: 2rem;
  }

  .terminal-prompt {
    font-family: 'Courier New', monospace;
    font-size: 2rem;
    color: #00ff00;
    margin: 0 0 0.5rem 0;
    text-shadow: 0 0 10px rgba(0, 255, 0, 0.5);
  }

  .subtitle {
    font-size: 1.125rem;
    color: rgba(0, 255, 0, 0.7);
    margin: 0;
  }

  .filters {
    display: flex;
    flex-wrap: wrap;
    gap: 1.5rem;
    align-items: center;
    margin-bottom: 2rem;
    padding: 1.5rem;
    background: rgba(0, 20, 0, 0.6);
    border: 1px solid rgba(0, 255, 0, 0.3);
    border-radius: 0.5rem;
  }

  .filter-group {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .filter-group label {
    font-family: 'Courier New', monospace;
    color: #00ff00;
    font-size: 0.875rem;
  }

  .filter-group select {
    background: rgba(0, 0, 0, 0.5);
    border: 1px solid rgba(0, 255, 0, 0.3);
    border-radius: 0.25rem;
    color: #00ff00;
    padding: 0.5rem 0.75rem;
    font-family: 'Courier New', monospace;
    font-size: 0.875rem;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .filter-group select:hover,
  .filter-group select:focus {
    border-color: rgba(0, 255, 0, 0.6);
    outline: none;
    box-shadow: 0 0 8px rgba(0, 255, 0, 0.3);
  }

  .filter-group select option {
    background: #001a00;
    color: #00ff00;
  }

  .results-count {
    margin-left: auto;
    font-family: 'Courier New', monospace;
    color: rgba(0, 255, 0, 0.7);
    font-size: 0.875rem;
  }

  .projects-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
    gap: 1.5rem;
  }

  .no-results {
    text-align: center;
    padding: 3rem 1rem;
    background: rgba(0, 20, 0, 0.6);
    border: 1px solid rgba(0, 255, 0, 0.3);
    border-radius: 0.5rem;
  }

  .no-results p {
    font-family: 'Courier New', monospace;
    color: rgba(0, 255, 0, 0.7);
    margin-bottom: 1rem;
  }

  .no-results button {
    background: rgba(0, 255, 0, 0.1);
    border: 1px solid rgba(0, 255, 0, 0.3);
    color: #00ff00;
    padding: 0.5rem 1rem;
    font-family: 'Courier New', monospace;
    cursor: pointer;
    border-radius: 0.25rem;
    transition: all 0.2s ease;
  }

  .no-results button:hover {
    background: rgba(0, 255, 0, 0.2);
    border-color: rgba(0, 255, 0, 0.5);
    box-shadow: 0 0 8px rgba(0, 255, 0, 0.3);
  }

  @media (max-width: 768px) {
    .terminal-prompt {
      font-size: 1.5rem;
    }

    .filters {
      flex-direction: column;
      align-items: stretch;
    }

    .filter-group {
      flex-direction: column;
      align-items: stretch;
    }

    .filter-group select {
      width: 100%;
    }

    .results-count {
      margin-left: 0;
      text-align: center;
    }

    .projects-grid {
      grid-template-columns: 1fr;
    }
  }
</style>
