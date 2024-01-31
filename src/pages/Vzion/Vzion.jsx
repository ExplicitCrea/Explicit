import { useState } from "react";
import { DisplayContent } from "../../components/Vzion/DisplayContent"
import video1 from "../../assets/vzion/video1.jpg";
import video2 from "../../assets/vzion/video2.jpg";
import video3 from "../../assets/vzion/video3.jpg";
import { StyledVzion } from "./StyledVzion";

export const Vzion = () => {

  const [videoClick, setVideoClick] = useState('video1')
  
  
  return (
    <StyledVzion>
      <div className="background">
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
              <img src={video1} onClick={() => setVideoClick('video1')} alt="" />
              <img src={video2} onClick={() => setVideoClick('video2')} alt="" />
              <img src={video3} onClick={() => setVideoClick('video3')} alt="" />
            </div>
            <DisplayContent videoClick={videoClick}/>
          </div>
        </div>
      </div>
    </StyledVzion>
  );
};
