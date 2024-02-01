import styled from "styled-components";

const StyledGrid = styled.div`
  width: 100%;
  overflow: hidden;
  display: grid;
  grid-template-rows: 50% 50%;
  grid-template-columns: 33.33% 33.33% 33.33%;
  border: 2px solid yellow;
  max-width: 781px;
  max-height: 502px;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    @media (max-width: 1000px) {
      
    }
  }
`;

export { StyledGrid };
