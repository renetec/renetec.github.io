<script>
  import { onMount } from 'svelte';
  import { fetchGitHubUser, fetchRepos, fetchEvents } from '$lib/utils/github-api';

  export let username;

  let loading = true;
  let error = null;
  let userData = null;
  let repos = [];
  let events = [];
  let languages = {};

  onMount(async () => {
    try {
      loading = true;
      error = null;

      // Fetch user data, repos, and events in parallel
      const [user, userRepos, userEvents] = await Promise.all([
        fetchGitHubUser(username),
        fetchRepos(username),
        fetchEvents(username, 30)
      ]);

      userData = user;
      repos = userRepos;
      events = userEvents;

      // Calculate language statistics
      languages = repos.reduce((acc, repo) => {
        if (repo.language) {
          acc[repo.language] = (acc[repo.language] || 0) + 1;
        }
        return acc;
      }, {});

    } catch (err) {
      error = err.message;
      console.error('Failed to fetch GitHub data:', err);
    } finally {
      loading = false;
    }
  });

  // Get top 5 languages
  $: topLanguages = Object.entries(languages)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  // Get total language count
  $: totalLangCount = Object.values(languages).reduce((sum, count) => sum + count, 0);

  // Format recent activities (last 10)
  $: recentActivities = events
    .slice(0, 10)
    .map(event => {
      const date = new Date(event.created_at);
      const formattedDate = date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric'
      });

      let action = '';
      let repoName = event.repo?.name || '';

      switch (event.type) {
        case 'PushEvent':
          const commits = event.payload?.commits?.length || 0;
          action = `Pushed ${commits} commit${commits !== 1 ? 's' : ''} to`;
          break;
        case 'CreateEvent':
          action = `Created ${event.payload?.ref_type || 'repository'}`;
          break;
        case 'PullRequestEvent':
          action = `${event.payload?.action || 'opened'} pull request in`;
          break;
        case 'IssuesEvent':
          action = `${event.payload?.action || 'opened'} issue in`;
          break;
        case 'WatchEvent':
          action = 'Starred';
          break;
        case 'ForkEvent':
          action = 'Forked';
          break;
        default:
          action = event.type.replace('Event', '');
      }

      return {
        date: formattedDate,
        action,
        repo: repoName
      };
    });
</script>

