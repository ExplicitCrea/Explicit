import styled from "styled-components";

const StyledArtbooksPage = styled.section`
  position: relative;
  display: flex;
  justify-content: center;
  color: white;
  padding: 92px 0px 40px 0px;
  min-height: 100vh;
  margin-top: 60px;
  overflow: hidden;/* handled otherwhere */
  background: linear-gradient( 35deg, rgb(33, 30, 72) 56%, rgb(21, 35, 43) 79%);
  @media (max-width: 900px) {
    padding-top: 10px;
  }

  .explicit-star {
    position: absolute;
    top: -25vw;
    left: -26vw;
    width: 65vw;
    rotate: -123.72deg;

    @media (max-width: 900px) {
      top: -40vw;
      left: -41vw;
      width: 103vw;
    }
    @media (max-width: 600px) {
      top: -35vw;
      left: -38vw;
    }
    @media (max-width: 500px) {
      top: -33vw;
    }
    @media (max-width: 400px) {
      top: -27vw;
    }
  }
`;
export { StyledArtbooksPage };
