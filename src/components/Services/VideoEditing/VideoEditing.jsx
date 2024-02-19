import { useTranslation } from 'react-i18next'
import StyledVideoEditing from './StyledVideoEditing'
import ReactPlayer from 'react-player'
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { ArrayVideos } from '../../../utils/ArrayServices/ArrayVideos';
import { useState } from 'react';

export const VideoEditing = () => {
    const [index, setIndex] = useState(0);
    const { t } = useTranslation();

    const handleClick = (direction) => {
        const lastIndex = ArrayVideos.length - 1;
        if(lastIndex === index && direction === 'right') return setIndex(0)
        if(0 === index && direction === 'left') return setIndex(lastIndex)
        direction === 'left' ? setIndex(index - 1) : setIndex(index + 1);
    }

    return (
        <StyledVideoEditing>
            <div className='text-container'>
                <h1>{t('services.editing')}</h1>
                <p>{t('services.video')}</p>
            </div>
            <div className='video-container'>
                <div className='carousel-container'>
                    <IoIosArrowBack onClick={() => handleClick('left')} />
                        <div className='wrapper'>
                            <ReactPlayer width='100%' height='100%' url={ArrayVideos[index].url} />
                        </div>
                    <IoIosArrowForward onClick={() => handleClick('right')}/>
                </div>
                <div className='title-container'>
                    <div className='image-wrapper'>
                        <img src={ArrayVideos[index].img} alt="placeholder" />
                    </div>
                    <div className='text-title'>
                        <h2>{ArrayVideos[index].title}</h2>
                        <p>{ArrayVideos[index].name}</p>
                    </div>
                </div>
            </div>
        </StyledVideoEditing>
    )
}
