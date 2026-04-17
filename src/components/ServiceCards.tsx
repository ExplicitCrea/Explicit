import { useState } from "react";
import "./ServiceCards.css";
import ScrollReveal from "./ScrollReveal";

// ─────────────────────────────────────────────────────────────────────────────
// Icons
// ─────────────────────────────────────────────────────────────────────────────
const YoutubeIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="service-icon-svg" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" />
    <polygon points="10,8 16,12 10,16" fill="currentColor" />
  </svg>
);
const CinematicIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="service-icon-svg" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 3L21 8.5V15.5L12 21L3 15.5V8.5L12 3Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    <path d="M12 3V21M3 8.5L21 15.5M21 8.5L3 15.5" stroke="currentColor" strokeWidth="1.5" />
  </svg>
);
const ProductionIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="service-icon-svg" xmlns="http://www.w3.org/2000/svg">
    <rect x="2" y="6" width="20" height="14" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
    <path d="M7 6V4a1 1 0 011-1h8a1 1 0 011 1v2" stroke="currentColor" strokeWidth="1.5" />
    <circle cx="8" cy="13" r="2" stroke="currentColor" strokeWidth="1.5" />
    <path d="M14 11h4M14 15h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);
const SoundIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="service-icon-svg" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" strokeWidth="2">
    <path d="M12 1v22M17 5v14M7 5v14M22 9v6M2 9v6" />
  </svg>
);
const MotionIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="service-icon-svg" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" strokeWidth="2">
    <path d="m12 19 9-7-9-7-9 7 9 7z" /><path d="m3 12 9 7 9-7" /><path d="M3 16l9 7 9-7" />
  </svg>
);
const ThumbnailIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="service-icon-svg" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" /><circle cx="8.5" cy="8.5" r="1.5" /><path d="m21 15-5-5L5 21" />
  </svg>
);
const ModelIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="service-icon-svg" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" strokeWidth="2">
    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
    <polyline points="3.27 6.96 12 12.01 20.73 6.96" /><line x1="12" y1="22.08" x2="12" y2="12" />
  </svg>
);
const IllustrationIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="service-icon-svg" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" strokeWidth="2">
    <path d="M12 19l7-7 3 3-7 7-3-3z" /><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" />
    <path d="M2 2l5 5" /><path d="m9.5 9.5 5 5" />
  </svg>
);
const GraphicIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="service-icon-svg" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" strokeWidth="2">
    <path d="M12 20h9" /><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
  </svg>
);

// ─────────────────────────────────────────────────────────────────────────────
// Color helpers
// ─────────────────────────────────────────────────────────────────────────────
function lerp(a: number, b: number, t: number) {
  return Math.round(a + (b - a) * Math.min(Math.max(t, 0), 1));
}

function lerpColor(t: number) {
  const adjustedT = Math.pow(t, 1.5);
  return {
    r: lerp(176, 76,  adjustedT),
    g: lerp(96,  255, adjustedT),
    b: lerp(255, 143, adjustedT),
  };
}

const COLS = 3;

function cardGradientTs(index: number, total: number) {
  const rows   = Math.ceil(total / COLS);
  const row    = Math.floor(index / COLS);
  const col    = index % COLS;
  const maxDiag = (rows - 1) + (COLS - 1);
  const tStart  = (row + col)             / maxDiag;
  const tEnd    = (row + 1 + col + 1)     / maxDiag;
  return { tStart, tEnd };
}

// ─────────────────────────────────────────────────────────────────────────────
// Data
// ─────────────────────────────────────────────────────────────────────────────
interface Service { id: number; icon: React.ReactNode; title: string; subtitle?: string; description: string; }

