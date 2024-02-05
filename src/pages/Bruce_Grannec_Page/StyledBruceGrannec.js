import styled from "styled-components";

const StyledPage = styled.section`
border: 5px solid yellow;
  display: flex;
  position: relative;
  justify-content: center;
  width: 100%;
  overflow: hidden;
  min-height: 100vh;
  padding-top: 100px;
  background: rgb(25, 40, 64);
  background: linear-gradient(
    35deg,
    rgba(25, 40, 64, 1) 56%,
    rgba(18, 25, 35, 1) 79%
  );

  @media screen and (max-width: 1000px) {
    overflow: auto;
  }

  .background-min {
    position: absolute;
    width: 126vw;
    left: -58vw;
    top: -27vw;
    @media screen and (max-width: 1000px) {
      position: absolute;
      width: 700px;
      left: -352px;
      top: initial;
      bottom: -268px;
    }
    @media screen and (max-width: 520px) {
      left: -420px;
      bottom: -240px;
    }
    @media screen and (max-width: 450px) {
      left: -450px;
      bottom: -240px;
    }
  }

  .container {
    border: 5px solid red;
    display: grid;
    width: 95%;
    max-width: 1500px;
    max-height: 1100px;
    position: relative;
    grid-template-columns: repeat(auto-fill, minmax(110px, 1fr));
    grid-template-rows: repeat(auto-fill, minmax(100px, 1fr));;
    gap: 0.8%;

    /* @media screen and (max-width: 1000px) {
      margin-top: calc(80px + 30px);
      width: 90vw;
      justify-items: center;
      grid-column-gap: 0%;
      grid-template-columns: 100%;
      grid-template-rows: repeat(auto-fill, minmax(30px, 4%));
      align-content: initial;
    } */

    .label-on-side {
      width: 100%;
      height: auto;
      /* max-width: 350px; */
      grid-row: 1 / span 10;
      grid-column: 1 / span 3;
      box-shadow: 0px 4px 30px 14px rgba(0, 0, 0, 0.2);

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
        display: flex;
        grid-row: 1 / span 4;
        grid-column: 1;
        width: 100%;
        max-width: 570px;
      }

      .background-banner {
        display: flex;
        width: 100%;
        height: 100%;
        border-radius: 10px;
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
        max-width: 143px;
        object-fit: cover;
      }

      .logo-french-battle {
        width: 28%;
        max-width: 120px;
        height: auto;
        object-fit: cover;
      }

      .twitch {
        border-radius: 5px;
        width: 30%;
        height: auto;
        max-width: 143px;
        object-fit: cover;
      }
    }

    .paragraph_container {
    margin: 0 auto;
    width: 100%;
    height: 100%;
    grid-row: 1/span 2;
    grid-column: 4/span 4;

      p {
        background-color: rgba(0, 0, 0, 0.6);
        font-family: Lexend;
        font-size: 20px;
        padding: 8px;
        text-align: center;
        color: white;
        margin: 0 auto;
        border-radius: 20px;
        width: 100%;
        /* @media screen and (max-width: 1330px) {
          font-size: 0.62em;
        }
        @media screen and (max-width: 1000px) {
          width: 75%;
          font-size: 0.8em;
          min-width: 200px;
        } */
      }
    }

    .explicit-container {
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto;
      gap: 3px;
      width: 100%;
      height: 100%;
      grid-row: 4/span 2;
      grid-column: 4/span 3;

      @media screen and (max-width: 1000px) {
        grid-row: 13 / span 3;
        margin-top: 15px;
        grid-column: 1;
        max-width: 300px;
        padding-bottom: 0px;
      }
      @media screen and (max-width: 453px) {
        grid-row: 12 / span 3;
        grid-column: 1;
        margin-top: 0;
      }

      @media screen and (max-width: 400px) {
        grid-row: 11 / span 3;
        grid-column: 1;
      }

      .white-star {
        width: 4.2vw;
        height: auto;
        object-fit: cover;
        @media screen and (max-width: 1000px) {
          width: 30%;
        }
      }
      .white-logo {
        display: inline;
        width: 8.2vw;
        height: auto;
        object-fit: cover;
        @media screen and (max-width: 1000px) {
          width: 50%;
        }
      }
    }
  }

  .event-container {
    width: 100%;
    height: auto;
    grid-row: 1/span 5;
    grid-column: 8/span 5;
    box-shadow: 0px 4px 30px 14px rgba(0, 0, 0, 0.2);

    @media screen and (max-width: 1000px) {
      display: none;
    }

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  .carousel-container {
    width: 100%;
    height: auto;
    aspect-ratio: 16/9;
    grid-row: 6;
    grid-column: 4/ span 7;

    /* @media screen and (max-width: 1000px) {
      min-width: initial;
      width: 80vw;
      aspect-ratio: 16/9;
      grid-column: 1;
      grid-row: 6 / span 7;
      max-width: 440px;
    } */
  }
`;

export { StyledPage };
