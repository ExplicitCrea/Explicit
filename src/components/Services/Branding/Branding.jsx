import StyledBranding from "./StyledBranding";
import display1 from "../../../assets/services/branding/display1.jpg";
import display2 from "../../../assets/services/branding/display2.jpg"
import display3 from "../../../assets/services/branding/display3.png"
import display4 from "../../../assets/services/branding/display4.png"
import display5 from "../../../assets/services/branding/display5.png"
import display6 from "../../../assets/services/branding/display6.png"
import display7 from "../../../assets/services/branding/display7.png"
import display8 from "../../../assets/services/branding/display8.png"
import logo from "../../../assets/services/branding/logo.png"
import logo2 from "../../../assets/services/branding/logo2.png"


export const Branding = () => {
  return (
    <StyledBranding>
      <div className='text-container'>
        <h1>Branding</h1>
        <p>
          Confiez votre présence visuelle a notre service de création. Que vous représentiez une entreprise innovante ou que vous soyez indépendant, notre expertise façonnera vos valeur avec des directions graphiques uniques .
        </p>
      </div>
      <div className="poster-container">
        <div className="little-poster">
          <img src={display3} alt="wrldmag poster"/>
          <img src={display4} alt="wrldmag poster"/>
          <img src={display6} alt="wrldmag poster"/>
        </div>
        <img className="big-poster" src={display5} alt="wrldmag poster"/>
        <img className="logo" src={logo} alt="wrldmag logo"/>
        <img className="big-poster" src={display2} alt="wrldmag poster"/>
        <div className="little-poster">
          <img src={display1} alt="wrldmag poster"/>
          <img src={display7} alt="wrldmag poster"/>
          <img src={display8} alt="wrldmag poster"/>
        </div>
      </div>
      <img className="second-logo" src={logo2} alt="wrldmag logo"/>
    </StyledBranding>
  );
};
