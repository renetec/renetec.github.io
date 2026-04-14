<script>
  import { onMount, tick } from 'svelte';
  import { _, locale } from '$lib/i18n';
  import { playType } from '$lib/stores/sound.svelte.js';
  import { openWindow } from '$lib/stores/windows.svelte.js';
  import projectsData from '$lib/data/projects.json';

  const PROMPT = 'renetec@portfolio:~$ ';

  // Terminal state
  let outputLines = $state([]);
  let inputValue = $state('');
  let commandHistory = $state([]);
  let historyIndex = $state(-1);

  // DOM refs
  let outputEl;
  let inputEl;

  // ── Bilingual helpers ──────────────────────────────────────────
  function t(en, fr) {
    return $locale === 'fr' ? fr : en;
  }

  // ── Command implementations ────────────────────────────────────
  function cmdHelp() {
    return t(
      `<span class="cmd">help</span>             - Show this help message
<span class="cmd">whoami</span>           - About me
<span class="cmd">ls</span>               - List directories
<span class="cmd">ls projects</span>      - List project names
<span class="cmd">projects</span>         - Same as ls projects
<span class="cmd">contact</span>          - Contact info &amp; open Mail
<span class="cmd">services</span>         - What I offer
<span class="cmd">cat services.md</span>  - Same as services
<span class="cmd">neofetch</span>         - System info
<span class="cmd">clear</span>            - Clear terminal
<span class="cmd">sudo hire-me</span>     - 😏`,
      `<span class="cmd">help</span>             - Afficher ce message
<span class="cmd">whoami</span>           - À mon sujet
<span class="cmd">ls</span>               - Lister les répertoires
<span class="cmd">ls projects</span>      - Liste des projets
<span class="cmd">projects</span>         - Identique à ls projects
<span class="cmd">contact</span>          - Contact &amp; ouvrir Courriel
<span class="cmd">services</span>         - Ce que j'offre
<span class="cmd">cat services.md</span>  - Identique à services
<span class="cmd">neofetch</span>         - Infos système
<span class="cmd">clear</span>            - Effacer le terminal
<span class="cmd">sudo hire-me</span>     - 😏`
    );
  }

  function cmdWhoami() {
    return t(
      `<strong>René</strong>
Full-Stack Developer
Québec, Canada

Passionate developer with 30+ years of experience building modern
web applications, AI-powered tools, and data platforms.

GitHub: github.com/renetec`,
      `<strong>René</strong>
Développeur Full-Stack
Québec, Canada

Développeur passionné avec plus de 30 ans d'expérience à créer des
applications web modernes, des outils propulsés par l'IA et des
plateformes de données.

GitHub: github.com/renetec`
    );
  }

  function cmdLs(arg) {
    if (arg === 'projects') {
      return cmdLsProjects();
    }
    return t(
      `<span class="dir">projects/</span>   <span class="dir">about/</span>   <span class="dir">services/</span>   <span class="file">contact.txt</span>`,
      `<span class="dir">projects/</span>   <span class="dir">about/</span>   <span class="dir">services/</span>   <span class="file">contact.txt</span>`
    );
  }

  function cmdLsProjects() {
    const lines = projectsData
      .map(p => `  <span class="dir">${p.title[$locale] || p.title.en}</span>`)
      .join('\n');
    return t(
      `projects/\n${lines}`,
      `projects/\n${lines}`
    );
  }

  function cmdContact() {
    openWindow('mail', $locale === 'fr' ? 'Courriel' : 'Mail');
    return t(
      `<strong>Contact Information</strong>

Email:    rene@iatechinfo.com
GitHub:   github.com/renetec
Location: Québec, Canada

<span class="ok">✓ Opening Mail app...</span>`,
      `<strong>Informations de contact</strong>

Courriel : rene@iatechinfo.com
GitHub :   github.com/renetec
Lieu :     Québec, Canada

<span class="ok">✓ Ouverture de l'application Courriel...</span>`
    );
  }

  function cmdServices() {
    return t(
      `<strong>Services</strong>

  • Custom Software Development
  • AI Integration (RAG, LLMs, Embeddings)
  • WordPress Plugins &amp; Customization
  • Data Platforms &amp; Visualization`,
      `<strong>Services</strong>

  • Développement logiciel sur mesure
  • Intégration IA (RAG, LLMs, Embeddings)
  • Plugins &amp; personnalisation WordPress
  • Plateformes de données &amp; visualisation`
    );
  }

  function cmdNeofetch() {
    return `<span class="accent">renetec@portfolio</span>
<span class="accent">-----------------</span>
<span class="label">OS:</span>       ReneTec Portfolio OS
<span class="label">Uptime:</span>   30+ ${t('years', 'ans')}
<span class="label">Projects:</span> 4
<span class="label">Stack:</span>    SvelteKit, PostgreSQL, Docker
<span class="label">AI:</span>       RAG, LLMs, Embeddings
<span class="label">Contact:</span>  rene@iatechinfo.com`;
  }

  function cmdSudoHireMe() {
    openWindow('mail', $locale === 'fr' ? 'Courriel' : 'Mail');
    return t(
      `<span class="ok">[sudo] password for visitor: ••••••••</span>
<span class="ok">Access granted.</span>
<span class="ok">Opening secure communication channel...</span>`,
      `<span class="ok">[sudo] mot de passe pour visiteur : ••••••••</span>
<span class="ok">Accès accordé.</span>
<span class="ok">Ouverture du canal de communication sécurisé...</span>`
    );
  }

  // ── Command dispatcher ─────────────────────────────────────────
  function runCommand(raw) {
    const trimmed = raw.trim();
    if (!trimmed) return;

    // Add to history
    commandHistory = [...commandHistory, trimmed];
    historyIndex = commandHistory.length;

    // Echo command line
    outputLines = [...outputLines, { type: 'command', text: trimmed }];

    const lower = trimmed.toLowerCase();
    let result = null;

    if (lower === 'help') {
      result = cmdHelp();
    } else if (lower === 'whoami') {
      result = cmdWhoami();
    } else if (lower === 'ls') {
      result = cmdLs('');
    } else if (lower === 'ls projects') {
      result = cmdLs('projects');
    } else if (lower === 'projects') {
      result = cmdLsProjects();
    } else if (lower === 'contact') {
      result = cmdContact();
    } else if (lower === 'services' || lower === 'cat services.md') {
      result = cmdServices();
    } else if (lower === 'neofetch') {
      result = cmdNeofetch();
    } else if (lower === 'clear') {
      outputLines = [];
      return;
    } else if (lower === 'sudo hire-me') {
      result = cmdSudoHireMe();
    } else {
      result = t(
        `Command not found: <span class="err">${trimmed}</span>. Type <span class="cmd">help</span> for available commands.`,
        `Commande introuvable : <span class="err">${trimmed}</span>. Tapez <span class="cmd">help</span> pour les commandes disponibles.`
      );
      outputLines = [...outputLines, { type: 'error', text: result }];
      return;
    }

    if (result !== null) {
      outputLines = [...outputLines, { type: 'output', text: result }];
    }
  }

  // ── Input handlers ─────────────────────────────────────────────
  function handleKeydown(e) {
    if (e.key === 'Enter') {
      const cmd = inputValue;
      inputValue = '';
      runCommand(cmd);
      tick().then(scrollToBottom);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (historyIndex > 0) {
        historyIndex--;
        inputValue = commandHistory[historyIndex];
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex < commandHistory.length - 1) {
        historyIndex++;
        inputValue = commandHistory[historyIndex];
      } else {
        historyIndex = commandHistory.length;
        inputValue = '';
      }
    }
  }

  function handleInput() {
    playType();
  }

  function scrollToBottom() {
    if (outputEl) {
      outputEl.scrollTop = outputEl.scrollHeight;
    }
  }

  // ── Welcome message typed on mount ────────────────────────────
  async function typeWelcome() {
    const msg = t(
      `Welcome to <strong>ReneTec Portfolio OS</strong>! Type <span class="cmd">help</span> to see available commands.`,
      `Bienvenue sur <strong>ReneTec Portfolio OS</strong> ! Tapez <span class="cmd">help</span> pour voir les commandes disponibles.`
    );
    outputLines = [{ type: 'output', text: msg }];
    await tick();
    scrollToBottom();
  }

  onMount(async () => {
    await typeWelcome();
    if (inputEl) inputEl.focus();
  });
