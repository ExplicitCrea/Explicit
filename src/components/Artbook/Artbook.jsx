import bruce_grannec from "../../assets/artbook/bruce_grannec.webp";
import eden_lz from "../../assets/artbook/eden_lz.webp";
import loreal from "../../assets/artbook/loreal.webp";
import le_grand_jd from "../../assets/artbook/le_grand_jd.webp";
import vzion from "../../assets/artbook/vzion.webp";
import mahdi_ba from "../../assets/artbook/mahdi_ba.webp";
import olympics from "../../assets/artbook/olympics.webp";
import paltay from "../../assets/artbook/paltay.webp";
import pg from "../../assets/artbook/pg.webp";
import pota from "../../assets/artbook/pota.webp";
import theguill from "../../assets/artbook/theguill.webp";
import vignettegg from "../../assets/artbook/vignettegg.webp";
import wrld_mag from "../../assets/artbook/wrld_mag.webp";
import {
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
} from "./StyledArtbook";

export const Artbook = () => {
  return (
    <StyledArtbook>
      <StyledGrid>
        <StyledOlympics>
          <StyledImage src={olympics} alt="Olympics"></StyledImage>
        </StyledOlympics>

        <StyledBruceGrannec>
          <StyledImage src={bruce_grannec} alt="Bruce Grannec"></StyledImage>
        </StyledBruceGrannec>
        <StyledGg>
          <StyledImage src={vignettegg} alt="GG"></StyledImage>
        </StyledGg>
        <StyledLoreal>
          <StyledImage src={loreal} alt="l'oreal Paris"></StyledImage>
        </StyledLoreal>

        <StyledPg>
          <StyledImage src={pg} alt="Profession Gangster"></StyledImage>
        </StyledPg>

        <StyledLeGrandJd>
          <StyledImage src={le_grand_jd} alt="Le Grand Jd"></StyledImage>
        </StyledLeGrandJd>

        <StyledVzion>
          <StyledImage src={vzion} alt="Vzion"></StyledImage>
        </StyledVzion>

        <StyledMahdiBa>
          <StyledImage src={mahdi_ba} alt="Mahdi Ba"></StyledImage>
        </StyledMahdiBa>

        <StyledWrldMag>
          <StyledImage src={wrld_mag} alt="Wrld Mag"></StyledImage>
        </StyledWrldMag>

        <StyledTheguill>
          <StyledImage src={theguill} alt="The Guill"></StyledImage>
        </StyledTheguill>

        <StyledPota>
          <StyledImage src={pota} alt="Pota"></StyledImage>
        </StyledPota>

        <StyledEdenLz>
          <StyledImage src={eden_lz} alt="Eden Lz"></StyledImage>
        </StyledEdenLz>

        <StyledPaltay>
          <StyledImage src={paltay} alt="Paltay"></StyledImage>
        </StyledPaltay>
      </StyledGrid>
    </StyledArtbook>
  );
};
