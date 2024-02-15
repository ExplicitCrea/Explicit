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
        .glasses {
          position: absolute;
          z-index: 10;
          bottom: -14%;
          left: -17%;
          width: 22vw;
          max-width: 450px;
        }

        .diamond {
          position: absolute;
          z-index: 10;
          bottom: -16%;
          height: auto;
          right: -21%;
          width: 22vw;
          max-width: 450px;
        }
      }
    }
    .third-container {
      position: relative;
      top: -2vw;
      width: 100%;
      border: 5px solid yellow;
      .second-wrapper {
        display: flex;
        gap: 10px;
        border: 5px solid red;
        position: relative;
        margin: auto;
        max-width: 1675px;
        max-height: 800px;

        p {
          font-size: 18px;
          overflow: auto;
          height: 150px;
          z-index: 2;
          text-align: center;
          color: white;
          padding: 10px;
          font-family: lexend;
          background-color: rgb(53, 53, 53);
          border-radius: 10px;
          white-space: pre-wrap;
          width: 100%;
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
          left: -2vw;
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
