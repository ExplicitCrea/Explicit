import styled from "styled-components";

const StyledPage = styled.section`
  display: flex;
  height: 100vh;
  background: url("src/assets/Bruce_Grannec/background.webp");
  background-size: cover;
  padding: 1% 0%;

  @media screen and (max-width: 1000px) {
    height: auto;
    padding-top: 136px;
    background: rgb(25, 40, 64);
    background: linear-gradient(
      35deg,
      rgba(25, 40, 64, 1) 56%,
      rgba(18, 25, 35, 1) 79%
    );
  }

  .container {
    display: grid;
    justify-content: center;
    align-content: center;
    position: relative;
    grid-column-gap: 4%;
    grid-row-gap: 2%;
    width: 100%;
    height: 100%;
    grid-template-columns: 14% 7% 10% 18% 7%;
    grid-template-rows: 28% 8% 12% 26%;

    @media screen and (max-width: 1000px) {
      justify-items: center;
      grid-column-gap: 0%;
      grid-row-gap: 2%;
      padding: 96px 20px;
      grid-template-columns: 100%;
      grid-template-rows: 25% auto 20% auto auto;

    }

    .label-on-side {
      width: 100%;
      height: auto;
      aspect-ratio: 250 / 750;
      grid-row: 1 / span 3;
      grid-column: 1;
      gap: 10px;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
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
        grid-row: 1;
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
      box-sizing: border-box;
      width: 70%;
      max-width: 70%;
      height: auto;
      margin: 0 auto;
      grid-column: 2 / span 2;
      grid-row: 1 / span 1;

      @media screen and (max-width: 1000px) {
        grid-column: 1;
        grid-row: 4;
        width: 100%;

      }

      p {
        margin: 0;
        background-color: rgba(0, 0, 0, 0.6);
        font-family: Lexend;
        font-size: 0.8em;
        padding: 8px;
        text-align: center;
        color: white;
        width: 100%;
        border-radius: 20px;

        @media screen and (max-width: 1600px) {
          font-size: 0.6em;
        }
        @media screen and (max-width: 1270px) {
          font-size: 0.5em;
        }
        @media screen and (max-width: 1000px) {
          font-size: 0.8em;
        }
      }
    }

    .explicit-container {
      margin-top: 2%;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 3px;
      width: 100%;
      height: auto;
      grid-row: 2;
      grid-row: 2 / span 1;
      grid-column: 2 / span 2;

      @media screen and (max-width: 1000px) {
        width: 75vw;
        grid-row: 3;
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
    height: 110%;
    aspect-ratio: 4/3;
    grid-column: 4 / span 2;
    grid-row: 1 / span 2;

    img {
      object-fit: cover;
      width: 100%;
      height: 100%;
    }

    @media screen and (max-width: 1000px) {
      display: none;
    }
  }
  .carousel-container {
    width: 100%;
    aspect-ratio: 16/9;
    height: auto;
    grid-column: 2 / span 3;
    grid-row: 3 / span 0;
    @media screen and (max-width: 1000px) {
      aspect-ratio: 16/9;
      grid-column: 1;
      grid-row: 2;

    }
  }
`;

export { StyledPage };
