import { MahdibaDesktop } from "../../components/Mahdiba/desktop/MahdibaDesktop";
import { MahdibaMobile } from "../../components/Mahdiba/mobile/MahdibaMobile";
import useWindowSize from "../../utils/useWindowSize";
import { StyledMahdibaPage } from "./StyledMahdibaPage";

export const MahdibaPage = () => {
  const isSmallScreen = useWindowSize(1000)
  return (
    <StyledMahdibaPage>
      {isSmallScreen ? (
        <MahdibaMobile/>
      ) : (
        <MahdibaDesktop/>
      )}


    </StyledMahdibaPage>
  );
};
