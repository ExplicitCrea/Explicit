import { useEffect, useState , useRef} from "react";
import main from "../../assets/slimka/5.webp";
import { StyledSlimka } from "./StyledSlimka";
const animations = {};

async function loadAnimations() {
    for (let i = 1; i < 5; i++) {
        animations[i] = [];
        for (let j = 1; j <= 5; j++) {
            const imagePath = await import(`../../assets/slimka/${i}/${j}.png`);
            animations[i].push(imagePath.default);
        }
    }
}


let Animation_flag = false;

function animate(div,reversed){
    if(!reversed){reversed = false;}
    if(Animation_flag){return;}
    const img = document.body.getElementsByClassName("main")[0];
    if (img) {
        Animation_flag = true;
        let i = reversed ? animations[div.dataset.key].length - 1 : 0;
        let interval_animation = setInterval(() => {
            if ( (!reversed && i >= animations[div.dataset.key].length) || (reversed && i < 0) ) {
                Animation_flag = false;
                return clearInterval(interval_animation);
            }
            img.src = animations[div.dataset.key][i];
            i = reversed ? i - 1 : i + 1;
        }, 100);
    }
}

export const Slimka = () => {
    const [loaded, setLoaded] = useState(false);
    const bounds = useRef([]);
    const activeDiv = useRef(null);

    useEffect(() => {
        const fetchAnimations = async () => {
            await loadAnimations();
            setLoaded(true);
        };
        fetchAnimations();
        const updateBounds = () => {
            bounds.current = [...document.body.getElementsByClassName("test")].map((element) => element.getBoundingClientRect());
        };
        updateBounds();
        window.addEventListener("resize", updateBounds);
        const handleMouseMove = (event) => {
            const mouseX = event.pageX;
            const mouseY = event.pageY;
            if (!Animation_flag) {
                let currentDiv = null;

                // Check which div the mouse is in
                for (let i = 0; i < bounds.current.length; i++) {
                    const { left, right, top, bottom } = bounds.current[i];
                    if (mouseX > left && mouseX < right && mouseY > top && mouseY < bottom) {
                        currentDiv = document.body.getElementsByClassName("test")[i];
                        break;
                    }
                }

                // Trigger animation only if entering a new div
                if (currentDiv && currentDiv !== activeDiv.current) {
                    animate(currentDiv, false); // Forward animation
                    activeDiv.current = currentDiv; // Set the current active div
                }

                // Reverse animation when leaving the last div
                if (!currentDiv && activeDiv.current) {
                    animate(activeDiv.current, true); // Reverse animation
                    activeDiv.current = null; // Clear the active div
                }
            }
        };
        window.addEventListener("mousemove", handleMouseMove);

        return () => {
            window.removeEventListener("resize", updateBounds);
            window.removeEventListener("mousemove", handleMouseMove);
        };
    }, [loaded]);

    if (!loaded) {
        return <div>Loading...</div>;
    }
    return (
        <StyledSlimka>
            <div className="ddd">
                <div className="test" data-key="1"></div>
                <div className="test" data-key="4"></div>
                <div className="test" data-key="2"></div>
                <div className="test" data-key="3"></div>
                <img src={main} alt="peluche" className="main"/>
            </div>
        </StyledSlimka>
    );
}
