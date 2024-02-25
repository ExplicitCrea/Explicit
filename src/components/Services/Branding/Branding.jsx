import StyledBranding from "./StyledBranding";
import display1 from "../../../assets/services/branding/display1.webp";
import display2 from "../../../assets/services/branding/display2.webp"
import display3 from "../../../assets/services/branding/display3.webp"
import display4 from "../../../assets/services/branding/display4.webp"
import display5 from "../../../assets/services/branding/display5.webp"
import display6 from "../../../assets/services/branding/display6.webp"
import display7 from "../../../assets/services/branding/display7.webp"
import display8 from "../../../assets/services/branding/display8.webp"
import logo from "../../../assets/services/branding/logo.webp"
import logo2 from "../../../assets/services/branding/logo2.webp"
import { useState, useCallback } from 'react';
import { throttle } from '../../../utils/throttle';
import { useTranslation } from 'react-i18next';


export const Branding = () => {
  const { t } = useTranslation();

  const [style, setStyle] = useState({
    d3: `perspective(1000px) rotateX(-0.71deg) rotateY(27.5deg) scale3d(1, 1, 1)`,
    d4: `perspective(1000px) rotateX(-0.71deg) rotateY(27.5deg) scale3d(1, 1, 1)`,
    d6: `perspective(1000px) rotateX(-0.71deg) rotateY(27.5deg) scale3d(1, 1, 1)`,
    d5: `perspective(1000px) rotateX(-0.71deg) rotateY(27.5deg) scale3d(1, 1, 1)`,
    d2: `perspective(1000px) rotateX(-0.71deg) rotateY(-27.5deg) scale3d(1, 1, 1)`,
    d1: `perspective(1000px) rotateX(-0.71deg) rotateY(-27.5deg) scale3d(1, 1, 1)`,
    d7: `perspective(1000px) rotateX(-0.71deg) rotateY(-27.5deg) scale3d(1, 1, 1)`,
    d8: `perspective(1000px) rotateX(-0.71deg) rotateY(-27.5deg) scale3d(1, 1, 1)`,
  });
  const left = ['d3', 'd4', 'd6', 'd5']

  const onMouseMove = useCallback(throttle((e, name) => {
      const card = e.currentTarget;
      const box = card.getBoundingClientRect();
      const x = e.clientX - box.left;
      const y = e.clientY - box.top;
      const centerX = box.width / 2;
      const centerY = box.height / 2;
      const rotateX = (y - centerY) / 4;
      const rotateY = (centerX - x) / 4;
      setStyle({...style, [name]: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${ left.includes(name) ? rotateY : -rotateY}deg) scale3d(1, 1, 1)`})
    }, 100),
    []
  )

  const onMouseLeave = (name) => {
    setStyle({...style, [name]: `perspective(1000px) rotateX(-0.71deg) rotateY(${ left.includes(name) ? '27.5' : '-27.5'}deg) scale3d(1, 1, 1)`});
  }

  const trans = "all 400ms cubic-bezier(0.03, 0.98, 0.52, 0.99) 0s"

  return (
    <StyledBranding >
      <div className='text-container'>
        <h1>Branding</h1>
        <p>{t("branding.description")}</p>
      </div>
      <div className="poster-container">
        <div className="little-poster">
          <img style={{transform: style.d3, transition: trans}} onMouseMove={(e) => onMouseMove(e, 'd3')} onMouseLeave={() => onMouseLeave('d3')} src={display3} alt="wrldmag poster"/>
          <img style={{transform: style.d4, transition: trans}} onMouseMove={(e) => onMouseMove(e, 'd4')} onMouseLeave={() => onMouseLeave('d4')} src={display4} alt="wrldmag poster"/>
          <img style={{transform: style.d6, transition: trans}} onMouseMove={(e) => onMouseMove(e, 'd6')} onMouseLeave={() => onMouseLeave('d6')} src={display6} alt="wrldmag poster"/>
        </div>
        <img style={{transform: style.d5, transition: trans}} onMouseMove={(e) => onMouseMove(e, 'd5')} onMouseLeave={() => onMouseLeave('d5')} className="big-poster left" src={display5} alt="wrldmag poster"/>
        <img className="logo" src={logo} alt="wrldmag logo"/>
        <img style={{transform: style.d2, transition: trans}} onMouseMove={(e) => onMouseMove(e, 'd2')} onMouseLeave={() => onMouseLeave('d2')} className="big-poster right" src={display2} alt="wrldmag poster"/>
        <div className="little-poster">
          <img style={{transform: style.d1, transition: trans}} onMouseMove={(e) => onMouseMove(e, 'd1')} onMouseLeave={() => onMouseLeave('d1')} src={display1} alt="wrldmag poster"/>
          <img style={{transform: style.d7, transition: trans}} onMouseMove={(e) => onMouseMove(e, 'd7')} onMouseLeave={() => onMouseLeave('d7')} src={display7} alt="wrldmag poster"/>
          <img style={{transform: style.d8, transition: trans}} onMouseMove={(e) => onMouseMove(e, 'd8')} onMouseLeave={() => onMouseLeave('d8')} src={display8} alt="wrldmag poster"/>
        </div>
      </div>
      <img className="second-logo" src={logo2} alt="wrldmag logo"/>
    </StyledBranding>
  );
};
