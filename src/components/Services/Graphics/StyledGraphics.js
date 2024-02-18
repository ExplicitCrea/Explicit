import styled from 'styled-components'

const StyledGraphics = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 1;
  h1{
    font-size: 4vw;
    text-align: center;
    margin: 24px 0 0 0;
  }
  p{
    font-size: 1vw;
    text-align: center;
    width: 70%;
  }

  
  .video-container{
    width: 80%;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    .video{
      width: 100%;
      height: auto;
      max-width: 1200px;
      aspect-ratio: 16 / 9;
      border-radius: 24px;
      overflow: hidden;
    }

    .icon{
      position: absolute;
      width: 15%;
      top: 5%;
      left: -7%;
      height: auto;
      max-width: 400px;
      margin: 0 12px;
    }
    .banner{
      position: absolute;
      top: -6%;
      right: -10%;
      width: 25%;
      height: auto;
      max-width: 400px;
      margin: 0 12px;
    }
    .frame{
      position: absolute;
      bottom: -20%;
      right: -10%;
      width: 25%;
      height: auto;
      max-width: 400px;
      margin: 0 12px;
    }
  }

  @media (max-width: 900px) {
    h1{
      font-size: 36px;
    }
    p{
      font-size: 13px;
      width: 90%;
      text-align: justify;
    }
  }
`

export default StyledGraphics