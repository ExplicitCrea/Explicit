import React from 'react';
import { useNavigate } from 'react-router-dom';
import ScrollReveal from '../../components/ScrollReveal';

export const MentionsPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="sub-page main-content">
      <section className="section sub-page-content" style={{ paddingTop: '120px' }}>
        <ScrollReveal>
          <button 
            className="secondary-button interactive" 
            onClick={() => navigate('/')}
            style={{ marginBottom: '40px', display: 'flex', alignItems: 'center', gap: '10px' }}
          >
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="m15 18-6-6 6-6"/>
            </svg>
            Retour à l'accueil
          </button>
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
              <p style={{ color: 'var(--text-secondary)', marginBottom: '5px' }}>Contact : <a href="mailto:contact@explicitcrea.com" style={{ color: '#fff' }}>contact@explicitcrea.com</a> / NotTrueFalse ou Tarkorr sur Github</p>
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

export default MentionsPage;
