import bruce_grannec from '../../assets/artbook/bruce_grannec.webp'
import eden_lz from '../../assets/artbook/eden_lz.webp'
import loreal from '../../assets/artbook/loreal.webp'
import le_grand_jd from '../../assets/artbook/le_grand_jd.webp'
import vzion from '../../assets/artbook/vzion.webp'
import mahdi_ba from '../../assets/artbook/mahdi_ba.webp'
import olympics from '../../assets/artbook/olympics.webp'
import paltay from '../../assets/artbook/paltay.webp'
import pg from '../../assets/artbook/pg.webp'
import pota from '../../assets/artbook/pota.webp'
import theguill from '../../assets/artbook/theguill.webp'
import vignettegg from '../../assets/artbook/vignettegg.webp'
import wrld_mag from '../../assets/artbook/wrld_mag.webp'
import { StyledArtbook, StyledGrid, StyledOlympics,
  StyledBruceGrannec, StyledGg, StyledLoreal,
  StyledLeGrandJd, StyledVzion, StyledMahdiBa, StyledWrldMag, StyledTheguill,
  StyledPota, StyledEdenLz, StyledPaltay, StyledPg
} from './StyledArtbook';

export const Artbook = () => {
  return (
    <StyledArtbook>
      <StyledGrid>
        <StyledOlympics src={olympics} alt='Olympics'></StyledOlympics>
        <StyledBruceGrannec src={bruce_grannec} alt='Bruce Grannec'></StyledBruceGrannec>
        <StyledGg src={vignettegg} alt='GG'></StyledGg>
        <StyledLoreal src={loreal} alt='l&apos;oreal Paris'></StyledLoreal>
        <StyledPg src={pg} alt='Profession Gangster'></StyledPg>
        <StyledLeGrandJd src={le_grand_jd} alt='Le Grand Jd'></StyledLeGrandJd>
        <StyledVzion src={vzion} alt='Vzion'></StyledVzion>
        <StyledMahdiBa src={mahdi_ba} alt='Mahdi Ba'></StyledMahdiBa>
        <StyledWrldMag src={wrld_mag} alt='Wrld Mag'></StyledWrldMag>
        <StyledTheguill src={theguill} alt='The Guill'></StyledTheguill>
        <StyledPota src={pota} alt='Pota'></StyledPota>
        <StyledEdenLz src={eden_lz} alt='Eden Lz'></StyledEdenLz>
        <StyledPaltay src={paltay} alt='Paltay'></StyledPaltay>
      </StyledGrid>
    </StyledArtbook>
  )
}
