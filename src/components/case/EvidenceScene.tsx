import { useState } from "react";
import type { CaseChoice, CaseScene, EvidenceDisplay } from "../../data/cases";
import { AudioManager } from "./AudioManager";

type EvidenceSceneProps = {
  scene: CaseScene;
  onEvidence: (evidence: EvidenceDisplay) => void;
  onChoice: (choice: CaseChoice) => void;
};

export function EvidenceScene({ scene, onEvidence, onChoice }: EvidenceSceneProps) {
  const [selected, setSelected] = useState<EvidenceDisplay | null>(null);

  const openEvidence = (evidence: EvidenceDisplay) => {
    setSelected(evidence);
    onEvidence(evidence);
  };

  return (
    <section className="runner-scene evidence-scene">
      <div className="evidence-grid">
        {scene.evidenceItems.map((evidence) => (
          <button
            className={`evidence-card evidence-${evidence.format}`}
            key={evidence.evidenceId}
            onClick={() => openEvidence(evidence)}
          >
            <header>
              <span>{evidence.label}</span>
              <small>点击放大</small>
            </header>
            <div className="evidence-preview">
              {evidence.imageSrc ? (
                <img src={evidence.imageSrc} alt={evidence.title} />
              ) : (
                <b>{evidence.format === "audio" ? "▥" : evidence.format === "surveillance" ? "REC" : "07"}</b>
              )}
              {evidence.format === "audio" && <span className="large-wave" />}
            </div>
            <strong>{evidence.title}</strong>
            <p>{evidence.content}</p>
          </button>
        ))}
      </div>

      {selected && (
        <div className="evidence-modal" role="dialog" aria-modal="true">
          <div>
            <button className="modal-close" onClick={() => setSelected(null)} aria-label="关闭">
              ×
            </button>
            <small>{selected.label} / EVIDENCE LOCKED</small>
            <h2>{selected.title}</h2>
            <div className="modal-evidence-visual">
              {selected.imageSrc ? (
                <img src={selected.imageSrc} alt={selected.title} />
              ) : (
                <>
                  <span>{selected.format.toUpperCase()}</span>
                  <b>{selected.format === "audio" ? "▥ ▥ ▥ ▥ ▥" : "放大区域已记录"}</b>
                </>
              )}
            </div>
            <p>{selected.content}</p>
            <strong>{selected.detail}</strong>
            {selected.voicePrompt && (
              <AudioManager label="语音证据可生成" prompt={selected.voicePrompt} kind="voice" />
            )}
          </div>
        </div>
      )}

      <AudioManager label="证据分析配乐" prompt={scene.bgmPrompt} kind="bgm" />
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
