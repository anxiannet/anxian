import { clues } from "../data/demoCase";

type ClueBoardProps = {
  foundClueIds: string[];
  onSelectClue: (id: string) => void;
  selectedClueId: string | null;
};

export function ClueBoard({
  foundClueIds,
  onSelectClue,
  selectedClueId,
}: ClueBoardProps) {
  const selectedClue = clues.find((clue) => clue.id === selectedClueId);

  return (
    <section className="clue-board">
      <header className="panel-heading">
        <div>
          <small>EVIDENCE</small>
          <h2>线索栏</h2>
        </div>
        <span>
          {foundClueIds.length}/{clues.length}
        </span>
      </header>

      <div className="clue-list">
        {clues.map((clue) => {
          const isFound = foundClueIds.includes(clue.id);
          return (
            <button
              className={`clue-item ${isFound ? "is-found" : ""}`}
              disabled={!isFound}
              key={clue.id}
              onClick={() => onSelectClue(clue.id)}
            >
              <span>{isFound ? clue.index : "—"}</span>
              <div>
                <strong>{isFound ? clue.title : "尚未发现"}</strong>
                <small>{isFound ? clue.type : "继续调查以解锁"}</small>
              </div>
              <i>{isFound ? "↗" : "·"}</i>
            </button>
          );
        })}
      </div>

      {selectedClue && (
        <div className="clue-detail" role="dialog" aria-label="线索详情">
          <button
            className="detail-close"
            onClick={() => onSelectClue(selectedClue.id)}
            aria-label="关闭线索详情"
          >
            ×
          </button>
          <small>
            {selectedClue.type} / {selectedClue.time}
          </small>
          <strong>{selectedClue.title}</strong>
          <p>{selectedClue.summary}</p>
        </div>
      )}
    </section>
  );
}
