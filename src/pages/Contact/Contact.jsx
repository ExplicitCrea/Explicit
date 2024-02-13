import React, { useRef } from 'react';
import StyledContact from './StyledContact'
import {SendEmail}  from '../../utils/E-mail/SendEmail';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { MdEmail } from "react-icons/md";
import { BsFillTelephoneFill } from "react-icons/bs";

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
                    alert('Veuillez remplir tous les champs du formulaire.');
                });
        } else {
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
            <input type="hidden" name="a_password"  tabindex="-1" autocomplete="off"/>
    <ToastContainer />
        <div className='coordonner'>
                <h2>Pour nous contacter</h2>
                    <li>
                        <a href="mailto:Contact@explicitcrea.com">
                            <MdEmail /> Contact@explicitcrea.com
                        </a>
                    </li>
                    <li>
                        <a href="tel:07.83.82.05.02">
                            <BsFillTelephoneFill />  07.83.82.05.02
                        </a>
                    </li>
                    
        </div>
    </form>
        <div className='background-filter'/>
    </StyledContact>

)
}
