import { useEffect, useRef, useState } from "react";
import {
  caseMeta,
  reasoningOptions,
  scenes,
  type Choice,
  type Scene,
  type StatKey,
} from "../data/demoCase";

type TimelineItem =
  | { id: string; type: "scene"; scene: Scene }
  | { id: string; type: "player"; text: string }
  | { id: string; type: "notice"; text: string };

export type InvestigationResult = {
  conclusion: string;
  isTruth: boolean;
  repliedAnonymous: boolean;
};

type ChatInvestigationProps = {
  onClueFound: (id: string) => void;
  onStatChange: (stat: StatKey, amount: number) => void;
  onComplete: (result: InvestigationResult) => void;
};

const roleLabels = {
  anonymous: "匿名信号",
  system: "系统记录",
  property: "自动应答",
  darkline: "暗线节点",
};

export function ChatInvestigation({
  onClueFound,
  onStatChange,
  onComplete,
}: ChatInvestigationProps) {
  const [timeline, setTimeline] = useState<TimelineItem[]>([
    { id: "scene-message", type: "scene", scene: scenes.message },
  ]);
  const [currentSceneId, setCurrentSceneId] = useState("message");
  const [isAdvancing, setIsAdvancing] = useState(false);
  const [repliedAnonymous, setRepliedAnonymous] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);
  const currentScene = scenes[currentSceneId];
  const isReasoning = currentSceneId === "reasoning";

  useEffect(() => {
    onClueFound("anonymous-message");
  }, [onClueFound]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }, [timeline, currentSceneId]);

  const handleChoice = (choice: Choice) => {
    if (isAdvancing) return;
    setIsAdvancing(true);

    if (choice.effect?.stat && choice.effect.amount) {
      onStatChange(choice.effect.stat, choice.effect.amount);
    }
    if (choice.effect?.flag === "repliedAnonymous") {
      setRepliedAnonymous(true);
    }

    setTimeline((items) => [
      ...items,
      { id: `player-${choice.id}-${items.length}`, type: "player", text: choice.reply },
    ]);

    window.setTimeout(() => {
      if (choice.next === "reasoning") {
        setTimeline((items) => [
          ...items,
          {
            id: `notice-${items.length}`,
            type: "notice",
            text: "矛盾已达到推理阈值。请提交你的判断。",
          },
        ]);
        setCurrentSceneId("reasoning");
      } else {
        const nextScene = scenes[choice.next];
        setTimeline((items) => [
          ...items,
          { id: `scene-${nextScene.id}`, type: "scene", scene: nextScene },
        ]);
        setCurrentSceneId(nextScene.id);
        if (nextScene.clueId) onClueFound(nextScene.clueId);
      }
      setIsAdvancing(false);
    }, 420);
  };

  const submitReasoning = (id: string, text: string) => {
    const isTruth = id === "all-true";
    setTimeline((items) => [
      ...items,
      { id: "player-conclusion", type: "player", text: `我的判断：${text}` },
    ]);
    setIsAdvancing(true);
    window.setTimeout(
      () => onComplete({ conclusion: text, isTruth, repliedAnonymous }),
      650,
    );
  };

  return (
    <section className="chat-panel">
      <header className="case-header">
        <div className="case-title-row">
          <button
            className="back-mark"
            onClick={() => window.location.reload()}
            aria-label="返回首页"
          >
            AX
          </button>
          <div>
            <small>{caseMeta.id}</small>
            <h1>{caseMeta.title}</h1>
          </div>
        </div>
        <div className="case-location">
          <span className="live-dot" />
          <div>
            <strong>{caseMeta.status}</strong>
            <small>{caseMeta.location}</small>
          </div>
        </div>
      </header>

      <div className="chat-scroll">
        <div className="case-opening">
          <span>CASE OPENED</span>
          <p>你在本地社区监控页看见一段异常回放。与此同时，陌生消息抵达。</p>
        </div>

        {timeline.map((item) => {
          if (item.type === "player") {
            return (
              <div className="message-row is-player" key={item.id}>
                <div className="message-bubble player-bubble">{item.text}</div>
                <span className="message-avatar player-avatar">你</span>
              </div>
            );
          }

          if (item.type === "notice") {
            return (
              <div className="system-notice" key={item.id}>
                <span />
                {item.text}
                <span />
              </div>
            );
          }

          const { scene } = item;
          return (
            <div className="message-row" key={item.id}>
              <span className={`message-avatar ${scene.role}`}>
                {scene.role === "anonymous" ? "?" : scene.role === "property" ? "物" : "系"}
              </span>
              <div className="message-content">
                <div className="sender-line">
                  <strong>{scene.sender}</strong>
                  <span>{roleLabels[scene.role]}</span>
                  <time>{scene.time}</time>
                </div>
                <div className="message-bubble">
                  <p>{scene.content}</p>
                  {scene.detail && <small>{scene.detail}</small>}
                  {scene.clueId && (
                    <span className="evidence-tag">+ 线索已记录</span>
                  )}
                </div>
              </div>
            </div>
          );
        })}

        {isAdvancing && (
          <div className="typing-row">
            <i />
            <i />
            <i />
          </div>
        )}
        <div ref={endRef} />
      </div>

      <footer className="choice-area">
        <div className="choice-label">
          <span>{isReasoning ? "提交结论" : "选择你的行动"}</span>
          <small>{isReasoning ? "四份记录，只有一种解释能同时成立" : "每次选择都会留下调查痕迹"}</small>
        </div>
        <div className={`choice-list ${isReasoning ? "reasoning-list" : ""}`}>
          {isReasoning
            ? reasoningOptions.map((option) => (
                <button
                  key={option.id}
                  disabled={isAdvancing}
                  onClick={() => submitReasoning(option.id, option.text)}
                >
                  <b>{option.label}</b>
                  <span>{option.text}</span>
                  <i>选择</i>
                </button>
              ))
            : currentScene?.choices.map((choice, index) => (
                <button
                  key={choice.id}
                  disabled={isAdvancing}
                  onClick={() => handleChoice(choice)}
                >
                  <b>0{index + 1}</b>
                  <span>{choice.text}</span>
                  <i>→</i>
                </button>
              ))}
        </div>
      </footer>
    </section>
  );
}
