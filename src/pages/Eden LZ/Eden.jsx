import React from 'react'
import ReactPlayer from 'react-player'
import StyledEden from './StyledEden'
import background from '/assets/eden_lz/background.png'
import photo from '../../assets/eden-lz/photo.png'
import logo from '../../assets/eden-lz/logo-.png'
import photos from '../../assets/eden-lz/photo2.png'
import Logo from '../../assets/eden-lz/logo.png'
import barre from '../../assets/eden-lz/barre.png'
import com from '../../assets/eden-lz/com.png'
import chapitre from '../../assets/eden-lz/chapitre.png'
import chapitres from '../../assets/eden-lz/chapitre1.png'
import bloc from '../../assets/eden-lz/bloc.png'
import { useTranslation } from "react-i18next";

export const Eden = () => {
const { t } = useTranslation();
return (
    <StyledEden>
      <h1>{t("eden.title")}</h1>
      <div className='container'>
        <img src={photo} alt='photo'/>
        <img src={logo} alt='logo' className='logo'/>
        <img src={photos} alt='photo'/>
      </div>
      <div className='video'>
        <ReactPlayer width='100%' height='100%' url='https://youtu.be/4vF-72KeuKw' />
      </div>
      <div className='containers'>
        <img src={Logo} alt='Logo' className='logo-img'/>
        <img src={bloc} alt='bloc' className='bloc-img'/>
        <img src={barre}alt='barre'className='barre-img'/>
      </div>
      <div className="text-overlay">
        <p>
          {t("eden.paragraphe")}
          {t("eden.paragraphes")}
        </p>
      <div/>
      </div>
      <div className='chapitre'>
        <h2>MOTION</h2>
        <img src={com} alt='com' className='img-top-right'/>
        <img src={chapitre} alt='chapitre' className='img-middle'/>
        <img src={chapitres} alt='chapitre' className='img-bottom'/>
      </div>
      <img src={background} alt='background' className='background' />
    </StyledEden>
  )
}
