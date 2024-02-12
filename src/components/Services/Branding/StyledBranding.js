import styled from 'styled-components'

const StyledBranding = styled.section`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 80%;
    height: 49vw;
    background: url('/assets/services/branding/background.png') center center/cover no-repeat;
    background-size: auto 100%;
    position: relative;
    margin: 10vw 0 0 0;

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
        margin: 48px 0 0 0;
        .big-poster{
            width: 20%;
            margin: 0 16px;
        }
        .little-poster{
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            align-items: center;
            width: 10%;
            img{
                width: 100%;
                margin: 16px 0;
            }
        }
        .logo{
            width: 20%;
            margin: 0 16px;
        }
    }

    .second-logo{
        position: absolute;
        bottom: 36px;
        width: 15%;
    }
`

export default StyledBranding