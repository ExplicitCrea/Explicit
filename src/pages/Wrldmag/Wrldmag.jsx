import logo from "../../assets/wrldmag/logo.png";
import image1 from "../../assets/wrldmag/image1.png";
import image2 from "../../assets/wrldmag/image2.png";
import image3 from "../../assets/wrldmag/image3.png";
import wrldmag from "../../assets/wrldmag/wrldmag.png";
import bgBottom from "../../assets/wrldmag/bg-bottom.png";
import { StyledWrldmag } from "./StyledWrldmag";

export const Wrldmag = () => {
  return (
    <StyledWrldmag>
      <div className="container">
        <div className="main-wrapper">
          <img src={logo} className="logo" alt="" />
          <p>
            Nous sommes fiers d'avoir collaboré avec WRLD Mag, un média
            spécialisé dans la culture musicale d’outre-Atlantique et française.
            Notre équipe a eu la chance de pouvoir réaliser des vidéos ensemble,
            d’élaborer une identité visuelle et de produire du contenu.
            Ensemble, nous avons donné vie à la vision artistique de WRLD Mag,
            créant une expérience visuelle mémorable et immersive pour leur
            public passionné de musique
          </p>
        </div>
        <div className="second-wrapper">
          <img src={image2} className="image-left" alt="" />
          <img src={image1} className="image-center" alt="" />
          <img src={image3} className="image-right" alt="" />
        <div className="wrldmag">
          <img src={wrldmag} alt="" />
        </div>
        </div>
        <div className="third-wrapper">
          <div className="bg-bottom">
            <img src={bgBottom} alt="" />
          </div>
        </div>
      </div>
    </StyledWrldmag>
  );
};
