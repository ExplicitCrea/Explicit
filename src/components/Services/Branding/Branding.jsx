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
import { useState, useCallback } from 'react';
import { throttle } from '../../../utils/throttle';
import { useTranslation } from 'react-i18next';


export const Branding = () => {
  const { t } = useTranslation();
  const [rotate, setRotate] = useState({x: -0.71, y: 27.5});

  const onMouseMove = useCallback(throttle((e) => {
      const card = e.currentTarget;
      const box = card.getBoundingClientRect();
      const x = e.clientX - box.left;
      const y = e.clientY - box.top;
      const centerX = box.width / 2;
      const centerY = box.height / 2;
      const rotateX = (y - centerY) / 11;
      const rotateY = (centerX - x) / 11;

      setRotate({x: rotateX, y: rotateY});
    }, 100),
    []
  )

  const onMouseLeave = () => {
    setRotate({x: -0.71, y: 27.5});
  }

  const stylePosterLeft = {
    transform: `perspective(1000px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg) scale3d(1, 1, 1)`,
    transition: "all 400ms cubic-bezier(0.03, 0.98, 0.52, 0.99) 0s",
  }

  const stylePosterRight = {
    transform: `perspective(1000px) rotateX(${rotate.x}deg) rotateY(${-rotate.y}deg) scale3d(1, 1, 1)`,
    transition: "all 400ms cubic-bezier(0.03, 0.98, 0.52, 0.99) 0s",
  }

  return (
    <StyledBranding onMouseMove={onMouseMove} onMouseLeave={onMouseLeave}>
      <div className='text-container'>
        <h1>Branding</h1>
        <p>{t("branding.description")}</p>
      </div>
      <div className="poster-container">
        <div className="little-poster">
          <img style={stylePosterLeft} src={display3} alt="wrldmag poster"/>
          <img style={stylePosterLeft} src={display4} alt="wrldmag poster"/>
          <img style={stylePosterLeft} src={display6} alt="wrldmag poster"/>
        </div>
        <img style={stylePosterLeft} className="big-poster" src={display5} alt="wrldmag poster"/>
        <img className="logo" src={logo} alt="wrldmag logo"/>
        <img style={stylePosterRight} className="big-poster" src={display2} alt="wrldmag poster"/>
        <div className="little-poster">
          <img style={stylePosterRight} src={display1} alt="wrldmag poster"/>
          <img style={stylePosterRight} src={display7} alt="wrldmag poster"/>
          <img style={stylePosterRight} src={display8} alt="wrldmag poster"/>
        </div>
      </div>
      <img className="second-logo" src={logo2} alt="wrldmag logo"/>
    </StyledBranding>
  );
};
