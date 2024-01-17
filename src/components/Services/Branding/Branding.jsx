import StyledBranding from './StyledBranding'
import { useTranslation } from 'react-i18next'

export const Branding = () => {
    const { t } = useTranslation()
    return (
        <StyledBranding>
            <h1>Branding</h1>
            <p>{t('services.branding')}</p>
            <div>
                <div>
                    <img src="" alt="" />
                    <img src="" alt="" />
                    <img src="" alt="" />
                </div>
                <img src="" alt="" />
                <img src="" alt="" />
                <img src="" alt="" />
                <div>
                    <img src="" alt="" />
                    <img src="" alt="" />
                    <img src="" alt="" />
                </div>
            </div>
            <img src="" alt="" />
        </StyledBranding>
    )
}
