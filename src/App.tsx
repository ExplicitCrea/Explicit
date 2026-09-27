import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import CustomCursor from './components/CustomCursor';
import ScrollToTop from './components/ScrollToTop';
import Footer from './components/Footer';

// Pages
import HomePage from './pages/Home/HomePage';
import WhoUsPage from './pages/WhoUs/WhoUsPage';
import AidePage from './pages/Help/AidePage';
import MentionsPage from './pages/Legal/MentionsPage';
import SnakePage from './pages/Snake/SnakePage';

import { ACTIVE_THEME, ACTIVE_LOGO, applyThemeToDom } from './config/themes';
import portfolioVideoWebm from '../assets/Showreel2.webm';

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

    // Préchargement de la vidéo Showreel
    const video = document.createElement('video');
    video.src = portfolioVideoWebm;
    video.preload = 'auto';

    // Déclenché quand le navigateur a assez de données pour lire la vidéo d'un bout à l'autre sans interruption
    video.addEventListener('canplaythrough', handleLoad, { once: true });
    video.addEventListener('error', handleLoad, { once: true });
    video.load();

    if (video.readyState >= 4) {
      handleLoad();
    }

    // Sécurité de 10s maximum en cas de coupure réseau
    const safetyTimer = setTimeout(handleLoad, 10000);

    return () => {
      isMounted = false;
      video.removeEventListener('canplaythrough', handleLoad);
      video.removeEventListener('error', handleLoad);
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
          <Route path="/" element={<HomePage />} />
          <Route path="/qui-sommes-nous" element={<WhoUsPage />} />
          <Route path="/aide" element={<AidePage />} />
          <Route path="/mentions-legales" element={<MentionsPage />} />
          <Route path="/snake" element={<SnakePage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>

        <Footer triggerFairyDust={triggerFairyDust} />
      </div>
    </BrowserRouter>
  );
};

export default App;
