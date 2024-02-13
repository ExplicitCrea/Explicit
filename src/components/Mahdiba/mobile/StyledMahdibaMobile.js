import styled from "styled-components";

const StyledMahdibaMobile = styled.div`
  .container {
    display: grid;
    justify-content: center;
    border: 5px solid red;
    width: 95vw;
    padding: 0px 40px;
    min-height: 100vh;
    grid-template-columns: 50% 50%;
    grid-template-rows: 28% 15% 18% 20% 19%;
    .video {
      width: 100%;
      aspect-ratio: 16/9;
      height: 100%;
      grid-row: 1;
      grid-column: 1 / span 2;
    }

    .glasses {
      width: 100%;
      height: 100%;
      grid-column: 1;
      grid-row: 2;
      border: 5px solid white;
    }

    .diamond {
      width: 100%;
      height: 100%;
      grid-column: 2;
      grid-row: 2;
      border: 5px solid white;
    }

    img {
      object-fit: cover;
      border-radius: 10px;
    }

    p {
      font-size: 100%;
      text-align: center;
      color: white;
      padding: 10px;
      font-family: lexend;
      font-size: 3vw;
      border-radius: 10px;
      background-color: rgb(53, 53, 53);
      grid-column: 1 / span 2;
      grid-row: 3;
      overflow: auto;
      white-space: pre-wrap;
    }

    .virtual-characte-and-tv {
      display: flex;
      align-items: center;
      grid-row: 4;
      grid-column: 1 / span 2;
      gap: 10px;
      justify-content: center;
    }

    .virtual-character {
      width: 30%;
      height: 100%;
      grid-row: 4;
      grid-column: 1;
    }

    .tv {
      width: 60vw;
      height: 20vw;
      grid-row: 4;
      grid-column: 2;
    }
    
  }
    .virtualGlasses {
      grid-row: 5;
      grid-column: 1 / span 2;
      width: 50vw;
      margin-top: 2vw;
      margin-left: 5vw;
      height: auto;
    }
`;

export { StyledMahdibaMobile };
