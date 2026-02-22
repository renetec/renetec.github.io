<script>
  import { onMount } from 'svelte';
  import Output from './Output.svelte';
  import CommandPrompt from './CommandPrompt.svelte';
  import { profile, projects } from '$lib/config';
  import { _ } from '$lib/i18n';

  let outputLines = [];
  let commandHistory = [];
  let historyIndex = -1;
  let promptComponent;

  const commands = {
    help: () => {
      return $_('terminal.helpText');
    },

    whoami: () => {
      return `<strong>${profile.name}</strong>
${profile.role}
${profile.location}

${profile.bio}

GitHub: github.com/${profile.github}
Email: ${profile.email}`;
    },

    ls: () => {
      return `<span class="directory">projects/</span>
<span class="directory">timeline/</span>
<span class="directory">stats/</span>
<span class="file">README.md</span>
<span class="file">contact.txt</span>`;
    },

    projects: () => {
      const projectList = projects
        .filter(p => p.featured)
        .map((p, i) => {
          const tech = p.tech.join(', ');
          return `${i + 1}. <strong>${p.name}</strong> (${p.year})
   ${p.tagline}
   Tech: ${tech}
   ${p.links.github ? `GitHub: ${p.links.github}` : ''}
   ${p.links.live ? `Demo: ${p.links.live}` : ''}`;
        })
        .join('\n\n');

      return `<strong>${$_('terminal.featuredProjects')}</strong>\n\n${projectList}`;
    },

    contact: () => {
      return `<strong>${$_('terminal.contactInfo')}</strong>

GitHub: github.com/${profile.username}
Location: ${profile.location}

${$_('terminal.feelFreeToReach')}`;
    },

    clear: () => {
      outputLines = [];
      return null;
    }
  };

  function handleCommand(event) {
    const command = event.detail.trim();

    if (!command) return;

    // Add command to history
    commandHistory.push(command);
    historyIndex = commandHistory.length;

    // Add command to output
    outputLines = [
      ...outputLines,
      { type: 'command', text: command }
    ];

    // Parse and execute command
    const cmd = command.toLowerCase();

    if (commands[cmd]) {
      const result = commands[cmd]();
      if (result !== null) {
        outputLines = [
          ...outputLines,
          { type: 'output', text: result }
        ];
      }
    } else {
      const errorMsg = $_('terminal.commandNotFound').replace('{command}', command);
      outputLines = [
        ...outputLines,
        { type: 'error', text: errorMsg }
      ];
    }

    // Scroll to bottom
    setTimeout(() => {
      const outputEl = document.querySelector('.output');
      if (outputEl) {
        outputEl.scrollTop = outputEl.scrollHeight;
      }
    }, 0);
  }

  function handleHistory(event) {
    const { direction } = event.detail;

    if (direction === 'up' && historyIndex > 0) {
      historyIndex--;
      promptComponent.value = commandHistory[historyIndex];
    } else if (direction === 'down') {
      if (historyIndex < commandHistory.length - 1) {
        historyIndex++;
        promptComponent.value = commandHistory[historyIndex];
      } else {
        historyIndex = commandHistory.length;
        promptComponent.value = '';
      }
    }
  }

  onMount(() => {
    promptComponent.focus();

    // Add welcome message
    outputLines = [
      {
        type: 'output',
        text: $_('terminal.welcome')
      }
    ];
  });
</script>

<div class="terminal-container">
  <div class="terminal-header">
    <div class="buttons">
      <span class="button close"></span>
      <span class="button minimize"></span>
      <span class="button maximize"></span>
    </div>
    <div class="title">rene@portfolio:~</div>
  </div>

  <div class="terminal-body">
    <Output lines={outputLines} />
    <CommandPrompt
      bind:this={promptComponent}
      on:submit={handleCommand}
      on:history={handleHistory}
    />
  </div>
</div>

<style>
  .terminal-container {
    background: var(--terminal-bg);
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
    border: 1px solid var(--terminal-border);
    max-width: 900px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    height: 600px;
  }

  .terminal-header {
    background: var(--terminal-header-bg);
    padding: 0.75rem 1rem;
    display: flex;
    align-items: center;
    border-bottom: 1px solid var(--terminal-border);
  }

  .buttons {
    display: flex;
    gap: 0.5rem;
  }

  .button {
    width: 12px;
    height: 12px;
    border-radius: 50%;
  }

  .button.close {
    background: #ff5f56;
  }

  .button.minimize {
    background: #ffbd2e;
  }

  .button.maximize {
    background: #27c93f;
  }

  .title {
    flex: 1;
    text-align: center;
    color: var(--terminal-comment);
    font-family: 'JetBrains Mono', 'Fira Code', 'Courier New', monospace;
    font-size: 0.85rem;
    margin-left: -60px; /* Center accounting for buttons */
  }

  .terminal-body {
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }

  :global(.command-help) {
    color: var(--terminal-keyword);
    font-weight: bold;
  }

  :global(.directory) {
    color: var(--terminal-function);
    font-weight: bold;
  }

  :global(.file) {
    color: var(--terminal-text);
  }

  @media (max-width: 768px) {
    .terminal-container {
      height: 500px;
      border-radius: 4px;
    }

    .terminal-header {
      padding: 0.5rem 0.75rem;
    }

    .button {
      width: 10px;
      height: 10px;
    }

    .title {
      font-size: 0.75rem;
    }
  }
</style>
