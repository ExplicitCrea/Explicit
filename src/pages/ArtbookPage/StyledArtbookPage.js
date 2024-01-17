import styled from "styled-components";

const StyledArtbooksPage = styled.section`
  position: relative;
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100%;
  color: white;
  padding: 200px 50px 0px 50px;
  background: rgb(44,41,100);
  background: linear-gradient(35deg, rgba(44,41,100,1) 56%, rgba(35,59,72,1) 79%);
`;

const StyledDiv = styled.div`
  position: absolute;
  top: -23%;
  left: -20%;
  width: 50%;
  rotate: -123.72deg;
`;

const StyledImage = styled.img`
  width: 100%;
  height: 100%;
`;

export {
  StyledArtbooksPage,
  StyledDiv,
  StyledImage,
};
