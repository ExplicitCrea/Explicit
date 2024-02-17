import { Newsletter } from '../../components/Home/Newsletter/Newsletter'
import StyledHome from './StyledHome'
import star from '../../assets/star.png'
import book from '../../assets/book.png'
import basket from '../../assets/basket.png'
import starBackground from '../../assets/star-background.png'
import starPurple from '../../assets/star-purple.png'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { FaArrowAltCircleDown } from "react-icons/fa";
import { useRef } from 'react'

export const Home = () => {
    const ref = useRef(null);
    const {t} = useTranslation();

    const handleScroll = () => {
        window.scrollTo({
        top: (ref.current.offsetTop - 80),
        behavior: 'smooth'
        });
    }

    const parallax = (e) => {
        const star1 = document.querySelectorAll('.classic-star');
        const star2 = document.querySelectorAll('.reverse-star');
        star1.forEach(star => {
            const clientX = e.clientX
            const clientY = e.clientY
            const width = window.innerWidth / 2
            const height = window.innerHeight / 2
            const x = (clientX - width) * 0.015
            const y = (clientY - height) * 0.015
            star.style.transform = `translateX(${x}px) translateY(${y}px)`
        })
        star2.forEach(star => {
            const clientX = e.clientX
            const clientY = e.clientY
            const width = window.innerWidth / 2
            const height = window.innerHeight / 2
            const x = (clientX - width) * 0.01
            const y = (clientY - height) * 0.01
            star.style.transform = `translateX(${x}px) translateY(${y}px)`
        })
    }

    document.addEventListener("mousemove", parallax);


    return (
        <StyledHome>
            <h1>
                {t('home.title.main')} <span>{t('home.title.secondary')}</span> ?
            </h1>
            <p>
                {t('home.description')}
            </p>
            <div onClick={handleScroll} className='scroll-container'>
                <h2>{t('home.subtitle')}</h2>
                <FaArrowAltCircleDown />
            </div>
            <div ref={ref} className='menu-container'>
                <div className='link-container'>
                    <Link to="/services" className='link star'>
                        <img src={star} alt="star" />
                        <h3>Services</h3>
                    </Link>
                    <Link to="/contact" className='link contact'>
                        <h3>Contact</h3>
                    </Link>
                    <Link to="/history" className='link history'>
                        <h3>{t('header.history')}</h3>
                    </Link>
                </div>
                <div className='link-container'>
                    <Link to="/artbook"  className='link book'>
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
