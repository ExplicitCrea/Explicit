import { useTranslation } from 'react-i18next'
import StyledMotionDesign from './StyledMotionDesign'
import ReactPlayer from 'react-player'

export const MotionDesign = () => {
    const { t } = useTranslation()
    return (
        <StyledMotionDesign>
            <h1>Motion Design</h1>
            <p>{t('services.motion')}</p>
            <div className='video'>
                <ReactPlayer width='100%' height='100%' url='https://www.youtube.com/watch?v=LXb3EKWsInQ' />
            </div>
        </StyledMotionDesign>
    )
}
