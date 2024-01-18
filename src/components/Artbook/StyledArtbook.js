import styled from "styled-components";

const StyledArtbook = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  height: auto;
  padding: 50px;
  z-index: 50;
`;

const StyledGrid = styled.div`
  display: grid;
  justify-content: center;
  gap: 10px;
  grid-template-rows: repeat(4, 300px);
  grid-template-columns: repeat(6, 300px);
  position: relative;
`;

const StyledImage = styled.img`
  min-width: 200px;
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 10px;
  cursor: pointer;
  transition: transform 0.3s ease-in-out;
  &:hover {
    transform: scale(1.1);
  }
`;

const StyledOlympics = styled.div`
  width: auto;
  overflow: hidden;
  border-radius: 10px;
  grid-row: 1;
  grid-column: 1 / span 3;
`

const StyledBruceGrannec = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
  border-radius: 10px;
  grid-row: 1;
  grid-column: 4 / span 2;
`

const StyledGg = styled.div`
  width: 93%;
  height: 100%;
  overflow: hidden;
  border-radius: 10px;
  grid-row: 1;
  grid-column: 6 / span 3;
`

const StyledLoreal = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
  border-radius: 10px;
  grid-row: 2;
  grid-column: 1 / span 2;
`

const StyledPg = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
  border-radius: 10px;
  grid-row: 2;
  grid-column: 3/ span 1;
`

const StyledLeGrandJd = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
  border-radius: 10px;
  grid-row: 2;
  grid-column: 4 / span 2;
`

const StyledTheguill = styled.div`
  width: 100%;
  height: 80%;
  margin-left: 20%;
  overflow: hidden;
  border-radius: 10px;
  grid-row: 3;
  grid-column: 3 / span 2;
  `

  const StyledPota = styled.div`
  width: 60%;
  height: 80%;
  overflow: hidden;
  border-radius: 10px;
  margin-left: 40%;
  grid-row: 3;
  grid-column: 5 / span 1;
`

const StyledVzion = styled.div`
  width: 100%;
  height: 80%;
  overflow: hidden;
  border-radius: 10px;
  grid-row: 2;
  grid-column: 6 / span 1;
  `
const StyledMahdiBa = styled.div`
  width: 150%;
  height: 70%;
  overflow: hidden;
  border-radius: 10px;
  grid-row: 3 / span 2;
  grid-column: 1 / span 1;
  `

const StyledWrldMag = styled.div`
  width: 90%;
  margin-left: 50%;
  height: 70%;
  overflow: hidden;
  border-radius: 10px;
  grid-row: 3 / span 2;
  grid-column: 2 / span 1;
  `
const StyledEdenLz = styled.div`
width: 100%;
height: 100%;
position: relative;
top: -20%;
overflow: hidden;
border-radius: 10px;
grid-row: 3;
grid-column: 6 / span 1;
`

const StyledPaltay = styled.div`
display: flex;
width: 90%;
height: 55%;
margin-top: 21%;
margin-left: 10%;
overflow: hidden;

border-radius: 10px;
grid-row: 3;
grid-column: 3 / span 4;
`

export {
  StyledArtbook,
  StyledGrid,
  StyledOlympics,
  StyledBruceGrannec,
  StyledGg,
  StyledLoreal,
  StyledLeGrandJd,
  StyledVzion,
  StyledMahdiBa,
  StyledWrldMag,
  StyledTheguill,
  StyledPota,
  StyledEdenLz,
  StyledPaltay,
  StyledPg,
  StyledImage
};
