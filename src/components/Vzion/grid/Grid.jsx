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
      <img
        src={image4}
        alt="Homme entrain de taper sur le clavier de son ordinateur"
      />
      <img src={image1} alt="Retour caméra" />
      <img src={image3} alt="Vu du dessus d'un setup" />
      <img src={image2} alt="Caméra de cinema" />
      <img src={image5} alt="Camera de cinema avec retour vidéo" />
      <img
        src={image7}
        alt="Vu sur une fille devant son ordinateur de travail"
      />
    </StyledGrid>
  );
};
