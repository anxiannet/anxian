import type {
  CaseAction,
  CaseChoice,
  CaseClue,
  CaseData,
  CaseEnding,
  CaseScene,
  EvidenceDisplay,
  ReasoningOption,
} from "../../data/cases";
import { ArchiveScene } from "./ArchiveScene";
import { ChatScene } from "./ChatScene";
import { EndingScene } from "./EndingScene";
import { EvidenceScene } from "./EvidenceScene";
import { LocationScene } from "./LocationScene";
import { ReasoningScene } from "./ReasoningScene";

type SceneRendererProps = {
  caseData: CaseData;
  scene: CaseScene;
  ending: CaseEnding | null;
  clues: CaseClue[];
  foundClueIds: string[];
  flags: string[];
  elapsedSeconds: number;
  onAction: (action: CaseAction) => void;
  onChoice: (choice: CaseChoice) => void;
  onEvidence: (evidence: EvidenceDisplay) => void;
  onReasoning: (option: ReasoningOption) => void;
  onReplay: () => void;
};

export function SceneRenderer(props: SceneRendererProps) {
  const { scene } = props;

  if (scene.sceneType === "chat") {
    return <ChatScene scene={scene} onChoice={props.onChoice} />;
  }
  if (scene.sceneType === "location") {
    return (
      <LocationScene
        scene={scene}
        onAction={props.onAction}
        onChoice={props.onChoice}
      />
    );
  }
  if (scene.sceneType === "evidence") {
    return (
      <EvidenceScene
        scene={scene}
        onEvidence={props.onEvidence}
        onChoice={props.onChoice}
      />
    );
  }
  if (scene.sceneType === "reasoning") {
    return (
      <ReasoningScene
        scene={scene}
        clues={props.clues}
        foundClueIds={props.foundClueIds}
        flags={props.flags}
        onSubmit={props.onReasoning}
      />
    );
  }
  if (scene.sceneType === "ending" && props.ending) {
    return <EndingScene scene={scene} ending={props.ending} onChoice={props.onChoice} />;
  }
  if (scene.sceneType === "archive" && props.ending) {
    return (
      <ArchiveScene
        caseData={props.caseData}
        scene={scene}
        ending={props.ending}
        foundClueIds={props.foundClueIds}
        elapsedSeconds={props.elapsedSeconds}
        onReplay={props.onReplay}
      />
    );
  }

  return null;
}
