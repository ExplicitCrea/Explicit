import styled from 'styled-components'

const StyledProduction = styled.section`
  width: 100%;
  position: relative;

  h1{
    top: 13%;
    left: 33%;
    position: absolute;
    font-size: 6vw;
    text-align: center;
    z-index: 0;
  }
  .main-container{
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    img{
      width: 45%;
      height: auto;
    }
  }

  .door-container{
    position: absolute;
    height: 50%;
    width: 100%;
    z-index: 1;
    overflow: hidden;
    .door{
      height: 100%;
      width: auto;
    }
  }

  .up{
    top: 0px;
  }
  
  .down{
    bottom: 0px;
  }

  @media (max-width: 900px) {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    
    h1{
      font-size: 36px;
      left: unset;
    }
    .door-container{
      position: unset;
      .door{
        width: 100%;
        height: auto;
      }
    }
  }
`

export default StyledProduction