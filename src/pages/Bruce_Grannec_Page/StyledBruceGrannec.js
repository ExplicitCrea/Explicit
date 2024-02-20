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
    max-width: 1600px;
    max-height: 850px;
    display: grid;
    width: 95vw;
    height: auto;
    justify-content: center;
    position: relative;
    grid-template-columns: 18% 35% 25% 12%;
    grid-template-rows: 28% 13% 57%;
    row-gap: 0.8%;
    column-gap: 3.3%;
    overflow: hidden;

    @media screen and (min-width: 2000px) {
      max-width: 2048px;
      max-height: 1130px;
    }

    @media screen and (max-width: 1000px) {
      grid-template-columns: 100%;
      grid-template-rows: 19vw 48vw 11vw 54vw;
      max-height: unset;
      max-width: unset;
      gap: 0;
      grid-row-gap: 3%;
      height: 150vw;
    }

    .label-on-side {
      width: auto;
      grid-row: 1 / span 3;
      grid-column: 1 / span 1;

      img {
        width: 100%;
        height: auto;
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
    .paragraph-container {
      display: flex;
      justify-content: center;
      align-items: center;
      grid-row: 1 / span 1;
      grid-column: 2 / span 1;
      background-color: rgba(0, 0, 0, 0.6);
      border-radius: 1vw;

      @media screen and (max-width: 1000px) {
        grid-row: 4;
        grid-column: 1 / span 4;
        width: 80%;
        margin: auto;
        padding: 8px;
        border-radius: 5vw;
      }

      p {
        margin: 0 auto;
        font-family: Lexend;
        font-size: clamp(10px, 1.0vw, 17px);
        padding: 8px;
        text-align: center;
        color: white;
        margin: 0 auto;
        width: 100%;
        height: auto;

        @media screen and (min-width: 2000px) {
          font-size: clamp(19px, 1.1vw, 22px);
        }
        @media screen and (max-width: 1000px) {
          height: 100%;
          padding: 2px;
          font-size: clamp(9px, 3.2vw, 32px);
        }
      }
    }

    .explicit-container {
      display: flex;
      justify-content: center;
      align-items: center;
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
        width: auto;
        height: 4.7vw;
        object-fit: cover;
        margin-bottom: 1.2vw;
        max-height: 111px;
        min-height: 30px;

        @media screen and (max-width: 1300px) {
          margin-bottom: 1.4vw;
        }

        @media screen and (max-width: 1000px) {
          width: 14vw;
          height: auto;
          margin-bottom: 0;
        }
        @media screen and (min-width: 2000px) {
          margin-bottom: 0.9vw;
        }
      }
      .white-logo {
        width: auto;
        height: 4.7vw;
        object-fit: cover;
        margin-bottom: 1.2vw;
        max-height: 111px;
        min-height: 30px;

        @media screen and (max-width: 1300px) {
          margin-bottom: 1.4vw;
        }

        @media screen and (max-width: 1000px) {
          width: 30vw;
          height: auto;
          margin-bottom: 0;
        }
        @media screen and (min-width: 2000px) {
          margin-bottom: 0.9vw;
        }
      }
    }
  }

  .event-container {
    width: 80%;
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
    width: 89%;
    height: auto;
    grid-row: 3;
    grid-column: 2 / span 2;
    position: relative;
    top: -20px;

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
