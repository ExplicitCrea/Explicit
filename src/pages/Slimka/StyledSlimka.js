import styled from "styled-components";

const StyledSlimka = styled.div`
    z-index: 1;
    width: 100%;
    font-family: lexend;
    min-height: 100vh;
    div.ddd{
        display: flex;
        justify-content: center;
        align-items: center;
        flex-wrap: wrap;
        gap: 10vw;
        .test{
            display: flex;
            width: 35%;
            aspect-ratio: 1/1;
            position: relative;
            background-color: #000;
            transition: 0.5s;    
        }
        img.main{
            position: absolute;
            width: 17vw;
            left: 50%;
            top: 50%;
            object-fit: cover;
            transform: translate(-50%, -50%);
        }
    }
}
`;


export { StyledSlimka };