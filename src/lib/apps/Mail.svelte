<script>
  import { _ } from '$lib/i18n';
  import { playSend } from '$lib/stores/sound.svelte.js';

  const FORMSPREE_URL = 'https://formspree.io/f/placeholder';

  let view = $state('inbox'); // 'inbox' | 'compose' | 'item'
  let selectedItem = $state(null);
  let sent = $state(false);

  let fromName = $state('');
  let fromEmail = $state('');
  let subject = $state('');
  let message = $state('');

  const inboxItems = [
    { id: 'welcome', subject: () => $_('mail.welcome'), body: () => $_('mail.welcomeBody'), from: 'system@renetec.io', date: '2025-01-01' },
    { id: 'started', subject: () => $_('mail.gettingStarted'), body: () => $_('mail.gettingStartedBody'), from: 'hello@renetec.io', date: '2025-01-02' },
  ];

  let allItems = $derived([
    ...inboxItems,
    ...(sent ? [{
      id: 'sent-success',
      subject: () => $_('mail.sent'),
      body: () => `${$_('mail.from')}: ${fromName} <${fromEmail}>\n\n${message}`,
      from: fromEmail || 'you',
      date: new Date().toISOString().slice(0, 10),
      isSent: true
    }] : [])
  ]);

  function openItem(item) {
    selectedItem = item;
    view = 'item';
  }

  function startCompose() {
    view = 'compose';
    selectedItem = null;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const data = new FormData(form);

    try {
      const res = await fetch(form.action, {
        method: 'POST',
        body: data,
        headers: { Accept: 'application/json' }
      });

      if (res.ok) {
        playSend();
        sent = true;
        fromName = '';
        fromEmail = '';
        subject = '';
        message = '';
        view = 'inbox';
      }
    } catch {
      // fallback: still show success for demo
      playSend();
      sent = true;
      fromName = '';
      fromEmail = '';
      subject = '';
      message = '';
      view = 'inbox';
    }
  }
</script>

