<script>
  import TechBadge from './TechBadge.svelte';
  import { localize } from '$lib/utils/localize';
  import { _, locale } from '$lib/i18n';

  export let project;

  // Localized status labels
  $: statusLabel = {
    live: $locale === 'fr' ? 'En ligne' : 'Live',
    development: $locale === 'fr' ? 'En développement' : 'In Development',
    archived: $locale === 'fr' ? 'Archivé' : 'Archived'
  };

  // Determine status from project data
  $: status = project.status || (project.links?.demo || project.links?.live ? 'live' : 'archived');
</script>

<a href="/projects/{project.id}" class="project-card">
  <div class="card-header">
    <div class="title-row">
      <h3>{project.name}</h3>
      <span class="status status-{status}">{statusLabel[status]}</span>
    </div>
    <p class="tagline">{localize(project.tagline)}</p>
  </div>

  <div class="card-body">
    <p class="description">{localize(project.description)}</p>

    {#if project.features}
      {@const localizedFeatures = typeof project.features === 'object' && !Array.isArray(project.features) ? (project.features[$locale] || project.features.en || []) : project.features}
      {#if localizedFeatures.length > 0}
        <ul class="highlights">
          {#each localizedFeatures.slice(0, 2) as feature}
            <li>{feature}</li>
          {/each}
        </ul>
      {/if}
    {/if}
  </div>

  <div class="card-footer">
    <div class="tech-stack">
      {#each project.tech as tech}
        <TechBadge {tech} size="sm" />
      {/each}
    </div>

    <div class="links">
      {#if project.links?.github}
        <span class="link-icon" title="GitHub">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
          </svg>
        </span>
      {/if}
      {#if project.links?.demo}
        <span class="link-icon" title="Live Demo">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
            <polyline points="15 3 21 3 21 9"></polyline>
            <line x1="10" y1="14" x2="21" y2="3"></line>
          </svg>
        </span>
      {/if}
    </div>
  </div>
</a>

<style>
  .project-card {
    display: flex;
    flex-direction: column;
    background: rgba(0, 20, 0, 0.6);
    border: 1px solid rgba(0, 255, 0, 0.3);
    border-radius: 0.5rem;
    padding: 1.5rem;
    transition: all 0.3s ease;
    text-decoration: none;
    color: #00ff00;
    height: 100%;
  }

  .project-card:hover {
    border-color: rgba(0, 255, 0, 0.6);
    box-shadow: 0 0 20px rgba(0, 255, 0, 0.2);
    transform: translateY(-2px);
  }

  .card-header {
    margin-bottom: 1rem;
  }

  .title-row {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 1rem;
    margin-bottom: 0.5rem;
  }

  h3 {
    font-family: 'Courier New', monospace;
    font-size: 1.25rem;
    font-weight: 700;
    margin: 0;
    color: #00ff00;
  }

  .status {
    font-size: 0.75rem;
    padding: 0.25rem 0.5rem;
    border-radius: 0.25rem;
    font-family: 'Courier New', monospace;
    white-space: nowrap;
    flex-shrink: 0;
  }

  .status-live {
    background: rgba(0, 255, 0, 0.2);
    border: 1px solid rgba(0, 255, 0, 0.5);
    color: #00ff00;
  }

  .status-development {
    background: rgba(255, 255, 0, 0.2);
    border: 1px solid rgba(255, 255, 0, 0.5);
    color: #ffff00;
  }

  .status-archived {
    background: rgba(128, 128, 128, 0.2);
    border: 1px solid rgba(128, 128, 128, 0.5);
    color: #888;
  }

  .tagline {
    font-size: 0.875rem;
    color: rgba(0, 255, 0, 0.7);
    font-style: italic;
    margin: 0;
  }

  .card-body {
    flex: 1;
    margin-bottom: 1rem;
  }

  .description {
    font-size: 0.875rem;
    line-height: 1.6;
    color: rgba(0, 255, 0, 0.8);
    margin-bottom: 1rem;
  }

  .highlights {
    list-style: none;
    padding: 0;
    margin: 0;
    font-size: 0.8125rem;
    color: rgba(0, 255, 0, 0.7);
  }

  .highlights li {
    padding-left: 1rem;
    position: relative;
    margin-bottom: 0.25rem;
  }

  .highlights li::before {
    content: '>';
    position: absolute;
    left: 0;
    color: #00ff00;
  }

  .card-footer {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding-top: 1rem;
    border-top: 1px solid rgba(0, 255, 0, 0.2);
  }

  .tech-stack {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
  }

  .links {
    display: flex;
    gap: 0.75rem;
  }

  .link-icon {
    color: rgba(0, 255, 0, 0.7);
    transition: color 0.2s ease;
  }

  .link-icon:hover {
    color: #00ff00;
  }

  .link-icon svg {
    display: block;
  }
</style>
