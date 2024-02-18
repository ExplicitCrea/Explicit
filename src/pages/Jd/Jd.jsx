import StyledJd from './StyledJd'
import banner from '../../assets/jd/banner.jpg'
import boat from '../../assets/jd/boat.png'
import samourai from '../../assets/jd/samourai.png'
import waterWave from '../../assets/jd/water-wave.png'
import poster1 from '../../assets/jd/poster1.png'
import poster2 from '../../assets/jd/poster2.png'
import poster3 from '../../assets/jd/poster3.png'
import carpentry from '../../assets/jd/carpentry.png'
import pp from '../../assets/jd/pp.jpg'
import ReactPlayer from 'react-player'

export const Jd = () => {
    return (
        <StyledJd>
            <div className='banner-container'>
                <img className='banner' src={banner} alt="Bannière" />
                <img className='profile-picture' src={pp} alt="photo profile" />
            </div>
            <div className='global'>
                <img className='carpentry' src={carpentry} alt="menuiserie" />
                <div className='presentation'>
                    <h1>RENCONTRE AVEC STUPEFLIP</h1>
                    <div className='video'>
                        <ReactPlayer width='100%' height='100%' url='https://www.youtube.com/watch?v=LXb3EKWsInQ' />
                    </div>
                    <p>
                        Plongez dans un monde d'inspiration impériale chinoise, où les histoires prennent vie grâce à l'expertise en illustration et en animation d’Explicit.

                        Dans cette vidéo captivante issue d'une rencontre entre LeGrandJD et l'un des membres du groupe de musique légendaire Stupeflip, Explicit a donné vie à une aventure tout droit sortie de l'imagination de Julien Barthélémy. 

                        Découvrez l'histoire étonnante d'un empereur et d'un peintre mis à l'épreuve par la création d'un tableau de crabe
                    </p>
                </div>
                <div className='deco'>
                    <img className='poster1' src={poster2} alt="poster" />
                    <div className='sub-deco'>
                        <img src={poster3} alt="poster" />
                        <img src={poster1} alt="poster" />
                    </div>
                </div>
                <img className='deco2 wave' src={waterWave} alt="vague" />
                <img className='deco2' src={boat} alt="bateau" />
                <img className='samourai' src={samourai} alt="samourai" />
                <div className='background-filter'/>
            </div>
        </StyledJd>
    )
}
