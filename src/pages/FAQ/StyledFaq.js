import styled from 'styled-components'

const StyledFaq = styled.div`
    width: 100%;
    padding: 100px; 
    background-color: #191C2E;
    position: absolute;
    z-index: 0;
    overflow: hidden;
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    .wrapper{
        width: 80%;
        max-width: 900px;
        margin: 0px 0px 0px 6px;
    }
        .background-filter {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(39deg, rgb(100 255 133 / 26%) 1.89%, rgb(40 32 143 / 45%) 81.57%);
            z-index: -1;
    }
    @media (max-width: 900px) {
        width: 100%;
        padding: 50px 18px 18px 5px;
        .wrapper{
        width: 100%;
                
            }
    }
    
`
export default StyledFaq