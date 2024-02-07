import { Carousel } from "../../components/bruce-grannec/Carousel";
import labelOnSide from "../../assets/bruce-grannec/main-page/label_on_side.webp";
import whiteLogo from "../../assets/bruce-grannec/main-page/white_logo.webp";
import whiteStar from "../../assets/bruce-grannec/main-page/white_star.webp";
import logoFifa from "../../assets/bruce-grannec/main-page/logo-fifa.webp";
import logoFrenchBattle from "../../assets/bruce-grannec/main-page/logo-french-battle.webp";
import twitch from "../../assets/bruce-grannec/main-page/twitch.webp";
import eventPicture from "../../assets/bruce-grannec/main-page/event_picture.webp";
import backgroundXl from "../../assets/bruce-grannec/main-page/background/background-xl.webp";
import backgroundMin from "../../assets/bruce-grannec/main-page/background/background-min.webp";
import { useTranslation } from "react-i18next";
import { StyledPage } from "./StyledBruceGrannec";

export const Bruce_Grannec_Page = () => {
  const { t } = useTranslation();

  return (
    <StyledPage>
      <img
        srcSet={`${backgroundXl} 2500w, ${backgroundMin} 800w`}
        sizes="(max-width: 1000px) 800px"
        src={backgroundXl}
        alt="Background"
        className="background"
      />
      <div className="container">
        <div className="label-on-side">
          <img src={labelOnSide} alt="Label on side" />
        </div>
        <div className="banner">
          <div className="background-banner">
            <div className="banner-items">
              <img className="logo-fifa" src={logoFifa} alt="Fifa logo" />
              <img
                className="logo-french-battle"
                src={logoFrenchBattle}
                alt="Logo French Battle"
              />
              <img className="twitch" src={twitch} alt="Twitch Bruce Grannec" />
            </div>
          </div>
        </div>
        <div className="paragraph_container">
          <p>{t("bruce-grannec.paragraph")}</p>
        </div>
        <div className="explicit-container">
          <img
            className="white-star"
            src={whiteStar}
            alt="White Logo Explicite"
          />
          <img
            className="white-logo"
            src={whiteLogo}
            alt="White Star Explicite"
          />
        </div>
        <div className="event-container">
          <img src={eventPicture} alt="Event Picture" />
        </div>
        <div className="carousel-container">
          <Carousel />
        </div>
      </div>
    </StyledPage>
  );
};
