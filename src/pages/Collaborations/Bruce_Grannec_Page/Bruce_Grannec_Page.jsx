import { Carousel } from "../../../components/Bruce_Grannec/Carousel";
import labelOnSide from "../../../assets/bruce_grannec/label_on_side.webp";
import whiteLogo from "../../../assets/bruce_grannec/white_logo.webp";
import whiteStar from "../../../assets/bruce_grannec/white_star.webp";
import logoFifa from "../../../assets/bruce_grannec/logo-fifa.webp";
import logoFrenchBattle from "../../../assets/bruce_grannec/logo-french-battle.webp";
import twitch from "../../../assets/bruce_grannec/twitch.webp";
import eventPicture from "../../../assets/bruce_grannec/event_picture.webp";
import backgroundMin from "../../../assets/bruce_grannec/background-min.png";
import { StyledPage } from "./StyledBruceGrannec";

export const Bruce_Grannec_Page = () => {
  return (
    <StyledPage>
      <img className="background-min" src={backgroundMin} alt="Background" />
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
          <p>
            Nous sommes fiers d&apos;avoir pu collaborer avec Bruce Grannec en
            fournissant des visuels exceptionnels pour son tournoi en
            collaboration avec FIFA 2023. Notre équipe a conçu des assets animés
            sur mesure pour enrichir son événement. Chaque élément visuel a été
            soigneusement élaboré pour refléter le professionnalisme et
            l&apos;enthousiasme du tournoi, offrant à Bruce Grannec une présence
            visuelle distinctive et immersive sur sa plateforme de streaming.
          </p>
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
