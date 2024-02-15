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
    height: auto;
    width: 100%;
    z-index: 0;
}
p {
    position: absolute;
    left: 25%;
    width: 47%;
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

    .video{
        width: 50%;
        height: auto;
        max-width: 1230px;
        aspect-ratio: 16/9;
        overflow: hidden;
        margin: 192px 0 0 24px;
    }

    .icon-down{
        position: absolute;
        right: 63vw;
        top: 37vw;
            img{
                width: 16%;
                height: auto;
                margin: 0 12px;
            }
    }

    .icon-right {
        display: flex;
        flex-direction: column;
        position: absolute;
        right: 52vw;
        top: 17vw;
        img{
            width: 7%;
            height: auto;
            margin: 12px 0;
        }
    }

    .pannels {
        position: absolute;
        left: 0vw;
        width: 28%;
        z-index: 1;
        top: 36vw;
        transform: rotate(-3deg);
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
@media (max-width: 900px) {

.background-container {
    height: 100vh; 
}

p{
    width: 91%;
    left: 1%;
    top: 68px;
    font-size: 9px;
}

.container{
    
    width: 100%;
    top: 22vw;
    .video{
        width: 68%;
    }
}

    .icon-down{
        right: 64vw;
        width: 70%;
        top: 65vw;
        img{
        padding: 0 0 0 0 ;
        }
    }

    .icon-right{
        display: flex;
        flex-direction: row-reverse;
        right: 27vw;
        top: 66vw;
        width: 16%;
        img{
            width: 70%;
    padding: 0px 1px 0px 1px;
    }
}
}
`;

export default StyledTheGuill
