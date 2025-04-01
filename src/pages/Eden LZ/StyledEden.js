import styled from 'styled-components'


const StyledEden = styled.section`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    overflow: hidden;
    background-size: cover;
    .eclipse{
        width: 75vw;
        height: 75vw;
        position: absolute;
        border-radius: 50%;
        z-index: -1;
    }
    .eclipse.top{
        bottom: 24vw;
        right:-8vw;
        background: radial-gradient(50% 50% at 50% 50%, rgba(129,212,226, 0.55) 0.15%, rgba(255, 255, 255, 0) 99.99%, rgba(0, 0, 0, 0) 100%, rgba(0, 0, 0, 0) 100%);
    }

    .eclipse.left{
        bottom: 5vw;
        left: -42vw;
        background: radial-gradient(50% 50% at 50% 50%, rgba(189, 78, 255, 0.53) 0.15%, rgba(255, 255, 255, 0) 99.99%, rgba(0, 0, 0, 0) 100%, rgba(0, 0, 0, 0) 100%);
    }
    .eclipse.right{
        bottom: -12vw;
        right: -27vw;
        background: radial-gradient(50% 50% at 50% 50%, rgba(189, 78, 255, 0.33) 0.15%, rgba(255, 255, 255, 0) 99.99%, rgba(0, 0, 0, 0) 100%, rgba(0, 0, 0, 0) 100%);
    }

    .eclipse.bottom{
        top:22vw;
        left:4vw;
        background: radial-gradient(50% 50% at 50% 50%, rgba(129,212,226, 0.33) 0.15%, rgba(255, 255, 255, 0) 99.99%, rgba(0, 0, 0, 0) 100%, rgba(0, 0, 0, 0) 100%);
    }

    .logo{
        transition: 0.3s;
    }
    .logo:hover{
        transform: scale(1.1);
    }
    .global-container{
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        max-width: 1120px;
        min-height: 100vh;
        position: relative;
        .video{
            position: absolute;
            height: auto;
            width: 50%;
            aspect-ratio: 16 / 9;
            display: flex;
            justify-content: center;
            align-items: center;
            border-radius: 24px;
            overflow: hidden;
            z-index: 2;
            max-width: 540px;
            top: 37.5%;
        }
        .container-up{
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 1;
            padding: 0 12px;
            max-width: 1100px;
            padding: 24px 12px 0 12px;
            .picture-left-container{
                width: 40%;
                h1{
                    font-size: 30px;
                    font-family: lexend;
                    color: #fff;
                    margin: 0 0 24px 72px;
                }
                img{
                    width: 100%;
                    height: auto;
                    border-radius: 24px;
                    box-shadow: 0px 0px 20px -2px #000000;
                    transition: 0.3s ease-out;
                }
                img:hover{
                    transform: scale(1.05);
                }
            }
            .logo{
                width: 15%;
                margin: 0 12px 135px 12px;
                height: auto;
            }
            .photos{
                width: 40%;
                border-radius: 24px;
                box-shadow: 0px 0px 20px -2px #000000;
                margin: 11vw 0 0 0;
                transition: 0.3s ease-out;
            }
            .photos:hover{
                transform: scale(1.05);
            }
        }
        .container-down{
            display: flex;
            .down-left-container{
                width: 42%;
                max-width: 452px;
                z-index: 2;
                .logo-container{
                    width: 50%;
                    display: flex;
                    img{
                        height: 120px;
                        width: auto;
                        margin: 0 12px;
                    }
                }
                p{
                    font-size: 18px;
                    font-family: lexend;
                    font-weight: 600;
                    background-color: white;
                    border-radius: 12px;
                    box-shadow: 3px 4px 0px 9px #000000;
                    margin: 84px 0 0 24px;
                    padding: 6px;
                }
            }
    
            .down-right-container{
                width: 56%;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: flex-end;
                .com-container{
                    z-index: 1;
                    width: 32%;
                    img{
                        width: 100%;
                        height: auto;
                        border-radius: 12px;
                        overflow: hidden;
                        transition: 0.3s ease-out;
                    }
                    img:hover{
                        transform: scale(1.05);
                    }
                    h1{
                        font-size: 30px;
                        font-family: lexend;
                        color: #fff;
                        text-align: center;
                    }
                }
                .chapter-container{
                    display: flex;
                    justify-content: flex-end;
                    .chapter-left{
                        border-radius: 12px;
                        overflow: hidden;
                        width: 47%;
                        height: auto;
                        transform: translateY(-60px);
                        transition: 0.3s ease-out;
                    }
                    .chapter-left:hover{
                        transform: translateY(-60px) translateX(-12px) scale(1.05);
                    }
                    .chapter-right{
                        border-radius: 12px;
                        overflow: hidden;
                        width: 47%;
                        height: auto;
                        transition: 0.3s ease-out;
                        transform: translate(-24px, -12px);
                    }
                    .chapter-right:hover{
                        transform: translate(-24px, -12px) scale(1.05);
                    }
                }
            }
        }
    }

    @media (max-width: 1400px) {
        .background{
            width: auto;
            height: 100%;
        }
    }

    @media (max-width: 900px) {
        .eclipse{
            width: 100%;
            height: 100%;    
        }
        .eclipse.left{
            bottom:-30%;
            left: -20vh;
        }
        .eclipse.right{
            top: -30%;
            right: -25vh;
        }
        .eclipse.top{
            left:-20vw;
            top: -50vh;
        }
        .eclipse.bottom{
            position: absolute;
            top: 30vh;
            left: 10vh;
        }
        .global-container{
            justify-content: unset;
            .video{
                width: 90%;
                max-width: unset;
                position: unset;
            }
            .container-up{
                padding: 84px 12px 0 12px;
                .logo{
                    margin: 0 12px 24px 12px;
                }
                .picture-left-container{
                    display: none;
                }
                .photos{
                    display: none;
                }
            }
            .container-down{
                flex-direction: column;
                align-items: center;
                .down-left-container{
                    width: 80%;
                    .logo-container{
                        display: none;
                    }
                    p{
                        font-size: 13px;
                        margin: 24px 0 0 0;
                        text-align: center;
                    }
                }
            }
            .down-right-container{
                .com-container{
                    display: none;
                }
                .chapter-container{
                    margin: 24px 0;
                    align-items: center;
                    justify-content: center!important;
                    width: 100%;
                    .chapter-right{
                        display: none;
                    }
                    .chapter-left{
                        transform: unset!important;
                        width: 90%!important;
                    }
                }
            }
        }
    }
`

export default StyledEden