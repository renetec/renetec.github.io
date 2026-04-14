<script>
  import { _ } from '$lib/i18n';

  const techStack = [
    {
      category: 'frontend',
      color: '#4361ee',
      items: ['SvelteKit', 'React', 'Flutter', 'WordPress']
    },
    {
      category: 'backend',
      color: '#7209b7',
      items: ['Node.js', 'PHP', 'PostgreSQL', 'MySQL']
    },
    {
      category: 'infrastructure',
      color: '#f72585',
      items: ['Docker', 'Proxmox', 'Linux', 'Coolify']
    },
    {
      category: 'ai',
      color: '#4cc9f0',
      items: ['RAG', 'LLMs', 'AnythingLLM', 'Embeddings']
    }
  ];
</script>

<div class="about-app">
  <div class="about-content">
    <!-- Header -->
    <header class="about-header">
      <div class="avatar">R</div>
      <div class="header-text">
        <h1 class="name">{$_('about.title')}</h1>
        <p class="tagline">{$_('about.tagline')}</p>
        <p class="location">📍 {$_('about.location')}</p>
      </div>
    </header>

    <!-- Bio -->
    <section class="bio-section">
      <p class="bio">{$_('about.bio')}</p>
    </section>

    <!-- Tech Stack -->
    <section class="stack-section">
      <div class="stack-grid">
        {#each techStack as group}
          <div class="stack-group">
            <h3 class="group-label" style="color: {group.color}">
              {$_(`about.${group.category}`)}
            </h3>
            <div class="badge-row">
              {#each group.items as item}
                <span class="badge" style="--badge-color: {group.color}">{item}</span>
              {/each}
            </div>
          </div>
        {/each}
      </div>
    </section>

    <!-- Footer link -->
    <footer class="about-footer">
      <p>
        {$_('about.localServices')}
        <a href="https://iatechinfo.com" target="_blank" rel="noopener" class="ext-link">iatechinfo.com</a>
      </p>
    </footer>
  </div>
</div>

<style>
  .about-app {
    height: 100%;
    overflow-y: auto;
    font-family: system-ui, -apple-system, sans-serif;
    background: var(--bg-primary, #1a1a2e);
    color: var(--text-primary, #e2e8f0);
  }

  .about-content {
    max-width: 680px;
    margin: 0 auto;
    padding: 32px 28px;
    display: flex;
    flex-direction: column;
    gap: 32px;
  }

  /* Header */
  .about-header {
    display: flex;
    align-items: center;
    gap: 20px;
  }

  .avatar {
    width: 72px;
    height: 72px;
    border-radius: 50%;
    background: linear-gradient(135deg, #4361ee, #7209b7);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 28px;
    font-weight: 700;
    color: #fff;
    flex-shrink: 0;
  }

  .header-text {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .name {
    font-size: 26px;
    font-weight: 700;
    margin: 0;
    color: var(--text-primary, #e2e8f0);
  }

  .tagline {
    font-size: 14px;
    color: var(--accent-primary, #4361ee);
    margin: 0;
    font-weight: 500;
  }

  .location {
    font-size: 13px;
    color: var(--text-muted, #718096);
    margin: 0;
  }

  /* Bio */
  .bio-section {
    padding: 20px 24px;
    background: var(--bg-secondary, #16213e);
    border-radius: 12px;
    border-left: 3px solid var(--accent-primary, #4361ee);
  }

  .bio {
    font-size: 14px;
    line-height: 1.75;
    margin: 0;
    color: var(--text-secondary, #cbd5e0);
  }

  /* Tech Stack */
  .stack-section {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .stack-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
  }

  @media (max-width: 480px) {
    .stack-grid {
      grid-template-columns: 1fr;
    }

    .about-content {
      padding: 20px 16px;
    }

    .about-header {
      flex-direction: column;
      text-align: center;
    }

    .name {
      font-size: 22px;
    }
  }

  .stack-group {
    background: var(--bg-secondary, #16213e);
    border-radius: 10px;
    padding: 14px 16px;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .group-label {
    font-size: 11px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    margin: 0;
  }

  .badge-row {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
  }

  .badge {
    padding: 4px 10px;
    border-radius: 20px;
    font-size: 12px;
    font-weight: 500;
    background: color-mix(in srgb, var(--badge-color) 15%, transparent);
    color: var(--badge-color);
    border: 1px solid color-mix(in srgb, var(--badge-color) 30%, transparent);
  }

  /* Footer */
  .about-footer {
    padding-top: 8px;
    border-top: 1px solid var(--border-color, rgba(255,255,255,0.08));
  }

  .about-footer p {
    font-size: 13px;
    color: var(--text-muted, #718096);
    margin: 0;
  }

  .ext-link {
    color: var(--accent-primary, #4361ee);
    text-decoration: none;
    font-weight: 500;
  }
  .ext-link:hover {
    text-decoration: underline;
  }
</style>
