import styled from 'styled-components'

const StyledJd = styled.section`
    min-height: 100vh;
    padding: 80px 0 0 0;
    background-color: rgba(0, 0, 0, 1);
    position:relative;
    .banner-container{
        position: relative;
        .banner{
            width: 100%;
            height: auto;
        }
        .profile-picture{
            width: 10vw;
            height: 10vw;
            border-radius: 50%;
            position: absolute;
            bottom: calc(0px - 5vw);
            left: 1vw;
            z-index: 1;
        }
    }
    .global{
        width: 100%;
        position: relative;
        background: url('/assets/jd/background.webp') no-repeat center center;
        background-size: cover;
        padding-bottom: 5vw;
        overflow: hidden;
        max-height: 1117px;
        .background-filter{
            width: 100%;
            height: 100%;
            position: absolute;
            top: 0;
            left: 0;
            background-color: rgba(0, 0, 0, 0.8);
            z-index: 0;
        }
        .carpentry{
            width: 10vw;
            height: auto;
            position: absolute;
            top: 5%;
            right: 40%;
        }
        .presentation{
            width: 40%;
            margin: 0 40% 0 20%;
            padding: 72px 0 0 0;
            position: relative;
            min-height: 82vh;
            z-index: 2;
            h1{
                margin: 60px 0 12px 0;
                font-family: lexend;
                font-size: 1.5vw;
                color: #FFFFFF;
                text-align: center;
            }
            .video{
                width: 100%;
                max-width: 1200px;
                aspect-ratio: 16 / 9;
                display: flex;
                justify-content: center;
                align-items: center;
                z-index: 2;
                border: 2px solid #FFFFFF;
                border-radius: 1vw;
                overflow: hidden;
            }
            p{
                font-size: 18px;
                font-family: lexend;
                font-weight: 300;
                color: #FFFFFF;
                text-align: justify;
                text-shadow: 0px 0px 10px #000000;
                background-color: rgba(0, 0, 0, 0.55);
                height: 100%;
                margin-bottom: 19vw;
                padding: 0.5vw;
                border-radius: 12px;
                height: 100%;
            }
        }
        .deco{
            width: 24%;
            position: absolute;
            bottom: 60px;
            right: 15%;
            display: flex;
            flex-direction: column;
            align-items: center; 
            justify-content: center;
            z-index: 2;
            max-width: 367px;
            img{
                margin: 24px 24px;
            }
            .poster1{
                    display: block;
                    width: 50%;
                    height: auto;
                    box-shadow: 0px 0px 10px #000000;
            }
            .sub-deco{
                position: relative;
                width: 100%;
                display: flex;
                align-items: center;
                justify-content: center;
                img{
                    width: 50%;
                    height: auto;
                    box-shadow: 0px 0px 10px #000000;
                }
            }
        }
        .deco2{
            position: absolute;
            bottom: -6%;
            left: -13%;
            width: 67%;
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 1;
            max-width: 1027px;
        }
        .wave{
            rotate: -17deg;
            width: 44%;
            left: 9%;
            bottom: calc(0px - 15%);
        }
        .samourai{
            width: 42%;
            height: auto;
            position: absolute;
            bottom: 0px;
            right: 0%;
            -webkit-transform: scaleX(-1);
            transform: scaleX(-1);
            z-index: 1;
            max-width: 643px;
        }
    }

    @media (max-width: 900px) {
        padding: 60px 0 0 0;
        overflow: hidden;
        .banner-container{
            display: flex;
            align-items: center;
            justify-content: center;
            .banner{
                width: auto;
                height: 40vw;
            }
            .profile-picture{
                width: 25vw;
                height: 25vw;
                bottom: calc(0px - 12vw);
                left: calc(50% - 12vw);
            }
        }
        .global{
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            max-height: unset;
            .presentation{
                width: 90%;
                margin: 0 5% 0 5%;
                min-height: unset;
                h1{
                    font-size: 18px;
                    margin: 36px 0 24px 0;
                }
                p{
                    font-size: 13px;
                    margin: 36px 0 24px 0;
                    background-color: rgba(0, 0, 0, 0.55);
                    padding: 12px;
                    border-radius: 12px;
                    backdrop-filter: blur(15.444999694824219px);
                }
            }
            .deco{
                width: 50%;
                position: unset;
            }
            .deco2{
                bottom: -1%;
                left: -13%;
            }
        }
    }
`

export default StyledJd