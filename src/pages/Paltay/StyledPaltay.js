import styled from 'styled-components'

const StyledPaltay = styled.section`
    width: 100%;
    min-height: 100vh;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;

    .background {
        position: absolute;
        top: 0px;
        left: 0px;
        width: 100%;
        height: auto;
        z-index: -1;
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
    }

    p{
        width: 70%;
        max-width: 1200px;
        font-size: 1.5vw;
        font-family: lexend;
        font-weight: 400;
        background-color: #181A1B;
        color: #fff;
        margin-top: 50vw;
        border-radius: 12px;
        padding: 24px;
        margin-top: 17vw;
    }

    .picture{
        position: absolute;
        bottom: -42vw;
        width: 50%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        background-color: #181A1B;
        border-radius: 12px;
        padding: 60px;
        img{
            width: 10%;
            height: auto;
        }
    }

    @media (max-width: 900px) {
        overflow: hidden;
        background-color: #181A1B;
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
        .picture{
            width: 80%;
            position: static;
            z-index: 1;
            padding: 12px;
            margin: 10vw;
        }
        .video{
            width: 80%;
        }
        p{
            width: 80%;
            z-index: 1;
            font-size: 13px;
        }
    }
`

export default StyledPaltay