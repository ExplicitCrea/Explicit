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
  { id: 1, img: colab1, name: "Collaborateur 1", desc: "Réalisation graphique et accompagnement en motion design" },
  { id: 2, img: colab2, name: "Collaborateur 2", desc: "Production 3D et montage vidéo" },
  { id: 3, img: colab3, name: "Collaborateur 3", desc: "Production visuelle 3D, FX et simulations de présentation" },
  { id: 4, img: colab4, name: "Collaborateur 4", desc: "Réalisation complète : montage, 3D, motion design et sound design" },
  { id: 5, img: colab5, name: "Collaborateur 5", desc: "Accompagnement VFX, création graphique et simulations" }
];

// Reusable GlowBlobs for Contact section
interface GlowBlob { top: string; left: string; width: string; height: string; opacity: number; borderRadius: string; transform: string; }
function useRandomBlobs(count: number): GlowBlob[] {
  const [blobs] = useState(() => 
    Array.from({ length: count }, () => {
      const w = 180 + Math.random() * 120;
      const h = 120 + Math.random() * 100;
      return {
        top:     `${-10 + Math.random() * 90}%`,
        left:    `${-10 + Math.random() * 90}%`,
        width:   `${w}px`,
        height:  `${h}px`,
        opacity: 0.08 + Math.random() * 0.12,
        borderRadius: `${30 + Math.random() * 40}% ${60 + Math.random() * 30}% ${30 + Math.random() * 50}% ${40 + Math.random() * 40}% / ${40 + Math.random() * 40}% ${30 + Math.random() * 40}% ${60 + Math.random() * 30}% ${30 + Math.random() * 50}%`,
        transform: `rotate(${Math.random() * 360}deg)`,
      };
    })
  );
  return blobs;
}

function ContactGlowBlobs({ rgb }: { rgb: string}) {
  const blobs = useRandomBlobs(3);
  return (
    <>
      {blobs.map((blob, i) => (
        <div key={i} style={{
          position: "absolute",
          top: blob.top, left: blob.left,
          width: blob.width, height: blob.height,
          borderRadius: blob.borderRadius,
          transform: blob.transform,
          background: `rgb(${rgb})`,
          filter: "blur(40px)",
          opacity: blob.opacity, /* Constant opacity, no hover boost */
          mixBlendMode: "screen",
          transition: "opacity 0.8s ease",
          pointerEvents: "none",
          zIndex: 0,
        }} />
      ))}
    </>
  );
}

