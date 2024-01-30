import StyledGg from './StyledGg'
import ReactPlayer from 'react-player';
import logoMiddle from '../../assets/gg/logo-middle.png'
import logoTop from '../../assets/gg/logo-top.png'
import gameplay from '../../assets/gg/gameplay.jpg'
import scene from '../../assets/gg/scene.jpg'

export const Gg = () => {
    return (
        <StyledGg>
            <div className='container'>
                <div className='left-container'>
                    <div className='image'>
                        <img src={gameplay} alt="gg-gameplay"/>
                    </div>
                    <div className='video'>
                        <ReactPlayer width='100%' height='100%' url='https://www.youtube.com/watch?v=LXb3EKWsInQ' />
                    </div>
                </div>
                <img className='logo-middle' src={logoMiddle} alt="logo gg on top"/>
                <p>
                    Nous sommes honorés d'avoir contribué à la réalisation d'un tournoi e-sportif Minecraft, 
                    organisé par The Guill et offrant un cash prize de 12 000 euros. 
                    Explicit a apporté sa créativité en développant une direction artistique et en concevant des scènes pour l'événement. 
                    Chaque détail a été soigneusement orchestré pour créer une expérience visuelle immersive, ajoutant une dimension unique à ce tournoi !
                </p>
                <div className='right-container'>
                    <img className='scene' src={scene} alt="gg-scene"/>
                </div>
                <img className='logo-top' src={logoTop} alt="logo gg"/>
                <img className='background' src='/assets/gg/deco.png' alt="background-gg"/>
            </div>
        </StyledGg>
    )
}
