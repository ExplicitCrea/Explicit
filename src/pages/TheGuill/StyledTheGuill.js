import styled from "styled-components";


const StyledTheGuill = styled.section`
    width: 100%;
    padding: 100px; 
    background-color: #191C2E;
    position: absolute;
    z-index: 0;
    overflow: hidden;
    
.background img {
    width: 100%; 
    height: auto; 
    position: fixed;
    top: 0;
    left: 0;
    z-index: -1;
}

p {
    width: 52%;
    margin: 0px auto 0;
    border: 1px solid #333;
    padding: 9px;
    border-radius: 30px;
    font-family: lexend;
    font-size: 13px;
    color: white;
    background-color: transparent;
    backdrop-filter: blur(50px);
    position: relative;
    z-index: 1;
}
.carousel-container{
    position: relative;
    width: 62%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 5vw;
    margin-left: -69px;
            svg{
                width: 5vw;
                height: 5vw;
                color: #fff;
                cursor: pointer;
            }
            .wrapper{
                width: 100%;
                aspect-ratio: 16/9;
                display: flex;
                justify-content: center;
                align-items: center;
                border-radius: 0vw;
                overflow: hidden;
                background-color: #000;
            }
        }
        .container-icon{
            display: flex;
    flex-direction: row;
    position: absolute;
    width: 93%;
    bottom: 185px;
        img{
        width: 15%;
        }
        }
        .container {
            display: flex;
            flex-direction: column;
            width: 45%;
            margin-left: auto;
            margin-right: 0px;
    
}

.container img {
    display: flex;
    flex-direction: row;
    width: 30%;
}


`;

export default StyledTheGuill
