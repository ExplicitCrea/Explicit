import ReactPlayer from "react-player";
import diamond from "../../../assets/mahdiba/diamond.png";
import glasses from "../../../assets/mahdiba/glasses.png";
import virtualCharacter from "../../../assets/mahdiba/virtual-character.png";
import tv from "../../../assets/mahdiba/tv.png";
import virtualGlasses from "../../../assets/mahdiba/virtual-glasses.png";
import { useTranslation } from "react-i18next";
import { StyledMahdibaMobile } from "./StyledMahdibaMobile";

export const MahdibaMobile = () => {
  const { t } = useTranslation();

  return (
    <StyledMahdibaMobile>
      <div className="container">
        <div className="video">
          <ReactPlayer
            width="100%"
            height="100%"
            url="https://www.youtube.com/watch?v=LXb3EKWsInQ"
          />
        </div>
        <img className="glasses" src={glasses} alt="" />
        <img className="diamond" src={diamond} alt="" />
        <p>{t("mahdiba.paragraph")}</p>
        <div className="virtual-characte-and-tv">
          <img className="virtual-character" src={virtualCharacter} alt="" />
          <img className="tv" src={tv} alt="" />
        </div>
        <img className="virtualGlasses" src={virtualGlasses} alt="" />
      </div>
    </StyledMahdibaMobile>
  );
};
