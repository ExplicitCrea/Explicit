import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import CustomCursor from './components/CustomCursor';
import ScrollToTop from './components/ScrollToTop';
import Footer from './components/Footer';
import Seo from './components/Seo';

// Pages
import HomePage from './pages/Home/HomePage';
import WhoUsPage from './pages/WhoUs/WhoUsPage';
import AidePage from './pages/Help/AidePage';
import MentionsPage from './pages/Legal/MentionsPage';
import SnakePage from './pages/Snake/SnakePage';

import { ACTIVE_THEME, ACTIVE_LOGO, applyThemeToDom } from './config/themes';

const App: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [startExit, setStartExit] = useState(false);
  const [isFairyEnabled, setIsFairyEnabled] = useState(false);
  const [gridOffset, setGridOffset] = useState(0);

  // Initialisation du thème actif
  useEffect(() => {
    applyThemeToDom(ACTIVE_THEME);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY || window.pageYOffset || document.documentElement.scrollTop;
      setGridOffset(scrollPos * 0.15);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    let isMounted = true;
    let finished = false;

    const handleLoad = () => {
      if (finished || !isMounted) return;
      finished = true;
      setStartExit(true);
      setTimeout(() => {
        if (isMounted) setLoading(false);
      }, 800);
    };

    // On n'attend plus la vidéo complète (jusqu'à 10 s auparavant) : le loader
    // disparaît dès que la page est prête, avec un plafond court pour le LCP / SEO.
    const minTimer = setTimeout(() => {
      if (document.readyState === 'complete') handleLoad();
      else window.addEventListener('load', handleLoad, { once: true });
    }, 600);
    const safetyTimer = setTimeout(handleLoad, 2500);

    return () => {
      isMounted = false;
      window.removeEventListener('load', handleLoad);
      clearTimeout(minTimer);
      clearTimeout(safetyTimer);
    };
  }, []);

  const triggerFairyDust = () => {
    setIsFairyEnabled(!isFairyEnabled);
  };

  if (loading) {
    return (
      <div className={`loader-container ${startExit ? 'loader--exit' : ''}`}>
        <div className="loader-content">
          <img src={ACTIVE_LOGO} alt="EXPLICIT CREA" className="loader-logo-pre" />
          <div className="loader-bar-container">
            <div className={`loader-bar-fill ${startExit ? 'loader-bar-fill--full' : ''}`}></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <BrowserRouter>
      <div className="app-container">
        <CustomCursor isFairyEnabled={isFairyEnabled} />
        <ScrollToTop />
        <div className="parallax-grid" style={{ transform: `translateY(${-gridOffset % 80}px)` }} />
        
        <Routes>
          <Route path="/" element={<>
            <Seo
              path="/"
              title="Explicit Crea | Agence de création audiovisuelle : montage, motion design, 3D"
              description="Explicit Crea, agence de création audiovisuelle : montage vidéo, motion design, 3D, VFX, branding et sound design pour marques, créateurs et événements."
              h1="Explicit Crea, agence de création audiovisuelle"
            />
            <HomePage />
          </>} />
          <Route path="/qui-sommes-nous" element={<>
            <Seo
              path="/qui-sommes-nous"
              title="Qui sommes-nous ? L'équipe Explicit Crea"
              description="Découvrez l'équipe d'Explicit Crea : des artistes passionnés en montage, motion design, 3D et sound design au service de vos projets audiovisuels."
              h1="Qui sommes-nous ? L'équipe Explicit Crea"
            />
            <WhoUsPage />
          </>} />
          <Route path="/aide" element={<>
            <Seo
              path="/aide"
              title="FAQ : questions fréquentes"
              description="Délais, tarifs, déroulement d'un projet : toutes les réponses aux questions fréquentes sur les prestations audiovisuelles d'Explicit Crea."
              h1="Aide et questions fréquentes"
            />
            <AidePage />
          </>} />
          <Route path="/mentions-legales" element={<>
            <Seo
              path="/mentions-legales"
              title="Mentions légales"
              description="Mentions légales du site explicitcrea.com, édité par Explicit Crea."
              h1="Mentions légales"
            />
            <MentionsPage />
          </>} />
          <Route path="/snake" element={<>
            <Seo path="/snake" title="Snake" description="Mini-jeu Snake d'Explicit Crea." noindex />
            <SnakePage />
          </>} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>

        <Footer triggerFairyDust={triggerFairyDust} />
      </div>
    </BrowserRouter>
  );
};

export default App;
