import styled from "styled-components";

const StyledTheGuill = styled.section`

.background-container {
    height: 70vw;
    width: 100%;
    background: url(/assets/guill/background.png) no-repeat;
    background-position: center;
    background-size: cover;

}
p {
    width: 47%;
    left: -3vw;
    margin: 0px auto;
    border: 1px solid #333;
    padding: 10px;
    border-radius: 24px;
    font-family: lexend;
    font-size: 16px;
    color: aliceblue;
    text-shadow: 0px 0px 20px rgba(0, 0, 0, 0.5);
    top: 5vw;
    background-color: rgb(255 255 255 / 42%);
    backdrop-filter: blur(50px);
    position: relative;
    z-index: 1;
}
.container{
    position: relative;
    right: -1vw;
    width: 130%;
    top: 7vw;
    

    .video{
        width: 50%;
        height: auto;
        max-width: 1230px;
        aspect-ratio: 16 / 9;
        overflow: hidden;
        margin: 12px;
        z-index: 0;
        }
    }

        .icon-down{
            display: flex;
            flex-direction: row;
            justify-content: end;
            position: absolute;
            right: 63vw;
            top: 37vw;

        img{
            width: 16%;
            padding: 0px 0px 0px 50px;
        }
}

.icon-right {
    display: flex;
    flex-direction: column;
    position: absolute;
    right: 52vw;
    width: 7%;
    top: 17vw;
    img{
        padding: 8px;
        margin: 0 0 5px 0px;
    }
}

.logo {
    position: absolute;
    top: 84px;
    border-radius: 40px;
    width: 23%; 
    right: 3vw

}
.pannels {
    position: absolute;
    left: 0vw;
    width: 28%;
    z-index: 1;
    top: 36vw;
    transform: rotate(-3deg);

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
