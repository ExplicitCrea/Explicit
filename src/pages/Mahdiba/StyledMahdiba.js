import styled from "styled-components";

const StyledMahdiba = styled.section`
  background: url("src/assets/mahdiba/background.png");
  background-size: cover;
  background-position: top;
  background-attachment: fixed;
  min-height: 100vh;
  position: relative;
  overflow: hidden;
  display: flex;
  justify-content: center;
  padding-top: calc(68px + 200px);

  .container {
    height: auto;
    width: 100%;
    border: 2px solid yellow;
    .video {
      width: 100%;
      display: flex;
      justify-content: center;
      .wrapper {
        position: relative;
        border: 1px solid red;
        max-width: 1040px;
        width: 70%;
        aspect-ratio: 16 / 9;
        .virtual-character {
          position: absolute;
          top: 38%;
          z-index: 1;
          left: -26%;
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
          top: 70%;
          width: 45%;
          left: -21%;
        }

        .diamond {
          position: absolute;
          z-index: 10;
          top: 70%;
          right: -30%;
          width: 45%;
        }
      }
    }

    .third-container {
      display: flex;
      justify-content: center;
      position: relative;
      bottom: 2%;
      padding: 0px 50px;
      gap: 10px;
      width: 100%;

      p {
        z-index: 2;
        text-align: center;
        color: white;
        min-width: 500px;
        padding: 10px;
        font-family: lexend;
        background-color: rgb(53, 53, 53);
        border-radius: 10px;
      }

      .tv {
        z-index: 1;
        border-radius: 10px;
        position: relative;
        left: -2vw;
        object-position: -40px;
      }

      img {
        z-index: 1;
        width: 25%;
        height: auto;
        border-radius: 25px;
        object-fit: cover;
      }
    }
  }
`;

export { StyledMahdiba };
