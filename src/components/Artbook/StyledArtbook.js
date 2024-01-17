import styled from "styled-components";

const StyledArtbook = styled.div`
  width: 100%;
  height: 100%;
  padding: 20px;
  z-index: 50;
`;

const StyledGrid = styled.div`
  display: grid;
  width: 100%;
  grid-template-rows: 0.5fr 0.5fr 0.5fr;
  grid-template-columns: repeat(12, 1fr);
  gap: 12px;
  position: relative;
`;

const StyledOlympics = styled.img`
  width: 120%;
  height: 100%;
  max-width: 100%;
  max-height: 100%;
  object-fit: cover;
  border-radius: 10px;
  grid-row: 1;
  grid-column: 1 / span 6;
  cursor: pointer;
  transition: transform 0.3s ease-in-out;
  &:hover {
    transform: scale(1.1);
  }
`;

const StyledBruceGrannec = styled.img`
  width: 100%;
  height: 100%;
  max-width: 100%;
  max-height: 100%;
  object-fit: cover;
  border-radius: 10px;
  grid-row: 1;
  grid-column: 7 / span 4;
  object-position: top;
  cursor: pointer;
  transition: transform 0.3s ease-in-out;
  &:hover {
    transform: scale(1.1);
  }
`;
const StyledGg = styled.img`
  width: 100%;
  height: 100%;
  max-width: 100%;
  max-height: 100%;
  object-fit: cover;
  border-radius: 10px;
  grid-row: 1;
  grid-column: 11 / span 2;
  background-color: purple;
  cursor: pointer;
  transition: transform 0.3s ease-in-out;
  &:hover {
    transform: scale(1.1);
  }
`;

const StyledLoreal = styled.img`
  width: 89%;
  height: 100%;
  max-width: 100%;
  max-height: 100%;
  object-fit: cover;
  border-radius: 10px;
  grid-row: 2;
  grid-column: 1 / span 4;
  cursor: pointer;
  transition: transform 0.3s ease-in-out;
  &:hover {
    transform: scale(1.1);
  }
`;

const StyledPg = styled.img`
  width: 80%;
  position: relative;
  left: 20%;
  height: 100%;
  object-fit: cover;
  border-radius: 10px;
  grid-row: 2;
  grid-column: 4 / span 3;
  cursor: pointer;
  transition: transform 0.3s ease-in-out;
  &:hover {
    transform: scale(1.1);
  }
`;

const StyledLeGrandJd = styled.img`
  width: 100%;
  height: 100%; 
  max-width: 100%;
  max-height: 100%;
  object-fit: cover;
  border-radius: 10px;
  grid-row: 2;
  grid-column: 7 / span 4;
  cursor: pointer;
  transition: transform 0.3s ease-in-out;
  &:hover {
    transform: scale(1.1);
  }
`;

const StyledVzion = styled.img`
  width: 100%;
  height: 75%;
  max-width: 100%;
  max-height: 100%;
  object-fit: cover;
  border-radius: 10px;
  grid-row: 2;
  grid-column: 11 / span 2;
  cursor: pointer;
  transition: transform 0.3s ease-in-out;
  &:hover {
    transform: scale(1.1);
  }
`;

const StyledMahdiBa = styled.img`
  width: 100%;
  height: 100%;
  max-width: 100%;
  max-height: 100%;
  object-fit: cover;
  border-radius: 10px;
  grid-row: 3;
  grid-column: 1 / span 2;
  cursor: pointer;
  transition: transform 0.3s ease-in-out;
  &:hover {
    transform: scale(1.1);
  }
`;

const StyledWrldMag = styled.img`
  width: 200%;
  object-fit: cover;
  border-radius: 10px;
  max-width: 100%;
  max-height: 100%;
  grid-row: 3;
  margin-left: 2px;
  grid-column: 3 / span 2;
  cursor: pointer;
  transition: transform 0.3s ease-in-out;
  &:hover {
    transform: scale(1.1);
  }
`;

const StyledTheguill = styled.img`
  position: absolute;
  top: 0;
  width: 100%;
  height: 45%;
  max-width: 100%;
  max-height: 100%;
  object-fit: cover;
  border-radius: 10px;
  grid-row: 3;
  grid-column: 5 / span 5;
  cursor: pointer;
  transition: transform 0.3s ease-in-out;
  &:hover {
    transform: scale(1.1);
  }
`;

const StyledPota = styled.img`
  width: 100%;
  height: 45%;
  object-fit: cover;
  max-width: 100%;
  max-height: 100%;
  border-radius: 10px;
  grid-row: 3;
  grid-column: 10 / span 1;
  cursor: pointer;
  transition: transform 0.3s ease-in-out;
  &:hover {
    transform: scale(1.1);
  }
`;

const StyledEdenLz = styled.img`
  position: absolute;
  top: -15%;
  width: 100%;
  height: 60%;
  max-width: 100%;
  max-height: 100%;
  object-fit: cover;
  border-radius: 10px;
  grid-row: 3;
  grid-column: 11/ span 2;
  cursor: pointer;
  transition: transform 0.3s ease-in-out;
  &:hover {
    transform: scale(1.1);
  }
`;

const StyledPaltay = styled.img`
  width: 100%;
  height: 50%;
  max-width: 100%;
  max-height: 100%;
  position: absolute;
  bottom: 0%;
  object-fit: cover;
  border-radius: 10px;
  object-position: right;
  grid-row: 3;
  grid-column: 5 / span 8;
  cursor: pointer;
  transition: transform 0.3s ease-in-out;
  &:hover {
    transform: scale(1.1);
  }
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
};
