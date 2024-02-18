import styled from 'styled-components'

const StyledPg = styled.section`
    padding: 92px 0 0 0;
    background-image: url('/assets/pg/background.jpg');
    background-size: cover;
    min-height: 100vh;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;

    .global{
        width: 70%;
        margin: 0 0 0 26%;
        max-width: 1200px;
        .presentation{
            display: flex;
            align-items: center;
            justify-content: flex-start;
            .text{
                margin-left: 24px;
                h1{
                    margin: 0;
                    font-size: 4vw;
                    font-family: 'Mango';
                    color: #fff;
                    span {
                        margin-left: 6px;
                        color: transparent;
                        -webkit-text-stroke-width: 1px;
                        -webkit-text-stroke-color: #285EB8;
                    }
                }
                p{
                    font-size: 1vw;
                    font-weight: 500;
                    font-family: lexend;
                    margin: 0;
                    color: #fff;
                }
            }
            img{
                width: 10vw;
                height: 10vw;

            }
        }

        .examples{
            width: 100%;
            margin: 1vw 0 0 0;
            z-index: 0;
            .container{
                width: 100%;
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 0;
                .video{
                    width: 50%;
                    height: auto;
                    max-width: 1200px;
                    aspect-ratio: 16 / 9;
                    border-radius: 24px;
                    overflow: hidden;
                    margin: 12px;
                    z-index: 0;
                }
            }
        }
    }

    .deco{
        bottom: -10%;
        position: absolute;
        left: -10vw;
        width: 40vw;
        height: auto;
    }

    @media (max-width: 1350px) {
        .global{
            width: 80%;
            margin: 0;
        }
        .deco{
            display: none;
        }
    }

    @media (max-width: 900px) {
        .global{
            width: 90%;
            .presentation{
                flex-direction: column;
                align-items: center;
                justify-content: center;
                .text{
                    margin: 0;
                    h1{
                        text-align: center;
                        font-size: 36px;
                    }
                    p{
                        text-align: center;
                        font-size: 13px;
                    }
                }
                img{
                    width: 40vw;
                    height: 40vw;
                }
            }
            .examples{
                .container{
                    flex-direction: column;
                    .video{
                        width: 100%;
                    }
                }
            }
        }
    }
`

export default StyledPg