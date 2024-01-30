import ReactPlayer from 'react-player'
import StyledPaltay from './StyledPaltay'
import background from '../../assets/paltay/background.png'
import icon1 from '../../assets/paltay/icon1.png'
import icon2 from '../../assets/paltay/icon2.png'   
import icon3 from '../../assets/paltay/icon3.png'
import icon4 from '../../assets/paltay/icon4.png'

export const Paltay = () => {
    return (
        <StyledPaltay>
            <img className='background' src={background} alt="paltay" />
            <div className='video'>
                <ReactPlayer width="100%" height="100%" url='https://www.youtube.com/watch?v=LXb3EKWsInQ' />
            </div>
            <p>
                Nous sommes fiers d'avoir collaboré avec Paltay, un streamer et YouTuber. 
                Notre équipe a donné vie à sa chaîne Twitch en créant des scènes sur mesure,
                agrémentées d'illustrations et d'assets créatifs. 
                Chaque élément a été soigneusement conçu pour apporter une touche unique et immersive à son contenu, 
                offrant à Paltay et à sa communauté une expérience visuelle vraiment unique.
            </p>
            <div className='picture'>
                <img src={icon1} alt="paltay" />
                <img src={icon2} alt="paltay" />
                <img src={icon3} alt="paltay" />
                <img src={icon4} alt="paltay" />
            </div>
        </StyledPaltay>
    )
}
