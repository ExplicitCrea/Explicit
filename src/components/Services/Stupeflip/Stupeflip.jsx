import ReactPlayer from 'react-player'
import StyledStupeflip from './StyledStupeflip'
import character from '../../../assets/services/stupeflip/character.png'

export const Stupeflip = () => {
  return (
    <StyledStupeflip>
      <h2>Nous Pouvons aussi leurs donné vie !</h2>
      <div className='video'>
          <ReactPlayer width='100%' height='100%' url='https://www.youtube.com/watch?v=LXb3EKWsInQ' />
      </div>
      <img className='character' src={character} alt='character' />
      <div className='background-filter'/>
    </StyledStupeflip>
  )
}
