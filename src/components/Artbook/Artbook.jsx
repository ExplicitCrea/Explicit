import bruce_grannec from "../../assets/artbook/bruce-brannec/bruce_grannec_500w.webp";
import eden_lz from "../../assets/artbook/eden_lz/eden_lz_795w.webp";
import loreal from "../../assets/artbook/loreal/loreal_500w.webp";
import le_grand_jd from "../../assets/artbook/le_grand_jd/le_grand_jd_600w.webp";
import vzion from "../../assets/artbook/vzion/vzion.webp";
import mahdi_ba from "../../assets/artbook/mahdi_ba/mahdi_ba_400w.webp";
import olympics from "../../assets/artbook/olympics/olympics_900w.webp";
import paltay from "../../assets/artbook/paltay/paltay_1100w.webp";
import paltay2 from "../../assets/artbook/paltay/paltay_750w.webp";
import pg from "../../assets/artbook/pg/pg_500w.webp";
import potatoz from "../../assets/artbook/pota/pota_297w.webp";
import theguill from "../../assets/artbook/theguill/theguill_600w.webp";
import vignettegg from "../../assets/artbook/vignettegg/vignettegg_400w.webp";
import wrld_mag from "../../assets/artbook/wrld_mag/wrld_mag_300w.webp";
import wrld_mag_no_background from "../../assets/artbook/wrld_mag/wrld_mag_no_background_400w.webp";
import { StyledArtbook } from "./StyledArtbook";
import { Link } from "react-router-dom";


export const Artbook = () => {
  return (
    <StyledArtbook> 
      <div className="container">
        <Link to="/olympics" className="olympics">
          <img src={olympics} alt="Olympics" width={900} height={231} />
        </Link>


        <Link to="/brucegrannec" className="bruce-grannec">
          <img
            src={bruce_grannec}
            alt="Bruce Grannec"
            width={500}
            height={219}
          />
        </Link>


        <Link to="/gg" className="gg">
          <img src={vignettegg} alt="GG" width={400} height={225} />
        </Link>


        <Link className="loreal">
          <div className="coming-soon">Coming soon</div>
          <img src={loreal} alt="L'oreal Paris" width={500} height={286} />
        </Link>


        <Link to="/pg" className="pg">
          <img src={pg} alt="Profession Gangster" width={500} height={337} />
        </Link>


        <Link to="/le-grand-jd" className="le-grand-jd">
          <img src={le_grand_jd} alt="Le Grand Jd" width={600} height={337} />
        </Link>


        <Link to="/vzion" className="vzion">
          <img src={vzion} alt="Vzion" width={400} height={400} />
        </Link>


        <Link to='/mahdiba' className="mahdiBa">
          <img src={mahdi_ba} alt="Mahdi Ba" width={400} height={460} />
        </Link>


        <Link to='/wrldmag' className="wrld-mag">
          <div className="wrld-background"></div>
          <img
            className="wrldmag-no-background"
            src={wrld_mag_no_background}
            alt="Wrld mag no background"
            width={400}
            height={277}
          />
          <img
            className="wrldmag"
            src={wrld_mag}
            alt="Wrld Mag"
            width={300}
            height={537}
          />
        </Link>


        <Link to='/theguill' className="the-guill">
          <img src={theguill} alt="The Guill" width={600} height={239} />
        </Link>


        <Link to="/potatoz" className="potatoz">
          <img src={potatoz} alt="Potatoz" width={297} height={518} />
        </Link>

        <Link to="/eden-lz" className="edenLz">
          <img src={eden_lz} alt="Eden Lz" width={795} height={701}/>
        </Link>


        <Link to="/paltay" className="paltay">
          <img
            srcSet={`${paltay} 1100w, ${paltay2} 750w`}
            sizes="(max-width: 900px) 750px"
            src={paltay}
            alt="Paltay"
            width={1100}
            height={198}
          />
        </Link>
      </div>
    </StyledArtbook>
  );
};



