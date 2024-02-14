import React from 'react'
import StyledTheGuill from './StyledTheGuill'
import ReactPlayer from 'react-player'
import Icon1 from '../../assets/TheGuill/icon1.png'
import Icon2 from '../../assets/TheGuill/icon2.png'
import Icon3 from '../../assets/TheGuill/icon3.png'
import Icon4 from '../../assets/TheGuill/icon4.png'
import Icon5 from '../../assets/TheGuill/icon5.png'
import Icon6 from '../../assets/TheGuill/icon6.png'
import Logo from '../../assets/TheGuill/logo.jpg'
import Pannels from '../../assets/TheGuill/pannels.png'

export const TheGuill = () => {
return (
    <StyledTheGuill>
    <div className="background-container">
    
            <p>
                Nous sommes ravis d'avoir collaboré avec le streamer The Guill. 
                Notre équipe a conçu et réalisé son stream pack pour sa chaîne Twitch. 
                Des graphismes, des animations captivantes et une identité visuelle unique ont été intégrés pour offrir à ses spectateurs une expérience immersive. 
                Ensemble, nous avons façonné un univers visuel qui reflète le style distinctif de Guill et renforce l'impact visuel de sa chaîne !"
                et renforce l'impact visuel de sa chaine !
            </p>
            <div className='container'>
                <div className='video'>
                    <ReactPlayer width='100%' height='100%' url='https://youtu.be/JmCJ09jtXm4' />
            </div>
            <div className='icon-right'>
                <img src={Icon1} alt='icon'/>
                <img src={Icon2} alt='icon'/>
                <img src={Icon3} alt='icon'/>
            </div>
            <div className='icon-down'>
                <img src={Icon4} alt='icon'/>
                <img src={Icon5} alt='icon'/>
                <img src={Icon6} alt='icon'/>
            </div>
                <img src= {Pannels} alt='pannel' className='pannels'/>
        </div>
        <img src={Logo} alt='logo' className='logo' />
        </div>
    </StyledTheGuill>
)
}
