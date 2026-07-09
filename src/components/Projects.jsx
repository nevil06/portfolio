import { useState, useEffect, useRef } from 'react';
import AllProjects from './AllProjects';
import './Projects.css';

const Projects = () => {
    const [showAllProjects, setShowAllProjects] = useState(false);
    const sectionRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                    }
                });
            },
            { threshold: 0.1 }
        );

        if (sectionRef.current) {
            const revealElements = sectionRef.current.querySelectorAll('.reveal-on-scroll');
            revealElements.forEach((el) => observer.observe(el));
        }

        return () => {
            if (sectionRef.current) {
                const revealElements = sectionRef.current.querySelectorAll('.reveal-on-scroll');
                revealElements.forEach((el) => observer.unobserve(el));
            }
        };
    }, []);

    const featuredProjects = [
        {
            id: "01",
            name: "Context Memo",
            tagline: "Productivity, Redefined.",
            description: "A developer-first knowledge system designed to manage codebase context, memory, and thoughts. It helps teams maintain context across long-running development loops, reducing cognitive load and accelerating execution speed.",
            image: "/context-memo.png",
            github: "https://github.com/nevil06/context-memo",
            live: null,
            tech: ["React", "JavaScript", "REST APIs", "Node.js"]
        },
        {
            id: "02",
            name: "Meow Extract",
            tagline: "Instant Website Intelligence.",
            description: "A high-performance website crawler and scraping engine. Paste any URL or Google Maps link to instantly extract contacts, business info, reviews, SEO metadata, and media assets in under 10 seconds.",
            image: "/meow-extract.png",
            github: "https://github.com/nevil06/meow-extarct",
            live: "https://meowextract.nvevil.xyz",
            tech: ["Next.js", "Tailwind CSS", "Node.js", "PostgreSQL"]
        },
        {
            id: "03",
            name: "Turn Guard AI",
            tagline: "Autonomous Vehicle Collision Prevention.",
            description: "An AI-powered safety module for heavy vehicles. Utilizing high-performance computer vision algorithms, it detects blind spots, alerts drivers of pedestrian turn trajectories, and actively prevents critical traffic collisions.",
            image: "/turn-guard.png",
            github: "https://github.com/nevil06/turn-guard-ai",
            live: null,
            tech: ["Python", "Computer Vision", "TensorFlow", "AI/ML"]
        }
    ];

    const openAllProjects = () => {
        setShowAllProjects(true);
        document.body.style.overflow = 'hidden';
    };

    const closeAllProjects = () => {
        setShowAllProjects(false);
        document.body.style.overflow = 'unset';
    };

    return (
        <>
            <section ref={sectionRef} id="projects" className="projects-showcase-section">
                <div className="container">
                    <div className="reveal-on-scroll">
                        <h2 className="section-title">Selected Works</h2>
                    </div>

                    <div className="projects-list">
                        {featuredProjects.map((project, index) => (
                            <div 
                                key={project.id} 
                                className={`project-showcase-item reveal-on-scroll ${index % 2 !== 0 ? 'layout-reverse' : ''}`}
                            >
                                {/* Showcase Image */}
                                <div className="project-visual">
                                    <img 
                                        src={project.image} 
                                        alt={`${project.name} Showcase Visual`} 
                                        className="project-image"
                                    />
                                    <div className="project-index">{project.id}</div>
                                </div>

                                {/* Showcase Description Story */}
                                <div className="project-details">
                                    <span className="project-subtitle">{project.tagline}</span>
                                    <h3 className="project-title-showcase">{project.name}</h3>
                                    
                                    <p className="project-desc-text">{project.description}</p>
                                    
                                    <div className="project-tech-stack">
                                        {project.tech.map((techItem) => (
                                            <span key={techItem} className="tech-badge">{techItem}</span>
                                        ))}
                                    </div>

                                    <div className="project-links-group">
                                        <a 
                                            href={project.github} 
                                            target="_blank" 
                                            rel="noopener noreferrer" 
                                            className="btn btn-outline btn-sm-showcase"
                                        >
                                            Source Code
                                        </a>
                                        {project.live && (
                                            <a 
                                                href={project.live} 
                                                target="_blank" 
                                                rel="noopener noreferrer" 
                                                className="btn btn-primary btn-sm-showcase"
                                            >
                                                Live Demo
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* View All Button */}
                    <div className="view-all-wrapper reveal-on-scroll">
                        <button onClick={openAllProjects} className="btn btn-outline">
                            View All Repositories
                        </button>
                    </div>
                </div>
            </section>

            {/* All Projects Modal */}
            {showAllProjects && (
                <div className="all-projects-modal-overlay">
                    <div className="all-projects-modal">
                        <button className="modal-close-btn" onClick={closeAllProjects} aria-label="Close modal">
                            <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                            </svg>
                        </button>
                        <AllProjects />
                    </div>
                </div>
            )}
        </>
    );
};

export default Projects;