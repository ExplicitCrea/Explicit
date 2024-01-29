import StyledPotatoz from './StyledPotatoz'
import title from '../../assets/potatoz/title.png'
import potatoz from '../../assets/potatoz/potatoz.png'
import ReactPlayer from 'react-player'
import follow from '../../assets/potatoz/follow.png'

export const Potatoz = () => {
    return (
        <StyledPotatoz>
            <div className='wrapper-title'>
                <img className='title' src={title} alt="title"/>
            </div>
            <div className='container'>
                <div className='video'>
                    <div className='wrapper'>
                        <ReactPlayer width='100%' height='100%' url='https://www.youtube.com/watch?v=LXb3EKWsInQ' />
                        <img className='deco' src={potatoz} alt="potatoz"/>
                    </div>
                </div>
                <div className='description'>
                    <img className='follow' src={follow} alt="followers"/>
                    <p>
                        Nous sommes ravis d'avoir collaboré avec le streamer Potatoz. 
                        Notre équipe a créé des visuels sur mesure pour sa chaîne Twitch, 
                        des transitions fluides et une vidéo d'introduction captivante. 
                        Chacun de ces éléments a été soigneusement conçu pour refléter le style de Potatoz
                    </p>
                </div>
            </div>
        </StyledPotatoz>
    )
}
