import ReactPlayer from 'react-player'
import StyledThreed from './StyledThreed'

export const Threed = () => {
  return (
    <StyledThreed>
      <p>
        Des créations 3 dimensionnelles sur mesure, que ce soit de la conception de personnage de décors ou d’environement toute vos idée son a porté de mains, grace a nos services.
      </p>
      <div className='video'>
        <ReactPlayer width='100%' height='100%' url='https://www.youtube.com/watch?v=LXb3EKWsInQ' />
      </div>
    </StyledThreed>
  )
}

