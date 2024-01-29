import bruce_grannec from "../../assets/artbook/bruce-brannec/bruce_grannec_500w.webp";
import eden_lz from "../../assets/artbook/eden_lz/eden_lz_795w.webp";
import loreal from "../../assets/artbook/loreal/loreal_500w.webp";
import le_grand_jd from "../../assets/artbook/le_grand_jd/le_grand_jd_600w.webp";
import vzion from "../../assets/artbook/vzion/vzion_400w.webp";
import mahdi_ba from "../../assets/artbook/mahdi_ba/mahdi_ba_400w.webp";
import olympics from "../../assets/artbook/olympics/olympics_900w.webp";
import paltay from "../../assets/artbook/paltay/paltay_1100w.webp";
import pg from "../../assets/artbook/pg/pg_500w.webp";
import potatoz from "../../assets/artbook/pota/pota_297w.webp";
import theguill from "../../assets/artbook/theguill/theguill_600w.webp";
import vignettegg from "../../assets/artbook/vignettegg/vignettegg_400w.webp";
import wrld_mag from "../../assets/artbook/wrld_mag/wrld_mag_300w.webp";
import wrld_mag_no_background from "../../assets/artbook/wrld_mag/wrld_mag_no_background_400w.webp";
import { StyledArtbook } from "./StyledArtbook";

export const Artbook = () => {
  return (
    <StyledArtbook>
      <div className="container">
        <div className="olympics">
          <img src={olympics} alt="Olympics" />
        </div>

        <div className="bruce-grannec">
          <img src={bruce_grannec} alt="Bruce Grannec" />
        </div>

        <div className="gg">
          <img src={vignettegg} alt="GG" />
        </div>

        <div className="loreal">
          <img src={loreal} alt="L'oreal Paris" />
        </div>

        <div className="pg">
          <img src={pg} alt="Profession Gangster" />
        </div>

        <div className="le-grand-jd">
          <img src={le_grand_jd} alt="Le Grand Jd" />
        </div>

        <div className="vzion">
          <img src={vzion} alt="Vzion" />
        </div>

        <div className="mahdiBa">
          <div className="coming-soon">Coming soon</div>
          <img src={mahdi_ba} alt="Mahdi Ba" />
        </div>

        <div className="wrld-mag">
          <div className="background"></div>
          <img
            className="image-wrldmag-no-background"
            src={wrld_mag_no_background}
            alt="Wrld mag no background"
          />
          <img className="image-wrldmag" src={wrld_mag} alt="Wrld Mag" />
        </div>

        <div className="the-guill">
          <img src={theguill} alt="The Guill" />
        </div>

        <div className="potatoz">
          <img src={potatoz} alt="Potatoz" />
        </div>

        <div className="edenLz">
          <img src={eden_lz} alt="Eden Lz" />
        </div>

        <div className="paltay">
          <img src={paltay} alt="Paltay" />
        </div>
      </div>
    </StyledArtbook>
  );
};
