import styled from "styled-components";

const StyledGrid = styled.div`
  width: 100%;
  height: 53vw;
  overflow: hidden;
  display: grid;
  grid-template-rows: 50% 50%;
  grid-template-columns: 33.33% 33.33% 33.33%;
  max-width: 781px;
  max-height: 502px;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export { StyledGrid };
