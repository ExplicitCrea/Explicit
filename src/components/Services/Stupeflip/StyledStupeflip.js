import styled, { css } from 'styled-components'

const StyledStupeflip = styled.section`

  @keyframes rightToLeft {
    0%{
    transform: translateX(100%);
    }
    100%{
    transform: translateX(0%);
    }
  }

  @keyframes leftToRight {
    0%{
    transform: translateX(0%);
    }
    100%{
    transform: translateX(100%);
    }
  }

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
    text-shadow: 0px 0px 8px #000000;
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
    ${props => props.isVisible === true && css`
      animation: rightToLeft cubic-bezier(0.71, -0.01, 0.4, 0.97) 600ms forwards;
    `}
    ${props => props.isVisible === false && css`
      animation: leftToRight cubic-bezier(0.71, -0.01, 0.4, 0.97) 600ms forwards;
    `}
  }

  .background-filter{
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: -1;
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
