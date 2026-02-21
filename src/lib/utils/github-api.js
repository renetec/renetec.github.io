// GitHub API client with localStorage caching
// No API keys required - uses public endpoints only

const CACHE_DURATION = 60 * 60 * 1000; // 1 hour in milliseconds
const GITHUB_API_BASE = 'https://api.github.com';

/**
 * Get data from cache if valid, otherwise return null
 */
function getFromCache(key) {
  if (typeof window === 'undefined') return null;

  try {
    const cached = localStorage.getItem(key);
    if (!cached) return null;

    const { data, timestamp } = JSON.parse(cached);
    const isExpired = Date.now() - timestamp > CACHE_DURATION;

    if (isExpired) {
      localStorage.removeItem(key);
      return null;
    }

    return data;
  } catch (error) {
    console.error('Cache read error:', error);
    return null;
  }
}

/**
 * Save data to cache with timestamp
 */
function saveToCache(key, data) {
  if (typeof window === 'undefined') return;

  try {
    localStorage.setItem(key, JSON.stringify({
      data,
      timestamp: Date.now()
    }));
  } catch (error) {
    console.error('Cache write error:', error);
  }
}

/**
 * Fetch with error handling and fallback to cache
 */
async function fetchWithCache(url, cacheKey) {
  // Try cache first
  const cached = getFromCache(cacheKey);

  try {
    const response = await fetch(url, {
      headers: {
        'Accept': 'application/vnd.github.v3+json'
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    saveToCache(cacheKey, data);
    return data;
  } catch (error) {
    console.error(`GitHub API error for ${url}:`, error);

    // Fallback to cache if available
    if (cached) {
      console.warn('Using cached data due to API error');
      return cached;
    }

    throw error;
  }
}

/**
 * Fetch GitHub user profile
 * @param {string} username - GitHub username
 * @returns {Promise<Object>} User profile data
 */
export async function fetchGitHubUser(username) {
  const url = `${GITHUB_API_BASE}/users/${username}`;
  const cacheKey = `github_user_${username}`;
  return fetchWithCache(url, cacheKey);
}

/**
 * Fetch user repositories
 * @param {string} username - GitHub username
 * @param {Object} options - Query options
 * @returns {Promise<Array>} Array of repository objects
 */
export async function fetchRepos(username, options = {}) {
  const {
    sort = 'updated',
    per_page = 100,
    type = 'owner'
  } = options;

  const params = new URLSearchParams({
    sort,
    per_page: per_page.toString(),
    type
  });

  const url = `${GITHUB_API_BASE}/users/${username}/repos?${params}`;
  const cacheKey = `github_repos_${username}_${sort}_${per_page}_${type}`;
  return fetchWithCache(url, cacheKey);
}

/**
 * Fetch user public events
 * @param {string} username - GitHub username
 * @param {number} per_page - Number of events to fetch
 * @returns {Promise<Array>} Array of event objects
 */
export async function fetchEvents(username, per_page = 30) {
  const params = new URLSearchParams({
    per_page: per_page.toString()
  });

  const url = `${GITHUB_API_BASE}/users/${username}/events/public?${params}`;
  const cacheKey = `github_events_${username}_${per_page}`;
  return fetchWithCache(url, cacheKey);
}

/**
 * Clear all GitHub cache
 */
export function clearGitHubCache() {
  if (typeof window === 'undefined') return;

  const keys = Object.keys(localStorage);
  keys.forEach(key => {
    if (key.startsWith('github_')) {
      localStorage.removeItem(key);
    }
  });
}
