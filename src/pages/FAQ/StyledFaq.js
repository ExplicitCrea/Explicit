import styled from 'styled-components'

const StyledFaq = styled.div`
    width: 100%;
    padding: 100px; 
    background-color: #191C2E;
    position: relative;
    z-index: 0;
    overflow: hidden;
    min-height: 100vh;
    .wrapper{
        width: 100%;
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
`
export default StyledFaq