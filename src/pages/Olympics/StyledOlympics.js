import styled from 'styled-components'

const StyledOlympics = styled.section`
    background: url(/assets/olympics/background.png) no-repeat center;
    background-size: cover;
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    padding-top: 80px;

    .pictures-container{
        width: 23%;
        height: auto;
        .logo{
            display: flex;
            justify-content: center;
            align-items: center;
            img{
                height: 5;
                width: auto;
                max-width: 50%;
            }
        }
        .deco{
            width: 100%;
            height: auto;
        }
    }
    .video{
        aspect-ratio: 9/16;
        width: 23%;
        height: auto;
        border-radius: 24px;
        overflow: hidden;
        margin: 0 1vw;
    }
    .text-container{
        width: 23%;
        p{
            font-size: 1vw;
            font-family: lexend;
            font-weight: 600;
            color: white;
            text-align: justify;
            padding: 12px;
            background: rgba(255, 255, 255, 0.55);
            border-radius: 24px;
        }
        img{
            width: 100%;
            height: auto;
        }
    }

    @media (max-width: 900px) {
        flex-direction: column;
        .pictures-container{
            width: 90%;
            .deco{
                display: none;
            }
        }
        .video{
            width: 90%;
            margin: 36px 0;
        }
        .text-container{
            width: 90%;
            p{
                font-size: 14px;
                max-height: unset;
            }
        }
    }
`

export default StyledOlympics