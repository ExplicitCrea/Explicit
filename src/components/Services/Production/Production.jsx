import StyledProduction from './StyledProduction'
import door from '../../../assets/services/production/door.webp'
import door2 from '../../../assets/services/production/door2.webp'
import mainContent1 from '../../../assets/services/production/main-content-1.webp'
import mainContent2 from '../../../assets/services/production/main-content-2.webp'
import mainContent3 from '../../../assets/services/production/main-content-3.webp'
import { useRef } from 'react'
import { useIsVisible } from '../../../utils/useIsVisible'
import useWindowSize from '../../../utils/useWindowSize'

export const Production = () => {
  const ref = useRef(null);
  const isVisible = useIsVisible(ref);
  const isSmallScreen = useWindowSize(900)
  return (
    <StyledProduction isVisible={isVisible} isSmallScreen={isSmallScreen}>
      {/* add h1 to bande du haut */}
      <div className='door-container up'>
        <h1>Production</h1>
        <img className='door' src={door} alt='door' />
      </div>
      <div className='main-container'>
        <img src={mainContent2} alt='production picture' />
        <img className='middle' src={mainContent3} alt='production picture' />
        <img src={mainContent1} alt='production picture' />
      </div>
      <div className='door-container down'>
        <img className='door' src={door2} alt='door' />
      </div>
      <div ref={ref}/>
    </StyledProduction>
  )
}
