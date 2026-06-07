import type { CaseChoice, CaseEnding, CaseScene } from "../../data/cases";

type EndingSceneProps = {
  scene: CaseScene;
  ending: CaseEnding;
  onChoice: (choice: CaseChoice) => void;
};

export function EndingScene({ scene, ending, onChoice }: EndingSceneProps) {
  return (
    <section className={`runner-scene ending-scene ending-${ending.endingId}`}>
      {ending.imageSrc && (
        <img className="ending-scene-image" src={ending.imageSrc} alt={ending.title} />
      )}
      <div className="ending-mark">{ending.rank}</div>
      <small>{ending.subtitle}</small>
      <h2>{ending.title}</h2>
      <p>{ending.summary}</p>
      <div className="ending-file">
        <span>ARCHIVE CONCLUSION</span>
        <strong>{ending.archiveConclusion}</strong>
        <small>解锁：{ending.unlockedArchive}</small>
      </div>
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
