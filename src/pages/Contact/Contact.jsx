import { useRef } from 'react';
import StyledContact from './StyledContact'
import {SendEmail}  from '../../utils/E-mail/SendEmail';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { MdEmail } from "react-icons/md";
import { BsFillTelephoneFill } from "react-icons/bs";
import { useTranslation } from "react-i18next";

export const Contact = () => {
    const { t } = useTranslation();
    const notifySuccess = () => toast("Votre e-mail a été envoyé avec succès!");
    const form = useRef();
    const handleSubmit = (e) => {
        e.preventDefault();

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
    };

return (
    <StyledContact>
        <h1>{t("contact.title")}</h1>
        <form ref={form} onSubmit={handleSubmit}>
            <div className='contact'>
                <h2>{t("contact.title2")}</h2>
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
            <div>
                <label type="text">{t("contact.label")}</label>
            </div>
            <div className='container'>
                <input type='text' name='prenom'  placeholder={t("contact.input")} required/>
                <input type='text' name='nom'     placeholder={t("contact.input2")} required/>
            </div>
                <label type="mail"> {t("contact.label2")}</label>
            <div>
                <input type='email' name='email'  placeholder='exemple@exemple.com' required/>
            </div>
                <label type="phone">{t("contact.label3")}</label>
            <div>
                <input type='phone' name='phone'  placeholder='+33 01 23 45 67 89' required/>
            </div>
                <label type="entreprise">{t("contact.label4")}</label>
            <div>
                <input type='text' name='entreprise'  placeholder={t("contact.input3")}  required /> 
            </div>
                <label type="message">{t("contact.label5")}</label>
            <div>
                    <textarea type='text' name='message' placeholder={t("contact.textarea")} required/>
            </div>
                <button  type='submit' className="send-button">{t("contact.button")}</button>
                <input type="hidden" name="a_password"  tabIndex="-1" autoComplete="off"/>
            <ToastContainer />
        </form>
        <div className='linear-background'/>
    </StyledContact>

)
}
