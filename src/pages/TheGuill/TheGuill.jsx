import React from 'react'
import StyledTheGuill from './StyledTheGuill'
import background from '../../../public/assets/guill/background.png'
import ReactPlayer from 'react-player'
import Icon1 from '../../../public/assets/guill/icon1.png'
import Icon2 from '../../../public/assets/guill/icon2.png'
import Icon3 from '../../../public/assets/guill/icon3.png'
import Icon4 from '../../../public/assets/guill/icon4.png'
import Icon5 from '../../../public/assets/guill/icon5.png'
import Icon6 from '../../../public/assets/guill/icon6.png'

export const TheGuill = () => {
return (
    <StyledTheGuill>
        <div className='background'>
            <img src= {background} alt='background'></img>
        </div>
            <p>
                Nous sommes ravis d'avoir collaboré avec le streamer The Guill. 
                Notre équipe a conçu et réalisé son stream pack pour sa chaîne Twitch. 
                Des graphismes, des animations captivantes et une identité visuelle unique ont été intégrés pour offrir à ses spectateurs une expérience immersive. 
                Ensemble, nous avons façonné un univers visuel qui reflète le style distinctif de Guill et renforce l'impact visuel de sa chaîne !"
                et renforce l'impact visuel de sa chaine !
            </p>
        <div className='carousel-container'>
            <div className='wrapper'>
                    <ReactPlayer width='100%' height='100%' url='' />
            </div>
        </div>
            <div className='container'>
                <img src={Icon1} alt='icon'/>
                <img src={Icon2} alt='icon'/>
            </div>
        <div className='container-icon'>
            <img src={Icon3} alt='icon'/>
            <img src={Icon4} alt='icon'/>
            <img src={Icon5} alt='icon'/>
            <img src={Icon6} alt='icon'/>
        </div>

    </StyledTheGuill>
)
}
