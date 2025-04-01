import styled from 'styled-components'

const StyledNotification = styled.div`
    opacity: 0;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    z-index: 4;
    position: relative;
    margin:10vh 0 10vh auto;
    width: fit-content;
    .wrapper{
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: row;
        gap: 1vw;
    }
    .text{
        opacity: 0;
        transition: 0.3s;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: fit-content;
        background-color: #634EFF;
        border-radius: 12px;
        padding: 1.2vw 1vw;
        h1{
            font-size: 1.2vw;
            text-align: center;
            color: #00FFB4;
            margin: 0;
            width: auto;
        }
        p{
            font-size: 1vw;
            text-align: center;
            color: #00FFB4;
            margin: 0;
            width: auto;
        }
    }
    .call{
        margin-top: 5vh;
        width: 3vw;
        height: 3vw;
        border-radius: 12px;
        border: none;
        background-color: #634EFF;
        cursor: pointer;
        position: relative;
        transition: 0.3s;
        div{
            position: absolute;
            border-radius: 50%;
            top: -4%;
            right:-4%;
            width: 1vw;
            height: 1vw;
            background-color: #00FFB4;
            box-shadow: 0 0 6px 1px #00FFB422;
            z-index: 2;
            transition: 0.4s;
        }
    }
    .call:hover{
        transform: scale(1.1);
        div{
            box-shadow: 0 0 6px 1px #00FFB4;
        }
    }
    .text.hover{
        opacity: 1;
    }
`

export default StyledNotification