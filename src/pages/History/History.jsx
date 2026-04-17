import React from 'react'
import StyledHistory from './StyledHistory'
import logohistoire from '../../assets/logohistoire.webp'
import { useTranslation } from "react-i18next";

export const History = () => {
const { t } = useTranslation();
return (
    <StyledHistory>
        <img src={logohistoire} alt='notre histoire'></img>
        <div className='container'>
            <p className='description'>{t("history.paragraph")}<p/>
            <p>
                {t("history.paragraphe")}
            </p>
            <p>
                {t("history.paragraphes")}
            </p>
                {t("history.conclusion")}
            </p>
        </div>
        <div className='background-green'/>
        <div className='background-purple'/>
    </StyledHistory>
    
    
)
}
