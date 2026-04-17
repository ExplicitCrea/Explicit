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
        @media (max-height: 428px){//landscape phones
            //everything position relative
            //everything margin auto
            display: flex;
            flex-direction: row;
            justify-content: center;
            align-items: center;
            background-size: cover;
            .flotant{
                position: relative;
                left: 0;
                top: 0;
                display: flex;
                align-items: center;
                justify-content: center;
                flex-direction: column;
                width: 50%;
                gap: 1vh;
                [alt="camera"]{
                    width: 30%;
                    margin: 0 auto;
                }
                [alt="fleche"]{
                    display: none;
                }
                span{
                    position: relative;
                    top: 0;
                    left: 0;
                    width: fit-content;
                    font-size: 2em;
                    margin: 0 auto 2vh auto;
                }
            }
            .information{
                position: relative;
                margin: auto auto 6vh auto;
                width: 50%;
                height: fit-content;
                display: flex;
                justify-content: center;
                gap: 1vh;
                .video{
                    width: 75%;
                    border-radius: 25px;
                }
                span{
                    width: 75%;
                    font-size: .8em;
                    padding: 1.5vh 1.5vw;
                }
            }

        }
`;

export { StyledInsta };