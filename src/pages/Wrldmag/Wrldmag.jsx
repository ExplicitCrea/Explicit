import logo from "../../assets/wrldmag/logo.webp";
import image1 from "../../assets/wrldmag/image1.webp";
import image2 from "../../assets/wrldmag/image2.webp";
import image3 from "../../assets/wrldmag/image3.webp";
import wrldmagLarge from "../../assets/wrldmag/wrldmag.webp";
import bgBottom from "../../assets/wrldmag/bg-bottom.webp";
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
            <img src={image3} className="image-right" alt="" />
            <img src={image1} className="image-center" alt="" />
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
