<script>
  import { onMount } from 'svelte';
  import { playBoot } from '$lib/stores/sound.svelte.js';

  let { onComplete } = $props();

  let opacity = $state(0);
  let scale = $state(0.8);

  onMount(() => {
    if (sessionStorage.getItem('portfolio-os-booted')) {
      onComplete();
      return;
    }

    requestAnimationFrame(() => {
      opacity = 1;
      scale = 1;
    });

    playBoot();

    setTimeout(() => {
      opacity = 0;
      scale = 1.05;
    }, 2000);

    setTimeout(() => {
      sessionStorage.setItem('portfolio-os-booted', 'true');
      onComplete();
    }, 2500);
  });
</script>

<div class="boot-screen" style="opacity:{opacity}">
  <div class="logo-container" style="transform:scale({scale})">
    <div class="logo-text">ReneTec</div>
    <div class="logo-sub">Custom Software</div>
    <div class="glow"></div>
  </div>
</div>

<style>
  .boot-screen {
    position: fixed;
    inset: 0;
    background: var(--bg-primary);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 99999;
    transition: opacity 0.5s ease;
  }

  .logo-container {
    text-align: center;
    position: relative;
    transition: transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
  }

  .logo-text {
    font-size: 3rem;
    font-weight: 700;
    font-family: system-ui, -apple-system, sans-serif;
    color: var(--text-primary);
    letter-spacing: -0.02em;
  }

  .logo-sub {
    font-size: 1rem;
    color: var(--text-muted);
    font-family: system-ui, -apple-system, sans-serif;
    margin-top: 8px;
    letter-spacing: 0.2em;
    text-transform: uppercase;
  }

  .glow {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 200px;
    height: 200px;
    background: radial-gradient(circle, rgba(59, 130, 246, 0.15) 0%, transparent 70%);
    border-radius: 50%;
    pointer-events: none;
    animation: pulse 2s ease-in-out infinite;
  }

  @keyframes pulse {
    0%, 100% { opacity: 0.5; transform: translate(-50%, -50%) scale(1); }
    50% { opacity: 1; transform: translate(-50%, -50%) scale(1.2); }
  }

  @media (max-width: 768px) {
    .logo-text {
      font-size: 2rem;
    }
    .logo-sub {
      font-size: 0.8rem;
    }
  }
</style>
