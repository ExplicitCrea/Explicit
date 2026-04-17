import ReactPlayer from 'react-player'
import StyledOreal from './StyledOreal'
import logoBlack from '../../assets/oreal/logo-black.png'
import logoWhite from '../../assets/oreal/logo-white.webp'
import prompt1 from '../../assets/oreal/prompt-1.webp'
import prompt2 from '../../assets/oreal/prompt-2.webp'
import sketch from '../../assets/oreal/sketch.webp'
import timeline from '../../assets/oreal/timeline.webp'
import waterSaver3d from '../../assets/oreal/water-saver-3d.webp'
import waterSaverLight from '../../assets/oreal/water-saver-light.webp'
import waterSaverPlan from '../../assets/oreal/water-saver-plan.webp'

export const Oreal = () => {
    return (
        <StyledOreal>
            <div className='container'>
                <div className='wrapper-logo'>
                    <img className='logo' src={logoBlack} alt='logo-black' />
                </div>
                <p className='subtitle'> 3D WATER SAVER </p>
                <div className='gallery'>
                    <div className='video'>
                        <ReactPlayer width='100%' height='100%' url='https://www.youtube.com/watch?v=LXb3EKWsInQ' />
                    </div>
                    <div className='pictures'>
                        <div className='left'>
                            <img src={waterSaverLight} alt='product picture water saver' />
                            <img src={waterSaverPlan} alt='product picture water saver' />
                        </div>
                        <div className='right'>
                            <img src={waterSaver3d} alt='product picture water saver' />
                        </div>
                    </div>
                </div>
            </div>
            <div className='middle-text'>
                <div className='wrapper-black'>
                    <p className='black text'>
                        Nous avons eu l'opportunité de travailler en partenariat avec la prestigieuse enseigne de cosmetiques L'Oréal,
                    </p>
                </div>
                <div className='wrapper-white'>
                    <p className='white text'>
                        concrétisant ainsi deux projets distincts : la réalisation d'une animation 3D dédiée à un sèche-cheveux, 
                        et la mise en avant de l'Intelligence Artificielle dans un contexte séparé.
                    </p>
                </div>
            </div>
            <div className='container black'>
                <div className='wrapper-logo'>
                    <img className='logo' src={logoWhite} alt='logo white' />
                </div>
                <p className='subtitle white-subtitle'>Scientific Discovery</p>
                <div className='gallery'>
                    <div className='video'>
                        <ReactPlayer width='100%' height='100%' url='https://www.youtube.com/watch?v=LXb3EKWsInQ' />
                    </div>
                    <div className='pictures'>
                        <div className='left'>
                            <img src={prompt1} alt='prompt' />
                            <img src={timeline} alt='timeline' />
                        </div>
                        <div className='right'>
                            <img src={prompt2} alt='prompte 2' />
                        </div>
                    </div>
                    <img className='sketch' src={sketch} alt='sketch' />
                </div>
                <p className='bottom-explain white-subtitle'>
                    L’idée ici était de représenter l’évolution et l’amélioration 
                    d’une image générée par intelligence artificielle.
                </p>
            </div>
        </StyledOreal>
    )
}
