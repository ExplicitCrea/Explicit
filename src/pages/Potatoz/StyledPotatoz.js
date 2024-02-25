import styled from 'styled-components'

const StyledPotatoz = styled.section`
    background: url('/assets/potatoz/background.webp') no-repeat center center fixed;
    position: relative;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    padding-top: 80px;
    overflow: hidden;

    .background{
        position: absolute;
        width: 80%;
        z-index: 0;
        max-width: 1100px;
    }

    .wrapper-title{
        width: 100%;
        height: 150px;
        overflow: hidden;
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1;
        .title {
            max-width: 950px;
            width: 60%;
            height: auto;
        }
    }

    .container{
        display: flex;
        flex-direction: column;
        z-index: 1;
        .video{
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            .wrapper{
                position: relative;
                width: 70%;
                max-width: 900px;
                aspect-ratio: 16 / 9;
                display: flex;
                justify-content: center;
                align-items: center;
                .deco{
                    max-width: 200px;
                    position: absolute;
                    top: 21%;
                    left: -15%;
                    width: 111vw;
                    height: auto;
                }
            }
        }
        .description{
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 36px 10%;
            z-index: 1;
            img{
                height: 150px;
                width: auto;
                margin-right: 12px;
            }
            p{
                display: flex;
                justify-content: center;
                width: auto;
                max-width: 1100px;
                font-size: 18px;
                font-family: lexend;
                font-weight: 400;
                background-color: #181A1B;
                color: #fff;
                margin: 0 0 0 12px;
                padding: 24px 24px;
                overflow: auto;
                text-align: center;
            }
        }
    }

    
    @media (max-width: 900px) {
        justify-content: flex-start;
        .container{
            flex-direction: column-reverse;
            .description{
                .follow{
                    display: none;
                }
                p{
                    height: auto;
                    border-radius: 12px;
                    text-align: justify;
                    margin: 24px 0;
                }
            }
            .video{
                .wrapper{
                    flex-direction: column;
                    .deco{
                        position: static;
                        width: 324px;
                    }
                }
            }
        }

        .wrapper-title{
            width: 180%;
        }

        .background{
            width: auto;
            height: 80%;
            z-index: 0;
        }
    }
`

export default StyledPotatoz