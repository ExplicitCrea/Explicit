import emailjs from '@emailjs/browser';

export const SendEmail = (form) => {
  return emailjs.sendForm('VITE_EMAILJS_SERVICE_ID', 'VITE_EMAILJS_TEMPLATE_ID', form, {
      publicKey: 'VITE_EMAILJS_PUBLIC_KEY',

  });
};





