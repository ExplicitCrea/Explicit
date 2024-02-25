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