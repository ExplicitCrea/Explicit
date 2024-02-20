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
    height: 100%;
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
    left: 150px;
    bottom: -7vw;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
}

        img.logo-img {
            width: 14%;
            position: relative;
            height: auto;
            top: 11vw;
    }

        .bloc-img {
            width: 40%;
            height: 30vw;
    }

        .barre-img {
            position: absolute;
            bottom: 90px;
            width: 39%;
            height: 7vw;
    }

    .text-overlay {
        position: absolute;
        top: 85%;
        left: -1%;
        transform: translate(14%, -44%);
        color: black;
        text-align: justify;
    }

        .text-overlay p {
            font-size: 11px;
            font-family: 'lexend';
            width: 21%;
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
            top: 32vw;
            right: 145px;
            width: 14%;
    }

        .img-middle {
            top: 80%;
            left: 69%;
            width: 16%;
    }

        .img-bottom {
            bottom: 4px;
            left: 53%;
            width: 17%;
    }

@media (max-width: 1000px) {
    display: flex;
    flex-direction: column;
    align-items: center;

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
        width: 90%;
        margin: auto 0px;
    }

    .container img:not(.logo) {
        display: none; 
}
        img.logo{
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
            position: absolute;
            top: 66%;
            left: 42%;
            transform: translate(-50%, -50%);
            color: black;
            text-align: justify;
        }

        .text-overlay p {
            font-size: 9px;
            width: 65%;
            margin: 0px 0px 6px -26px;
        }

        p.long {
            width: 98%;
            margin: -7px 0px 24px -26px;
        }

        img.logo-img {
            width: 46%;
            left: 9vw;
            height: auto;
            top: 33vw;
        }

    .chapitre img:not(.img-bottom) {
        display: none;
    }

        .img-bottom {
            left: 42%;
            top: 117vw;
            width: 57%;
    }
}
`

export default StyledEden