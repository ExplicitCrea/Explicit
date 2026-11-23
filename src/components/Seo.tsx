import React, { useEffect } from 'react';

const SITE_URL = 'https://www.explicitcrea.com';
const SITE_NAME = 'Explicit Crea';
const DEFAULT_IMAGE = `${SITE_URL}/og-preview.jpg`;

export interface SeoProps {
  title: string;
  description: string;
  path: string;
  /** H1 lisible par les moteurs et lecteurs d'écran (masqué visuellement) */
  h1?: string;
  noindex?: boolean;
  image?: string;
}

/** Met à jour (ou crée) une balise du <head> sans créer de doublon avec index.html */
function upsert(selector: string, create: () => HTMLElement, attr: string, value: string) {
  let el = document.head.querySelector<HTMLElement>(selector);
  if (!el) {
    el = create();
    document.head.appendChild(el);
  }
  el.setAttribute(attr, value);
}

const meta = (key: 'name' | 'property', id: string, content: string) =>
  upsert(`meta[${key}="${id}"]`, () => {
    const m = document.createElement('meta');
    m.setAttribute(key, id);
    return m;
  }, 'content', content);

const Seo: React.FC<SeoProps> = ({ title, description, path, h1, noindex, image = DEFAULT_IMAGE }) => {
  useEffect(() => {
    const url = `${SITE_URL}${path === '/' ? '' : path}`;
    const fullTitle = title.includes(SITE_NAME) ? title : `${title} | ${SITE_NAME}`;
    document.title = fullTitle;
    meta('name', 'description', description);
    meta('name', 'robots', noindex ? 'noindex, follow' : 'index, follow, max-image-preview:large');
    meta('property', 'og:title', fullTitle);
    meta('property', 'og:description', description);
    meta('property', 'og:url', url);
    meta('property', 'og:image', image);
    meta('name', 'twitter:title', fullTitle);
    meta('name', 'twitter:description', description);
    meta('name', 'twitter:image', image);
    upsert('link[rel="canonical"]', () => {
      const l = document.createElement('link');
      l.setAttribute('rel', 'canonical');
      return l;
    }, 'href', url);
  }, [title, description, path, noindex, image]);

  return h1 ? <h1 className="sr-only">{h1}</h1> : null;
};

export default Seo;
