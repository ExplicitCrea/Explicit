import styled from "styled-components";


const StyledInsta = styled.section`
    display: flex;
    align-items: center;
    flex-direction: column;
    height: 100vh;
    overflow: hidden;
    background-image: url("assets/insta360/bg.webp");
    .information{
        margin: 13vh auto 0 27vw;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        gap: 1vh;
        @media (max-width: 759px){
            margin: 13vh auto 0 auto;
        }
        .video{
            width: 60%;
            border:1px solid white;
            border-radius: 55px;
            @media (max-width: 759px){
                width: 95%;
                border-radius: 25px;
            }
        }
        span{
            font-family: 'Lexend';
            font-size: 1.65em;
            color: white;
            border-radius: 34px;
            border: 2px dashed white;
            padding: .5vh 0 .5vh 2vw;
            width: 60%;
            margin: 0 auto 2vh auto;
            @media (max-width: 759px){
                width: 95%;
                font-size: 1.2em;
                padding: 1vh 0 1vh 2vh;
            }
        }
    }
    .flotant{
        position: absolute;
        left: 21vw;
        top: 35vh;
        @media (max-width: 759px){
            margin: 3vh auto 0 auto;
            position: relative;
            left: 0;
            top: 0;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
        }
        [alt="camera"]{
            width: 23.5vw;
            @media (max-width: 759px){
                width: 50%;
                margin: 0 auto;
            }
        }
        [alt="fleche"]{
            position: absolute;
            top: 36vh;
            right:-4vw;
            @media (max-width: 759px){
                display: none;
            }
        }
        span{
            position: absolute;
            top: 55vh;
            left: 3vw;
            font-family: 'Lexend';
            font-size: 3em;
            color: white;
            width: 100%;
            margin: 0 auto 2vh auto;
            @media (max-width: 759px){
                position: relative;
                top: 0;
                width: fit-content;
                font-size: 2.1em;
                margin: 0 auto 2vh auto;
            }
        }
    }
`;

export { StyledInsta };