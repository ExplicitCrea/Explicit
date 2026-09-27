import React from 'react';
import { useNavigate } from 'react-router-dom';
import ScrollReveal from '../../components/ScrollReveal';

export const WhoUsPage: React.FC = () => {
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
            <span className="section-subtitle">À propos</span>
            <h2 className="section-main-title">Qui sommes-nous ?</h2>
          </div>
        </ScrollReveal>
        
        <div className="about-container" style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '40px' }}>
          <ScrollReveal delay={100}>
            <div className="about-card card glass" style={{ padding: '40px', textAlign: 'left' }}>
              <p style={{ color: '#fff', fontSize: '1.2rem', lineHeight: '1.6', marginBottom: '20px', fontWeight: '500' }}>
                Explicit Crea est une agence créative spécialisée en production vidéo, création 3D et motion design !
              </p>
              <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6', fontSize: '1.1rem' }}>
                Nous accompagnons des créateurs de contenu, des marques et des agences dans la réalisation de leurs projets, de l’idée initiale jusqu’au rendu final.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <div className="about-card card glass" style={{ padding: '40px', textAlign: 'left' }}>
              <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6', fontSize: '1.1rem', marginBottom: '0' }}>
                Aujourd’hui, Explicit Crea, c’est une équipe de 7 artistes qui collaborent à plein temps sur les projets. Selon les besoins, nous nous entourons également d’un réseau de plus de 30 talents (monteurs vidéo, motion designers, artistes 3D, graphistes, illustrateurs…) pour aller plus loin et adapter chaque production :)
              </p>
            </div>
          </ScrollReveal>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }} className="about-grid">
            <ScrollReveal delay={300}>
              <div className="about-card card glass" style={{ padding: '30px', textAlign: 'left', height: '100%' }}>
                <h3 style={{ color: '#fff', marginBottom: '20px', fontSize: '1.3rem' }}>Nous intervenons sur :</h3>
                <ul style={{ color: 'var(--text-secondary)', lineHeight: '2', fontSize: '1.05rem', listStyle: 'none', padding: 0 }}>
                  <li>• Le montage vidéo</li>
                  <li>• La création de scènes 3D</li>
                  <li>• La production vidéo complète</li>
                  <li>• Le motion design et l’animation</li>
                  <li>• La création visuelle et le branding</li>
                </ul>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={400}>
              <div className="about-card card glass" style={{ padding: '30px', textAlign: 'left', height: '100%' }}>
                <h3 style={{ color: '#fff', marginBottom: '20px', fontSize: '1.3rem' }}>Notre approche :</h3>
                <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6', marginBottom: '20px' }}>
                  Chaque projet est pensé avec une approche structurée, mais flexible. Nous accordons une attention particulière à :
                </p>
                <ul style={{ color: 'var(--text-secondary)', lineHeight: '2', fontSize: '1.05rem', listStyle: 'none', padding: 0 }}>
                  <li>• La compréhension des besoins</li>
                  <li>• La qualité visuelle</li>
                  <li>• L’efficacité des contenus</li>
                </ul>
              </div>
            </ScrollReveal>
          </div>

          <ScrollReveal delay={500}>
            <div className="about-card card glass" style={{ padding: '40px', textAlign: 'center' }}>
              <p style={{ color: '#fff', fontSize: '1.1rem', lineHeight: '1.6', fontWeight: '500', margin: 0 }}>
                Notre objectif est simple : proposer des solutions créatives pertinentes, adaptées aux enjeux de visibilité et de performance de chaque projet.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
};

export default WhoUsPage;
