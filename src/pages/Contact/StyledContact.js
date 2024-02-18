import styled from 'styled-components'

const StyledContact = styled.section`
width: 100%;
min-height: 100vh;
padding: 100px; 
background-color: #191C2E;
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;

.linear-background{
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(39deg, rgb(100 255 133 / 26%) 1.89%, rgb(40 32 143 / 45%) 81.57%);
    z-index: 0;
}

h1{
    color: white;
    font-size:40px ;
    font-family: lexend;
    text-align: center;
    z-index: 1;
}

form{
    display: flex;
    flex-direction: column;
    position: relative;
    width: 35%;
    padding: 6px;
    margin: 28px 0 0 0;
    z-index: 1;

    label{
        color: white;
        font-size:15px ;
        font-family: lexend;
    }

    input, textarea{
        display: flex;
        flex: 1;
        margin-right: 35px; 
        width: 94%;
        height: 100%;
        margin-bottom: 20px;
        border: 0.8px solid rgba(255, 255, 255, 0.1);
        border-radius: 25px;
        background-color: #0000002e;
        padding: 12px;
        outline: none;
        text-align: left;
        color: white;
    }

    textarea{
        height: 130px;
    
    }

    .container{
        display: flex;
        flex-wrap: wrap;
        width: 100%;
    }

    .send-button {
        display: flex;
        background-color: #2f2e2e;
        opacity: 0.9;
        color: white;
        padding: 16px 38px;
        border: none;
        cursor: pointer;
        border-radius: 25px;
        text-align: center;
        font-size: 15px;
        margin: 40px auto;
    }

    .contact {
        position: absolute;
        top: 24px;
        right: -260px;
        display: flex;
        flex-direction: column;
        border: 0.8px solid rgba(255, 255, 255, 0.1);
        border-radius: 12px;
        background-color: transparent;
        width: 260px;
        font-size: 14px;
        padding: 0px;
        height: auto;
        color: white;
        font-family: lexend;

        h2{
            text-align: center;
        }
        
        li{
            flex-wrap: 1;
            margin-bottom: 14px;
            list-style: none;
        }
        a{
            display: flex;
            align-items: center;
            text-decoration: none;
            color: white;

            svg{
                width: 20px;
                height: 20px;
                margin: 0 12px;
            }
        }
    }
}

.Toastify__toast-container {
    padding: 80px 50px 0px 30px;
}


@media screen and (max-width: 1000px) {
    padding: 92px 0 0 0;
    form {
        display: flex;
        flex-direction: column;
        width: 80%;
        padding: 0px;
        margin: 0;

        .contact {
            position: unset;
            width: 100%;
            li{
                display: flex;
                align-items: center;
                justify-content: center;
            }
            margin: 0 0 12px 0;
        }

        input, textarea {
            width: 100%;
            margin-right: 0;
            margin-bottom: 16px;
            border-radius: 12px;

            textarea{
                height: 130px;
                padding: 12px 0 0 12px;
            }
        }

        input{
            height: 48px;
            padding: 0 0 0 12px;
        }
    }
    .container{
        display: flex;
        flex-direction: column;
        height: 124px;

        input{
            height: 48px;
            padding: 0 0 0 12px;
        }
    }
    h1 {
        font-size: 28px;
        margin: 0px 0px 31px 0px;
    }
    label {
        font-size:9px ;
    }
}


`
export default StyledContact