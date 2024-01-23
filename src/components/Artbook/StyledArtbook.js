import styled from "styled-components";

const StyledArtbook = styled.div`
  display: flex;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  border: 1px solid blue;

  .container {
    display: grid;
    justify-content: center;
    width: 100%;
    height: 50%;
    gap: 12px;
    grid-template-rows: 41% 55% 49% 53%;
    grid-template-columns: 11% 16% 16% 8%;
    position: relative;

    img {
      min-width: 100px;
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 10px;
      cursor: pointer;
      transition: transform 0.3s ease-in-out;
      &:hover {
        transform: scale(1.1);
      }
    }

    .olympics {
      width: 100%;
      height: auto;
      max-height: 250px;
      overflow: hidden;
      border-radius: 10px;
      grid-row: 1;
      /* margin-top: 6.5%; */
      grid-column: 1 / span 3;
    }

    .bruce-grannec {
      width: 100%;
      height: auto;
      max-height: 250px;
      /* margin-top: 10%; */
      overflow: hidden;
      border-radius: 10px;
      grid-row: 1;
      grid-column: 4 / span 2;
    }

    .gg {
      width: 100%;
      height: auto;
      max-height: 250px;
      /* margin-top: 20%; */
      overflow: hidden;
      border-radius: 10px;
      grid-row: 1;
      grid-column: 6;
    }

    .loreal {
      width: 90%;
      height: auto;
      overflow: hidden;
      border-radius: 10px;
      grid-row: 2;
      grid-column: 1 / span 2;
    }

    .pg {
      width: 118%;
      height: auto;
      margin-left: -18%;
      overflow: hidden;
      border-radius: 10px;
      grid-row: 2;
      grid-column: 3 / span 1;
    }

    .le-grand-jd {
      width: 100%;
      height: auto;
      overflow: hidden;
      border-radius: 10px;
      grid-row: 2;
      grid-column: 4 / span 2;
    }

    .the-guill {
      width: 110%;
      height: 90%;
      margin-left: 20%;
      overflow: hidden;
      border-radius: 10px;
      grid-row: 3;
      grid-column: 3 / span 2;
    }

    .pota {
      width: 50%;
      height: 90%;
      overflow: hidden;
      border-radius: 10px;
      margin-left: 50%;
      grid-row: 3;
      grid-column: 5 / span 1;
    }

    .vzion {
      width: 100%;
      height: 80%;
      overflow: hidden;
      border-radius: 10px;
      grid-row: 2;
      grid-column: 6;
    }

    .coming-soon {
      position: absolute;
      background-color: #404040;
      font-family: Lexend;
      font-size: 2.5em;
      width: 70%;
      height: auto;
      text-align: center;
      margin-right: 10%;
      right: 0;
      padding: 10px;
      border-radius: 0px 15px 15px 0px;
      bottom: 105px;
      z-index: 10;
    }

    .mahdiBa {
      position: relative;
      width: 185%;
      height: 70%;
      overflow: hidden;
      border-radius: 10px;
      grid-row: 3 / span 2;
      grid-column: 1 / span 1;
    }

    .wrld-mag {
      position: relative;
      width: 70%;
      margin-left: 60%;
      height: 70%;
      overflow: hidden;
      border-radius: 10px;
      grid-row: 3 / span 2;
      grid-column: 2 / span 1;
      cursor: pointer;

      .image-wrldmag {
        min-width: 100px;
        width: 100%;
        height: auto;
        object-fit: cover;
        cursor: pointer;
        transform: scale(2.5);
      }

      .image-wrldmag-no-background {
        position: absolute;
        z-index: 10;
        top: 100px;
        width: 100%;
        height: 50%;
        object-position: center;
        object-fit: cover;
        cursor: pointer;
        transition: transform 0.3s ease-in-out;

        &:hover {
          transform: scale(1.1);
        }
      }

      .background {
        position: absolute;
        z-index: 5;
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
    }

    .paltay {
      display: flex;
      width: 92%;
      height: 55%;
      margin-top: 220px;
      margin-left: 8%;
      overflow: hidden;

      border-radius: 10px;
      grid-row: 3;
      grid-column: 3 / span 4;
    }
  }
`;

export { StyledArtbook };
