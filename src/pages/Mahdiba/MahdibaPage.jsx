import { StyledMahdibaPage } from "./StyledMahdibaPage";
import { MahdibaDesktop } from "../../components/Mahdiba/desktop/MahdibaDesktop";
import { MahdibaMobile } from "../../components/Mahdiba/mobile/MahdibaMobile";
import useWindowSize from "../../utils/useWindowSize";

export const MahdibaPage = () => {
  const isSmallScreen = useWindowSize(900)
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
