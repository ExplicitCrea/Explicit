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
    position: relative;
    width: 100%;
    z-index: 1;
    margin-bottom: 8vw;

    .video{
        width: 50%;
        height: auto;
        max-width: 1230px;
        aspect-ratio: 16/9;
        overflow: hidden;
        margin: 180px 0 0 50px;
    }

    .icon-down{
        position: absolute;
        display: flex;
        justify-content: center;
        right: 5vw;
        margin: 0px 12px;
            img{
                height: auto;
                margin: 0px 35px;
                width: 6%;
            }
    }

    .icon-right {
        display: flex;
        flex-direction: column;
        position: absolute;
        width: 5%;
        right: 40vw;
        top: 7vw;
        img{
            height: auto;
            margin: 12px 0;
        }
    }

    .pannels {
        position: absolute;
        left: 5vw;
        width: 20%;
        z-index: 1;
        top: 27vw;
        transform: skewX(15deg);
        img{
            width: 51%;
            margin: 4px 0px;
        }
    }
    .pannels2 {
        position: absolute;
        left: 17vw;
        width: 20%;
        z-index: 1;
        top: 27vw;
        transform: skewX(15deg);
        img{
            width: 51%;
            margin: 4px 0px;
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
            margin: 24px 0;
        }

        .icon-down{
            display: none;
        }

        .icon-right {
            display: none;
        }

        .pannels {
            position: unset;
            width: 100%;
            transform: unset;
            display: flex;
            justify-content: center;
            align-items: center;
            img{
                width: 45%;
            }
        }

        .pannels2 {
            position: unset;
            width: 100%;
            transform: unset;
            display: flex;
            justify-content: center;
            align-items: center;
            img{
                width: 45%;
            }
        }
    }
    .logo {
        display: none;
    }
}
`;

export default StyledTheGuill
