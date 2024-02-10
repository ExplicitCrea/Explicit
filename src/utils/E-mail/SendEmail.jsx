import emailjs from '@emailjs/browser';

export const SendEmail = (form) => {
    
  return emailjs.sendForm('service_6atzqgd', 'template_xyytgya', form, {
      publicKey: 'QZnAR4ax8n-dL6Xb1',

  });
};





