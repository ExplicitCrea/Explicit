import styled from "styled-components";

const StyledVzion = styled.section`
  overflow: hidden;
  font-family: lexend;
  width: 100%;
  color: white;
  background: url("assets/vzion/background.webp") no-repeat center/cover;
  @media (min-width: 2000px) {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  .main-wrapper {
    margin: 140px 75px 25px 75px;
    display: flex;
    flex-direction: column;
    max-width: 2000px;
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
        @media (max-width: 1400px) {
          font-size: 110px;
        }
      }
      p {
        max-width: 417px;
        font-size: 13px;
        line-height: 16.25px;
        font-weight: 500;
        color: #7bffc0;
        margin: 0px 0px 10px 0px;

        @media (min-width: 2000px) {
          font-size: 15px;
          max-width: 430px;
        }
        @media (max-width: 1030px) {
          max-width: 328px;
          font-size: 13px;
        }
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
    .pseudo_elem_wrapper {
      position: relative;
    }
    .pseudo_elem {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(
        90deg,
        #23FF61 0%,
        #23FF61 2.5%,
        #23FF6155 2.5%,
        rgba(0, 0, 0, 0) 100%
      );
      opacity: 0;
      z-index: 1;
      transition: opacity 0.5s;
      pointer-events: none;
    }
    .pseudo_elem.hover {
      opacity: 1;
    }
    img {
      width: 424px;
      height: auto;
      aspect-ratio: 424/238;
      object-fit: cover;
      cursor: pointer;
      transition: transform 0.5s;
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
    width: 100%;

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
      @media (min-width: 2000px) {
        font-size: 18px;
      }
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
      padding: 20px 45px 0px 45px;
    }
    p {
      width: 747px;
      text-align: center;
      @media (min-width: 2000px) {
        font-size: 18px;
      }
      @media (max-width: 1000px) {
        display: none;
      }
    }
  }
  @media (max-width: 900px) {
    .videos-vignettes {
      .pseudo_elem_wrapper {
        .pseudo_elem{
          display:none;
        }
      }
    }
  }
`;

export { StyledVzion };
