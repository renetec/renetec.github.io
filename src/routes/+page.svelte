<script>
  import Terminal from '$lib/components/Terminal.svelte';
  import { profile } from '$lib/config';
</script>

<svelte:head>
  <title>{profile.name} - {profile.role}</title>
  <meta name="description" content="{profile.bio}" />
</svelte:head>

<div class="container">
  <div class="banner">
    <pre class="ascii-art">{`
 ██████╗ ███████╗███╗   ██╗███████╗
 ██╔══██╗██╔════╝████╗  ██║██╔════╝
 ██████╔╝█████╗  ██╔██╗ ██║█████╗
 ██╔══██╗██╔══╝  ██║╚██╗██║██╔══╝
 ██║  ██║███████╗██║ ╚████║███████╗
 ╚═╝  ╚═╝╚══════╝╚═╝  ╚═══╝╚══════╝
    `}</pre>
    <p class="tagline">{profile.role} • {profile.location}</p>
  </div>

  <div class="terminal-wrapper">
    <Terminal />
  </div>

  <div class="quick-links">
    <h2>Quick Navigation</h2>
    <div class="links-grid">
      <a href="/projects" class="link-card">
        <span class="icon">💼</span>
        <span class="text">Projects</span>
      </a>
      <a href="/timeline" class="link-card">
        <span class="icon">📅</span>
        <span class="text">Timeline</span>
      </a>
      <a href="/stats" class="link-card">
        <span class="icon">📊</span>
        <span class="text">Stats</span>
      </a>
    </div>
  </div>
</div>

<style>
  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 2rem;
  }

  .banner {
    text-align: center;
    margin-bottom: 3rem;
  }

  .ascii-art {
    font-family: 'JetBrains Mono', 'Fira Code', monospace;
    font-size: 0.8rem;
    line-height: 1.2;
    color: var(--terminal-keyword);
    margin: 0 auto;
    display: inline-block;
    text-align: left;
  }

  .tagline {
    color: var(--terminal-comment);
    font-size: 1.1rem;
    margin-top: 1rem;
    font-family: 'JetBrains Mono', 'Fira Code', monospace;
  }

  .terminal-wrapper {
    margin: 3rem 0;
  }

  .quick-links {
    margin-top: 4rem;
    text-align: center;
  }

  .quick-links h2 {
    color: var(--terminal-text);
    font-family: 'JetBrains Mono', 'Fira Code', monospace;
    font-size: 1.5rem;
    margin-bottom: 2rem;
  }

  .links-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1.5rem;
    max-width: 800px;
    margin: 0 auto;
  }

  .link-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.75rem;
    padding: 2rem 1.5rem;
    background: var(--terminal-bg);
    border: 1px solid var(--terminal-border);
    border-radius: 8px;
    text-decoration: none;
    color: var(--terminal-text);
    transition: all 0.3s ease;
  }

  .link-card:hover {
    transform: translateY(-4px);
    border-color: var(--terminal-keyword);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
  }

  .link-card .icon {
    font-size: 2rem;
  }

  .link-card .text {
    font-family: 'JetBrains Mono', 'Fira Code', monospace;
    font-size: 1.1rem;
    font-weight: bold;
  }

  @media (max-width: 768px) {
    .container {
      padding: 1rem;
    }

    .ascii-art {
      font-size: 0.5rem;
    }

    .tagline {
      font-size: 0.9rem;
    }

    .banner {
      margin-bottom: 2rem;
    }

    .terminal-wrapper {
      margin: 2rem 0;
    }

    .quick-links h2 {
      font-size: 1.2rem;
    }

    .links-grid {
      grid-template-columns: 1fr;
      gap: 1rem;
    }

    .link-card {
      padding: 1.5rem 1rem;
    }
  }

  @media (max-width: 480px) {
    .ascii-art {
      font-size: 0.4rem;
    }

    .tagline {
      font-size: 0.8rem;
    }
  }
</style>
