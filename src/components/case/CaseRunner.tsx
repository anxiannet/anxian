import { useEffect, useMemo, useState } from "react";
import type {
  CaseAction,
  CaseChoice,
  CaseData,
  CaseEndingId,
  EvidenceDisplay,
  ReasoningOption,
} from "../../data/cases";
import { ClueBoard } from "./ClueBoard";
import { AudioToggle } from "./AudioToggle";
import { SceneRenderer } from "./SceneRenderer";

type CaseRunnerProps = {
  caseData: CaseData;
};

export function CaseRunner({ caseData }: CaseRunnerProps) {
  const usesCaseCover = caseData.meta.slug === "wh-0004";
  const [started, setStarted] = useState(!usesCaseCover);
  const [currentNodeId, setCurrentNodeId] = useState(caseData.initialSceneId);
  const [collectedClues, setCollectedClues] = useState<string[]>([]);
  const [flags, setFlags] = useState<string[]>([]);
  const [endingId, setEndingId] = useState<CaseEndingId | null>(null);
  const [clueBoardOpen, setClueBoardOpen] = useState(false);
  const [caseStartedAt, setCaseStartedAt] = useState<number | null>(
    usesCaseCover ? null : Date.now(),
  );
  const [caseFinishedAt, setCaseFinishedAt] = useState<number | null>(null);
  const [audioEnabled, setAudioEnabled] = useState(false);
  const [session, setSession] = useState(0);

  const scene = useMemo(
    () => caseData.scenes.find((item) => item.sceneId === currentNodeId) ?? caseData.scenes[0],
    [caseData.scenes, currentNodeId],
  );
  const ending = endingId ? caseData.endings[endingId] : null;
  const elapsedSeconds =
    caseStartedAt && caseFinishedAt
      ? Math.max(1, Math.round((caseFinishedAt - caseStartedAt) / 1000))
      : 0;
  const hasAskedWhoAreYou = flags.includes("asked_who_are_you");

  useEffect(() => {
    if (!caseData.seo) return;
    document.title = caseData.seo.title;
    const meta = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    meta?.setAttribute("content", caseData.seo.description);
  }, [caseData]);

  const addClues = (ids: string[] = []) => {
    setCollectedClues((current) => [...new Set([...current, ...ids])]);
  };

  const addFlags = (items: string[] = []) => {
    setFlags((current) => [...new Set([...current, ...items])]);
  };

  const moveTo = (nextSceneId?: string) => {
    if (!nextSceneId) return;
    setCurrentNodeId(nextSceneId);
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
    const resolvedEnding =
      option.endingId === "truth" && hasAskedWhoAreYou ? "hidden" : option.endingId;
    const endingScene = caseData.scenes.find((item) => item.sceneType === "ending");
    setEndingId(resolvedEnding);
    setCaseFinishedAt(Date.now());
    if (endingScene) setCurrentNodeId(endingScene.sceneId);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const startCase = () => {
    setStarted(true);
    setCaseStartedAt(Date.now());
    setAudioEnabled(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const replay = () => {
    setStarted(!usesCaseCover);
    setCurrentNodeId(caseData.initialSceneId);
    setCollectedClues([]);
    setFlags([]);
    setEndingId(null);
    setCaseStartedAt(usesCaseCover ? null : Date.now());
    setCaseFinishedAt(null);
    setAudioEnabled(false);
    setSession((value) => value + 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (!started) {
    return (
      <main className="case-cover" key={session}>
        <div className="runner-grid" aria-hidden="true" />
        <div
          className="case-cover-art"
          aria-hidden="true"
          style={
            caseData.assets.coverImageSrc
              ? { backgroundImage: `url(${caseData.assets.coverImageSrc})` }
              : undefined
          }
        >
          <span className="corridor-light" />
          <span className="door-number">404</span>
          <span className="takeaway-bag">外卖</span>
          <span className="phone-glow">23:41<br />有人认识 404 吗？</span>
        </div>
        <section className="case-cover-copy">
          <a className="runner-brand" href="/">
            <span className="brand-mark" />
            <strong>暗线</strong>
            <small>ANXIAN</small>
          </a>
          <p className="eyebrow">{caseData.meta.caseId} / WHITE HARBOR</p>
          <h1>{caseData.meta.title}</h1>
          <p className="case-cover-hook">{caseData.meta.hook}</p>
          <div className="case-cover-tags">
            {caseData.meta.tags.map((tag) => <span key={tag}>{tag}</span>)}
          </div>
          <button className="primary-button case-start-button" onClick={startCase}>
            开始调查
          </button>
          <small>无需登录 / {caseData.meta.duration} / 本地案件数据</small>
        </section>
      </main>
    );
  }

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
        <div className="runner-tools">
          <AudioToggle
            enabled={audioEnabled}
            onToggle={() => setAudioEnabled((value) => !value)}
          />
          <span className="runner-progress">
            {String(scene.order).padStart(2, "0")} / {String(caseData.scenes.length).padStart(2, "0")}
          </span>
        </div>
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
            foundClueIds={collectedClues}
            flags={flags}
            elapsedSeconds={elapsedSeconds}
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
            foundClueIds={collectedClues}
            open={clueBoardOpen}
            onToggle={() => setClueBoardOpen((open) => !open)}
          />
        )}
      </div>
    </main>
  );
}
