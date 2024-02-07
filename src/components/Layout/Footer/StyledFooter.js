import styled from "styled-components";

const StyledFooter = styled.div`

*, ::before, ::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}
      display: flex;
      position: absolute;
      left: 0px;
      width: 100%;
      height: auto;
      
      .container-footer{
        width: 90%;
        position: absolute;
        bottom: 0px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        
      .link{
        text-decoration: none;
        }
        
      .column {
          z-index: 3;
          position: relative;
          bottom: 17px;
          margin: 0px 0px 0px 75px;
          height: 100%;
          width: 14%;
          text-align: center;
          line-height: 300%;
          
      h3{
          color: white;
          font-family: lexend;
          font-size: 18px;
          padding: 3px 0px 0px 70px;
          }
}
      }
      img{
        bottom: 0px;
        position: absolute;
      }
      .logo{
        img{
          display: flex;
          text-align: center;
          width: auto;
          height: 80px;
          padding: 9px 50px 0px 0px;
          margin: 28px 0px;
          z-index: 3;
    }
          }

          @media (max-width: 900px) {
          
          
          
          }

`;
export default StyledFooter