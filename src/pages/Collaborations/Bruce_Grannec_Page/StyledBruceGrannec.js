import styled from "styled-components";

const StyledPage = styled.section`
  display: flex;
  background: url("src/assets/Bruce_Grannec/background.webp");
  background-size: cover;
  height: 100vh;
  border: 2px solid yellow;
  justify-content: center;
  align-items: center;

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
    align-content: center;
    position: relative;
    grid-column-gap: 10px;
    width: 90% ;
    height: 80%;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-template-rows: 0.5fr 0.5fr 1fr 1fr;
    border: 2px solid red;

    @media screen and (max-width: 1000px) {
      justify-items: center;
      grid-column-gap: 0%;
      grid-template-columns: 100%;
      grid-template-rows: auto;
      grid-row-gap: 10px;
      padding: 96px 20px;
    }

    .label-on-side {
      width: 250px;
      aspect-ratio: 250 / 750;
      grid-row: 1 / span 3;
      grid-column: 1;
      gap: 10px;
      border: 2px solid green;

      img {
        width: 100%;
        height: auto;
        object-fit: cover;
      }
      
      @media screen and (max-width: 1600px) {
        width: 220px;
      }
      
      @media screen and (max-width: 1270px) {
        width: 200px;
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
        grid-row: auto;
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
      grid-column: 2;
      width: 100%;

      grid-row: 1 / span 1;
      border: 2px solid green;

      @media screen and (max-width: 1000px) {
        grid-column: 1;
        grid-row: auto;
        width: 100%;
      }

      p {
        margin: 0;
        background-color: rgba(0, 0, 0, 0.6);
        font-family: Lexend;
        font-size: 0.7em;
        padding: 10px;
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
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto;
      position: relative;
      top: 25px;
      gap: 3px;
      width: 15vw;
      grid-row: 2;
      grid-row: 2 / span 1;
      grid-column: 2;
      border: 2px solid green;

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
    width: 600px;
    height: auto;
    /* height: 120%; */
    aspect-ratio: 16/9;
    grid-column: 3 / span 2;
    grid-row: 1 / span 2;
    border: 2px solid green;

    @media screen and (max-width: 1600px) {
          font-size: 0.6em;
        }

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
        @media screen and (max-width: 1270px) {
          width: 530px;
        }
        @media screen and (max-width: 1210px) {
          width: 470px;
        }
        @media screen and (max-width: 1000px) {
          display: none;
        }
  }
  .carousel-container {
    width: 100%;
    position: relative;
    top: 60px;
    height: auto;
    aspect-ratio: 16/9;
    grid-column: 2 / span 2;
    grid-row: 3 / span 3;
    border: 2px solid green;
    @media screen and (max-width: 1270px) {
      width: 80%;
      grid-column: 2 / span 3;
    }
    @media screen and (max-width: 1210px) {
      
    }
    @media screen and (max-width: 1000px) {
      grid-column: 1;
      grid-row: 2;
    }
  }
`;

export { StyledPage };
