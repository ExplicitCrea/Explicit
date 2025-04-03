import styled from "styled-components";


const StyledWrldmag = styled.section`
  min-height: 100vh;
  //#5d5d5d #858585 damier
  background: conic-gradient(
    #5d5d5d 90deg,
    #858585 90deg 180deg,
    #5d5d5d 180deg 270deg,
    #858585 270deg
  );
  background-size: 60px 60px;
  background-position: top left;
  background-repeat: repeat;
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
        transition: 0.3s;
      }
      .logo:hover {
        transform: scale(1.1);
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
        margin: 6vh auto 30vh auto;
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
          transition: 0.3s ease;
        }
        img:hover{
          transform: translateY(-1vw);
        }
      }
        .wrldmag-container {
          position: absolute;
          z-index: 2;
          width: 100%;
          top: 41.5vh;
          .wrldmag {
            position: relative;
            width: 65vw;
            height: auto;
            transition: 0.3s;
            left: 16vw;
            z-index: 2;
            margin-top: -1.5vw;
          }
          .wrldmag:hover {
            transform: scale(1.1);
          }
          .ligne {
            position: absolute;
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
        width: 100%;
        position: relative;
        height: 91.5vh;
        display: flex;
        flex-direction: column;
        .images-wrapper {
          width: 100%;
          flex-wrap: wrap;
          justify-content: center;
          margin: 5vh 0 auto 0;
          .image-right, .image-left {
            width: 50%;
          }
          .image-center {
            width: 75%;
            position: unset;
            margin-top: -10px;
          }
        }

        .wrldmag-container{
          display: flex;
          justify-content: center;
          align-items: center;
          top: 40vh;
          img.ligne {
            width: 140%;
            height: auto;
          }
          img.wrldmag {
            width: 90%;
            height: auto;
            left: 0;
            top: 0;
          }
        }

        .bg-bottom{
          display: flex;
          justify-content: center;
          align-items: center;
          width: 160%;
          left: -25%;
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
