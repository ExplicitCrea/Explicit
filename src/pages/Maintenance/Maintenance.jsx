import './Maintenance.css';

export const Maintenance = () => {
    const currentYear = new Date().getFullYear();

    return (
        <main className="maintenance-page" role="main" aria-labelledby="maintenance-title">
            <div className="maintenance-glow maintenance-glow-left" aria-hidden="true" />
            <div className="maintenance-glow maintenance-glow-right" aria-hidden="true" />

            <section className="maintenance-card">
                <p className="maintenance-badge">
                    <span className="maintenance-dot" aria-hidden="true" />
                    Maintenance planifiee
                </p>

                <h1 id="maintenance-title">Explicit se refait une beaute.</h1>
                <p className="maintenance-copy">
                    Nous peaufinons quelques details pour vous offrir une meilleure experience. Le site sera de retour tres bientot.
                </p>

                <div className="maintenance-meta">
                    <p>Retour prevu : tres bientot</p>
                    <p>
                        Besoin de nous joindre en urgence ?{' '}
                        <a href="mailto:contact@explicitcrea.com">contact@explicitcrea.com</a>
                    </p>
                </div>
            </section>

            <footer className="maintenance-footer">© {currentYear} ExplicitCrea</footer>
        </main>
    );
};
