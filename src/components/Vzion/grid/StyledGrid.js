import styled from "styled-components";

const StyledContainer = styled.div`
    
    display: flex;
    justify-content: center;
    overflow: hidden;
    border: 2px solid blue;
    

   
    

    .grid {
        display: grid;
        grid-template-rows: 50% 50%;
        grid-template-columns: 33.33% 33.33% 33.33%;
        max-width: 781px;
        max-height: 502px;
        border: 2px solid blue;
        img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
    }
`

export {StyledContainer}