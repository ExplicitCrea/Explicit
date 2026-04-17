import { useState } from 'react';
import StyledCard from './StyledCard'
import { FaPlay, FaPause } from "react-icons/fa";

export const Card = ({name, file, onLoad}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [audio] = useState(new Audio(file));

  const playAudio = () => {
    audio.play();
    setIsPlaying(true);
  }

  const pauseAudio = () => {
    audio.pause();
    audio.currentTime = 0
    setIsPlaying(false);
  }

  audio.onended = () => {
    setIsPlaying(false);
  }

  onLoad(audio, setIsPlaying);//send the audio and the setIsPlaying function to the parent component

  return (
    <StyledCard>
      <div className='container-name'>
        <h1>{name}</h1>
      </div>
      <button onClick={() => isPlaying ? pauseAudio() : playAudio()}>{isPlaying ? <FaPause /> : <FaPlay /> } Demo</button>
    </StyledCard>
  )
}
