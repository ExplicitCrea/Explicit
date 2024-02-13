import styled from 'styled-components'

const StyledContact = styled.div`
top: 50%;
left: 50%;
transform: translate(-50%, -50%);
width: 100%;
height: 100%; 
padding: 100px; 
background-color: #191C2E;
position: fixed;
overflow: hidden;

form{
    display: flex;
    flex-direction: column;
    position: relative;
    width: 35%;
    padding: 6px;
    margin: 28px auto;
}
    
    h1{
    color: white;
    font-size:40px ;
    font-family: lexend;
    text-align: center;
    }
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
    background-color: transparent;
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
    .Toastify__toast-container {
            padding: 80px 50px 0px 30px;
}
.coordonner {
    position: fixed;
    display: flex;
    flex-direction: column;
    border: 0.8px solid rgba(255, 255, 255, 0.1);
    border-radius: 12px;
    background-color: transparent;
    width: 18vw;
    font-size: 14px;
    padding: 0px;
    height: auto;
    margin: 100px;
    right: 103px;
    text-align: center;
    color: white;
    font-family: lexend;
    
        li{
            flex-wrap: 1;
            margin-bottom: 14px;
    }
            a{
                text-decoration: none;
                color: white;
        }
}
    .background-filter {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(39deg, rgb(100 255 133 / 26%) 1.89%, rgb(40 32 143 / 45%) 81.57%);
        z-index: -1;
    }

    @media screen and (max-width: 1000px) {
        form {
            display: flex;
            flex-direction: column;
            width: 100%;
            padding: 0px;
            margin: 30px auto;
        }
        .container{
            display: flex;
            flex-direction: column;
        
        }
        h1 {
            font-size: 28px;
            margin: 0px 0px 31px 0px;
        }
        label {
            font-size:9px ;
        }
        input, textarea {
            margin-right: 6px;
            width: 98%;
            height: 100%;
            margin-bottom: 16px;
            padding: 5px;
        textarea{
            height: 130px;
    }
}
.coordonner {
    width: 45%;
    left: 23%;
    transform: translate(-50%, -50%);
    margin-top: -15px;
    height: 43px;
    list-style: none;
    h2{
    display: none;
    }
    a{
    font-size: 10px;
    }
    li{
        margin-bottom: 0px 
    }
}

}


`
export default StyledContact