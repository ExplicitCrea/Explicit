import styled from 'styled-components';

const StyledOlympics = styled.section`
    position: relative;
    background-color:rgba(29, 0, 0, 0.9);
    background-image: 
    linear-gradient(#00000066 4px, transparent 4px),
    linear-gradient(to right, #00000066 4px, transparent 4px);
    background-size: 450px 450px;
    background-repeat: repeat;
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    @media (max-width: 759px) {
        flex-direction: column;
        justify-content: initial;
        background-size: 200px 200px;
    }
    .App-logo{
        position: absolute;
        width: 30%;
        top: 8%;
        left: 0;
        z-index: 2;
        @media (max-width: 759px) {
            margin: 10vh 0 2vh 0;
            position: relative;
            top: 0;
            width: 70%;
        }
        @media (max-height: 600px) {
            top: 20%;
            width: 25%;
        }
    }
    span{
        font-family: "Book-Antiqua";
        position: absolute;
        top:12%;
        right:7.5%;
        max-width:36%;
        background:black;
        color:white;
        border: 1px solid red;
        padding:.5vw .7vw;
        box-shadow: 6px 6px  0 0 #c00;
        border-radius: 10px;
        font-size: 1.4em;
        z-index: 2;
        @media (max-width: 759px) {
            position: relative;
            top: 0;
            right: 0;
            max-width: 90%;
            font-size: 1em;
            padding:.3vh .5vh;
        }
        @media (max-height: 600px) {
            top: 30%;
            right: 3%;
            font-size: .9em;
            max-width: 30%;
        }
    }
    .video{
        z-index: 2;
    }
    .video.presentation{
        width: 55%;
        position: absolute;
        top: 24%;
        right: 17%;
        @media (max-width: 759px) {
            position: relative;
            top: 0;
            right: 0;
            width: 100%;
            margin: 4vh 0 0 0;
            transform: translateX(-5%);
        }
        @media (max-height: 600px) {
            top: 25%;
            right: auto;
            left: 14%;
            width: 54%;
        }
    }
    .video.animation{
        position: fixed;
        bottom: 0;
        left: 0;
        width: 77%;
        z-index: 1;
        @media (max-width: 759px) {
            width: 133%;
            position: absolute;
            bottom: 0;
            z-index: 2;
        }
        @media (max-height: 600px) {
            width: 55%;
        }
    }
    .personnages{
        width: 20%;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        position:fixed;
        bottom: 2vh;
        left: -3vw;
        z-index: 2;
        gap: 10%;
        img{
            width: 12%;
        }
        @media (max-width: 759px) {
            width: 50%;
            left: 20%;
            bottom: 0;
            img{
                width: 20%;
            }
        }
    }
    .youtube{
        position: fixed;
        bottom: 2.5vw;
        right: 5vw;
        width: 15%;
        transition: transform .2s;
        cursor: pointer;
        z-index: 2;
        @media (max-width: 759px) {
            width: 40%;
            bottom: 3vh;
            right: 0;
        }
        @media (max-height: 600px) {
            bottom: 5vh;
            width:20%;
        }
    }
    .youtube:hover{
        transform: scale(1.1);
    }

    .bg_star{
        position: fixed;
        top:40vh;
        left:-20vw;
        width:70%;
        z-index:-1;
        opacity:0.5;
        @media (max-width: 759px) {
            top: 70vh;
            left: -30vw;
            width: 100%;
        }
    }
    .eclipse {
        width: 60vh;
        height: 60vh;
        position: absolute;
        border-radius: 50%;
        z-index: 1;
    }
    .eclipse.top{
        top: -15vh;
        right: -60vw;
        background: radial-gradient(50% 50% at 50% 50%, rgba(255, 0, 0, 0.4) 0.20%, rgba(255, 255, 255, 0) 99.99%, rgba(0, 0, 0, 0) 100%, rgba(0, 0, 0, 0) 100%);
    }
    .eclipse.bottomL{
        z-index: 1;
        top: 60vh;
        left: -30vw;
        background: radial-gradient(50% 50% at 50% 50%, rgba(255, 0, 0, 0.25) 0.15%, rgba(255, 255, 255, 0) 99.99%, rgba(0, 0, 0, 0) 100%, rgba(0, 0, 0, 0) 100%);
    }
    .eclipse.bottomR{
        top: 40vh;
        right: -70vw;
        background: radial-gradient(50% 50% at 50% 50%, rgba(255, 0, 0, 0.15) 0.15%, rgba(255, 255, 255, 0) 99.99%, rgba(0, 0, 0, 0) 100%, rgba(0, 0, 0, 0) 100%);
    }
`;

export default StyledOlympics;