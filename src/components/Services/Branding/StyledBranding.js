import styled from 'styled-components'

const StyledBranding = styled.section`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 80%;
    height: 49vw;
    background: url('/assets/services/branding/background.webp') center center/cover no-repeat;
    background-size: auto 100%;
    position: relative;
    margin: 10vw 0 0 0;
    z-index: 4;
    border-radius: 80px;
    box-shadow: 0px 6px 15px 13px #00000040;
    .text-container {
        position: absolute;
        top: -24px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        h1{
            font-size: 4vw;
            text-align: center;
            margin: 48px 0 0 0;
        }
        p{
            width: 60%;
            font-size: 1vw;
            text-align: center;
        }
    }

    .poster-container{
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        margin: 12px 0 0 0;
        position: relative;
        .big-poster{
            width: 25%;
            margin: 0 16px;
            &.left{
                margin: 0 5vw 0 0;
            }
            &.right{
                margin: 0 0 0 5vw;
            }
        }
        .little-poster{
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            align-items: center;
            width: 13%;
            img{
                width: 100%;
                margin: 16px 0;
            }
        }
        .logo{
            position: absolute;
            width: 25%;
            margin: 0 16px;
            z-index: 1;
        }
    }

    .second-logo{
        position: absolute;
        bottom: 36px;
        width: 15%;
    }

    @media (max-width: 900px) {
        width: 85%;
        height: auto;
        border-radius: 24px;
        overflow: hidden;
        .text-container {
            position: unset;
            h1{
                font-size: 36px;
                text-align: center;
                margin: 24px 0 0 0;
            }
            p{
                width: 80%;
                font-size: 14px;
                text-align: justify;
            }
        }
        .poster-container{
            flex-direction: column;
            margin: 36px 0;
            .little-poster{
                width: 100%;
                flex-direction: row;
                justify-content: center;
                img{
                    width: 25%;
                    margin: 0 6px;
                }
            }
            .big-poster{
                display: none;
            }

            .logo{
                position: unset;
                margin: 16px 0px;
            }
        }
    }
`

export default StyledBranding