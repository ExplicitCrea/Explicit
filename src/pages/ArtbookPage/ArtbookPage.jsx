import { Artbook } from "../../components/Artbook/Artbook";
import explicitStar from '../../assets/artbook/explicit_star.webp'
import { StyledArtbooksPage, StyledDiv, StyledImage
} from './StyledArtbookPage';

export const ArtbookPage = () => {
  return (
    <StyledArtbooksPage>
      <StyledDiv>
        <StyledImage src={explicitStar} alt="Explicit Star"/>
      </StyledDiv>
      <Artbook />
    </StyledArtbooksPage>
  );
};
