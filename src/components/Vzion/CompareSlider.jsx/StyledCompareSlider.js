import styled from "styled-components";

const StyledContainer = styled.div`
    width: 40%;
    @media (max-width: 1000px) {
      width: 50%;
    }
    @media (max-width: 500px) {
      width: 80% ;
    }
    

  .react-compare-slider {
    border-radius: 22px;
    box-shadow: 4px 7px 15px 0px #0000007D;
    @media (max-width: 1000px) {
      border-radius: 0px ;
    }
    
    
    .react-compare-slider-image {
    }
  }

`;

export {StyledContainer}