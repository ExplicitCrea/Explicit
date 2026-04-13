import React, { useState, useEffect } from 'react';
import './App.css';
import ScrollReveal from './components/ScrollReveal';

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
  { img: colab1, name: "Collaborateur 1", desc: "Réalisation graphique et accompagnement en motion design" },
  { img: colab2, name: "Collaborateur 2", desc: "Expertise en montage et effets visuels cinématiques" },
  { img: colab3, name: "Collaborateur 3", desc: "Design sonore et immersion acoustique haut de gamme" },
  { img: colab4, name: "Collaborateur 4", desc: "Direction artistique et stratégie de contenu viral" },
  { img: colab5, name: "Collaborateur 5", desc: "Illustration unique et identité visuelle forte" }
];

const App: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [currentColab, setCurrentColab] = useState(0);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const nextColab = () => {
    setCurrentColab((prev) => (prev + 1) % collaborators.length);
  };

  const prevColab = () => {
    setCurrentColab((prev) => (prev - 1 + collaborators.length) % collaborators.length);
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
            Vous avez un projet créatif ? On le transforme en rendu concret, du concept à la production finale.
          </p>
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
            <button className="cta-button interactive">Démarrer un projet</button>
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
          </ScrollReveal>
          <ScrollReveal delay={200}>
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
          </ScrollReveal>
          <ScrollReveal delay={300}>
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
          
          <div className="colab-content">
            <div className="colab-image-wrapper">
              <img src={collaborators[currentColab].img} alt={collaborators[currentColab].name} className="colab-img" />
            </div>
            
            <div className="colab-video-box">
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

      {/* Services Section */}
      <section className="section" id="services">
        <ScrollReveal>
          <div className="section-header">
            <span className="section-subtitle">NOS SERVICES</span>
          </div>
        </ScrollReveal>
        <div className="grid-container">
          <ScrollReveal delay={100}>
            <div className="card glass service-card">
              <div className="service-header">
                <div className="service-icon icon-violet">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="m10 8 6 4-6 4V8z"/></svg>
                </div>
                <h3>MONTAGE<br/>YOUTUBE</h3>
              </div>
              <p>Un montage à fort impact pour une rétention d'audience maximale.</p>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={200}>
            <div className="card glass service-card">
              <div className="service-header">
                <div className="service-icon icon-green">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m21 8-9-4-9 4 9 4 9-4z"/><path d="M21 12l-9 4-9-4"/><path d="M21 16l-9 4-9-4"/></svg>
                </div>
                <h3>SCÈNES<br/>CINÉMATIQUES 3D</h3>
              </div>
              <p>Des visuels 3D époustouflants pour rendre vos vidéos virales.</p>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={300}>
            <div className="card glass service-card">
              <div className="service-header">
                <div className="service-icon icon-accent">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M7 4v16M17 4v16M2 9h20M2 15h20"/></svg>
                </div>
                <h3>PRODUCTION<br/>VIDÉO COMPLÈTE</h3>
              </div>
              <p>Du concept au rendu final. Une prise en charge de A à Z.</p>
            </div>
          </ScrollReveal>

          {/* Additional Services */}
          <ScrollReveal delay={350}>
            <div className="card glass service-card">
              <div className="service-header">
                <div className="service-icon icon-violet">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 1v22M17 5v14M7 5v14M22 9v6M2 9v6"/></svg>
                </div>
                <h3>SOUND<br/>DESIGN</h3>
              </div>
              <p>Ajoutez de la profondeur et de l'impact à vos contenus.</p>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={400}>
            <div className="card glass service-card">
              <div className="service-header">
                <div className="service-icon icon-green">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m12 19 9-7-9-7-9 7 9 7z"/><path d="m3 12 9 7 9-7"/><path d="M3 16l9 7 9-7"/></svg>
                </div>
                <h3>MOTION<br/>DESIGN</h3>
              </div>
              <p>Donnez vie à vos idées avec des animations impactantes.</p>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={450}>
            <div className="card glass service-card">
              <div className="service-header">
                <div className="service-icon icon-accent">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="m21 15-5-5L5 21"/></svg>
                </div>
                <h3>VIGNETTE<br/>YOUTUBE</h3>
              </div>
              <p>Miniatures optimisées pour maximiser le clic.</p>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={500}>
            <div className="card glass service-card">
              <div className="service-header">
                <div className="service-icon icon-violet">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>
                </div>
                <h3>MODÉLISATION<br/>3D</h3>
              </div>
              <p>Des assets propres, exploitables et adaptés à vos besoins.</p>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={550}>
            <div className="card glass service-card">
              <div className="service-header">
                <div className="service-icon icon-green">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 19l7-7 3 3-7 7-3-3z"/><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"/><path d="M2 2l5 5"/><path d="m9.5 9.5 5 5"/></svg>
                </div>
                <h3>ILLUSTRATION<br/>SUR-MESURE</h3>
              </div>
              <p>Un style visuel unique pour renforcer votre identité.</p>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={600}>
            <div className="card glass service-card">
              <div className="service-header">
                <div className="service-icon icon-accent">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
                </div>
                <h3>DESIGN<br/>GRAPHIQUE</h3>
              </div>
              <p>Création d'identités visuelles et supports graphiques.</p>
            </div>
          </ScrollReveal>
        </div>
        <ScrollReveal delay={400}>
          <div style={{ textAlign: 'center', marginTop: '40px' }}>
            <button className="secondary-button interactive">EN SAVOIR PLUS</button>
          </div>
        </ScrollReveal>
      </section>

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
            <p>&copy; Explicit. Tous droits réservés.</p>
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
