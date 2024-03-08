import StyledTheGuill from './StyledTheGuill'
import ReactPlayer from 'react-player'
import Icon1 from '../../assets/theguill/icon1.webp'
import Icon2 from '../../assets/theguill/icon2.webp'
import Icon3 from '../../assets/theguill/icon3.webp'
import Icon4 from '../../assets/theguill/icon4.webp'
import Icon5 from '../../assets/theguill/icon5.webp'
import Icon6 from '../../assets/theguill/icon6.webp'
import Logo from '../../assets/theguill/logo.webp'
import background from '../../assets/theguill/background.webp'
import { useTranslation } from "react-i18next";
import banners from '../../assets/theguill/banners.webp'

export const TheGuill = () => {
const { t } = useTranslation();
return (
    <StyledTheGuill>
        <p>
            {t("guill.paragraph")}
        </p>
        <div className='container'>
            <div className='video'>
                <ReactPlayer width='100%' height='100%' url='https://youtu.be/JmCJ09jtXm4' controls={true}/>
                <div className='icon-right'>
                    <img src={Icon1} alt='icon'/>
                    <img src={Icon2} alt='icon'/>
                    <img src={Icon3} alt='icon'/>
                </div>
                <div className='icon-down'>
                    <img src={Icon4} alt='icon'/>
                    <img src={Icon5} alt='icon'/>
                    <img src={Icon6} alt='icon'/>
                </div>
                <img className='banners' src={banners} alt='banners' />
            </div>
        </div>
        <img src={Logo} alt='logo' className='logo' />
        <img src={background} alt='background' className='background' />
    </StyledTheGuill>
)
}
