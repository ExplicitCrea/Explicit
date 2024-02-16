import styled from 'styled-components'

const StyledAudio = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  .title{
    font-size: 8vw;
    margin: 0;
    color: #634EFF;
  }
  span{
    width: 50%;
    font-size: 2.5vw;
    font-family: lexend;
    text-align: center;
    color: white;
    z-index: 1;
  }
  .contact{
    width: 20%;
    height: 5vw;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50px;
    font-family: lexend;
    font-size: 2vw;
    font-weight: 600;
    color: #634EFF;
    background: #64FFA9;
    margin: 36px 0;
    text-decoration: none;
    z-index: 1;
  }
  .mySwiper{
    width: 100%;
    padding-top: 20px;
    padding-bottom: 20px;
    .slider{
      width: 25%;
      border-radius: 24px;
      .swiper-slide-shadow-coverflow{
        border-radius: 48px;
      }
    }
  }

  @media (max-width: 900px) {
    .title{
      font-size: 36px;
    }
    span{
      font-size: 19px;
      width: 90%;
    }
    .contact{
      width: 200px;
      height: 40px;
      font-size: 13px;
    }
    .mySwiper{
      padding-top: 20px;
      padding-bottom: 20px;
      .slider{
        width: 25%;
        .swiper-slide-shadow-coverflow{
          border-radius: 24px;
        }
      }
    }
  }
`

export default StyledAudio