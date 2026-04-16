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

import videoCollab1 from '../assets/video_portfolio.webm'
import videoCollab2 from '../assets/video_portfolio.webm'
import videoCollab3 from '../assets/video_portfolio.webm'
import videoCollab4 from '../assets/video_portfolio.webm'
import videoCollab5 from '../assets/video_portfolio.webm'

const collaborators = [
  { id: 1, img: colab1, video: videoCollab1, name: "Collaborateur 1", desc: "Réalisation graphique et accompagnement en motion design" },
  { id: 2, img: colab2, video: videoCollab2, name: "Collaborateur 2", desc: "Production 3D et montage vidéo" },
  { id: 3, img: colab3, video: videoCollab3, name: "Collaborateur 3", desc: "Production visuelle 3D, FX et simulations de présentation" },
  { id: 4, img: colab4, video: videoCollab4, name: "Collaborateur 4", desc: "Réalisation complète : montage, 3D, motion design et sound design" },
  { id: 5, img: colab5, video: videoCollab5, name: "Collaborateur 5", desc: "Accompagnement VFX, création graphique et simulations" }
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
  const [currentPage, setCurrentPage] = useState<'home' | 'aide' | 'mentions'>('home');
  const [currentColab, setCurrentColab] = useState(0);
  const [direction, setDirection] = useState<'next' | 'prev' | 'in-next' | 'in-prev' | null>(null);
  const [activeColor, setActiveColor] = useState("176, 96, 255");
  const [isNavStashed, setIsNavStashed] = useState(false);

  const [gridOffset, setGridOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY || window.pageYOffset || document.documentElement.scrollTop;
      
      // Update grid parallax
      setGridOffset(scrollPos * 0.15);
      
      // Update Nav Stashed state
      setIsNavStashed(scrollPos > 10);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
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

  const [startExit, setStartExit] = useState(false);

  useEffect(() => {
    const handleLoad = () => {
      setStartExit(true);
      // On attend la fin de l'animation de la barre avant de cacher le loader
      setTimeout(() => setLoading(false), 800);
    };

    if (document.readyState === 'complete') {
      setTimeout(handleLoad, 100);
    } else {
      window.addEventListener('load', handleLoad);
      const safetyTimer = setTimeout(handleLoad, 5000);
      return () => {
        window.removeEventListener('load', handleLoad);
        clearTimeout(safetyTimer);
      };
    }
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
      <div className={`loader-container ${startExit ? 'loader--exit' : ''}`}>
        <div className="loader-content">
          <img src={logo} alt="EXPLICIT CREA" className="loader-logo-pre" />
          <div className="loader-bar-container">
            <div className={`loader-bar-fill ${startExit ? 'loader-bar-fill--full' : ''}`}></div>
          </div>
        </div>
      </div>
    );
  }

  const PURPLE_RGB = "176, 96, 255";
  const GREEN_RGB = "76, 255, 143";

  const navigateTo = (page: 'home' | 'aide' | 'mentions') => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
    setIsNavStashed(false);
  };

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    setIsNavStashed(true);
    const element = document.getElementById(id);
    if (element) {
      const offset = 100; // Offset for the fixed header
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

  return (
    <div className="app-container">
      <div className="parallax-grid" style={{ transform: `translateY(${-gridOffset % 80}px)` }} />
      
      {/* Consolidated Navigation Header */}
      <nav className={`nav-header ${currentPage !== 'home' ? 'sub-nav' : (isNavStashed ? 'stashed' : '')}`}>
        <div className="nav-links">
          {currentPage === 'home' ? (
            <>
              <a href="#services" className="nav-link" onClick={(e) => scrollToSection(e, 'services')}>Service</a>
              <a href="#contact"  className="nav-link" onClick={(e) => scrollToSection(e, 'contact')}>Contact</a>
              <a href="#projects" className="nav-link" onClick={(e) => scrollToSection(e, 'projects')}>Création</a>
            </>
          ) : (
            <button onClick={() => navigateTo('home')} className="nav-link back-btn interactive" style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <svg viewBox="24 24 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2"><path d="m15 18-6-6 6-6"/></svg>
              Retour
            </button>
          )}
        </div>
      </nav>

      {currentPage === 'home' ? (
        <div className="main-content">
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
              <a href="https://www.youtube.com/watch?v=erT9IivBlKA" target="_blank" rel="noopener noreferrer" className="project-link"> {/* Lien de la vidéo */}
                <div className="card glass project-card interactive">
                  <div className="project-image-container">
                    <img src={legrandjd} alt="Le Grand JD" /> {/* Origine de l'image cf début du code */}
                  </div>
                  <div className="project-info">
                    <h3>MICHAEL JACKSON EST TOUJOURS EN VIE</h3> {/* Titre de la vidéo */}
                    <div className="project-author">
                      <span className="dot red-dot"></span>
                      <span className="author-name">LE GRAND JD</span> {/* Auteur */}
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
                  src={collaborators[currentColab].video}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="colab-bg-video"
                />
                <div className="colab-text-overlay">
                  <p>{collaborators[currentColab].desc}</p>
                </div>
              </div>            </div>
            
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
        </div>
      ) : currentPage === 'aide' ? (
        <AidePage navigateTo={navigateTo} />
      ) : (
        <MentionsPage navigateTo={navigateTo} />
      )}

      {/* Footer is now persistent and correctly linked */}
      <footer className="footer" style={{ position: 'relative', zIndex: 3 }}>
        <div className="footer-content">
          <div className="footer-logo" onClick={() => navigateTo('home')} style={{ cursor: 'pointer' }}>
            <img src={logo} alt="EXPLICIT CREA" className="footer-logo-img" />
          </div>
          <div className="footer-copyright">
            <p>&copy; Explicit Créa. Tous droits réservés.</p>
          </div>
          <div className="footer-links">
            <a href="#services" className="footer-link" onClick={(e) => { e.preventDefault(); navigateTo('home'); setTimeout(() => {
              const el = document.getElementById('services');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }, 100); }}>Services</a>
            <a href="#aide" className="footer-link" onClick={(e) => { e.preventDefault(); navigateTo('aide'); }}>Aide</a>
            <a href="#mentions" className="footer-link" onClick={(e) => { e.preventDefault(); navigateTo('mentions'); }}>Mentions légales</a>
            <a href="https://facture.explicitcrea.com/" className="footer-link">Factures</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

const AidePage = ({ navigateTo }: { navigateTo: (page: 'home' | 'aide' | 'mentions') => void }) => {
  const faqItems = [
    {
      q: "Quels sont vos services ?",
      a: "Nous nous sommes spécialisés dans la création et la réalisation visuelle ! Nous opérons donc dans un secteur large de l'audiovisuel que vous pouvez consulter dans la catégorie \"Services\"."
    },
    {
      q: "Comment ça marche ?",
      a: "Vous avez besoin d’un service en particulier ? Prenez contact avec nous via l'onglet \"Contact\" et nous nous ferons un plaisir de vous guider en vous conseillant sur les bonnes démarches et sur la faisabilité de votre projet."
    },
    {
      q: "Quels sont les Délais ?",
      a: "Pour la prise de contact personnalisée, après la réception de votre demande, il faut compter moins de 24 heures avant un premier retour de nos équipes."
    },
    {
      q: "Comment faire pour vous contacter ?",
      a: "Le meilleur moyen pour nous contacter est par e-mail : contact@explicitcrea.com ou directement depuis l'onglet 'Contact'. Si vous avez une question plus précise, vous pouvez nous l'adresser directement à notre adresse e-mail : contact@explicitcrea.com"
    },
    {
      q: "Comment se déroule le processus de collaboration avec votre équipe ?",
      a: "Notre processus de collaboration est conçu pour garantir une expérience fluide et professionnelle du début à la fin. Tout commence par une consultation initiale où nous discutons de vos objectifs, idées et exigences spécifiques. À partir de là, notre équipe travaille en étroite collaboration avec la vôtre pour développer une vision claire du projet. Nous vous impliquons à chaque étape, du développement à la conception visuelle. Nous valorisons votre feedback tout au long du processus pour nous assurer que le produit final reflète pleinement votre vision. Notre objectif est de créer une collaboration transparente où la communication est constante, les idées sont partagées et la créativité est encouragée. Chaque projet étant unique, notre équipe s'engage à fournir une expérience de collaboration personnalisée pour assurer la réussite de votre projet audiovisuel."
    },
    {
      q: "Recrutez-vous ?",
      a: "Nous sommes ouverts aux profils créatifs ! Si vous êtes un professionnel dans un domaine que nous couvrons et que vous souhaitez collaborer avec nous, vous pouvez nous contacter par e-mail, en joignant des exemples de vos créations."
    },
    {
      q: "Pourquoi choisir notre agence créative plutôt qu’un prestataire unique ?",
      a: (
        <>
          <p style={{ marginBottom: '10px' }}>En faisant appel à notre agence créative, vous bénéficiez de l'expertise pluridisciplinaire de notre équipe. Nous regroupons des talents variés dans les domaines de la production audiovisuelle, ce qui vous assure une approche complète et des solutions intégrées.</p>
          <p style={{ marginBottom: '10px' }}>Notre modèle favorise la créativité collaborative. En travaillant avec notre agence, votre projet bénéficie de l'apport créatif de plusieurs professionnels issus de différents horizons, ce qui peut donner naissance à des idées novatrices et originales.</p>
          <p style={{ marginBottom: '10px' }}>Plutôt que de coordonner plusieurs prestataires indépendants, notre agence prend en charge la gestion complète du projet. Cela simplifie le processus pour vous, vous permettant de vous concentrer sur d'autres aspects de votre activité.</p>
          <p style={{ marginBottom: '10px' }}>Travailler avec une agence créative garantit une cohérence de la marque. Les différents éléments de votre projet audiovisuel sont développés sous une vision globale, assurant une identité visuelle et narrative uniforme.</p>
          <p style={{ marginBottom: '10px' }}>En choisissant notre agence, vous pouvez bénéficier d'économies d'échelle. Nous proposons une gamme complète de services, ce qui peut se traduire par des coûts globaux inférieurs par rapport à l'embauche de plusieurs prestataires indépendants.</p>
        </>
      )
    },
    {
      q: "Comment fonctionne le processus de tarification pour vos services ?",
      a: "Afin d’établir un tarif, il est nécessaire que nous obtenions un maximum d'informations concernant votre projet. Prenez contact avec nous afin que nous établissions un devis ensemble."
    }
  ];

  return (
    <div className="sub-page main-content">
      <section className="section sub-page-content" style={{ paddingTop: '120px' }}>
        <ScrollReveal>
          <div className="section-header">
            <span className="section-subtitle">Aide & FAQ</span>
            <h2 className="section-main-title">Questions Fréquentes</h2>
          </div>
        </ScrollReveal>
        
        <div className="faq-container" style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {faqItems.map((item, idx) => (
            <ScrollReveal key={idx} delay={idx * 50}>
              <div className="faq-item card glass" style={{ padding: '30px', textAlign: 'left' }}>
                <h3 style={{ color: '#fff', marginBottom: '15px' }}>{item.q}</h3>
                <div className="faq-answer" style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                  {typeof item.a === 'string' ? <p>{item.a}</p> : item.a}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>
    </div>
  );
};

const MentionsPage = ({ navigateTo }: { navigateTo: (page: 'home' | 'aide' | 'mentions') => void }) => {
  return (
    <div className="sub-page main-content">
      <section className="section sub-page-content" style={{ paddingTop: '120px' }}>
        <ScrollReveal>
          <div className="section-header">
            <span className="section-subtitle">Mentions Légales</span>
            <h2 className="section-main-title">Informations Légales</h2>
          </div>
        </ScrollReveal>
        
        <div className="legal-container" style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <ScrollReveal delay={100}>
            <div className="legal-section card glass" style={{ padding: '30px', textAlign: 'left' }}>
              <h3 style={{ color: '#fff', marginBottom: '15px' }}>1. Éditeur du site</h3>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '5px' }}>Le site <strong>explicitcrea.com</strong> est édité par Explicit Créa.</p>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '5px' }}>Contact : <a href="mailto:contact@explicitcrea.com" style={{ color: '#fff' }}>contact@explicitcrea.com</a></p>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '5px' }}>Instagram : <a href="https://instagram.com/explicit.crea" target="_blank" rel="noreferrer" style={{ color: '#fff' }}>@explicit.crea</a></p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <div className="legal-section card glass" style={{ padding: '30px', textAlign: 'left' }}>
              <h3 style={{ color: '#fff', marginBottom: '15px' }}>2. Hébergement</h3>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '5px' }}>Le site est hébergé par Vercel Inc.</p>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '5px' }}>Adresse : 340 S Lemon Ave #4133, Walnut, CA 91789, USA</p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={300}>
            <div className="legal-section card glass" style={{ padding: '30px', textAlign: 'left' }}>
              <h3 style={{ color: '#fff', marginBottom: '15px' }}>3. Propriété intellectuelle</h3>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '10px', lineHeight: '1.6' }}>L'ensemble de ce site relève de la législation française et internationale sur le droit d'auteur et la propriété intellectuelle. Tous les droits de reproduction sont réservés, y compris pour les documents téléchargeables et les représentations iconographiques et photographiques.</p>
              <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>La reproduction de tout ou partie de ce site sur quelque support que ce soit est formellement interdite sauf autorisation expresse de l'éditeur.</p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={400}>
            <div className="legal-section card glass" style={{ padding: '30px', textAlign: 'left' }}>
              <h3 style={{ color: '#fff', marginBottom: '15px' }}>4. Données personnelles</h3>
              <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>Conformément à la loi « Informatique et Libertés » et au RGPD, vous disposez d'un droit d'accès, de rectification et de suppression des données vous concernant. Pour exercer ce droit, vous pouvez nous contacter par email.</p>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
};

export default App;