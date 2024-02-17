import styled from "styled-components";

const StyledWrldmag = styled.section`
min-height: 100vh;
background: url('public/assets/wrldmag/bg-top.png');
background-size: cover;
background-position: center;
background-attachment: fixed;
overflow: hidden;
padding-top: 100px;
position: relative;

.container {
    width: 100%;
    height: auto;
    border: 5px solid yellow;
    display: flex;
    flex-direction: column;
    gap: 40px;
    .main-wrapper {
        display: flex;
        align-items: center;
        gap: 20px;
        padding: 0 20px;
        
        p {
            background-color: rgba(0, 0, 0, 0.7);
            color: white;
            font-family: lexend;
            font-size: 20px;
            padding: 12px;
            border-radius: 15px;
            max-width: 1080px;
            @media(max-width: 1600px ) {
                font-size: 18px;
            }
            @media(max-width: 1400px ) {
                font-size: 16px;
            }
        }
        .logo {
            width: 150px;
            img {
                width: 100%;
                height: auto;
            }
            @media(max-width: 1600px ) {
                width: 140px;
            }
            @media(max-width: 1400px ) {
                width: 130px;
            }
        }
    }
    .second-wrapper {
        border: 5px solid red;
        width: 100%;
        position: relative;
        .images-wrapper{
            display: grid;
            grid-template-rows: 100%;
            grid-template-columns: 30% 40% 30%;
            align-items: center;
            .image-left {
                position: relative;
                z-index: 1;
                grid-row: 1;
                object-position: left;
                height: 85%;
            }
            .image-center {
                position: relative;
                z-index: 5;
                grid-row: 1;
                grid-column: 2;
                height: 100%;
            }
            .image-right {
                position: relative;
                z-index: 1;
                grid-row: 1;
                grid-column: 3;
                height: 85%;

            }
            img {
                width: 100%;
                height: auto;
                object-fit: cover;
            }
        }
            
            .wrldmag {
            position: absolute;
            z-index: 5;
            width: 102%;
            left: -1vw;
            top: 8vw;
                img {
                    width: 100%;
                    height: auto;
                }
            }
            .bg-bottom {
                position: relative;
                margin-top: 10vw;
                img {
                    width: 100%;
                    height: auto;
                }
                
            }
    }
}



`

export {StyledWrldmag}