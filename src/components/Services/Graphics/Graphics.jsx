import ReactPlayer from "react-player"
import StyledGraphics from "./StyledGraphics"
import icon from "../../../assets/services/graphics/icons.webp"
import banner from "../../../assets/services/graphics/banner.webp"
import frame from "../../../assets/services/graphics/frame.webp"
import { useTranslation } from "react-i18next"

export const Graphics = () => {
  const { t } = useTranslation();
  return (
    <StyledGraphics>
      <h1>{t('graphics.title')}</h1>
      <p>{t('graphics.description')}</p>
      <div className="video-container">
        <div className='video'>
            <ReactPlayer width='100%' height='100%' url='https://youtu.be/9f8zeE4-9mQ' controls={true}/>
        </div>
        <img className="icon" src={icon} alt="icon" />
        <img className="banner" src={banner} alt="banner" />
        <img className="frame" src={frame} alt="frame" />
      </div>
    </StyledGraphics>
  )
}
