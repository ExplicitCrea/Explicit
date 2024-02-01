import styled from "styled-components";

const StyledContainer = styled.div`
    width: 30%;
    @media (max-width: 1000px) {
      width: 70%;
      .__rcs-handle-button {
        width: 40px!important;
        height: 40px!important;
      }
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