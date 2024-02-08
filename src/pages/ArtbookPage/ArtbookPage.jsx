import { NewArtbook } from "../../components/Artbook/NewArtbook";
import explicitStar from '../../assets/artbook/explicit_star/explicit_star_1300w.webp'
import { StyledArtbooksPage} from './StyledArtbookPage';

export const ArtbookPage = () => {
  return (
    <StyledArtbooksPage>
        <img className="explicit-star" src={explicitStar} alt="Explicit Star"/>
      <NewArtbook />
    </StyledArtbooksPage>
  );
};
