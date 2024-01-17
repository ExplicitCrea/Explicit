import { useTranslation } from 'react-i18next'
import StyledVideoEditing from './StyledVideoEditing'
import ReactPlayer from 'react-player'
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

export const VideoEditing = () => {
    const { t } = useTranslation()
    return (
        <StyledVideoEditing>
            <div>
                <h1>{t('services.editing')}</h1>
                <p>{t('services.video')}</p>
            </div>
            <div>
                <div>
                    <IoIosArrowBack />
                        <ReactPlayer url='https://www.youtube.com/watch?v=LXb3EKWsInQ' />
                    <IoIosArrowForward />
                </div>
                <div>
                    <div>
                        <img src="https://via.placeholder.com/150" alt="placeholder" />
                    </div>
                    <h2>{'titre de la vidéo'}</h2>
                    <p>{'nom de chaine'}</p>
                </div>
            </div>
        </StyledVideoEditing>
    )
}
