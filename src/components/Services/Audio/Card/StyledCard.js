import styled from 'styled-components'

const StyledCard = styled.div`
  background: linear-gradient(147deg, rgba(100, 255, 169, 0.15) 1.89%, rgba(148, 82, 255, 0.15) 98.57%);
  border: 2px solid #fff;
  padding: 2vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  border-radius: 48px;
  width: 100%;
  height: 25vw;

  .container-name{
    height: unset!important;
    padding: 1vw 12px;
    background: rgba(255, 255, 255, 0.52);
    border-radius: 100px;
    width: 100%!important;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 2px solid #fff;
    h1{
      font-family: lexend;
      font-size: 2.5vw;
      color: #fff;
      text-align: center;
      margin: 0;
    }
  }

  button{
    width: 80%;
    height: 6vw;
    border-radius: 50px;
    border: none;
    font-family: lexend;
    font-size: 2vw;
    color: #fff;
    background: #634EFF;
    cursor: pointer;
    svg{
      color: #fff;
    }
  }

  @media (max-width: 900px) {
    border-radius: 24px;
    .container-name{
      h1{
        font-size: 13px;
      }
    }
    button{
      height: unset;
      width: 90%;
      font-size: 13px;
      padding: 2vw 0;
    }
  }
`

export default StyledCard