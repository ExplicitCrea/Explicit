import { useTranslation } from 'react-i18next'
import StyledMotionDesign from './StyledMotionDesign'
import ReactPlayer from 'react-player'

export const MotionDesign = () => {
    const { t } = useTranslation()
    return (
        <StyledMotionDesign>
            <h1>Motion Design</h1>
            <p>{t('services.motion')}</p>
            <ReactPlayer url='https://www.youtube.com/watch?v=LXb3EKWsInQ' />
        </StyledMotionDesign>
    )
}
