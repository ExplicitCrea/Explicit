import ReactPlayer from "react-player";
import diamond from "../../../assets/mahdiba/diamond.png";
import glasses from "../../../assets/mahdiba/glasses.png";
import virtualCharacter from "../../../assets/mahdiba/virtual-character.png";
import tv from "../../../assets/mahdiba/tv.png";
import virtualGlasses from "../../../assets/mahdiba/virtual-glasses.png";
import { StyledMahdibaMobile } from "./StyledMahdibaMobile";

export const MahdibaMobile = () => {
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
          <p>
            Voici notre réalisation pour le streamer et Youtuber "Mahdi Ba": un
            streampack entièrement animé et illustré par nos équipes. Une
            réalisation en 3D qui a demandé beaucoup de technicité et de temps,
            pour un résultat très satisfaisant. Nous sommes extrêmement fiers de
            ce projet, et le client est pleinement satisfait de son expérience
            avec notre équipe.
            <br />
            Nous sommes reconnaissants de la confiance accordée par "Mahdi Ba" et
            espérons pouvoir collaborer à nouveau sur d'autre projets à l'avenir.
          </p>
          <div className="virtual-characte-and-tv">
            <img className="virtual-character" src={virtualCharacter} alt="" />
            <img className="tv" src={tv} alt="" />
          </div>
          <img className="virtualGlasses" src={virtualGlasses} alt="" />
      </div>
    </StyledMahdibaMobile>
  );
};
