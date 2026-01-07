import { useState, useEffect } from 'react';
import { fetchGitHubRepos, formatRepoData } from '../services/github';
import './Projects.css';

const Projects = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filter, setFilter] = useState('all');

    useEffect(() => {
        const loadProjects = async () => {
            try {
                setLoading(true);
                const repos = await fetchGitHubRepos();
                const formattedRepos = repos.map(formatRepoData);
                setProjects(formattedRepos);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        loadProjects();
    }, []);

    const languages = ['all', ...new Set(projects.map(p => p.language).filter(Boolean))];

    const filteredProjects = filter === 'all'
        ? projects
        : projects.filter(p => p.language === filter);

    if (loading) {
        return (
            <section id="projects" className="section">
                <div className="container">
                    <h2 className="section-title">My Projects</h2>
                    <div className="loading">
                        <div className="spinner"></div>
                        <p>Loading projects from GitHub...</p>
                    </div>
                </div>
            </section>
        );
    }

    if (error) {
        return (
            <section id="projects" className="section">
                <div className="container">
                    <h2 className="section-title">My Projects</h2>
                    <div className="error">
                        <p>{error}</p>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section id="projects" className="section">
            <div className="container">
                <h2 className="section-title">My Projects</h2>
                <p className="section-description">
                    Explore my latest work and open-source contributions
                </p>

                <div className="filter-buttons">
                    {languages.map(lang => (
                        <button
                            key={lang}
                            className={`filter-btn ${filter === lang ? 'active' : ''}`}
                            onClick={() => setFilter(lang)}
                        >
                            {lang}
                        </button>
                    ))}
                </div>

                <div className="projects-grid grid grid-3">
                    {filteredProjects.map(project => (
                        <div key={project.id} className="project-card glass-card">
                            <div className="project-header">
                                <h3 className="project-title">{project.name}</h3>
                                {project.language && (
                                    <span className="project-language">{project.language}</span>
                                )}
                            </div>

                            <p className="project-description">{project.description}</p>

                            {project.topics.length > 0 && (
                                <div className="project-topics">
                                    {project.topics.slice(0, 5).map(topic => (
                                        <span key={topic} className="topic-tag">{topic}</span>
                                    ))}
                                </div>
                            )}

                            <div className="project-stats">
                                <div className="stat">
                                    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                                        <path d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25z" />
                                    </svg>
                                    <span>{project.stars}</span>
                                </div>
                                <div className="stat">
                                    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                                        <path d="M5 3.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm0 2.122a2.25 2.25 0 10-1.5 0v.878A2.25 2.25 0 005.75 8.5h1.5v2.128a2.251 2.251 0 101.5 0V8.5h1.5a2.25 2.25 0 002.25-2.25v-.878a2.25 2.25 0 10-1.5 0v.878a.75.75 0 01-.75.75h-4.5A.75.75 0 015 6.25v-.878zm3.75 7.378a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm3-8.75a.75.75 0 100-1.5.75.75 0 000 1.5z" />
                                    </svg>
                                    <span>{project.forks}</span>
                                </div>
                            </div>

                            <div className="project-actions">
                                <a
                                    href={project.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn btn-primary btn-sm"
                                >
                                    View Code
                                </a>
                                {project.homepage && (
                                    <a
                                        href={project.homepage}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="btn btn-outline btn-sm"
                                    >
                                        Live Demo
                                    </a>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                {filteredProjects.length === 0 && (
                    <p className="no-projects">No projects found for this filter.</p>
                )}
            </div>
        </section>
    );
};

export default Projects;
