import StyledNotification from './StyledNotification'
import { useTranslation } from 'react-i18next';

export const Notification = () => {
  const {t} = useTranslation();

  let toggle_txt = (e) => {
    let target = e.target.parentNode.querySelector(".text");
    target.classList.toggle("hover");
  }
  let goto_facture = () => {
    document.location = "facture.explicitcrea.com";
  }

  return (
    <StyledNotification>
      <div className='wrapper'>
        <div className='text'>
          <h1>{t('home.notification.title')}</h1>
          <p>{t('home.notification.description')}</p>
        </div>
        <button className='call' onMouseOver={(e) => {toggle_txt(e)}} onMouseLeave={(e) => {toggle_txt(e)}}>
          <div></div>
        </button>
      </div>
    </StyledNotification>
  )
}
