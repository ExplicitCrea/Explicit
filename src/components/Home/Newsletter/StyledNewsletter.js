import styled from 'styled-components'

const StyledNewsletter = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-bottom: 25vw;
    z-index: 4;
    div{
        width: 40vw;
        position: relative;
        input{
            width: 100%;
            border: 0.15vw solid #fff;
            border-radius: 50vw;
            height: 3vw;
            color: #9098B5;
            font-family: lexend;
            font-size: 1.2vw;
            text-align: center;
            background: rgba(15, 16, 28, 0.70);
            padding: 0 1vw;
            margin-top: 3vw;
        }
        input::placeholder{
            color: #9098B5;
            font-family: lexend;
            font-size: 1.2vw;
            text-align: center;
        }
        input:focus{
            outline: none;
        }
        button{
            top: calc(50% - 1vw + 1.5vw);
            right: 0.5vw;
            position: absolute;
            width: 2vw;
            height: 2vw;
            border: 0.15vw solid #fff;
            border-radius: 50%;
            background: #634EFF;
            cursor: pointer;
            svg{
                width: 80%;
                height: 80%;
                color: #fff;
            }
        }
    }
`

export default StyledNewsletter