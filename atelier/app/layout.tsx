import {ClerkProvider} from '@clerk/nextjs';
import type { Metadata } from "next";
import "./globals.css";
import "./production.css";
import "./atelier-v3.css";
import "./identity.css";
import "./night.css";
import "./briefs.css";
import "./order-status.css";
import "./invoice-paper.css";
import "./profile-multi.css";
import "./control-center.css";

export const metadata: Metadata = {
  title: "Atelier — Explicit Crea",
  description: "Briefs, production, bible graphique, factures et budgets. Le point de contrôle de votre studio.",
  icons: {
    icon: "/atelier/favicon.svg?v=5",
    shortcut: "/atelier/favicon.svg?v=5",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <head><script dangerouslySetInnerHTML={{__html:`(()=>{let q=null,s=null;try{q=new URLSearchParams(location.search).get('theme');}catch{}try{s=localStorage.getItem('atelier-theme-last');}catch{}const t=q==='dark'||q==='light'?q:s==='dark'||s==='light'?s:typeof matchMedia==='function'&&matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';document.documentElement.dataset.theme=t;document.documentElement.style.colorScheme=t;})()`}}/></head>
      <body className="antialiased"><ClerkProvider signInUrl="/atelier/sign-in" signUpUrl="/atelier/sign-up">{children}</ClerkProvider></body>
    </html>
  );
}
