import StyledProduction from './StyledProduction'
import door from '../../../assets/services/production/door.png'
import mainContent1 from '../../../assets/services/production/main-content-1.png'
import mainContent2 from '../../../assets/services/production/main-content-2.png'
import mainContent3 from '../../../assets/services/production/main-content-3.png'

export const Production = () => {
  return (
    <StyledProduction>
      <h1>Production</h1>
      <div className='door-container up'>
        <img className='door' src={door} alt='door' />
      </div>
      <div className='main-container'>
        <img src={mainContent2} alt='production picture' />
        <img src={mainContent3} alt='production picture' />
        <img src={mainContent1} alt='production picture' />
      </div>
      <div className='door-container down'>
        <img className='door' src={door} alt='door' />
      </div>
    </StyledProduction>
  )
}