<div class="mail-app">
  <!-- Sidebar -->
  <aside class="sidebar">
    <button class="compose-btn" onclick={startCompose}>
      ✏️ {$_('mail.compose')}
    </button>
    <div class="sidebar-label">{$_('mail.inbox')}</div>
    <ul class="inbox-list">
      {#each allItems as item}
        <li class="inbox-item" class:sent-item={item.isSent}>
          <button
            class="inbox-btn"
            class:active={selectedItem?.id === item.id}
            onclick={() => openItem(item)}
          >
            <span class="item-from">{item.from}</span>
            <span class="item-subject">{item.subject()}</span>
            <span class="item-date">{item.date}</span>
          </button>
        </li>
      {/each}
    </ul>
  </aside>

  <!-- Main -->
  <main class="mail-main">
    {#if view === 'compose'}
      <div class="compose-view">
        <h2 class="compose-title">{$_('mail.compose')}</h2>
        <form action={FORMSPREE_URL} method="POST" onsubmit={handleSubmit} class="compose-form">
          <!-- To -->
          <div class="field field-to">
            <label class="field-label" for="mail-to">{$_('mail.to')}</label>
            <input
              id="mail-to"
              type="email"
              name="_replyto"
              value="rene@iatechinfo.com"
              readonly
              class="input input-readonly"
            />
          </div>

          <!-- From -->
          <div class="field">
            <label class="field-label" for="mail-name">{$_('mail.from')}</label>
            <div class="from-row">
              <input
                id="mail-name"
                type="text"
                name="name"
                placeholder={$_('mail.name')}
                bind:value={fromName}
                required
                class="input"
              />
              <input
                id="mail-email"
                type="email"
                name="email"
                placeholder={$_('mail.email')}
                bind:value={fromEmail}
                required
                class="input"
              />
            </div>
          </div>

          <!-- Subject -->
          <div class="field">
            <label class="field-label" for="mail-subject">{$_('mail.subject')}</label>
            <input
              id="mail-subject"
              type="text"
              name="subject"
              placeholder={$_('mail.subject')}
              bind:value={subject}
              required
              class="input"
            />
          </div>

          <!-- Message -->
          <div class="field field-message">
            <label class="field-label" for="mail-message">{$_('mail.message')}</label>
            <textarea
              id="mail-message"
              name="message"
              placeholder={$_('mail.message')}
              bind:value={message}
              required
              class="textarea"
            ></textarea>
          </div>

          <div class="form-footer">
            <button type="submit" class="send-btn">
              {$_('mail.send')} →
            </button>
          </div>
        </form>
      </div>

    {:else if view === 'item' && selectedItem}
      <div class="item-view">
        <h2 class="item-subject">{selectedItem.subject()}</h2>
        <div class="item-meta">
          <span class="meta-from">{$_('mail.from')}: {selectedItem.from}</span>
          <span class="meta-date">{selectedItem.date}</span>
        </div>
        <div class="item-body">{selectedItem.body()}</div>
      </div>

    {:else}
      <div class="empty-state">
        <div class="empty-icon">📬</div>
        <p>{$_('mail.inbox')}</p>
        <button class="compose-btn-inline" onclick={startCompose}>
          {$_('mail.compose')}
        </button>
      </div>
    {/if}
  </main>
</div>

<style>
  .mail-app {
    display: flex;
    height: 100%;
    font-family: system-ui, -apple-system, sans-serif;
    background: var(--bg-primary, #1a1a2e);
    color: var(--text-primary, #e2e8f0);
    overflow: hidden;
  }

  /* Sidebar */
  .sidebar {
    width: 200px;
    min-width: 200px;
    background: var(--bg-secondary, #16213e);
    border-right: 1px solid var(--border-color, rgba(255,255,255,0.08));
    display: flex;
    flex-direction: column;
    padding: 12px 8px;
    gap: 8px;
    overflow-y: auto;
  }

  .compose-btn {
    width: 100%;
    padding: 10px 14px;
    background: var(--accent-primary, #4361ee);
    color: #fff;
    border: none;
    border-radius: 8px;
    font-family: system-ui, sans-serif;
    font-size: 13px;
    font-weight: 600;
    cursor: pointer;
    text-align: left;
    transition: background 0.15s;
  }
  .compose-btn:hover {
    background: var(--accent-hover, #3451d1);
  }

  .sidebar-label {
    font-size: 11px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: var(--text-muted, #718096);
    padding: 4px 6px 0;
  }

  .inbox-list {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: 2px;
  }

  .inbox-item {
    padding: 0;
    list-style: none;
  }
  .inbox-item.sent-item .item-from {
    color: var(--accent-secondary, #7209b7);
  }

  .inbox-btn {
    width: 100%;
    padding: 8px 10px;
    border-radius: 6px;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    gap: 2px;
    transition: background 0.12s;
    outline: none;
    background: transparent;
    border: none;
    color: inherit;
    text-align: left;
  }
  .inbox-btn:hover, .inbox-btn:focus {
    background: var(--bg-hover, rgba(255,255,255,0.06));
  }
  .inbox-btn.active {
    background: var(--accent-primary, #4361ee);
  }

  .item-from {
    font-size: 11px;
    color: var(--text-muted, #718096);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .item-subject {
    font-size: 12px;
    font-weight: 500;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .item-date {
    font-size: 10px;
    color: var(--text-muted, #718096);
  }

  /* Main area */
  .mail-main {
    flex: 1;
    overflow: hidden;
    display: flex;
    flex-direction: column;
  }

  /* Compose view */
  .compose-view {
    display: flex;
    flex-direction: column;
    height: 100%;
    padding: 20px 24px;
    overflow: hidden;
  }

  .compose-title {
    font-size: 16px;
    font-weight: 600;
    margin: 0 0 16px;
    color: var(--text-primary, #e2e8f0);
  }

  .compose-form {
    display: flex;
    flex-direction: column;
    flex: 1;
    gap: 12px;
    overflow: hidden;
  }

  .field {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .field-message {
    flex: 1;
    min-height: 0;
    display: flex;
    flex-direction: column;
  }

  .field-label {
    font-size: 11px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    color: var(--text-muted, #718096);
  }

  .from-row {
    display: flex;
    gap: 8px;
  }
  .from-row .input {
    flex: 1;
  }

  .input {
    padding: 8px 12px;
    background: var(--input-bg, rgba(255,255,255,0.06));
    border: 1px solid var(--border-color, rgba(255,255,255,0.12));
    border-radius: 6px;
    color: var(--text-primary, #e2e8f0);
    font-family: system-ui, sans-serif;
    font-size: 13px;
    outline: none;
    transition: border-color 0.15s;
    width: 100%;
    box-sizing: border-box;
  }
  .input:focus {
    border-color: var(--accent-primary, #4361ee);
  }
  .input-readonly {
    color: var(--text-muted, #718096);
    cursor: default;
  }

  .textarea {
    flex: 1;
    min-height: 120px;
    padding: 10px 12px;
    background: var(--input-bg, rgba(255,255,255,0.06));
    border: 1px solid var(--border-color, rgba(255,255,255,0.12));
    border-radius: 6px;
    color: var(--text-primary, #e2e8f0);
    font-family: system-ui, sans-serif;
    font-size: 13px;
    outline: none;
    resize: none;
    transition: border-color 0.15s;
  }
  .textarea:focus {
    border-color: var(--accent-primary, #4361ee);
  }

  .form-footer {
    display: flex;
    justify-content: flex-end;
    padding-bottom: 4px;
  }

  .send-btn {
    padding: 10px 24px;
    background: var(--accent-primary, #4361ee);
    color: #fff;
    border: none;
    border-radius: 8px;
    font-family: system-ui, sans-serif;
    font-size: 13px;
    font-weight: 600;
    cursor: pointer;
    transition: background 0.15s;
  }
  .send-btn:hover {
    background: var(--accent-hover, #3451d1);
  }

  /* Item view */
  .item-view {
    padding: 24px 28px;
    overflow-y: auto;
    height: 100%;
    box-sizing: border-box;
  }

  .item-view .item-subject {
    font-size: 18px;
    font-weight: 600;
    margin: 0 0 12px;
  }

  .item-meta {
    display: flex;
    gap: 16px;
    margin-bottom: 20px;
    padding-bottom: 16px;
    border-bottom: 1px solid var(--border-color, rgba(255,255,255,0.08));
  }

  .meta-from, .meta-date {
    font-size: 12px;
    color: var(--text-muted, #718096);
  }

  .item-body {
    font-size: 14px;
    line-height: 1.7;
    white-space: pre-wrap;
    color: var(--text-secondary, #cbd5e0);
  }

  /* Empty state */
  .empty-state {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    gap: 12px;
    color: var(--text-muted, #718096);
  }

  .empty-icon {
    font-size: 48px;
  }

  .empty-state p {
    font-size: 14px;
    margin: 0;
  }

  .compose-btn-inline {
    padding: 8px 20px;
    background: var(--accent-primary, #4361ee);
    color: #fff;
    border: none;
    border-radius: 8px;
    font-family: system-ui, sans-serif;
    font-size: 13px;
    font-weight: 600;
    cursor: pointer;
    transition: background 0.15s;
  }
  .compose-btn-inline:hover {
    background: var(--accent-hover, #3451d1);
  }

  @media (max-width: 768px) {
    .mail-app {
      flex-direction: column;
    }

    .sidebar {
      width: 100%;
      min-width: 0;
      max-height: 160px;
      border-right: none;
      border-bottom: 1px solid var(--border-color, rgba(255,255,255,0.08));
    }

    .compose-view {
      padding: 16px;
    }

    .from-row {
      flex-direction: column;
    }

    .item-view {
      padding: 16px;
    }
  }
</style>
