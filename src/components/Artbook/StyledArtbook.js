import styled from "styled-components";

const StyledArtbook = styled.div`
  display: flex;
  justify-content: center;
  width: 100vw;
  height: 100vh; 
  border: 1px solid blue;
`;

const StyledGrid = styled.div`
  display: grid;
  justify-content: center;
  width: 100%;
  height: 50%;
  gap: 12px;
  grid-template-rows: 41% 55% 49% 53%;
  grid-template-columns: 11% 16% 16% 8%;
  position: relative;
`;

const StyledImage = styled.img`
  min-width: 100px;
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
  width: 100%;
  height: auto;
  max-height: 250px;
  overflow: hidden;
  border-radius: 10px;
  grid-row: 1;
  /* margin-top: 6.5%; */
  grid-column: 1 / span 3;
`;

const StyledBruceGrannec = styled.div`
  width: 100%;
  height: auto;
  max-height: 250px;
  /* margin-top: 10%; */
  overflow: hidden;
  border-radius: 10px;
  grid-row: 1;
  grid-column: 4 / span 2;
`;

const StyledGg = styled.div`
  width: 100%;
  height: auto;
  max-height: 250px;
  /* margin-top: 20%; */
  overflow: hidden;
  border-radius: 10px;
  grid-row: 1;
  grid-column: 6;
`;

const StyledLoreal = styled.div`
  width: 90%;
  height: auto;
  overflow: hidden;
  border-radius: 10px;
  grid-row: 2;
  grid-column: 1 / span 2;
`;

const StyledPg = styled.div`
  width: 118%;
  height: auto;
  margin-left: -18%;
  overflow: hidden;
  border-radius: 10px;
  grid-row: 2;
  grid-column: 3 / span 1;
`;

const StyledLeGrandJd = styled.div`
  width: 100%;
  height: auto;
  overflow: hidden;
  border-radius: 10px;
  grid-row: 2;
  grid-column: 4 / span 2;
`;

const StyledTheguill = styled.div`
  width: 110%;
  height: 90%;
  margin-left: 20%;
  overflow: hidden;
  border-radius: 10px;
  grid-row: 3;
  grid-column: 3 / span 2;
`;

const StyledPota = styled.div`
  width: 50%;
  height: 90%;
  overflow: hidden;
  border-radius: 10px;
  margin-left: 50%;
  grid-row: 3;
  grid-column: 5 / span 1;
`;

const StyledVzion = styled.div`
  width: 100%;
  height: 80%;
  overflow: hidden;
  border-radius: 10px; 
  grid-row: 2;
  grid-column: 6;
`;

const StyledComingSoon = styled.div`
  position: absolute;
  background-color: #404040;
  font-family: Lexend;
  font-size: 2.5em;
  width: 70%;
  height: auto;
  text-align: center;
  margin-right: 10%;
  right: 0;
  padding: 10px;
  border-radius: 0px 15px 15px 0px;
  bottom: 105px;
  z-index: 10;
`;

const StyledMahdiBa = styled.div`
  position: relative;
  width: 185%;
  height: 70%;
  overflow: hidden;
  border-radius: 10px;
  grid-row: 3 / span 2;
  grid-column: 1 / span 1;
`;

const StyledWrldMag = styled.div`
  position: relative;
  width: 70%;
  margin-left: 60%;
  height: 70%;
  overflow: hidden;
  border-radius: 10px;
  grid-row: 3 / span 2;
  grid-column: 2 / span 1;
  cursor: pointer;
  
`;

const StyledImageWrlMag = styled.img`
  min-width: 100px;
  width: 100%;
  height: auto;
  object-fit: cover;
  cursor: pointer;
  transform: scale(2.5);
`;

const StyledImageWrlMagNoBackground = styled.img`
  position: absolute;
  z-index: 10;
  top: 100px;
  width: 100%;
  height: 50%;
  object-position: center;
  object-fit: cover;
  cursor: pointer;
  transition: transform 0.3s ease-in-out;

  &:hover {
    transform: scale(1.1);
  }
`;

const StyledBackground = styled.div`
  position: absolute;
  z-index: 5; 
  width: 100%;
  height: 100%;
  background-color: rgb(132,68,245, 0.8);
`;

const StyledEdenLz = styled.div`
  width: 100%;
  height: 113%;
  position: relative;
  top: -23%;
  overflow: hidden;
  border-radius: 10px;
  grid-row: 3;
  grid-column: 6 / span 1;
`;

const StyledPaltay = styled.div`
  display: flex;
  width: 92%;
  height: 55%;
  margin-top: 220px;
  margin-left: 8%;
  overflow: hidden;

  border-radius: 10px;
  grid-row: 3;
  grid-column: 3 / span 4;
`;

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
  StyledImage,
  StyledImageWrlMag,
  StyledImageWrlMagNoBackground,
  StyledBackground,
  StyledComingSoon
};
