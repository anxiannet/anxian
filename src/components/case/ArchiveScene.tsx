import type { CaseData, CaseEnding, CaseScene } from "../../data/cases";
import { DatabaseGate } from "./DatabaseGate";

type ArchiveSceneProps = {
  caseData: CaseData;
  scene: CaseScene;
  ending: CaseEnding;
  foundClueIds: string[];
  onReplay: () => void;
};

export function ArchiveScene({
  caseData,
  ending,
  foundClueIds,
  onReplay,
}: ArchiveSceneProps) {
  const completion = Math.round((foundClueIds.length / caseData.clues.length) * 100);

  return (
    <section className="runner-scene runner-archive-scene">
      <article className="runner-archive-card">
        {caseData.assets.archiveImageSrc && (
          <img
            className="archive-scene-image"
            src={caseData.assets.archiveImageSrc}
            alt={`${caseData.meta.title} 档案证据`}
          />
        )}
        <header>
          <div>
            <small>CASE ARCHIVED / {caseData.archive.archiveId}</small>
            <h2>{caseData.meta.title}</h2>
            <p>{caseData.meta.location}</p>
          </div>
          <span>{ending.rank}</span>
        </header>
        <div className="archive-score-row">
          <div>
            <small>调查评级</small>
            <strong>{ending.rating}</strong>
          </div>
          <div>
            <small>发现线索</small>
            <strong>{foundClueIds.length}/{caseData.clues.length}</strong>
          </div>
          <div>
            <small>档案完成度</small>
            <strong>{completion}%</strong>
          </div>
        </div>
        <div className="archive-copy">
          <small>结案摘要</small>
          <p>{ending.archiveConclusion}</p>
          <small>调查员备注</small>
          <p>“{caseData.archive.investigatorNote}”</p>
          <small>下一案件钩子</small>
          <p className="next-hook">{caseData.archive.nextCaseHook}</p>
        </div>
        <div className="archive-actions">
          <button className="secondary-case-button" onClick={onReplay}>重新调查</button>
          <a className="primary-button" href="/">返回 WH-0001 首页</a>
        </div>
      </article>
      <DatabaseGate />
    </section>
  );
}
