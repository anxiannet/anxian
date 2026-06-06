import type { StatKey } from "../data/demoCase";

type PlayerCardProps = {
  stats: Record<StatKey, number>;
};

export function PlayerCard({ stats }: PlayerCardProps) {
  return (
    <section className="player-card">
      <div className="player-identity">
        <span className="identity-avatar">市</span>
        <div>
          <small>当前身份</small>
          <strong>普通市民</strong>
        </div>
        <i>在线</i>
      </div>
      <div className="stats-list">
        {Object.entries(stats).map(([name, value]) => (
          <div className="stat" key={name}>
            <span>{name}</span>
            <div>
              <i style={{ width: `${value}%` }} />
            </div>
            <b>{value}</b>
          </div>
        ))}
      </div>
      <p className="attribute-note">属性只影响调查反馈，不会阻断案件。</p>
    </section>
  );
}
