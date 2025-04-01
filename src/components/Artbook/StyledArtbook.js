import styled from "styled-components";


const StyledArtbook = styled.div`
    z-index: 1;
    width: 100%;
    font-family: lexend;

    img.curseur{
        width: 48px;
        height: 48px;
        position: fixed;
        transition: 0.12s linear;
        pointer-events: none;
        z-index: 3;
        filter: saturate(0) brightness(100);
        @media (max-width: 759px) {
            display: none;
        }
    }
    .glass_morphism{
        background:transparent;
        backdrop-filter: blur(10px);
        -webkit-backdrop-filter: blur(10px);
        -moz-backdrop-filter: blur(10px);
        -o-backdrop-filter: blur(10px);
        // box-shadow: -4px 5px 9px 0px rgba(0, 0, 0, 0.2);
        }
    .redirections{
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: flex-start;
        align-items: center;
        max-width: 58.12vw;
        margin: 0 auto;
        padding: 3vh 1.5vw;
        gap: 1vh 1.3vw;
        margin-bottom:  1.25vw; 
        border-radius: 15px;
        font-size: 2em;
        z-index: 4;
        position: relative;
        @media (max-width: 759px) {
            font-size: 1.5em;
            padding: 1vh 1vw;
            max-width: 98%;
        }
        span.description{
            color:white;
            // always uppercase
            text-transform: uppercase;
            font-weight: 400;
        }
        button {
            font-size: 1em;
            text-transform: uppercase;
            background:transparent;
            border:0;
            cursor: pointer;
            //   make it so the text has a invisible innner border
            -webkit-text-stroke: 1px white;
            -webkit-text-fill-color: transparent;
            -webkit-text-stroke-color: #737373;
            color: #737373;
            transition: 0.5s;
            &:hover {
                -webkit-text-fill-color: #737373;
                -webkit-text-stroke-color: #737373;
            }
        }
    }/* end of .redirections */   

  .container {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    width:  95vw;
    min-height: 100%;
    margin: 0 auto;
    gap: 0.8vw;
    @media (min-width: 1200px) {
        width: 1200px;
    }
    @media (max-width: 900px) {
      padding: 20px;
      height: 100%;
      margin-top: 20px;
      gap: 2vw;
    }
    
    .categorie {
        display: flex;
        flex-direction: column;
        justify-content: center;
        width: 100%;
        font-size: 1.2em;
        hr{
            width: 100%;
            height: 4px;
            background: #111;
            border: none;
            margin: 0 0 2vh 0;
        }
        --gab_grid_items: 1vw;
        --midgab_grid_items: calc(var(--gab_grid_items) / 2);
        a{
            display: flex;
            justify-content: center;
            align-items: center;
            position: relative;
            border-radius: 10px;
        }
        .items{
            overflow: hidden;
            position: relative;
            border-radius: 15px;
            display:grid;
            grid-gap: var(--gab_grid_items);
            padding: var(--gab_grid_items);
        }
        .items:has(:nth-child(3)):not(:has(:nth-child(4))) {
            grid-template-columns: calc(50% - var(--midgab_grid_items)) calc(50% - var(--midgab_grid_items));
            grid-template-rows: calc(60% - var(--midgab_grid_items)) calc(40% - var(--midgab_grid_items));
            height: 60.5vh;
            @media (max-width: 759px) {
                height: 35vh;
            }
            a:nth-child(1) {
                grid-area: 1 / 1 / 2 / 2; 
            }

            a:nth-child(2) {
                grid-area: 2 / 1 / 3 / 2; 
            }

            a:nth-child(3) {
                grid-area: 1 / 2 / 3 / 3; 
            }
        }
        .items:has(:nth-child(4)):not(:has(:nth-child(5))) {
            grid-template-columns: calc(31.125% - var(--midgab_grid_items)) 9.685% calc(58.11% - var(--midgab_grid_items));
            grid-template-rows: repeat(2, calc(50% - var(--midgab_grid_items))); 
            height: 65vh;
            @media (max-width: 759px) {
                height:30vh;
            }
            a{
                grid-area: 1 / 1 / 2 / 3; 
           }
            a:nth-child(2){
                grid-area: 1 / 3 / 2 / 4;
            }
            a:nth-child(3){
                grid-area: 2 / 1 / 3 / 2;
            }
            a:nth-child(4){
                grid-area: 2 / 2 / 3 / 4; 
            }
        }
        .items:has(:nth-child(5)):not(:has(:nth-child(6))) {
            grid-template-columns: calc(34% - var(--midgab_grid_items)) 30% calc(34% - var(--midgab_grid_items));
            grid-template-rows: 40% 58%;
            height: 65vh;
            @media (max-width: 759px) {
                height: 35vh;
            }
            a{
                grid-area: 1 / 1 / 2 / 3;
            }
            a:nth-child(2){
                grid-area: 1 / 3 / 2 / 4;
            }
            a:nth-child(3){
                grid-area: 2 / 1 / 3 / 2;
            }
            a:nth-child(4){
                grid-area: 2 / 2 / 3 / 3;
            }
            a:nth-child(5){
                grid-area: 2 / 3 / 3 / 4;
            }
        }
    }

    img {
      width: 100%;
      height: 100%;
      border-radius: 10px;
      cursor: pointer;
      visibility: hidden;
    }
    a span{
        position: absolute;
        bottom: 0;
        width: 100%;
        text-align: left;
        padding: 1vh 1vw;
        color: white;
        font-size: 1.9em;
        font-weight: 600;
        border-radius: 0 0 10px 10px;
        @media (max-width: 759px) {
            font-size: 1.3em;
        }
    }

    .coming-soon {
        position: absolute;
        background-color: #404040;
        font-family: Lexend;
        color: white;
        font-size: 1.5em;
        height: auto;
        text-align: center;
        padding: 1vh 1vw;
        border-radius: 15px;
        z-index: 2;
        @media (max-width: 1600px) {
            font-size: 1.3em;
        }
        @media (max-width: 1350px) {
            font-size: 1em;
        }
        @media (max-width: 1110px) {
            font-size: 0.8em;
        }
        @media (max-width: 900px) {
            padding: 8px;
            font-size: 0.8em;
            width: 85%;
            bottom: 15vw;
        }
        @media (max-width: 500px) {
            font-size: 0.6em;
        }
    }/* end of .coming-soon */
  }/* end of container */

`;


export { StyledArtbook };



