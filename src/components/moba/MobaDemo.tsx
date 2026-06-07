import { useMemo, useState } from "react";
import "./moba.css";

type Phase = "lane" | "draft" | "loadout" | "route" | "match" | "result";
type Lane = "对抗路" | "中路" | "发育路" | "游走" | "打野";
type Stat = { gold: number; tempo: number; team: number; risk: number };
type Action = Stat & { name: string; desc: string; tag: string };
type Log = Action & { minute: number; event: string };

const lanes: { name: Lane; icon: string; desc: string }[] = [
  { name: "对抗路", icon: "战", desc: "抗压 · 单带 · 开团" },
  { name: "中路", icon: "法", desc: "清线 · 支援 · 控场" },
  { name: "发育路", icon: "射", desc: "发育 · 推塔 · 收割" },
  { name: "游走", icon: "辅", desc: "视野 · 保护 · 节奏" },
  { name: "打野", icon: "野", desc: "控图 · 反野 · 抓人" },
];

const heroes: Record<Lane, { name: string; title: string; trait: string; color: string }[]> = {
  对抗路: [
    { name: "姬小满", title: "武道奇才", trait: "灵活突进", color: "#d78252" },
    { name: "亚连", title: "追忆之刃", trait: "持续作战", color: "#6299c8" },
    { name: "孙策", title: "光明之海", trait: "强势开团", color: "#4c82ad" },
    { name: "花木兰", title: "传说之刃", trait: "沉默爆发", color: "#b75e70" },
  ],
  中路: [
    { name: "海月", title: "永夜之心", trait: "单点压制", color: "#806ac7" },
    { name: "上官婉儿", title: "惊鸿之笔", trait: "越塔爆发", color: "#bd6d4f" },
    { name: "王昭君", title: "冰雪之华", trait: "范围控制", color: "#58a5bc" },
    { name: "不知火舞", title: "明媚烈焰", trait: "游走消耗", color: "#cf554d" },
  ],
  发育路: [
    { name: "公孙离", title: "幻舞玲珑", trait: "灵动输出", color: "#ca7289" },
    { name: "孙尚香", title: "千金重弩", trait: "爆发收割", color: "#9d63b9" },
    { name: "敖隐", title: "凌霄真龙", trait: "全能射手", color: "#4a8da2" },
    { name: "狄仁杰", title: "断案大师", trait: "稳定压制", color: "#b78d4f" },
  ],
  游走: [
    { name: "大乔", title: "沧海之曜", trait: "战场调度", color: "#5695aa" },
    { name: "朵莉亚", title: "人鱼之歌", trait: "技能刷新", color: "#579abc" },
    { name: "张飞", title: "禁血狂兽", trait: "前排保护", color: "#b05c4a" },
    { name: "鬼谷子", title: "万物有灵", trait: "隐身开团", color: "#557c6d" },
  ],
  打野: [
    { name: "镜", title: "破镜之刃", trait: "高机动爆发", color: "#7082b4" },
    { name: "澜", title: "鲨之猎刃", trait: "收割推进", color: "#3c8093" },
    { name: "裴擒虎", title: "六合虎拳", trait: "前期入侵", color: "#b56545" },
    { name: "露娜", title: "月光之女", trait: "无限连击", color: "#7762ae" },
  ],
};

const teamPool = ["廉颇", "沈梦溪", "戈娅", "蔡文姬", "夏侯惇", "西施", "鲁班七号", "孙膑"];
const enemyPool = ["狂铁", "小乔", "马可波罗", "太乙真人", "铠", "弈星", "伽罗", "牛魔"];
const loadouts = [
  { name: "稳健发育", detail: "续航装 · 容错铭文", bonus: { gold: 60, tempo: 0, team: 2, risk: -2 } },
  { name: "极限爆发", detail: "穿透装 · 攻击铭文", bonus: { gold: 0, tempo: 5, team: 0, risk: 5 } },
  { name: "游走支援", detail: "移速装 · 功能铭文", bonus: { gold: -30, tempo: 2, team: 6, risk: 1 } },
];

