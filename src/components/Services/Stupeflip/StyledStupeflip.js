import styled from 'styled-components'

const StyledStupeflip = styled.section`
  width: 100%;
  background: url('assets/services/stupeflip/background.png') center center no-repeat;
  background-size: cover;
  position: relative;

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
`

export default StyledStupeflip
