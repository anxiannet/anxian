import { useCallback, useMemo, useState } from "react";
import { CaseArchive } from "./components/CaseArchive";
import { ChatInvestigation, type InvestigationResult } from "./components/ChatInvestigation";
import { ClueBoard } from "./components/ClueBoard";
import { Hero } from "./components/Hero";
import { PlayerCard } from "./components/PlayerCard";
import type { StatKey } from "./data/demoCase";

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

function App() {
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

export default App;
