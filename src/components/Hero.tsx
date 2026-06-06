type HeroProps = {
  onStart: () => void;
};

export function Hero({ onStart }: HeroProps) {
  return (
    <main className="hero">
      <div className="hero-grid" aria-hidden="true" />
      <div className="city city-back" aria-hidden="true" />
      <div className="city city-front" aria-hidden="true" />
      <div className="harbor-glow" aria-hidden="true" />

      <nav className="site-nav">
        <a className="brand" href="#" aria-label="暗线首页">
          <span className="brand-mark" />
          <span>暗线</span>
          <small>ANXIAN</small>
        </a>
        <span className="nav-status">
          <i />
          白港市 / 02:10
        </span>
      </nav>

      <section className="hero-content">
        <p className="eyebrow">WHITE HARBOR / CASE 001</p>
        <h1>
          暗<span>线</span>
        </h1>
        <p className="hero-subtitle">
          一个人的调查游戏。
          <br />
          所有人的城市传说。
        </p>
        <p className="hero-intro">
          凌晨，你收到一条来自七分钟后的消息。
          <br />
          一个人刚走进电梯，然后从所有记录里消失。
        </p>
        <button className="primary-button hero-button" onClick={onStart}>
          <span>开始调查</span>
          <b>CASE 001</b>
        </button>
        <div className="hero-meta">
          <span>无需注册</span>
          <span>约 10 分钟</span>
          <span>单人案件</span>
        </div>
      </section>

      <div className="evidence-stack" aria-hidden="true">
        <article className="float-card surveillance-card">
          <header>
            <span>CAM 17-02</span>
            <i>REC</i>
          </header>
          <div className="camera-scene">
            <span className="camera-person" />
            <span className="elevator-door" />
            <b>02:17:03</b>
          </div>
          <footer>雾灯公馆 / 信号正常</footer>
        </article>
        <article className="float-card message-card">
          <small>未知号码 · 刚刚</small>
          <p>别报警。</p>
          <p>你现在看到的监控，是假的。</p>
          <span>来自 7 分钟后</span>
        </article>
        <article className="float-card archive-card">
          <small>ARCHIVE / UNFILED</small>
          <strong>02:17</strong>
          <span>记录存在时间偏移</span>
        </article>
      </div>

      <div className="scroll-cue" aria-hidden="true">
        <span />
        INCIDENT INCOMING
      </div>
    </main>
  );
}
