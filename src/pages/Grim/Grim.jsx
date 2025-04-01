import { Player } from '../../utils/Player';
import { useEffect } from 'react';
import { useMotionValue, animate, motion } from 'framer-motion';
import StyledGrim from './StyledGrim';
// import { useTranslation } from "react-i18next";
import sub_panel from '../../assets/grim/panel_sub.webp';
import streampack from '../../assets/grim/ExtraitStreampack.webm';
import youtube_panel from '../../assets/grim/panel_ytb.webp';
import discord_panel from '../../assets/grim/panel_discord.webp';
import insta_panel from '../../assets/grim/panel_insta.webp';
import twitter_panel from '../../assets/grim/panel_twitter.webp';
import transition from '../../assets/grim/TRANSITION_2.webm';
import animation from '../../assets/grim/Extrait-Anime.webm';
import { CompareSlider } from "../../components/Vzion/CompareSlider.jsx/CompareSlider";

let before_after = {};
for (let i = 65; i < 65+5; i++) {
    // import(`../../assets/grim/before_after/${String.fromCharCode(i)}.png`);
    // import(`../../assets/grim/before_after/${String.fromCharCode(i)}2.png`);
    before_after[String.fromCharCode(i)] = {
        before: (await import(`../../assets/grim/before_after/${String.fromCharCode(i)}.png`)).default,
        after: (await import(`../../assets/grim/before_after/${String.fromCharCode(i)}2.png`)).default
    };
}

import * as Images from '../../assets/grim/AVANCEMENT/index.js';
const imageArray = Object.values(Images);
const tracks = [];
for (let i = 0; i < 2; i++) {
    tracks.push(imageArray.slice(i*imageArray.length/2, (i+1)*imageArray.length/2).map((src) => ({src})));
}

export const Grim = () => {
// const { t } = useTranslation();
function SwitchImage(e) {
    if(e.target.tagName != "IMG")return;
    //get the last child and put it in the first position
    let panels = document.querySelector('.panels');
    let lastChild = panels.lastElementChild;
    panels.removeChild(lastChild);
    panels.insertBefore(lastChild, panels.firstChild);
}

function handleCarousel(direction) {
    let carousel = document.querySelector('.carousel');
    let slides = carousel.querySelectorAll('.carousel > div');
    let currentSlide = Array.from(slides).findIndex(slide => slide.dataset.active === '1');
    slides[currentSlide].dataset.active = '0';
    currentSlide += direction;
    if (currentSlide < 0) currentSlide = slides.length - 1;
    if (currentSlide >= slides.length) currentSlide = 0;
    slides[currentSlide].dataset.active = '1';
}

useEffect(() => {
    let carousel = document.querySelector('.carousel');
    let slides = carousel.querySelectorAll('.carousel div');
    if (slides.length > 0) {
        slides.forEach(slide => slide.dataset.active = '0');
        slides[0].dataset.active = '1';
    }
}, []);


const xTranslationa = useMotionValue(0);
const xTranslationb = useMotionValue(0);

useEffect(() => {
    const handleImageLoad = () => {
        let controls = [];
        //width is the sum of the width of all the images
        for (let i = 0; i < tracks.length; i++) {
            let width = 0;
            let images = document.querySelectorAll(`.carousel-track.${i%2==0?'a':'b'} img`);
            images.forEach(img => {
                width += img.getBoundingClientRect().width/2;
            });
            let finalPosition = -width;
            if (controls.length<i){
                controls.push(null);
            }
            controls[i] = animate(i%2==0?xTranslationa:xTranslationb, [0, finalPosition], {
                ease: 'linear',
                duration: 95,
                repeat: Infinity,
                repeatType: 'loop',
                repeatDelay: 0,
            });
        }

        return controls.map(control => control.stop);
    };

    let images = document.querySelectorAll('.carousel-track img');
    let loadedImagesCount = 0;
    images.forEach(img => {
        if (img.complete) {
            loadedImagesCount++;
        } else {
            img.onload = () => {
                loadedImagesCount++;
                if (loadedImagesCount === images.length) {
                    handleImageLoad();
                }
            };
        }
    });

    if (loadedImagesCount === images.length) {
        handleImageLoad();
    }
}, [xTranslationa, xTranslationb]);

return (
    <StyledGrim>
        <div className="top_container">
            <img draggable="false" src={sub_panel} alt="sub panel" />
            <Player video={streampack} />
        </div>
        <div className="container">
            <div className="panels" onClick={SwitchImage}>
                <img draggable="false" src={twitter_panel} alt="twitter panel" />
                <img draggable="false" src={discord_panel} alt="discord panel" />
                <img draggable="false" src={insta_panel} alt="insta panel" />
                <img draggable="false" src={youtube_panel} alt="youtube panel" />
            </div>
            <Player video={transition} />
        </div>
        <div className="carousel">
            <button className="carousel_button" onClick={() => {handleCarousel(-1)}}>◄</button>
            {Object.keys(before_after).map((char, i) => (
                <CompareSlider key={i} before={before_after[char].before} after={before_after[char].after} />
            ))}
            <button className="carousel_button" onClick={() => {handleCarousel(1)}}>►</button>
        </div>
        <div className="avancement">
            {tracks.map((track, i) => (
                <motion.div key={i} className={`carousel-track ${i%2==0?'a':'b'}`} style={{x: i%2==0?xTranslationa:xTranslationb}}>
                    {[...track,...track].map(((img,j) => (
                        <img 
                        key={j}
                        src={img.src}
                        alt="item du slider"
                        />
                    )))}
                </motion.div>  
            ))}
            <Player video={animation} />
        </div>
    </StyledGrim>
  )
}