</script>

<div class="terminal" onclick={() => inputEl?.focus()}>
  <!-- Output area -->
  <div class="output" bind:this={outputEl}>
    {#each outputLines as line (line)}
      {#if line.type === 'command'}
        <div class="line command-line">
          <span class="prompt">{PROMPT}</span><span>{line.text}</span>
        </div>
      {:else if line.type === 'error'}
        <div class="line error-line">
          <!-- eslint-disable-next-line svelte/no-at-html-tags -->
          {@html line.text}
        </div>
      {:else}
        <div class="line output-line">
          <!-- eslint-disable-next-line svelte/no-at-html-tags -->
          {@html line.text}
        </div>
      {/if}
    {/each}
  </div>

  <!-- Input row -->
  <div class="input-row">
    <span class="prompt">{PROMPT}</span>
    <input
      bind:this={inputEl}
      bind:value={inputValue}
      type="text"
      class="cmd-input"
      autocomplete="off"
      autocorrect="off"
      autocapitalize="off"
      spellcheck="false"
      onkeydown={handleKeydown}
      oninput={handleInput}
    />
  </div>
</div>

<style>
  .terminal {
    background: var(--bg-primary);
    color: var(--text-primary);
    font-family: 'JetBrains Mono', 'Fira Code', 'Courier New', monospace;
    font-size: 0.82rem;
    line-height: 1.6;
    display: flex;
    flex-direction: column;
    height: 100%;
    overflow: hidden;
    cursor: text;
    padding: 4px 0 0;
  }

  .output {
    flex: 1;
    overflow-y: auto;
    padding: 10px 14px 6px;
    display: flex;
    flex-direction: column;
    gap: 2px;
  }

  /* Scrollbar */
  .output::-webkit-scrollbar { width: 6px; }
  .output::-webkit-scrollbar-track { background: transparent; }
  .output::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.12); border-radius: 3px; }
  .output::-webkit-scrollbar-thumb:hover { background: rgba(255,255,255,0.22); }

  .line {
    white-space: pre-wrap;
    word-break: break-word;
  }

  .command-line {
    display: flex;
    align-items: baseline;
    gap: 0;
  }

  .output-line {
    padding-left: 2px;
    opacity: 0.9;
  }

  .error-line {
    padding-left: 2px;
    color: #ff6b6b;
  }

  .input-row {
    display: flex;
    align-items: center;
    padding: 6px 14px 10px;
    border-top: 1px solid rgba(255,255,255,0.06);
    flex-shrink: 0;
  }

  .prompt {
    color: var(--accent);
    white-space: nowrap;
    flex-shrink: 0;
    font-family: 'JetBrains Mono', 'Fira Code', 'Courier New', monospace;
    font-size: 0.82rem;
  }

  .cmd-input {
    flex: 1;
    background: transparent;
    border: none;
    outline: none;
    color: var(--text-primary);
    font-family: 'JetBrains Mono', 'Fira Code', 'Courier New', monospace;
    font-size: 0.82rem;
    caret-color: var(--accent);
    padding: 0;
    margin: 0;
    line-height: 1.6;
  }

  /* Inline HTML styling from command output */
  :global(.terminal .cmd) {
    color: var(--accent);
    font-weight: 600;
  }

  :global(.terminal .dir) {
    color: #5bc0de;
    font-weight: 600;
  }

  :global(.terminal .file) {
    color: var(--text-primary);
  }

  :global(.terminal .ok) {
    color: #5cb85c;
  }

  :global(.terminal .err) {
    color: #ff6b6b;
  }

  :global(.terminal .accent) {
    color: var(--accent);
    font-weight: 600;
  }

  :global(.terminal .label) {
    color: var(--accent);
    font-weight: 600;
  }

  :global(.terminal strong) {
    color: var(--text-primary);
    font-weight: 700;
  }
</style>
