import styled from "styled-components";

const StyledArtbook = styled.div`
  display: flex;
  justify-content: center;
  padding: 20px;
  width: 100vw;
  height: 100vh;

  .container {
    display: grid;
    justify-content: center;
    width: 95%;
    height: 50%;
    margin-top: 10px;
    padding: 20px;
    gap: 12px;
    grid-template-rows: 45% 55% 49% 53%;
    grid-template-columns: 10% 16% 16% 16% 8%;
    position: relative;

    @media (max-width: 900px) {
      width: 95%;
      height: 90%;
      margin-top: 20px;
      padding: 0px;
      gap: 8px;
      grid-template-columns: 40% 15% 40%;
      grid-template-rows: 15% 17% 11% 9% 11% 11% 16% 15%;
    }

    img {
      min-width: 60px;
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 10px;
      cursor: pointer;
      transition: transform 0.3s ease-in-out;
      &:hover {
        transform: scale(1.1);
      }

      @media (max-width: 900px) {
        border-radius: 15px;
      }
    }

    .olympics {
      width: 100%;
      height: auto;
      max-height: 250px;
      overflow: hidden;
      border-radius: 10px;
      grid-row: 1;
      grid-column: 1 / span 3;

      @media (max-width: 900px) {
        width: 100%;
        grid-column: 1 / span 3;
      }
    }

    .bruce-grannec {
      width: 100%;
      height: auto;
      max-height: 250px;
      overflow: hidden;
      border-radius: 10px;
      grid-row: 1 / span 0;
      grid-column: 4 / span 2;

      @media (max-width: 900px) {
        grid-column: 1;
        grid-row: 7;
      }
    }

    .gg {
      width: 100%;
      height: auto;
      max-height: 250px;
      overflow: hidden;
      border-radius: 10px;
      grid-row: 1;
      display: non;
      grid-column: 6;
      @media (max-width: 900px) {
        grid-column: 2 / span 1;
        grid-row: 3 / span 2;
        display: none;
      }
    }

    .loreal {
      width: 90%;
      height: auto;
      overflow: hidden;
      border-radius: 10px;
      grid-row: 2;
      grid-column: 1 / span 2;

      @media (max-width: 900px) {
        width: 100%;
        height: 100%;
        grid-column: 1;
        grid-row: 2 / span 1;
      }
    }

    .pg {
      width: 118%;
      height: auto;
      margin-left: -18%;
      overflow: hidden;
      border-radius: 10px;
      grid-row: 2;
      grid-column: 3 / span 1;

      @media (max-width: 900px) {
        grid-column: 1 / span 2;
        grid-row: 5 / span 1;
        width: 100%;
        margin-left: 0%;
      }
    }

    .le-grand-jd {
      width: 100%;
      height: auto;
      overflow: hidden;
      border-radius: 10px;
      grid-row: 2;
      grid-column: 4 / span 2;

      @media (max-width: 900px) {
        grid-row: 2 / span 1;
        grid-column: 2 / span 2;
        width: 100%;
        height: 80%;
      }
    }

    .the-guill {
      width: 93%;
      height: 90%;
      margin-left: 11%;
      overflow: hidden;
      border-radius: 10px;
      grid-row: 3;
      grid-column: 3 / span 2;
      @media (max-width: 900px) {
        grid-column: 1 / span 2;
        grid-row: 6 / span 1;
        width: 100%;
        height: 100%;
        margin-left: 0%;
      }
    }

    .potatoz {
      width: 83%;
      height: 90%;
      overflow: hidden;
      border-radius: 10px;
      margin-left: 17%;
      grid-row: 3;
      grid-column: 5 / span 1;
      @media (max-width: 900px) {
        grid-column: 1 / span 3;
        grid-row: 8 / span 1;
        width: 100%;
        height: 100%;
        margin-left: 0%;

        img {
          object-position: 10% 30%;
        }
      }
    }

    .vzion {
      width: 100%;
      height: 80%;
      overflow: hidden;
      border-radius: 10px;
      grid-row: 2;
      grid-column: 6;
      @media (max-width: 900px) {
        grid-column: 3 / span 1;
        grid-row: 4 / span 2;
        height: 100%;
      }
    }

    .coming-soon {
      position: absolute;
      background-color: #404040;
      font-family: Lexend;
      font-size: 1.5em;
      width: 70%;
      height: auto;
      text-align: center;
      margin-right: 10%;
      right: 0;
      padding: 10px;
      border-radius: 0px 15px 15px 0px;
      bottom: 40%;
      z-index: 4;

      @media (max-width: 1600px) {
        font-size: 1.3em;
      }
      @media (max-width: 1350px) {
        font-size: 1em;
      }

      @media (max-width: 1110px) {
        font-size: 0.8em;
      }

      @media (max-width: 900px) {
        font-size: 1em;
        bottom: 25%;
      }
    }

    .mahdiBa {
      position: relative;
      width: 185%;
      height: 70%;
      overflow: hidden;
      border-radius: 10px;
      grid-row: 3 / span 2;
      grid-column: 1 / span 1;

      @media (max-width: 900px) {
        grid-column: 1 / span 2;
        grid-row: 3 / span 2;
        width: 100%;
        height: 100%;
      }
    }

    .wrld-mag {
      position: relative;
      width: 70%;
      left: 53%;
      height: 70%;
      overflow: hidden;
      border-radius: 10px;
      grid-row: 3 / span 2;
      grid-column: 2 / span 1;
      cursor: pointer;

      @media (max-width: 900px) {
        grid-column: 3 / span 1;
        grid-row: 3 / span 1;
        position: relative;
        top: -28%;
        margin-left: 0%;
        width: 100%;
        height: 125%;
        left: 0;
      }

      .wrldmag {
        min-width: 160px;
        width: 100%;
        height: auto;
        object-fit: cover;
        cursor: pointer;
        transform: scale(2.5);
        @media (max-width: 900px) {
          min-width: 0px;
          position: relative;
          bottom: 56px;
          width: 100%;
          height: 200%;
        }
      }

      .wrldmag-no-background {
        position: absolute;
        z-index: 4;
        top: 70px;
        width: 100%;
        height: 50%;
        object-position: center;
        object-fit: cover;
        cursor: pointer;
        transition: transform 0.3s ease-in-out;
        &:hover {
          transform: scale(1.1);
        }
        @media (max-width: 900px) {
          top: 0px;
          left: 0px;
          width: 100%;
          height: 100%;
        }
      }

      .wrld-background {
        position: absolute;
        z-index: 4;
        width: 100%;
        height: 100%;
        background-color: rgb(132, 68, 245, 0.8);
      }
    }

    .edenLz {
      width: 100%;
      height: 113%;
      position: relative;
      top: -23%;
      overflow: hidden;
      border-radius: 10px;
      grid-row: 3;
      grid-column: 6 / span 1;

      @media (max-width: 900px) {
        grid-column: 3 / span 1;
        grid-row: 6 / span 1;
        height: auto;
        top: 0;
      }
    }

    .paltay {
      position: relative;
      width: 94.5%;
      height: 55%;
      top: 95%;
      left: 3.2vw;
      overflow: hidden;
      border-radius: 10px;
      grid-row: 3;
      grid-column: 3 / span 4;

      @media (max-width: 900px) {
        grid-column: 2 / span 2;
        grid-row: 7 / span 1;
        width: 100%;
        height: 100%;
        margin-top: 0;
        margin-left: 0;
        top: 0;
        left: 0;

        img {
          object-position: right;
        }
      }
    }
  }
`;

export { StyledArtbook };
