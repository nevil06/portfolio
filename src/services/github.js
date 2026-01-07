import axios from 'axios';
import { GITHUB_API_URL } from '../utils/constants';

/**
 * Fetch all public repositories for the user
 * @returns {Promise<Array>} Array of repository objects
 */
export const fetchGitHubRepos = async () => {
    try {
        const response = await axios.get(GITHUB_API_URL, {
            params: {
                sort: 'updated',
                per_page: 100,
                type: 'owner',
            },
        });

        // Filter out forks and sort by stars
        const repos = response.data
            .filter(repo => !repo.fork)
            .sort((a, b) => b.stargazers_count - a.stargazers_count);

        return repos;
    } catch (error) {
        console.error('Error fetching GitHub repositories:', error);
        throw new Error('Failed to fetch repositories. Please try again later.');
    }
};

/**
 * Format repository data for display
 * @param {Object} repo - Repository object from GitHub API
 * @returns {Object} Formatted repository data
 */
export const formatRepoData = (repo) => {
    return {
        id: repo.id,
        name: repo.name,
        description: repo.description || 'No description available',
        url: repo.html_url,
        homepage: repo.homepage,
        stars: repo.stargazers_count,
        forks: repo.forks_count,
        language: repo.language,
        topics: repo.topics || [],
        createdAt: new Date(repo.created_at),
        updatedAt: new Date(repo.updated_at),
    };
};
