import styled from 'styled-components'

const StyledHistory = styled.div`
    position: fixed;
    width: 100%;
    height: 100%;
    padding: 40px;
    background-color: #191C2E;
    align-items: center;
    position: absolute;
    display: flex;
    flex-direction: column;
    overflow: hidden;

img{
    width: 25%;
    height: auto;

}
.container{
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 45%;
    height: 64%;
    padding: 0px;
    background: rgb(14 14 14 / 7%);
    backdrop-filter: blur(29px);
    border-radius: 10px;
    position: relative;
    z-index: 2;

h2{
    text-align: center;
    color: white;
    font-size: 40px;
}

p{
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 95%;
    font-size: 16px;
    text-align: center;
    font-family: lexend;
    color: white;
}

}
.background-purple{
    width: 208vw;
    height: 100vw;
    position: fixed;
    bottom: -60vw;
    left: 20vw;
    z-index: 1;
    border-radius: 50%;
    background: radial-gradient(37% 58% at 57% 50%, rgba(100, 90, 250, 1.2) 0%, rgba(100, 94, 255, 0.00) 100%);
    transform: rotate(22deg);
    overflow: hidden;
}

.background-green{
    width: 40%;
    height: 110%;
    position: fixed;
    bottom: 100px;
    left: 0px;
    z-index: 0;
    border-radius: 50%;
    background: radial-gradient(50% 50% at 54% 30%, rgb(10 211 72 / 27%) 1.15%, rgba(100, 255, 169, 0.00) 99.99%, rgba(100, 255, 169, 0.00) 102%, rgba(100, 255, 169, 0.00) 100%);
    transform: rotate(312deg);
    
}
@media screen and (max-width: 900px) {
    padding: 60px 40px 40px 40px;
    img{
        width: 82%;
        height: auto;
    }
    .container {
        width: 112%;
        height: 76%;
        margin-bottom: 64px;
    
    h2 {
        font-size: 25px; 
        }

    p {
        font-size: 9px; 
        }
    }
}

`

export default StyledHistory