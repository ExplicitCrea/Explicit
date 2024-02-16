import styled from 'styled-components'

const StyledMotionDesign = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 24px 0;
  h1{
      font-size: 4vw;
      text-align: center;
      margin: 0;
  }
  p{
      width: 60%;
      font-size: 1vw;
      text-align: center;
  }
  .video{
    width: 70%;
    height: auto;
    max-width: 1200px;
    aspect-ratio: 16 / 9;
    border-radius: 24px;
    overflow: hidden;
    margin: 12px 0 0 0;
  }

  @media (max-width: 900px) {
    h1{
      font-size: 36px;
    }
    p{
      width: 80%;
      font-size: 13px;
      text-align: justify;
    }
    .video{
      width: 80%;
    }
  }
`

export default StyledMotionDesign