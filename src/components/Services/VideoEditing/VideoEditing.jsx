import { useTranslation } from 'react-i18next'
import StyledVideoEditing from './StyledVideoEditing'
import ReactPlayer from 'react-player'
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

export const VideoEditing = () => {
    const { t } = useTranslation()
    return (
        <StyledVideoEditing>
            <div className='text-container'>
                <h1>{t('services.editing')}</h1>
                <p>{t('services.video')}</p>
            </div>
            <div className='video-container'>
                <div className='carousel-container'>
                    <IoIosArrowBack />
                        <div className='wrapper'>
                            <ReactPlayer width='100%' height='100%' url='https://www.youtube.com/watch?v=LXb3EKWsInQ' />
                        </div>
                    <IoIosArrowForward />
                </div>
                <div className='title-container'>
                    <div className='image-wrapper'>
                        <img src="https://via.placeholder.com/150" alt="placeholder" />
                    </div>
                    <div className='text-title'>
                        <h2>{'titre de la vidéo'}</h2>
                        <p>{'nom de chaine'}</p>
                    </div>
                </div>
            </div>
        </StyledVideoEditing>
    )
}
