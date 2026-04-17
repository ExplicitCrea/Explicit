import styled from 'styled-components'

const StyledOreal = styled.section`
    position: relative;
    .container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-start;
        padding: 90px 0;
        position: relative;
        min-height: 60vw;
        .wrapper-logo{
            width: 100%;
            height: 15vw;
            overflow: hidden;
            display: flex;
            align-items: center;
            justify-content: center;
            .logo{
                width: 60%;
                height: auto;
            }
        }
        .subtitle, .bottom-explain {
            font-size: 24px;
            font-weight: 500;
            font-family: lexend;
        }
        .subtitle{
            margin: 12px 0 60px 0;
        }
        .bottom-explain{
            margin: 10vw 0 36px 0;
            text-align: center;
            width: 50%;
        }
        .gallery{
            position: relative;
            width: 100%;
            height: auto;
            display: flex;
            align-items: center;
            padding: 0 24px 0 24px;
            .video{
                position: absolute;
                top: 0px;
                left: calc(50% - 25vw);
                width: 50%;
                height: auto;
                max-width: 1200px;
                aspect-ratio: 16 / 9;
                border-radius: 24px;
                overflow: hidden;
            }
            .pictures{
                width: 100%;
                height: auto;
                display: flex;
                justify-content: space-between;
                align-items: center;
                .left{
                    width: 20%;
                    height: auto;
                    display: flex;
                    flex-direction: column;
                    justify-content: flex-end;
                    align-items: end;
                    img:nth-child(1){
                        width: 100%;
                        height: auto;
                        margin-bottom: 24px;
                        border-radius: 24px;
                        overflow: hidden;
                    }
                    img:nth-child(2){
                        width: 50%;
                        height: auto;
                        border-radius: 24px;
                        overflow: hidden;
                    }
                }
                .right{
                    width: 20%;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    img{
                        width: 100%;
                        height: auto;
                        border-radius: 24px;
                        overflow: hidden;
                    }
                }
            }
            .sketch{
                width: 30%;
                position: absolute;
                top: 0px;
                right: 0px;
                z-index: 1;
                top: 19vw;
            }
        }
    }

    .middle-text{
        width: 100%;
        z-index: 1;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        .wrapper-black, .wrapper-white{
            width: 100%;
            height: auto;
            display: flex;
            justify-content: center;
            align-items: center;
            overflow: hidden;
            .black{
                width: 80%;
                background-color: black;
                color: white;
                border-radius: 24px 24px 0 0;
                overflow: hidden;
            }
            .white{
                width: 80%;
                background-color: white;
                color: black;
                border-radius: 0 0 24px 24px;
                overflow: hidden;
            }
            .text{
                text-align: center;
                font-size: 1vw;
                font-weight: 500;
                font-family: lexend;
                margin: 0;
                overflow: hidden;
                padding: 24px 24px 24px 24px;
            }
        }
        .wrapper-black{
            background-color: white;
        }
        .wrapper-white{
            background-color: black;

        }
    }

    .black{
        background-color: black;
    }

    .white-subtitle{
        color: white;
    }

    .black-container{
        background-color: black;
    }

    @media (max-width: 900px) {
        .container{
            .subtitle, .bottom-explain {
                font-size: 14px;
            }
            .bottom-explain{
                width: 90%;
            }
            .wrapper-logo{
                .logo{
                }
            }
            .subtitle{
            }
            .gallery{
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                .video{
                    width: 90%;
                    position: unset;
                }
                .pictures{
                    justify-content: center;
                    margin-top: 24px;
                    .left{
                        align-items: center;
                        width: 60%;
                        flex-direction: row-reverse;
                        img:nth-child(1){
                            width: 50%;
                            border-radius: 12px;
                            margin: 0 6px;
                        }
                        img:nth-child(2){
                            width: 50%;
                            border-radius: 12px;
                        }
                    }
                    .right{
                        width: 30%;
                        img{
                            width: 100%;
                            border-radius: 12px;
                        }
                    }
                }
                .sketch{
                    display: none;
                }
            }
        }
        .middle-text{
            .wrapper-black, .wrapper-white{
                .text{
                    font-size: 14px;
                    padding: 12px 12px 12px 12px;
                }
            }
        }
    }
`

export default StyledOreal