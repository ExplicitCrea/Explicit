import emailjs from '@emailjs/browser';

export const SendEmail = (form) => {
  return emailjs.sendForm('service_8gwncrn', 'template_453w76n', form, {
      publicKey: 'CVGCJIO4wguPYUo7y',

  });
};





