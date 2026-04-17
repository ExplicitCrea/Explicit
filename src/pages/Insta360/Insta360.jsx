import AceProTwo from "../../assets/insta360/Ace-Pro-2.webp";
import fleche from "../../assets/insta360/fleche.webp";
import ads from "../../assets/insta360/The_Real_Pro-Our_Next_Camera.webm";

import { Player } from "../../utils/Player";
import { StyledInsta } from "./StyledInsta.js";

export const Insta360 = () => {
//   const {t} = useTranslation();


  return (
    <StyledInsta>
        <div className="information">
            <span>
                Nous sommes fier d&apos;avoir pu participer à la conception 3D<br></br>du trailer de la camera Insta 360 AcePro 2 !
            </span>
            <Player video={ads} />
        </div>
        <div className="flotant">
            <img src={AceProTwo} alt="camera" />
            <img src={fleche} alt="fleche" />
            <span>Insta360 AcePro 2</span>
        </div>
    </StyledInsta>
  );
};
