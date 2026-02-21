<script>
  import { profile } from '$lib/config';
  import Timeline from '$lib/components/Timeline.svelte';
</script>

<svelte:head>
  <title>Timeline - {profile.name}</title>
  <meta name="description" content="Project timeline and learning journey of {profile.name}" />
</svelte:head>

<div class="timeline-page">
  <header class="page-header">
    <h1 class="terminal-prompt">$ cat ~/timeline.log</h1>
    <p class="subtitle">My journey through code and projects</p>
  </header>

  {#if profile.currentlyLearning && profile.currentlyLearning.length > 0}
    <section class="currently-learning">
      <h2 class="section-title">
        <span class="prompt-symbol">></span> Currently Learning
      </h2>
      <div class="learning-tags">
        {#each profile.currentlyLearning as tech}
          <span class="learning-tag">{tech}</span>
        {/each}
      </div>
    </section>
  {/if}

  <section class="timeline-section">
    <h2 class="section-title">
      <span class="prompt-symbol">></span> Project Timeline
    </h2>
    <Timeline />
  </section>
</div>

<style>
  .timeline-page {
    max-width: 900px;
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

  .currently-learning {
    background: rgba(0, 20, 0, 0.6);
    border: 1px solid rgba(0, 255, 0, 0.3);
    border-radius: 0.5rem;
    padding: 1.5rem;
    margin-bottom: 3rem;
  }

  .section-title {
    font-family: 'Courier New', monospace;
    font-size: 1.25rem;
    color: #00ff00;
    margin: 0 0 1rem 0;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .prompt-symbol {
    color: rgba(0, 255, 0, 0.8);
    font-weight: bold;
  }

  .learning-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.75rem;
  }

  .learning-tag {
    display: inline-block;
    padding: 0.5rem 1rem;
    background: rgba(0, 255, 0, 0.1);
    border: 1px solid rgba(0, 255, 0, 0.3);
    border-radius: 0.25rem;
    color: #00ff00;
    font-family: 'Courier New', monospace;
    font-size: 0.875rem;
    font-weight: 500;
    transition: all 0.2s ease;
  }

  .learning-tag:hover {
    background: rgba(0, 255, 0, 0.2);
    border-color: rgba(0, 255, 0, 0.5);
    box-shadow: 0 0 8px rgba(0, 255, 0, 0.3);
    transform: translateY(-2px);
  }

  .timeline-section {
    margin-bottom: 2rem;
  }

  .timeline-section .section-title {
    margin-bottom: 2rem;
  }

  @media (max-width: 768px) {
    .terminal-prompt {
      font-size: 1.5rem;
    }

    .page-header {
      margin-bottom: 2rem;
    }

    .currently-learning {
      padding: 1rem;
      margin-bottom: 2rem;
    }

    .section-title {
      font-size: 1.125rem;
    }

    .learning-tags {
      gap: 0.5rem;
    }

    .learning-tag {
      padding: 0.375rem 0.75rem;
      font-size: 0.8125rem;
    }
  }
</style>
