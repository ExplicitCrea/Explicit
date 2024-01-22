import styled from 'styled-components'

const StyledVideoEditing = styled.section`
    width: 100%;
    padding: 0 36px;
    display: flex;
    justify-content: space-between;
    margin-top: 9vw;
    z-index: 1;

    .text-container{
        width: 40%;
        h1{
            width: 100%;
            font-size: 7vw;
            margin: 0;
            line-height: 6vw;
        }
    
        p{
            width: 100%;
            margin-top: 36px;
        }
    }

    .video-container{
        width: 60%;
        .carousel-container{
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-top: 8vw;
            svg{
                width: 5vw;
                height: 5vw;
                color: #fff;
                cursor: pointer;
            }
            .wrapper{
                width: 90%;
                aspect-ratio: 16 / 9;
                display: flex;
                justify-content: center;
                align-items: center;
                border-radius: 3vw;
                overflow: hidden;
                background-color: #000;
            }
        }

        .title-container{
            display: flex;
            align-items: center;
            margin: 3vw 0 0 4vw;
            .image-wrapper{
                width: 5vw;
                height: 5vw;
                border-radius: 50%;
                overflow: hidden;
                img{
                    width: 100%;
                    height: auto;
                }
            }
            .text-title{
                margin-left: 0.6vw;
                h2{
                    margin: 0;
                    font-size: 1.5vw;
                    font-family: lexend;
                    color: #fff;
                }
                p{
                    font-size: 1vw;
                    margin: 0;
                }
            }
        }
    }




`

export default StyledVideoEditing