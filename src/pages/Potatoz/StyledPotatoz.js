import styled from 'styled-components'

const StyledPotatoz = styled.section`
    background: url('/assets/potatoz/background.webp') no-repeat;
    background-size: cover;
    position: relative;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    padding-top: 80px;
    overflow: hidden;

    .lumiere{
        position: absolute;
        top: 0;
        left: 0;
        width:100%;
    }

    .wrapper-title{
        width: 100%;
        height: 150px;
        overflow: hidden;
        display: flex;
        align-items: center;
        justify-content: right;
        z-index: 1;
        .title {
            max-width: 950px;
            width: 60%;
            height: auto;
            margin-right: 10%;
        }
    }

    .container{
        display: flex;
        flex-direction: column;
        z-index: 1;
        width: 100%;
        align-items: flex-end;
        .videowrapper{
            width: 100%;
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: space-evenly;
            margin: 0 0 2vh 0;
            video{
                margin:0 14vw 0 19vw;
                position: relative;
                width: 50%;
                aspect-ratio: 16 / 9;
                display: flex;
                justify-content: center;
                align-items: center;
                border-radius: 32px;
            }
            .wrapper_double{
                position:relative;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                margin: auto auto auto 10vw;
                .deco{
                    width: 19vw;
                    height: auto;
                    filter: drop-shadow(0px 0px 12px #000);
                    -webkit-filter: drop-shadow(0px 0px 12px #000);
                    -moz-filter: drop-shadow(0px 0px 12px #000);
                    -o-filter: drop-shadow(0px 0px 12px #000);
                    -ms-filter: drop-shadow(0px 0px 12px #000);
                    transition: 0.5s;
                }
                .deco:hover{
                    filter: drop-shadow(0px 0px 12px #000) drop-shadow(0px 0px 2px #000);
                    transform: scale(1.1);
                }
                .explo_jouet{
                    position: absolute;
                    top:0;
                    left: 0;
                    transform: translate(-20%, -20%);
                    z-index: -1;
                    width: 200%;
                    filter: drop-shadow(2px 2px 10px #000);
                }
            }
            .deco{
                width: 19vw;
                height: auto;
                filter: drop-shadow(0px 0px 12px #000);
                -webkit-filter: drop-shadow(0px 0px 12px #000);
                -moz-filter: drop-shadow(0px 0px 12px #000);
                -o-filter: drop-shadow(0px 0px 12px #000);
                -ms-filter: drop-shadow(0px 0px 12px #000);
                transition: 0.5s;
            }
            .deco:hover{
                filter: drop-shadow(0px 0px 12px #000) drop-shadow(0px 0px 2px #000);
                transform: scale(1.1);
             }
            .explo_jouet{
                position: absolute;
                top: 10%;
                left: 0;
                z-index: -1;
                width: 40%;
                filter: drop-shadow(2px 2px 10px #000);
            }
        }
        p.description{
            align-items: center;
            z-index: 1;
            display: flex;
            justify-content: center;
            width: 35%;
            border-radius: 12px;
            font-size: 18px;
            font-family: lexend;
            font-weight: 400;
            color: #fff;
            margin: auto 17vw auto auto;
            padding: 0.5vw 0.7vw;
            overflow: auto;
            text-align: center;
            background-color: #3200FF;
        }
    }

    
    @media (max-width: 900px) {
        justify-content: flex-start;
        .lumiere{
            position: absolute;
            top: 6.5vh;
            left: -73vw;
            width: 185%;
            height: auto;
        }
        .container{
            flex-direction: column-reverse;
            p.description{
                font-size: 0.7em;
                margin: auto auto 5vh auto;
                width: 90%;
                padding: 1.5vw 1vw;
            }
            .videowrapper{
                flex-direction: column-reverse;
                video{
                    margin: 0 auto 5vh auto;
                    width: 90%;
                }
                .wrapper{
                    width: 90%;
                }
                .wrapper_double{
                    display: flex;
                    flex-direction: column;
                    .deco{
                        width: 35%;
                        margin: 4vh auto;
                    }
                    .explo_jouet{
                        width: 75%;
                        top: 13%;
                        left: 25%;
                    }
                }
            }
        }
        .wrapper-title{
            justify-content: center;
            width: 125%;
            .title{
                margin: 0;
                width: 100%;
                object-fit: cover;
            }
        }
    }
`

export default StyledPotatoz