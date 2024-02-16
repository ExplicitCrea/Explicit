import styled from "styled-components";

const StyledWrldmag = styled.section`
min-height: 100vh;
background: url('public/assets/wrldmag/bg-top.png');
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
            background-color: black;
            color: white;
            font-family: lexend;
            font-size: 20px;
            padding: 12px;
            border-radius: 15px;
            max-width: 1100px;
        }
        .logo {
            width: 8vw;
            img {
                width: 100%;
                height: auto;
            }
        }
    }
    .second-wrapper {
        border: 5px solid red;
        width: 100%;
        position: relative;
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
    .third-wrapper {
        position: relative;
    }
    .wrldmag {
        position: absolute;
        z-index: 5;
        width: 100%;
        top: 10vw;
        img {
            width: 100%;
            height: auto;
        }
    }
    .bg-bottom {
        position: relative;
    
        img {
            width: 100%;
            height: auto;
        }
        
    }
}



`

export {StyledWrldmag}