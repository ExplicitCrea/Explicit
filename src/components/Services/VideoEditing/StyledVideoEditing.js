import styled from 'styled-components'

const StyledVideoEditing = styled.section`
    width: 100%;
    height: 40vw;
    padding: 0 36px;
    display: flex;
    justify-content: space-between;
    margin-top: 9vw;
    z-index: 1;

    .text-container{
        width: 40%;
        h1{
            width: 100%;
            font-size: 6vw;
            margin: 0;
            line-height: 6vw;
        }
    
        p{
            width: 100%;
            margin-top: 36px;
        }
    }

    .video-container{
        width: 60%;
        .carousel-container{
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-top: 8vw;
            svg{
                width: 5vw;
                height: 5vw;
                color: #fff;
                cursor: pointer;
            }
            .wrapper{
                width: 90%;
                aspect-ratio: 16 / 9;
                display: flex;
                justify-content: center;
                align-items: center;
                border-radius: 3vw;
                overflow: hidden;
                background-color: #000;
            }
        }

        .title-container{
            width: 90%;
            display: flex;
            align-items: center;
            margin: 3vw 0 0 4vw;
            .image-wrapper{
                width: 5vw;
                height: 5vw;
                min-width: 5vw;
                min-height: 5vw;
                border-radius: 50%;
                overflow: hidden;
                img{
                    width: 100%;
                    height: auto;
                }
            }
            .text-title{
                width: 83%;
                margin-left: 0.6vw;
                h2{
                    margin: 0;
                    font-size: 1.5vw;
                    font-family: lexend;
                    color: #fff;
                }
                p{
                    font-size: 1vw;
                    margin: 0;
                }
            }
        }
    }

    @media (max-width: 900px) {
        margin-top: 0;
        flex-direction: column;
        align-items: center;
        padding: 0 24px;
        height: unset;

        .text-container{
            width: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
            h1{
                font-size: 36px;
                line-height: 36px;
                text-align: center;
            }
            p{
                font-size: 14px;
                margin-top: 24px;
                text-align: justify;
                max-width: 550px;
            }
        }

        .video-container{
            width: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
            .title-container{
                width: 90%;
                margin: 24px 0 0 0;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                .image-wrapper{
                    width: 48px;
                    height: 48px;
                }
                .text-title{
                    display: flex;
                    flex-direction: column-reverse;
                    align-items: center;
                    justify-content: center;
                    h2{
                        font-size: 13px;
                        text-align: center;
                        height: 60px;
                    }
                    p{
                        font-size: 18px;
                    }
                }
            }
            .carousel-container{
                margin-top: 24px;
                svg{
                    width: 36px;
                    height: 36px;
                }
            }
        }
    }
`

export default StyledVideoEditing