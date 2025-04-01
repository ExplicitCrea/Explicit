import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

function hexToRgb(hex) {
    const bigint = parseInt(hex.slice(1), 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return [r, g, b];
}

function rgbToHex(r, g, b) {
    return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase()}`;
}

function generateGradientColors(color1, color2, steps) {
    const rgb1 = hexToRgb(color1);
    const rgb2 = hexToRgb(color2);
    const colors = [];

    for (let i = 0; i <= steps; i++) {
        const r = Math.round(rgb1[0] + (rgb2[0] - rgb1[0]) * (i / steps));
        const g = Math.round(rgb1[1] + (rgb2[1] - rgb1[1]) * (i / steps));
        const b = Math.round(rgb1[2] + (rgb2[2] - rgb1[2]) * (i / steps));
        colors.push(rgbToHex(r, g, b));
    }

    return colors;
}

const GradientItems = ({ table_categorie }) => {
    useEffect(() => {
        //run this code after the component is mounted (after the first render)
        const colorStart = "#634EFF";
        const colorEnd = "#64FFA9";
        const items = document.querySelectorAll('.items');
        const MaingradientColors = generateGradientColors(colorStart, colorEnd, items.length);

        items.forEach((item, idx) => {
            const links = item.querySelectorAll('a');
            const gridRowEnds = Array.from(links).map(link => parseInt(window.getComputedStyle(link).gridRowEnd));
            const maxRowCount = Math.max(...gridRowEnds);
            const gradientColors = generateGradientColors(MaingradientColors[idx], MaingradientColors[idx + 1] || colorEnd, maxRowCount);
            const links_by_row = Array.from(links).reduce((acc, link) => {
                const gridRowStart = parseInt(window.getComputedStyle(link).gridRowStart);
                if (!acc[gridRowStart]) {
                    acc[gridRowStart] = [];
                }
                acc[gridRowStart].push(link);
                return acc;
            }, {});


            links.forEach((link) => {
                const computedStyle = window.getComputedStyle(link);
                const gridRowStart = parseInt(computedStyle.gridRowStart);
                const gridRowEnd = parseInt(computedStyle.gridRowEnd);

                if (gridRowEnd - gridRowStart > 1) {// 2 rows or more
                    //use the main gradient colors
                    const startColor = MaingradientColors[idx];
                    const endColor = MaingradientColors[idx + 1] || colorEnd;
                    link.style.background = `linear-gradient(to bottom, ${startColor} 0%, ${endColor} 100%)`;
                    return;
                }

                if (gridRowStart === 1) {
                    // 1st row
                    const color1 = gradientColors[0];//get the first color from the gradient colors
                    const nextRowLink = (gridRowStart + 1) <= maxRowCount ? links_by_row[gridRowStart + 1][0] : null;//we don't care abt the column
                    
                    let nextColor;
                    //try to get the next color from the next link
                    if (nextRowLink) {
                        const nextComputedStyle = window.getComputedStyle(nextRowLink);
                        const bg = nextComputedStyle.backgronud;
                        if (bg && bg.includes("linear-gradient")) {
                            const matches = bg.match(/#[a-fA-F0-9]{6}/g);
                            nextColor = matches ? matches[0] : gradientColors[gridRowStart + 1] || colorEnd;
                        } else {
                            nextColor = gradientColors[gridRowStart + 1] || colorEnd;
                        }
                    } else {
                        nextColor = gradientColors[gridRowStart + 1] || colorEnd;
                    }

                    link.style.background = `linear-gradient(to bottom, ${color1} 0%, ${nextColor} 100%)`;
                } else {
                    //2nd row
                    const color1 = gradientColors[gridRowStart];
                    const color2 = gradientColors[gridRowStart + 1] || colorEnd;
                    link.style.background = `linear-gradient(to bottom, ${color1} 0%, ${color2} 100%)`;
                }
            });
        });
    }, [table_categorie]);

    return (
        <div className="container">
            {Object.keys(table_categorie).map((categorie, index_cat) => (
                <div key={index_cat} id={categorie} className="categorie">
                    <h1>{categorie}</h1>
                    <hr />
                    <div className="items">
                        {table_categorie[categorie].map((element, index) => (
                            <Link to={"/" + (!element.url ? "artbook":element.url)} key={index} className={element.name} data-index={index_cat + 1}>
                                <img width={795} height={701} />{/*fake image to keep width & height*/}
                                {!element.url ? <div className="coming-soon">Coming soon</div> : null }
                                <span>{element.name}</span>
                            </Link>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};
GradientItems.propTypes = {
    table_categorie: PropTypes.objectOf(
        PropTypes.arrayOf(
            PropTypes.shape({
                name: PropTypes.string.isRequired,
                img: PropTypes.string.isRequired
            })
        )
    ).isRequired
};

export default GradientItems;
