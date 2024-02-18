import styled from "styled-components";

const StyledPage = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  min-height: 100vh;
  padding-top: 100px;
  overflow: hidden;
  background: rgb(45, 70, 117);
  background: linear-gradient(
    111deg,
    rgba(45, 70, 117, 1) 17%,
    rgba(29, 48, 75, 1) 42%,
    rgba(18, 21, 25, 1) 100%
  );

  @media screen and (max-width: 1000px) {
    align-items: initial;
    padding-top: 80px;
  }

  .background {
    position: absolute;
    width: 126vw;
    left: -58vw;
    top: -27vw;
    @media screen and (max-width: 1000px) {
      position: absolute;
      width: 196vw;
      left: -120vw;
      top: 50vw;
    }
  }

  .container {
    border: 5px solid red;
    max-width: 1300px;
    max-height: 850px;
    display: grid;
    width: 95vw;
    height: auto;
    justify-content: center;
    position: relative;
    grid-template-columns: 22% 35% 27% 14%;
    grid-template-rows: 28% 13% 58%;
    gap: 0.8%;

    @media screen and (min-width: 2000px) {
      max-width: 1600px;
      max-height: 1100px;
    }
    @media screen and (min-width: 2200px) {
      max-width: 1800px;
      max-height: 1300px;
    }

    @media screen and (max-width: 1000px) {
      grid-template-columns: 100%;
      grid-template-rows: 19vw 48vw 11vw 60vw;
      max-height: unset;
      max-width: unset;
      gap: 0;
      grid-row-gap: 3%;
      height: auto;
    }

    .label-on-side {
      width: auto;
      max-height: 100%;
      grid-row: 1 / span 3;
      grid-column: 1 / span 1;
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
        grid-row: 1 / span 1;
        grid-column: 1 / span 4;
        width: 100%;
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
      }

      .banner-items {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        gap: 5%;
      }
      .logo-fifa {
        width: 30vw;
        max-width: 260px;
        height: auto;
        object-fit: cover;
      }

      .logo-french-battle {
        width: 20vw;
        max-width: 260px;
        height: auto;
        object-fit: cover;
      }

      .twitch {
        width: 30vw;
        max-width: 260px;
        border-radius: 8px;
        height: auto;
        object-fit: cover;
      }
    }
      p {
        margin: 0 auto;
        grid-row: 1 / span 1;
        grid-column: 2 / span 1;
        background-color: rgba(0, 0, 0, 0.6);
        font-family: Lexend;
        font-size: clamp(11.5px, 1.17vw, 16px);
        padding: 8px;
        text-align: center;
        color: white;
        margin: 0 auto;
        border-radius: 1vw;
        width: 100%;
        height: auto;
        
        @media screen and (min-width: 2200px) {
          font-size: 22px;
        }
        @media screen and (min-width: 2000px) and (max-width: 2200px) {
          font-size: 20px;
        } 
        @media screen and (max-width: 1000px) {
          font-size: clamp(8px, 3vw, 30px);
          grid-row: 4;
          grid-column: 1 / span 4;
          width: 80%;
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
      grid-row: 2;
      grid-column: 2 / span 1;

      @media screen and (max-width: 1000px) {
        grid-row: 3;
        grid-column: 1;
      }

      .white-star {
        width: 18%;
        height: auto;
        object-fit: cover;
        @media screen and (max-width: 1000px) {
          width: 10vw;
        }
      }
      .white-logo {
        display: inline;
        width: 40%;
        height: auto;
        object-fit: cover;
        @media screen and (max-width: 1000px) {
          width: 25vw;
        }
      }
    }
  }

  .event-container {
    width: 100%;
    height: auto;
    grid-row: 1 / span 2;
    grid-column: 3 / span 2;
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
    grid-row: 3;
    grid-column: 2 / span 2;
    position: relative;
    top: -15px;

    @media screen and (max-width: 1000px) {
      width: 90%;
      margin: 0 auto;
      grid-column: 1;
      grid-row: 2 / span 1;
      top: 0px;
      max-height: 100%;
      max-width: 100%;
    }
  }
`;

export { StyledPage };
