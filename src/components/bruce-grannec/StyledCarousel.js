import styled from "styled-components";

const StyledCarousel = styled.div`
  position: relative;

  img {
    -khtml-user-select: none;
    -o-user-select: none;
    -moz-user-select: none;
    -webkit-user-select: none;
    user-select: none;
  }

  .arrow {
    position: absolute;
    width: clamp(40px, 4vw, 55px);
    height: auto;
    color: white;
    cursor: pointer;

    @media screen and (min-width: 2000px) {
      width: clamp(40px, 4vw, 80px);
    }
    @media screen and (max-width: 1000px) {
      width: 7vw;
    }
  }

  .container-arrow-left {
    width: 8%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.2);
    .arrow-left {
      top: 50%;
      right: 50%;
      transform: translate(50%, -50%);
    }
  }

  .container-arrow-right {
    width: 8%;
    height: 100%;
    position: absolute;
    right: 0;
    top: 0;
    background-color: rgba(0, 0, 0, 0.2);

    .arrow-right {
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }

  .radio-btn {
    position: absolute;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.2);
    display: flex;
    justify-content: center;
    align-content: center;
    width: 100%;
    height: 10%;
    input {
      cursor: pointer;
      background-color: red;
      height: auto;
      width: clamp(15px, 1.2vw, 18px);

      @media screen and (min-width: 2000px) {
      width: clamp(18px, 1.2vw, 25px);
    }
      @media screen and (max-width: 1000px) {
        width: clamp(9px, 2.2vw, 15px);
      }
    }
  }

  .carousel-img {
    width: 100%;
    height: auto;
    object-fit: cover;
  }
`;

export { StyledCarousel };
