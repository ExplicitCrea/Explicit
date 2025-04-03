import styled from 'styled-components'


const StyledEden = styled.section`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    position: relative;
    overflow: hidden;
    background-color:#212121;
    background-image: 
    linear-gradient(#00000066 4px, transparent 4px),
    linear-gradient(to right, #00000066 4px, transparent 4px);
    background-size: 450px 450px;
    background-repeat: repeat;
    .top_container{
        display:flex;
        position:relative;
        justify-content: center;
        align-items: center;
        width: 100%;
        min-height: 100vh;
        @media (max-width: 759px) {
        margin-top: 10%;    
        min-height: 60vh;
        }
        img{
            width: 100%;
            height: 100%;
            object-fit: cover;
            position: absolute;
            z-index: 1;
            top: -10%;
            left: 0;
        }
        .video{
            z-index: 2;
            margin-top: 25%;
            width:60%;
            border-radius:24px;
            @media (max-width: 759px) {
                margin-top: 4vh;
                width: 90%;
            }
        }
    }
    .container{
        display:flex;
        position:relative;
        justify-content: center;
        align-items: center;
        flex-direction: row;
        width: 100%;
        min-height: 100vh;
        gap:7vw;
        @media (max-width: 759px) {
            flex-direction: column;
            gap: 0;
            min-height:auto;
        }
        .panels{
            position:relative;
            display:flex;
            justify-content: center;
            align-items: center;
            width:30%;
            height: 25vw;
            @media (max-width: 759px) {
                flex-wrap: wrap;
                width: 100%;
                height: auto;
            }
            img{
                display:none;
                user-select: none;
                cursor: pointer;
                position: absolute;
                top: 0;
                left: 0;
                width:100%;
                transform: rotate3d(1, 1, 0, 10deg);
                @media (max-width: 759px) {
                    display:block;
                    position: relative;
                    max-width: 50vw;
                }
            }
            img:nth-child(1){
                display:block;
            }
        }
        .video{
            width:50%;
            border-radius:24px;
            transform:translate3d(0,0,0) rotate3d(1, 1, 0, 10deg);
            @media (max-width: 759px) {
                position: absolute;
                top: 25%;
                left: 25%;
                width: 50%;
                transform: translate(5%,15%) rotate3d(1, 1, 0, 10deg);
            }
        }
    }
    .carousel{
        width:90%;
        min-height: 80vh;
        display:flex;
        justify-content: center;
        align-items: center;
        perspective: 1000px;
        perspective-origin: 50% 50%;
        @media (max-width: 759px) {
            margin-top: 10%;
            min-height: auto;
            width: 100%;
        }
        > div{
            display:none !important;
        }
        > div[data-active="1"]{
            display:flex !important;
            width: 50% !important;
            max-width: 100% !important;
            transform: rotateX(15deg) rotateY(-15deg) rotateZ(0deg) translate3d(-10%,0,0);
            @media (max-width: 759px) {
                width: 80% !important;
                transform: rotateX(15deg) rotateY(-15deg) rotateZ(0deg) translate3d(-3%,0,0);
            }
        }
        .carousel_button{
            font-size: 5rem;
            color: #fff;
            border: none;
            background:transparent;
            cursor: pointer;
            margin: auto;
            transition: all 0.3s;
            filter:drop-shadow(2px 2px 5px #000);
            transform: rotateX(15deg) rotateY(-15deg) rotateZ(0deg);;
            &:hover{
                transform:scale(1.1) rotateX(15deg) rotateY(-15deg) rotateZ(0deg);
                color: #ccc;
            }
            @media (max-width: 759px) {
                font-size: 2rem;
            }
        }
    }
    .avancement {
        display: flex;
        justify-content: center;
        flex-direction: column;
        height: 100vh;
        width: 100%;
        position: relative;
        @media (max-width: 759px) {
            height: 40vh;
        }
        .video{
            position:absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            height: 100%;
            @media (max-width: 759px) {
                height: auto;
            }
            z-index: 2;
        }
        .carousel-track:nth-child(2){
            margin-bottom: 20%;
        }
        .carousel-track {
            position: relative;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            flex-wrap: wrap;
            height: 25%;
            img{
                position: relative;
                max-height: 100%;
                width: auto;
                transition: left 1s linear;
            }
        }
    }
`

export default StyledEden