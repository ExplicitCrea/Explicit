import styled from "styled-components";

const StyledFooter = styled.footer`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: space-between;
  bottom: 0px;
  left: 0px;
  width: 100%;
  height: auto;
  padding: 24px 0px;
  z-index: 5;
  
  .column {
    z-index: 3;
    position: relative;
    width: 15%;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    
    a{
      color: white;
      font-family: lexend;
      font-size: 18px;
      padding: 0px 0px 18px 0px;
      text-decoration: none;
    }
  }
  .background{
    bottom: 0px;
    position: absolute;
    width: 100%;
  }
  .logo{
    img{
      display: flex;
      width: auto;
      height: 80px;
    }
  }

  @media (max-width: 900px) {
        height: 100px;
        width: 100%;
        .column{
              width: 17%;
              
          a{
              font-size: 13px;
              
    }
  }
  .logo{
    img{
      height: 37px;
      margin: 0px 0px 18px 0px;
    }
  }
  .background{
    height: 550px;
    width: 100%;
  }
}

`;
export default StyledFooter