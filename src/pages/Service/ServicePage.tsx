import React from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import ScrollReveal from '../../components/ScrollReveal';
import Seo from '../../components/Seo';
import services from '../../data/services.json';
import projects from '../../data/projects.json';

const ServicePage: React.FC = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const service = services.find((s) => s.slug === slug);

  if (!service) {
    return (
      <>
        <Seo path={`/services/${slug ?? ''}`} title="Page introuvable" description="Ce service n'existe pas." noindex />
        <main style={{ minHeight: '60vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '24px', padding: '120px 24px', textAlign: 'center' }}>
          <h1 style={{ margin: 0 }}>Service introuvable</h1>
          <Link to="/" style={{ color: '#fff' }}>Retour à l'accueil</Link>
        </main>
      </>
    );
  }

  const related = projects.filter((p) => service.projects.includes(p.id));
  const others = services.filter((s) => s.slug !== service.slug);

  return (
    <div className="sub-page main-content">
      <Seo path={`/services/${service.slug}`} title={service.metaTitle} description={service.description} />
      <section className="section sub-page-content" style={{ paddingTop: '120px' }}>
        <ScrollReveal>
          <button
            className="secondary-button interactive"
            onClick={() => navigate('/')}
            style={{ marginBottom: '40px', display: 'flex', alignItems: 'center', gap: '10px' }}
          >
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="m15 18-6-6 6-6" />
            </svg>
            Retour à l'accueil
          </button>
          <div className="section-header">
            <span className="section-subtitle">Services</span>
            <h1 className="section-main-title">{service.h1}</h1>
          </div>
        </ScrollReveal>

        <div style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '30px' }}>
          <ScrollReveal delay={100}>
            <div className="card glass" style={{ padding: '40px', textAlign: 'left' }}>
              <p style={{ color: '#fff', fontSize: '1.15rem', lineHeight: '1.7', margin: 0 }}>{service.intro}</p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <div className="card glass" style={{ padding: '40px', textAlign: 'left' }}>
              <h2 style={{ color: '#fff', marginBottom: '20px', fontSize: '1.4rem' }}>Ce que nous proposons</h2>
              <ul style={{ color: 'var(--text-secondary)', lineHeight: '2', fontSize: '1.05rem', paddingLeft: '20px', margin: 0 }}>
                {service.includes.map((item) => <li key={item}>{item}</li>)}
              </ul>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={300}>
            <div className="card glass" style={{ padding: '40px', textAlign: 'left' }}>
              <h2 style={{ color: '#fff', marginBottom: '15px', fontSize: '1.4rem' }}>Pour qui ?</h2>
              <p style={{ color: 'var(--text-secondary)', lineHeight: '1.7', margin: 0 }}>{service.forWho}</p>
            </div>
          </ScrollReveal>

          {related.length > 0 && (
            <ScrollReveal delay={350}>
              <div className="card glass" style={{ padding: '40px', textAlign: 'left' }}>
                <h2 style={{ color: '#fff', marginBottom: '15px', fontSize: '1.4rem' }}>Quelques réalisations</h2>
                <ul style={{ color: 'var(--text-secondary)', lineHeight: '2', paddingLeft: '20px', margin: 0 }}>
                  {related.map((p) => (
                    <li key={p.id}>
                      <a href={p.url} target="_blank" rel="noopener noreferrer" style={{ color: '#fff' }}>{p.title}</a> ({p.client})
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>
          )}

          <ScrollReveal delay={400}>
            <div className="card glass" style={{ padding: '40px', textAlign: 'center' }}>
              <h2 style={{ color: '#fff', marginBottom: '15px', fontSize: '1.4rem' }}>Parlons de votre projet</h2>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '25px' }}>Premier retour de notre équipe en moins de 24 heures.</p>
              <div style={{ display: 'flex', gap: '15px', justifyContent: 'center', flexWrap: 'wrap' }}>
                <Link to="/#contact" className="primary-button interactive" style={{ padding: '14px 28px', borderRadius: '999px', background: '#fff', color: '#111', textDecoration: 'none', fontWeight: 600 }}>Demander un devis</Link>
                <a href="mailto:contact@explicitcrea.com" className="secondary-button interactive" style={{ padding: '14px 28px', textDecoration: 'none' }}>contact@explicitcrea.com</a>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={450}>
            <nav aria-label="Nos autres services" style={{ textAlign: 'center' }}>
              <h2 style={{ color: '#fff', marginBottom: '15px', fontSize: '1.2rem' }}>Nos autres services</h2>
              <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap' }}>
                {others.map((s) => (
                  <Link key={s.slug} to={`/services/${s.slug}`} className="secondary-button interactive" style={{ padding: '10px 18px', textDecoration: 'none' }}>
                    {s.name}
                  </Link>
                ))}
              </div>
            </nav>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
};

export default ServicePage;
