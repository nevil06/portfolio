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
            },
        });

        // Filter out only specific unwanted repos but keep ALL your repositories
        const allRepos = response.data
            .filter(repo => {
                const name = repo.name.toLowerCase();
                // Only exclude specific unwanted repositories
                const excludedRepos = ['n8n', 'aswsowe'];
                const explicitProjects = [
                    'context-memo', 'contex-memo', 'talk-bro', 'turn-guard-ai',
                    'meow-extarct', 'careerforge', 'ble-trust-registry', 'ble_trust-registry'
                ];
                const isExplicit = explicitProjects.includes(name);
                return !excludedRepos.includes(name) && (!repo.fork || isExplicit); // Allow forks only if they are explicit projects
            })
            .sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at)); // Sort by most recently updated

        // Categorize projects for specific components that need filtering
        const personalProjects = ['context-memo', 'contex-memo', 'talk-bro', 'turn-guard-ai', 'meow-extarct'];
        const groupProjects = ['careerforge', 'ble-trust-registry', 'ble_trust-registry'];

        // Separate personal and group projects
        const personalRepos = allRepos
            .filter(repo => personalProjects.includes(repo.name.toLowerCase()))
            .sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));

        const groupRepos = allRepos
            .filter(repo => groupProjects.includes(repo.name.toLowerCase()))
            .sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));

        // Return categorized repos
        return {
            personal: personalRepos,
            group: groupRepos,
            all: allRepos // Return ALL repositories for AllProjects component
        };
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
