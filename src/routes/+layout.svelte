<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';
	import { _ } from '$lib/i18n';
	import LanguageToggle from '$lib/components/LanguageToggle.svelte';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<div class="app">
	<header class="header">
		<nav class="nav-container">
			<a href="/" class="logo">René</a>
			<div class="nav-links">
				<a href="/projects">{$_('nav.projects')}</a>
				<a href="/timeline">{$_('nav.timeline')}</a>
				<a href="/stats">{$_('nav.stats')}</a>
				<LanguageToggle />
			</div>
		</nav>
	</header>

	<main class="main-content">
		{@render children()}
	</main>
</div>

<style>
	.app {
		min-height: 100vh;
		display: flex;
		flex-direction: column;
	}

	.header {
		background: var(--terminal-bg);
		border-bottom: 1px solid var(--terminal-border);
		position: sticky;
		top: 0;
		z-index: 100;
	}

	.nav-container {
		max-width: 1200px;
		margin: 0 auto;
		padding: 1rem 2rem;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.logo {
		font-family: 'JetBrains Mono', 'Fira Code', monospace;
		font-size: 1.5rem;
		font-weight: bold;
		color: var(--terminal-keyword);
		text-decoration: none;
		transition: color 0.3s ease;
	}

	.logo:hover {
		color: var(--terminal-string);
	}

	.nav-links {
		display: flex;
		gap: 2rem;
		align-items: center;
	}

	.nav-links a {
		font-family: 'JetBrains Mono', 'Fira Code', monospace;
		color: var(--terminal-text);
		text-decoration: none;
		transition: color 0.3s ease;
		font-size: 1rem;
	}

	.nav-links a:hover {
		color: var(--terminal-keyword);
	}

	.main-content {
		flex: 1;
	}

	@media (max-width: 768px) {
		.nav-container {
			padding: 1rem;
		}

		.logo {
			font-size: 1.2rem;
		}

		.nav-links {
			gap: 1rem;
		}

		.nav-links a {
			font-size: 0.9rem;
		}
	}

	@media (max-width: 480px) {
		.nav-links {
			gap: 0.5rem;
		}

		.nav-links a {
			font-size: 0.8rem;
		}
	}
</style>
