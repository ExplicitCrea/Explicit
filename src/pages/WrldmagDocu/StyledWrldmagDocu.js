import styled from "styled-components";


const StyledWrldmagDocu = styled.section`
    min-height: 100vh;
    background-color:#111111cc;
    overflow: hidden;
    padding-top: 80px;
    position: relative;
    background-image: 
    linear-gradient(#ffffff44 2px, transparent 2px),
    linear-gradient(to right, #ffffff44 2px, transparent 2px);
    background-size: 45px 45px;
    // background-attachment: fixed;
    background-repeat: repeat;
    display:flex;
    flex-direction:column;
    align-items:center;
    @media (max-width: 759px) {
        padding-top: 0;
    }
    img.logo{
        margin:10vh 0 0 0;
        width:28.5%;
        z-index: 2;
        transition: transform 0.3s;
        @media (max-width: 759px) {
            width: 70%;
        }
        @media (max-height: 600px) {
            width: 50%;
        }
    }
    img.logo:hover{
        transform: scale(1.1);
    }
    .imagery{
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width:100%;
        min-height:100vh;
        @media (max-width: 759px) {
            min-height: auto;
            margin: 7vh 0 3vh 0;
        }
        .bg_imagery{
            z-index: 0;
            width:115%;
            position: absolute;
            @media (max-width: 759px) {
                width: 200%;
            }
            @media (max-height: 600px) {
                width: 130%;
            }
        }
        .sub{
            position: relative;
            width:50%;
            z-index: 2;
            display: flex;
            flex-direction: row;
            align-items: center;
            gap: 2vw;
            @media (max-width: 759px) {
                width: 97%;
            }
            @media (max-height: 600px) {
                width: 90%;
            }
            .poster{
                margin-top: 4vw;
                z-index: 2;
                width: 90%;
                display: flex;
                flex-direction: column;
                align-items: center;
                @media (max-width: 759px) {
                    margin-top: 5vh;    
                    width: 80%;
                }
                img[alt="poster"]{
                    width:100%;
                    border-radius: 16px;
                    margin:auto;
                    box-shadow: 20px 20px 15px 0px #0008;
                    @media (max-width: 759px) {
                        border-radius: 24px;
                        width: 90%;
                    }
                    @media (max-height: 600px) {
                        width: 85%;
                    }
                }
                .bar{
                    width: 110%;
                    box-shadow: 7px 7px 7px 0px #0008;
                    @media (max-width: 759px) {
                        width: 100%;
                    }
                }
            }
            .miniatures{
                margin:auto;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                width: 100%;
                .minia{
                    margin-top:3vw;
                    width: 85%;
                    border-radius: 12px;
                    box-shadow: 20px 20px 10px 0px #0008;
                    @media (max-width: 759px) {
                        width: 95%;
                    }
                }
                .bar{
                    // margin: .5vw auto auto 0.6vw;
                    z index: 3;
                    width:98%;
                    box-shadow: 7px 7px 7px 0px #0008;
                    @media (max-width: 759px) {
                        width: 100%;
                    }
                }
            }
            .bar_text{
                width:96%;
                margin: 1vw auto auto auto;
                padding: .3vw .5vw;
                font-size: 2.5em;
                text-align: center;
                font-family: 'lexend';
                font-weight: bold;
                color:white;
                background-color: #FF826F;
                -webkit-text-stroke: 2px #BF5060;
                border-radius: 12px;
                box-shadow: 7px 7px 7px 0px #0008;
                @media (max-width: 759px) {
                    margin: 1vh auto auto auto;
                    font-size: 1em;
                    -webkit-text-stroke: 1px #BF5060;
                    padding: .5vh 1vw;
                }
            }
        }
    }
    .gachette, .gachette_lng{
        position: relative;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        img{
            top: 0;
            left: 0;
            position: absolute;
        }
        span{
            text-align: center;
            font-family: "Maragsa";
            font-weight: bold;
            color:white;
            z-index: 2;
        }
    }
    .gachette{
        margin-left: 5%;
        width: 22%;
        @media (max-width: 759px) {
            width: 40%;
            margin-left: 0;
        }
        @media (max-height: 600px) {
            width: 30%;
        }
        img{
            transform: translate(10%, -28%);
            width: 100%;
            @media (max-width: 759px) {
                transform: translate(10%, -22%);
            }
            @media (max-height: 600px) {
                transform: translate(10%, -23%);
            }
        }
        span{
            font-size: 3.2em;
            @media (max-width: 759px) {
                font-size: 1.5em;
            }
            @media (max-width: 400px) {
                font-size: 1.35em;
            }
            @media (max-height: 600px) {
                font-size: 2.5em;
            }
            @media (max-height: 400px) {
                font-size: 2.1em;
            }
        }
    }
    .montage{
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100vh;
        margin:5vh 0 0 0;
        @media (max-width: 759px) {
            height: auto;
        }
        @media (max-height: 600px) {
            margin: 10vh 0 0 0;
        }
        .video{
            margin: 0 auto;
            width: 75%;
            @media (max-width: 759px) {
                width: 110%;
                transform: translate(-5%, 0);
            }
            @media (max-height: 600px) {
                width: 90%;
            }
        }
        .gachette{
            position: absolute;
            top: 0;
            left: 2vw;
            z-index: 2;
        }
    }

    .information{
        position: relative;
        width: 100%;
        height: 100vh;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        @media (max-width: 759px) {
            height: auto;
        }
        img{
            position: absolute;
            top:3vw;
            z-index: 1;
            width: 85%;
            @media (max-width: 759px) {
                top: 0;
                width: 100%;
                position: relative;
            }
            @media (max-height: 600px) {
                width: 90%;
            }
            @media (max-height: 400px) {
                width: 100%;
            }
        }
        span{
            text-align: center;
            z-index: 2;
            font-family: "BricolageGrotesque";
            color:white;
        }
        span:nth-child(2){
            position: absolute;
            left: 47%;
            top: 36%;
            -webkit-text-stroke: 2px #BC4F61;
            font-size: 3.2em;
            font-weight: bold;
            @media (max-width: 759px) {
                font-size: 2.1em;
                top: 29%;
                left: 49%;
                -webkit-text-stroke: 2pxrgba(188, 79, 97, 0.76);
            }
            @media (max-width: 400px) {
                font-size: 1.9em;
                top: 25%;
            }
            @media (max-height: 600px) {
                top: 40%;    
                font-size: 2em;
            }
            @media (max-height: 400px) {
                top: 44.5vh;
                font-size: 1.7em;
            }
        }
        span:nth-child(3){
            position: absolute;
            left: 51%;
            top: 40%;
            background: linear-gradient(90deg, #E87069, #902C54);
            background-size: 200% 200%;
            -webkit-background-clip: text;
            -webkit-text-stroke: 8px transparent;
            font-size: 6.5em;
            font-weight: bold;
            color: white;
            @media (max-width: 759px) {
                font-size: 2.1em;
                left: 47%;
                top: 16%;
            }
            @media (max-width: 400px) {
                font-size: 1.75em;
                top: 14%;
            }
            @media (max-height: 600px) {
                font-size: 3.25em;
                top: 47%;
            }
        }
        span:nth-child(3)::before {
            content: "+600k";
            position: absolute;
            left: 5px;
            top: 5px;
            z-index: -1;
            color: transparent;
            background: linear-gradient(90deg, #E87069, #902C54);
            background-size: 200% 200%;
            -webkit-background-clip: text;
            -webkit-text-stroke: 8px transparent;
            filter: blur(1px);
        }
        span:nth-child(4){
            position: absolute;
            left: 47.5%;
            top: 60%;
            max-width: 43%;
            -webkit-text-stroke: 1px #BC4F61;
            font-size: 1.47em;
            font-weight: bold;
            text-align: left;
            @media (max-width: 759px) {
                position: relative;
                left: 0;
                top: 0;
                max-width: 90%;
                font-size: .94em;
                -webkit-text-stroke: 0.5px #BC4F61;
                padding: 1%;
                border-radius: 12px;
                background: linear-gradient(90deg,rgba(232, 111, 105, 0.64),rgba(144, 44, 84, 0.62));
                backdrop-filter: blur(4px);
                -webkit-backdrop-filter: blur(4px);
            }
            @media (max-height: 600px) {
                top: 66%;
                font-size: .71em;
                -webkit-text-stroke: 0px;
                color: #BC4F61;
                max-width: 45%;
            }
            @media (max-height: 400px) {
                top: 70vh;
                font-size: .67em;
                max-width: 49%;
            }
        }
    }
    .assets{
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 100%;
        min-height: 90vh;
        @media (max-width: 759px) {
            min-height: auto;
            margin:5vh 0 3vh 0;
        }
        @media (max-height: 600px) {
            margin: 10vh 0 3vh 0;
        }
        .caroussel{
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: center;
            gap: 2vw;
            perspective: 1000px;
            perspective-origin: 50% 50%;
            @media (max-width: 759px) {
                gap: 5vw;
            }
            img.minia{
                width: 65%;
                border-radius: 12px;
                transform-origin: 0% 0% 0%;
                transform: rotateX(15deg) rotateY(-9deg) translateX(-5%);
                @media (max-width: 759px) {
                    width: 85%;
                }
            }
            button{
                width: 5vw;
                height: 5vw;
                background:transparent;
                border:none;
                display: flex;
                align-items: center;
                justify-content: center;
                cursor: pointer;
                @media (max-width: 759px) {
                    width: 7.5vw;
                    height: 7.5vw;
                }
                img{
                    width: 100%;
                    transform-origin: 0% 0% 0%;
                    transform: rotateX(15deg) rotateY(-9deg);
                    transition: transform 0.3s;
                }
                img:hover{
                    transform: scale(1.2) rotateX(15deg) rotateY(-9deg);
                }
            }
            button#right_button{
                img{
                    transform: rotate(180deg) rotateX(15deg) rotateY(-9deg);
                }
                img:hover{
                    transform: scale(1.2) rotate(180deg) rotateX(15deg) rotateY(-9deg);
                }
            }
        }
        .gachette_lng{
            position: absolute;
            top: 10vh;
            z-index: 1;
            right: 0;
            margin-right: 5%;
            width: 35%;
            @media (max-width: 759px) {
                width: 60%;
                top: 0vh;
            }
            img{
                transform: translate(3%, -27%);
                width: 100%;
            }
            span{
                font-size: 3.2em;
                @media (max-width: 759px) {
                    font-size: 1.2em;
                }
                @media (max-width: 400px) {
                    font-size: 1em;
                }
                @media (max-height: 600px) {
                    font-size: 1.5em;
                }
                @media (max-height: 400px) {
                    font-size: 1.3em;
                }
            }
        }
    }

    img.bg_star{
        position: absolute;
        z-index: -1;
        width: 90%;
        @media (max-width: 759px) {
            width: 120%;
        }
    }
    img.bg_star:nth-child(1) {
        top: -35vw;
        left: -50vw;
    }
    img.bg_star:nth-child(2) {
        top: 67vw;
        right: -50vw;
        @media (max-width: 759px) {
            top: 75vh;
            right: -60vw;
        }
    }
    img.bg_star:nth-child(3) {
        top: 130vw;
        left: -50vw;
        @media (max-width: 759px) {
            width: 130%;    
            top: 140vh;
            left: -62vw;
        }
    }

    @media (max-width: 900px) {
        }
`;


export { StyledWrldmagDocu };
