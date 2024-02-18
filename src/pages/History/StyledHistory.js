import styled from 'styled-components'

const StyledHistory = styled.div`
    position: fixed;
    width: 100%;
    padding: 40px;
    background-color: #191C2E;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    position: absolute;
    display: flex;
    flex-direction: column;
    overflow: hidden;

img{
    width: 30%;
    height: auto;

}
.container{
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 45%;
    height: 64%;
    padding: 0px;
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
    width: 115%;
    font-size: 19px;
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
    width: 92%;
    height: 279%;
    position: fixed;
    bottom: 4px;
    left: 0px;
    z-index: 0;
    border-radius: 44%;
    background: radial-gradient(43% 49% at 75% 45%, rgb(10 211 72 / 31%) 21.15%, rgba(100, 255, 169, 0.00) 100.99%, rgba(100, 255, 169, 0.00) 100%, rgba(100, 255, 169, 0.00) 100%);
    transform: rotate(219deg);
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
        font-size: 10px;
        width: 103%;
        height: auto; 
        }
    }
    .background-green{
    width: 174%;
    }
}

`

export default StyledHistory