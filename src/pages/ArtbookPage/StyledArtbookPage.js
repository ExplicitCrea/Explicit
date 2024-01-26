import styled from "styled-components";

const StyledArtbooksPage = styled.section`
  position: relative;
  display: flex;
  justify-content: center;
  color: white;
  padding: 92px 0px 40px 0px;
  background: linear-gradient(35deg, rgba(44,41,100,1) 56%, rgba(35,59,72,1) 79%);

  .explicit-container {
    position: absolute;
    top: -23%;
    left: -20%;
    width: 50%;
    rotate: -123.72deg;

    img {
      width: 100%;
      height: 100%;
    }
  }
`;
export {
  StyledArtbooksPage,
};
