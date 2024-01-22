import styled from "styled-components";

const StyledPage = styled.section`
  display: flex;
  height: 100vh;
  background: url("src/assets/Bruce_Grannec/background.webp");
  background-size: cover;
  padding: 96px 25px 26px 25px;
  overflow: hidden;

  .container {
    display: grid;
    padding: 10px;
    justify-content: center;
    grid-column-gap: 50px;
    position: relative;
    width: 100%;
    aspect-ratio: 1/1;
    grid-template-columns: 18% 22% 14% 30%;
    grid-template-rows: 17% 25% 25% 29%;
    /* border: 2px solid red; */

    .label-on-side {
        width: 80%;
        aspect-ratio: 250 / 750;
      grid-row: 1 / span 5;
      grid-column: 1;
      /* border: 1px solid yellow; */

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }

    .paragraph-and-logo-container {
      display: flex;
      width: 100%;
      flex-direction: column;
      grid-column: 2 / span 1;
      grid-row: 1 / span 2;

      .paragraph_container {
        box-sizing: border-box;
        width: 100%;
        /* border: 1px solid green; */

        p {
          margin: 0;
          background-color: rgba(0, 0, 0, 0.7);
          font-family: Lexend;
          font-size: 0.8em;

          padding: 10px;
          text-align: center;
          color: white;
          border-radius: 30px;
        }

        
      }

      .logo-container {
        margin-top: 2%;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 3px;
        width: 100%;
        height: 50%;
        grid-row: 2;
        grid-column: 2 / span 1;
        /* border: 1px solid purple; */

        .white-star {
          width: 20%;
          height: auto;
          object-fit: cover;
        }
        .white-logo {
          display: inline;
          width: 40%;
          height: auto;
          object-fit: cover;
        }
      }
    }

    .event_container {
      margin-left: 5%;
      width: 80%;
      height: 110%;
      aspect-ratio: 4/3;
      grid-column: 3 / span 2;
      grid-row: 1 / span 2;
      /* border: 1px solid pink; */

      img {
        object-fit: cover;
        width: 100%;
        height: 100%;
      }
    }
    .carousel-container {
      margin-left: 8%;
      width: 60%;
      aspect-ratio: 16/9;
      grid-column: 2 / span 3;
      grid-row: 3 / span 3;
      /* border: 3px solid white; */
    }
  }
`;

export { StyledPage };
