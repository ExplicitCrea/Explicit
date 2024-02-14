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
    font-size: 3.5vw;
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
    font-size: 3vw;
    font-weight: 600;
    color: #fff;
    background: #64FFA9;
    margin: 36px 0;
    text-decoration: none;
    z-index: 1;
  }
  .mySwiper{
    width: 80%;
    padding-top: 50px;
    padding-bottom: 50px;
    border-radius: 36px;
    .slider{
      width: 15%;
      border-radius: 24px;
      div{
        width: 70%;
        height: 15vw;
        border-radius: 24px;
      }
    }
  }
`

export default StyledAudio