<div class="github-stats">
  {#if loading}
    <div class="loading">
      <div class="spinner"></div>
      <p>Loading GitHub data...</p>
    </div>
  {:else if error}
    <div class="error">
      <p class="error-icon">⚠️</p>
      <p class="error-message">Failed to load GitHub data</p>
      <p class="error-detail">{error}</p>
    </div>
  {:else if userData}
    <div class="stats-grid">
      <!-- Profile Info -->
      <div class="stat-card profile-card">
        <div class="profile-header">
          <img src={userData.avatar_url} alt={userData.name || username} class="avatar" />
          <div class="profile-info">
            <h3 class="profile-name">{userData.name || username}</h3>
            <p class="profile-username">@{userData.login}</p>
            {#if userData.bio}
              <p class="profile-bio">{userData.bio}</p>
            {/if}
          </div>
        </div>
      </div>

      <!-- Stats Overview -->
      <div class="stat-card stats-overview">
        <h3 class="card-title">Overview</h3>
        <div class="stats-list">
          <div class="stat-item">
            <span class="stat-label">Public Repos:</span>
            <span class="stat-value">{userData.public_repos}</span>
          </div>
          <div class="stat-item">
            <span class="stat-label">Followers:</span>
            <span class="stat-value">{userData.followers}</span>
          </div>
          <div class="stat-item">
            <span class="stat-label">Following:</span>
            <span class="stat-value">{userData.following}</span>
          </div>
        </div>
      </div>

      <!-- Top Languages -->
      {#if topLanguages.length > 0}
        <div class="stat-card languages-card">
          <h3 class="card-title">Top Languages</h3>
          <div class="languages-list">
            {#each topLanguages as [lang, count]}
              {@const percentage = Math.round((count / totalLangCount) * 100)}
              <div class="language-item">
                <div class="language-header">
                  <span class="language-name">{lang}</span>
                  <span class="language-percentage">{percentage}%</span>
                </div>
                <div class="progress-bar">
                  <div class="progress-fill" style="width: {percentage}%"></div>
                </div>
              </div>
            {/each}
          </div>
        </div>
      {/if}

      <!-- Recent Activity -->
      {#if recentActivities.length > 0}
        <div class="stat-card activity-card">
          <h3 class="card-title">Recent Activity</h3>
          <div class="activity-list">
            {#each recentActivities as activity}
              <div class="activity-item">
                <span class="activity-date">{activity.date}</span>
                <span class="activity-action">{activity.action}</span>
                {#if activity.repo}
                  <span class="activity-repo">{activity.repo}</span>
                {/if}
              </div>
            {/each}
          </div>
        </div>
      {/if}
    </div>
  {/if}
</div>

<style>
  .github-stats {
    width: 100%;
  }

  .loading,
  .error {
    text-align: center;
    padding: 3rem 1rem;
    background: rgba(0, 20, 0, 0.6);
    border: 1px solid rgba(0, 255, 0, 0.3);
    border-radius: 0.5rem;
  }

  .spinner {
    width: 40px;
    height: 40px;
    margin: 0 auto 1rem;
    border: 3px solid rgba(0, 255, 0, 0.2);
    border-top-color: #00ff00;
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    to { transform: rotate(360deg); }
  }

  .loading p {
    font-family: 'Courier New', monospace;
    color: rgba(0, 255, 0, 0.7);
  }

  .error-icon {
    font-size: 3rem;
    margin-bottom: 1rem;
  }

  .error-message {
    font-family: 'Courier New', monospace;
    color: #ff6b6b;
    font-size: 1.125rem;
    margin-bottom: 0.5rem;
  }

  .error-detail {
    font-family: 'Courier New', monospace;
    color: rgba(255, 107, 107, 0.7);
    font-size: 0.875rem;
  }

  .stats-grid {
    display: grid;
    gap: 1.5rem;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  }

  .stat-card {
    background: rgba(0, 20, 0, 0.6);
    border: 1px solid rgba(0, 255, 0, 0.3);
    border-radius: 0.5rem;
    padding: 1.5rem;
    transition: all 0.3s ease;
  }

  .stat-card:hover {
    border-color: rgba(0, 255, 0, 0.5);
    box-shadow: 0 0 15px rgba(0, 255, 0, 0.2);
  }

  .profile-card {
    grid-column: 1 / -1;
  }

  .profile-header {
    display: flex;
    gap: 1.5rem;
    align-items: center;
  }

  .avatar {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    border: 3px solid rgba(0, 255, 0, 0.3);
    flex-shrink: 0;
  }

  .profile-info {
    flex: 1;
  }

  .profile-name {
    font-family: 'Courier New', monospace;
    font-size: 1.5rem;
    color: #00ff00;
    margin: 0 0 0.25rem 0;
  }

  .profile-username {
    font-family: 'Courier New', monospace;
    color: rgba(0, 255, 0, 0.7);
    margin: 0 0 0.5rem 0;
    font-size: 0.95rem;
  }

  .profile-bio {
    color: rgba(0, 255, 0, 0.6);
    margin: 0;
    line-height: 1.5;
  }

  .card-title {
    font-family: 'Courier New', monospace;
    font-size: 1.125rem;
    color: #00ff00;
    margin: 0 0 1rem 0;
    padding-bottom: 0.5rem;
    border-bottom: 1px solid rgba(0, 255, 0, 0.2);
  }

  .stats-list {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  .stat-item {
    display: flex;
    justify-content: space-between;
    font-family: 'Courier New', monospace;
  }

  .stat-label {
    color: rgba(0, 255, 0, 0.7);
    font-size: 0.95rem;
  }

  .stat-value {
    color: #00ff00;
    font-weight: bold;
  }

  .languages-list {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .language-item {
    display: flex;
    flex-direction: column;
    gap: 0.375rem;
  }

  .language-header {
    display: flex;
    justify-content: space-between;
    font-family: 'Courier New', monospace;
    font-size: 0.875rem;
  }

  .language-name {
    color: rgba(0, 255, 0, 0.8);
  }

  .language-percentage {
    color: #00ff00;
    font-weight: bold;
  }

  .progress-bar {
    height: 8px;
    background: rgba(0, 255, 0, 0.1);
    border-radius: 4px;
    overflow: hidden;
  }

  .progress-fill {
    height: 100%;
    background: linear-gradient(90deg, rgba(0, 255, 0, 0.6), #00ff00);
    transition: width 0.5s ease;
    box-shadow: 0 0 8px rgba(0, 255, 0, 0.4);
  }

  .activity-card {
    grid-column: 1 / -1;
  }

  .activity-list {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  .activity-item {
    display: grid;
    grid-template-columns: 60px 1fr;
    gap: 0.75rem;
    font-family: 'Courier New', monospace;
    font-size: 0.875rem;
    padding: 0.5rem;
    background: rgba(0, 255, 0, 0.05);
    border-radius: 0.25rem;
    transition: all 0.2s ease;
  }

  .activity-item:hover {
    background: rgba(0, 255, 0, 0.1);
  }

  .activity-date {
    color: rgba(0, 255, 0, 0.5);
    font-size: 0.8125rem;
  }

  .activity-action {
    color: rgba(0, 255, 0, 0.8);
  }

  .activity-repo {
    grid-column: 2;
    color: #00ff00;
    font-weight: 500;
  }

  @media (max-width: 768px) {
    .profile-header {
      flex-direction: column;
      text-align: center;
    }

    .avatar {
      width: 80px;
      height: 80px;
    }

    .profile-name {
      font-size: 1.25rem;
    }

    .stats-grid {
      grid-template-columns: 1fr;
    }

    .profile-card,
    .activity-card {
      grid-column: 1;
    }

    .activity-item {
      grid-template-columns: 1fr;
      gap: 0.25rem;
    }

    .activity-repo {
      grid-column: 1;
    }
  }
</style>
