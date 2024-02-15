import styled from "styled-components";

const StyledMahdibaMobile = styled.div`
  .container {
    display: grid;
    justify-content: center;
    justify-items: center;
    width: 95vw;
    min-height: 100vh;
    grid-template-columns: 50% 50%;
    grid-template-rows: 52vw 29vw 38vw 41vw 37vw;
    gap: 0.8%;
    .video {
      width: 100%;
      aspect-ratio: 16/9;
      grid-row: 1;
      grid-column: 1 / span 2;
    }

    .glasses {
      width: 120%;
      height: 100%;
      grid-column: 1;
      grid-row: 2;
      img {
        width: 100%;
        height: auto;
      }
    }

    .diamond {
      width: 90%;
      height: 100%;
      grid-column: 2;
      grid-row: 2;
      img {
        width: 100%;
        height: auto;
      }
    }

    img {
      object-fit: cover;
      border-radius: 10px;
    }

    p {
      margin: 0;
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
      width: 30vw;
      height: 38vw;
      grid-row: 4;
      grid-column: 1;
    }

    .tv {
      width: 60vw;
      height: 23vw;
      grid-row: 4;
      grid-column: 2;
    }
  }
  .virtualGlasses {
    grid-row: 5;
    grid-column: 1 / span 2;
    width: 60vw;
    margin-left: 5%;
    height: auto;
  }
`;

export { StyledMahdibaMobile };
