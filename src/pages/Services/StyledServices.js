import styled from 'styled-components'

const StyledServices = styled.main`
    background-color: #191C2E;
    padding-top: 6vw;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;

    h1,p{
        font-family: lexend;
        color: #FFFFFF;;
    }

    p{
        font-size: 1.2vw;
        color: #FFFFFF;
        font-weight: 500;
    }

    .title{
        font-size: 6vw;
        color: #634EFF;
        margin: 24px 0 0 0;
        text-align: center;
    }

    .description{
        margin: 0 0 48px 0;
        text-align: center;
        max-width: 75vw;
    }

    .linear-background{
        position: absolute;
        top: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(76deg, rgba(99, 78, 255, 0.13) 8.2%, rgba(100, 255, 169, 0.13) 97.96%);
    }
    .video-container-background{
        position: absolute;
        top: 10vw;
        width: 100%;
        height: 75vw;
        mask-image: radial-gradient(58.45% 37.45% at 49.06% 58.82%, rgba(37, 32, 32, 0.64) 0%, rgba(25, 28, 46, 0.64) 0.01%, rgba(217, 217, 217, 0.00) 100%);
        z-index: 0;

        .video-background{
            width: 100%;
        }
    }
`

export default StyledServices