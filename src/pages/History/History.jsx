import React from 'react'
import StyledHistory from './StyledHistory'
import logohistoire from '../../assets/logohistoire.png'
export const History = () => {
return (
    <StyledHistory>
        <img src={logohistoire} alt='notre histoire'></img>
        <div className='container'>
            <h2>Fondée en 2019</h2>
            <p>De par le besoin d'évoluer sans cesse, un groupe de créatifs se sont réunis pour performer dans le domaine
            du divertissement et du partage sur internet. Le nom d'Explicit s'est instantanément inscrit
            dans la tête du collectif comme étant la valeur à ajouter.
            <p/>
            <p>
            Formés et recrutés sur des attentes prestigieuses, les membres d'Explicit sous leurs différences
            artistiques parviennent à associer le professionnel avec leur vision de l'art et partagent dans chacun de
            leurs projets une part d'eux même pour un résultat unique.
            </p>
            <p>
            La fusion de différents styles de pratique comme le dessin, le montage ou encore la modélisation
            permet une complémentarité dans le travail qui justifie un résultat qualitatif et à la hauteur de vos
            attentes.
            </p>

            L'équipe Explicit se veut avant tout dans le partage et la convivialité, elle s'est chargée de grandir au
            sein d'un nid de curiosité qui lui a permis et qui continuera de partager de la créativité dans chacun de
            ses travaux fournis.
            </p>
        </div>
        <div className='background-green'/>
        <div className='background-purple'/>
    </StyledHistory>
    
    
)
}
