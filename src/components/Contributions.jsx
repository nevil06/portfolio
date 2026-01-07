import { useState, useEffect } from 'react';
import { GITHUB_USERNAME } from '../utils/constants';
import './Contributions.css';

const Contributions = () => {
    const [contributions, setContributions] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch recent events to show contributions
        const fetchContributions = async () => {
            try {
                const response = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/events/public?per_page=100`);
                const events = await response.json();

                // Filter for PullRequestEvent and IssuesEvent on other repos
                const contributionEvents = events.filter(event =>
                    (event.type === 'PullRequestEvent' || event.type === 'IssuesEvent') &&
                    !event.repo.name.startsWith(`${GITHUB_USERNAME}/`)
                );

                // Get unique repos
                const uniqueRepos = {};
                contributionEvents.forEach(event => {
                    const repoName = event.repo.name;
                    if (!uniqueRepos[repoName]) {
                        uniqueRepos[repoName] = {
                            name: repoName,
                            url: `https://github.com/${repoName}`,
                            type: event.type === 'PullRequestEvent' ? 'Pull Request' : 'Issue',
                            date: new Date(event.created_at),
                        };
                    }
                });

                setContributions(Object.values(uniqueRepos).slice(0, 6));
            } catch (error) {
                console.error('Error fetching contributions:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchContributions();
    }, []);

    if (loading) {
        return (
            <section className="section contributions-section">
                <div className="container">
                    <h2 className="section-title">Open Source Contributions</h2>
                    <div className="loading">
                        <div className="spinner"></div>
                    </div>
                </div>
            </section>
        );
    }

    if (contributions.length === 0) {
        return null; // Don't show section if no contributions
    }

    return (
        <section className="section contributions-section">
            <div className="container">
                <h2 className="section-title">Open Source Contributions</h2>
                <p className="section-description">
                    Contributing to the open-source community
                </p>

                <div className="contributions-grid grid grid-3">
                    {contributions.map((contrib, index) => (
                        <div key={index} className="contribution-card glass-card">
                            <div className="contribution-icon">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                                </svg>
                            </div>

                            <h3 className="contribution-repo">{contrib.name}</h3>
                            <span className="contribution-type">{contrib.type}</span>

                            <a
                                href={contrib.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn btn-outline btn-sm"
                            >
                                View Repository
                            </a>
                        </div>
                    ))}
                </div>

                <div className="contributions-footer">
                    <a
                        href={`https://github.com/${GITHUB_USERNAME}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-primary"
                    >
                        View All Activity on GitHub
                    </a>
                </div>
            </div>
        </section>
    );
};

export default Contributions;
