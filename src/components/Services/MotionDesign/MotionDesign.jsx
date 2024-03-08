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
                <ReactPlayer width='100%' height='100%' url='https://youtu.be/6li-_LFye3w' controls={true}/>
            </div>
        </StyledMotionDesign>
    )
}
