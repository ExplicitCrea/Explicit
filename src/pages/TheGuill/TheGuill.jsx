import StyledTheGuill from './StyledTheGuill'
import ReactPlayer from 'react-player'
import Icon1 from '../../assets/theguill/icon1.png'
import Icon2 from '../../assets/theguill/icon2.png'
import Icon3 from '../../assets/theguill/icon3.png'
import Icon4 from '../../assets/theguill/icon4.png'
import Icon5 from '../../assets/theguill/icon5.png'
import Icon6 from '../../assets/theguill/icon6.png'
import Logo from '../../assets/theguill/logo.jpg'
import insta from '../../assets/theguill/insta.png'
import background from '../../assets/theguill/background.png'
import planning from '../../assets/theguill/planning.png'
import razer from '../../assets/theguill/razer.png'
import discord from '../../assets/theguill/discord.png'
import { useTranslation } from "react-i18next";

export const TheGuill = () => {
const { t } = useTranslation();
return (
    <StyledTheGuill>
        <p>
            {t("guill.paragraph")}
        </p>
        <div className='container'>
            <div className='video'>
                <ReactPlayer width='100%' height='100%' url='https://youtu.be/JmCJ09jtXm4' />
            </div>
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
            <div className='pannels'>
                <img src= {insta} alt='pannel' className='insta'/>
                <img src= {planning} alt='planning' className='planning'/>
            </div>
            <div className='pannels2'>
                <img src={razer} alt='razer' className='razer'/>
                <img src={discord} alt='discord' className='discord'/>
            </div>
        </div>
        <img src={Logo} alt='logo' className='logo' />
        <img src={background} alt='background' className='background' />
    </StyledTheGuill>
)
}
