import styled, { css } from 'styled-components'

const StyledHeader = styled.header`

    @keyframes openModal {
        0%{
        transform: translateX(100%);
        }
        100%{
        transform: translateX(0px);
        }
    }
    @keyframes closeModal {
        0%{
            transform: translateX(0px);
        }
        100%{
            transform: translateX(100%);
        }
    }

    position: fixed;
    width: 100%;
    top: 0px;
    border-bottom: 2px solid #FFF;

    display: flex;
    justify-content: space-between;
    align-items: center;
    z-index: 6;
    height: 80px;
    padding: 6px 12px;
    background: rgba(217, 217, 217, 0.07);
    backdrop-filter: blur(15.444999694824219px);
    -webkit-backdrop-filter: blur(15.444999694824219px);
    
    .logo{
        margin: 0!important;
        img{
            width: auto;
            height: 60px;
        }
    }

    .mobil-container{
        display: none;
    }


    .nav-container{
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        ${props => props.isOpen === true && css`
            @media (max-width: 1100px) {
                animation: openModal cubic-bezier(0.71, -0.01, 0.4, 0.97) 300ms forwards;
            }
        `}
        ${props => props.isOpen === false && css`
            @media (max-width: 1100px) {
                animation: closeModal cubic-bezier(0.71, -0.01, 0.4, 0.97) 300ms forwards;
            }
        `}

        nav>ul{
            display: flex;
            justify-content: space-between;
            align-items: center;
            list-style: none;
            margin-left: 48px;
            li{
                display: flex;
                align-items: center;
                justify-content: center;
            }
        }
    
        a{
            text-decoration: none;
            color: #FFF;
            font-size: 1.5em;
            font-weight: 200;
            font-family: lexend;
            margin: 0px 24px;
        }

        .container-contact{
            display: flex;
            align-items: center;
            justify-content: flex-end;
            button{
                width: 30px;
                height: 30px;
                background-color: none;
                overflow: hidden;
                display: flex;
                align-items: center;
                justify-content: center;
                border-radius: 24px;
                border: 2px solid #64FFA9;
                cursor: pointer;
        
                img{
                    width: 30px;
                    height: 30px;
                    margin: 0px;
                }
            }
        }
    
    }

    @media (max-width: 900px) {
        height: 60px;
        padding: 0;
        border-bottom: 0;
        background: none;
        backdrop-filter: none;
        .logo{
            display: none;
        }
        .mobil-container{
            display: flex;
            justify-content: space-between;
            align-items: center;
            background: rgba(217, 217, 217, 0.07);
            backdrop-filter: blur(15.444999694824219px);
            -webkit-backdrop-filter: blur(15.444999694824219px);
            width: 100%;
            padding: 6px 12px;
            border-bottom: 2px solid #FFF;
            .logo-mobil{
                img{
                    height: 48px;
                    width: auto;
                }
            }
            .menu-mobil{
                cursor: pointer;
                svg{
                    width: 36px;
                    height: 36px;
                    color: #FFF;
                }
            }
        }

        .nav-container{
            position: fixed;
            top: 60px;
            left: 0px;
            display: flex; 
            flex-direction: column;
            background: rgba(217, 217, 217, 0.07);
            backdrop-filter: blur(15px);
            -webkit-backdrop-filter: blur(15px);
            z-index: -1;
            padding: 24px 6px;
            transform: ${props => props.isOpen === null && 'translateX(100%)'};

            nav > ul{
                display: flex;
                flex-direction: column;
                margin: 0;
            }
            
            a{
                margin: 12px 0;
            }

            .container-contact{
                flex-direction: column;
                button{
                    margin: 12px 0 0 0;
                }
            }
        }
    }

`

export default StyledHeader