import logo from "../../assets/wrldmag/logo.webp";
import image1 from "../../assets/wrldmag/image1.webp";
import image2 from "../../assets/wrldmag/image2.webp";
import image3 from "../../assets/wrldmag/image3.webp";
import wrldmagLarge from "../../assets/wrldmag/wrldmag.webp";
import bgBottom from "../../assets/wrldmag/bg-bottom.webp";
import { useTranslation } from "react-i18next";
import { StyledWrldmag } from "./StyledWrldmag";

export const Wrldmag = () => {
  const canvas = document.createElement("canvas");
  const context = canvas.getContext('2d');
  const {t} = useTranslation()
  const mouseMove = (e) => {//little hover effect
    const logo = e.currentTarget;
    var rect = logo.getBoundingClientRect();
    var relX = e.clientX - rect.left;
    var relY = e.clientY - rect.top;
    if (canvas.id != "adapted") {
      canvas.id = "adapted";
      canvas.width = logo.width;
      canvas.height = logo.height;
      context.drawImage(logo, 0, 0, logo.width, logo.height);
    }
    var data = context.getImageData(relX, relY, 1, 1);
    if (data.data[3] > 30) {
      logo.classList.add("js_hover");
    } else {
      logo.classList.remove("js_hover");
    }
  };
  
  const mouseLeave = (e) => {
    e.currentTarget.classList.remove("js_hover");
  }

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
              <img className="wrldmag-large" src={wrldmagLarge} alt="logo worldmag" onMouseMove = {(e) => mouseMove(e)} onMouseLeave={(e) => mouseLeave(e)}/>
            </div>
            <div className="bg-bottom">
              <img src={bgBottom} alt="" />
            </div>
          </div>
        </div>
    </StyledWrldmag>
  );
};
