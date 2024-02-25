import styled from "styled-components";


const StyledWrldmag = styled.section`
  min-height: 100vh;
  background: url("assets/wrldmag/bg-top.webp");
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  overflow: hidden;
  padding-top: 80px;
  position: relative;


  .container {
    width: 100%;
    height: auto;
    display: flex;
    flex-direction: column;
    gap: 20px;


    .main-wrapper {
      display: flex;
      align-items: center;
      gap: 20px;
      padding: 0 20px;
      @media (max-width: 900px) {
        display: none;
      }


      p {
        background-color: rgba(0, 0, 0, 0.7);
        color: white;
        font-family: lexend;
        font-size: 20px;
        padding: 12px;
        border-radius: 15px;
        max-width: 1080px;
        @media (min-width: 2000px) {
          font-size: 24px;
        }
        @media (max-width: 1600px) {
          font-size: 18px;
        }
        @media (max-width: 1400px) {
          font-size: 16px;
        }
      }
      .logo {
        width: 150px;
        img {
          width: 100%;
          height: auto;
        }
        @media (min-width: 2000px) {
          width: 200px;
        }
        @media (max-width: 1600px) {
          width: 140px;
        }
        @media (max-width: 1400px) {
          width: 130px;
        }
      }
    }
    .second-wrapper {
      width: 100%;
      position: relative;
      .images-wrapper {
        display: flex;
        align-items: center;
        justify-content: space-between;
        position: relative;
        .image-left {
          width: 33%;
        }
        .image-center {
          width: 40%;
          position: absolute;
          top: -10%;
          left: calc(50% - 20%);
          box-shadow: 0 0 20px 10px rgba(0, 0, 0, 0.5);
        }
        .image-right {
          width: 33%;
        }
        img {
          width: 100%;
          height: auto;
          object-fit: cover;
        }
      }
        .wrldmag-container {
          position: absolute;
          z-index: 1;
          width: 100%;
          top: 4vw;
          img {
            width: 100%;
            height: auto;
          }
        }


        .bg-bottom {
          position: relative;
          margin-top: 10vw;
          img {
            width: 100%;
            height: auto;
          }
        }
      }
  }

  @media (max-width: 900px) {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;

    .container {
      .second-wrapper{
        .images-wrapper {
          width: 100%;
          flex-wrap: wrap;
          justify-content: center;
          margin-bottom: 22vw;
          .image-right, .image-left {
            width: 50%;
          }
          .image-center {
            width: 50%;
            position: unset;
            margin-top: -20px;
          }
        }

        .wrldmag-container{
          display: flex;
          justify-content: center;
          align-items: center;
          top: 33vw;
          img {
            width: 185%;
            height: auto;
          }
        }

        .bg-bottom{
          display: flex;
          justify-content: center;
          align-items: center;
          img {
            width: 180%;
            height: auto;
          }
        }
      }
    }
  }
`;


export { StyledWrldmag };
