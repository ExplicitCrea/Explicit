import styled from "styled-components";

const StyledDisplayContent = styled.div`
  .text-content {
    white-space: pre-line;
    @media (max-width: 1000px) {
      display: none;
    }
    h3 {
      margin: 0;
      font-size: 43px;
      line-height: 53.75px;
      max-width: 655px;
      @media (max-width: 1210px) {
        font-size: 1.9em;
        line-height: 35px;
      }
      @media (max-width: 1030px) {
        font-size: 1.5em;
        line-height: 35px;
      }
    }

    p {
      @media (max-width: 1210px) {
        font-size: 0.9em;
      }
      @media (max-width: 1030px) {
        font-size: 0.8em;
      }
    }

    .container_btn {
      @media (max-width: 1210px) {
        width: 100%;
        display: flex;
        justify-content: center;
      }

      button {
        color: #fc0000;
        font-size: 16px;
        line-height: 20px;
        cursor: pointer;
        font-weight: bold;
        border-radius: 7px;
        padding: 7px;
        background-color: #d9d9d900;
        border: 1px solid #ffffff;
      }
    }
  }
`;

export { StyledDisplayContent };
