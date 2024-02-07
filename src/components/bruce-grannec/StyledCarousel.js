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
    width: 50px;
    height: auto;
    color: white;
    cursor: pointer;
  }

  .container-arrow-left {
    width: 8%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.4);
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
    background-color: rgba(0, 0, 0, 0.4);

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
    border-radius: 10px;
    input {
      cursor: pointer;
      background-color: red;
    }
  }

  .carousel-img {
    width: 100%;
    height: auto;
    object-fit: cover;
  }
`;

export { StyledCarousel };