const actionPool: Action[] = [
  { name: "抢2级", desc: "提前升二，寻找第一波压制", tag: "对线", gold: 90, tempo: 4, team: 0, risk: 2 },
  { name: "补刀", desc: "稳稳收下这波兵线", tag: "发育", gold: 150, tempo: 0, team: 0, risk: -2 },
  { name: "蹭兵线", desc: "共享队友兵线经济", tag: "资源", gold: 110, tempo: 1, team: -4, risk: 1 },
  { name: "等队友一起吃线", desc: "让资源转化更高效", tag: "协作", gold: 75, tempo: 0, team: 5, risk: -1 },
  { name: "打野", desc: "清理自家野区补充经济", tag: "资源", gold: 130, tempo: 1, team: -1, risk: -1 },
  { name: "反野", desc: "压缩敌方打野发育空间", tag: "入侵", gold: 145, tempo: 4, team: 1, risk: 5 },
  { name: "反红", desc: "集结入侵敌方红区", tag: "入侵", gold: 170, tempo: 5, team: 2, risk: 6 },
  { name: "反蓝", desc: "利用线权争夺蓝区", tag: "入侵", gold: 160, tempo: 5, team: 2, risk: 5 },
  { name: "打主宰", desc: "拿下先锋强化推进", tag: "远古生物", gold: 120, tempo: 8, team: 5, risk: 5 },
  { name: "开暴君", desc: "获得团队战斗增益", tag: "远古生物", gold: 140, tempo: 7, team: 5, risk: 4 },
  { name: "跟团", desc: "靠近队友形成局部多打少", tag: "团战", gold: 70, tempo: 5, team: 7, risk: 1 },
  { name: "单带", desc: "牵制边路，逼迫敌人回防", tag: "运营", gold: 145, tempo: 5, team: -1, risk: 5 },
  { name: "推塔", desc: "将兵线优势转化为防御塔", tag: "推进", gold: 180, tempo: 8, team: 3, risk: 3 },
  { name: "带兵线", desc: "处理边线，扩大地图空间", tag: "运营", gold: 125, tempo: 4, team: 1, risk: 1 },
  { name: "追击", desc: "继续追杀残血敌人", tag: "战斗", gold: 155, tempo: 5, team: 0, risk: 8 },
  { name: "撤退", desc: "放弃当前资源，保存状态", tag: "决策", gold: 15, tempo: -2, team: 2, risk: -7 },
  { name: "保队友", desc: "替核心吸收关键伤害", tag: "协作", gold: 35, tempo: 3, team: 9, risk: 3 },
  { name: "开团", desc: "抓住站位缺口率先发难", tag: "团战", gold: 90, tempo: 8, team: 6, risk: 7 },
  { name: "回城", desc: "补给状态并更新装备", tag: "决策", gold: 0, tempo: -1, team: 0, risk: -5 },
  { name: "嘲讽", desc: "亮个表情，尝试扰乱心态", tag: "心理", gold: 0, tempo: 1, team: -2, risk: 3 },
];

const events = [
  "河道之灵刷新，双方中野正在靠近",
  "敌方打野在上半区露头，边路形成机会",
  "我方射手被压在塔下，请求支援",
  "中路取得线权，暴君区域暂时无人",
  "敌方核心装备即将成型，正在抱团推进",
  "边路出现一大波兵线，主宰同时刷新",
  "队友先手命中两人，敌方后排站位靠前",
  "我方少人，敌人正在逼近高地",
  "敌方多人残血撤退，野区视野不明",
  "双方经济接近，下一波团战将决定节奏",
];

function shuffle<T>(items: T[]) {
  return [...items].sort(() => Math.random() - 0.5);
}

function getActions(minute: number) {
  let preferred: string[];
  if (minute <= 3) preferred = ["抢2级", "补刀", "反野", "等队友一起吃线", "打野", "嘲讽"];
  else if (minute <= 8) preferred = ["反红", "反蓝", "开暴君", "跟团", "推塔", "带兵线", "撤退", "保队友"];
  else if (minute <= 14) preferred = ["打主宰", "开暴君", "单带", "开团", "跟团", "带兵线", "追击", "回城"];
  else preferred = ["打主宰", "开团", "跟团", "单带", "推塔", "追击", "撤退", "保队友"];
  return shuffle(actionPool.filter((action) => preferred.includes(action.name))).slice(0, 4);
}

