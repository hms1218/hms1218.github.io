import { useState, useEffect } from 'react';
import './Portfolio.css';
import myImage from '../assets/myimage.jpg'
import UKA from '../assets/MainLogo.png'

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
            category: 'Frontend',
            items: ['HTML / CSS', 'JavaScript', 'React', 'React Native']
        },
        {
            category: 'Backend',
            items: ['Node.js', 'Java', 'Spring Boot', 'RESTful API']
        },
        {
            category: 'Database',
            items: ['MySQL', 'Oracle']
        },
        {
            category: 'Tools & Others',
            items: ['Git / GitHub', 'Docker', 'AWS', 'Figma', 'Agile']
        }
    ];

    const projects = [
        {
            id: 1,
            title: 'Error Share Board',
            date: '2025-07-01 ~ 진행중 (개인 프로젝트)',
            description: '개발 도중 발생하는 에러와 해결 방법을 공유하는 게시판',
            tech: ['React', 'Spring Boot', 'MySQL'],
            demo: 'http://project-bucbucket.s3-website.ap-northeast-2.amazonaws.com',
            github: 'http://github.com/hms1218/Project1'
        },
        {
            id: 2,
            title: 'UKA (UKi Animal center)',
            date: '25.06.09 ~ 진행중 (팀 프로젝트)',
            img: UKA,
            description: '유기된 동물의 정보와 보호소 위치, 입양문의 방법 등을 확인 또는 공유',
            tech: ['React', 'Spring Boot', 'MySQL'],
            demo: 'https://github.com/hms1218/TeamProject-UKA',
            github: 'https://github.com/hms1218/TeamProject-UKA'
        },
        {
            id: 3,
            title: 'OMR (OTT Movie Review)',
            date: '25.07.21 ~ 진행중 (팀 프로젝트)',
            description: 'OTT와 영화에 대한 리뷰를 작성하여 공유하는 Application 및 Web',
            tech: ['React-Native', 'React', 'MySQL', 'Spring Boot'],
            demo: 'https://github.com/guensoo/TeamProject-OMR',
            github: 'https://github.com/guensoo/TeamProject-OMR'
        }
    ];

    const contacts = [
        { type: 'Email', value: 'rhkwmq93@naver.com' },
        { type: 'Phone', value: '010-2652-5587' },
        { type: 'GitHub', value: 'github.com/hms1218' }
    ];

    return (
        <div className="portfolio">
            <div
                className="scroll-indicator"
                style={{ width: `${scrollProgress}%` }}
            />

            <header className="header">
                <nav className="nav">
                    <div className="logo">Portfolio</div>
                    <ul className="nav-links">
                        <li className="nav-link" onClick={() => smoothScroll('home')}>홈</li>
                        <li className="nav-link" onClick={() => smoothScroll('about')}>소개</li>
                        <li className="nav-link" onClick={() => smoothScroll('skills')}>기술</li>
                        <li className="nav-link" onClick={() => smoothScroll('projects')}>프로젝트</li>
                    </ul>
                </nav>
            </header>

            <main>
                <section id="home" className="hero">
                    <div className="hero-content">
                        <h1>허민석의 포트폴리오</h1>
                        <p>사용자 경험을 중시하는 풀스택 웹개발자</p>
                        <button
                            className="cta-button"
                            onClick={() => smoothScroll('projects')}
                        >
                            프로젝트 보기
                        </button>
                    </div>
                </section>

                <section
                    id="about"
                    className={`section fade-in ${visibleSections.has('about') ? 'visible' : ''}`}
                >
                    <div className="card">
                        <div className="container">
                            <h2 className="section-title">About Me</h2>
                            <div className="about-content">
                                <div className="profile-img">
                                    <img src={myImage} alt='이미지' className='profile-photo' />
                                </div>
                                <div className="about-text">
                                    <p>안녕하세요! 초보 웹개발자 허민석입니다. 사용자 중심의 웹 애플리케이션을 개발하는 것에 열정을 가지고 있습니다.</p>
                                    <p>모던 웹 기술을 활용하여 직관적이고 효율적인 사용자 인터페이스를 구현하며, 백엔드부터 프론트엔드까지 전체적인 개발 프로세스를 이해하고 있습니다.</p>
                                    <p>새로운 기술을 배우는 것을 즐기며, 팀과의 협업을 통해 더 나은 결과물을 만들어내는 것을 목표로 합니다.</p>
                                </div>
                            </div>
                            <div className="contact-info">
                                {contacts.map((contact, index) => (
                                    <div key={index} className="contact-item">
                                        <h3>{contact.icon} {contact.type}</h3>
                                        <p>
                                            {contact.type === 'GitHub' ? (
                                                <a
                                                    href={`https://${contact.value}`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                >
                                                    🔗{contact.value}
                                                </a>
                                            ) : (
                                                contact.value
                                            )}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                <section
                    id="skills"
                    className={`section fade-in ${visibleSections.has('skills') ? 'visible' : ''}`}
                >
                    <div className="card">
                        <div className="container">
                            <h2 className="section-title">Skills</h2>
                            <div className="skills-grid">
                                {skills.map((skill, index) => (
                                    <div key={index} className="skill-card">
                                        <h2>{skill.category}</h2>
                                        <ul>
                                            {skill.items.map((item, itemIndex) => (
                                                <li key={itemIndex}>{item}</li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                <section
                    id="projects"
                    className={`section fade-in ${visibleSections.has('projects') ? 'visible' : ''}`}
                >
                    <div className="card">
                        <div className="container">
                            <h2 className="section-title">Projects</h2>
                            <div className="projects-grid">
                                {projects.map((project) => (
                                    <div key={project.id} className="project-card">
                                        <div className="project-img">
                                            <img src={project.img} alt={project.title}/>
                                        </div>
                                        <div className="project-content">
                                            <h3>{project.title}</h3>
                                            <p className='project-date'>{project.date}</p>
                                            <hr />
                                            <p className='project-description'>{project.description}</p>
                                            <div className="tech-stack">
                                                {project.tech.map((tech, index) => (
                                                    <span key={index} className="tech-tag">{tech}</span>
                                                ))}
                                            </div>
                                            <div className="project-links">
                                                <a
                                                    href={project.demo}
                                                    target='_blank'
                                                    rel="noopener noreferrer"
                                                    className='project-link'
                                                >🔗Live Demo
                                                </a>
                                                <a
                                                    href={project.github}
                                                    target='_blank'
                                                    rel="noopener noreferrer"
                                                    className="project-link"
                                                >🔗GitHub</a>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <footer className="footer">
                <p>&copy; 2025 Portfolio. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default Portfolio;