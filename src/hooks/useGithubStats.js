import { useState, useEffect, useCallback } from 'react';
import { fetchJson, getAllPages } from '../utils/api';
import { GITHUB_USER, GITHUB_API } from '../constants/config';

export function useGithubStats() {
  const [githubStats, setGithubStats] = useState({
    repos: 0,
    stars: 0,
    followers: 0,
    following: 0,
    commits: 500,
    prs: 15,
    loading: true,
    error: null
  });

  const loadGithubStats = useCallback(async () => {
    try {
      setGithubStats(s => ({ ...s, loading: true, error: null }));
      const user = await fetchJson(`${GITHUB_API}/users/${GITHUB_USER}`);
      const repos = await getAllPages(`${GITHUB_API}/users/${GITHUB_USER}/repos`, 100, 10);
      const stars = repos.reduce((acc, r) => acc + (r.stargazers_count || 0), 0);
      
      setGithubStats(s => ({
        ...s,
        repos: user?.public_repos ?? repos.length,
        stars,
        followers: user?.followers ?? 0,
        following: user?.following ?? 0,
        loading: false,
        error: null
      }));
    } catch (e) {
      setGithubStats(s => ({ 
        ...s, 
        loading: false, 
        error: e?.message || 'Failed to load GitHub stats' 
      }));
    }
  }, []);

  useEffect(() => {
    loadGithubStats();
    const interval = setInterval(loadGithubStats, 5 * 60_000);
    return () => clearInterval(interval);
  }, [loadGithubStats]);

  return githubStats;
}
