import styled from 'styled-components'

const StyledLegalDisclaimer = styled.div`
    padding: 80px;
    height: 360%;
    background-color: #191C2E;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    overflow: hidden;
    z-index: 0;

.body,li,h2,h3,p,h1 {
    color: white;
    font-family: lexend;
}

.background-filter {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(39deg, rgb(100 255 133 / 26%) 1.89%, rgb(40 32 143 / 45%) 81.57%);
    z-index: -1;}

@media screen and (max-width: 900px){
    padding: 80px 24px 24px 24px;
    .body,li,h2,h3,p {
    font-size: 9px;
    }
    h1{
        font-size: 17px;
}

    }
`
export default StyledLegalDisclaimer