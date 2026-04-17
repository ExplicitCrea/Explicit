import Styled_Mcskyz from './Styled_MckSkyz.js';
import logo from '../../assets/mcskyz/HVF.png';
import {Player} from '../../utils/Player';
import video from '../../assets/mcskyz/Extrait-McSkyz.webm';
import McskyzGif from '../../assets/mcskyz/McSkyz Gif.webm';
import perso1 from '../../assets/mcskyz/perso1.png';
import perso2 from '../../assets/mcskyz/perso2.png';
import youtube from '../../assets/mcskyz/Youtube.png';
import bg_star from "../../assets/STAR_BG.png";

export const Mcskyz = () => {
//   const {t} = useTranslation();

  return (
    <Styled_Mcskyz>
        <img src={logo} className="App-logo" alt="logo" />
        <span>McSkyz raconte des “histoires vraies et flippantes” depuis presque 5 ans. Nous l&apos;accompagnons dans ses réalisations, principalement à travers des accompagnements en 3D qui illustrent l&apos;aspect horrifique de ses vidéos.</span>
        <Player video={video} plus_class={"presentation"}/>
        <Player video={McskyzGif} plus_class={"animation"} />
        <div className="personnages">
            <img src={perso1} alt="personnage 1" />
            <img src={perso2} alt="personnage 2" />
        </div>
        <img src={youtube} alt="youtube" className="youtube" />
        <img src={bg_star} alt="bg_star" className="bg_star" />
        <div className="eclipse top"></div>
        <div className="eclipse bottomL"></div>
        <div className="eclipse bottomR"></div>
    </Styled_Mcskyz>
  );
};