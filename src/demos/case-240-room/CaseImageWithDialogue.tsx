import { useState } from "react";
import type { Case240RoomImage } from "../../data/cases/case-240-room-images";

type CaseImageWithDialogueProps = {
  image: Case240RoomImage;
};

export function CaseImageWithDialogue({ image }: CaseImageWithDialogueProps) {
  const [expanded, setExpanded] = useState(false);
  const [loadFailed, setLoadFailed] = useState(false);

  return (
    <article className={`r240-scene-image-card ${expanded ? "is-expanded" : ""}`}>
      <header>
        <div>
          <small>{image.imageId} / FIRST PERSON PHOTO</small>
          <h3>{image.title}</h3>
        </div>
        <button onClick={() => setExpanded((value) => !value)}>
          {expanded ? "收起" : "查看细节"}
        </button>
      </header>

      <div className="r240-scene-image-frame">
        {!loadFailed ? (
          <img
            src={image.filePath}
            alt={image.altText}
            loading="eager"
            onError={() => setLoadFailed(true)}
          />
        ) : (
          <div className="r240-image-fallback">
            <span>[图片生成中]</span>
            <strong>{image.title}</strong>
            <p>{image.description}</p>
            <details>
              <summary>Prompt预览</summary>
              <code>{image.prompt}</code>
            </details>
          </div>
        )}

        <div className="r240-dialogue-subtitle">
          <strong>{image.npcName}</strong>
          <span>{image.dialogue}</span>
        </div>
      </div>

      {expanded && (
        <div className="r240-scene-image-detail">
          <p>{image.description}</p>
          <small>{image.altText}</small>
        </div>
      )}
    </article>
  );
}

