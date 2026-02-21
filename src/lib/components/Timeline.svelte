<script>
  import { projects } from '$lib/config';
  import TechBadge from './TechBadge.svelte';

  // Group projects by year
  $: projectsByYear = projects.reduce((acc, project) => {
    const year = project.year;
    if (!acc[year]) {
      acc[year] = [];
    }
    acc[year].push(project);
    return acc;
  }, {});

  // Sort years in descending order (newest first)
  $: sortedYears = Object.keys(projectsByYear).sort((a, b) => b - a);
</script>

<div class="timeline">
  {#each sortedYears as year, yearIndex}
    <div class="year-group">
      <div class="year-marker">
        <div class="year-dot"></div>
        <div class="year-label">{year}</div>
      </div>

      <div class="year-projects">
        {#each projectsByYear[year] as project, projectIndex}
          <div class="timeline-item">
            <div class="timeline-dot"></div>
            <div class="timeline-content">
              <h3 class="project-name">
                <a href="/projects#{project.id}">{project.name}</a>
              </h3>
              <p class="project-tagline">{project.tagline}</p>
              <div class="tech-tags">
                {#each project.tech as tech}
                  <TechBadge {tech} />
                {/each}
              </div>
              {#if project.links?.demo || project.links?.github}
                <div class="project-links">
                  {#if project.links.demo}
                    <a href={project.links.demo} target="_blank" rel="noopener noreferrer" class="link-btn">
                      <span class="link-icon">🌐</span> Live Demo
                    </a>
                  {/if}
                  {#if project.links.github}
                    <a href={project.links.github} target="_blank" rel="noopener noreferrer" class="link-btn">
                      <span class="link-icon">📦</span> GitHub
                    </a>
                  {/if}
                </div>
              {/if}
            </div>
          </div>
        {/each}
      </div>
    </div>
  {/each}
</div>

<style>
  .timeline {
    position: relative;
    padding: 1rem 0;
  }

  .year-group {
    position: relative;
    margin-bottom: 3rem;
  }

  .year-group:last-child {
    margin-bottom: 0;
  }

  .year-marker {
    display: flex;
    align-items: center;
    margin-bottom: 1.5rem;
    gap: 1rem;
  }

  .year-dot {
    width: 20px;
    height: 20px;
    background: #00ff00;
    border-radius: 50%;
    box-shadow: 0 0 15px rgba(0, 255, 0, 0.6);
    flex-shrink: 0;
  }

  .year-label {
    font-family: 'Courier New', monospace;
    font-size: 1.75rem;
    font-weight: bold;
    color: #00ff00;
    text-shadow: 0 0 10px rgba(0, 255, 0, 0.5);
  }

  .year-projects {
    position: relative;
    padding-left: 2.5rem;
    border-left: 2px solid rgba(0, 255, 0, 0.3);
    margin-left: 9px;
  }

  .timeline-item {
    position: relative;
    margin-bottom: 2rem;
    padding-left: 1.5rem;
  }

  .timeline-item:last-child {
    margin-bottom: 0;
  }

  .timeline-dot {
    position: absolute;
    left: -2.9rem;
    top: 0.5rem;
    width: 12px;
    height: 12px;
    background: rgba(0, 255, 0, 0.5);
    border: 2px solid #00ff00;
    border-radius: 50%;
    box-shadow: 0 0 8px rgba(0, 255, 0, 0.4);
  }

  .timeline-content {
    background: rgba(0, 20, 0, 0.6);
    border: 1px solid rgba(0, 255, 0, 0.3);
    border-radius: 0.5rem;
    padding: 1.5rem;
    transition: all 0.3s ease;
  }

  .timeline-content:hover {
    border-color: rgba(0, 255, 0, 0.5);
    box-shadow: 0 0 15px rgba(0, 255, 0, 0.2);
    transform: translateX(5px);
  }

  .project-name {
    margin: 0 0 0.5rem 0;
    font-family: 'Courier New', monospace;
    font-size: 1.25rem;
    color: #00ff00;
  }

  .project-name a {
    color: inherit;
    text-decoration: none;
    transition: all 0.2s ease;
  }

  .project-name a:hover {
    text-shadow: 0 0 8px rgba(0, 255, 0, 0.6);
  }

  .project-tagline {
    margin: 0 0 1rem 0;
    color: rgba(0, 255, 0, 0.7);
    font-size: 0.95rem;
    line-height: 1.5;
  }

  .tech-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-bottom: 1rem;
  }

  .project-links {
    display: flex;
    gap: 0.75rem;
    flex-wrap: wrap;
  }

  .link-btn {
    display: inline-flex;
    align-items: center;
    gap: 0.375rem;
    padding: 0.5rem 0.875rem;
    background: rgba(0, 255, 0, 0.1);
    border: 1px solid rgba(0, 255, 0, 0.3);
    border-radius: 0.25rem;
    color: #00ff00;
    text-decoration: none;
    font-family: 'Courier New', monospace;
    font-size: 0.875rem;
    transition: all 0.2s ease;
  }

  .link-btn:hover {
    background: rgba(0, 255, 0, 0.2);
    border-color: rgba(0, 255, 0, 0.5);
    box-shadow: 0 0 8px rgba(0, 255, 0, 0.3);
  }

  .link-icon {
    font-size: 1rem;
  }

  @media (max-width: 768px) {
    .year-label {
      font-size: 1.5rem;
    }

    .year-projects {
      padding-left: 1.5rem;
    }

    .timeline-item {
      padding-left: 1rem;
    }

    .timeline-dot {
      left: -2.4rem;
    }

    .timeline-content {
      padding: 1rem;
    }

    .project-name {
      font-size: 1.125rem;
    }
  }
</style>
