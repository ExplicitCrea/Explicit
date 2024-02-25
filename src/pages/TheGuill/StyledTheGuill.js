import styled from "styled-components";

const StyledTheGuill = styled.section`
min-height: 100vh;
padding: 90px 0 0px 0px;
width: 100%;
background-color: #191C2E;
position: relative;
overflow: hidden;

.background {
    position: absolute;
    top: 0px;
    left: 0px;
    height: 100%;
    width: auto;
    z-index: 0;
}
p {
    overflow: auto;
    max-height: 160px;
    position: absolute;
    left: 36%;
    width: 35%;
    margin: 0px auto;
    border: 1px solid #333;
    padding: 10px;
    border-radius: 24px;
    font-family: lexend;
    font-size: 16px;
    color: aliceblue;
    text-shadow: 0px 0px 20px rgba(0, 0, 0, 0.5);
    background-color: rgb(255 255 255 / 42%);
    backdrop-filter: blur(50px);
    z-index: 1;
}
.container{
    width: 100%;
    z-index: 1;
    margin-bottom: 8vw;

    .video{
        width: 64%;
        height: auto;
        max-width: 1000px;
        aspect-ratio: 16/9;
        margin: 180px 0 0 50px;
        position: relative;
        z-index: 1;

        .icon-down{
            position: absolute;
            right: -35px;
            margin: 0px 12px;
                img{
                    height: 100px;
                    margin: 0px 12px;
                    width: auto;
                }
        }
    
        .icon-right {
            display: flex;
            flex-direction: column;
            align-items: center;
            position: absolute;
            right: -124px;
            bottom: -20%;
            img{
                width: auto;
                height: 100px;
                margin: 12px 0;
            }
        }
        .banners {
            width: 50%;
            position: absolute;
            bottom: calc(0px - 38%);
            left: 0px;
        }
    }


}

.logo {
    position: absolute;
    top: 84px;
    border-radius: 40px;
    width: 23%; 
    right: 3vw;
    z-index: 1;
}

@media (min-width: 1400px) {
    .background{
        width: 100%;
        height: auto;
    }

    p{
        left: 24%;
        width: 48%;
    }
}

@media (max-width: 1230px) {
    .container{
        .video{
            .banners{
                display: none;
            }
            .icon-right{
                bottom: -25%;
            }
        }
    }
}



@media (max-width: 900px) {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 270px 0 0 0;

    .background{
        height: 100%;
        width: auto;
        margin: 34px 0;
    }

    p{
        max-height: unset;
        width: 90%;
        text-align: justify;
        font-size: 18px;
        position: unset;
    }

    .container{
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;

        .video{
            width: 90%;
            height: auto;
            margin: 24px 0 40% 0;
            .icon-down{
                display: none;
            }
    
            .icon-right {
                display: none;
            }
    
            .banners {
                position: absolute;
                bottom: calc(0px - 100%);
                width: 100%;
                transform: unset;
                display: flex;
                justify-content: center;
                align-items: center;
            }
        }
    }
    .logo {
        display: none;
    }
}
`;

export default StyledTheGuill
