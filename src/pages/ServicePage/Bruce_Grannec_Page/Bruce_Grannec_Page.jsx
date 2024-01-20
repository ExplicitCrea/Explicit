import { Carousel } from '../../../components/Bruce_Grannec/Carousel'
import labelOnSide from '../../../assets/Bruce_Grannec/label_on_side.webp' 
import whiteLogo from '../../../assets/Bruce_Grannec/white_logo.webp'
import whiteStar from '../../../assets/Bruce_Grannec/white_star.webp'
import eventPicture from '../../../assets/Bruce_Grannec/event_picture.webp'

import {
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
  StyledDivCarousel,
}
from './StyledBruceGrannec'


export const Bruce_Grannec_Page = () => {
  return (
    <StyledPage>
      <StyledContainer>
        <StyledDivLabelOnSide>
          <StyledImgLabel src={labelOnSide} alt='Label on side'/>
        </StyledDivLabelOnSide>
        
        <StyledParagrahAndLogo>
          <StyledParagraph>
            Nous sommes fiers d&apos;avoir pu collaborer avec Bruce Grannec en fournissant des visuels exceptionnels
            pour son tournoi en collaboration avec FIFA 2023.
            Notre équipe a conçu des assets animés sur mesure pour enrichir son événement. Chaque élément visuel a été soigneusement élaboré
            pour refléter le professionnalisme et l&apos;enthousiasme du tournoi, offrant à Bruce Grannec
            une présence visuelle distinctive et immersive sur sa plateforme de streaming.
          </StyledParagraph>
          <StyledDivLogo>
            <StyledStar src={whiteStar} alt="White Logo Explicite" />
            <StyledLogo src={whiteLogo} alt="White Star Explicite" />
          </StyledDivLogo>
        </StyledParagrahAndLogo>
        <StyledDivEventPicture>
          <StyledImageEventPicture src={eventPicture} alt="Event Picture" />
        </StyledDivEventPicture>
        <StyledDivCarousel>
          <Carousel/>
        </StyledDivCarousel>
      </StyledContainer>
    </StyledPage>
  )
}
