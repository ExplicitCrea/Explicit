import React from 'react'
import StyledContact from './StyledContact'

export const Contact = () => {
return (
    <StyledContact>
            <h1>Nous Contacter</h1>
    <form>
        <div>
            <label type="text">Votre Prénom / Nom</label>
        </div>
        <div className='container'>
            <input type='text' name='prenom'  placeholder='Prénom'/>
            <input type='text' name='nom'     placeholder='Nom'/>
        </div>
            <label type="mail"> Adresse E-Mail*</label>
        <div>
            <input type='text' name='mail'  placeholder='exemple@exemple.com'/>
        </div>
            <label type="phone">Numéro de Téléphone</label>
        <div>
            <input type='text' name='phone'  placeholder='+33 01 23 45 67 89'/>
        </div>
            <label type="entreprise">Nom d'entreprise/Pseudonyme*</label>
        <div>
            <input type='text' name='entreprise'  placeholder=' Ex.nom de l entreprise/Pseudo' /> 
        </div>
            <label type="message">Message*</label>
        <div>
                <textarea type='text' name='message' placeholder='Ajouter un message'/>
        </div>
        
            <button className="send-button">Envoyer</button>
    </form>
        <div className='background-filter'/>
    </StyledContact>



    
)
}
