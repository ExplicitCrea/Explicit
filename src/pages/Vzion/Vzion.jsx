import { useState } from "react";
import { DisplayContent } from "../../components/Vzion/DisplayContent"
import { CompareSlider } from "../../components/Vzion/CompareSlider.jsx/CompareSlider";
import { Grid } from "../../components/Vzion/grid/Grid";
import video1 from "../../assets/vzion/video1.jpg";
import video2 from "../../assets/vzion/video2.jpg";
import video3 from "../../assets/vzion/video3.jpg";
import { StyledVzion } from "./StyledVzion";

export const Vzion = () => {

  const [videoClick, setVideoClick] = useState('video1')
  
  
  return (
    <StyledVzion>
        <div className="main-wrapper">
          <div className="title">
            <h2>VZION</h2>
            <p>
              Créateur de contenu traitant du domaine du mystère sous forme de
              mini-documentaires.
            </p>
          </div>
          <div className="second-wrapper">
            <div className="videos-vignettes">
              <img src={video1} className="video1" onClick={() => setVideoClick('video1')} alt="" />
              <img src={video2} className="video2" onClick={() => setVideoClick('video2')} alt="" />
              <img src={video3} className="video3" onClick={() => setVideoClick('video3')} alt="" />
            </div>
            <DisplayContent videoClick={videoClick}/>
          </div>
        </div>
        <div className="tertiary-wrapper">
          <CompareSlider/>
          <p>Chez Explicit, chaque image est une toile vierge sur laquelle nous appliquons notre expertise en colorimétrie.</p>
        </div>
        <div className="quaternary-wrapper">
          <p>Explicit, c'est bien plus qu'une simple créativité artistique. C'est l'assurance de tournages exécutés avec un matériel professionnel pour vous offrir une expérience visuelle et auditive exceptionnelle.</p>
          <Grid/>
        </div>
    </StyledVzion>
  );
};
