<script>
  import TechBadge from '$lib/components/TechBadge.svelte';

  export let data;
  $: ({ project } = data);
</script>

<svelte:head>
  <title>{project.name} - René Tec</title>
  <meta name="description" content={project.description} />
</svelte:head>

<div class="project-detail">
  <!-- Breadcrumb Navigation -->
  <nav class="breadcrumb">
    <a href="/">~</a>
    <span>/</span>
    <a href="/projects">projects</a>
    <span>/</span>
    <span class="current">{project.id}</span>
  </nav>

  <!-- Project Header -->
  <header class="project-header">
    <h1 class="terminal-prompt">$ cat README.md</h1>
    <div class="title-section">
      <h2>{project.name}</h2>
      {#if project.featured}
        <span class="featured-badge">Featured</span>
      {/if}
    </div>
    <p class="tagline">{project.tagline}</p>
    <p class="year">Year: {project.year}</p>
  </header>

  <!-- Description -->
  <section class="section">
    <h3 class="section-header">$ cat description.txt</h3>
    <div class="content">
      <p>{project.description}</p>
    </div>
  </section>

  <!-- Tech Stack -->
  <section class="section">
    <h3 class="section-header">$ ls tech-stack/</h3>
    <div class="content">
      <div class="tech-badges">
        {#each project.tech as tech}
          <TechBadge {tech} size="lg" />
        {/each}
      </div>
    </div>
  </section>

  <!-- Highlights/Features -->
  {#if project.highlights && project.highlights.length > 0}
    <section class="section">
      <h3 class="section-header">$ ls features/</h3>
      <div class="content">
        <ul class="features-list">
          {#each project.highlights as highlight}
            <li>{highlight}</li>
          {/each}
        </ul>
      </div>
    </section>
  {/if}

  <!-- Links -->
  <section class="section">
    <h3 class="section-header">$ cat links.json</h3>
    <div class="content">
      <div class="links">
        {#if project.links?.github}
          <a href={project.links.github} class="link-button" target="_blank" rel="noopener noreferrer">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
            </svg>
            View on GitHub
          </a>
        {/if}
        {#if project.links?.demo}
          <a href={project.links.demo} class="link-button link-button-primary" target="_blank" rel="noopener noreferrer">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
              <polyline points="15 3 21 3 21 9"></polyline>
              <line x1="10" y1="14" x2="21" y2="3"></line>
            </svg>
            View Live Demo
          </a>
        {/if}
      </div>
    </div>
  </section>

  <!-- Back to Projects -->
  <div class="back-link">
    <a href="/projects">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <line x1="19" y1="12" x2="5" y2="12"></line>
        <polyline points="12 19 5 12 12 5"></polyline>
      </svg>
      Back to all projects
    </a>
  </div>
</div>

<style>
  .project-detail {
    max-width: 900px;
    margin: 0 auto;
    padding: 2rem 1rem;
  }

  /* Breadcrumb */
  .breadcrumb {
    font-family: 'Courier New', monospace;
    font-size: 0.875rem;
    color: rgba(0, 255, 0, 0.7);
    margin-bottom: 2rem;
  }

  .breadcrumb a {
    color: #00ff00;
    text-decoration: none;
    transition: text-shadow 0.2s ease;
  }

  .breadcrumb a:hover {
    text-shadow: 0 0 8px rgba(0, 255, 0, 0.6);
  }

  .breadcrumb span {
    margin: 0 0.5rem;
  }

  .breadcrumb .current {
    color: rgba(0, 255, 0, 0.5);
  }

  /* Header */
  .project-header {
    margin-bottom: 3rem;
  }

  .terminal-prompt {
    font-family: 'Courier New', monospace;
    font-size: 1.5rem;
    color: #00ff00;
    margin: 0 0 1.5rem 0;
    text-shadow: 0 0 10px rgba(0, 255, 0, 0.5);
  }

  .title-section {
    display: flex;
    align-items: center;
    gap: 1rem;
    flex-wrap: wrap;
    margin-bottom: 0.5rem;
  }

  h2 {
    font-family: 'Courier New', monospace;
    font-size: 2rem;
    color: #00ff00;
    margin: 0;
  }

  .featured-badge {
    background: rgba(255, 215, 0, 0.2);
    border: 1px solid rgba(255, 215, 0, 0.5);
    color: #ffd700;
    font-size: 0.75rem;
    padding: 0.25rem 0.5rem;
    border-radius: 0.25rem;
    font-family: 'Courier New', monospace;
  }

  .tagline {
    font-size: 1.125rem;
    color: rgba(0, 255, 0, 0.8);
    font-style: italic;
    margin: 0.5rem 0;
  }

  .year {
    font-size: 0.875rem;
    color: rgba(0, 255, 0, 0.6);
    font-family: 'Courier New', monospace;
    margin: 0.25rem 0 0 0;
  }

  /* Sections */
  .section {
    margin-bottom: 2.5rem;
  }

  .section-header {
    font-family: 'Courier New', monospace;
    font-size: 1.25rem;
    color: #00ff00;
    margin: 0 0 1rem 0;
    padding-bottom: 0.5rem;
    border-bottom: 1px solid rgba(0, 255, 0, 0.3);
    text-shadow: 0 0 8px rgba(0, 255, 0, 0.4);
  }

  .content {
    padding-left: 1rem;
  }

  .content p {
    font-size: 1rem;
    line-height: 1.7;
    color: rgba(0, 255, 0, 0.8);
    margin: 0;
  }

  /* Tech Badges */
  .tech-badges {
    display: flex;
    flex-wrap: wrap;
    gap: 0.75rem;
  }

  /* Features List */
  .features-list {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  .features-list li {
    padding: 0.5rem 0 0.5rem 1.5rem;
    position: relative;
    color: rgba(0, 255, 0, 0.8);
    line-height: 1.6;
  }

  .features-list li::before {
    content: '>';
    position: absolute;
    left: 0;
    color: #00ff00;
    font-weight: bold;
  }

  /* Links */
  .links {
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
  }

  .link-button {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    background: rgba(0, 255, 0, 0.1);
    border: 1px solid rgba(0, 255, 0, 0.3);
    color: #00ff00;
    padding: 0.75rem 1.25rem;
    font-family: 'Courier New', monospace;
    font-size: 0.875rem;
    text-decoration: none;
    border-radius: 0.25rem;
    transition: all 0.2s ease;
  }

  .link-button:hover {
    background: rgba(0, 255, 0, 0.2);
    border-color: rgba(0, 255, 0, 0.5);
    box-shadow: 0 0 12px rgba(0, 255, 0, 0.3);
    transform: translateY(-2px);
  }

  .link-button-primary {
    background: rgba(0, 255, 0, 0.2);
    border-color: rgba(0, 255, 0, 0.5);
  }

  .link-button-primary:hover {
    background: rgba(0, 255, 0, 0.3);
    border-color: rgba(0, 255, 0, 0.7);
  }

  /* Back Link */
  .back-link {
    margin-top: 3rem;
    padding-top: 2rem;
    border-top: 1px solid rgba(0, 255, 0, 0.2);
  }

  .back-link a {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    color: rgba(0, 255, 0, 0.7);
    text-decoration: none;
    font-family: 'Courier New', monospace;
    transition: all 0.2s ease;
  }

  .back-link a:hover {
    color: #00ff00;
    text-shadow: 0 0 8px rgba(0, 255, 0, 0.4);
  }

  /* Responsive */
  @media (max-width: 768px) {
    .terminal-prompt {
      font-size: 1.25rem;
    }

    h2 {
      font-size: 1.5rem;
    }

    .links {
      flex-direction: column;
    }

    .link-button {
      justify-content: center;
    }
  }
</style>
