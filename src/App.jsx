import { useState, useEffect, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { ExternalLink, Code, Heart, User, Sun, Moon, Star, Zap, Filter, ChevronDown, ChevronUp } from 'lucide-react';
import { projects, skills, interests, personalInfo } from './data';
import './App.css';

const GitHubIcon = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
  </svg>
);

const skillIcons = {
  JavaScript: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
  TypeScript: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
  React: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
  Python: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
  Node: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
  "Node.js": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
  Express: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg",
  MongoDB: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
  HTML: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
  CSS: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
  Tailwind: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg",
  DevOps: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
  Git: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
  Vercel: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vercel/vercel-original.svg",
  Netlify: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/netlify/netlify-original.svg",
  Linux: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg"
};

function AnimatedCounter({ end, duration = 2000, suffix = "" }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    let startTime;
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [isInView, end, duration]);

  return <span ref={ref}>{count}{suffix}</span>;
}

function Particles({ darkMode }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let particles = [];
    let animationId;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const createParticles = () => {
      particles = [];
      const count = darkMode ? 80 : 40;
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 2 + 1,
          baseX: 0,
          baseY: 0,
          density: Math.random() * 20 + 5
        });
        particles[i].baseX = particles[i].x;
        particles[i].baseY = particles[i].y;
      }
    };

    const drawParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const color = darkMode ? '88, 166, 255' : '9, 105, 218';
      
      particles.forEach(particle => {
        const dx = 0;
        const dy = 0;
        const distance = 9999;
        
        if (particle.x !== particle.baseX) {
          let dx = particle.x - particle.baseX;
          particle.x -= dx / 15;
        }
        if (particle.y !== particle.baseY) {
          let dy = particle.y - particle.baseY;
          particle.y -= dy / 15;
        }

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${color}, ${darkMode ? 0.6 : 0.4})`;
        ctx.fill();
      });
    };

    const animate = () => {
      drawParticles();
      animationId = requestAnimationFrame(animate);
    };

    resize();
    createParticles();
    animate();

    window.addEventListener('resize', () => {
      resize();
      createParticles();
    });

    return () => cancelAnimationFrame(animationId);
  }, [darkMode]);

  return <canvas ref={canvasRef} className="particles-canvas" />;
}

function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [darkMode, setDarkMode] = useState(true);
  const [projectFilter, setProjectFilter] = useState('All');
  const [showFilters, setShowFilters] = useState(false);
  const [typedText, setTypedText] = useState('');
  const fullText = "Front-end Developer & Tech Enthusiast";

  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      if (index <= fullText.length) {
        setTypedText(fullText.slice(0, index));
        index++;
      } else {
        clearInterval(timer);
      }
    }, 50);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    document.body.classList.toggle('light-mode', !darkMode);
  }, [darkMode]);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'projects', 'skills', 'interests'];
      const scrollPos = window.scrollY + 100;
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPos >= offsetTop && scrollPos < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const uniqueLanguages = ['All', ...new Set(projects.map(p => p.language).filter(Boolean))];
  
  const filteredProjects = projectFilter === 'All' 
    ? projects 
    : projects.filter(p => p.language === projectFilter);

  const [mousePos, setMousePos] = useState({ x: -100, y: -100 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="app">
      <Particles darkMode={darkMode} />
      <div 
        className={`mouse-glow ${darkMode ? '' : 'light'}`}
        style={{ left: mousePos.x - 200, top: mousePos.y - 200 }}
      />
      
      <nav className="navbar">
        <div className="nav-content">
          <motion.span 
            className="logo"
            whileHover={{ scale: 1.05 }}
            style={{ cursor: 'pointer' }}
          >
            Rithesh's space
          </motion.span>
          <div className="nav-links">
            {['home', 'projects', 'skills', 'interests'].map((section, index) => (
              <motion.button
                key={section}
                className={`nav-link ${activeSection === section ? 'active' : ''}`}
                onClick={() => scrollTo(section)}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {section.charAt(0).toUpperCase() + section.slice(1)}
              </motion.button>
            ))}
            <motion.button
              className="theme-toggle"
              onClick={() => setDarkMode(!darkMode)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {darkMode ? <Sun size={18} /> : <Moon size={18} />}
            </motion.button>
          </div>
        </div>
      </nav>

      <div className="scroll-indicator">
        <motion.div
          className="scroll-arrow"
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          <ChevronDown size={24} />
        </motion.div>
      </div>

      <section id="home" className="hero-section">
        <div className="hero-content">
          <div className="profile-section">
            <motion.div 
              className="profile-image"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
            >
              <img src={personalInfo.avatar} alt={personalInfo.name} />
              <div className="profile-ring" />
            </motion.div>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <p className="greeting">
              <Star size={16} /> Hello, I'm
            </p>
            <h1 className="hero-title">
              <motion.span
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
              >
                Rithesh J Rai
              </motion.span>
            </h1>
            <p className="hero-subtitle">
              <span className="typed-text">{typedText}</span>
              <span className="cursor">|</span>
            </p>
            <motion.p 
              className="hero-desc"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              Building innovative solutions with code. Passionate about web development,
              accessibility, and emerging technologies.
            </motion.p>

            <motion.div 
              className="hero-buttons"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1 }}
            >
              <motion.button 
                className="btn btn-primary" 
                onClick={() => scrollTo('projects')}
                whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(88, 166, 255, 0.4)" }}
                whileTap={{ scale: 0.95 }}
              >
                <Code size={18} /> View Projects
              </motion.button>
              <motion.a 
                href={`https://github.com/${personalInfo.github}`} 
                target="_blank" 
                className="btn btn-secondary"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <GitHubIcon size={18} /> GitHub
              </motion.a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section id="projects" className="section">
        <div className="section-header">
          <motion.h2 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <Code size={24} /> Projects
          </motion.h2>
          <p>Check out my work on GitHub</p>
        </div>

        <motion.button 
          className="filter-toggle"
          onClick={() => setShowFilters(!showFilters)}
          whileHover={{ scale: 1.02 }}
        >
          <Filter size={16} /> Filter by Tech
          {showFilters ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </motion.button>

        <AnimatePresence>
          {showFilters && (
            <motion.div 
              className="filter-options"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
            >
              {uniqueLanguages.map(lang => (
                <button
                  key={lang}
                  className={`filter-btn ${projectFilter === lang ? 'active' : ''}`}
                  onClick={() => setProjectFilter(lang)}
                >
                  {lang}
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        <div className="projects-grid">
          {filteredProjects.map((project, index) => (
            <motion.a
              key={project.name}
              href={project.url}
              target="_blank"
              className="project-card"
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15, type: "spring", stiffness: 100 }}
              whileHover={{ y: -8, scale: 1.02 }}
            >
              <div className="project-header">
                <h3>{project.name}</h3>
                <ExternalLink size={16} />
              </div>
              <p className="project-desc">{project.description}</p>
              <div className="project-footer">
                {project.language && <span className="language-tag">{project.language}</span>}
                {project.homepage && (
                  <a href={project.homepage} target="_blank" className="live-link" onClick={(e) => e.stopPropagation()}>
                    Live Demo
                  </a>
                )}
              </div>
            </motion.a>
          ))}
        </div>
      </section>

      <section id="skills" className="section">
        <div className="section-header">
          <motion.h2 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <Zap size={24} /> Skills
          </motion.h2>
          <p>Technologies I work with</p>
        </div>
        <div className="skills-grid">
          {skills.map((skill, index) => (
            <motion.div
              key={skill}
              className="skill-tag"
              initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
              whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05, type: "spring", stiffness: 200 }}
              whileHover={{ scale: 1.1, rotate: 2 }}
            >
              {skillIcons[skill] ? (
                <img src={skillIcons[skill]} alt={skill} className="skill-icon" />
              ) : null}
              <span>{skill}</span>
            </motion.div>
          ))}
        </div>
      </section>

      <section id="interests" className="section">
        <div className="section-header">
          <motion.h2 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <Heart size={24} /> Interests
          </motion.h2>
          <p>What I'm passionate about</p>
        </div>
        <div className="interests-grid">
          {interests.map((interest, index) => (
            <motion.div
              key={interest}
              className="interest-card"
              initial={{ opacity: 0, x: -30, scale: 0.8 }}
              whileInView={{ opacity: 1, x: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, type: "spring", stiffness: 150 }}
              whileHover={{ scale: 1.05, x: 10 }}
            >
              <span className="interest-icon">{index + 1}</span>
              <span>{interest}</span>
            </motion.div>
          ))}
        </div>
      </section>

      <footer className="footer">
        <a href={`https://github.com/${personalInfo.github}`} target="_blank">
          <GitHubIcon size={20} /> {personalInfo.github}
        </a>
      </footer>
    </div>
  );
}

export default App;
