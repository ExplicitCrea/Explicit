import { Player } from "../../../utils/Player";
import diamond from "../../../assets/mahdiba/diamond.webp";
import glasses from "../../../assets/mahdiba/glasses.webp";
import virtualCharacter from "../../../assets/mahdiba/virtual-character.webp";
import tv from "../../../assets/mahdiba/tv.webp";
import virtualGlasses from "../../../assets/mahdiba/virtual-glasses.webp";
import { useTranslation } from "react-i18next";
import { StyledMahdibaMobile } from "./StyledMahdibaMobile";
import video from "../../../assets/mahdiba/Extrait StreamPack Mahdi_ba.webm";



export const MahdibaMobile = () => {
  const { t } = useTranslation();
  return (
    <StyledMahdibaMobile>
      <div className="container">
        <div className="video">
          <Player video={video}/>
        </div>
        <img className="glasses" src={glasses} alt="Lunette de soleil"/>
        <img className="diamond" src={diamond} alt="Diamant" />
        <p>{t("mahdiba.paragraph")}</p>
        <div className="virtual-characte-and-tv">
          <img className="virtual-character" src={virtualCharacter} alt="Mahdi Ba virtuel" />
          <img className="tv" src={tv} alt="Télévision virtuel" />
        </div>
        <img className="virtualGlasses" src={virtualGlasses} alt="Lunette de soleil virtuel" />
      </div>
    </StyledMahdibaMobile>
  );
};
