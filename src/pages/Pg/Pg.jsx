import ReactPlayer from 'react-player'
import StyledPg from './StyledPg'
import pp from '../../assets/pg/pp.png'
import maf from '../../assets/pg/maf.png'

export const Pg = () => {
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
                        <p>Explicit accompagne le créateur de contenu PROFESSION GANGSTER dans sa direction artistique.</p>
                    </div>
                </div>
                <div className='examples'>
                    <div className='container'>
                        <div className='video'>
                            <ReactPlayer width='100%' height='100%' url='https://youtu.be/JmCJ09jtXm4' />
                        </div>
                        <div className='video'>
                            <ReactPlayer width='100%' height='100%' url='https://youtu.be/FSmdu4edODE' />
                        </div>
                    </div>
                    <div className='container'>
                        <div className='video'>
                            <ReactPlayer width='100%' height='100%' url='https://youtu.be/2iA7idY8bds' />
                        </div>
                        <div className='video'>
                            <ReactPlayer width='100%' height='100%' url='https://youtu.be/EDgTQt3AmTM' />
                        </div>
                    </div>
                </div>
            </div>
            <img className='deco' src={maf} alt="deco" />
        </StyledPg>
    )
}
