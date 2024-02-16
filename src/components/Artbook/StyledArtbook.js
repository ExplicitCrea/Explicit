import styled from "styled-components";

const StyledArtbook = styled.div`
  margin-top: 30px;
  z-index: 1;

  .container {
    display: grid;
    width: 100vw;
    height: 40vw;
    justify-content: center;
    grid-template-rows: 23% 30% 24% 17%;
    grid-template-columns: 16% 10% 3% 7% 7% 6% 7% 14%;
    position: relative;
    gap: 0.8vw;
    @media (max-width: 900px) {
      padding: 20px;
      height: 100%;
      margin-top: 20px;
      grid-template-columns: 34% 17% 44%;
      grid-template-rows: 8% 14% 23% 11% 9% 13% 16%;
      gap: 2vw;
    }

    img {
      width: 100%;
      height: 100%;
      border-radius: 10px;
      object-fit: cover;
      cursor: pointer;
      transition: transform 0.3s ease-in-out;
      &:hover {
        transform: scale(1.1);
      }
      @media (max-width: 900px) {
        border-radius: 4vw;
      }
    }

    .olympics {
      width: 100%;
      overflow: hidden;
      border-radius: 10px;
      grid-row: 1;
      grid-column: 1 / span 4;
      @media (max-width: 900px) {
        grid-column: 1 / span 3;
      }
    }

    @media (max-width: 900px) {
      width: 100%;
      grid-column: 1 / span 3;
    }
  }

  .bruce-grannec {
    width: 100%;
    overflow: hidden;
    border-radius: 10px;
    grid-row: 1;
    grid-column: 5 / span 3;
    @media (max-width: 900px) {
      height: 100%;
      grid-column: 1;
      grid-row: 6 / span 1;
    }
  }

  .gg {
    width: 100%;
    overflow: hidden;
    border-radius: 10px;
    grid-row: 1;
    grid-column: 8;
    @media (max-width: 900px) {
      grid-row: 7;
      grid-column: 2 / span 2;
    }
  }

  .loreal {
    width: 123%;
    border-radius: 10px;
    overflow: hidden;
    grid-row: 2;
    grid-column: 1;
    @media (max-width: 900px) {
      width: 100%;
    }
  }

  .pg {
    width: 130%;
    border-radius: 10px;
    overflow: hidden;
    grid-row: 2;
    grid-column: 2 / span 2;
    margin-left: 3.7vw;
    @media (max-width: 900px) {
      width: 100%;
      height: 100%;
      grid-column: 1 / span 2;
      grid-row: 4;
      margin-left: 0;
    }
  }

  .le-grand-jd {
    border-radius: 10px;
    width: 100%;
    overflow: hidden;
    grid-row: 2;
    grid-column: 5 / span 3;
    @media (max-width: 900px) {
      grid-column: 2 / span 2;
      grid-row: 2;
      height: 85%;
    }
  }

  .the-guill {
    border-radius: 10px;
    width: 100%;
    overflow: hidden;
    grid-row: 3;
    grid-column: 3 / span 4;
    transition: transform 0.3s ease-in-out;
    @media (max-width: 900px) {
      grid-row: 5;
      grid-column: 1 / span 2;
    }
  }

  .potatoz {
    border-radius: 10px;
    width: 100%;
    overflow: hidden;
    grid-row: 3;
    grid-column: 7;
    transition: transform 0.3s ease-in-out;
    @media (max-width: 900px) {
      grid-column: 1;
      grid-row: 7;
    }
  }

  .vzion {
    border-radius: 10px;
    width: 100%;
    height: 84%;
    overflow: hidden;
    grid-row: 2;
    grid-column: 8;
    transition: transform 0.3s ease-in-out;
    @media (max-width: 900px) {
      height: 204%;
      grid-row: 4;
      grid-column: 3;
      position: relative;
      top: -104%;
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
    bottom: 6vw;
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
      padding: 8px;
      font-size: 0.8em;
      bottom: 21vw;
    }
    @media (max-width: 500px) {
      font-size: 0.6em;
    }
  }

  .mahdiBa {
    border-radius: 10px;
    position: relative;
    width: 100%;
    overflow: hidden;
    grid-row: 3 / span 2;
    grid-column: 1;
    @media (max-width: 900px) {
      height: 100%;
      grid-column: 1 / span 2;
      grid-row: 3 / span 1;
    }
  }

  .wrld-mag {
    border-radius: 10px;
    position: relative;
    width: 100%;
    overflow: hidden;
    border-radius: 10px;
    grid-row: 3 / span 2;
    grid-column: 2;
    transition: transform 0.3s ease-in-out;
    cursor: pointer;

    @media (max-width: 900px) {
      height: 59%;
      grid-row: 3;
      grid-column: 3;
      margin-top: -14%;
      border-radius: 4vw;
    }

    .wrldmag {
      min-width: 5vw;
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
      top: 4vw;
      width: 100%;
      height: 50%;
      @media (max-width: 900px) {
        top: 0px;
        left: 0px;
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
    border-radius: 10px;
    width: 100%;
    height: 121%;
    overflow: hidden;
    grid-row: 3;
    grid-column: 8;
    margin-top: -14%;
    @media (max-width: 900px) {
      height: 100%;
      margin-top: 0;
      grid-row: 5;
      grid-column: 3;
    }
  }

  .paltay {
    border-radius: 10px;
    width: 100%;
    position: relative;
    overflow: hidden;
    grid-row: 4;
    grid-column: 3 / span 6;

    @media (max-width: 900px) {
      grid-column: 2 / span 2;
      grid-row: 6;
      object-position: right;
      img {
        object-position: right;
      }
    }
  }
`;

export { StyledArtbook };
