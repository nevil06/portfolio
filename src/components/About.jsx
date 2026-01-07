import { PERSONAL_INFO, SKILLS } from '../utils/constants';
import './About.css';

const About = () => {
    return (
        <section id="about" className="section about-section">
            <div className="container">
                <h2 className="section-title">About Me</h2>

                <div className="about-content">
                    <div className="about-text">
                        <p className="about-intro">
                            I'm a passionate <strong>{PERSONAL_INFO.title}</strong> based in {PERSONAL_INFO.location},
                            dedicated to crafting exceptional digital experiences. With a strong foundation in modern
                            web technologies, I transform ideas into elegant, functional solutions.
                        </p>

                        <p>
                            My journey in software development has equipped me with a diverse skill set,
                            allowing me to tackle complex challenges and deliver high-quality applications.
                            I'm constantly learning and exploring new technologies to stay at the forefront
                            of web development.
                        </p>

                        <p>
                            When I'm not coding, you can find me contributing to open-source projects,
                            learning new frameworks, or sharing knowledge with the developer community.
                        </p>
                    </div>

                    <div className="skills-section">
                        <h3 className="skills-title">Technical Skills</h3>
                        <div className="skills-grid">
                            {SKILLS.map((skill, index) => (
                                <div
                                    key={skill}
                                    className="skill-tag glass-card"
                                    style={{ animationDelay: `${index * 0.1}s` }}
                                >
                                    {skill}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
