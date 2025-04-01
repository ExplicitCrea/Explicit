import styled from "styled-components";

const StyledMahdibaPage = styled.section`
  background: url("/assets/mahdiba/background.webp");
  background-size: cover;
  background-position: top;
  min-height: 100vh;
  position: relative;
  overflow: hidden;
  display: flex;
  justify-content: center;
  padding-top: calc(68px + 11%);
  @media (max-width: 1000px) {
    padding-top: calc(68px + 30px);
  }
  :where(.glasses,.diamond){
    transition:all 400ms cubic-bezier(0.03, 0.98, 0.52, 0.99) 0s
  }
  :where(.glasses,.diamond):hover{
    transform:scale(1.1)
  }
`;

export { StyledMahdibaPage };
