import video1 from "../../assets/vzion/video1.jpg";
import video2 from "../../assets/vzion/video2.jpg";
import video3 from "../../assets/vzion/video3.jpg";
import { StyledVzion } from "./StyledVzion";

export const Vzion = () => {
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
              <img src={video1} alt="" />
              <img src={video2} alt="" />
              <img src={video3} alt="" />
            </div>
            <div className="text-content">
              <h3>Les tréfonds les plus sombres d’Internet [VOL.2]</h3>
              <p>
                Dans la série "Les Tréfonds les Plus Sombres d’Internet", chaque
                épisode vous plonge dans l'univers mystérieux et souvent
                terrifiant d'Internet. À travers des récits captivants et
                soigneusement recherchés, chaque épisode explore différents
                sujets liés à la face cachée de la toile. Avec une durée moyenne
                de 30 à 40 minutes, chaque épisode est conçu pour tenir en
                haleine les spectateurs et les entraîner dans un voyage sombre
                et inquiétant.
              </p>
              <p>
                Que ce soit des histoires de disparitions mystérieuses liées à
                des forums obscurs, des enquêtes sur des sites web énigmatiques
                aux activités louches, ou encore des explorations de mythes
                modernes propagés par les médias sociaux, "Les Tréfonds les Plus
                Sombres d’Internet" offre aux spectateurs une expérience
                immersive et palpitante.{" "}
              </p>
              <p>
                L'ambiance oppressante et les montées d'horreur saisissantes
                trouvent leur essence dans l'expertise d’Explicit. Chaque scène
                est méticuleusement conçue pour évoquer un sentiment d'effroi,
                chaque son est orchestré pour envoyer des frissons dans
                l'échine. Avec une maîtrise inégalée dans la création de contenu
                horrifique, "Explicit" est le moteur derrière l'intensité
                visuelle et auditive qui fait vibrer chaque épisode.
              </p>
              <button>consulter la vidéo</button>
            </div>
          </div>
        </div>
      </div>
    </StyledVzion>
  );
};
