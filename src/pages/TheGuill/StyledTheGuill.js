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
    padding: 25px;
    border-radius: 34px;
    font-family: lexend;
    font-size: 16px;
    color: aliceblue;
    text-shadow: 0px 0px 20px rgba(0, 0, 0, 0.5);
    top: 6vw;
    background-color: rgb(255 255 255 / 42%);
    backdrop-filter: blur(50px);
    position: relative;
    z-index: 1;
}
.container{
    position: relative;
    right: -1vw;
    width: 149%;
    top: 9vw;

                .video{
                    width: 50%;
                    height: auto;
                    max-width: 1230px;
                    aspect-ratio: 16 / 9;
                    border-radius: 24px;
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
        right: 85vw;
        width: 35%;
        top: 37vw;
        img{
            width: 24%;
            padding: 0px 0px 0px 65px;
        };
}
.icon-right {
    display: flex;
    flex-direction: column;
    position: absolute;
    right: 42vw;
    width: 26%;
    top: 15vw;
        img{
            width: 24%;
            padding: 22px 0 0 0;
        }
}

.logo {
    position: absolute;
    top: 100px;
    border-radius: 40px;
    width: 23%; 
    right: 3vw;
}
.pannels {
    position: absolute;
    left: 0vw;
    width: 19%;
    z-index: 1;
    top: 35vw;

}
@media (max-width: 900px) {
    .background-container {
        width: 370%;
    top: -64vw;
    left: -240vw;
    height: 136%;
    
}
.container{
right: -243vw;
    width: 49%;
    top: 60vw;

    p {
        width: 47%;
    left: -3vw;
    top: 6vw;
    }
}
}






`;

export default StyledTheGuill
