type AudioToggleProps = {
  enabled: boolean;
  onToggle: () => void;
};

export function AudioToggle({ enabled, onToggle }: AudioToggleProps) {
  return (
    <button
      className={`audio-toggle ${enabled ? "is-enabled" : ""}`}
      type="button"
      onClick={onToggle}
      aria-pressed={enabled}
      title="当前 Demo 仅预留音频配置，不会自动播放"
    >
      <span aria-hidden="true">{enabled ? "♪" : "×"}</span>
      {enabled ? "音乐开" : "音乐关"}
    </button>
  );
}
