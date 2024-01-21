
import styled from 'styled-components'

const StyledHome = styled.main`
    padding: 80px;
    background-color: #191C2E;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    overflow: hidden;

    h1{
        z-index: 4;
        margin-top: 8vw;
        font-family: lexend;
        font-size: 2vw;
        color: #FFFFFF;
        width: 36vw;
        text-align: center;
        span{
            color: #634EFF;
        }
    }

    p{
        z-index: 4;
        margin-top: 2vw;
        font-family: lexend;
        font-size: 1.2vw;
        color: #FFFFFF;
        width: 50vw;
        text-align: center;
        font-weight: 100;
    }

    h2{
        z-index: 4;
        margin: 8vw 0;
        font-family: lexend;
        font-size: 2vw;
        color: #FFFFFF;
        width: 36vw;
        text-align: center;
    }

    .menu-container{
        z-index: 4;
        width: 50vw;
        height: 50vw;
        background: rgba(217, 217, 217, 0.03);
        backdrop-filter: blur(29px);
        border-radius: 3vw;
        padding: calc(1vw + 0.2vw);
        display: grid;
        grid-template-columns: 50% 50%;
        grid-template-rows: 100%;
        box-shadow: 0px 0px 40.1px 0px rgba(0, 0, 0, 0.81);

        .link-container{
            display: grid;
            grid-template-columns: 99%;
            grid-template-rows: 4% 4% 4% 4% 4% 4% 4% 4% 4% 4% 4% 4% 4% 4% 4% 4% 4% 4% 4% 4%;
            gap: 1%;
            .link{
                width: 100%;
                height: 100%;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: flex-end;
                border-radius: 3vw;
                border: 0.2vw solid #454357;
                background: rgba(15, 16, 28, 0.70);
                text-decoration: none;
                h3{
                    font-family: lexend;
                    font-size: 2vw;
                    color: #FFFFFF;
                    margin: 1vw 0;
                    text-align: center;
                    margin: 1vw 0 0.5vw 0;
                }
                img{
                    width: 70%;
                    height: auto;
                    opacity: 0.5;
                    transition: 300ms;
                }
                :hover{
                    opacity: 1;
                }
            }
            .star{
                grid-area: 1 / 1 / 11 / 1;
            }
            .contact{
                grid-area: 11 / 1 / 16 / 1;
                justify-content: center;
                h3{
                    margin: 0;
                }
            }
            .history{
                grid-area: 16 / 1 / 21 / 1;
                justify-content: center;
                h3{
                    margin: 0;
                }
            }
            .book{
                img{
                    width: 100%;
                    height: auto;
                }
                grid-area: 1 / 1 / 13 / 1;
            }
            .basket{
                grid-area: 13 / 1 / 21 / 1;
                h3{
                    margin-top: 0;
                }
            }
        }

    }

    .background-filter{
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        z-index: 1;
        background: rgba(99, 78, 255, 0.04);
    }

    .classic-star{
        transform: rotate(146deg);
        width: 70vw;
        z-index: 0;
        position: absolute;
        top: 8vw;
        left: -28vw;
    }

    .reverse-star{
        width: 100vw;
        position: absolute;
        top: 53vw;
        right: -52vw;
        z-index: 2;
    }

    .background-star{
        width: 300vw;
        height: auto;
        position: absolute;
        bottom: -137vw;
        left: -157vw;
        z-index: 1;
        opacity: 0.2;
    }

    .elipse-header{
        width: 100vw;
        height: 100vw;
        position: absolute;
        top: -44vw;
        right: -49vw;
        z-index: 3;
        border-radius: 50%;
        background: radial-gradient(40.25% 69.72% at 50% 50%, rgba(99, 78, 255, 0.15) 0%, rgba(100, 255, 169, 0.15) 0.01%, rgba(100, 255, 169, 0.00) 100%);
        transform: rotate(133deg);
    }

    .elipse-footer{
        width: 100vw;
        height: 100vw;
        position: absolute;
        bottom: 5vw;
        left: -55vw;
        z-index: 3;
        border-radius: 50%;
        background: radial-gradient(50% 50% at 50% 50%, rgba(100, 255, 169, 0.12) 0.15%, rgba(100, 255, 169, 0.00) 99.99%, rgba(100, 255, 169, 0.00) 100%, rgba(100, 255, 169, 0.00) 100%);
        transform: rotate(133deg);
    }

    .elipse-footer-blue{
        width: 200vw;
        height: 100vw;
        position: absolute;
        bottom: -55vw;
        left: -55vw;
        z-index: 3;
        border-radius: 50%;
        background: radial-gradient(50% 50% at 50% 50%, rgba(99, 78, 255, 0.22) 0%, rgba(99, 78, 255, 0.00) 100%);
        transform: rotate(194deg);
    }
`

export default StyledHome