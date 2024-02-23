import styled from 'styled-components'


const StyledEden = styled.section`
display: flex;
align-items: center;
justify-content: center;
width: 100%;
background-color: #191C2E;
position: relative;
z-index: 1;
overflow: hidden;
min-height: 100vh;

.background {
    position: absolute;
    top: 0px;
    left: 0px;
    height: 100vh;
    width: 100%;
    z-index: -1;
}

h1{
    position: absolute;
    font-size: 30px;
    font-family: 'Lexend';
    top: 4vw;
    left: 235px;
    color: white;
}

.video{
    width: 37%;
    position: absolute;
    height: auto;
    max-width: 1200px;
    aspect-ratio: 16/9;
    overflow: hidden;
    border-radius: 40px;
    margin: 170px 0px 0 0px;
    z-index: 1;
    }

.container {
    display: flex;
    justify-content: center;
    align-items: flex-start;
    position: absolute;
    top: 8vw;
    width: 50%;
    height: 100%;
    }

        .container img,
        .container.logo {
            border-radius: 45px;
            width: 100%;
            height: 42%;
    }

        .container img:last-child {
            margin-top: 7%;
    }

        .logo {
            margin: -11% -7%;
    }

    .containers {
        position: absolute;
        left: -47%;
        bottom: -85px;
        display: flex;
        flex-direction: column;
        align-items: center;

        .logo-img {
            width: 12%;
            position: relative;
            height: auto;
            top: -245px;
            left: -7%;
    }   

        .barre-img {
            position: absolute;
            bottom: 58px;
            width: 25%;
            height: 30%;
        }
}

    .text-overlay {
        max-height: 30vh;
        top: 82%;
        position: absolute;
        left: 10%;
        width: 34vw;
        margin: 0px auto;
        border: 1px solid #333;
        padding: 6px;
        border-radius: 14px;
        color: aliceblue;
        text-shadow: 0px 0px 12px rgba(0, 0, 0, 0.5);
        background-color: rgb(255 255 255 / 50%);
        backdrop-filter: blur(50px);
        overflow: hidden;

        p{
            width: auto;
            font-family: lexend;
            font-size: 16px;
            text-align: justify;
        }
    }

    .chapitre {
        display: flex;
        align-items: center;
        justify-content: center;
    }

        h2 {
            position: absolute;
            font-size: 30px;
            left: 70%;
            top: 65%;
            color: white;
            font-family: "lexend";
    }

        .chapitre img {
            position: absolute;
            border-radius: 25px;
    }

        .img-top-right {
            top: 66%;
            right: 78px;
            width: 15%;
    }

        .img-middle {
            top: 80%;
            left: 70%;
            width: 15%;
        }

        .img-bottom {
            bottom: 10px;
            left: 54%;
            width: 16%;
}


@media (max-width: 900px) {
    .background{
        height: 100%;
        width: auto;
    }

    h1{
        display: none;
    }

    h2{
        display: none;
    }

    .video{
        position: absolute;
        width: 90%;
        margin: auto 0px;
    }

    .container img:not(.logo) {
        display: none; 
}
        img.logo{
            position: relative;
            width: 100%;
            height: 60vw;
            margin-top: 5px;
    }

    .containers {
        left: -4%;
        bottom: -17%;
    }

        .barre-img {
            display: none;
        }

        .bloc-img {
            height: 53vh;
            width: 76%;
        }

    .text-overlay {
        top: 90%;
        height: auto;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 90%;
        
        p {
            font-size: 11px;
        }
    }
        .containers{
            .logo-img {
                width: 50%;
                left: -25vw;
                height: auto;
                top: -61vw;
            }
}

    .chapitre img:not(.img-bottom) {
        display: none;
    }

        .img-bottom {
            left: 42%;
            top: 116vw;
            width: 45%;
    }
}
`

export default StyledEden