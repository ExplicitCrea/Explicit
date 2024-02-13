import styled from 'styled-components'

const StyledThreed = styled.section`
  width: 100%;
  height: 67vw;
  background: url('/assets/services/3d/background.png') no-repeat center center;
  background-size: 110% auto;
  padding: 10vw 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 60px 0 0 0;

  p{
    font-size: 1vw;
    text-align: center;
    width: 70%;
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
`

export default StyledThreed