import { useEffect, useState } from "react";
import { DisplayContent } from "../../components/Vzion/DisplayContent";
import { CompareSlider } from "../../components/Vzion/CompareSlider.jsx/CompareSlider";
import { Grid } from "../../components/Vzion/grid/Grid";
import video1 from "../../assets/vzion/video1.webp";
import video2 from "../../assets/vzion/video2.webp";
import video3 from "../../assets/vzion/video3.webp";
import before from "../../assets/vzion/compare-slider/before.webp";
import after from "../../assets/vzion/compare-slider/after.webp";
import { useTranslation } from "react-i18next";
import useWindowSize from "../../utils/useWindowSize";
import { StyledVzion } from "./StyledVzion";

export const Vzion = () => {
  const [videoClick, setVideoClick] = useState("video1");
  const [isActive, setIsActive] = useState(false);
  const isSmallScreen = useWindowSize(1000);
  const { t } = useTranslation();

  useEffect(() => {
    if (isSmallScreen) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  }, [isSmallScreen]);

  const OpenLink = (video) => {
    if (isActive) {
      window.open(t(`vzion.${video}`)[0].link, "_blank", "noopener noreferrer");
    } else {
      return;
    }
  };

  const hover_pseudo = (e,action) => {
    let target = e.target.parentNode.querySelector(".pseudo_elem");
    if(action === "in"){
      target.classList.add("hover");
    }else{
      target.classList.remove("hover");
    }
  }

  return (
    <StyledVzion>
      <div className="main-wrapper">
        <div className="title">
          <h2>VZION</h2>
          <p>{t("vzion.title.paragraph")}</p>
        </div>
        <div className="second-wrapper">
          <div className="videos-vignettes">
            <div className="pseudo_elem_wrapper">
            <img
              src={video1}
              className="video1"
              onClick={() => {
                setVideoClick("video1");
                OpenLink("video1");
              }}
              onMouseOver={(e) => hover_pseudo(e,"in")} 
              onMouseOut={(e) => hover_pseudo(e,"out")}
              alt="Miniature vidéo: Les tréfonds les plus SOMBRES d’Internet"
            />
            <div className="pseudo_elem"></div>
            </div>
            <div className="pseudo_elem_wrapper">
            <img
              src={video2}
              className="video2"
              onClick={() => {
                setVideoClick("video2");
                OpenLink("video2");
              }}
              onMouseOver={(e) => hover_pseudo(e,"in")} 
              onMouseOut={(e) => hover_pseudo(e,"out")}
              alt="Miniature vidéo: 160 ans de prison pour avoir imité des scènes de GTA dans la vraie vie"
            />
            <div className="pseudo_elem"></div>
            </div>
            <div className="pseudo_elem_wrapper">
            <img
              src={video3}
              className="video3"
              onClick={() => {
                setVideoClick("video3");
                OpenLink("video3");
              }}
              onMouseOver={(e) => hover_pseudo(e,"in")} 
              onMouseOut={(e) => hover_pseudo(e,"out")}
              alt="Miniature vidéo: La SECTE qui recrutait à travers un JEU VIDÉO : Kanye Quest 3030"
            />
            <div className="pseudo_elem"></div>
            </div>
          </div>
          <DisplayContent videoClick={videoClick} />
        </div>
      </div>
      <div className="tertiary-wrapper">
        <CompareSlider before={before} after={after} />
        <p>{t("vzion.tertiary-wrapper.paragraph")}</p>
      </div>
      <div className="quaternary-wrapper">
        <p>{t("vzion.quaternary-wrapper.paragraph")}</p>
        <Grid />
      </div>
    </StyledVzion>
  );
};
