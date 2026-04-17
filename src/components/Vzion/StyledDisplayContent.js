import styled from "styled-components";

const StyledDisplayContent = styled.div`
  .text-content {
    white-space: pre-line;
    @media (max-width: 1000px) {
      display: none;
    }
    h3 {
      margin: 0;
      font-size: 36px;
      line-height: 53.75px;
      max-width: 655px;

      @media (min-width: 2000px) {
        font-size: 43px;
        max-width: 900px;
      }
      @media (max-width: 1400px) {
        font-size: 1.9em;
        line-height: 35px;
      }
      @media (max-width: 1210px) {
        font-size: 1.8em;
        line-height: 35px;
      }
      @media (max-width: 1030px) {
        font-size: 1.5em;
        line-height: 35px;
      }
    }

    p {
      font-size: 18px;

      @media (min-width: 2000px) {
        font-size: 20px;
      }
      @media (max-width: 1400px) {
        font-size: 0.9em;
      }
      @media (max-width: 1030px) {
        font-size: 0.8em;
      }
    }

    .container_btn {
      @media (max-width: 1210px) {
        width: 100%;
      }

      button {
        color: #fc0000;
        font-size: 18px;
        line-height: 20px;
        cursor: pointer;
        font-weight: bold;
        border-radius: 7px;
        padding: 7px;
        background-color: #d9d9d900;
        border: 1px solid #ffffff;
        transition: 0.3s;
        @media (min-width: 2000px) {
          font-size: 20px;
        }

        @media (max-width: 1400px) {
          font-size: 14px;
          padding: 5px;
        }
      }
      button:hover {
        transform: scale(1.1);
        background-color: #d9d9d999;
      }
    }
  }
`;

export { StyledDisplayContent };
