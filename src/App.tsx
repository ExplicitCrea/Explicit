import React, { useState, useEffect } from 'react';
import './App.css';
import ScrollReveal from './components/ScrollReveal';
import ServiceCards from './components/ServiceCards';

// Asset imports
import logo from '../assets/logo.png';
import portfolioVideo from '../assets/video_portfolio.webm';
import legrandjd from '../assets/legrandjd.png';
import maskey from '../assets/maskey.jpg';
import vzion from '../assets/vzion.jpg';

// Collaborators
import colab1 from '../assets/collaborateur_1.jpg';
import colab2 from '../assets/collaborateur_2.png';
import colab3 from '../assets/collaborateur_3.jpg';
import colab4 from '../assets/collaborateur_4.jpg';
import colab5 from '../assets/collaborateur_5.png';

const collaborators = [
  { id: 1, img: colab1, name: "Collaborateur 1", desc: "Réalisation graphique et accompagnement en motion design", color: "176, 96, 255" },
  { id: 2, img: colab2, name: "Collaborateur 2", desc: "Expertise en montage et effets visuels cinématiques", color: "76, 255, 143" },
  { id: 3, img: colab3, name: "Collaborateur 3", desc: "Design sonore et immersion acoustique haut de gamme", color: "99, 78, 255" },
  { id: 4, img: colab4, name: "Collaborateur 4", desc: "Direction artistique et stratégie de contenu viral", color: "48, 221, 105" },
  { id: 5, img: colab5, name: "Collaborateur 5", desc: "Illustration unique et identité visuelle forte", color: "163, 95, 255" }
];

