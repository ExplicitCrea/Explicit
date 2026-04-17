import styled from 'styled-components'

const StyledPaltay = styled.section`
    width: 100%;
    min-height: 100vh;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    overflow: hidden;

    .background {
        position: absolute;
        top: 0px;
        left: 0px;
        width: 100%;
        height: auto;
        z-index: 0;
    }

    .icon_list{
        z-index: 1;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        margin-top: 10vh;
        max-height: 25vh;
        max-width:95%;
        img{
            width: 7%;
            margin: 0 auto;
            transition: 0.3s;
        }
        img:hover{
            transform: scale(1.2);
        }
        img.person{
            width: 12%;
            margin: 0 auto;
        }
    }    

    .video{
        width: 70%;
        max-width: 1200px;
        aspect-ratio: 16 / 9;
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1;
        margin-top: 59vw;
        border-radius: 12px;
    }

    p{
        width: 70%;
        max-width: 1200px;
        font-size: 1.5vw;
        font-family: lexend;
        font-weight: 400;
        background-color: #62399f;
        color: #fff;
        margin-top: 50vw;
        border-radius: 12px;
        padding: 24px;
        margin-top: 10vh;
        z-index: 1;
        text-align:center;
    }

    @media (max-width: 900px) {
        overflow: hidden;
        background-color: #62399f;
        .background {
            width: auto;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            left: unset;
            z-index: 0;
            padding-top: 60px;
        }
        .video{
            width: 80%;
        }
        p{
            margin-top: 10vh;
            width: 80%;
            z-index: 1;
            font-size: 13px;
        }
        .icon_list{
            max-width: 100%;
            max-height: usnet;
            flex-wrap: wrap;
            margin-top: 10vh;
            gap: 2vw;
            img{
                width: 10%;
            }
            img.person{
                display: none;
            }
        }
    }
`

export default StyledPaltay