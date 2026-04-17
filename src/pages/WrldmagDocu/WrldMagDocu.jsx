// import { useTranslation } from "react-i18next";
import bg_star from "../../assets/STAR_BG.png";
import logo from "../../assets/wrldmag_docu/LOGO_TXT_WRLD_MAG.png";
import bg_imagery from "../../assets/wrldmag_docu/STAR_COMP_MAIN.png";
import poster from "../../assets/wrldmag_docu/postertest.webp";
import minia from "../../assets/wrldmag_docu/Minia.jpg";
import minia_2 from "../../assets/wrldmag_docu/Minia_2.jpg";
import bar from "../../assets/wrldmag_docu/bar.png";
import gachette from "../../assets/wrldmag_docu/GACHETTE_COURTE.png";
import gachette_lng from "../../assets/wrldmag_docu/GACHETTE_LONGUE.png";
import pp_text from "../../assets/wrldmag_docu/PP_TEXTE.webp";
import lft_arrow from "../../assets/wrldmag_docu/ARROW.png";
import USA_video from "../../assets/wrldmag_docu/USA_FILM.webm";
import { Player } from "../../utils/Player";
import { StyledWrldmagDocu } from "./StyledWrldmagDocu.js";
import { useEffect } from "react";

export const WrldmagDocu = () => {
//   const {t} = useTranslation();
    useEffect(() => {
        const possible_images = document.querySelectorAll(".caroussel img.minia");
        let current_image = 0;

        const carroussel = (direction) => {
            if (direction === "left") {
                possible_images[current_image].style.display = "none";
                current_image = (current_image - 1 + possible_images.length) % possible_images.length;
                possible_images[current_image].style.display = "block";
            } else if (direction === "right") {
                possible_images[current_image].style.display = "none";
                current_image = (current_image + 1) % possible_images.length;
                possible_images[current_image].style.display = "block";
            }
        };

        // Add event listeners for buttons
        document.getElementById("left_button").addEventListener("click", () => carroussel("left"));
        document.getElementById("right_button").addEventListener("click", () => carroussel("right"));

        return () => {
            try{
            // Clean up event listeners
            document.getElementById("left_button").removeEventListener("click", () => carroussel("left"));
            document.getElementById("right_button").removeEventListener("click", () => carroussel("right"));
            }catch(e){
                console.log(e);
            }
        };
    }, []);


  return (
    <StyledWrldmagDocu>
    <img src={logo} alt="logo" className="logo"/>
    <div className="imagery">
        <img src={bg_imagery} alt="bg_imagery" className="bg_imagery"/>
        <div className="sub">
            <div className="poster">
                <img src={poster} alt="poster"/>
                <img src={bar} alt="bar" className="bar"/>
                <span className="bar_text">Un documentaire</span>
            </div>
            <div className="miniatures">
                <img src={minia} alt="minia" className="minia"/>
                <img src={minia_2} alt="minia_2" className="minia"/>
                <img src={bar} alt="bar" className="bar"/>
                <span className="bar_text">Deux vidéos</span>
            </div>
        </div>
    </div>
    <div className="montage">
        <div className="gachette">
            <img src={gachette} alt="gachette"/>
            <span className="bar_text">Montage</span>
        </div>
        <Player video={USA_video} />
    </div>
    <div className="information">
        <img src={pp_text} alt="pp_text"/>
        <span>Visionnage</span>
        <span>+600k</span>
        <span>WRLD Mag nous a proposé de collaborer à la conception d&apos;un nouveau
            documentaire retraçant l&apos;histoire de la musique dans les quartiers populaires de New York
            City. Nous avons pu les accompagner à chaque étape du projet, depuis la préparation jusqu&apos;à
            la post-production, en passant par le tournage. Nous leur avons également fourni des
            recommandations artistiques et personnalisées à chaque phase du processus.</span>
    </div>
    <div className="assets">
        <div className="gachette_lng">
            <img src={gachette_lng} alt="gachette"/>
            <span className="bar_text">Assets Graphiques</span>
        </div>
        <div className="caroussel">
            <button id="left_button"><img src={lft_arrow} alt="left arrow"/></button>
            <img src={minia} alt="minia" className="minia"/>
            <img src={minia_2} alt="minia_2" className="minia" style={{display: "none"}}/>
            <button id="right_button"><img src={lft_arrow} alt="right arrow"/></button>
        </div>
    </div>
    <div className="bg_stars">
        <img src={bg_star} alt="bg_star" className="bg_star"/>
        <img src={bg_star} alt="bg_star" className="bg_star"/>
        <img src={bg_star} alt="bg_star" className="bg_star"/>
    </div>
    </StyledWrldmagDocu>
  );
};
