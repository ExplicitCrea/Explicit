import styled from "styled-components";

const StyledContainer = styled.div`
    
    display: flex;
    justify-content: center;
    width: 100%;
    margin-bottom: 50px;
    

    .grid {
        display: grid;
        grid-template-rows: 50% 50%;
        grid-template-columns: 33.33% 33.33% 33.33%;
        width: 100%;
        max-width: 781px;
        max-height: 502px;

        img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
    }
`

export {StyledContainer}