import ReactPlayer from "react-player"
import StyledGraphics from "./StyledGraphics"
import icon from "../../../assets/services/graphics/icons.png"
import banner from "../../../assets/services/graphics/banner.png"
import frame from "../../../assets/services/graphics/frame.png"

export const Graphics = () => {
  return (
    <StyledGraphics>
      <h1>Asset graphique</h1>
      <p>
        Pour nos créateur de contenue en direct nous avons toute une gamme d’outils graphique adapté au streaming, pour vous permettre de mieux habillé vos contenues.Du simple waiting screen au plus petit détails de mise en forme.
      </p>
      <div>
        <div className='video'>
            <ReactPlayer width='100%' height='100%' url='https://www.youtube.com/watch?v=LXb3EKWsInQ' />
        </div>
        <img src={icon} alt="icon" />
        <img src={banner} alt="banner" />
        <img src={frame} alt="frame" />
      </div>
    </StyledGraphics>
  )
}
