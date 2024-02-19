import styled from 'styled-components'

const StyledHistory = styled.section`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;
    width: 100%;
    padding: 80px 40px 21vw;
    background-color: #191C2E;
    min-height: 100vh;
    overflow: hidden;
    z-index: 0;

img{
    width: 34%;
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

p{
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 115%;
    font-size: 19px;
    text-align: center;
    font-family: lexend;
    color: white;
    z-index: 2;
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