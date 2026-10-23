# Explicit Atelier — Vercel

Port de la version Sites 12 vers Next.js, Neon, Clerk et Vercel Blob privé. Le site vitrine reste sur la branche main ; cette application se déploie depuis le dossier atelier de la branche atelier-vercel.

## Configuration

Les intégrations Vercel fournissent DATABASE_URL, CLERK_SECRET_KEY, NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY et BLOB_READ_WRITE_TOKEN. Les secrets ATELIER_SOURCE_TOKEN, ATELIER_MIGRATION_SECRET et ATELIER_OWNER_EMAIL sont uniquement côté serveur. Ne jamais les ajouter au dépôt.

## Transfert

Le propriétaire se connecte avec son adresse vérifiée historique, puis lance le transfert. La copie privée des fichiers est reprenable ; les données relationnelles sont activées ensemble à la fin. Aucune agence ne peut être créée par un visiteur sans invitation. Les anciennes invitations non utilisées ne sont pas transférées : créer de nouveaux liens depuis Vercel après validation.

Avant la bascule, vérifier les projets, le registre de factures, les PDF et une invitation réelle. Ne plus modifier le studio source pendant la bascule et désactiver ensuite le secret d’export source. La clé OpenAI reste facultative ; sans elle l’analyse locale des PDF continue de fonctionner.

## Déploiement

Base path /atelier. Projet Vercel explicit-atelier, framework Next.js, root directory atelier. Le raccordement du domaine et le passage Clerk en production restent à faire après recette. Ne jamais remplacer les fichiers racine du site vitrine par cette application.

## Vérification

npm ci
npm run typecheck
npm test
npm run build

Les tests PostgreSQL utilisent PGlite en mémoire. Les API de production ne font confiance à aucun en-tête d’identité fourni par le navigateur. Les PDF de 25 Mo utilisent un envoi direct privé vers Blob.
