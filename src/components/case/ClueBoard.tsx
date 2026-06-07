import type { CaseClue } from "../../data/cases";

type ClueBoardProps = {
  clues: CaseClue[];
  foundClueIds: string[];
  open: boolean;
  onToggle: () => void;
};

export function ClueBoard({ clues, foundClueIds, open, onToggle }: ClueBoardProps) {
  return (
    <aside className={`runner-clue-board ${open ? "is-open" : ""}`}>
      <button className="clue-board-toggle" onClick={onToggle}>
        <span>线索栏</span>
        <b>
          {foundClueIds.length}/{clues.length}
        </b>
      </button>
      <div className="runner-clue-list">
        {clues.map((clue) => {
          const found = foundClueIds.includes(clue.clueId);
          return (
            <article className={found ? "found" : ""} key={clue.clueId}>
              <span>{found ? clue.index : "—"}</span>
              <div>
                <strong>{found ? clue.title : "尚未发现"}</strong>
                <small>{found ? `${clue.type} / ${clue.source}` : "继续调查以解锁"}</small>
                {found && <p>{clue.surfaceMeaning}</p>}
              </div>
            </article>
          );
        })}
      </div>
    </aside>
  );
}
