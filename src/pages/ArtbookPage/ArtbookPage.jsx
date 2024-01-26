import { Artbook } from "../../components/Artbook/Artbook";
import explicitStar from '../../assets/artbook/explicit_star.webp'
import { StyledArtbooksPage
} from './StyledArtbookPage';

export const ArtbookPage = () => {
  return (
    <StyledArtbooksPage>
      <div className="explicit-container">
        <img src={explicitStar} alt="Explicit Star"/>
      </div>
      <Artbook />
    </StyledArtbooksPage>
  );
};
