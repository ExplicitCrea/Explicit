import React, { useState, useEffect, useRef } from 'react';
import emailjs from '@emailjs/browser';
import ScrollReveal from '../../components/ScrollReveal';
import ServiceCards from '../../components/ServiceCards';
import { EMAILJS_CONFIG } from '../../config/emailjs';
import { ACTIVE_THEME, ACTIVE_LOGO } from '../../config/themes';

// Assets
import portfolioVideoWebm from '../../../assets/Showreel2.webm';
import legrandjd from '../../../assets/legrandjd.png';
import maskey from '../../../assets/maskey.jpg';
import vzion from '../../../assets/Miniature_Paul_Denham_V4.1.jpg';

// Collaborators
import colab1 from '../../../assets/collaborateur_1.jpg';
import colab2 from '../../../assets/collaborateur_2.png';
import colab3 from '../../../assets/collaborateur_3.jpg';
import colab4 from '../../../assets/collaborateur_4.jpg';
import colab5 from '../../../assets/collaborateur_5.png';

import videoCollab1Webm from '../../../assets/CollabJD_720.webm';
import videoCollab2Webm from '../../../assets/CollabMcSkyz_720.webm';
import videoCollab3Webm from '../../../assets/CollabInsta360_720.webm';
import videoCollab4Webm from '../../../assets/CollabVzion_720.webm';
import videoCollab5Webm from '../../../assets/CollabACT_720.webm';

const collaborators = [
  { id: 1, img: colab1, webm: videoCollab1Webm, name: "Collaborateur 1", desc: "Réalisation graphique et accompagnement en motion design" },
  { id: 2, img: colab2, webm: videoCollab2Webm, name: "Collaborateur 2", desc: "Production 3D et montage vidéo" },
  { id: 3, img: colab3, webm: videoCollab3Webm, name: "Collaborateur 3", desc: "Production visuelle 3D, FX et simulations de présentation" },
  { id: 4, img: colab4, webm: videoCollab4Webm, name: "Collaborateur 4", desc: "Réalisation complète : montage, 3D, motion design et sound design" },
  { id: 5, img: colab5, webm: videoCollab5Webm, name: "Collaborateur 5", desc: "Accompagnement VFX, création graphique et simulations" }
];

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

function ContactGlowBlobs({ rgb }: { rgb: string }) {
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
          opacity: blob.opacity,
          mixBlendMode: "screen",
          transition: "opacity 0.8s ease",
          pointerEvents: "none",
          zIndex: 0,
        }} />
      ))}
    </>
  );
}

