import styled from 'styled-components'

const StyledThreed = styled.section`
  position: relative;
  width: 123%;
  height: 82vw;
  margin: 25vh 0 20vh 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 2;

  .top{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 0;
    width: 100%;
    height: 20%;
    pointer-events: none;
  }
  .top img:nth-child(1){
    width: 30%;
    margin: 0 auto;
    z-index: 3;
    filter: drop-shadow(rgba(0, 0, 0, 0.7) 0px -3px 10px);
  }

  .top img:nth-child(2){
    position: absolute;
    width: 84%;
    height: auto;
    object-fit: cover;
    bottom: -85%;
    filter: drop-shadow(rgba(0, 0, 0, 0.7) 0px -3px 10px);
  }


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

  .bottom{
    display: flex;
    flex-direction: column;
    position: absolute;
    pointer-events: none;
  }
  .bottom img{
    width: 100vw;
    height: auto;
    object-fit: cover;
    margin-top: 52vw;
    -webkit-filter: drop-shadow(0px -3px 10px rgba(0, 0, 0, 0.7));
    filter: drop-shadow(rgba(0, 0, 0, 0.7) 0px -3px 10px);
  }

  .background{
    position: absolute;
    top: 0;
    left: -7%;
    width: 115%;
    height: auto;
    z-index: -1;
    .phone{
      display: none;
    }
  }
  
  .background img{
    width: 100%;
    height: auto;
    object-fit: cover;
  }

  @media (max-width: 900px) {
    width: 100%;
    padding: 60px 0;
    height: auto;
    background-size: auto 137%;
      p{
        font-size: 13px;
        width: 90%;
        color:#634eff !important;
    }
    .video{
      width: 80%;
      margin-top: 5vh;
    }
    .background{
      top: 0vh;
      .pc{
        display:none;
      }
      .phone{
        height:70vh;
        display: block;
        top: 0;
      }
    }
    .bottom{
      display: none;
    }
    .top{
      display: none;
    }
  }
`

export default StyledThreed