const services: Service[] = [
  { id: 1, icon: <YoutubeIcon />,      title: "MONTAGE",      subtitle: "YOUTUBE",         description: "Un montage à fort impact pour une rétention d'audience maximale." },
  { id: 2, icon: <CinematicIcon />,    title: "SCÈNES",       subtitle: "CINÉMATIQUES 3D", description: "Des visuels 3D époustouflants pour rendre vos vidéos virales." },
  { id: 3, icon: <ProductionIcon />,   title: "PRODUCTION",   subtitle: "VIDÉO COMPLÈTE",  description: "Du concept au rendu final. Une prise en charge de A à Z." },
  { id: 4, icon: <SoundIcon />,        title: "SOUND",        subtitle: "DESIGN",          description: "Ajoutez de la profondeur et de l'impact à vos contenus." },
  { id: 5, icon: <MotionIcon />,       title: "MOTION",       subtitle: "DESIGN",          description: "Donnez vie à vos idées avec des animations impactantes." },
  { id: 6, icon: <ThumbnailIcon />,    title: "VIGNETTE",     subtitle: "YOUTUBE",         description: "Miniatures optimisées pour maximiser le clic." },
  { id: 7, icon: <ModelIcon />,        title: "MODÉLISATION", subtitle: "3D",              description: "Des assets propres, exploitables et adaptés à vos besoins." },
  { id: 8, icon: <IllustrationIcon />, title: "ILLUSTRATION", subtitle: "SUR-MESURE",      description: "Un style visuel unique pour renforcer votre identité." },
  { id: 9, icon: <GraphicIcon />,      title: "DESIGN",       subtitle: "GRAPHIQUE",       description: "Création d'identités visuelles et supports graphiques." },
];

// ─────────────────────────────────────────────────────────────────────────────
// Smoky Blobs
// ─────────────────────────────────────────────────────────────────────────────
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

function GlowBlobs({ startRgb, endRgb }: { startRgb: string; endRgb: string }) {
  const blobs = useRandomBlobs(3);
  const colors = [startRgb, endRgb, startRgb];
  return (
    <>
      {blobs.map((blob, i) => (
        <div key={i} style={{
          position: "absolute",
          top: blob.top, left: blob.left,
          width: blob.width, height: blob.height,
          borderRadius: blob.borderRadius,
          transform: blob.transform,
          background: `rgb(${colors[i]})`,
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

export default function ServiceCards() {
  const [hovered, setHovered] = useState<number | null>(null);
  const [showAll, setShowAll] = useState(false);

  return (
    <section className="services-section" id="services">
      <p className="services-label">NOS SERVICES</p>

      <div className="cards-wrapper">
        {services.map((service, index) => {
          const { tStart, tEnd } = cardGradientTs(index, services.length);
          const cStart    = lerpColor(tStart);
          const cEnd      = lerpColor(tEnd);
          const startRgb  = `${cStart.r}, ${cStart.g}, ${cStart.b}`;
          const endRgb    = `${cEnd.r}, ${cEnd.g}, ${cEnd.b}`;
          const cMid      = lerpColor((tStart + tEnd) / 2);
          const isHovered = hovered === service.id;
          
          const isExtra = index >= 3;
          const isHidden = isExtra && !showAll;

          const cardStyle = {
            "--sr": cStart.r, "--sg": cStart.g, "--sb": cStart.b,
            "--er": cEnd.r,   "--eg": cEnd.g,   "--eb": cEnd.b,
            "--mr": cMid.r,   "--mg": cMid.g,   "--mb": cMid.b,
            "--base-angle": `${index * 40}deg`, // For asymmetric border randomness
            "--rotate-speed": `${15 + (index % 3) * 5}s`
          } as React.CSSProperties;

          return (
            <div key={service.id} className={`card-anim-wrapper ${isHidden ? "extra-card--hidden" : ""}`}>
              <ScrollReveal 
                delay={(index % 3) * 100}
              >
                <div
                  className={`service-card-item${isHovered ? " service-card-item--hovered" : ""}`}
                  style={cardStyle}
                  onMouseEnter={() => setHovered(service.id)}
                  onMouseLeave={() => setHovered(null)}
                >
                  <div className="card-internal-content">
                    <GlowBlobs startRgb={startRgb} endRgb={endRgb} />

                    <div className="card-header">
                      <div className="icon-wrapper">
                        {service.icon}
                      </div>
                      <div className="card-title-block">
                        <h3 className="card-title">{service.title}</h3>
                        {service.subtitle && <h3 className="card-title">{service.subtitle}</h3>}
                      </div>
                    </div>

                    <p className="card-description">{service.description}</p>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          );
        })}
      </div>

      <button 
        className="learn-more-btn interactive" 
        onClick={() => setShowAll(!showAll)}
      >
        <span>{showAll ? "VOIR MOINS" : "EN SAVOIR PLUS"}</span>
      </button>
    </section>
  );
}
