import { caseMeta, clues } from "../data/demoCase";
import type { InvestigationResult } from "./ChatInvestigation";
import { DatabaseGate } from "./DatabaseGate";

type CaseArchiveProps = {
  result: InvestigationResult;
  elapsedSeconds: number;
  foundClueIds: string[];
  onReplay: () => void;
};

function formatDuration(seconds: number) {
  const minutes = Math.floor(seconds / 60);
  const rest = seconds % 60;
  return `${String(minutes).padStart(2, "0")}:${String(rest).padStart(2, "0")}`;
}

export function CaseArchive({
  result,
  elapsedSeconds,
  foundClueIds,
  onReplay,
}: CaseArchiveProps) {
  const hiddenEnding = result.isTruth && result.repliedAnonymous;
  const rating = result.isTruth
    ? hiddenEnding
      ? "分析师"
      : "观察者"
    : "记录者";

  return (
    <main className="archive-page">
      <div className="archive-grid" aria-hidden="true" />
      <nav className="site-nav archive-nav">
        <span className="brand">
          <span className="brand-mark" />
          <span>暗线</span>
          <small>ANXIAN</small>
        </span>
        <span className="nav-status archived">
          <i />
          CASE ARCHIVED
        </span>
      </nav>

      <section className="archive-shell">
        <header className="archive-hero">
          <p className="eyebrow">INVESTIGATION COMPLETE</p>
          <span className="archive-stamp">已归档</span>
          <h1>{caseMeta.title}</h1>
          <p>{caseMeta.id} / 白港市旧港区异常事件记录</p>
        </header>

        <div className="archive-layout">
          <article className="case-file">
            <div className="file-binding" aria-hidden="true" />
            <header>
              <div>
                <small>CASE CONCLUSION</small>
                <h2>{result.isTruth ? "时间来源错位" : "系统故障待复核"}</h2>
              </div>
              <span className={result.isTruth ? "truth-seal" : "normal-seal"}>
                {result.isTruth ? "真相" : "存疑"}
              </span>
            </header>

            <p className="conclusion">
              {result.isTruth
                ? "监控、门禁与定位都未被伪造。它们记录了同一事件，却由不同步的信息层提前或延后写入。暗线捕捉到了尚未进入当前系统的数据片段。"
                : "现有记录被暂时归因为多系统时钟故障。案件已存档，但匿名消息的未来时间戳仍无法解释。"}
            </p>

            <div className="archive-metrics">
              <div>
                <small>调查用时</small>
                <strong>{formatDuration(elapsedSeconds)}</strong>
              </div>
              <div>
                <small>获得线索</small>
                <strong>
                  {foundClueIds.length}
                  <span> / {clues.length}</span>
                </strong>
              </div>
              <div>
                <small>推理评级</small>
                <strong>{rating}</strong>
              </div>
            </div>

            <div className="file-section">
              <small>你的判断</small>
              <p>“{result.conclusion}”</p>
            </div>

            <div className="file-section">
              <small>已解锁</small>
              <p>
                {result.isTruth
                  ? "白港市异常档案：信息错位现象 / 公开层访问资格"
                  : "白港市异常档案：雾灯公馆 / 后续复核标记"}
              </p>
            </div>

            {hiddenEnding && (
              <div className="hidden-message">
                <span>来自未知号码 · 02:31</span>
                <p>“欢迎接入暗线。你不是第一个看见它的人。”</p>
              </div>
            )}

            <button className="text-button" onClick={onReplay}>
              ↻ 重新调查本案
            </button>
            <a className="next-case-link" href="/demo/wh-0002">
              <span>下一案件 / WH-0002</span>
              <strong>不存在的第七码头柜 →</strong>
            </a>
          </article>

          <aside className="archive-side">
            <div className="rating-card">
              <small>OBSERVER PROFILE</small>
              <span className="rating-letter">{result.isTruth ? "A" : "C"}</span>
              <h3>{rating}</h3>
              <p>
                {result.isTruth
                  ? "你没有急着判断哪份记录是假的。你先问：它们是否来自同一个“现在”。"
                  : "你保存了异常，即使还没有完全理解它。记录本身也是一种抵抗。"}
              </p>
            </div>
            <DatabaseGate />
          </aside>
        </div>
      </section>
    </main>
  );
}
