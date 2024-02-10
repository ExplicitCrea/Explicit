import React, { useRef } from 'react';
import StyledContact from './StyledContact'
import {SendEmail}  from '../../utils/E-mail/SendEmail';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const Contact = () => {
    const notifySuccess = () => toast("Votre e-mail a été envoyé avec succès!");
    const form = useRef();
    const handleSubmit = (e) => {
        e.preventDefault();

        if (form.current.checkValidity()) {
            SendEmail(form.current)
                .then((response) => {
                    console.log('Email sent successfully:', response);
                    form.current.reset();
                    notifySuccess();
                })
                .catch((error) => {
                    console.error('Failed to send email:', error);
                    alert('Erreur lors de l\'envoi de l\'e-mail. Veuillez réessayer.');
                });
        } else {
            alert('Veuillez remplir tous les champs du formulaire.');
        }
    };

return (
    <StyledContact>
            <h1>Nous Contacter</h1>
    <form ref={form} onSubmit={handleSubmit}>
        <div>
            <label type="text">Votre Prénom / Nom</label>
        </div>
        <div className='container'>
            <input type='text' name='prenom'  placeholder='Prénom' required/>
            <input type='text' name='nom'     placeholder='Nom' required/>
        </div>
            <label type="mail"> Adresse E-Mail*</label>
        <div>
            <input type='email' name='email'  placeholder='exemple@exemple.com' required/>
        </div>
            <label type="phone">Numéro de Téléphone</label>
        <div>
            <input type='phone' name='phone'  placeholder='+33 01 23 45 67 89' required/>
        </div>
            <label type="entreprise">Nom d'entreprise/Pseudonyme*</label>
        <div>
            <input type='text' name='entreprise'  placeholder=' Ex.nom de l entreprise/Pseudo' required /> 
        </div>
            <label type="message">Message*</label>
        <div>
                <textarea type='text' name='message' placeholder='Ajouter un message' required/>
        </div>
            <button  type='submit' className="send-button">Envoyer</button>
            <input type="hidden" name="security" value="security"/>
    <ToastContainer />
    </form>
        <div className='background-filter'/>
    </StyledContact>

)
}
