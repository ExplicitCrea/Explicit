import ReactPlayer from "react-player";
import diamond from "../../../assets/mahdiba/diamond.png";
import glasses from "../../../assets/mahdiba/glasses.png";
import virtualCharacter from "../../../assets/mahdiba/virtual-character.png";
import tv from "../../../assets/mahdiba/tv.png";
import virtualGlasses from "../../../assets/mahdiba/virtual-glasses.png";
import { useTranslation } from "react-i18next";
import { StyledMahdibaDesktop } from "./StyledMahdibaDesktop";

export const MahdibaDesktop = () => {
  const { t } = useTranslation();

  return (
    <StyledMahdibaDesktop>
      <div className="container">
        <div className="video">
          <div className="wrapper">
            <ReactPlayer
              width="100%"
              height="100%"
              url="https://www.youtube.com/watch?v=LXb3EKWsInQ"
            />
            <img className="virtual-character" src={virtualCharacter} alt="" />
            <img className="glasses" src={glasses} alt="" />
            <img className="diamond" src={diamond} alt="" />
          </div>
        </div>
        <div className="third-container">
          <div className="second-wrapper">
            <img className="virtual-glasses" src={virtualGlasses} alt="" />
            <p>{t("mahdiba.paragraph")}</p>
            <img className="tv" src={tv} alt="" />
          </div>
        </div>
      </div>
    </StyledMahdibaDesktop>
  );
};
