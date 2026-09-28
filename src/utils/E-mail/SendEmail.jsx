import emailjs from '@emailjs/browser';
import { EMAILJS_CONFIG } from '../../config/emailjs';

export const SendEmail = (form) => {
  return emailjs.sendForm(
    EMAILJS_CONFIG.SERVICE_ID,
    EMAILJS_CONFIG.TEMPLATE_ID,
    form,
    { publicKey: EMAILJS_CONFIG.PUBLIC_KEY }
  );
};





