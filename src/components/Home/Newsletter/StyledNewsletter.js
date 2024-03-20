import styled from 'styled-components'

const StyledNewsletter = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    z-index: 4;
    position: relative;
    .newsletter-title{
        button{
            background: none;
            border: none;
            font-family: lexend;
            font-weight: bold;
            font-size: 2vw;
            cursor: pointer;
            color: #fff;
            cursor: inherit;
        }

    }
    form{
        width: 40vw;
        position: relative;
        .email{
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
        .email::placeholder{
            color: #9098B5;
            font-family: lexend;
            font-size: 1.2vw;
            text-align: center;
        }
        .email:focus{
            outline: none;
        }
        .name{
            position: absolute;
            height: 5px;
            background-color: transparent;
            border: none;
            bottom: -50vw; 
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

    @media (max-width: 900px) {
        width: 100%;
        margin-bottom: 300px;
        form{
            width: 90%;
            position: relative;
            .email{
                width: 100%;
                border: 1px solid #fff;
                border-radius: 50px;
                height: 48px;
                font-size: 16px;
                padding: 0 12px;
                margin-top: 36px;
            }
            .email::placeholder{
                font-size: 16px;
            }
            button{
                top: 50%;
                right: 7px;
                position: absolute;
                width: 36px;
                height: 36px;
                border: 1px solid #fff;
                border-radius: 50%;
                svg{
                    width: 80%;
                    height: 80%;
                }
            }
        }
    }
`

export default StyledNewsletter