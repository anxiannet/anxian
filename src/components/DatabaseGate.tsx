import { useEffect, useState } from "react";
import { checkDatabaseAvailability } from "../lib/database";

type GateState = "checking" | "online" | "offline";

export function DatabaseGate() {
  const [state, setState] = useState<GateState>("checking");

  useEffect(() => {
    let active = true;
    checkDatabaseAvailability().then((isAvailable) => {
      if (active) setState(isAvailable ? "online" : "offline");
    });
    return () => {
      active = false;
    };
  }, []);

  return (
    <section className={`database-gate ${state}`}>
      <div className="gate-header">
        <span className="node-icon">
          <i />
          <i />
          <i />
        </span>
        <div>
          <small>NETWORK ACCESS</small>
          <h2>加入暗线网络</h2>
        </div>
      </div>

      {state === "checking" && (
        <div className="gate-checking">
          <span className="gate-spinner" />
          <p>正在检查最近的暗线节点……</p>
        </div>
      )}

      {state === "online" && (
        <div className="gate-result">
          <div className="connection-status">
            <i />
            暗线节点已连接
          </div>
          <p>当前节点可保存你的案件档案与后续调查进度。</p>
          <button
            className="primary-button"
            onClick={() => {
              window.location.href = "/register";
            }}
          >
            注册并保存档案
          </button>
        </div>
      )}

      {state === "offline" && (
        <div className="gate-result offline-result">
          <div className="connection-status">
            <i />
            当前节点暂不可用
          </div>
          <p>你可以先加入微信群获取测试资格。</p>
          <div className="qr-card">
            <div className="qr-frame">
              <img
                src="/images/wechat-group-qr.jpg"
                alt="暗线网络微信群二维码"
              />
            </div>
            <div>
              <small>WECHAT GROUP</small>
              <strong>群聊：暗线网络</strong>
              <p>二维码可能会过期，如无法加入，请等待后续开放注册。</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