export function MobaDemo() {
  const [phase, setPhase] = useState<Phase>("lane");
  const [lane, setLane] = useState<Lane | null>(null);
  const [hero, setHero] = useState<(typeof heroes)[Lane][number] | null>(null);
  const [loadout, setLoadout] = useState<(typeof loadouts)[number] | null>(null);
  const [route, setRoute] = useState("中路河道");
  const [minute, setMinute] = useState(1);
  const [stats, setStats] = useState<Stat>({ gold: 300, tempo: 50, team: 50, risk: 0 });
  const [logs, setLogs] = useState<Log[]>([]);
  const [team] = useState(() => shuffle(teamPool).slice(0, 4));
  const [enemy] = useState(() => shuffle(enemyPool).slice(0, 5));
  const [visibleCount] = useState(() => 2 + Math.floor(Math.random() * 3));
  const [options, setOptions] = useState(() => getActions(1));
  const [event, setEvent] = useState(() => events[0]);

  const progress = { lane: 10, draft: 28, loadout: 44, route: 58, match: 72, result: 100 }[phase];
  const score = stats.tempo + stats.team * 0.7 + stats.gold / 80 - stats.risk * 0.45;
  const victory = score >= 92;
  const goldLead = Math.round(stats.gold - 300 - minute * 73 + stats.tempo * 7);
  const finalRating = Math.max(45, Math.min(100, Math.round(score)));
  const medal = finalRating >= 90 ? "金牌" : finalRating >= 78 ? "银牌" : finalRating >= 65 ? "铜牌" : "稳健";
  const laneTitle: Record<Lane, string> = {
    对抗路: stats.tempo >= 72 ? "边路战神" : `${medal}战士`,
    中路: stats.team >= 75 ? "节奏法王" : `${medal}中路`,
    发育路: stats.gold >= 1900 ? "输出核心" : `${medal}射手`,
    游走: stats.team >= 78 ? "金牌辅助" : `${medal}辅助`,
    打野: stats.tempo >= 76 ? "顶级打野" : `${medal}打野`,
  };
  const performanceTitle = lane ? laneTitle[lane] : "峡谷新星";
  const performanceTags = [
    stats.gold >= 1800 ? "经济机器" : "稳健发育",
    stats.team >= 75 ? "团队发动机" : stats.team < 45 ? "独狼打法" : "有效协作",
    stats.risk <= 12 ? "冷静决策" : stats.risk >= 22 ? "刀尖起舞" : "敢打敢拼",
  ];

  const selectLane = (value: Lane) => {
    setLane(value);
    setHero(null);
  };

  const startMatch = () => {
    const bonus = loadout?.bonus ?? loadouts[0].bonus;
    setStats({
      gold: 300 + bonus.gold,
      tempo: 50 + bonus.tempo,
      team: 50 + bonus.team,
      risk: bonus.risk,
    });
    setPhase("match");
  };

  const act = (action: Action) => {
    const variance = Math.floor(Math.random() * 61) - 20;
    const success = Math.random() > Math.min(0.42, Math.max(0.08, (action.risk + stats.risk) / 45));
    const multiplier = success ? 1 : -0.4;
    const resolved: Action = {
      ...action,
      gold: Math.round((action.gold + variance) * multiplier),
      tempo: Math.round(action.tempo * multiplier),
      team: action.team,
      risk: Math.max(-8, action.risk + (success ? -1 : 3)),
    };
    setStats((current) => ({
      gold: Math.max(0, current.gold + resolved.gold),
      tempo: Math.max(0, Math.min(100, current.tempo + resolved.tempo)),
      team: Math.max(0, Math.min(100, current.team + resolved.team)),
      risk: Math.max(0, Math.min(30, current.risk + resolved.risk)),
    }));
    setLogs((current) => [{ ...resolved, minute, event }, ...current]);
    if (minute >= 18) {
      setPhase("result");
    } else {
      const next = minute + 1;
      setMinute(next);
      setEvent(events[Math.floor(Math.random() * events.length)]);
      setOptions(getActions(next));
    }
  };

  const reset = () => window.location.reload();

  const currentHeroList = lane ? heroes[lane] : [];
  const timeline = useMemo(() => [...logs].reverse(), [logs]);

  return (
    <main className="arena-app">
      <div className="rift-background" />
      <header className="topbar">
        <div className="game-brand">
          <span className="brand-sigil">竞</span>
          <div><strong>峡谷决策局</strong><small>5V5 STRATEGY SIMULATOR</small></div>
        </div>
        <div className="phase-progress">
          <div><span style={{ width: `${progress}%` }} /></div>
          <small>对局准备度 {progress}%</small>
        </div>
        <button className="ghost-button" onClick={reset}>重新开局</button>
      </header>

      <section className="game-shell">
        {phase !== "lane" && phase !== "result" && (
          <aside className="draft-sidebar">
            <p className="section-label">我方阵容</p>
            <div className="pick-list">
              {team.map((name, index) => (
                <div className="mini-pick ally" key={name}>
                  <span>{name.slice(0, 1)}</span>
                  <div><b>{name}</b><small>{lanes[index]?.name}</small></div>
                </div>
              ))}
              {hero && <div className="mini-pick self"><span>{hero.name[0]}</span><div><b>{hero.name}</b><small>你 · {lane}</small></div></div>}
            </div>
            <p className="section-label enemy-label">敌方情报</p>
            <div className="pick-list">
              {enemy.map((name, index) => (
                <div className={`mini-pick enemy ${index >= visibleCount && phase === "draft" ? "hidden" : ""}`} key={name}>
                  <span>{index >= visibleCount && phase === "draft" ? "?" : name[0]}</span>
                  <div><b>{index >= visibleCount && phase === "draft" ? "等待选择" : name}</b><small>{index >= visibleCount && phase === "draft" ? "尚未公开" : lanes[index].name}</small></div>
                </div>
              ))}
            </div>
          </aside>
        )}

        <div className={`main-stage phase-${phase}`}>
          {phase === "lane" && (
            <div className="selection-panel intro-panel">
              <p className="overline">RANKED SIMULATION · 随机征召</p>
              <h1>这一局，你走哪条路？</h1>
              <p className="lead">先锁定分路。队友与对手的选择顺序每局随机，已公开的英雄会影响你的判断。</p>
              <div className="lane-grid">
                {lanes.map((item) => (
                  <button className={`lane-card ${lane === item.name ? "selected" : ""}`} key={item.name} onClick={() => selectLane(item.name)}>
                    <span className="lane-icon">{item.icon}</span>
                    <strong>{item.name}</strong>
                    <small>{item.desc}</small>
                    <i />
                  </button>
                ))}
              </div>
              <button className="gold-button" disabled={!lane} onClick={() => setPhase("draft")}>确认分路 <span>进入征召</span></button>
            </div>
          )}

          {phase === "draft" && lane && (
            <div className="selection-panel">
              <p className="overline">英雄选择 · {lane}</p>
              <div className="title-row"><div><h2>选择你的英雄</h2><p>阵容信息并不完整，选择顺序已经随机化。</p></div><span className="timer">00:24</span></div>
              <div className="hero-grid">
                {currentHeroList.map((item) => (
                  <button className={`hero-card ${hero?.name === item.name ? "selected" : ""}`} key={item.name} onClick={() => setHero(item)}>
                    <div className="hero-art" style={{ "--hero": item.color } as React.CSSProperties}><span>{item.name[0]}</span></div>
                    <div><small>{item.title}</small><strong>{item.name}</strong><em>{item.trait}</em></div>
                  </button>
                ))}
              </div>
              <div className="draft-notice"><span>阵容提示</span> 我方前排能力一般，敌方仍有 {5 - visibleCount} 个位置尚未公开。</div>
              <button className="gold-button" disabled={!hero} onClick={() => setPhase("loadout")}>锁定英雄 <span>{hero?.name ?? "未选择"}</span></button>
            </div>
          )}

          {phase === "loadout" && hero && (
            <div className="selection-panel">
              <p className="overline">战前配置 · {hero.name}</p>
              <h2>选择套装与铭文</h2>
              <p className="lead compact">配置会直接改变开局经济、团队默契、节奏与风险。</p>
              <div className="loadout-grid">
                {loadouts.map((item, index) => (
                  <button className={`loadout-card ${loadout?.name === item.name ? "selected" : ""}`} key={item.name} onClick={() => setLoadout(item)}>
                    <span className="rune-mark">{["稳", "破", "疾"][index]}</span>
                    <div><strong>{item.name}</strong><small>{item.detail}</small></div>
                    <ul><li>经济 {item.bonus.gold >= 0 ? "+" : ""}{item.bonus.gold}</li><li>团队 +{item.bonus.team}</li><li>风险 {item.bonus.risk >= 0 ? "+" : ""}{item.bonus.risk}</li></ul>
                  </button>
                ))}
              </div>
              <button className="gold-button" disabled={!loadout} onClick={() => setPhase("route")}>装备完毕 <span>选择出生路线</span></button>
            </div>
          )}

          {phase === "route" && (
            <div className="selection-panel route-panel">
              <p className="overline">开局部署 · 00:00</p>
              <h2>你准备从哪里进入战场？</h2>
              <div className="route-map">
                {["对抗路草丛", "中路河道", "发育路草丛", "我方野区"].map((item, index) => (
                  <button className={`route-node node-${index} ${route === item ? "selected" : ""}`} key={item} onClick={() => setRoute(item)}>
                    <span>{index + 1}</span>{item}
                  </button>
                ))}
                <div className="map-core">峡谷</div>
              </div>
              <div className="route-summary"><span>当前部署</span><strong>{route}</strong><small>开局事件与可用操作将根据位置随机生成</small></div>
              <button className="gold-button" onClick={startMatch}>进入游戏 <span>全军出击</span></button>
            </div>
          )}

          {phase === "match" && (
            <div className="match-layout">
              <div className="match-main">
                <div className="match-clock"><span>{String(minute).padStart(2, "0")}:00</span><small>第 {minute} 分钟 · {route}</small></div>
                <div className="situation-card">
                  <div className="radar"><i /><i /><i /><span>你</span></div>
                  <div><p className="section-label">战场播报</p><h2>{event}</h2><p>根据队友位置、资源刷新与兵线状态，做出这一分钟最重要的选择。</p></div>
                </div>
                <p className="action-prompt">选择操作 <span>操作顺序与结果包含随机波动</span></p>
                <div className="action-grid">
                  {options.map((action) => (
                    <button className="action-card" key={action.name} onClick={() => act(action)}>
                      <div><span>{action.tag}</span><b>风险 {action.risk > 4 ? "高" : action.risk > 1 ? "中" : "低"}</b></div>
                      <strong>{action.name}</strong>
                      <p>{action.desc}</p>
                      <small>预计经济 +{action.gold} · 节奏 {action.tempo >= 0 ? "+" : ""}{action.tempo}</small>
                    </button>
                  ))}
                </div>
              </div>
              <aside className="match-stats">
                <p className="section-label">实时战况</p>
                <div className="scoreline"><strong>{Math.max(0, 4 + Math.round(stats.tempo / 13))}</strong><span>击杀</span><b>{Math.max(1, 9 - Math.round(stats.team / 18))}</b></div>
                <StatBar label="个人经济" value={Math.min(100, stats.gold / 22)} display={`${stats.gold}`} />
                <StatBar label="全局节奏" value={stats.tempo} display={`${stats.tempo}%`} />
                <StatBar label="团队默契" value={stats.team} display={`${stats.team}%`} />
                <StatBar label="累积风险" value={stats.risk * 3.3} display={`${stats.risk}`} danger />
                <div className={`gold-lead ${goldLead < 0 ? "negative" : ""}`}><span>经济差</span><strong>{goldLead >= 0 ? "+" : ""}{goldLead}</strong></div>
                <p className="section-label log-title">最近操作</p>
                <div className="mini-log">
                  {logs.slice(0, 4).map((log) => <div key={`${log.minute}-${log.name}`}><span>{String(log.minute).padStart(2, "0")}'</span><b>{log.name}</b><em className={log.gold < 0 ? "bad" : ""}>{log.gold >= 0 ? "+" : ""}{log.gold}</em></div>)}
                  {!logs.length && <small>等待你的第一次决策</small>}
                </div>
              </aside>
            </div>
          )}

          {phase === "result" && (
            <div className={`result-panel ${victory ? "win" : "lose"}`}>
              <p className="overline">MATCH COMPLETE · 18:00</p>
              <h1>{victory ? "胜 利" : "失 败"}</h1>
              <p>{victory ? "你的关键决策积累了足够的经济与地图节奏。" : "几次高风险选择让队伍失去了关键资源窗口。"}</p>
              <div className="honor-card">
                <div className="rating-ring"><strong>{finalRating}</strong><small>综合评分</small></div>
                <div className="honor-copy">
                  <small>本局头衔 · {lane}</small>
                  <h2>{performanceTitle}</h2>
                  <div>{performanceTags.map((tag) => <span key={tag}>{tag}</span>)}</div>
                </div>
                <div className="grade">{finalRating >= 90 ? "S+" : finalRating >= 82 ? "S" : finalRating >= 72 ? "A" : finalRating >= 60 ? "B" : "C"}</div>
              </div>
              <div className="result-score">
                <div><small>最终经济</small><strong>{stats.gold}</strong></div>
                <div><small>团队默契</small><strong>{stats.team}%</strong></div>
                <div><small>节奏评分</small><strong>{stats.tempo}</strong></div>
                <div><small>综合评分</small><strong>{Math.round(score)}</strong></div>
              </div>
              <div className="timeline">
                <p className="section-label">决策时间线</p>
                <div className="timeline-track">
                  {timeline.map((log) => (
                    <div className={log.gold < 0 ? "failed" : ""} key={`${log.minute}-${log.name}`}>
                      <span>{log.minute}'</span><i /><b>{log.name}</b><small>{log.gold >= 0 ? "+" : ""}{log.gold} 经济</small>
                    </div>
                  ))}
                </div>
              </div>
              <button className="gold-button" onClick={reset}>再来一局 <span>重新随机阵容</span></button>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

function StatBar({ label, value, display, danger = false }: { label: string; value: number; display: string; danger?: boolean }) {
  return <div className={`stat-row ${danger ? "danger" : ""}`}><div><span>{label}</span><b>{display}</b></div><div className="stat-track"><i style={{ width: `${Math.max(2, Math.min(100, value))}%` }} /></div></div>;
}
