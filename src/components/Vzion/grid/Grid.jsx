import image1 from "../../../assets/vzion/grid/image1.webp";
import image2 from "../../../assets/vzion/grid/image2.webp";
import image3 from "../../../assets/vzion/grid/image3.webp";
import image4 from "../../../assets/vzion/grid/image4.webp";
import image5 from "../../../assets/vzion/grid/image5.webp";
import image7 from "../../../assets/vzion/grid/image7.webp";
import { StyledGrid } from "./StyledGrid";

export const Grid = () => {
  return (
    <StyledGrid>
      <div className="container">
      <img
        src={image4}
        alt="Homme entrain de taper sur le clavier de son ordinateur"
      />
      </div>
      <div className="container">
      <img src={image1} alt="Retour caméra" />
      </div>
      <div className="container">
      <img src={image3} alt="Vu du dessus d'un setup" />
      </div>
      <div className="container">
      <img src={image2} alt="Caméra de cinema" />
      </div>
      <div className="container">
      <img src={image5} alt="Camera de cinema avec retour vidéo" />
      </div>
      <div className="container">
      <img
        src={image7}
        alt="Vu sur une fille devant son ordinateur"
      />
      </div>
    </StyledGrid>
  );
};
