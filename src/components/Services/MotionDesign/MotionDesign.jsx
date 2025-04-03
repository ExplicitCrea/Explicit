import { useTranslation } from 'react-i18next';
import StyledMotionDesign from './StyledMotionDesign';
import { Player } from "../../../utils/Player.jsx";
import etoile from '../../../assets/services/etoile.webp';
import video from "../../../assets/services/motion_design.webm";

export const MotionDesign = () => {
    const { t } = useTranslation()
    return (
        <StyledMotionDesign>
            <h1>Motion Design</h1>
            <p>{t('services.motion')}</p>
            <Player video={video}/>
            <img className="etoile" src={etoile} alt='etoile' />
        </StyledMotionDesign>
    )
}
