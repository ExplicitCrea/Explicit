import { Player } from "../../../utils/Player";
import diamond from "../../../assets/mahdiba/diamond.webp";
import glasses from "../../../assets/mahdiba/glasses.webp";
import virtualCharacter from "../../../assets/mahdiba/virtual-character.webp";
import tv from "../../../assets/mahdiba/tv.webp";
import virtualGlasses from "../../../assets/mahdiba/virtual-glasses.webp";
import { useTranslation } from "react-i18next";
import { StyledMahdibaDesktop } from "./StyledMahdibaDesktop";
import video from "../../../assets/mahdiba/Extrait StreamPack Mahdi_ba.webm";

export const MahdibaDesktop = () => {
  const { t } = useTranslation();

  return (
    <StyledMahdibaDesktop>
      <div className="container">
        <div className="video">
          <div className="wrapper">
            <Player video={video}/>
            <img className="virtual-character" src={virtualCharacter} alt="Mahdi Ba virtuel" />
            <img className="glasses" src={glasses} alt="Lunette de soleil" />
            <img className="diamond" src={diamond} alt="Diamant" />
          </div>
        </div>
        <div className="third-container">
          <div className="second-wrapper">
            <img className="virtual-glasses" src={virtualGlasses} alt="Lunette de soleil virtuel" />
            <p>{t("mahdiba.paragraph")}</p>
            <img className="tv" src={tv} alt="Télévision virtuel" />
          </div>
        </div>
      </div>
    </StyledMahdibaDesktop>
  );
};
