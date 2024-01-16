import styled from "styled-components";

const StyledArtbook = styled.div`
  width: 100%;
  height: 100%;
  padding: 20px;
`;

const StyledGrid = styled.div`
  display: grid;
  width: 100%;
  grid-template-rows: 0.5fr 0.5fr 0.5fr 0.5fr;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
  gap: 20px;
  padding: 50px;
`;

const StyledOlympics = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 10px;
  grid-row: 1;
  grid-column: 1 / span 4;
`;

const StyledBruceGrannec = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 10px;
  grid-row: 1;
  grid-column: 5 / span 2;
`;
const StyledGg = styled.img`
  width: 80%;
  height: 100%;
  object-fit: cover;
  border-radius: 10px;
  grid-row: 1;
  grid-column: 7 / span 2;
  background-color: purple;
`;

const StyledLoreal = styled.img`
  width: 120%;
  height: 100%;
  object-fit: cover;
  border-radius: 10px;
  grid-row: 2;
  grid-column: 1 / span 2;
`;

const StyledPg = styled.img`
  width: 80%;
  height: 100%;
  object-fit: cover;
  border-radius: 10px;
  grid-row: 2;
  grid-column: 4 / span 1;
`;

const StyledLeGrandJd = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 10px;
  grid-row: 2;
  grid-column: 5 / span 2;
`;

const StyledVzion = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 10px;
  grid-row: 2;
  grid-column: 7 / span 1;
`;

const StyledMahdiBa = styled.img`
  width: 150%;
  height: 100%;
  object-fit: cover;
  border-radius: 10px;
  grid-row: 3;
  grid-column: 1 / span 1;
`;

const StyledWrldMag = styled.img`
  width: 120%;
  height: 100%;
  object-fit: cover;
  border-radius: 10px;
  grid-row: 3;
  grid-column: 2 / span 1;
`;

const StyledTheguill = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 10px;
  grid-row: 3;
  grid-column: 4 / span 3;
`;

const StyledPota = styled.img`
  width: 100%;
  height: 50%;
  object-fit: cover;
  border-radius: 10px;
  grid-row: 3;
  grid-column: 7 / span 1;
`;

const StyledEdenLz = styled.img`
  width: 100%;
  height: 50%;
  object-fit: cover;
  border-radius: 10px;
  grid-row: 3;
  grid-column: 8 / span 1;
`;

const StyledPaltay = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 10px;
  grid-row: 4;
  grid-column: 4 / span 6;
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
