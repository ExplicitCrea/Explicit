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
   npm run build
   npm run dev
   ```

Pour pouvoir déployer sur le www rajouter ça [ici](https://github.com/Tarkorr/Explicit/vite.config.ts#L6) :
```js
server: {
    host: true,
    allowedHosts: ['example.com'],
    port: 5000
  }
```
---
