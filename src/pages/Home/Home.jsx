import { Newsletter } from '../../components/Home/Newsletter/Newsletter'
import StyledHome from './StyledHome'
import star from '../../assets/star.png'
import book from '../../assets/book.png'
import basket from '../../assets/basket.png'
import starBackground from '../../assets/star-background.png'
import starPurple from '../../assets/star-purple.png'
import { Link } from 'react-router-dom'

export const Home = () => {
    return (
        <StyledHome>
            <h1>
                Vous Souhaitez Concrétiser Un Projet <span>Créatif</span> ?
            </h1>
            <p>
                Explicit est là pour répondre à tout type de demandes concernant le milieu de l’audiovisuel. 
                Nous avons à nos côtés des artistes passionés et professionels qui seront prêts à travailler
                avec vous afin de mener à bien vos projets.
            </p>
            <h2>Découvrez nous !</h2>
            <div className='menu-container'>
                <div className='link-container'>
                    <Link to="/services" className='link star'>
                        <img src={star} alt="star" />
                        <h3>Services</h3>
                    </Link>
                    <Link to="" className='link contact'>
                        <h3>Contact</h3>
                    </Link>
                    <Link className='link history'>
                        <h3>Notre Histoire</h3>
                    </Link>
                </div>
                <div className='link-container'>
                    <Link to=""  className='link book'>
                        <img src={book} alt="book" />
                        <h3>Art Book</h3>
                    </Link>
                    <Link to=""  className='link basket'>
                        <img src={basket} alt="basket" />
                        <h3>Shop</h3>
                    </Link>
                </div>
            </div>
            <Newsletter />
            <img className='classic-star' src={starPurple} alt="background decoration" />
            <img className='reverse-star' src={starPurple} alt="" />
            <img className='background-star' src={starBackground} alt="" />
            <div className='background-filter' />
            <div className='elipse-header' />
            <div className='elipse-footer' />
            <div className='elipse-footer-blue' />
        </StyledHome>
    )
}
