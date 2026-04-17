// IDs dans le dashboard EmailJS : https://dashboard.emailjs.com/

export const EMAILJS_CONFIG = {
  // Le || sert juste à mettre qlq chose si il trouve rien
  SERVICE_ID: import.meta.env.VITE_EMAILJS_SERVICE_ID || 'service', 
  TEMPLATE_ID: import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'template',
  PUBLIC_KEY: import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'user',
};
