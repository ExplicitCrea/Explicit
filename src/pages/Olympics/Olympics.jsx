import ReactPlayer from 'react-player'
import StyledOlympics from './StyledOlympics'
import logo from '../../assets/olympics/logo.png'
import explict from '../../assets/star-header.png'
import deco from '../../assets/olympics/deco.png'
import deco1 from '../../assets/olympics/deco1.png'
import deco2 from '../../assets/olympics/deco2.png'

export const Olympics = () => {
    return (
        <StyledOlympics>
            <div className='pictures-container'>
                <div className='logo'>
                    <img src={explict} alt="logo explicit"/>
                    <img src={logo} alt="logo olympics"/>
                </div>
                <img className='deco' src={deco2} alt="decoration"/>
                <img className='deco' src={deco1} alt="decoration"/>
            </div>
            <div className='video'>
                <ReactPlayer width='100%' height='100%' url='https://www.youtube.com/shorts/srydA31W3wI' />
            </div>
            <div className='text-container'>
                <p>
                    Explorez l'essence du temps à travers les yeux de la créativité d'Explicit. Notre collaboration avec l'évènement Paris 2024 nous a permis de façonner une vidéo en 3D captivante, un voyage d'une minute à travers les époques et les mondes. De gladiateurs en lutte aux splendeurs de l'Empire romain, des années 1920 à notre époque contemporaine, chaque univers prend vie grâce à notre maîtrise de la 3D.
                    Plongez dans une immersion visuelle unique qui transcende le temps et l'espace, apportant une dimension épique au projet de merch Paris 2024.
                </p>
                <img src={deco} alt="decoration"/>
            </div>
        </StyledOlympics>
    )
}
