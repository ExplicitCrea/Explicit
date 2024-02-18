import logo from "../../assets/wrldmag/logo.png";
import image1 from "../../assets/wrldmag/image1.png";
import image2 from "../../assets/wrldmag/image2.png";
import image3 from "../../assets/wrldmag/image3.png";
import wrldmagLarge from "../../assets/wrldmag/wrldmag.png";
import bgBottom from "../../assets/wrldmag/bg-bottom.png";
import { useTranslation } from "react-i18next";
import { StyledWrldmag } from "./StyledWrldmag";

export const Wrldmag = () => {

  const {t} = useTranslation()

  return (
    <StyledWrldmag>
      <div className="container">
        <div className="main-wrapper">
          <img src={logo} className="logo" alt="" />
          <p>{t("wrldmag.paragraph")}</p>
        </div>
        <div className="second-wrapper">
          <div className="images-wrapper">
            <img src={image2} className="image-left" alt="" />
            <img src={image1} className="image-center" alt="" />
            <img src={image3} className="image-right" alt="" />
          </div>
            <div className="wrldmag-container">
              <img className="wrldmag-large" src={wrldmagLarge} alt="" />
            </div>
            <div className="bg-bottom">
              <img src={bgBottom} alt="" />
            </div>
          </div>
        </div>
    </StyledWrldmag>
  );
};
