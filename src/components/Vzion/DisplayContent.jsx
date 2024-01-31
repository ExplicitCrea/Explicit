import { useState, useEffect } from "react";
import { StyledDisplayContent } from "./StyledDisplayContent";
import data from "./data.json"

export const DisplayContent = ({videoClick}) => {

   
   const [title, setTitle] = useState("")
   const [paragraph, setParagraph] = useState("")
   const [link, setLink] = useState("")

   useEffect(() => {
    const videoChoice = videoClick;
    setTitle(data[videoChoice][0].title);
    setParagraph(data[videoChoice][0].paragraph);
    setLink(data[videoChoice][0].link);
}, [videoClick]);


  return (
    <StyledDisplayContent>
      <div className="text-content">
        <h3>{title}</h3>
        <p>{paragraph}</p>
        <button onClick={() => link && window.open(link, '_blank', 'noopener noreferrer')}>
            consulter la vidéo
        </button>
      </div>
    </StyledDisplayContent>
  );
};
