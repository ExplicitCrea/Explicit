import styled, { css } from 'styled-components'

const StyledProduction = styled.section`

  @keyframes doorUpOpen {
    0%{
    transform: translateY(0%);
    }
    100%{
    transform: translateY(-100%);
    }
  }

  @keyframes doorUpClose {
    0%{
    transform: translateY(-100%);
    }
    100%{
    transform: translateY(0%);
    }
  }

  @keyframes doorDownOpen {
    0%{
    transform: translateY(0%);
    }
    100%{
    transform: translateY(100%);
    }
  }

  @keyframes doorDownClose {
    0%{
    transform: translateY(100%);
    }
    100%{
    transform: translateY(0%);
    }
  }

  @keyframes closeDoor {
    0%{
      margin-bottom: 15vw;
    }
    100%{
      margin-bottom: 0;
    }
  }


  width: 100%;
  position: relative;
  z-index: 2;
  margin-bottom: 15vw;
  ${props => props.isVisible === false && props.isSmallScreen === false && css`
    animation: closeDoor cubic-bezier(0.71, -0.01, 0.4, 0.97) 600ms forwards;
  `}

  .main-container{
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    .middle{
      width: 53%!important;
      height: auto!important;
      transform: scale(1.2);
    }
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
    .door{
      height: 100%;
      width: 100vw;
      object-fit: cover;
    }
    h1{
      top: 13%;
      left: 33%;
      position: absolute;
      font-size: 6vw;
      text-align: center;
      margin: 15vh 0;
      z-index: 2;
    }
  }

  .up{
    z-index: 2;
    top: 0px;
    ${props => props.isVisible === true && props.isSmallScreen === false && css`
      animation: doorUpOpen cubic-bezier(0.71, -0.01, 0.4, 0.97) 600ms forwards;
    `}
    ${props => props.isVisible === false && props.isSmallScreen === false && css`
      animation: doorUpClose cubic-bezier(0.71, -0.01, 0.4, 0.97) 600ms forwards;
    `}
  }
  
  .down{
    z-index: 1;
    bottom: 0px;
    ${props => props.isVisible === true && props.isSmallScreen === false && css`
      animation: doorDownOpen cubic-bezier(0.71, -0.01, 0.4, 0.97) 600ms forwards;
    `}
    ${props => props.isVisible === false && props.isSmallScreen === false && css`
      animation: doorDownClose cubic-bezier(0.71, -0.01, 0.4, 0.97) 600ms forwards;
    `}
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