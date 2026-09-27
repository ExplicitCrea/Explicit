import defaultLogo from '../../assets/Logos/logo.png';
import logoWhiteBlueStar from '../../assets/Logos/LOGO 2026 - White Blue Star.png';
import logoWhiteGreenStar from '../../assets/Logos/LOGO 2026 - White Green Star.png';
import logoWhiteRedStar from '../../assets/Logos/LOGO 2026 - White Red Star.png';
import logoWhite from '../../assets/Logos/LOGO 2026 - White.png';

export interface ColorRGB {
  r: number;
  g: number;
  b: number;
}

export interface ColorDefinition {
  hex: string;
  rgb: ColorRGB;
  rgbString: string;
}

export interface ThemePreset {
  id: string;
  name: string;
  logo: string;               // Fichier logo associé au thème
  primary: ColorDefinition;   // Couleur 1 du doublet
  secondary: ColorDefinition; // Couleur 2 du doublet
  btnTextColor?: string;      // Couleur du texte pour les boutons avec dégradé d'accent
  btnTextShadow?: string;     // Ombre de texte adaptée au contraste
}

export const THEMES: Record<string, ThemePreset> = {
  // 1. Thème White Blue Star (Haut : Violet / Vert Menthe)
  whiteBlueStar: {
    id: "whiteBlueStar",
    name: "White Blue Star (Violet / Vert Menthe)",
    logo: logoWhiteBlueStar,
    primary: {
      hex: "#634EFF",
      rgb: { r: 99, g: 78, b: 255 },
      rgbString: "99, 78, 255",
    },
    secondary: {
      hex: "#64F6AD",
      rgb: { r: 100, g: 246, b: 173 },
      rgbString: "100, 246, 173",
    },
    btnTextColor: "#FFFFFF",
    btnTextShadow: "0 1px 3px rgba(0, 0, 0, 0.6)",
  },

  // 2. Thème White Green Star (Milieu : Rouge Corail / Vert Menthe)
  whiteGreenStar: {
    id: "whiteGreenStar",
    name: "White Green Star (Rouge Corail / Vert Menthe)",
    logo: logoWhiteGreenStar,
    primary: {
      hex: "#FF4E4E",
      rgb: { r: 255, g: 78, b: 78 },
      rgbString: "255, 78, 78",
    },
    secondary: {
      hex: "#6EF3A3",
      rgb: { r: 110, g: 243, b: 163 },
      rgbString: "110, 243, 163",
    },
    btnTextColor: "#FFFFFF",
    btnTextShadow: "0 1px 3px rgba(0, 0, 0, 0.6)",
  },

  // 3. Thème White Red Star (Bas : Jaune Solaire / Rouge Vif)
  whiteRedStar: {
    id: "whiteRedStar",
    name: "White Red Star (Jaune Solaire / Rouge Vif)",
    logo: logoWhiteRedStar,
    primary: {
      hex: "#FFE84E",
      rgb: { r: 255, g: 232, b: 78 },
      rgbString: "255, 232, 78",
    },
    secondary: {
      hex: "#FF0C04",
      rgb: { r: 255, g: 12, b: 4 },
      rgbString: "255, 12, 4",
    },
    // Texte sombre pour contraste parfait sur fond jaune/rouge
    btnTextColor: "#0A0C10",
    btnTextShadow: "none",
  },

  // 4. Thème Full White (Minimaliste Monochrome Haut de Gamme)
  fullWhite: {
    id: "fullWhite",
    name: "Full White (Minimaliste Monochrome)",
    logo: logoWhite,
    primary: {
      hex: "#FFFFFF",
      rgb: { r: 255, g: 255, b: 255 },
      rgbString: "255, 255, 255",
    },
    secondary: {
      hex: "#D8DFE8",
      rgb: { r: 216, g: 223, b: 232 },
      rgbString: "216, 223, 232",
    },
    // Texte sombre impératif sur fond blanc pour éviter tout blanc sur blanc
    btnTextColor: "#0A0C10",
    btnTextShadow: "none",
  },

  // Thème classique d'origine
  explicitClassic: {
    id: "explicitClassic",
    name: "Explicit Classic",
    logo: defaultLogo,
    primary: {
      hex: "#634EFF",
      rgb: { r: 176, g: 96, b: 255 },
      rgbString: "176, 96, 255",
    },
    secondary: {
      hex: "#30DD69",
      rgb: { r: 76, g: 255, b: 143 },
      rgbString: "76, 255, 143",
    },
  },

  cyberpunk: {
    id: "cyberpunk",
    name: "Cyberpunk (Rose / Cyan)",
    logo: logoWhiteBlueStar,
    primary: {
      hex: "#FF007F",
      rgb: { r: 255, g: 0, b: 127 },
      rgbString: "255, 0, 127",
    },
    secondary: {
      hex: "#00F0FF",
      rgb: { r: 0, g: 240, b: 255 },
      rgbString: "0, 240, 255",
    },
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// SÉLECTION DU THÈME : Tirage aléatoire pondéré par session
// - 5/10 (50%) : whiteBlueStar
// - 1/5  (20%) : whiteGreenStar
// - 1/5  (20%) : whiteRedStar
// - 1/10 (10%) : fullWhite
// ─────────────────────────────────────────────────────────────────────────────
export function selectWeightedTheme(): ThemePreset {
  if (typeof window !== 'undefined') {
    // 1. Possibilité de forcer un thème via l'URL (ex: ?theme=whiteGreenStar)
    const urlParams = new URLSearchParams(window.location.search);
    const themeParam = urlParams.get('theme');
    if (themeParam && THEMES[themeParam]) {
      return THEMES[themeParam];
    }
  }

  const rand = Math.random();

  if (rand < 0.50) {
    return THEMES.whiteBlueStar;
  }
  if (rand < 0.70) {
    return THEMES.whiteGreenStar;
  }
  if (rand < 0.90) {
    return THEMES.whiteRedStar;
  }
  return THEMES.fullWhite;
}

// Thème actif tiré selon les probabilités demandées
export const ACTIVE_THEME: ThemePreset = selectWeightedTheme();

// Logo actif selon le thème
export const ACTIVE_LOGO: string = ACTIVE_THEME.logo || defaultLogo;

// Injecte les variables CSS dynamiques dans le document
export function applyThemeToDom(theme: ThemePreset = ACTIVE_THEME) {
  if (typeof document === 'undefined') return;
  const root = document.documentElement;
  
  root.style.setProperty('--accent-primary', theme.primary.hex);
  root.style.setProperty('--accent-secondary', theme.secondary.hex);
  root.style.setProperty('--accent-primary-rgb', theme.primary.rgbString);
  root.style.setProperty('--accent-secondary-rgb', theme.secondary.rgbString);

  // Rétrocompatibilité
  root.style.setProperty('--accent-violet', theme.primary.hex);
  root.style.setProperty('--accent-green', theme.secondary.hex);

  // Couleur contrastée du texte des boutons d'action (évite le blanc sur blanc)
  const btnColor = theme.btnTextColor || '#FFFFFF';
  const btnShadow = theme.btnTextShadow || 'none';
  root.style.setProperty('--accent-btn-text', btnColor);
  root.style.setProperty('--accent-btn-shadow', btnShadow);
}
