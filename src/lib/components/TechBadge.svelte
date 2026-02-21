<script>
  export let tech;
  export let size = 'md'; // sm, md, lg

  const sizeClasses = {
    sm: 'text-xs px-2 py-0.5',
    md: 'text-sm px-2.5 py-1',
    lg: 'text-base px-3 py-1.5'
  };
</script>

<span
  class="tech-badge {sizeClasses[size]}"
  title={tech}
>
  {tech}
</span>

<style>
  .tech-badge {
    display: inline-block;
    background: rgba(0, 255, 0, 0.1);
    color: #00ff00;
    border: 1px solid rgba(0, 255, 0, 0.3);
    border-radius: 0.25rem;
    font-family: 'Courier New', monospace;
    font-weight: 500;
    white-space: nowrap;
    transition: all 0.2s ease;
  }

  .tech-badge:hover {
    background: rgba(0, 255, 0, 0.2);
    border-color: rgba(0, 255, 0, 0.5);
    box-shadow: 0 0 8px rgba(0, 255, 0, 0.3);
  }
</style>
