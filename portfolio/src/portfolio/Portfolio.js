import { useState, useEffect } from 'react';
import './Portfolio.css';
import myImage from '../assets/myimage.jpg'

const Portfolio = () => {
    const [scrollProgress, setScrollProgress] = useState(0);
    const [visibleSections, setVisibleSections] = useState(new Set());

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.pageYOffset;
            const docHeight = document.body.offsetHeight - window.innerHeight;
            const scrollPercent = (scrollTop / docHeight) * 100;
            setScrollProgress(scrollPercent);
        };

        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setVisibleSections(prev => new Set([...prev, entry.target.id]));
                }
            });
        }, observerOptions);

        document.querySelectorAll('section').forEach(el => {
            if (el.id) observer.observe(el);
        });

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
            observer.disconnect();
        };
    }, []);

    const smoothScroll = (targetId) => {
        const target = document.getElementById(targetId);
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    };

    const skills = [
        {
            icon: '💻',
            category: 'Frontend',
            items: ['HTML / CSS', 'JavaScript', 'React', 'React Native']
        },
        {
            icon: '⚙️',
            category: 'Backend',
            items: ['Node.js', 'Java', 'Spring Boot', 'RESTful API']
        },
        {
            icon: '🗄️',
            category: 'Database',
            items: ['MySQL', 'Oracle']
        },
        {
            icon: '🛠️',
            category: 'Tools & Others',
            items: ['Git / GitHub', 'Docker', 'AWS', 'Figma', 'Agile']
        }
    ];

    const projects = [
        {
            id: 1,
            title: 'Error Share Board',
            date: '2025-07-01 ~ 진행중',
            type: '개인 프로젝트',
            description: '개발 도중 발생하는 에러와 해결 방법을 공유하는 게시판 💡',
            tech: ['React', 'Spring Boot', 'MySQL'],
            demo: 'http://project-bucbucket.s3-website.ap-northeast-2.amazonaws.com',
            github: 'http://github.com/hms1218/Project1',
            emoji: '🐛'
        },
        {
            id: 2,
            title: 'UKA (UKi Animal center)',
            date: '25.06.09 ~ 진행중',
            type: '팀 프로젝트',
            description: '유기된 동물의 정보와 보호소 위치, 입양문의 방법 등을 확인 또는 공유 🐶',
            tech: ['React', 'Spring Boot', 'MySQL'],
            demo: 'https://github.com/hms1218/TeamProject-UKA',
            github: 'https://github.com/hms1218/TeamProject-UKA',
            emoji: '🐶'
        },
        {
            id: 3,
            title: 'OMR (OTT Movie Review)',
            date: '25.07.21 ~ 진행중',
            type: '팀 프로젝트',
            description: 'OTT와 영화에 대한 리뷰를 작성하여 공유하는 Application 및 Web 🎬',
            tech: ['React-Native', 'React', 'MySQL', 'Spring Boot'],
            demo: 'https://github.com/guensoo/TeamProject-OMR',
            github: 'https://github.com/guensoo/TeamProject-OMR',
            emoji: '🎬'
        }
    ];

    const contacts = [
        { type: '📧 Email', value: 'rhkwmq93@naver.com', icon: '📧' },
        { type: '📱 Phone', value: '010-2652-5587', icon: '📱' },
        { type: '🐙 GitHub', value: 'github.com/hms1218', icon: '🐙' }
    ];

    return (
        <div className="portfolio">
            {/* Scroll Progress Bar */}
            <div 
                className="scroll-indicator"
                style={{ width: `${scrollProgress}%` }}
            />

            {/* Floating Navigation */}
            <nav className="floating-nav">
                <div className="nav-content">
                    <div className="logo">PORTFOLIO</div>
                    <div className="nav-links">
                        <button onClick={() => smoothScroll('home')} className="nav-link">Home</button>
                        <button onClick={() => smoothScroll('about')} className="nav-link">About</button>
                        <button onClick={() => smoothScroll('skills')} className="nav-link">Skills</button>
                        <button onClick={() => smoothScroll('projects')} className="nav-link">Projects</button>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section id="home" className="hero">
                <div className="hero-bg">
                    <div className="blob blob-1"></div>
                    <div className="blob blob-2"></div>
                    <div className="blob blob-3"></div>
                </div>

                <div className="hero-container">
                    {/* Profile Image */}
                    <div className="profile-section">
                        <div className="profile-frame">
                            <div className="profile-img">
                                <img src={myImage} alt='이미지' className='profile-photo' />
                            </div>
                            {/* <div className="floating-badge">✨</div> */}
                        </div>
                    </div>

                    {/* Hero Content */}
                    <div className="hero-content">
                        <div className="hero-text">
                            {/* <div className="greeting-badge">안녕하세요!</div> */}
                            <h1 className="hero-title">
                                <span className="name-gradient">허민석</span>
                                <br />
                                {/* <span className="title-sub">입니다</span> */}
                            </h1>
                            <p className="hero-description">
                                사용자 경험을 중시하는 <span className="highlight">풀스택 웹개발자</span>
                                <br />
                                새로운 기술과 트렌드에 발빠르게 적응하며,
                                <br />
                                <span className="highlight-blue">창의적이고 혁신적인</span> 솔루션을 만들어갑니다!
                            </p>
                        </div>

                        <div className="hero-buttons">
                            <button 
                                onClick={() => smoothScroll('projects')} 
                                className="btn-primary"
                            >
                                프로젝트 보기
                            </button>
                            <button 
                                onClick={() => smoothScroll('about')} 
                                className="btn-secondary"
                            >
                                더 알아보기
                            </button>
                        </div>

                        {/* Quick Stats */}
                        <div className="quick-stats">
                            <div className="stat-item">
                                <div className="stat-number">{projects.length}</div>
                                <div className="stat-label">Projects</div>
                            </div>
                            <div className="stat-item">
                                <div className="stat-number blue">Full Stack</div>
                                <div className="stat-label">Developer</div>
                            </div>
                            <div className="stat-item">
                                <div className="stat-number indigo">Team</div>
                                <div className="stat-label">Player</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* About Section */}
            <section 
                id="about" 
                className={`section fade-in ${visibleSections.has('about') ? 'visible' : ''}`}
            >
                <div className="container">
                    <div className="section-header">
                        <h2 className="section-title">About Me</h2>
                        <p className="section-subtitle">저에 대해 더 자세히 알아보세요!</p>
                    </div>

                    <div className="card">
                        <div className="about-content">
                            <div className="about-text">
                                <div className="about-description">
                                    <p>
                                        <span className="emoji">💻</span> 안녕하세요! 초보 웹개발자 허민석입니다. 
                                        사용자 중심의 웹 애플리케이션을 개발하는 것에 열정을 가지고 있습니다.
                                    </p>
                                    <p>
                                        <span className="emoji">🚀</span> 모던 웹 기술을 활용하여 직관적이고 효율적인 
                                        사용자 인터페이스를 구현하며, 백엔드부터 프론트엔드까지 전체적인 개발 프로세스를 이해하고 있습니다.
                                    </p>
                                    <p>
                                        <span className="emoji">🌟</span> 새로운 기술을 배우는 것을 즐기며, 
                                        팀과의 협업을 통해 더 나은 결과물을 만들어내는 것을 목표로 합니다.
                                    </p>
                                </div>

                                {/* Contact Cards */}
                                <div className="contact-grid">
                                    {contacts.map((contact, index) => (
                                        <div key={index} className="contact-card">
                                            <div className="contact-icon">{contact.icon}</div>
                                            <div className="contact-type">
                                                {contact.type.replace(/[^\w\s]/g, '')}
                                            </div>
                                            <div className="contact-value">
                                                {contact.type === '🐙 GitHub' ? (
                                                    <a
                                                        href={`https://${contact.value}`}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="contact-link"
                                                    >
                                                        {contact.value}
                                                    </a>
                                                ) : (
                                                    contact.value
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Why Me Section */}
                            <div className="why-me-section">
                                <h3 className="why-me-title">Why Me? 🎯</h3>
                                <div className="why-me-cards">
                                    <div className="why-me-card">
                                        <div className="why-me-icon">💡</div>
                                        <div className="why-me-content">
                                            <div className="why-me-label">Problem Solver</div>
                                            <div className="why-me-desc">복잡한 문제를 단순하게 해결합니다</div>
                                        </div>
                                    </div>
                                    <div className="why-me-card blue">
                                        <div className="why-me-icon">🚀</div>
                                        <div className="why-me-content">
                                            <div className="why-me-label">Fast Learner</div>
                                            <div className="why-me-desc">새로운 기술 습득을 즐겨해요</div>
                                        </div>
                                    </div>
                                    <div className="why-me-card indigo">
                                        <div className="why-me-icon">🤝</div>
                                        <div className="why-me-content">
                                            <div className="why-me-label">Team Player</div>
                                            <div className="why-me-desc">협업과 소통을 중요하게 생각해요</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Skills Section */}
            <section 
                id="skills" 
                className={`section skills-section fade-in ${visibleSections.has('skills') ? 'visible' : ''}`}
            >
                <div className="container">
                    <div className="section-header">
                        <h2 className="section-title">Skills</h2>
                        <p className="section-subtitle">제가 다룰 수 있는 기술들이에요! 🛠️</p>
                    </div>

                    <div className="skills-grid">
                        {skills.map((skill, index) => (
                            <div key={index} className="skill-card">
                                <div className={`skill-icon skill-icon-${index + 1}`}>
                                    {/* <span>{skill.category.split(' ')[0]}</span> */}
                                    <span>{skill.icon}</span>
                                </div>
                                <h3 className="skill-title">{skill.category}</h3>
                                <div className="skill-items">
                                    {skill.items.map((item, itemIndex) => (
                                        <div key={itemIndex} className="skill-item">
                                            {item}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Projects Section */}
            <section 
                id="projects" 
                className={`section fade-in ${visibleSections.has('projects') ? 'visible' : ''}`}
            >
                <div className="container">
                    <div className="section-header">
                        <h2 className="section-title">Projects</h2>
                        <p className="section-subtitle">제가 만든 프로젝트들을 확인해보세요!</p>
                    </div>

                    <div className="projects-grid">
                        {projects.map((project, index) => (
                            <div key={project.id} className="project-card">
                                <div className={`project-header project-header-${index + 1}`}>
                                    <div className="project-emoji">{project.emoji}</div>
                                </div>
                                
                                <div className="project-content">
                                    <div className="project-title-section">
                                        <h3 className="project-title">{project.title}</h3>
                                        <span className="project-type">{project.type}</span>
                                    </div>
                                    
                                    <p className="project-date">{project.date}</p>
                                    <p className="project-description">{project.description}</p>
                                    
                                    <div className="tech-stack">
                                        {project.tech.map((tech, techIndex) => (
                                            <span key={techIndex} className="tech-tag">
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                    
                                    <div className="project-links">
                                        <a
                                            href={project.demo}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="project-link primary"
                                        >
                                            Live Demo 🚀
                                        </a>
                                        <a
                                            href={project.github}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="project-link secondary"
                                        >
                                            GitHub 🐙
                                        </a>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="footer">
                <div className="footer-content">
                    <div className="footer-header">
                        <h3 className="footer-title">Let's Connect! 🤝</h3>
                        <p className="footer-subtitle">언제든지 연락주세요! 함께 멋진 프로젝트를 만들어봐요</p>
                        
                        <div className="footer-links">
                            <a href="mailto:rhkwmq93@naver.com" className="footer-link">📧</a>
                            <a href="https://github.com/hms1218" target="_blank" rel="noopener noreferrer" className="footer-link">🐙</a>
                            <a href="tel:010-2652-5587" className="footer-link">📱</a>
                        </div>
                    </div>
                    
                    <div className="footer-bottom">
                        <p>&copy; 2025 허민석 Portfolio. Made with 💜 and React</p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Portfolio;