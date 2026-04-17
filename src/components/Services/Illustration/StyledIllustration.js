import styled, { css } from 'styled-components'

const StyledIllustration = styled.section`
  @keyframes moveUp {
    0%{
    transform: translateY(100%);
    }
    100%{
    transform: translateY(0%);
    }
  }

  @keyframes moveDown {
    0%{
    transform: translateY(0%);
    }
    100%{
    transform: translateY(100%);
    }
  }


width: 100%;
display: flex;
flex-direction: column;
align-items: center;
justify-content: flex-start;
overflow: hidden;
z-index: 4;
  .top-container{
    width: 100%;
    position: relative;
    overflow: hidden;
    .text-container{
      width: 40%;
      position: absolute;
      top: 45%;
      right: 12%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      z-index: 2;
      h1{
        font-size: 5vw;
        text-align: center;
        margin: 0;
        text-shadow: 0px 0px 8px #000000;
      }
      p{
        font-size: 1vw;
        text-align: center;
        text-shadow: 0px 0px 8px #000000;
      }
    }
    .background{
      width: 100%;
      height: auto;
    }
    .rickross{
      width: 17%;
      height: auto;
      position: absolute;
      bottom: 0%;
      left: 24%;
      z-index: 1;
      transform: scaleX(-1);
      ${props => props.isVisible === true && css`
        animation: moveUp cubic-bezier(0.71, -0.01, 0.4, 0.97) 600ms forwards;
      `}
      ${props => props.isVisible === false && css`
        animation: moveDown cubic-bezier(0.71, -0.01, 0.4, 0.97) 600ms forwards;
      `}
    }
    .sheffg{
      width: 13%;
      height: auto;
      position: absolute;
      bottom: 0%;
      left: 36%;
      ${props => props.isVisible === true && css`
        animation: moveUp cubic-bezier(0.71, -0.01, 0.4, 0.97) 600ms forwards;
      `}
      ${props => props.isVisible === false && css`
        animation: moveDown cubic-bezier(0.71, -0.01, 0.4, 0.97) 600ms forwards;
      `}
    }
  }
  .mid-container{
    width: 100%;
    position: relative;
    .wrld{
      width: 20%;
      height: auto;
      position: absolute;
      bottom: 0%;
      left: 0%;
      width: 28%;
      z-index: 0;
    }
    .right-banner{
      width: 80%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 0 0 20%;
      .lildurk{
        width: 14%;
        height: auto;
        position: absolute;
        bottom: -2%;
        right: 12%;
        ${props => props.isVisible === true && css`
          animation: moveUp cubic-bezier(0.71, -0.01, 0.4, 0.97) 600ms forwards;
        `}
        ${props => props.isVisible === false && css`
          animation: moveDown cubic-bezier(0.71, -0.01, 0.4, 0.97) 600ms forwards;
        `}
      }
      .ester{
        width: 37%;
        height: auto;
        position: absolute;
        bottom: -104%;
        right: -11%;
        z-index: 1;
        ${props => props.isVisible === true && css`
          animation: moveUp cubic-bezier(0.71, -0.01, 0.4, 0.97) 600ms forwards;
        `}
        ${props => props.isVisible === false && css`
          animation: moveDown cubic-bezier(0.71, -0.01, 0.4, 0.97) 600ms forwards;
        `}
      }
      .background{
        width: 33.33%;
        height: auto;
      }
    }
  }
  .bottom-container{
    width: 100%;
    position: relative;
    .background{
      width: 100%;
      height: auto;
    }
    .paltay{
      width: 29%;
      height: auto;
      position: absolute;
      bottom: 0%;
      left: 13%;
      z-index: 1;
      ${props => props.isVisible === true && css`
        animation: moveUp cubic-bezier(0.71, -0.01, 0.4, 0.97) 600ms forwards;
      `}
      ${props => props.isVisible === false && css`
        animation: moveDown cubic-bezier(0.71, -0.01, 0.4, 0.97) 600ms forwards;
      `}
    }
    .footer{
      position: absolute;
      bottom: 0%;
      left: 0%;
      width: 100%;
      height: 68%;
      z-index: 2;
    }
  }
`

export default StyledIllustration