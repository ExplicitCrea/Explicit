// Pré-rendu SEO post-build : génère un HTML par route avec son <head> et un contenu
// texte réel, lisibles par Google et les réseaux sociaux sans exécuter le JavaScript.
// React remplace ce contenu au chargement (createRoot vide #root).
import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const DIST = 'dist';
const SITE = 'https://www.explicitcrea.com';
const template = readFileSync(join(DIST, 'index.html'), 'utf8');

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const SERVICES = [
  ['Montage YouTube', "Un montage à fort impact pour une rétention d'audience maximale."],
  ['Scènes cinématiques 3D', 'Des visuels 3D époustouflants pour rendre vos vidéos virales.'],
  ['Production vidéo complète', 'Du concept au rendu final, une prise en charge de A à Z.'],
  ['Sound design', "Ajoutez de la profondeur et de l'impact à vos contenus."],
  ['Motion design', 'Donnez vie à vos idées avec des animations impactantes.'],
  ['Vignettes YouTube', 'Miniatures optimisées pour maximiser le clic.'],
  ['Modélisation 3D', 'Des assets propres, exploitables et adaptés à vos besoins.'],
  ['Illustration sur-mesure', 'Un style visuel unique pour renforcer votre identité.'],
  ['Design graphique', "Création d'identités visuelles et supports graphiques."],
];

const FAQ = [
  ['Quels sont vos services ?', "Nous sommes spécialisés dans la création et la réalisation visuelle : montage vidéo, 3D, motion design, sound design, branding et production vidéo complète."],
  ['Comment ça marche ?', "Prenez contact avec nous via le formulaire de contact : nous vous guidons sur les bonnes démarches et la faisabilité de votre projet."],
  ['Quels sont les délais ?', "Après réception de votre demande, comptez moins de 24 heures avant un premier retour de nos équipes."],
  ['Comment vous contacter ?', "Par e-mail à contact@explicitcrea.com ou via le formulaire de contact du site."],
  ['Recrutez-vous ?', "Nous sommes ouverts aux profils créatifs : envoyez-nous des exemples de vos créations par e-mail."],
  ['Comment fonctionne la tarification ?', "Chaque projet est unique : contactez-nous avec un maximum d'informations et nous établissons un devis ensemble."],
];

const nav = `<nav aria-label="Navigation"><a href="/">Accueil</a> · <a href="/qui-sommes-nous">Qui sommes-nous</a> · <a href="/aide">FAQ</a> · <a href="/#contact">Contact</a> · <a href="/mentions-legales">Mentions légales</a></nav>`;
const wrap = (inner) => `<main style="max-width:760px;margin:12vh auto;padding:0 24px;font-family:system-ui,sans-serif;color:#eee;line-height:1.6">${inner}${nav}</main>`;

const servicesHtml = `<h2>Nos services</h2><ul>${SERVICES.map(([t, d]) => `<li><strong>${esc(t)}</strong> : ${esc(d)}</li>`).join('')}</ul>`;

