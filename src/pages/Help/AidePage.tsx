import React from 'react';
import { useNavigate } from 'react-router-dom';
import ScrollReveal from '../../components/ScrollReveal';

export const AidePage: React.FC = () => {
  const navigate = useNavigate();

  const faqItems = [
    {
      q: "Quels sont vos services ?",
      a: "Nous nous sommes spécialisés dans la création et la réalisation visuelle ! Nous opérons donc dans un secteur large de l'audiovisuel que vous pouvez consulter dans la catégorie \"Services\"."
    },
    {
      q: "Comment ça marche ?",
      a: "Vous avez besoin d'un service en particulier ? Prenez contact avec nous via l'onglet \"Contact\" et nous nous ferons un plaisir de vous guider en vous conseillant sur les bonnes démarches et sur la faisabilité de votre projet."
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
      q: "Pourquoi choisir notre agence créative plutôt qu'un prestataire unique ?",
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
      a: "Afin d'établir un tarif, il est nécessaire que nous obtenions un maximum d'informations concernant votre projet. Prenez contact avec nous afin que nous établissions un devis ensemble."
    }
  ];

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

export default AidePage;
