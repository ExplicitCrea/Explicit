// ---------------------- Advertisement ----------------------
// import Jo from "../../assets/artbook/artbook_redesign/test (16).jpg";
// import Insta360 from "../../assets/artbook/artbook_redesign/test (17).jpg";
// import LOréal from "../../assets/artbook/artbook_redesign/test (18).jpg";
// // ---------------------- Documentary --------------------------
// import PG from "../../assets/artbook/artbook_redesign/test (1).jpg";
// import McSkyz from "../../assets/artbook/artbook_redesign/test (2).jpg";
// import WrldMagNY from "../../assets/artbook/artbook_redesign/test (3).jpg";
// // ------------------------- Events -----------------------------
// import Slimka from "../../assets/artbook/artbook_redesign/test (13).jpg";
// import GuillGames from "../../assets/artbook/artbook_redesign/test (14).jpg";
// import Fifa2023 from "../../assets/artbook/artbook_redesign/test (15).jpg";
// // ----------------------- LiveStreaming -----------------------
// import Grim from "../../assets/artbook/artbook_redesign/test (4).jpg";
// import paltay from "../../assets/artbook/artbook_redesign/test (5).jpg";
// import potatoz from "../../assets/artbook/artbook_redesign/test (6).jpg";
// import Guill from "../../assets/artbook/artbook_redesign/test (7).jpg";
// import Mahdiba from "../../assets/artbook/artbook_redesign/test (8).jpg";
// // ------------------------ Editing ---------------------------
// import Vzion from "../../assets/artbook/artbook_redesign/test (9).jpg";
// import LeGrandJD from "../../assets/artbook/artbook_redesign/test (10).jpg";
// import EdenLz from "../../assets/artbook/artbook_redesign/test (11).jpg";
// import WrldMag from "../../assets/artbook/artbook_redesign/test (12).jpg";

import { StyledArtbook } from "./StyledArtbook";
import { useTranslation } from "react-i18next";
import GradientItems from './Gradient_Items'; 
import { useEffect, useState } from "react";
import etoile from "../../assets/star_cursor.webp";

async function gotoCategorie(categorie) {
    // Locate the category element
    let categorieElement = document.getElementById(categorie);
    let categorie_bounding = categorieElement.getBoundingClientRect();
    let n_of_children = categorieElement.getElementsByClassName("items")[0].childElementCount;
    let offset = 50 * (n_of_children / 3.5);
    let targetScrollY = window.pageYOffset + categorie_bounding.top + (categorie_bounding.bottom - categorie_bounding.top) / 2 - offset;

    // Adjust to behave like { block: "center" }
    targetScrollY = targetScrollY - document.documentElement.clientHeight / 2;

    // Scroll variables
    let startScrollY = window.pageYOffset;
    let distance = targetScrollY - startScrollY;
    if (distance === 0) return;
    else if (Math.abs(distance) < 500) {
        window.scrollTo(0, targetScrollY);
        return;
    }
    let duration = 500 + Math.abs(distance) * 0.3; // Scroll duration adjusted for distance
    let startTime = null;

    // Ease-in-out timing function
    function easeInOutQuad(t) {
        return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
    }

    function step(timestamp) {
        if (!startTime) startTime = timestamp;
        let elapsed = timestamp - startTime;
        let progress = Math.min(elapsed / duration, 1); // Progress capped at 1

        // Apply the easing function
        let easedProgress = easeInOutQuad(progress);
        let currentY = startScrollY + distance * easedProgress;

        window.scrollTo(0, currentY);

        // Continue scrolling or finish
        if (progress < 1) {
            requestAnimationFrame(step);
        }
    }

    // Start the animation
    requestAnimationFrame(step);
}

function handleMouseMove(event) {
    let x = event.clientX;
    let y = event.clientY;
    let cursor = document.querySelector(".curseur");
    if (cursor) {
        const bounds = cursor.getBoundingClientRect();
        cursor.style.left = `${x - bounds.width / 2}px`;
        cursor.style.top = `${y - bounds.height / 2}px`;    
    }
}

