import styled from 'styled-components'

const StyledPage = styled.div`
padding: 96px 25px 50px 25px;
margin-bottom: 25px;
width: 100%;
height: 100vh;
background: url('src/assets/Bruce_Grannec/background.webp');
background-size: cover;
`
const StyledContainer = styled.div`
display: grid;
gap: 36px;
max-height: 100%;
margin: 0px auto;
grid-template-columns: repeat(4, minmax(300px, 1fr));
grid-template-rows: repeat(4, minmax(0, 1fr));
width: 95%;
height: auto;
`

// For the label on the left

const StyledDivLabelOnSide = styled.div`
width: 100%;
height: 100%;
grid-row: 1 / span 3;
`

const StyledImgLabel = styled.img`
width: 100%;
height: 100%;
object-fit: cover;
`

const StyledParagrahAndLogo = styled.div`
display: flex;
flex-direction: column;
align-items: center;
`

const StyledParagraph = styled.p`
width: 300px;
grid-row: 1;
grid-column: 2;
font-family: Lexend;
text-align: center;
color: white;
background-color: rgba(0, 0, 0, 0.7);
padding: 10px;
border-radius: 30px;
`

const StyledDivLogo = styled.div`
grid-row: 1;
display: grid;
display: flex;
align-items: center;
justify-content: center;
gap: 5px;
width: 20%;
height: 100%;
`

const StyledLogo = styled.img`
display: inline;
width: 100px;
height: auto;
object-fit: cover;
`
const StyledStar = styled.img`
width: 50px;
height: auto;
object-fit: cover;
`

const StyledDivEventPicture = styled.div`
width: 100%;
grid-row: 1 / span 2;
grid-column: 3/ span 2;

` 

const StyledImageEventPicture = styled.img`
object-fit: cover;
width: 100%;
height: 100%;
`

const StyledDivCarousel = styled.div`

`
 
export {
    StyledPage,
    StyledLogo, 
    StyledStar,
    StyledDivLabelOnSide,
    StyledImgLabel,
    StyledContainer,
    StyledParagrahAndLogo,
    StyledDivLogo,
    StyledParagraph,
    StyledDivEventPicture,
    StyledImageEventPicture,
    StyledDivCarousel
}
