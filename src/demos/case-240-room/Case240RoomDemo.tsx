import { useEffect, useMemo, useState } from "react";
import {
  case240Room,
  resolveRoom240Ending,
  type Room240Choice,
  type Room240Clue,
  type Room240Ending,
  type Room240Evidence,
  type Room240Scene,
} from "../../data/cases/case-240-room";
import { case240RoomImagesById } from "../../data/cases/case-240-room-images";
import { CaseImageWithDialogue } from "./CaseImageWithDialogue";
import "./case-240-room.css";

const sceneTypes = {
  chat: "手机通讯",
  search: "资料检索",
  call: "人物调查",
  location: "现场调查",
  evidence: "证据分析",
  reveal: "推理更新",
  ending: "案件结算",
};

const clampCompletion = (value: number) => Math.min(100, Math.max(0, value));

function matchesRequirements(
  item: {
    requiresClueIds?: string[];
    excludesClueIds?: string[];
    requiresVisitedSceneIds?: string[];
  },
  clueIds: string[],
  visitedSceneIds: string[],
) {
  const hasRequiredClues = (item.requiresClueIds ?? []).every((id) => clueIds.includes(id));
  const hasExcludedClues = (item.excludesClueIds ?? []).some((id) => clueIds.includes(id));
  const hasVisitedScenes = (item.requiresVisitedSceneIds ?? []).every((id) =>
    visitedSceneIds.includes(id),
  );
  return hasRequiredClues && !hasExcludedClues && hasVisitedScenes;
}

function EvidenceCard({
  clue,
  onOpen,
  onPlay,
  playing,
}: {
  clue: Room240Clue;
  onOpen: (evidence: Room240Evidence) => void;
  onPlay: (clueId: string) => void;
  playing: boolean;
}) {
  const evidence = clue.evidence;
  if (!evidence) return null;

  if (evidence.kind === "audio") {
    return (
      <article className="r240-evidence-card r240-audio-card">
        <div className="r240-audio-head">
          <span className={playing ? "is-playing" : ""}>AUDIO</span>
          <strong>{evidence.duration}</strong>
        </div>
        <div className="r240-wave" aria-hidden="true">
          {Array.from({ length: 24 }, (_, index) => <i key={index} />)}
        </div>
        <h3>{evidence.title}</h3>
        <p className="r240-transcript">“{evidence.transcript}”</p>
        <dl>
          <div><dt>背景音</dt><dd>{evidence.backgroundSound}</dd></div>
          <div><dt>来源</dt><dd>{clue.source}</dd></div>
        </dl>
        <button className="r240-media-button" onClick={() => onPlay(clue.id)}>
          {playing ? "正在播放模拟音频…" : "播放"}
        </button>
      </article>
    );
  }

  return (
    <article className={`r240-evidence-card r240-${evidence.kind}-card`}>
      <div className="r240-placeholder-visual" aria-hidden="true">
        <span>{evidence.kind === "image" ? "IMAGE EVIDENCE" : "ARCHIVE DOCUMENT"}</span>
        <b>{clue.id}</b>
        <div className="r240-placeholder-mark">{evidence.kind === "image" ? "24F" : "WH"}</div>
      </div>
      <div className="r240-evidence-copy">
        <small>{clue.type} / {clue.id}</small>
        <h3>{evidence.title}</h3>
        <dl>
          <div><dt>时间</dt><dd>{evidence.timestamp}</dd></div>
          <div><dt>地点</dt><dd>{evidence.location}</dd></div>
        </dl>
        <p>{evidence.description}</p>
        <button className="r240-media-button" onClick={() => onOpen(evidence)}>
          放大查看
        </button>
      </div>
    </article>
  );
}

function getInitialState(initialScene: Room240Scene) {
  return {
    clueIds: [...(initialScene.gainedClueIds ?? [])],
    truth: clampCompletion(initialScene.truthReward ?? 0),
    hiddenTruth: clampCompletion(initialScene.hiddenTruthReward ?? 0),
    contradictions: initialScene.contradiction ? [initialScene.contradiction.id] : [],
  };
}

