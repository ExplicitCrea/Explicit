import styled from 'styled-components'

const StyledGraphics = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
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
      margin: 12px 0 0 0;
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
`

export default StyledGraphics