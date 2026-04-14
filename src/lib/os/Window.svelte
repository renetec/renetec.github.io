<!-- src/lib/os/Window.svelte -->
<script>
  import { focusWindow, moveWindow, resizeWindow, minimizeWindow, maximizeWindow, closeWindow } from '$lib/stores/windows.svelte.js';
  import { playClick, playOpen, playClose } from '$lib/stores/sound.svelte.js';
  import { onMount } from 'svelte';

  let { win, children } = $props();

  let dragging = $state(false);
  let resizing = $state(false);
  let dragOffset = { x: 0, y: 0 };
  let resizeStart = { x: 0, y: 0, w: 0, h: 0 };
  let el;

  onMount(() => {
    playOpen();
  });

  function onTitleMouseDown(e) {
    if (win.state === 'maximized') return;
    dragging = true;
    dragOffset = { x: e.clientX - win.position.x, y: e.clientY - win.position.y };
    focusWindow(win.id);
    playClick();
    window.addEventListener('mousemove', onDragMove);
    window.addEventListener('mouseup', onDragEnd);
  }

  function onDragMove(e) {
    if (!dragging) return;
    moveWindow(win.id, e.clientX - dragOffset.x, e.clientY - dragOffset.y);
  }

  function onDragEnd() {
    dragging = false;
    window.removeEventListener('mousemove', onDragMove);
    window.removeEventListener('mouseup', onDragEnd);
  }

  // Touch support for drag (no-op on mobile since windows are fullscreen)
  function onTitleTouchStart(e) {
    if (win.state === 'maximized') return;
    const touch = e.touches[0];
    dragging = true;
    dragOffset = { x: touch.clientX - win.position.x, y: touch.clientY - win.position.y };
    focusWindow(win.id);
    playClick();
    window.addEventListener('touchmove', onTouchDragMove, { passive: false });
    window.addEventListener('touchend', onTouchDragEnd);
  }

  function onTouchDragMove(e) {
    if (!dragging) return;
    e.preventDefault();
    const touch = e.touches[0];
    moveWindow(win.id, touch.clientX - dragOffset.x, touch.clientY - dragOffset.y);
  }

  function onTouchDragEnd() {
    dragging = false;
    window.removeEventListener('touchmove', onTouchDragMove);
    window.removeEventListener('touchend', onTouchDragEnd);
  }

  function onResizeMouseDown(e) {
    if (win.state === 'maximized') return;
    e.stopPropagation();
    resizing = true;
    resizeStart = { x: e.clientX, y: e.clientY, w: win.size.w, h: win.size.h };
    focusWindow(win.id);
    window.addEventListener('mousemove', onResizeMove);
    window.addEventListener('mouseup', onResizeEnd);
  }

  function onResizeMove(e) {
    if (!resizing) return;
    const dw = e.clientX - resizeStart.x;
    const dh = e.clientY - resizeStart.y;
    resizeWindow(win.id, resizeStart.w + dw, resizeStart.h + dh);
  }

  function onResizeEnd() {
    resizing = false;
    window.removeEventListener('mousemove', onResizeMove);
    window.removeEventListener('mouseup', onResizeEnd);
  }

  function handleClose() {
    playClose();
    closeWindow(win.id);
  }

  function handleMinimize() {
    playClick();
    minimizeWindow(win.id);
  }

  function handleMaximize() {
    playClick();
    maximizeWindow(win.id);
  }

  function handleFocus() {
    focusWindow(win.id);
  }

  let style = $derived.by(() => {
    if (win.state === 'minimized') return 'display:none';
    if (win.state === 'maximized') return `position:fixed;top:0;left:0;width:100vw;height:calc(100vh - 48px);z-index:${win.zIndex}`;
    return `position:fixed;top:${win.position.y}px;left:${win.position.x}px;width:${win.size.w}px;height:${win.size.h}px;z-index:${win.zIndex}`;
  });
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<div
  bind:this={el}
  class="window"
  class:maximized={win.state === 'maximized'}
  {style}
  onmousedown={handleFocus}
>
  <!-- svelte-ignore a11y_no_static_element_interactions -->
  <div class="title-bar" onmousedown={onTitleMouseDown} ontouchstart={onTitleTouchStart}>
    <div class="window-controls">
      <button class="control close" onclick={handleClose} aria-label="Close"></button>
      <button class="control minimize" onclick={handleMinimize} aria-label="Minimize"></button>
      <button class="control maximize" onclick={handleMaximize} aria-label="Maximize"></button>
    </div>
    <span class="title-text">{win.title}</span>
  </div>

  <div class="window-body">
    {@render children()}
  </div>

  {#if win.state !== 'maximized'}
    <!-- svelte-ignore a11y_no_static_element_interactions -->
    <div class="resize-handle" onmousedown={onResizeMouseDown}></div>
  {/if}
</div>

<style>
  @keyframes windowOpen {
    from { opacity: 0; transform: scale(0.9); }
    to { opacity: 1; transform: scale(1); }
  }

  .window {
    display: flex;
    flex-direction: column;
    background: var(--bg-secondary);
    border: 1px solid var(--border-color);
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
    transition: box-shadow 0.2s ease;
    animation: windowOpen 0.2s ease-out;
  }

  .window:hover {
    box-shadow: 0 12px 48px rgba(0, 0, 0, 0.4);
  }

  .window.maximized {
    border-radius: 0;
  }

  .title-bar {
    display: flex;
    align-items: center;
    padding: 8px 12px;
    background: var(--bg-tertiary);
    border-bottom: 1px solid var(--border-color);
    cursor: grab;
    user-select: none;
    gap: 12px;
  }

  .title-bar:active {
    cursor: grabbing;
  }

  .window-controls {
    display: flex;
    gap: 6px;
    flex-shrink: 0;
  }

  .control {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    border: none;
    padding: 0;
    cursor: pointer;
    transition: opacity 0.15s;
  }

  .control:hover {
    opacity: 0.8;
  }

  .control.close { background: #ff5f57; }
  .control.minimize { background: #febc2e; }
  .control.maximize { background: #28c840; }

  .title-text {
    flex: 1;
    text-align: center;
    font-size: 0.8rem;
    color: var(--text-muted);
    font-family: system-ui, -apple-system, sans-serif;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-right: 48px;
  }

  .window-body {
    flex: 1;
    overflow: auto;
    position: relative;
  }

  .resize-handle {
    position: absolute;
    bottom: 0;
    right: 0;
    width: 16px;
    height: 16px;
    cursor: nwse-resize;
  }

  @media (max-width: 768px) {
    .window {
      position: fixed !important;
      top: 0 !important;
      left: 0 !important;
      width: 100vw !important;
      height: calc(100vh - 48px) !important;
      border-radius: 0;
    }

    .resize-handle {
      display: none;
    }
  }
</style>
