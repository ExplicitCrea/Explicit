import React from 'react';
import { Link } from 'react-router-dom';
import { ACTIVE_LOGO } from '../config/themes';

interface FooterProps {
  triggerFairyDust: () => void;
}

export const Footer: React.FC<FooterProps> = ({ triggerFairyDust }) => {
  return (
    <footer className="footer" style={{ position: 'relative', zIndex: 3 }}>
      <div className="footer-content">
        <div className="footer-logo">
          <Link to="/">
            <img src={ACTIVE_LOGO} alt="EXPLICIT CREA" className="footer-logo-img" />
          </Link>
        </div>
        <div className="footer-copyright">
          <p>&copy; Explicit Créa. Tous droits réservés.</p>
        </div>
        <div className="footer-links">
          <Link to="/" className="footer-link">Services</Link>
          <Link to="/qui-sommes-nous" className="footer-link">Qui sommes nous ?</Link>
          <Link to="/aide" className="footer-link">Aide</Link>
          <Link to="/mentions-legales" className="footer-link">Mentions légales</Link>
          <a href="https://facture.explicitcrea.com/" className="footer-link" target="_blank" rel="noopener noreferrer">Factures</a>
        </div>
      </div>
      <div className="footer-actions-corner">
        <Link 
          to="/snake" 
          className="footer-corner-btn footer-snake-btn interactive"
          title="Jouer à Snake"
        >
          🐍
        </Link>
        <button 
          onClick={triggerFairyDust} 
          className="footer-corner-btn footer-stars-btn interactive"
          title="Fairy Dust"
        >
          ✨
        </button>
      </div>
    </footer>
  );
};

export default Footer;
