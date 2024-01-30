import styled from "styled-components";

const StyledPage = styled.section`
  display: flex;
  background: url("src/assets/Bruce_Grannec/background.webp");
  background-size: cover;
  border: 2px solid yellow;
  width: 100%;
  height: 50vh;
  justify-content: center;
  min-height: 100vh;

  @media screen and (max-width: 1000px) {
    height: auto;
    background: rgb(25, 40, 64);
    background: linear-gradient(
      35deg,
      rgba(25, 40, 64, 1) 56%,
      rgba(18, 25, 35, 1) 79%
    );
  }

  .container {
    margin-top: calc(80px + 5vh);
    display: grid;
    width: 90vw;
    align-content: center;
    position: relative;
    grid-template-columns: repeat(20, 4%);
    grid-template-rows: repeat(20, 4%);
    gap: 1.05%;
    border: 2px solid red;

    @media screen and (max-width: 1000px) {
      justify-items: center;
      grid-column-gap: 0%;
      grid-template-columns: 100%;
      grid-template-rows: repeat(10, 10%);
      /* grid-row-gap: 10px; */
    }

    .label-on-side {
      width: 100%;
      height: auto;
      max-width: 250px;
      max-height: 728px;
      aspect-ratio: 250 / 750;
      grid-row: 1 / span 20;
      grid-column: 1 / span 5;
      border: 2px solid green;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }

      @media screen and (max-width: 1600px) {
        width: 250px;
      }
      @media screen and (max-width: 1000px) {
        display: none;
      }
    }

    .banner {
      display: none;
      @media screen and (max-width: 1000px) {
        margin-top: 26px;
        display: flex;
        width: 100%;
        height: 200px;
        min-height: 100px;
        max-height: 150px;
        grid-row: 1/ span 2;
        grid-column: 1;
        border-radius: 5px;
      }

      .background-banner {
        display: flex;
        width: 100%;
        height: 100%;
        background: rgb(25, 40, 64);
        background: linear-gradient(
          35deg,
          rgba(25, 40, 64, 1) 56%,
          rgba(18, 25, 35, 1) 79%
        );
        box-shadow: 1px 3px 40px 10px rgba(0, 0, 0, 0.5);
      }

      .banner-items {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        gap: 5%;
      }
      .logo-fifa {
        width: 30%;
        height: auto;
        object-fit: cover;
      }

      .logo-french-battle {
        width: 25%;
        height: auto;
        object-fit: cover;
      }

      .twitch {
        border-radius: 5px;
        width: 30%;
        height: auto;
        object-fit: cover;
      }
    }

    .paragraph_container {
      margin: 0 auto;
      width: 100%;

      grid-row: 1 / span 6;
      grid-column: 7 / span 4;
      border: 2px solid green;

      @media screen and (max-width: 1000px) {
        grid-column: 1;
        grid-row: 9 / span 2;
        width: 100%;
      }

      p {
        background-color: rgba(0, 0, 0, 0.6);
        font-family: Lexend;
        font-size: 0.7em;
        padding: 8px;
        text-align: center;
        color: white;
        max-width: 265px;
        margin: 0 auto;
        border-radius: 20px;

        @media screen and (max-width: 1500px) {
          font-size: 0.6em;
        }
        @media screen and (max-width: 1190px) {
          font-size: 0.5em;
        }
        @media screen and (max-width: 1000px) {
          font-size: 0.8em;
        }
      }
    }

    .explicit-container {
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto;
      gap: 3px;
      width: 100%;
      grid-row: 7 / span 2;
      grid-column: 7 / span 4;
      border: 2px solid green;

      @media screen and (max-width: 1000px) {
        width: 30vw;
        grid-row: 7 / span 2;
        grid-column: 1;
      }

      .white-star {
        width: 23%;
        height: auto;
        object-fit: cover;
      }
      .white-logo {
        display: inline;
        width: 45%;
        height: auto;
        object-fit: cover;
      }
    }
  }

  .event-container {
    width: 100%;
    height: auto;
    aspect-ratio: 16/9;
    grid-column: 12 / span 7;
    grid-row: 1 / span 2;
    border: 2px solid green;

    @media screen and (max-width: 1600px) {
      grid-column: 11 / span 8;
    }
    @media screen and (max-width: 1450px) {
      grid-column: 11 / span 9;
    }
    @media screen and (max-width: 1300px) {
      grid-column: 11 / span 10;
    }
    @media screen and (max-width: 1100px) {
      grid-column: 11 / span 10;
    }
    @media screen and (max-width: 1000px) {
      display: none;
    }

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    /* @media screen and (max-width: 1270px) {
          width: 530px;
        }
        @media screen and (max-width: 1210px) {
          width: 470px;
        }
        @media screen and (max-width: 1000px) {
          display: none;
        } */
  }
  .carousel-container {
    width: 100%;
    max-width: 750px;
    max-height: 426px;
    height: auto;
    aspect-ratio: 16/9;
    grid-row: 9;
    grid-column: 7 / span 11;
    border: 2px solid green;
    @media screen and (max-width: 1400px) {
      grid-column: 7 / span 12;
    }
    @media screen and (max-width: 1200px) {
      grid-column: 7 / span 13;
    }
    @media screen and (max-width: 1000px) {
      grid-column: 1;
      width: 70%;
      grid-row: 3 / span 1;
    }
  }
`;

export { StyledPage };