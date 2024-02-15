import styled from 'styled-components'

const StyledStupeflip = styled.section`
  width: 100%;
  background: url('assets/services/stupeflip/background.png') center center no-repeat;
  background-size: cover;
  position: relative;
  z-index: 1;

  h2{
    font-family: lexend;
    font-size: 1.5vw;
    text-align: center;
    color: white;
  }

  .video{
    width: 70%;
    height: auto;
    max-width: 1200px;
    aspect-ratio: 16 / 9;
    border-radius: 24px;
    overflow: hidden;
    margin: 12px 20% 36px 10%;
    border: 4px solid white;
  }

  .character{
    position: absolute;
    bottom: 0px;
    right: 0px;
    width: 30%;
    height: auto;
    -webkit-transform: scaleX(-1);
    transform: scaleX(-1);
  }

  @media (max-width: 900px) {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    h2{
      width: 90%;
      font-size: 18px;
      color: white;
      background-color: rgba(0, 0, 0, 0.5);
      backdrop-filter: blur(10px);
      padding: 3px 3px;
      border-radius: 12px;
    }
    .video{
      width: 90%;
      margin: 12px 5% 36px 5%;
      border: 2px solid white;
    }
    .character{
      display: none;
    }
  }
`

export default StyledStupeflip
