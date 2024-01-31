import styled from "styled-components";

const StyledVzion = styled.section`
  overflow: hidden;
  min-height: 100vh;
  font-family: lexend;
  color: white;

  .background {
    position: absolute;
    background: url("src/assets/vzion/background.jpg");
    background-size: cover;
    background-repeat: no-repeat;
  }

  .main-wrapper {
    margin: 140px 75px 25px 75px;
    display: flex;
    flex-direction: column;
    .title {
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
    img {
      width: 424px;
      height: 238px;
      aspect-ratio: 424/238;
      object-fit: cover;
      cursor: pointer;
    }
  }

  .second-wrapper {
    display: flex;
    gap: 20px;
  }
`;

export { StyledVzion };
