import styled from 'styled-components'

const StyledCard = styled.div`
  background: linear-gradient(147deg, rgba(100, 255, 169, 0.15) 1.89%, rgba(148, 82, 255, 0.15) 98.57%);
  border: 2px solid #fff;
  padding: 6px;
  display: flex;
  flex-direction: column;
  align-items: center;

  .container-name{
    height: 3vw!important;
    padding: 3px 12px;
    background: rgba(255, 255, 255, 0.52);
    border-radius: 36px;
    width: 100%!important;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 2px solid #fff;
    h1{
      font-family: lexend;
      font-size: 1.5vw;
      color: #fff;
      text-align: center;
      margin: 0;
    }
  }

  button{
    width: 80%;
    height: 4vw;
    margin: 3vw 0;
    border-radius: 50px;
    border: none;
    font-family: lexend;
    font-size: 1vw;
    color: #fff;
    background: #634EFF;
    cursor: pointer;
    svg{
      color: #fff;
    }
  }
`

export default StyledCard