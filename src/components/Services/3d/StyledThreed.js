import styled from 'styled-components'

const StyledThreed = styled.section`
  width: 123%;
  height: 82vw;
  background: url('/assets/services/3d/background.webp') no-repeat center center;
  background-size: 110% auto;
  padding: 10vw 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 60px 0 0 0;
  z-index: 1;

  p{
    font-size: 1.5vw;
    text-align: center;
    width: 60%;
  }

  .video{
    width: 50%;
    height: auto;
    max-width: 1200px;
    aspect-ratio: 16 / 9;
    border-radius: 24px;
    overflow: hidden;
    margin: 12px 0 0 0;
  }

  @media (max-width: 900px) {
    width: 100%;
    padding: 60px 0;
    height: auto;
    background-size: auto 137%;
    p{
      font-size: 13px;
      width: 90%;
    }
    .video{
      width: 80%;
    }
  }
`

export default StyledThreed