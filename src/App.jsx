import { useState, useEffect } from 'react'
import emailjs from '@emailjs/browser'
import './App.css'

function App() {
  const [darkMode, setDarkMode] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState('')

  const projects = [
    {
      title: "Tech Haven",
      description: "A full-stack MERN e-commerce application for buying, renting, and returning tech products. Built with React, Node.js, Express, and MongoDB, it offers dynamic product listings, user interaction, and inventory control.",
      tech: ["React", "Node.js", "MongoDB", "Axios", "JWT", "Atlas", "CSS"],
      image: "/images/tech-haven.png",
      liveLink: "https://nate-tech-haven.netlify.app",
      repoLink: "https://github.com/Nateliso/nate-tech-haven"
    },
    {
      title: "New Tech Haven",
      description: "A fully functional e-commerce website for premium tech products built with WordPress and WooCommerce. Features complete shopping cart and checkout system, secure payment gateway integration, product categorization with filtering, responsive design across all devices, customer account management, and professional policy pages.",
      tech: ["WordPress", "WooCommerce", "Kadence Theme", "Contact Form 7", "PHP", "CSS3", "Gutenberg"],
      image: "/images/tech-haven-store.png",
      liveLink: "http://newtechhaven.rf.gd",
      repoLink: null
    },
    {
      title: "Cozy Cup Café",
      description: "A warm, modern café website built with WordPress and Elementor (Free). Designed as a small business demo with a focus on clean layout, responsive design, and usability without relying on premium plugins. Includes a custom menu layout, contact form, and globally managed header and footer.",
      tech: ["WordPress", "Elementor (Free)", "Hello Elementor Theme", "Contact Form 7", "CSS"],
      image: "/images/cozy-cup-cafe.png",
      liveLink: "https://cozycupcafe.rf.gd",
      repoLink: null
    },
    {
      title: "Iron Paradise Gym",
      description: "A professional multi-page gym website built with WordPress and Astra theme. Features class schedules, trainer profiles, membership pricing tiers, contact forms, and a fully responsive design for fitness enthusiasts.",
      tech: ["WordPress", "Astra Theme", "Contact Form 7", "CSS"],
      image: "/images/iron-paradise-gym.png",
      liveLink: "http://ironparadisegym.rf.gd",
      repoLink: null
    },
    {
      title: "InsideTech",
      description: "A modern tech blog built with WordPress and Astra theme. Features in-depth reviews of smartphones, laptops, and apps, alongside the latest tech news and practical tutorials. Includes categorized content, contact forms, and a fully responsive magazine-style design.",
      tech: ["WordPress", "Astra Theme", "Contact Form 7", "CSS"],
      image: "/images/tech-inside.png",
      liveLink: "https://insidetech.rf.gd",
      repoLink: null
    },
    {
      title: "Movie Explorer",
      description: "A full-stack web application for browsing, searching, and managing a personalized movie watchlist with ratings. Users can search for movies using The Movie Database (TMDB) API, add/remove movies from their watchlist, rate movies, and watch trailers.",
      tech: ["React", "Vite", "Node.js", "Express", "PostgreSQL", "TMDB API"],
      image: "/images/movie-explorer.png",
      liveLink: "https://nate-movie-explorer.netlify.app",
      repoLink: "https://github.com/Nateliso/movie-explorer"
    },
    {
      title: "Trivia Rush",
      description: "A responsive front-end quiz game featuring two categories: Science and History. Users answer as many questions as possible within a 30-second timer. Built with React and styled with CSS.",
      tech: ["React", "Node.js", "CSS"],
      image: "/images/trivia-rush.png",
      liveLink: "https://nate-trivia.netlify.app",
      repoLink: "https://github.com/Nateliso/trivia-game"
    },
    {
      title: "Expense Tracker",
      description: "A simple yet effective app that helps users track and manage their daily expenses. Displays income and expense history, and calculates overall balance.",
      tech: ["React", "Node.js", "CSS"],
      image: "/images/expense-tracker.png",
      liveLink: "https://nate-expenses.netlify.app",
      repoLink: "https://github.com/Nateliso/Expense-tracker"
    },
    {
      title: "Expense Tracker Landing Page",
      description: "A clean and responsive landing page designed to promote the Expense Tracker app. Highlights features, benefits, and includes call-to-action sections.",
      tech: ["React", "Node.js", "CSS"],
      image: "/images/expense-landing.png",
      liveLink: "https://nate-landing.netlify.app",
      repoLink: "https://github.com/Nateliso/landing-page"
    },
    {
      title: "Weather App",
      description: "A weather forecasting app that displays real-time weather data for searched locations, including temperature and conditions. Built using weather APIs and styled with custom CSS.",
      tech: ["React", "Node.js", "CSS", "APIs"],
      image: "/images/weather-app.png",
      liveLink: "https://nateweather.netlify.app",
      repoLink: "https://github.com/Nateliso/Weather-App"
    },
    {
      title: "My To-Do List",
      description: "A productivity app designed to help users manage daily tasks and routines efficiently. Features task creation, completion toggles, and dynamic task updates.",
      tech: ["React", "Node.js", "CSS"],
      image: "/images/todo-list.png",
      liveLink: "https://nateliso-todo-list.netlify.app",
      repoLink: "https://github.com/Nateliso/TodoList"
    }
  ]

  const certifications = [
    { name: "Responsive Web Design", issuer: "freeCodeCamp", link: "https://freecodecamp.org/certification/nateliso/responsive-web-design" },
    { name: "JavaScript Algorithms and Data Structures", issuer: "freeCodeCamp", link: "https://freecodecamp.org/certification/nateliso/javascript-algorithms-and-data-structures-v8" },
    { name: "Front End Development Libraries", issuer: "freeCodeCamp", link: "https://freecodecamp.org/certification/nateliso/front-end-development-libraries" },
    { name: "Data Visualization", issuer: "freeCodeCamp", link: "https://freecodecamp.org/certification/nateliso/data-visualization" },
    { name: "Back End Development and APIs", issuer: "freeCodeCamp", link: "https://freecodecamp.org/certification/nateliso/back-end-development-and-apis" },
    { name: "Scientific Computing with Python", issuer: "freeCodeCamp", link: "https://freecodecamp.org/certification/nateliso/scientific-computing-with-python-v7" }
  ]


  useEffect(() => {
    document.body.classList.toggle('dark', darkMode)
  }, [darkMode])

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in')
        }
      })
    }, { threshold: 0.1 })

    document.querySelectorAll('.animate-on-scroll').forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    setMenuOpen(false)
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setStatus('sending')
    emailjs
      .send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        formData,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      )
      .then(
        () => {
          setStatus('success')
          setFormData({ name: '', email: '', message: '' })
        },
        () => setStatus('error')
      )
  }

  return (
    <div className={`app ${darkMode ? 'dark' : ''}`}>
      {/* Navbar */}
      <nav className="navbar">
        <div className="nav-container">
          <a href="#" className="logo">Nateliso</a>
          
          <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
            <span></span>
            <span></span>
            <span></span>
          </button>

          <ul className={`nav-links ${menuOpen ? 'open' : ''}`}>
            <li><button onClick={() => scrollToSection('about')}>About</button></li>
            <li><button onClick={() => scrollToSection('projects')}>Projects</button></li>
            <li><button onClick={() => scrollToSection('certifications')}>Certifications</button></li>
            <li><button onClick={() => scrollToSection('contact')}>Contact</button></li>
          </ul>

          <button className="theme-toggle" onClick={() => setDarkMode(!darkMode)}>
            {darkMode ? '☀️' : '🌙'}
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content animate-on-scroll">
          <h1>Hi, I'm <span className="highlight">Liso Mhlana</span></h1>
          <p className="tagline">Software Developer · Full-Stack Web · React & WordPress</p>
          <div className="hero-buttons">
            <button className="btn primary" onClick={() => scrollToSection('projects')}>View Projects</button>
            <button className="btn secondary" onClick={() => scrollToSection('contact')}>Contact Me</button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="about">
        <div className="container">
          <div className="about-content animate-on-scroll">
            <div className="about-image">
              <img src="/images/profile.jpg" alt="Nate" className="profile-img" />
            </div>
            <div className="about-text">
              <h2>About Me</h2>
              <p>
                I'm Liso Mhlana (Nateliso), a <strong>Software Developer</strong> focused on building modern, responsive web applications and practical digital solutions. I work across the stack using <strong>React</strong>, <strong>CSS</strong>, and <strong>JavaScript</strong>, and build professional <strong>WordPress</strong> sites tailored to real client needs.
              </p>
              <p>
                My background includes earning multiple certifications through <strong>freeCodeCamp</strong> and developing real-world projects, including a full-stack e-commerce application and custom WordPress websites. I enjoy translating ideas into clean, intuitive user interfaces while keeping performance, usability, and maintainability in mind.
              </p>
              <p>
                On the backend, I’ve worked with <strong>Node.js</strong>, <strong>MongoDB</strong>, and <strong>PostgreSQL</strong> to build RESTful APIs and data-driven applications. Whether I’m developing a React interface or structuring a WordPress solution, my goal is to deliver scalable, user-friendly results.
              </p>
              <p>
                Beyond writing code, I’m constantly learning — refining UI design, improving backend architecture, and exploring better development workflows. I value clean structure, thoughtful problem-solving, and steady growth through hands-on projects and collaboration.
              </p>
              <div className="skills">
                <span className="skill-tag">React</span>
                <span className="skill-tag">Node.js</span>
                <span className="skill-tag">MongoDB</span>
                <span className="skill-tag">PostgreSQL</span>
                <span className="skill-tag">Express</span>
                <span className="skill-tag">JavaScript</span>
                <span className="skill-tag">REST APIs</span>
                <span className="skill-tag">TypeScript</span>
                <span className="skill-tag">CSS</span>
                <span className="skill-tag">Git</span>
                <span className="skill-tag">WordPress</span>
                <span className="skill-tag">WooCommerce</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="projects">
        <div className="container">
          <h2 className="section-title animate-on-scroll">My Projects</h2>
          <div className="projects-grid">
            {projects.map((project, index) => (
              <div key={index} className="project-card animate-on-scroll" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="project-image">
                  <img src={project.image} alt={project.title} />
                </div>
                <div className="project-info">
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  <div className="tech-stack">
                    {project.tech.map((tech, i) => (
                      <span key={i} className="tech-tag">{tech}</span>
                    ))}
                  </div>
                  <div className="project-links">
                    <a href={project.liveLink} target="_blank" rel="noopener noreferrer" className="btn small primary">Live Demo</a>
                    <a href={project.repoLink} target="_blank" rel="noopener noreferrer" className="btn small secondary">GitHub</a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications Section */}
      <section id="certifications" className="certifications">
        <div className="container">
          <h2 className="section-title animate-on-scroll">Certifications</h2>
          <div className="cert-grid">
            {certifications.map((cert, index) => (
              <div key={index} className="cert-card animate-on-scroll">
                <div className="cert-icon">🏅</div>
                <h3>{cert.name}</h3>
                <p>{cert.issuer}</p>
                <a href={cert.link} target="_blank" rel="noopener noreferrer" className="btn small secondary">View Certificate</a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="contact">
        <div className="container">
          <h2 className="section-title animate-on-scroll">Get In Touch</h2>
          <div className="contact-grid animate-on-scroll">
            {/* Email Form */}
            <div className="contact-form-container">
              <h3>Send an Email</h3>
              <form onSubmit={handleSubmit} className="contact-form">
                <div className="form-group">
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="message">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="4"
                    required
                  ></textarea>
                </div>
                <button type="submit" className="btn primary" disabled={status === 'sending'}>
                  {status === 'sending' ? 'Sending...' : 'Send Message'}
                </button>
              </form>
              {status === 'success' && (
                <p className="status-message success">Message sent successfully!</p>
              )}
              {status === 'error' && (
                <p className="status-message error">Failed to send message. Please try again.</p>
              )}
            </div>

            {/* Social Links */}
            <div className="social-links-container">
              <h3>Connect With Me</h3>
              <p>Prefer another platform? Reach out on LinkedIn, GitHub, or X:</p>
              <div className="social-links">
                <a href="https://www.linkedin.com/in/liso-mhlana-dev" target="_blank" rel="noopener noreferrer" className="social-link">
                  <svg className="social-icon" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 3a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h14zm-9.5 15.5V12H7v6.5h2.5zm0-8.75c0-.69-.56-1.25-1.25-1.25S7 9.06 7 9.75 7.56 11 8.25 11s1.25-.56 1.25-1.25zm2.5 8.75V13.5c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5v5h2.5v-5c0-2.21-1.79-4-4-4s-4 1.79-4 4v5h2.5z" />
                  </svg>
                  LinkedIn
                </a>
                <a href="https://github.com/Nateliso" target="_blank" rel="noopener noreferrer" className="social-link">
                  <svg className="social-icon" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                  </svg>
                  GitHub
                </a>
                <a href="https://x.com/Nateliso16" target="_blank" rel="noopener noreferrer" className="social-link">
                  <svg className="social-icon" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                  X (Twitter)
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <p>&copy; {new Date().getFullYear()} Nateliso. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

export default App