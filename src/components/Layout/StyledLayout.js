import styled from 'styled-components'

const StyledLayout = styled.div`
    .white-border{
        position: fixed;
        top: 78px;
        width: 100%;
        height: 2px;
        background: rgba(255, 255, 255, 0.2);
        z-index: 4;
    }

    @media (max-width: 900px) {
        .white-border{
            top: 59px;
        }
    }
`

export default StyledLayout