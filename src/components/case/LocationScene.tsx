import { useState } from "react";
import type { CaseAction, CaseChoice, CaseScene } from "../../data/cases";
import { AudioManager } from "./AudioManager";

type LocationSceneProps = {
  scene: CaseScene;
  onAction: (action: CaseAction) => void;
  onChoice: (choice: CaseChoice) => void;
};

export function LocationScene({ scene, onAction, onChoice }: LocationSceneProps) {
  const [inspected, setInspected] = useState<string[]>([]);

  const inspect = (action: CaseAction) => {
    setInspected((current) =>
      current.includes(action.actionId) ? current : [...current, action.actionId],
    );
    onAction(action);
  };

  return (
    <section className="runner-scene location-scene">
      <div className="location-visual" style={{ "--scene-order": scene.order } as React.CSSProperties}>
        {scene.imageSrc && (
          <img className="location-background-image" src={scene.imageSrc} alt="" />
        )}
        <span className="location-scanline" />
        <div className="location-caption">
          <small>FIRST PERSON LOCATION</small>
          <h2>{scene.location}</h2>
          <p>{scene.description}</p>
        </div>
        <div className="hotspot-grid">
          {scene.availableActions.map((action, index) => (
            <button
              className={inspected.includes(action.actionId) ? "inspected" : ""}
              key={action.actionId}
              onClick={() => inspect(action)}
            >
              <b>0{index + 1}</b>
              <span>{action.label}</span>
              <small>{action.risk}风险</small>
            </button>
          ))}
        </div>
      </div>
      <div className="location-result-list">
        {scene.availableActions
          .filter((action) => inspected.includes(action.actionId))
          .map((action) => (
            <p key={action.actionId}>
              <span>调查记录</span>
              {action.description}
            </p>
          ))}
      </div>
      <AudioManager label={scene.ambientSfxPrompt.split("，")[0]} prompt={scene.ambientSfxPrompt} />
      <div className="scene-choice-grid compact">
        {scene.playerChoices.map((choice) => (
          <button key={choice.choiceId} onClick={() => onChoice(choice)}>
            <strong>{choice.text}</strong>
            <span>{choice.consequence}</span>
          </button>
        ))}
      </div>
    </section>
  );
}
