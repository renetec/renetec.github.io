<script>
  export let lines = [];
</script>

<div class="output">
  {#each lines as line}
    <div class="output-line">
      {#if line.type === 'command'}
        <span class="prompt">rene@portfolio:~$</span>
        <span class="command">{line.text}</span>
      {:else if line.type === 'error'}
        <span class="error">{line.text}</span>
      {:else}
        <span class="result">{@html line.text}</span>
      {/if}
    </div>
  {/each}
</div>

<style>
  .output {
    flex: 1;
    overflow-y: auto;
    padding: 1rem;
    font-family: 'JetBrains Mono', 'Fira Code', 'Courier New', monospace;
    font-size: 0.9rem;
    line-height: 1.6;
  }

  .output-line {
    margin-bottom: 0.5rem;
  }

  .prompt {
    color: var(--terminal-prompt);
    font-weight: bold;
    margin-right: 0.5rem;
  }

  .command {
    color: var(--terminal-text);
  }

  .result {
    color: var(--terminal-text);
    white-space: pre-wrap;
    word-wrap: break-word;
  }

  .error {
    color: var(--terminal-error);
  }

  @media (max-width: 768px) {
    .output {
      font-size: 0.8rem;
      padding: 0.75rem;
    }
  }
</style>
