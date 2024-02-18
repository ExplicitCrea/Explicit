import StyledIllustration from './StyledIllustration'
import background from '../../../assets/services/illustration/background.png'
import guill from '../../../assets/services/illustration/guill.png'
import enemi from '../../../assets/services/illustration/enemi.jpg'
import fight from '../../../assets/services/illustration/fight.jpg'
import memo from '../../../assets/services/illustration/memo.jpg'
import ester from '../../../assets/services/illustration/ester.png'
import lildurk from '../../../assets/services/illustration/lildurk.png'
import paltay from '../../../assets/services/illustration/paltay.png'
import rickross from '../../../assets/services/illustration/rickross.png'
import sheffg from '../../../assets/services/illustration/sheffg.png'
import wrld from '../../../assets/services/illustration/wrld.jpg'
import { useTranslation } from 'react-i18next'
import { useRef } from 'react'
import { useIsVisible } from '../../../utils/useIsVisible'

export const Illustration = () => {
  const { t } = useTranslation();
  const ref = useRef(null);
  const isVisible = useIsVisible(ref);
  return (
    <StyledIllustration isVisible={isVisible}>
      <div className='top-container'>
        <div className='text-container'>
          <h1>Illustration</h1>
          <p>{t('illustration.description')}</p>
        </div>
        <img className='background' src={background} alt="top background"/>
        <img className='rickross' src={rickross} alt="rick ross"/>
        <img className='sheffg' src={sheffg} alt="sheffg"/>
      </div>
      <div className='mid-container'>
        <img className='wrld' src={wrld} alt="wrld cast"/>
        <div className='right-banner'>
          <img className='background' src={enemi} alt="mid background"/>
          <img className='background' src={memo} alt="mid background"/>
          <img className='background' src={fight} alt="mid background"/>
          <img className='lildurk' src={lildurk} alt="lilduk"/>
          <img className='ester' src={ester} alt="ester"/>
        </div>
      </div>
      <div className='bottom-container' ref={ref}>
        <img className='paltay' src={paltay} alt="paltay"/>
        <img className='background' src={guill} alt="bottom background"/>
      </div>
    </StyledIllustration>
  )
}
