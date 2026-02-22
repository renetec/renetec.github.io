<script>
  import { createEventDispatcher } from 'svelte';
  import { _ } from '$lib/i18n';

  export let value = '';

  const dispatch = createEventDispatcher();
  let inputElement;

  function handleKeydown(event) {
    if (event.key === 'Enter') {
      dispatch('submit', value);
      value = '';
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      dispatch('history', { direction: 'up' });
    } else if (event.key === 'ArrowDown') {
      event.preventDefault();
      dispatch('history', { direction: 'down' });
    }
  }

  export function focus() {
    inputElement?.focus();
  }
</script>

<div class="prompt-container">
  <span class="prompt">rene@portfolio:~$</span>
  <input
    bind:this={inputElement}
    bind:value
    on:keydown={handleKeydown}
    type="text"
    class="command-input"
    placeholder={$_('home.terminalPlaceholder')}
    autocomplete="off"
    autocorrect="off"
    autocapitalize="off"
    spellcheck="false"
  />
</div>

<style>
  .prompt-container {
    display: flex;
    align-items: center;
    padding: 0.75rem 1rem;
    background: var(--terminal-bg);
    border-top: 1px solid var(--terminal-border);
  }

  .prompt {
    color: var(--terminal-prompt);
    font-weight: bold;
    margin-right: 0.5rem;
    font-family: 'JetBrains Mono', 'Fira Code', 'Courier New', monospace;
    white-space: nowrap;
  }

  .command-input {
    flex: 1;
    background: transparent;
    border: none;
    outline: none;
    color: var(--terminal-text);
    font-family: 'JetBrains Mono', 'Fira Code', 'Courier New', monospace;
    font-size: 0.9rem;
    caret-color: var(--terminal-text);
  }

  .command-input::placeholder {
    color: var(--terminal-comment);
    opacity: 0.5;
  }

  @media (max-width: 768px) {
    .prompt-container {
      padding: 0.5rem 0.75rem;
    }

    .command-input {
      font-size: 0.8rem;
    }
  }
</style>
