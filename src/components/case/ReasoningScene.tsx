import type { CaseClue, CaseScene, ReasoningOption } from "../../data/cases";

type ReasoningSceneProps = {
  scene: CaseScene;
  clues: CaseClue[];
  foundClueIds: string[];
  flags: string[];
  onSubmit: (option: ReasoningOption) => void;
};

export function ReasoningScene({
  scene,
  clues,
  foundClueIds,
  flags,
  onSubmit,
}: ReasoningSceneProps) {
  const foundClues = clues.filter((clue) => foundClueIds.includes(clue.clueId));

  return (
    <section className="runner-scene reasoning-scene">
      <div className="reasoning-wall">
        {scene.imageSrc && (
          <img className="reasoning-scene-image" src={scene.imageSrc} alt="" />
        )}
        <header>
          <small>CONTRADICTION MAP</small>
          <h2>线索墙</h2>
          <p>{scene.description}</p>
        </header>
        <div className="reasoning-nodes">
          {foundClues.map((clue, index) => (
            <article className={`node-${index % 4}`} key={clue.clueId}>
              <span>{clue.index}</span>
              <strong>{clue.title}</strong>
              <small>{clue.relatedFactIds.join(" / ")}</small>
            </article>
          ))}
          <svg aria-hidden="true" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path d="M12 18 L50 50 L85 20 M50 50 L20 82 M50 50 L82 82" />
          </svg>
        </div>
      </div>
      <div className="reasoning-options">
        <small>提交你的判断</small>
        {scene.reasoningOptions?.map((option) => {
          const hasClues = (option.requiredClueIds ?? []).every((id) =>
            foundClueIds.includes(id),
          );
          const hasFlags = (option.requiredFlags ?? []).every((flag) => flags.includes(flag));
          const available = hasClues && hasFlags;
          return (
            <button
              className={available ? "" : "locked"}
              disabled={!available}
              key={option.optionId}
              onClick={() => onSubmit(option)}
            >
              <b>{option.label}</b>
              <span>{option.text}</span>
              <i>{available ? "提交" : "线索不足"}</i>
            </button>
          );
        })}
      </div>
    </section>
  );
}