export const HomePage: React.FC = () => {
  const [currentColab, setCurrentColab] = useState(0);
  const [direction, setDirection] = useState<'next' | 'prev' | 'in-next' | 'in-prev' | null>(null);
  const [activeColor, setActiveColor] = useState("176, 96, 255");
  const [isNavStashed, setIsNavStashed] = useState(false);
  const [isVideoReady, setIsVideoReady] = useState(false);

  // Preload all collaborator images into browser cache
  useEffect(() => {
    collaborators.forEach((c) => {
      const img = new Image();
      img.src = c.img;
    });
  }, []);

  const formRef = useRef<HTMLFormElement>(null);
  const [isSending, setIsSending] = useState(false);
  const [sendResult, setSendResult] = useState<'success' | 'error' | null>(null);

  const sendEmail = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;

    setIsSending(true);
    setSendResult(null);

    emailjs.sendForm(
      EMAILJS_CONFIG.SERVICE_ID,
      EMAILJS_CONFIG.TEMPLATE_ID,
      formRef.current,
      EMAILJS_CONFIG.PUBLIC_KEY
    )
      .then((result) => {
          console.log(result.text);
          setSendResult('success');
          formRef.current?.reset();
      }, (error) => {
          console.log(error.text);
          setSendResult('error');
      })
      .finally(() => {
        setIsSending(false);
      });
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY || window.pageYOffset || document.documentElement.scrollTop;
      setIsNavStashed(scrollPos > 10);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle hash scrolling on direct load
  useEffect(() => {
    if (window.location.hash) {
      const id = window.location.hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        setTimeout(() => {
          const offset = 100;
          const bodyRect = document.body.getBoundingClientRect().top;
          const elementRect = element.getBoundingClientRect().top;
          const offsetPosition = (elementRect - bodyRect) - offset;
          window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
        }, 150);
      }
    }
  }, []);

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

  const nextColab = () => {
    const nextIndex = (currentColab + 1) % collaborators.length;
    setIsVideoReady(false);
    setDirection('next');
    setTimeout(() => {
      setCurrentColab(nextIndex);
      setDirection('in-next');
    }, 300);
  };

  const prevColab = () => {
    const prevIndex = (currentColab - 1 + collaborators.length) % collaborators.length;
    setIsVideoReady(false);
    setDirection('prev');
    setTimeout(() => {
      setCurrentColab(prevIndex);
      setDirection('in-prev');
    }, 300);
  };

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    setIsNavStashed(true);
    const element = document.getElementById(id);
    if (element) {
      const offset = 100;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const PRIMARY_RGB = ACTIVE_THEME.primary.rgbString;
  const SECONDARY_RGB = ACTIVE_THEME.secondary.rgbString;

  return (
    <>
      {/* Consolidated Navigation Header */}
      <nav className={`nav-header ${isNavStashed ? 'stashed' : ''}`}>
        <div className="nav-links">
          <a href="#services" className="nav-link" onClick={(e) => scrollToSection(e, 'services')}>Service</a>
          <a href="#contact"  className="nav-link" onClick={(e) => scrollToSection(e, 'contact')}>Contact</a>
          <a href="#projects" className="nav-link" onClick={(e) => scrollToSection(e, 'projects')}>Création</a>
        </div>
      </nav>

      <div className="main-content">
        {/* Hero Section */}
        <section className="hero-section">
          <ScrollReveal>
            <div className="hero-logo-container">
              <img src={ACTIVE_LOGO} alt="EXPLICIT CREA" className="hero-logo-img" />
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
              <div className="hero-video-container" style={{ position: 'relative' }}>
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  controlsList="nodownload noremoteplayback"
                  disablePictureInPicture
                  onContextMenu={(e) => e.preventDefault()}
                  className="hero-video glass"
                  style={{ pointerEvents: 'none', userSelect: 'none' }}
                >
                  <source src={portfolioVideoWebm} type="video/webm" />
                </video>
                <div 
                  className="video-shield" 
                  onContextMenu={(e) => e.preventDefault()}
                  style={{ position: 'absolute', inset: 0, zIndex: 2, background: 'transparent' }} 
                />
              </div>
            </ScrollReveal>
            <ScrollReveal delay={450} className="hero-cta-reveal">
              <a href="#contact" onClick={(e) => scrollToSection(e, 'contact')} className="cta-button interactive">Démarrer un projet</a>
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
                <img 
                  key={collaborators[currentColab].id} 
                  src={collaborators[currentColab].img} 
                  alt={collaborators[currentColab].name} 
                  className="colab-img" 
                  draggable={false}
                  onContextMenu={(e) => e.preventDefault()}
                />
              </div>
              
              <div className="colab-video-box" style={{
                borderColor: `rgba(${activeColor}, 0.3)`,
                boxShadow: `0 0 80px rgba(${activeColor}, 0.2)`,
                backgroundColor: '#121212',
                position: 'relative'
              }}>
                <video
                  key={collaborators[currentColab].id}
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="auto"
                  controlsList="nodownload noremoteplayback"
                  disablePictureInPicture
                  onContextMenu={(e) => e.preventDefault()}
                  onLoadedData={() => setIsVideoReady(true)}
                  className="colab-bg-video"
                  style={{
                    opacity: isVideoReady ? 1 : 0,
                    transition: 'opacity 0.3s ease',
                    pointerEvents: 'none',
                    userSelect: 'none'
                  }}
                >
                  <source src={collaborators[currentColab].webm} type="video/webm" />
                </video>
                <div 
                  className="video-shield" 
                  onContextMenu={(e) => e.preventDefault()}
                  style={{ position: 'absolute', inset: 0, zIndex: 1, background: 'transparent' }} 
                />
                <div className="colab-text-overlay" style={{ zIndex: 2 }}>
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
            <p className="contact-main-subtitle">Une idée, un concept ou une production à lancer ? <br/>On transforme ça en résultat concret</p>
          </ScrollReveal>
          <div className="contact-layout">
            <ScrollReveal delay={100} className="contact-info-reveal">
              <div 
                className="card glass contact-info-card reactive-card"
                style={{ 
                  "--mr": String(ACTIVE_THEME.primary.rgb.r), "--mg": String(ACTIVE_THEME.primary.rgb.g), "--mb": String(ACTIVE_THEME.primary.rgb.b), 
                  "--sr": String(ACTIVE_THEME.primary.rgb.r), "--sg": String(ACTIVE_THEME.primary.rgb.g), "--sb": String(ACTIVE_THEME.primary.rgb.b), 
                  "--er": String(ACTIVE_THEME.primary.rgb.r), "--eg": String(ACTIVE_THEME.primary.rgb.g), "--eb": String(ACTIVE_THEME.primary.rgb.b), 
                  "--base-angle": "45deg" 
                } as React.CSSProperties}
              >
                <ContactGlowBlobs rgb={PRIMARY_RGB} />
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
                ref={formRef}
                className="contact-form glass reactive-card" 
                style={{ 
                  padding: '40px',
                  "--mr": String(ACTIVE_THEME.secondary.rgb.r), "--mg": String(ACTIVE_THEME.secondary.rgb.g), "--mb": String(ACTIVE_THEME.secondary.rgb.b), 
                  "--sr": String(ACTIVE_THEME.secondary.rgb.r), "--sg": String(ACTIVE_THEME.secondary.rgb.g), "--sb": String(ACTIVE_THEME.secondary.rgb.b), 
                  "--er": String(ACTIVE_THEME.secondary.rgb.r), "--eg": String(ACTIVE_THEME.secondary.rgb.g), "--eb": String(ACTIVE_THEME.secondary.rgb.b), 
                  "--base-angle": "180deg"
                } as React.CSSProperties} 
                onSubmit={sendEmail}
              >
                <ContactGlowBlobs rgb={SECONDARY_RGB}/>
                <div className="form-group">
                  <label>Nom</label>
                  <input type="text" name="user_name" placeholder="Votre Nom" required />
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <input type="email" name="user_email" placeholder="Votre Email" required />
                </div>
                <div className="form-group">
                  <label>Téléphone (Optionnel)</label>
                  <input type="tel" name="user_phone" placeholder="Votre numéro" />
                </div>
                <div className="form-group">
                  <label>Type de projet</label>
                  <select className="form-select" name="project_type" defaultValue="" required>
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
                  <textarea name="message" rows={4} placeholder="Parlez-nous de votre projet" required></textarea>
                </div>
                <button 
                  className="contact-submit-btn interactive" 
                  style={{ 
                    marginTop: '10px', 
                    width: '100%',
                    opacity: isSending ? 0.7 : 1,
                    cursor: isSending ? 'not-allowed' : 'pointer'
                  }}
                  disabled={isSending}
                >
                  {isSending ? 'Envoi en cours...' : 'Envoyer le message'}
                </button>
                
                {sendResult === 'success' && (
                  <p style={{ color: 'var(--accent-secondary)', marginTop: '15px', textAlign: 'center', fontWeight: 'bold' }}>
                    Message envoyé avec succès !
                  </p>
                )}
                {sendResult === 'error' && (
                  <p style={{ color: '#ff4e4e', marginTop: '15px', textAlign: 'center', fontWeight: 'bold' }}>
                    Erreur lors de l'envoi. Veuillez réessayer.
                  </p>
                )}
                
                <p className="form-note">Réponse sous 24 à 48h</p>
              </form>
            </ScrollReveal>
          </div>

          <div 
            className="card glass direct-contact-card reactive-card"
            style={{ 
              "--mr": String(ACTIVE_THEME.primary.rgb.r), "--mg": String(ACTIVE_THEME.primary.rgb.g), "--mb": String(ACTIVE_THEME.primary.rgb.b),
              "--sr": String(ACTIVE_THEME.primary.rgb.r), "--sg": String(ACTIVE_THEME.primary.rgb.g), "--sb": String(ACTIVE_THEME.primary.rgb.b),
              "--er": String(ACTIVE_THEME.primary.rgb.r), "--eg": String(ACTIVE_THEME.primary.rgb.g), "--eb": String(ACTIVE_THEME.primary.rgb.b),
              "--base-angle": "320deg"
            } as React.CSSProperties}
          >
            <ContactGlowBlobs rgb={PRIMARY_RGB} />
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
      </div>
    </>
  );
};

export default HomePage;
