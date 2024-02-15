import styled from "styled-components";

const StyledMahdibaPage = styled.section`
  background: url("src/assets/mahdiba/background.png");
  background-size: cover;
  background-position: top;
  min-height: 100vh;
  position: relative;
  overflow: hidden;
  display: flex;
  justify-content: center;
  padding-top: calc(68px + 10%);
  @media (max-width: 1000px) {
    padding-top: calc(68px + 30px);
  }
`;

export { StyledMahdibaPage };
