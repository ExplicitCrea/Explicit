import styled from "styled-components";

const StyledContainer = styled.div`
    
    display: flex;
    justify-content: center;
    width: 100%;
    overflow: hidden;
    border: 2px solid red;
    @media (max-width: 1000px) {
        padding: 0px 25px 0px 25px; ;
    }
    

    .grid {
        display: grid;
        grid-template-rows: 50% 50%;
        grid-template-columns: 33.33% 33.33% 33.33%;
        max-width: 781px;
        max-height: 502px;
        img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            @media (max-width: 745px) {
                width: 154.82px;
                height: 147.19px; ;
            }
        }
    }
`

export {StyledContainer}