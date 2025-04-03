import StyledPg from './StyledPg'
import pp from '../../assets/pg/pp.webp'
import maf from '../../assets/pg/maf.webp'
import video from '../../assets/pg/Extrait-PG.webm';
import { Player } from '../../utils/Player';
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
                <div className='example'>
                    <Player video={video} />
                </div>
            </div>
            <img className='deco' src={maf} alt="deco" />
        </StyledPg>
    )
}
