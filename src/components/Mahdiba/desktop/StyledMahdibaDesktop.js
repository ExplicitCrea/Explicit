import styled from "styled-components";

const StyledMahdibaDesktop = styled.div`
  .container {
    height: auto;
    width: 95vw;
    /* max-width: 1900px; */
    border: 10px solid green;
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
      width: 100%;
      height: auto;
      display: flex;
      justify-content: center;
      position: relative;
      bottom: -50%;
      border: 5px solid yellow;
      .second-wrapper {
        display: flex;
        gap: 10px;
        border: 5px solid red;
        position: relative;
        max-width: 1400px;
        

        .glasses {
          position: absolute;
          z-index: 10;
          top: -5vw;
          width: 19vw;
          left: -2vw;
        }

        .diamond {
          position: absolute;
          z-index: 10;
          top: -7vw;
          height: auto;
          right: -2vw;
          width: 18vw;
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
        }

        .tv {
          z-index: 1;
          border-radius: 10px;
          position: relative;
          left: -1vw;
        }
      }

      img {
        z-index: 1;
        width: 21vw;
        height: 8vw;
        border-radius: 25px;
        object-fit: cover;
      }
    }
  }
`;

export { StyledMahdibaDesktop };
