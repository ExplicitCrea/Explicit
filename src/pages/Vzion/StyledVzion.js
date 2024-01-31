import styled from "styled-components";

const StyledVzion = styled.section`
  overflow: hidden;
  font-family: lexend;
  color: white;
  width: 100%;
  border: 2px solid red;

  .background {
    overflow: hidden;
    position: absolute;
    background: url("src/assets/vzion/background.jpg");
    background-size: cover;
    background-repeat: no-repeat;
  }

  .main-wrapper {
    margin: 140px 75px 25px 75px;
    display: flex;
    flex-direction: column;
    border: 3px solid red;
    @media (max-width: 1210px) {
      margin: 140px 75px 0px 75px;
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
    }
    .video1 {
      @media (max-width: 1000px) {
        position: relative;
        left: 100px;
      }
    }
    .video2 {
      @media (max-width: 1000px) {
        position: relative;
        right: 100px;
      }
    }
    .video3 {
      @media (max-width: 1000px) {
        position: relative;
        left: 100px;
      }
    }
  }

  .second-wrapper {
    display: flex;
    gap: 20px;
    @media (max-width: 1000px) {
      justify-content: center;
      gap: 0px;
    }
  }

  .container-compare-slider {
    margin: 250px 0px 100px 0px;
    display: flex;
    justify-content: center;
    gap: 30px;

    @media (max-width: 1210px) {
      margin: 100px 0px 100px 0px;
    }

    p {
      font-size: 16px;
      width: 237px;
      @media (max-width: 1000px) {
        display: none;
      }
    }
    border: 2px solid red;
  }

  .grid-container {
    display: flex;
    align-items: center;
    flex-direction: column;
    gap: 25px;

    
    @media (max-width: 1000px) {
      width:80%;
     margin: 0 auto;
    }
    p {
      width: 747px;
      text-align: center;
    @media (max-width: 1000px) {
      display: none;
    }
    }
    border: 2px solid red;
  }
`;

export { StyledVzion };