const App: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [currentColab, setCurrentColab] = useState(0);
  const [direction, setDirection] = useState<'next' | 'prev' | null>(null);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const nextColab = () => {
    setDirection('next');
    setTimeout(() => {
      setCurrentColab((prev) => (prev + 1) % collaborators.length);
      setDirection(null);
    }, 300);
  };

  const prevColab = () => {
    setDirection('prev');
    setTimeout(() => {
      setCurrentColab((prev) => (prev - 1 + collaborators.length) % collaborators.length);
      setDirection(null);
    }, 300);
  };

  if (loading) {
    return (
      <div className="loader-container">
        <div className="loader"></div>
      </div>
    );
  }

  return (
    <div className="app-container">
      {/* Navigation Header */}
      <nav className="nav-header">
        <div className="nav-links">
          <a href="#services" className="nav-link">Service</a>
          <a href="#contact" className="nav-link">Contact</a>
          <a href="#projects" className="nav-link">Création</a>
        </div>
      </nav>
      
      {/* Hero Section */}
      <section className="hero-section">
        <div className="accent-glow glow-green"></div>
        <div className="accent-glow glow-violet"></div>
        <ScrollReveal>
          <div className="hero-logo-container">
            <img src={logo} alt="EXPLICIT CREA" className="hero-logo-img" />
          </div>
        </ScrollReveal>
        <ScrollReveal delay={200}>
          <p className="hero-subtitle">
            Vous avez un projet créatif ? 
          </p>
          <p className="hero-sub-subtitle">On le transforme en rendu concret, du concept à la production finale.</p>
        </ScrollReveal>
        
        <div className="hero-visual-wrapper">
          <ScrollReveal delay={300} className="hero-video-reveal">
            <div className="hero-video-container">
              <video 
                src={portfolioVideo} 
                autoPlay 
                loop 
                muted 
                playsInline 
                className="hero-video glass"
              />
            </div>
          </ScrollReveal>
          <ScrollReveal delay={450} className="hero-cta-reveal">
            <a href="#contact" className="cta-button interactive">Démarrer un projet</a>
          </ScrollReveal>
        </div>
      </section>

      {/* Projects Section */}
      <section className="section" id="projects">
        <ScrollReveal>
          <div className="section-header">
            <span className="section-subtitle">Nos travaux</span>
            <h2 className="section-main-title">Des projets concrets, pensés pour performer et marquer les esprits.</h2>
          </div>
        </ScrollReveal>
        <div className="grid-container">
          <ScrollReveal delay={100}>
            <a href="https://www.youtube.com/@LeGrandJD" target="_blank" rel="noopener noreferrer" className="project-link">
              <div className="card glass project-card interactive">
                <div className="project-image-container">
                  <img src={legrandjd} alt="Le Grand JD" />
                </div>
                <div className="project-info">
                  <h3>MICHAEL JACKSON EST TOUJOURS EN VIE</h3>
                  <div className="project-author">
                    <span className="dot red-dot"></span>
                    <span className="author-name">LE GRAND JD</span>
                  </div>
                </div>
              </div>
            </a>
          </ScrollReveal>
          <ScrollReveal delay={200}>
            <a href="https://www.youtube.com/@Maskey" target="_blank" rel="noopener noreferrer" className="project-link">
              <div className="card glass project-card interactive">
                <div className="project-image-container">
                  <img src={maskey} alt="Maskey" />
                </div>
                <div className="project-info">
                  <h3>J'ai passé deux ans sans papiers.</h3>
                  <div className="project-author">
                    <span className="dot blue-dot"></span>
                    <span className="author-name">MASKEY</span>
                  </div>
                </div>
              </div>
            </a>
          </ScrollReveal>
          <ScrollReveal delay={300}>
            <a href="https://www.youtube.com/@VZION" target="_blank" rel="noopener noreferrer" className="project-link">
              <div className="card glass project-card interactive">
                <div className="project-image-container">
                  <img src={vzion} alt="Vzion" />
                </div>
                <div className="project-info">
                  <h3>Comment la Justice peut Condamner un Innocent.</h3>
                  <div className="project-author">
                    <span className="dot purple-dot"></span>
                    <span className="author-name">VZION</span>
                  </div>
                </div>
              </div>
            </a>
          </ScrollReveal>
        </div>
      </section>

      {/* Collaborator Section */}
      <section className="section" id="collaborators">
        <ScrollReveal>
          <div className="section-header">
            <span className="section-subtitle">Collaborateur</span>
          </div>
        </ScrollReveal>
        
        <div className="colab-slider-container">
          <button className="slider-arrow prev interactive" onClick={prevColab}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="m15 18-6-6 6-6"/></svg>
          </button>
          
          <div className={`colab-content ${direction ? `slide-${direction}` : 'slide-in'}`}>
            <div className="colab-image-wrapper" style={{ boxShadow: `0 0 40px rgba(${collaborators[currentColab].color}, 0.3)` }}>
              <img src={collaborators[currentColab].img} alt={collaborators[currentColab].name} className="colab-img" />
            </div>
            
            <div className="colab-video-box" style={{ borderColor: `rgba(${collaborators[currentColab].color}, 0.3)`, boxShadow: `0 0 50px rgba(${collaborators[currentColab].color}, 0.15)` }}>
              <video 
                key={currentColab}
                src={portfolioVideo} 
                autoPlay 
                loop 
                muted 
                playsInline 
                className="colab-bg-video"
              />
              <div className="colab-text-overlay">
                <p>{collaborators[currentColab].desc}</p>
              </div>
            </div>
          </div>
          
          <button className="slider-arrow next interactive" onClick={nextColab}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="m9 18 6-6-6-6"/></svg>
          </button>
        </div>
      </section>

      {/* Custom Services Section */}
      <ServiceCards />

      {/* Contact Section */}
      <section className="section" id="contact">
        <ScrollReveal>
          <h2 className="section-title">Contactez-nous</h2>
        </ScrollReveal>
        <div className="contact-layout">
          <ScrollReveal delay={100} className="contact-info-reveal">
            <div className="card glass contact-info-card">
              <h3>Chaque projet est différent.</h3>
              <p className="contact-subtitle">Notre rôle : comprendre, structurer et produire un rendu à la hauteur.</p>
              <ul className="contact-checklist">
                <li><span className="check-icon">✓</span> Accompagnement complet</li>
                <li><span className="check-icon">✓</span> Direction artistique forte</li>
                <li><span className="check-icon">✓</span> Production optimisée</li>
              </ul>
              <div className="contact-stats-box glass">
                <span className="stats-number">+50 projets réalisés</span>
                <p>Créateurs & marques accompagnés</p>
                <p className="stats-details">Production 3D, vidéo et design</p>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={200} className="contact-form-reveal">
            <form className="contact-form glass" style={{ padding: '40px' }} onSubmit={(e) => e.preventDefault()}>
              <div className="form-group">
                <label>Nom</label>
                <input type="text" placeholder="Votre Nom" required />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input type="email" placeholder="Votre Email" required />
              </div>
              <div className="form-group">
                <label>Téléphone (Optionnel)</label>
                <input type="tel" placeholder="Votre numéro" />
              </div>
              <div className="form-group">
                <label>Type de projet</label>
                <select className="form-select" required>
                  <option value="" disabled selected>Choisir un type</option>
                  <option>Montage vidéo</option>
                  <option>3D</option>
                  <option>Production de vidéo</option>
                  <option>Miniature</option>
                  <option>Motion design</option>
                  <option>Illustration</option>
                  <option>Sound Design</option>
                  <option>Autre</option>
                </select>
              </div>
              <div className="form-group">
                <label>Message</label>
                <textarea rows={4} placeholder="Parlez-nous de votre projet"></textarea>
              </div>
              <button className="cta-button interactive" style={{ marginTop: '10px', width: '100%' }}>Envoyer le message</button>
            </form>
          </ScrollReveal>
        </div>

        <ScrollReveal delay={300}>
          <div className="card glass direct-contact-card interactive">
            <p>Contactez nous directement : <strong>contact@explicitcrea.com</strong></p>
          </div>
        </ScrollReveal>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-logo">
            <img src={logo} alt="EXPLICIT CREA" className="footer-logo-img" />
          </div>
          <div className="footer-copyright">
            <p>&copy; 2026 WHITE STAR. Tous droits réservés.</p>
          </div>
          <div className="footer-links">
            <a href="#services" className="footer-link">Services</a>
            <a href="#" className="footer-link">Aide</a>
            <a href="#" className="footer-link">Mentions légales</a>
            <a href="#" className="footer-link">CGU / CGV</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
