import type { CaseChoice, CaseScene } from "../../data/cases";
import { AudioManager } from "./AudioManager";

type ChatSceneProps = {
  scene: CaseScene;
  onChoice: (choice: CaseChoice) => void;
};

const roleNames = {
  anonymous: "匿名",
  npc: "联系人",
  system: "系统",
  player: "你",
};

export function ChatScene({ scene, onChoice }: ChatSceneProps) {
  return (
    <section className="runner-scene chat-scene">
      <div className="phone-shell">
        <header className="phone-header">
          <span>23:46</span>
          <strong>{scene.sceneName}</strong>
          <span>LTE</span>
        </header>
        <div className="phone-messages">
          {scene.npcMessages.map((message) => (
            <div className={`phone-message ${message.role}`} key={message.messageId}>
              <div className="phone-sender">
                <strong>{message.sender}</strong>
                <span>{roleNames[message.role]} / {message.time}</span>
              </div>
              <p>{message.text}</p>
              {message.attachmentLabel && <button>{message.attachmentLabel} ↗</button>}
            </div>
          ))}
        </div>
      </div>
      <AudioManager label="深夜室内 / 手机震动" prompt={scene.ambientSfxPrompt} />
      <div className="scene-choice-grid">
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
