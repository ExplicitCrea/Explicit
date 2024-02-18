import ReactPlayer from 'react-player'
import StyledStupeflip from './StyledStupeflip'
import character from '../../../assets/services/stupeflip/character.png'
import { useTranslation } from 'react-i18next';
import { useRef } from 'react';
import { useIsVisible } from '../../../utils/useIsVisible';

export const Stupeflip = () => {
  const { t } = useTranslation();
  const ref = useRef(null);
  const isVisible = useIsVisible(ref);
  return (
    <StyledStupeflip isVisible={isVisible}>
      <h2>{t('stupeflip.title')}</h2>
      <div className='video'>
          <ReactPlayer width='100%' height='100%' url='https://youtu.be/zsxnS21Wgm4' />
      </div>
      <img className='character' src={character} alt='character' />
      <div className='background-filter'/>
      <div ref={ref}/>
    </StyledStupeflip>
  )
}
