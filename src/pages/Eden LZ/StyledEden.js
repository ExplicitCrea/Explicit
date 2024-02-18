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

    .logo-img {
        width: 14%;
        height: auto;
        margin-top: 20px; 
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
        top: 62%;
        left: 37%;
        transform: translate(-50%, -50%);
        color: black;
        text-align: justify;
}

    .text-overlay p {
        font-size: 17px;
        width: 104%;
        margin: 0px -329px;
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
        font-family: lexend;
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

`

export default StyledEden