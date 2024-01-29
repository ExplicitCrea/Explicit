import styled from 'styled-components'

const StyledPotatoz = styled.section`
    background: url('src/assets/potatoz/background.png') no-repeat center center fixed;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    padding-top: 80px;
    overflow: hidden;

    .wrapper-title{
        width: 100%;
        height: 150px;
        overflow: hidden;
        display: flex;
        align-items: center;
        justify-content: center;
        .title {
            max-width: 950px;
            width: 60%;
            height: auto;
        }
    }

    .container{
        display: flex;
        flex-direction: column;
        .video{
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            .wrapper{
                position: relative;
                width: 70%;
                max-width: 1040px;
                aspect-ratio: 16 / 9;
                display: flex;
                justify-content: center;
                align-items: center;
                .deco{
                    max-width: 1641px;
                    position: absolute;
                    top: -133px;
                    left: -58vw;
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
            img{
                height: 150px;
                width: auto;
                margin-right: 12px;
            }
            p{
                display: flex;
                justify-content: center;
                height: 150px;
                width: auto;
                max-width: 1200px;
                font-size: 18px;
                font-family: lexend;
                font-weight: 400;
                background-color: #181A1B;
                color: #fff;
                margin: 0 0 0 12px;
                padding: 24px 24px;
                overflow: auto;
            }
        }
    }

    @media (min-width: 1500px) {
        .container{
            .wrapper{
                .deco{
                    left: -850px!important;
                }
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
    }
`

export default StyledPotatoz