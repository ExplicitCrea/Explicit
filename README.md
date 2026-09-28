
![EXPLICIT CREA Logo](./assets/logo.png)

**EXPLICIT CREA** WebSite Vitrine.

## Technique

- **Framework :** [React 18](https://reactjs.org/)
- **Langage :** [TypeScript](https://www.typescriptlang.org/)
- **Build Tool :** [Vite](https://vitejs.dev/)

## Install & Launch

Version utilisées :

- node `v24.14.1`
- npm `11.12.1`

1. **Cloner le projet :**

   ```bash
   git clone https://github.com/Tarkorr/Explicit.git
   ```

2. **Lancer en local :**

   ```bash
   npm install
   npm i @vercel/analytics
   npm run build
   npm run dev
   ```

Pour pouvoir déployer sur le www rajouter ça [ici](https://github.com/Tarkorr/Explicit/blob/main/vite.config.ts#L6) :

```js
server: {
    host: true,
    allowedHosts: ['example.com'],
    port: 5000
  }
```

## Gestion Emails

Le formulaire de contact utilise EmailJS. Pour installer la librairie :

```bash
npm install @emailjs/browser
```

Pour configurer l'envoi, vous devez créer un fichier `.env` à la racine du projet avec les variables suivantes :

```env
VITE_EMAILJS_SERVICE_ID=votre_service_id
VITE_EMAILJS_TEMPLATE_ID=votre_template_id
VITE_EMAILJS_PUBLIC_KEY=votre_public_key
```

Ces identifiants sont récupérables sur votre tableau de bord [EmailJS](https://dashboard.emailjs.com/admin).

### Configuration du Template

Pour recevoir correctement les données, votre template EmailJS peut utiliser les variables suivantes :

- **{{user_name}}** : Nom du contact
- **{{user_email}}** : Email du contact
- **{{user_phone}}** : Numéro de téléphone
- **{{project_type}}** : Type de projet sélectionné
- **{{message}}** : Contenu du message

---

## Classement Snake en Ligne (Vercel KV / Upstash Redis)

Le classement du jeu Snake (`/snake`) est synchronisé sur le serveur via la fonction Serverless `/api/leaderboard`.

### Configuration sur Vercel (Recommandé)

1. Dans votre tableau de bord **Vercel**, ouvrez votre projet **Explicit**.
2. Allez dans l'onglet **Storage** et cliquez sur **Create Database** -> **KV**.
3. Liez la base KV à votre projet : Vercel configure automatiquement les variables :
   - `KV_REST_API_URL`
   - `KV_REST_API_TOKEN`
4. Redéployez le projet : le leaderboard sera partagé en temps réel entre tous les visiteurs !

### Configuration en local (Optionnel)

Pour tester la persistance serveur en local, créez un fichier `.env` ou `.env.local` :

```env
KV_REST_API_URL="https://votre-base.upstash.io"
KV_REST_API_TOKEN="votre_token_secret"
```

*(Si les clés ne sont pas définies, le jeu bascule automatiquement et de manière transparente sur le cache local pour éviter toute interruption).*