export function Case240RoomDemo() {
  const { caseMeta, clues, scenes, reasoningHints } = case240Room;
  const initialScene = scenes[0];
  const initialState = getInitialState(initialScene);
  const [sceneId, setSceneId] = useState(initialScene.id);
  const [collectedClueIds, setCollectedClueIds] = useState<string[]>(initialState.clueIds);
  const [truthCompletion, setTruthCompletion] = useState(initialState.truth);
  const [hiddenTruthCompletion, setHiddenTruthCompletion] = useState(initialState.hiddenTruth);
  const [contradictions, setContradictions] = useState<string[]>(initialState.contradictions);
  const [visitedSceneIds, setVisitedSceneIds] = useState<string[]>([initialScene.id]);
  const [unlockedArchiveIds, setUnlockedArchiveIds] = useState<string[]>([]);
  const [contacts, setContacts] = useState<string[]>([]);
  const [flags, setFlags] = useState<string[]>([]);
  const [noticeQueue, setNoticeQueue] = useState<string[]>(initialState.clueIds);
  const [choiceResult, setChoiceResult] = useState("");
  const [cluePanelOpen, setCluePanelOpen] = useState(false);
  const [selectedClue, setSelectedClue] = useState<Room240Clue | null>(null);
  const [selectedEvidence, setSelectedEvidence] = useState<Room240Evidence | null>(null);
  const [playingClueId, setPlayingClueId] = useState<string | null>(null);
  const [ending, setEnding] = useState<Room240Ending | null>(null);
  const [lastProgressGain, setLastProgressGain] = useState({ truth: initialState.truth, hidden: initialState.hiddenTruth });
  const [session, setSession] = useState(0);

  const scene = useMemo(
    () => scenes.find((item) => item.id === sceneId) ?? initialScene,
    [initialScene, sceneId, scenes],
  );
  const visibleEvidence = (scene.evidenceClueIds ?? [])
    .map((id) => clues.find((clue) => clue.id === id))
    .filter((clue): clue is Room240Clue => Boolean(clue?.evidence));
  const sceneImages = (scene.imageIds ?? [])
    .map((imageId) => case240RoomImagesById[imageId])
    .filter(Boolean);
  const currentNoticeId = noticeQueue[0];
  const currentNotice = clues.find((clue) => clue.id === currentNoticeId);
  const isEnding = scene.uiType === "ending";
  const criticalClueCount = clues.filter(
    (clue) => clue.critical && collectedClueIds.includes(clue.id),
  ).length;
  const reasoningHint =
    reasoningHints.find((hint) => truthCompletion >= hint.minTruth)?.text ??
    reasoningHints[reasoningHints.length - 1].text;
  const visibleChoices = scene.choices.filter((item) =>
    matchesRequirements(item, collectedClueIds, visitedSceneIds),
  );
  const conditionalParagraphs = (scene.conditionalParagraphs ?? [])
    .filter((item) => matchesRequirements(item, collectedClueIds, visitedSceneIds))
    .map((item) => item.text);

  useEffect(() => {
    document.title = `${caseMeta.title}｜暗线 ANXIAN`;
    const meta = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    meta?.setAttribute(
      "content",
      "《暗线》案件图 Demo：通过多条调查路径破解白塔公寓240号房与数据地址24-0。",
    );
  }, [caseMeta.title]);

  useEffect(() => {
    if (!playingClueId) return;
    const timer = window.setTimeout(() => setPlayingClueId(null), 2200);
    return () => window.clearTimeout(timer);
  }, [playingClueId]);

  const enterScene = (nextSceneId: string) => {
    const nextScene = scenes.find((item) => item.id === nextSceneId);
    if (!nextScene) return;

    const firstVisit = !visitedSceneIds.includes(nextScene.id);
    const conditionalClueIds = (nextScene.conditionalGainedClues ?? [])
      .filter((item) => matchesRequirements(item, collectedClueIds, visitedSceneIds))
      .map((item) => item.clueId);
    const newClueIds = firstVisit
      ? [...(nextScene.gainedClueIds ?? []), ...conditionalClueIds].filter(
          (id) => !collectedClueIds.includes(id),
        )
      : [];
    const nextClueIds = [...new Set([...collectedClueIds, ...newClueIds])];
    const truthGain = firstVisit ? nextScene.truthReward ?? 0 : 0;
    const hiddenGain = firstVisit ? nextScene.hiddenTruthReward ?? 0 : 0;
    const nextTruth = clampCompletion(truthCompletion + truthGain);
    const nextHiddenTruth = clampCompletion(hiddenTruthCompletion + hiddenGain);
    const nextCriticalClueCount = clues.filter(
      (clue) => clue.critical && nextClueIds.includes(clue.id),
    ).length;

    if (firstVisit) {
      setVisitedSceneIds((current) => [...current, nextScene.id]);
      setCollectedClueIds(nextClueIds);
      setNoticeQueue((current) => [...current, ...newClueIds]);
      setTruthCompletion(nextTruth);
      setHiddenTruthCompletion(nextHiddenTruth);
      setLastProgressGain({ truth: truthGain, hidden: hiddenGain });
      if (nextScene.contradiction) {
        setContradictions((current) =>
          current.includes(nextScene.contradiction!.id)
            ? current
            : [...current, nextScene.contradiction!.id],
        );
      }
    } else {
      setLastProgressGain({ truth: 0, hidden: 0 });
    }

    if (nextScene.uiType === "ending") {
      const resolvedEnding = resolveRoom240Ending(
        nextTruth,
        nextHiddenTruth,
        nextCriticalClueCount,
        nextScene.endingCap,
      );
      setEnding(resolvedEnding);
      setUnlockedArchiveIds(resolvedEnding.archiveIds);
      setContacts(resolvedEnding.contacts);
    }

    setSceneId(nextScene.id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const advance = (selectedChoice: Room240Choice) => {
    setChoiceResult(selectedChoice.result);
    setFlags((current) => [...new Set([...current, ...(selectedChoice.addFlags ?? [])])]);
    window.setTimeout(() => {
      enterScene(selectedChoice.nextSceneId);
      setChoiceResult("");
    }, 320);
  };

  const restart = () => {
    const resetState = getInitialState(initialScene);
    setSceneId(initialScene.id);
    setCollectedClueIds(resetState.clueIds);
    setTruthCompletion(resetState.truth);
    setHiddenTruthCompletion(resetState.hiddenTruth);
    setContradictions(resetState.contradictions);
    setVisitedSceneIds([initialScene.id]);
    setUnlockedArchiveIds([]);
    setContacts([]);
    setFlags([]);
    setNoticeQueue(resetState.clueIds);
    setChoiceResult("");
    setCluePanelOpen(false);
    setSelectedClue(null);
    setSelectedEvidence(null);
    setPlayingClueId(null);
    setEnding(null);
    setLastProgressGain({ truth: resetState.truth, hidden: resetState.hiddenTruth });
    setSession((value) => value + 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <main className="r240-page" key={session}>
      <div className="r240-grid" aria-hidden="true" />
      <header className="r240-header">
        <a className="r240-brand" href="/">
          <span className="r240-brand-mark">A</span>
          <span><b>暗线</b><small>ANXIAN NETWORK</small></span>
        </a>
        <div className="r240-case-title">
          <small>{caseMeta.caseId} / {caseMeta.level}级</small>
          <strong>{caseMeta.title}</strong>
        </div>
        <button className="r240-clue-toggle" onClick={() => setCluePanelOpen(true)}>
          线索 <b>{collectedClueIds.length}/{clues.length}</b>
        </button>
      </header>

      <section className="r240-status">
        <div>
          <small>当前时间</small>
          <strong>{scene.time}</strong>
        </div>
        <div>
          <small>当前地点</small>
          <strong>{scene.location}</strong>
        </div>
        <div className="r240-progress-stat">
          <small>真相完成度 <b>{truthCompletion}%</b></small>
          <span><i style={{ width: `${truthCompletion}%` }} /></span>
        </div>
        <div className="r240-progress-stat hidden">
          <small>隐藏真相 <b>{hiddenTruthCompletion}%</b></small>
          <span><i style={{ width: `${hiddenTruthCompletion}%` }} /></span>
        </div>
      </section>

      <div className="r240-layout">
        <section className="r240-main">
          <div className="r240-scene-heading">
            <div>
              <span>{sceneTypes[scene.uiType]} / {scene.chapter}</span>
              <h1>{scene.title}</h1>
            </div>
            <small>{scene.id}<br />{scene.kicker}</small>
          </div>

          {(lastProgressGain.truth > 0 || lastProgressGain.hidden > 0) && (
            <div className="r240-progress-gain">
              <span>调查推进</span>
              {lastProgressGain.truth > 0 && <b>真相 +{lastProgressGain.truth}</b>}
              {lastProgressGain.hidden > 0 && <b>隐藏真相 +{lastProgressGain.hidden}</b>}
            </div>
          )}

          {sceneImages.length > 0 && (
            <section className="r240-scene-images" aria-label="场景照片">
              {sceneImages.map((image) => (
                <CaseImageWithDialogue image={image} key={image.imageId} />
              ))}
            </section>
          )}

          <article className={`r240-scene-card r240-scene-${scene.uiType}`}>
            {scene.uiType === "location" && (
              <div className="r240-location-visual" aria-hidden="true">
                <div className="r240-corridor-lines" />
                <span>24F</span>
                <b>2401&nbsp;&nbsp;2402&nbsp;&nbsp;2403&nbsp;&nbsp;2404</b>
                <small>NO ROOM 240</small>
              </div>
            )}

            {scene.messages && (
              <div className="r240-phone">
                <header><span>{scene.time}</span><strong>{scene.title}</strong><span>•••</span></header>
                <div>
                  {scene.messages.map((message, index) => (
                    <div className={`r240-message ${message.role}`} key={`${message.sender}-${index}`}>
                      <small>{message.sender} {message.meta && `· ${message.meta}`}</small>
                      <p className={message.withdrawn ? "withdrawn" : ""}>{message.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="r240-narrative">
              {[...scene.paragraphs, ...conditionalParagraphs].map((paragraph, index) => (
                <p key={`${scene.id}-${index}`}>{paragraph}</p>
              ))}
            </div>

            {scene.recordLines && (
              <div className="r240-record">
                <header><span>RECORD VIEWER</span><small>LOCAL CACHE / READ ONLY</small></header>
                {scene.recordLines.map((line, index) => (
                  <div key={line}><b>{String(index + 1).padStart(2, "0")}</b><span>{line}</span></div>
                ))}
              </div>
            )}

            {scene.contradiction && (
              <div className="r240-contradiction">
                <span>发现矛盾</span>
                <strong>{scene.contradiction.text}</strong>
              </div>
            )}

            {scene.reveal && (
              <div className="r240-reveal">
                <small>REASONING UPDATE</small>
                <strong>{scene.reveal}</strong>
              </div>
            )}
          </article>

          {visibleEvidence.length > 0 && (
            <section className="r240-evidence-section">
              <div className="r240-section-label">
                <span>证据附件</span>
                <small>图片与语音均为本地模拟证据</small>
              </div>
              <div className="r240-evidence-list">
                {visibleEvidence.map((clue) => (
                  <EvidenceCard
                    clue={clue}
                    key={clue.id}
                    onOpen={setSelectedEvidence}
                    onPlay={setPlayingClueId}
                    playing={playingClueId === clue.id}
                  />
                ))}
              </div>
            </section>
          )}

          {!isEnding && (
            <section className="r240-choices">
              <div className="r240-section-label">
                <span>你的行动</span>
                <small>案件图节点 {visitedSceneIds.length}/{scenes.length}</small>
              </div>
              <div className="r240-choice-grid">
                {visibleChoices.map((item, index) => (
                  <button key={item.id} onClick={() => advance(item)} disabled={Boolean(choiceResult)}>
                    <b>{String.fromCharCode(65 + index)}</b>
                    <span>{item.label}</span>
                    <i>继续</i>
                  </button>
                ))}
              </div>
              {choiceResult && <p className="r240-choice-result">{choiceResult}</p>}
            </section>
          )}

          {isEnding && ending && (
            <section className="r240-ending-card">
              <div className="r240-rank">
                <small>调查评级</small>
                <strong>{ending.rank}</strong>
              </div>
              <div className="r240-ending-copy">
                <small>CASE ARCHIVED / {caseMeta.archiveId}</small>
                <h2>{ending.title}</h2>
                <p>{ending.conclusion}</p>
                <div className="r240-final-scores">
                  <span>真相完成度 <b>{truthCompletion}%</b></span>
                  <span>隐藏真相完成度 <b>{hiddenTruthCompletion}%</b></span>
                  <span>关键线索 <b>{criticalClueCount}</b></span>
                  <span>发现矛盾 <b>{contradictions.length}</b></span>
                </div>
                <div className="r240-ending-unlocks">
                  {ending.unlocks.map((unlock) => (
                    <div className="r240-unlock" key={unlock}>
                      <span>调查解锁</span>
                      <strong>{unlock}</strong>
                      <small>已记录</small>
                    </div>
                  ))}
                </div>
                <div className="r240-ending-actions">
                  <button onClick={() => setCluePanelOpen(true)}>返回线索档案</button>
                  <button onClick={restart}>重新开始</button>
                  <a href="/">返回暗线首页</a>
                </div>
              </div>
            </section>
          )}
        </section>

        <aside className="r240-sidebar">
          <div className="r240-side-block">
            <small>CASE GRAPH</small>
            <strong>{isEnding ? "调查已归档" : caseMeta.status}</strong>
            <p>已访问 {visitedSceneIds.length} 个节点 / {flags.length} 个路径标记</p>
          </div>
          <div className="r240-side-block r240-reasoning-hint">
            <small>当前推理</small>
            <p>{reasoningHint}</p>
          </div>
          <div className="r240-side-block">
            <small>矛盾记录</small>
            <strong>{contradictions.length}</strong>
            <p>{contradictions.length > 0 ? "证词、记录或空间格式出现不可同时成立的信息。" : "尚未形成可提交的矛盾。"}</p>
          </div>
          <div className="r240-mini-clues">
            <header><span>最近线索</span><b>{collectedClueIds.length}</b></header>
            {clues.filter((clue) => collectedClueIds.includes(clue.id)).slice(-4).reverse().map((clue) => (
              <button key={clue.id} onClick={() => setSelectedClue(clue)}>
                <span>{clue.id.replace("CLUE_", "")}</span>
                <div><strong>{clue.title}</strong><small>{clue.type}</small></div>
              </button>
            ))}
            {collectedClueIds.length === 0 && <p>调查后获得的证据会自动进入档案。</p>}
          </div>
          {isEnding && (
            <div className="r240-side-block">
              <small>长期解锁</small>
              <p>档案：{unlockedArchiveIds.join(" / ") || "无"}</p>
              <p>联系人：{contacts.join(" / ") || "无"}</p>
            </div>
          )}
        </aside>
      </div>

      {cluePanelOpen && (
        <div className="r240-overlay" role="dialog" aria-modal="true">
          <section className="r240-clue-panel">
            <header>
              <div><small>INVESTIGATION ARCHIVE</small><h2>线索档案</h2></div>
              <button onClick={() => setCluePanelOpen(false)} aria-label="关闭">×</button>
            </header>
            <div className="r240-archive-summary">
              <span>真相 {truthCompletion}%</span>
              <span>隐藏真相 {hiddenTruthCompletion}%</span>
              <span>矛盾 {contradictions.length}</span>
              <span>关键线索 {criticalClueCount}</span>
            </div>
            <div className="r240-all-clues">
              {clues.map((clue) => {
                const found = collectedClueIds.includes(clue.id);
                return (
                  <button
                    className={found ? "found" : ""}
                    disabled={!found}
                    key={clue.id}
                    onClick={() => setSelectedClue(clue)}
                  >
                    <span>{clue.id}</span>
                    <strong>{found ? clue.title : "尚未发现"}</strong>
                    <small>{found ? `${clue.type} / ${clue.source}` : "其他调查路径可解锁"}</small>
                  </button>
                );
              })}
            </div>
          </section>
        </div>
      )}

      {selectedClue && (
        <div className="r240-overlay r240-detail-overlay" role="dialog" aria-modal="true">
          <article className="r240-clue-detail">
            <button className="r240-close" onClick={() => setSelectedClue(null)} aria-label="关闭">×</button>
            <small>{selectedClue.id} / {selectedClue.type}</small>
            <h2>{selectedClue.title}</h2>
            <p>{selectedClue.content}</p>
            <dl>
              <div><dt>来源</dt><dd>{selectedClue.source}</dd></div>
              <div><dt>重要度</dt><dd>{selectedClue.importance}</dd></div>
              <div><dt>可信度</dt><dd>{selectedClue.credibility}</dd></div>
              <div><dt>关联事实</dt><dd>{selectedClue.relatedFacts.join(" / ")}</dd></div>
            </dl>
          </article>
        </div>
      )}

      {selectedEvidence && (
        <div className="r240-overlay r240-detail-overlay" role="dialog" aria-modal="true">
          <article className="r240-evidence-detail">
            <button className="r240-close" onClick={() => setSelectedEvidence(null)} aria-label="关闭">×</button>
            <div className="r240-enlarged-placeholder">
              <span>{selectedEvidence.kind === "image" ? "IMAGE PLACEHOLDER" : "DOCUMENT SCAN"}</span>
              <b>24-0</b>
              <i />
            </div>
            <small>{selectedEvidence.timestamp} / {selectedEvidence.location}</small>
            <h2>{selectedEvidence.title}</h2>
            <p>{selectedEvidence.description}</p>
          </article>
        </div>
      )}

      {currentNotice && (
        <div className="r240-clue-toast" role="status">
          <span>获得线索</span>
          <div><small>{currentNotice.id} / {currentNotice.type}</small><strong>{currentNotice.title}</strong></div>
          <button onClick={() => setNoticeQueue((queue) => queue.slice(1))}>收录</button>
        </div>
      )}
    </main>
  );
}
