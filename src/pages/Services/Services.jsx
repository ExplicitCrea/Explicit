import { useTranslation } from 'react-i18next'
import StyledServices from './StyledServices'
import { VideoEditing } from '../../components/Services/VideoEditing/VideoEditing'
import { Branding } from '../../components/Services/Branding/Branding'
import { MotionDesign } from '../../components/Services/MotionDesign/MotionDesign'

export const Services = () => {
    const { t } = useTranslation()
    return (
        <StyledServices>
            <h1>Services</h1>
            <p>{t('services.subtitle')}</p>
            <VideoEditing/>
            <Branding/>
            <MotionDesign/>
        </StyledServices>
    )
}
