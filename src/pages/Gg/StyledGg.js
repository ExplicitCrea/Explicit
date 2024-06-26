import styled from 'styled-components'

const StyledGg = styled.section`
    min-height: 100vh;
    background: url('/assets/gg/background.webp') no-repeat center center fixed;
    background-size: auto 120%;
    padding-top: 92px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;

    .container{
        max-width: 1100px;
        max-height: 616px;
        width: 80vw;
        height: 40vw;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 24px;
        position: relative;
        z-index: 0;
        p{
            width: 50%;
            position: absolute;
            bottom: -49%;
            right: 0;
            font-size: 18px;
            font-family: lexend;
            font-weight: 400;
            background-color: #F34344;
            color: #fff;
            z-index: 2;
            margin: 0;
            padding: 12px 12px;
        }
        .left-container{
            height: 100%;
            width: 50%;
            position: relative;
            z-index: 1;
            .image{
                width: 100%;
                height: 50%;
                overflow: hidden;
                display: flex;
                align-items: center;
                justify-content: center;
                img{
                    width: 100%;
                    height: auto;
                }
            }
            .video{
                position: absolute;
                bottom: 0;
                left: 0;
                height: auto;
                width: 100%;
                aspect-ratio: 16 / 9;
                display: flex;
                justify-content: center;
                align-items: center;
            }
        }
        .right-container{
            height: 100%;
            width: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            overflow: hidden;
            z-index: 1;
            .scene{
                width: 100%;
                height: auto;
            }
        }
        .logo-top{
            position: absolute;
            top: -6vw;
            right: -7vw;
            width: 20%;
            height: auto;
            z-index: 2;
        }
        .logo-middle{
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 30%;
            height: auto;
            z-index: 2;
        }
        :where(.logo-top, .logo-middle){
            transition: 400ms cubic-bezier(0.03, 0.98, 0.52, 0.99) 0s;
        }
        .logo-top:hover:hover{
            transform: scale(1.1);
        }
        .logo-middle:hover{
            transform: translate(-50%, -50%) scale(1.1);
        }
        .background{
            position: absolute;
            // bottom: -5.2vw;
            // left: -3.3vw;
            bottom: -4.2vw;
            left: -2.3vw;
            width: auto;
            height: 100%;
            z-index: 0;
        }
    }

    @media (min-width: 1225px) {
        .container{
            p{
                bottom: -13%;
            }
        }
    }

    @media (max-width: 900px) {
        justify-content: center;
        align-items: flex-start;
        .container{
            width: 100%;
            height: auto;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: flex-start;
            max-height: unset;
            p{
                position: static;
                width: 100%;
                max-height: none;
                overflow: visible; 
                font-size: 1em;
            }
            .logo-middle{
                width: 90%;
                position: absolute;
                transform: none;
                left: 5%;
                top: 65vh;
                margin: auto;
            }
            .logo-middle:hover{
                transform: none;
            }
            .background{
                display: none;
            }
            .logo-top{
                // width: 50%;
                // position: absolute;
                // margin: 24px;
                display:none;
            }
            .left-container{
                width: 100%;
                .image{
                    display: none;
                }
                .video{
                    position: static;
                    height: auto;
                    width: 100%;
                }
            }
            .right-container{
                display: none;
            }
        }
    }

    @media (max-width: 750px) {
        .container{
            p{
                font-size: 0.9em;
            }   
            .logo-middle{
                top: 60vh; 
            }
        }
    }
`

export default StyledGg