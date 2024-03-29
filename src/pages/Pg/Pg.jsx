import ReactPlayer from 'react-player'
import StyledPg from './StyledPg'
import pp from '../../assets/pg/pp.webp'
import maf from '../../assets/pg/maf.webp'
import { useTranslation } from 'react-i18next'

export const Pg = () => {
    const { t } = useTranslation()
    return (
        <StyledPg>
            <div className='global'>
                <div className='presentation'>
                    <img src={pp} alt="photo profil" />
                    <div className='text'>
                        <h1>
                            PROFESSION
                            <span>GANGSTER</span>
                        </h1>
                        <p>{t('pg.description')}</p>
                    </div>
                </div>
                <div className='examples'>
                    <div className='container'>
                        <div className='video'>
                            <ReactPlayer width='100%' height='100%' url='https://youtu.be/JmCJ09jtXm4' controls={true}/>
                        </div>
                        <div className='video'>
                            <ReactPlayer width='100%' height='100%' url='https://youtu.be/FSmdu4edODE' controls={true}/>
                        </div>
                    </div>
                    <div className='container'>
                        <div className='video'>
                            <ReactPlayer width='100%' height='100%' url='https://youtu.be/2iA7idY8bds' controls={true}/>
                        </div>
                        <div className='video'>
                            <ReactPlayer width='100%' height='100%' url='https://youtu.be/EDgTQt3AmTM' controls={true}/>
                        </div>
                    </div>
                </div>
            </div>
            <img className='deco' src={maf} alt="deco" />
        </StyledPg>
    )
}
