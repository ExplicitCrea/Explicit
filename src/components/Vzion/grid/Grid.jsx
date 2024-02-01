import { StyledGrid } from "./StyledGrid";

import image1 from "../../../assets/vzion/grid/image1.jpg";
import image2 from "../../../assets/vzion/grid/image2.jpg";
import image3 from "../../../assets/vzion/grid/image3.jpg";
import image4 from "../../../assets/vzion/grid/image4.jpg";
import image5 from "../../../assets/vzion/grid/image5.jpg";
import image6 from "../../../assets/vzion/grid/image6.jpg";

export const Grid = () => {
  return (
      <StyledGrid>
        <img src={image4} alt="" />
        <img src={image1} alt="" />
        <img src={image3} alt="" />
        <img src={image2} alt="" />
        <img src={image6} alt="" />
        <img src={image5} alt="" />
      </StyledGrid>
  );
};
