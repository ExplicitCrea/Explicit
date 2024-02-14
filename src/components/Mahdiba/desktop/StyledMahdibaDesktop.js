import styled from "styled-components";

const StyledMahdibaDesktop = styled.div`
  .container {
    height: auto;
    width: 95vw;
    border: 10px solid green;
    max-width: 1745px;
    .video {
      width: 100%;
      display: flex;
      justify-content: center;
      .wrapper {
        aspect-ratio: 16 / 9;
        position: relative;

        max-width: 1200px;
        width: 70%;

        .virtual-character {
          position: absolute;
          top: 38%;
          z-index: 1;
          left: -24%;
          object-fit: cover;
          width: 18vw;
          height: 24vw;
          max-height: 400px;
          max-width: 300px;
          border-radius: 5%;
        }
      }
    }
    .third-container {
      position: relative;
      top: -2vw;
      .second-wrapper {
        display: flex;
        gap: 10px;
        border: 5px solid red;
        position: relative;
        margin: auto;

        .glasses {
          position: absolute;
        z-index: 10;
        top: -8vw;
        width: 20vw;
        left: 4vw;
        max-width: 400px;
        max-height: 400px;
        }

        .diamond {
          position: absolute;
          z-index: 10;
          top: -8vw;
          height: auto;
          right: -1vw;
          width: 22vw;
        }
        p {
          font-size: 1vw;
          z-index: 2;
          text-align: center;
          color: white;
          padding: 10px;
          font-family: lexend;
          background-color: rgb(53, 53, 53);
          border-radius: 10px;
          white-space: pre-wrap;
          width: 100%;
          overflow: auto;
        }

        .virtual-glasses {
          z-index: 1;
          width: 56vw;
          height: 11vw;
          border-radius: 10px;
          object-fit: cover;
          max-width: 520px;
          max-height: 227px;
        }

        .tv {
          z-index: 1;
          border-radius: 10px;
          position: relative;
          left: -1vw;
          z-index: 1;
          width: 56vw;
          height: 11vw;
          object-fit: cover;
          max-width: 520px;
          max-height: 227px;
        }
      }
    }
  }
`;

export { StyledMahdibaDesktop };
