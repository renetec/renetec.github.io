<script>
  import { profile } from '$lib/config';
  import GitHubStats from '$lib/components/GitHubStats.svelte';
</script>

<svelte:head>
  <title>GitHub Stats - {profile.name}</title>
  <meta name="description" content="GitHub statistics and activity for {profile.name}" />
</svelte:head>

<div class="stats-page">
  <header class="page-header">
    <h1 class="terminal-prompt">$ github --stats</h1>
    <p class="subtitle">Live statistics from GitHub</p>
  </header>

  <section class="github-stats-section">
    <GitHubStats username={profile.github} />
  </section>

  <section class="contribution-section">
    <h2 class="section-title">
      <span class="prompt-symbol">></span> Contribution Graph
    </h2>
    <div class="contribution-graph">
      <img
        src="https://ghchart.rshah.org/{profile.github}"
        alt="{profile.name}'s GitHub contribution graph"
        loading="lazy"
      />
    </div>
  </section>
</div>

<style>
  .stats-page {
    max-width: 1200px;
    margin: 0 auto;
    padding: 2rem 1rem;
  }

  .page-header {
    margin-bottom: 3rem;
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

  .github-stats-section {
    margin-bottom: 3rem;
  }

  .contribution-section {
    background: rgba(0, 20, 0, 0.6);
    border: 1px solid rgba(0, 255, 0, 0.3);
    border-radius: 0.5rem;
    padding: 1.5rem;
  }

  .section-title {
    font-family: 'Courier New', monospace;
    font-size: 1.25rem;
    color: #00ff00;
    margin: 0 0 1.5rem 0;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .prompt-symbol {
    color: rgba(0, 255, 0, 0.8);
    font-weight: bold;
  }

  .contribution-graph {
    display: flex;
    justify-content: center;
    padding: 1rem;
    background: rgba(0, 0, 0, 0.3);
    border-radius: 0.5rem;
    overflow-x: auto;
  }

  .contribution-graph img {
    max-width: 100%;
    height: auto;
    display: block;
    border-radius: 0.25rem;
  }

  @media (max-width: 768px) {
    .terminal-prompt {
      font-size: 1.5rem;
    }

    .page-header {
      margin-bottom: 2rem;
    }

    .github-stats-section {
      margin-bottom: 2rem;
    }

    .contribution-section {
      padding: 1rem;
    }

    .section-title {
      font-size: 1.125rem;
      margin-bottom: 1rem;
    }

    .contribution-graph {
      padding: 0.5rem;
    }
  }
</style>
