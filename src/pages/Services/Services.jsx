import { useTranslation } from "react-i18next";
import StyledServices from "./StyledServices";
import { VideoEditing } from "../../components/Services/VideoEditing/VideoEditing";
import { Branding } from "../../components/Services/Branding/Branding";
import video from "../../assets/background1-services.png";
import { MotionDesign } from '../../components/Services/MotionDesign/MotionDesign';
import { Stupeflip } from "../../components/Services/Stupeflip/Stupeflip";
import { Production } from "../../components/Services/Production/Production";
import { Audio } from "../../components/Services/Audio/Audio";
import { Graphics } from '../../components/Services/Graphics/Graphics';
import { Threed } from '../../components/Services/3d/Threed';

export const Services = () => {
  const { t } = useTranslation();
  return (
    <StyledServices>
      <h1 className="title">Services</h1>
      <p className="description">{t("services.subtitle")}</p>
      <VideoEditing />
      <Branding />
      <MotionDesign/>
      <Stupeflip/>
      <Production/>
      <Graphics/>
      <Threed/>
      <Audio/>
      <div className="linear-background" />
      <div className="video-container-background">
        <img className="video-background" src={video} alt="background" />
      </div>
    </StyledServices>
  );
};
