import { useCallback, useMemo, useState } from "react";
import { CaseArchive } from "./components/CaseArchive";
import { ChatInvestigation, type InvestigationResult } from "./components/ChatInvestigation";
import { ClueBoard } from "./components/ClueBoard";
import { Hero } from "./components/Hero";
import { MobaDemo } from "./components/moba/MobaDemo";
import { PlayerCard } from "./components/PlayerCard";
import { CaseRunner } from "./components/case/CaseRunner";
import { getCaseBySlug } from "./data/cases";
import type { StatKey } from "./data/demoCase";
import { Case240RoomDemo } from "./demos/case-240-room/Case240RoomDemo";

type AppView = "landing" | "investigation" | "archive";

const statNames: StatKey[] = ["观察", "社交", "推理", "胆量", "运气"];

function createInitialStats(): Record<StatKey, number> {
  return statNames.reduce(
    (stats, name) => ({
      ...stats,
      [name]: Math.floor(Math.random() * 31) + 45,
    }),
    {} as Record<StatKey, number>,
  );
}

function RegisterPlaceholder() {
  return (
    <main className="register-placeholder">
      <span className="brand-mark" />
      <p>ANXIAN NETWORK</p>
      <h1>注册节点准备中</h1>
      <p>当前 Demo 暂不要求登录。你的案件档案仍保留在本次会话中。</p>
      <a className="primary-button" href="/">返回暗线</a>
    </main>
  );
}

function MainApp() {
  const caseMatch = window.location.pathname.match(/^\/(?:demo|cases)\/([^/]+)\/?$/);
  const routedCase = caseMatch ? getCaseBySlug(caseMatch[1].toLowerCase()) : undefined;
  const isMobaDemo = caseMatch?.[1].toLowerCase() === "moba-0001";
  const isCase240Room = caseMatch?.[1].toLowerCase() === "case-240-room";
  const [view, setView] = useState<AppView>("landing");
  const [stats, setStats] = useState(createInitialStats);
  const [foundClueIds, setFoundClueIds] = useState<string[]>([]);
  const [selectedClueId, setSelectedClueId] = useState<string | null>(null);
  const [startedAt, setStartedAt] = useState(Date.now());
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [result, setResult] = useState<InvestigationResult | null>(null);

  const startInvestigation = () => {
    setStartedAt(Date.now());
    setFoundClueIds([]);
    setSelectedClueId(null);
    setStats(createInitialStats());
    setResult(null);
    setView("investigation");
  };

  const handleClueFound = useCallback((id: string) => {
    setFoundClueIds((ids) => (ids.includes(id) ? ids : [...ids, id]));
  }, []);

  const handleStatChange = useCallback((stat: StatKey, amount: number) => {
    setStats((current) => ({
      ...current,
      [stat]: Math.min(100, current[stat] + amount),
    }));
  }, []);

  const handleComplete = (finalResult: InvestigationResult) => {
    setElapsedSeconds(Math.max(1, Math.round((Date.now() - startedAt) / 1000)));
    setResult(finalResult);
    setView("archive");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const investigationKey = useMemo(() => startedAt, [startedAt]);

  if (isCase240Room) {
    return <Case240RoomDemo />;
  }

  if (isMobaDemo) {
    return <MobaDemo />;
  }

  if (routedCase) {
    return <CaseRunner caseData={routedCase} />;
  }

  if (view === "landing") {
    return <Hero onStart={startInvestigation} />;
  }

  if (view === "archive" && result) {
    return (
      <CaseArchive
        elapsedSeconds={elapsedSeconds}
        foundClueIds={foundClueIds}
        onReplay={startInvestigation}
        result={result}
      />
    );
  }

  return (
    <main className="investigation-page">
      <div className="investigation-grid" aria-hidden="true" />
      <div className="investigation-shell">
        <aside className="left-rail">
          <div className="rail-brand">
            <span className="brand-mark" />
            <strong>暗线</strong>
            <small>ANXIAN</small>
          </div>
          <PlayerCard stats={stats} />
          <div className="rail-footer">
            <span>LOCAL SESSION</span>
            <small>所有进度仅保存在当前会话</small>
          </div>
        </aside>

        <ChatInvestigation
          key={investigationKey}
          onClueFound={handleClueFound}
          onComplete={handleComplete}
          onStatChange={handleStatChange}
        />

        <aside className="right-rail">
          <ClueBoard
            foundClueIds={foundClueIds}
            onSelectClue={(id) =>
              setSelectedClueId((current) => (current === id ? null : id))
            }
            selectedClueId={selectedClueId}
          />
        </aside>
      </div>
    </main>
  );
}

function App() {
  return window.location.pathname === "/register" ? <RegisterPlaceholder /> : <MainApp />;
}

export default App;
