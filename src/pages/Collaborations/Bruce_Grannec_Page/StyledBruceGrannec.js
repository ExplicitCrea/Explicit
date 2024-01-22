import styled from "styled-components";

const StyledPage = styled.section`
  display: flex;
  background: url("src/assets/Bruce_Grannec/background.webp");
  background-size: cover;
  width: 100%;
  padding: 96px 25px 26px 25px;
  height: 100vh;

  .container {
    display: grid;
    width: 100%;
    height: 100%;
    padding: 10px;
    grid-template-columns: 15% 5% 10% 10% 30% 17%;
    grid-template-rows: 40% 10% 20% 15% 15% 10% 5%;
    border: 2px solid red;
  }

  .label-on-side {
    width: 100%;
    height: 100%;
    grid-row: 1 / span 5;
    grid-column: 1;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  
  .paragraph_container {
    width: 100%;
    height: 100%;
    grid-column: 3 / span 2;
    grid-row: 1;

    p {
      margin: 0;
      background-color: rgba(0, 0, 0, 0.7);
      font-family: Lexend;
      font-size: 0.9em;
      text-align: center;
      color: white;
      padding: 10px;
      border-radius: 30px;
    }
  }

  .logo-container {
    display: flex;
    grid-row: 1;
    align-items: center;
    justify-content: center;
    gap: 5px;
    width: 100%;
    height: 100%;
    grid-row: 2;
    grid-column: 3 / span 2;

    .white-star {
      width: 70px;
      height: auto;
      object-fit: cover;
    }
    .white-logo {
      display: inline;
      width: 120px;
      height: auto;
      object-fit: cover;
    }
  }

  .event_container {
    height: 100%;
    grid-column: 5 / span 2;
    grid-row: 1 / span 2;

    img {
      object-fit: cover;
      width: 100%;
      height: 100%;
    }
  }

  .carousel-container {
    width: 100%;
    height: 100%;
    grid-column: 3 / span 3;
    grid-row: 3 / span 3;
  }
`;

export { StyledPage };