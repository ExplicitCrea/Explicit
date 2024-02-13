import styled from "styled-components";

const StyledMahdibaDesktop = styled.div`
  background: url("src/assets/mahdiba/background.png");
  background-size: cover;
  background-position: top;
  background-attachment: fixed;
  min-height: 100vh;
  position: relative;
  overflow: hidden;
  display: flex;
  justify-content: center;
  border: 5px solid yellow;

  .container {
    height: auto;
    width: 95vw;
    border: 5px solid red;
    max-width: 1900px;
    .video {
      width: 100%;
      display: flex;
      justify-content: center;
      .wrapper {
        aspect-ratio: 16 / 9;
        position: relative;
        border: 5px solid green;
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
      display: flex;
      border: 5px solid green;
      justify-content: center;
      position: relative;
      bottom: 2%;
      padding: 0px 50px;
      gap: 10px;
      width: 100%;

      .second-wrapper {
        position: relative;
        display: flex;
        border: 5px solid blue;
        max-width: 2000px;

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
        border: 5px solid green;
      }
    }
  }
`;

export { StyledMahdibaDesktop };
