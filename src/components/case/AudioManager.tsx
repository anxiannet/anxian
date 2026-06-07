type AudioManagerProps = {
  label: string;
  prompt: string;
  kind?: "bgm" | "ambient" | "voice";
};

export function AudioManager({ label, prompt, kind = "ambient" }: AudioManagerProps) {
  return (
    <div className={`case-audio case-audio-${kind}`} title={prompt}>
      <span className="audio-wave" aria-hidden="true">
        <i />
        <i />
        <i />
        <i />
      </span>
      <div>
        <small>{kind === "bgm" ? "BGM CUE" : kind === "voice" ? "VOICE CUE" : "AMBIENT"}</small>
        <strong>{label}</strong>
      </div>
      <span className="audio-status">PROMPT READY</span>
    </div>
  );
}
