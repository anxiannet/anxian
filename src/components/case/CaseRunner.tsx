import { useMemo, useState } from "react";
import type {
  CaseAction,
  CaseChoice,
  CaseData,
  CaseEndingId,
  EvidenceDisplay,
  ReasoningOption,
} from "../../data/cases";
import { ClueBoard } from "./ClueBoard";
import { SceneRenderer } from "./SceneRenderer";

type CaseRunnerProps = {
  caseData: CaseData;
};

export function CaseRunner({ caseData }: CaseRunnerProps) {
  const [sceneId, setSceneId] = useState(caseData.initialSceneId);
  const [foundClueIds, setFoundClueIds] = useState<string[]>([]);
  const [flags, setFlags] = useState<string[]>([]);
  const [endingId, setEndingId] = useState<CaseEndingId | null>(null);
  const [clueBoardOpen, setClueBoardOpen] = useState(false);
  const [session, setSession] = useState(0);

  const scene = useMemo(
    () => caseData.scenes.find((item) => item.sceneId === sceneId) ?? caseData.scenes[0],
    [caseData.scenes, sceneId],
  );
  const ending = endingId ? caseData.endings[endingId] : null;

  const addClues = (ids: string[] = []) => {
    setFoundClueIds((current) => [...new Set([...current, ...ids])]);
  };

  const addFlags = (items: string[] = []) => {
    setFlags((current) => [...new Set([...current, ...items])]);
  };

  const moveTo = (nextSceneId?: string) => {
    if (!nextSceneId) return;
    setSceneId(nextSceneId);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleAction = (action: CaseAction) => {
    addClues(action.clueIds);
    addFlags(action.addFlags);
    moveTo(action.nextSceneId);
  };

  const handleChoice = (choice: CaseChoice) => {
    addClues(choice.clueIds);
    addFlags(choice.addFlags);
    moveTo(choice.nextSceneId);
  };

  const handleEvidence = (evidence: EvidenceDisplay) => {
    addClues(evidence.clueIds);
  };

  const handleReasoning = (option: ReasoningOption) => {
    setEndingId(option.endingId);
    setSceneId("S08");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const replay = () => {
    setSceneId(caseData.initialSceneId);
    setFoundClueIds([]);
    setFlags([]);
    setEndingId(null);
    setSession((value) => value + 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <main className="case-runner" key={session}>
      <div className="runner-grid" aria-hidden="true" />
      <header className="runner-header">
        <a className="runner-brand" href="/">
          <span className="brand-mark" />
          <strong>暗线</strong>
          <small>ANXIAN</small>
        </a>
        <div className="runner-case-meta">
          <small>{caseData.meta.caseId} / {caseData.meta.level}级</small>
          <strong>{caseData.meta.title}</strong>
        </div>
        <span className="runner-progress">
          {String(scene.order).padStart(2, "0")} / {String(caseData.scenes.length).padStart(2, "0")}
        </span>
      </header>

      <section className="runner-intro">
        <div>
          <span>{scene.sceneType.toUpperCase()} / ACT {scene.act}</span>
          <h1>{scene.sceneName}</h1>
          <p>{scene.objective}</p>
        </div>
        <div className="runner-location">
          <small>{scene.time}</small>
          <strong>{scene.location}</strong>
        </div>
      </section>

      <div className="runner-layout">
        <div className="runner-stage">
          <SceneRenderer
            caseData={caseData}
            scene={scene}
            ending={ending}
            clues={caseData.clues}
            foundClueIds={foundClueIds}
            flags={flags}
            onAction={handleAction}
            onChoice={handleChoice}
            onEvidence={handleEvidence}
            onReasoning={handleReasoning}
            onReplay={replay}
          />
        </div>
        {scene.sceneType !== "archive" && (
          <ClueBoard
            clues={caseData.clues}
            foundClueIds={foundClueIds}
            open={clueBoardOpen}
            onToggle={() => setClueBoardOpen((open) => !open)}
          />
        )}
      </div>
    </main>
  );
}
