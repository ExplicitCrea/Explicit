import styled from 'styled-components'

const StyledJd = styled.section`
    min-height: 100vh;
    padding: 80px 0 0 0;
    background-color: rgba(0, 0, 0, 1);
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
        background: url('/assets/jd/background.jpg') no-repeat center center;
        background-size: cover;
        padding-bottom: 5vw;
        overflow: hidden;
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
            }
        }
        .deco{
            width: 15%;
            position: absolute;
            bottom: 60px;
            right: 20%;
            display: flex;
            flex-direction: column;
            align-items: center; 
            justify-content: center;
            z-index: 1;
            img{
                margin: 24px 24px;
            }
            .poster1{
                width: 50%;
                height: auto;
            }
            .sub-deco{
                width: 100%;
                display: flex;
                align-items: center;
                justify-content: center;
                img{
                    width: 50%;
                    height: auto;
                }
            }
        }
        .deco2{
            position: absolute;
            bottom: 0px;
            left: calc(0px - 8%);
            width: 30%;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .wave{
            bottom: calc(0px - 15%);
        }
        .samourai{
            width: 25%;
            height: auto;
            position: absolute;
            bottom: 0px;
            right: 0;
            -webkit-transform: scaleX(-1);
            transform: scaleX(-1);
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
                width: 40vw;
                height: 40vw;
                bottom: calc(0px - 20vw);
                left: calc(50% - 20vw);
            }
        }
        .global{
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
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
        }
    }
`

export default StyledJd