import styled from "styled-components";

const StyledVzion = styled.section`
  overflow: hidden;
  font-family: lexend;
  width: 100%;
  color: white;
  background: url("src/assets/vzion/background.webp") no-repeat center/cover;

  .main-wrapper {
    margin: 140px 75px 25px 75px;
    display: flex;
    flex-direction: column;
    @media (max-width: 1210px) {
      margin: 140px 75px 0px 75px;
    }
    @media (max-width: 900px) {
      margin: 100px 20px 0px 20px;
    }

    .title {
      @media (max-width: 1000px) {
        display: none;
      }
      h2 {
        font-family: Karantina;
        font-weight: 500;
        font-size: 120px;
        line-height: 121.44px;
        margin: 0;
      }
      p {
        max-width: 417px;
        font-size: 13px;
        line-height: 16.25px;
        font-weight: 500;
        color: #7bffc0;
        margin: 0px 0px 10px 0px;
      }
    }
  }

  .videos-vignettes {
    display: flex;
    flex-direction: column;
    @media (max-width: 1000px) {
      gap: 20px;
      width: 100%;
      align-items: center;
    }
    img {
      width: 424px;
      height: auto;
      aspect-ratio: 424/238;
      object-fit: cover;
      cursor: pointer;
      @media (max-width: 1030px) {
        width: 300px;
        height: auto;
      }
      @media (max-width: 1000px) {
        width: 60%;
        aspect-ratio: initial;
      }
    }
    .video1 {
      @media (max-width: 1000px) {
        position: relative;
        left: 15%;
      }
    }
    .video2 {
      @media (max-width: 1000px) {
        position: relative;
        right: 15%;
      }
    }
    .video3 {
      @media (max-width: 1000px) {
        position: relative;
        left: 15%;
      }
    }
  }

  .second-wrapper {
    display: flex;
    gap: 20px;
    @media (max-width: 1000px) {
      margin: 0 auto;
      gap: 0px;
    }
  }

  .tertiary-wrapper {
    margin: 200px 0px 100px 0px;
    display: flex;
    justify-content: center;
    gap: 30px;
    position: relative;
    left: 135px;

    @media (max-width: 1300px) {
      margin: 100px 0px 100px 0px;
      flex-direction: column-reverse;
      align-items: center;
      gap: 15px;
      position: initial;
      left: 0px;
    }
    @media (max-width: 500px) {
      margin: 50px 0px 50px 0px;
    }

    p {
      font-size: 16px;
      width: 237px;
      @media (max-width: 1300px) {
        width: 60%;
        text-align: center;
      }
      @media (max-width: 1000px) {
        display: none;
      }
    }
  }

  .quaternary-wrapper {
    display: flex;
    margin-bottom: 50px;
    align-items: center;
    flex-direction: column;
    gap: 25px;

    @media (max-width: 1000px) {
      padding: 20px 20px;
    }
    p {
      width: 747px;
      text-align: center;
      @media (max-width: 1000px) {
        display: none;
      }
    }
  }
`;

export { StyledVzion };