let flag_animation = false;
function changeColor(){
    let cursor = document.querySelector(".curseur");
    if(flag_animation){return;}
    flag_animation = true;
    if(cursor){
        cursor.style.filter = "invert(1) hue-rotate(10deg) brightness(.8)";
        let step = 0;
        let interval = setInterval(() => {
            step++;
            if(step >= 20){
                clearInterval(interval);
                flag_animation = false;
                return cursor.style.filter = "";
            }
            if(step<=10){
            cursor.style.filter = `invert(${1/(step/2)}) hue-rotate(${step}deg) brightness(1)`;
            }else{
                cursor.style.filter = `invert(.2) hue-rotate(9deg) brightness(${step/2.5}) saturate(${1/(step*10)})`;
            }
        }, 200);
    }
}

export const Artbook = () => {
    const [loaded, setLoaded] = useState(false);
    const { t } = useTranslation();
    let categories = [
        "Advertisement",
        "Documentary",
        "Events",
        "LiveStreaming",
        "Editing",
    ];
    useEffect(() => {
        setLoaded(true);
        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("click", changeColor);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("click", changeColor);
        };
    }, [loaded]);

    if (!loaded) {
        return <div> Loading... </div>;
    }
    
    let table_categorie = {
        0:[
            {"name":"Insta360"/*,"img":Insta360*/,"url":"insta360"},
            {"name":"L'Oréal"/*,"img":LOréal*/},//,"url":"loreal"},
            {"name":"Olympics games"/*,"img":Jo*/,"url":"olympics"},
        ],
        1:[
            {"name":"Profession Gangster"/*,"img":PG*/,"url":"pg"},
            {"name":"McSkyz"/*,"img":McSkyz*/,"url":"mcskyz"},
            {"name":"Wrld Mag - New York"/*,"img":WrldMagNY*/,"url":"wrldmag_documentaire"},
        ],
        2:[
            {"name":"Slimka"/*,"img":Slimka*/},
            {"name":"GuillGames"/*,"img":GuillGames*/,"url":"gg"},
            {"name":"Fifa 2023"/*,"img":Fifa2023*/,"url":"brucegrannec"},
        ],
        3:[
            {"name":"Grim"/*,"img":Grim*/,"url":"grim"},
            {"name":"Paltay"/*,"img":paltay*/,"url":"paltay"},
            {"name":"Potatoz"/*,"img":potatoz*/,"url":"potatoz"},
            {"name":"Guill"/*,"img":Guill*/,"url":"theguill"},
            {"name":"Mahdiba"/*,"img":Mahdiba*/,"url":"mahdiba"},
        ],
        4:[
            {"name":"Vzion"/*,"img":Vzion*/,"url":"vzion"},
            {"name":"Le Grand JD"/*,"img":LeGrandJD*/,"url":"le-grand-jd"},
            {"name":"Eden Lz"/*,"img":EdenLz*/,"url":"eden-lz"},
            {"name":"Wrld Mag"/*,"img":WrldMag*/,"url":"wrldmag"},
        ],
    };
    if(table_categorie){
        for (let i = 0; i < Object.keys(table_categorie).length; i++) {
            table_categorie[t(`artbook.categories.${categories[i]}`)] = table_categorie[i];
            delete table_categorie[i];
        }
    }
  return (
    <StyledArtbook>
        <img alt="curseur" src={etoile} className="curseur"/>
        <div className="redirections glass_morphism">
        <span className="description">{t('artbook.description')}</span>
        {
            Object.keys(table_categorie).map((categorie, index) => {
                return (
                    <>
                        <button key={index} onClick={()=>{gotoCategorie(categorie)}}>{categorie}</button>
                        {(index < Object.keys(table_categorie).length - 1) && <span> / </span>}
                    </>
                )
            })
        }
        </div>
        <GradientItems table_categorie={table_categorie} />
    </StyledArtbook>
  );
};