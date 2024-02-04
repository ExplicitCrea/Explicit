import { useState, useEffect } from "react";
import { StyledDisplayContent } from "./StyledDisplayContent";
import { useTranslation } from "react-i18next";

export const DisplayContent = ({ videoClick }) => {
  const { t, i18n } = useTranslation();
  const videoData = t(`vzion.${videoClick}`)[0];
  const [title, setTitle] = useState("");
  const [paragraph, setParagraph] = useState("");
  const [link, setLink] = useState("");

  useEffect(() => {
    setTitle(videoData.title);
    setParagraph(videoData.paragraph);
    setLink(videoData.link);
  }, [videoClick, i18n.language]);

  return (
    <StyledDisplayContent>
      <div className="text-content">
        <h3>{title}</h3>
        <p>{paragraph}</p>
        <div className="container_btn">
          <button
            onClick={() =>
              link && window.open(link, "_blank", "noopener noreferrer")
            }
          >
            {t("vzion.displayContent.button")}
          </button>
        </div>
      </div>
    </StyledDisplayContent>
  );
};
