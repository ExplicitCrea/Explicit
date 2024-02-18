import ReactPlayer from 'react-player'
import StyledThreed from './StyledThreed'
import { useTranslation } from 'react-i18next'

export const Threed = () => {
  const { t } = useTranslation()
  return (
    <StyledThreed>
      <p>{t('threed.description')}</p>
      <div className='video'>
        <ReactPlayer width='100%' height='100%' url='https://youtu.be/KpNqp44Olk0' />
      </div>
    </StyledThreed>
  )
}

