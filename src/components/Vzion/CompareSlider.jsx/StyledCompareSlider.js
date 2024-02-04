import styled from "styled-components";

const StyledContainer = styled.div`
  width: 30%;
  .__rcs-handle-button {
    width: 40px !important;
    height: 40px !important;
  }
  @media (max-width: 1000px) {
    width: 70%;
  }

  .react-compare-slider {
    border-radius: 22px;
    box-shadow: 4px 7px 15px 0px #0000007d;
    @media (max-width: 1000px) {
      border-radius: 0px;
    }
  }
`;

export { StyledContainer };
