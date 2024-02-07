import styled from 'styled-components';

const StyledAccordion = styled.section`
    @keyframes openAccordion {
        0%{
            height: 70px;
        }
        100%{
            height: auto;
        }
    }
    @keyframes closeAccordion {
        0%{
            height: auto;
        }
        100%{
            height: 70px;
        }
    }
    @keyframes iconRotate {
        0%{
            transform: rotate(0deg);
        }
        100%{
            transform: rotate(180deg);
        }
    }
    @keyframes iconRotateClose {
        0%{
            transform: rotate(180deg);
        }
        100%{
            transform: rotate(0deg);
        }
    }
            display: flex;
            flex-direction: column;
            align-items: center;
            border: 2.8px solid rgba(255, 255, 255, 0.1);
            border-radius: 15px;
            color: white;
            background-color: transparent;
            position: relative; 
            height: ${props => props.isOpen ? 'auto' : '80px'};
            animation: ${props => props.isOpen ? 'openAccordion 0.1s ease-in-out forwards' : 'closeAccordion 0.5s ease-in-out forwards'};
            overflow: hidden;
            margin: 24px auto;
        
        .question-container {
            width: 100%;
            display: flex;
            align-items: center;
            height: 70px;
            padding: 24px 48px;
            justify-content: space-between;
            cursor: pointer;
        h3 {
            font-family: lexend;
            color: #fff;
            margin: 0;
        }
        svg {
            font-size: 24px;
            color: #fff;
            transform: ${props => props.isOpen ? 'rotate(180deg)' : 'rotate(0deg)'}; 
            transition: transform 0.5s ease-in-out; 
        }
    }
        p {
            padding: 0px 24px;
            width: 100%;
            font-family: lexend;
            text-align: justify;
            color: #F8F8FF;
            margin: 0px;
            min-height: 80px;
            overflow: hidden;
    }
    @media (max-width: 900px) {
            width: 100%;
            padding: 14px;
        .question-container {
            width: 100%;
            height: 23px;
            padding: 18px 0px;
        }
        h3 {
            font-size: 15px;
            width: 90%;
        }
        p {
            padding: 14px 0px;
            width: 100%;
            font-size: 15px;
        }
    }
    `

export default StyledAccordion;



