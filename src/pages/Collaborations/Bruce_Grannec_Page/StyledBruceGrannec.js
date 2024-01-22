import styled from 'styled-components'

const StyledPage = styled.div`
display: flex;
background: url('src/assets/Bruce_Grannec/background.webp');
background-size: cover;
width: 100%;
padding: 96px 15px 26px 15px;
height: 100vh;
border: 2px solid yellow;
`
const StyledContainer = styled.div`
display: grid;
justify-items: center;
gap: 10px;
margin: 0 auto;
width: 100%;
height: 100%;
grid-template-columns: 1fr 2fr 3fr;
grid-template-rows: 300px 100px 1fr;
border: 2px solid red;
`

// For the label on the left

const StyledDivLabelOnSide = styled.div`
grid-row: 1 / span 3;
grid-column: 1;
`

const StyledImgLabel = styled.img`
width: 100%;
height: 100%;
object-fit: cover;
`
const StyledDivParagrah = styled.div`
width: 100%;
height: 100%;
border: 1px solid pink;
grid-row: 1;
grid-column: 2;
`
const StyledParagraph = styled.p`
border: 1px solid blue;
width: 100%;
height: 100%;
margin: 0;
font-family: Lexend;
font-size: 1em;
text-align: center;
color: white;
background-color: rgba(0, 0, 0, 0.7);
padding: 2%;
border-radius: 30px;
`

const StyledDivLogo = styled.div`
display: flex;
grid-row: 1;
align-items: center;
justify-content: center;;
gap: 5px;
width: 30%;
height: 100%;
grid-row: 2;
grid-column: 2;
`

const StyledLogo = styled.img`
display: inline;
width: 150px;
height: auto;
object-fit: cover;
`
const StyledStar = styled.img`
width: 90px;
height: auto;
object-fit: cover;
`

const StyledDivEventPicture = styled.div`
width: 100%;
height: 100%;
grid-row: 1 / span 2;
grid-column: 3 / span 2;
` 

const StyledImageEventPicture = styled.img`
object-fit: cover;
width: 100%;
height: 100%;
`

const StyledDivCarousel = styled.div`
width: 100%;
height: 90%;
margin-top: -2%;
margin-left: -100%;
grid-row: 3 / span 1;
grid-column: 3 / span 1;
`
 
export {
    StyledPage,
    StyledLogo, 
    StyledStar,
    StyledDivLabelOnSide,
    StyledImgLabel,
    StyledContainer,
    StyledDivParagrah,
    StyledDivLogo,
    StyledParagraph,
    StyledDivEventPicture,
    StyledImageEventPicture,
    StyledDivCarousel
}
