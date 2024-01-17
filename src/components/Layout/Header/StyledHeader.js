import styled from 'styled-components'

const StyledHeader = styled.header`
    position: absolute;
    width: 100%;
    top: 0px;
    border-bottom: 2px solid #FFF;
    background: rgba(217, 217, 217, 0.07);
    backdrop-filter: blur(15.444999694824219px);
    display: flex;
    justify-content: space-between;
    align-items: center;
    z-index: 1;
    height: 80px;
    padding: 6px 12px;

    .container{
        display: flex;
        align-items: center;
        justify-content: flex-start;

        img{
            width: auto;
            height: 74px;
        }

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
`

export default StyledHeader