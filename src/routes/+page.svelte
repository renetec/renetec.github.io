<script>
  import { initTheme } from '$lib/stores/theme.svelte.js';
  import { onMount } from 'svelte';
  import BootScreen from '$lib/os/BootScreen.svelte';
  import Desktop from '$lib/os/Desktop.svelte';
  import WindowManager from '$lib/os/WindowManager.svelte';
  import Taskbar from '$lib/os/Taskbar.svelte';
  import AppLauncher from '$lib/os/AppLauncher.svelte';
  import { _ } from '$lib/i18n';

  let booted = $state(false);
  let launcherOpen = $state(false);

  onMount(() => {
    initTheme();
  });
</script>

<svelte:head>
  <title>ReneTec OS — {$_('os.tagline')}</title>
  <meta name="description" content={$_('os.metaDescription')} />
  <meta property="og:image" content="/og-image.png" />
  <meta property="og:title" content="ReneTec OS — Custom Software Development" />
  <meta property="og:description" content={$_('os.metaDescription')} />
</svelte:head>

{#if !booted}
  <BootScreen onComplete={() => booted = true} />
{:else}
  <Desktop />
  <WindowManager />
  <AppLauncher open={launcherOpen} onClose={() => launcherOpen = false} />
  <Taskbar onStartClick={() => launcherOpen = !launcherOpen} />

  <div class="sr-only">
    <h1>ReneTec — Custom Software Development</h1>
    <p>{$_('os.metaDescription')}</p>

    <h2>Services</h2>
    <ul>
      <li>Custom Software Development</li>
      <li>AI Integration — RAG, LLMs, Embeddings</li>
      <li>WordPress Plugins and Customization</li>
      <li>Data Platforms and Visualization</li>
      <li>SaaS Platform Development</li>
    </ul>

    <h2>Projects</h2>
    <article>
      <h3>Insurance Management Platform</h3>
      <p>Full-stack business management platform for insurance operations. Policy management, claims processing, client portal, and reporting dashboards. Built with SvelteKit, PostgreSQL, Docker, and Node.js.</p>
    </article>
    <article>
      <h3>Union Agreement Explorer</h3>
      <p>AI-powered search across Quebec union collective agreements. Natural language queries with RAG pipeline and semantic embeddings. Built with SvelteKit, AnythingLLM, RAG, and MiniLM.</p>
    </article>
    <article>
      <h3>ElectoQC — Political Intelligence</h3>
      <p>Open-source political intelligence platform for Quebec. Election data, demographics, school taxes, daycare stats, and political donations visualized on interactive maps. Built with SvelteKit, PostgreSQL, Leaflet, and D3.js.</p>
    </article>
    <article>
      <h3>WordPress Custom Plugins</h3>
      <p>Custom WordPress plugin development for SMB clients. Event management, membership systems, custom post types, and API integrations. Built with PHP, WordPress, MySQL, and REST API.</p>
    </article>

    <h2>About</h2>
    <p>With 30+ years of experience in computing — from writing code on MS-DOS to building AI-powered platforms — I design and build custom software solutions for businesses. Based in Saint-Pacôme, Québec, Canada.</p>

    <h2>Tech Stack</h2>
    <ul>
      <li>Frontend: SvelteKit, React, Flutter, WordPress</li>
      <li>Backend: Node.js, PHP, PostgreSQL, MySQL</li>
      <li>Infrastructure: Docker, Proxmox, Linux, Coolify</li>
      <li>AI: RAG, LLMs, AnythingLLM, Embeddings</li>
    </ul>

    <h2>Contact</h2>
    <address>
      <p>Email: <a href="mailto:rene@iatechinfo.com">rene@iatechinfo.com</a></p>
      <p>Website: <a href="https://iatechinfo.com">iatechinfo.com</a></p>
      <p>Location: Saint-Pacôme, Québec, Canada</p>
    </address>
  </div>
{/if}
