<script>
  import { locale } from '$lib/i18n';
  import { onMount, onDestroy } from 'svelte';

  let { project } = $props();

  let currentSlide = $state(0);
  let timer;

  onMount(() => {
    if (project.screenshots.length > 1) {
      timer = setInterval(() => {
        currentSlide = (currentSlide + 1) % project.screenshots.length;
      }, 3000);
    }
  });

  onDestroy(() => {
    if (timer) clearInterval(timer);
  });
</script>

<div class="detail">
  <div class="slideshow">
    {#each project.screenshots as src, i}
      <div class="slide" class:active={i === currentSlide}>
        <img
          src="/screenshots/{src}"
          alt="Screenshot {i + 1}"
          onerror={(e) => { e.currentTarget.style.display='none'; e.currentTarget.nextElementSibling.style.display='flex'; }}
        />
        <div class="placeholder" style="display:none">
          <span>{project.icon}</span>
          <span>Screenshot {i + 1}</span>
        </div>
      </div>
    {/each}
    <div class="slide-dots">
      {#each project.screenshots as _, i}
        <button
          class="dot"
          class:active={i === currentSlide}
          onclick={() => currentSlide = i}
          aria-label="Slide {i + 1}"
        ></button>
      {/each}
    </div>
  </div>

  <div class="info">
    <h2>{project.title[$locale] || project.title.en}</h2>
    <p>{project.description[$locale] || project.description.en}</p>

    <div class="tech-stack">
      {#each project.techStack as tech}
        <span class="badge">{tech}</span>
      {/each}
    </div>
  </div>
</div>

<style>
  .detail { height: 100%; overflow-y: auto; }
  .slideshow { position: relative; width: 100%; height: 250px; background: var(--bg-tertiary); overflow: hidden; }
  .slide { position: absolute; inset: 0; opacity: 0; transition: opacity 0.8s ease; }
  .slide.active { opacity: 1; }
  .slide img { width: 100%; height: 100%; object-fit: cover; }
  .placeholder { width: 100%; height: 100%; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 8px; color: var(--text-muted); font-family: system-ui, -apple-system, sans-serif; font-size: 0.85rem; }
  .placeholder span:first-child { font-size: 3rem; }
  .slide-dots { position: absolute; bottom: 12px; left: 50%; transform: translateX(-50%); display: flex; gap: 6px; }
  .dot { width: 8px; height: 8px; border-radius: 50%; background: rgba(255, 255, 255, 0.3); border: none; padding: 0; cursor: pointer; transition: background 0.2s; }
  .dot.active { background: var(--accent); }
  .info { padding: 24px; }
  .info h2 { font-size: 1.2rem; font-family: system-ui, -apple-system, sans-serif; margin: 0 0 12px; color: var(--text-primary); }
  .info p { font-size: 0.85rem; line-height: 1.6; color: var(--text-secondary); font-family: system-ui, -apple-system, sans-serif; margin: 0 0 16px; }
  .tech-stack { display: flex; gap: 8px; flex-wrap: wrap; }
  .badge { padding: 4px 12px; border-radius: 16px; background: rgba(59, 130, 246, 0.1); color: var(--accent); font-size: 0.75rem; font-family: system-ui, -apple-system, sans-serif; }
</style>