const ROUTES = [
  {
    path: '/',
    file: 'index.html',
    title: 'Explicit Crea | Agence de création audiovisuelle : montage, motion design, 3D',
    description: 'Explicit Crea, agence de création audiovisuelle : montage vidéo, motion design, 3D, VFX, branding et sound design pour marques, créateurs et événements.',
    body: wrap(`<h1>Explicit Crea, agence de création audiovisuelle</h1>
<p>Vous avez une idée ? On la transforme en rendu concret, du concept à la production finale. Explicit Crea accompagne créateurs de contenu, marques et agences : montage vidéo, scènes 3D, motion design, sound design et branding.</p>
${servicesHtml}
<h2>Parlons de votre projet</h2><p>Écrivez-nous à <a href="mailto:contact@explicitcrea.com">contact@explicitcrea.com</a> : premier retour en moins de 24 heures.</p>`),
  },
  {
    path: '/qui-sommes-nous',
    file: 'qui-sommes-nous.html',
    title: "Qui sommes-nous ? L'équipe Explicit Crea | Explicit Crea",
    description: "Explicit Crea : 7 artistes à plein temps et un réseau de plus de 30 talents en montage, motion design, 3D et graphisme pour vos projets vidéo.",
    body: wrap(`<h1>Qui sommes-nous ? L'équipe Explicit Crea</h1>
<p>Explicit Crea est une agence créative spécialisée en production vidéo, création 3D et motion design. Nous accompagnons des créateurs de contenu, des marques et des agences, de l'idée initiale jusqu'au rendu final.</p>
<p>Explicit Crea, c'est une équipe de 7 artistes à plein temps, entourée d'un réseau de plus de 30 talents : monteurs vidéo, motion designers, artistes 3D, graphistes, illustrateurs.</p>
<h2>Nous intervenons sur</h2><ul><li>Le montage vidéo</li><li>La création de scènes 3D</li><li>La production vidéo complète</li><li>Le motion design et l'animation</li><li>La création visuelle et le branding</li></ul>
<h2>Notre approche</h2><p>Une méthode structurée mais flexible, centrée sur la compréhension des besoins, la qualité visuelle et l'efficacité des contenus.</p>`),
  },
  {
    path: '/aide',
    file: 'aide.html',
    title: 'FAQ : délais, tarifs, fonctionnement | Explicit Crea',
    description: "Délais, tarifs, déroulement d'un projet : les réponses aux questions fréquentes sur les prestations audiovisuelles d'Explicit Crea.",
    body: wrap(`<h1>Aide et questions fréquentes</h1>${FAQ.map(([q, a]) => `<h2>${esc(q)}</h2><p>${esc(a)}</p>`).join('')}`),
    jsonld: {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: FAQ.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })),
    },
  },
  {
    path: '/mentions-legales',
    file: 'mentions-legales.html',
    title: 'Mentions légales | Explicit Crea',
    description: 'Mentions légales du site explicitcrea.com, édité par Explicit Crea.',
    body: wrap(`<h1>Mentions légales</h1><p>Site explicitcrea.com édité par Explicit Crea. Contact : contact@explicitcrea.com.</p>`),
  },
  {
    path: '/snake',
    file: 'snake.html',
    title: 'Snake | Explicit Crea',
    description: "Mini-jeu Snake d'Explicit Crea.",
    noindex: true,
    body: wrap(`<h1>Snake</h1>`),
  },
  {
    path: '/404',
    file: '404.html',
    title: 'Page introuvable | Explicit Crea',
    description: "Cette page n'existe pas ou a été déplacée.",
    noindex: true,
    body: wrap(`<h1>Page introuvable</h1><p>Cette page n'existe pas ou a été déplacée.</p>`),
  },
];

const setMeta = (html, attr, key, value) => {
  const re = new RegExp(`(<meta ${attr}="${key.replace(/[:]/g, '\\$&')}" content=")[^"]*(")`);
  return re.test(html) ? html.replace(re, `$1${esc(value)}$2`) : html;
};

for (const r of ROUTES) {
  const url = SITE + (r.path === '/' ? '' : r.path);
  let html = template;
  html = html.replace(/<title>[^<]*<\/title>/, `<title>${esc(r.title)}</title>`);
  html = setMeta(html, 'name', 'description', r.description);
  html = setMeta(html, 'name', 'robots', r.noindex ? 'noindex, follow' : 'index, follow, max-image-preview:large');
  html = setMeta(html, 'property', 'og:url', url);
  html = setMeta(html, 'property', 'og:title', r.title);
  html = setMeta(html, 'property', 'og:description', r.description);
  html = setMeta(html, 'name', 'twitter:title', r.title);
  html = setMeta(html, 'name', 'twitter:description', r.description);
  html = html.replace(/<link rel="canonical" href="[^"]*">/, `<link rel="canonical" href="${url}">`);
  if (r.jsonld) {
    html = html.replace('</head>', `<script type="application/ld+json">${JSON.stringify(r.jsonld)}</script>\n  </head>`);
  }
  html = html.replace(/<div id="root">[\s\S]*?<\/div>\s*(?=<\/body>|<script)/, `<div id="root">${r.body}</div>\n    `);
  writeFileSync(join(DIST, r.file), html);
  console.log(`prerender: ${r.path} -> dist/${r.file}`);
}