const App: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [currentColab, setCurrentColab] = useState(0);
  const [direction, setDirection] = useState<'next' | 'prev' | 'in-next' | 'in-prev' | null>(null);
  const [navStyle, setNavStyle] = useState<{
    opacity: number;
    transform: string;
    pointerEvents: 'auto' | 'none';
  }>({ 
    opacity: 1, 
    transform: 'translateX(-50%) scale(1)', 
    pointerEvents: 'auto' 
  });

  const [activeColor, setActiveColor] = useState("176, 96, 255");

  // Analyze image to extract dominant color
  useEffect(() => {
    let isMounted = true;
    const img = new Image();
    
    img.crossOrigin = "anonymous";
    img.src = collaborators[currentColab].img;
    
    img.onload = () => {
      if (!isMounted) return;
      try {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d', { willReadFrequently: true });
        if (!ctx) return;

        canvas.width = 40;
        canvas.height = 40;
        ctx.drawImage(img, 0, 0, 40, 40);
        
        const imageData = ctx.getImageData(0, 0, 40, 40).data;
        let r = 0, g = 0, b = 0, count = 0;

        for (let i = 0; i < imageData.length; i += 4) {
          const alpha = imageData[i+3];
          if (alpha > 150) {
            r += imageData[i];
            g += imageData[i+1];
            b += imageData[i+2];
            count++;
          }
        }

        if (count > 0 && isMounted) {
          setActiveColor(`${Math.round(r / count)}, ${Math.round(g / count)}, ${Math.round(b / count)}`);
        }
      } catch (e) {
        console.warn("Analysis failed", e);
      }
    };
    return () => { isMounted = false; };
  }, [currentColab]);

  const [gridOffset, setGridOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setGridOffset(window.scrollY * 0.15);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const stashThreshold = 1000;
      
      if (scrollY <= 0) {
        setNavStyle({ opacity: 1, transform: 'translateX(-50%) translateY(0) scale(1)', pointerEvents: 'auto' });
      } else {
        const progress = Math.min(scrollY / stashThreshold, 1);
        const opacity = 1 - (progress * progress);
        const translateY = progress * -120;
        const scaleX = 1 - (progress * 0.2);
        const scaleY = 1 - (progress * 0.8);
        
        setNavStyle({
          opacity: opacity,
          transform: `translateX(-50%) translateY(${translateY}px) scaleX(${scaleX}) scaleY(${scaleY})`,
          pointerEvents: opacity < 0.1 ? 'none' : 'auto'
        });
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const nextColab = () => {
    const nextIndex = (currentColab + 1) % collaborators.length;
    setDirection('next');
    setTimeout(() => {
      setCurrentColab(nextIndex);
      setDirection('in-next');
    }, 300);
  };

  const prevColab = () => {
    const prevIndex = (currentColab - 1 + collaborators.length) % collaborators.length;
    setDirection('prev');
    setTimeout(() => {
      setCurrentColab(prevIndex);
      setDirection('in-prev');
    }, 300);
  };

  if (loading) {
    return (
      <div className="loader-container">
        <div className="loader"></div>
      </div>
    );
  }

  const PURPLE_RGB = "176, 96, 255";
  const GREEN_RGB = "76, 255, 143";

  return (
    <div className="app-container">
      <div className="parallax-grid" style={{ transform: `translateY(${-gridOffset % 80}px)` }} />
      <div className="main-content">
        {/* Navigation Header */}
        <nav className="nav-header" style={navStyle}>
          <div className="nav-links">
            <a href="#services" className="nav-link">Service</a>
            <a href="#contact" className="nav-link">Contact</a>
            <a href="#projects" className="nav-link">Création</a>
          </div>
        </nav>
        
        {/* Hero Section */}
        <section className="hero-section">
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
            <a href="https://www.youtube.com/watch?v=erT9IivBlKA" target="_blank" rel="noopener noreferrer" className="project-link">
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
            <a href="https://www.youtube.com/watch?v=J7fi9ja87vo" target="_blank" rel="noopener noreferrer" className="project-link">
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
            <a href="https://www.youtube.com/watch?v=BFhN_HLCOzM" target="_blank" rel="noopener noreferrer" className="project-link">
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
      <section className="section" id="collaborators" style={{ position: "relative", overflow: "visible" }}>
        <ScrollReveal>
          <div className="section-header">
            <span className="section-subtitle">Collaborateurs</span>
          </div>
        </ScrollReveal>

        {/* Dynamic Background Glow for the current collaborator */}
        <div 
          className="colab-section-glow"
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "600px",
            height: "400px",
            background: `rgba(${activeColor}, 0.15)`,
            filter: "blur(120px)",
            borderRadius: "50%",
            zIndex: 0,
            pointerEvents: "none",
            transition: "background 0.8s ease"
          }}
        />
        
        <div className="colab-slider-container" style={{ position: "relative", zIndex: 1 }}>
          <button className="slider-arrow prev interactive" onClick={prevColab}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="m15 18-6-6 6-6"/></svg>
          </button>
          
          <div className={`colab-content ${direction ? `slide-${direction}` : 'slide-in'}`}>
            <div className="colab-image-wrapper" style={{ 
              boxShadow: `0 0 60px rgba(${activeColor}, 0.4), 0 0 20px rgba(${activeColor}, 0.2)`,
              borderColor: `rgba(${activeColor}, 0.3)`
            }}>
              <img src={collaborators[currentColab].img} alt={collaborators[currentColab].name} className="colab-img" />
            </div>
            
            <div className="colab-video-box" style={{ 
              borderColor: `rgba(${activeColor}, 0.3)`, 
              boxShadow: `0 0 80px rgba(${activeColor}, 0.2)` 
            }}>
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
          <h2 className="section-title">Parlons de votre Projet</h2>
          <p className="contact-main-subtitle">Une idée, un concept ou une production a lancer ? <br/>On transforme ca en résultat concret</p>
        </ScrollReveal>
        <div className="contact-layout">
          <ScrollReveal delay={100} className="contact-info-reveal">
            <div 
              className="card glass contact-info-card reactive-card"
              style={{ 
                "--mr": "176", "--mg": "96", "--mb": "255", 
                "--sr": "176", "--sg": "96", "--sb": "255",
                "--er": "176", "--eg": "96", "--eb": "255",
                "--base-angle": "45deg" 
              } as React.CSSProperties}
            >
              <ContactGlowBlobs rgb={PURPLE_RGB} />
              <h3>Chaque projet est différent.</h3>
              <p className="contact-subtitle">Notre rôle : comprendre, structurer et produire un rendu à la hauteur.</p>
              <ul className="contact-checklist">
                <li><span className="check-icon">✓</span> Accompagnement complet</li>
                <li><span className="check-icon">✓</span> Direction artistique forte</li>
                <li><span className="check-icon">✓</span> Production optimisée</li>
              </ul>
              <div className="contact-stats-box glass">
                <span className="stats-number">+150 projets réalisés</span>
                <p>Créateurs & marques accompagnés</p>
                <p className="stats-details">Production 3D, vidéo et design</p>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={200} className="contact-form-reveal">
            <form 
              className="contact-form glass reactive-card" 
              style={{ 
                padding: '40px',
                "--mr": "76", "--mg": "255", "--mb": "143",
                "--sr": "76", "--sg": "255", "--sb": "143",
                "--er": "76", "--eg": "255", "--eb": "143",
                "--base-angle": "180deg"
              } as React.CSSProperties} 
              onSubmit={(e) => e.preventDefault()}
            >
              <ContactGlowBlobs rgb={GREEN_RGB}/>
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
                <select className="form-select" defaultValue="" required>
                  <option value="" disabled>Choisir un type</option>
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
              <button className="contact-submit-btn interactive" style={{ marginTop: '10px', width: '100%' }}>Envoyer le message</button>
              <p className="form-note">Réponse sous 24 à 48h</p>
            </form>
          </ScrollReveal>
        </div>

        <div 
          className="card glass direct-contact-card reactive-card"
          style={{ 
            "--mr": "176", "--mg": "96", "--mb": "255",
            "--sr": "176", "--sg": "96", "--sb": "255",
            "--er": "176", "--eg": "96", "--eb": "255",
            "--base-angle": "320deg"
          } as React.CSSProperties}
        >
          <ContactGlowBlobs rgb={PURPLE_RGB} />
          <div className="direct-contact-content">
            <p className="direct-label">Contactez nous directement :</p>
            
            <div className="direct-item">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="contact-icon">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                <polyline points="22,6 12,13 2,6"></polyline>
              </svg>
              <p className="direct-email">contact@explicitcrea.com</p>
            </div>

            <a href="https://instagram.com/explicit.crea" target="_blank" rel="noopener noreferrer" className="insta-link direct-item interactive">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="contact-icon">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
              <span className="insta-handle">@explicit.crea</span>
            </a>
          </div>
        </div>
        </section>


      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-logo">
            <img src={logo} alt="EXPLICIT CREA" className="footer-logo-img" />
          </div>
          <div className="footer-copyright">
            <p>&copy; Explicit Créa. Tous droits réservés.</p>
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
    </div>
  );
};

export default App;
