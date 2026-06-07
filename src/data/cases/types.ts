export type CaseSceneType =
  | "chat"
  | "location"
  | "evidence"
  | "reasoning"
  | "archive"
  | "ending";

export type CaseEndingId = "normal" | "truth" | "hidden";

export type CaseFact = {
  factId: string;
  content: string;
  critical: boolean;
};

export type CaseNpc = {
  npcId: string;
  name: string;
  ageRange: string;
  publicIdentity: string;
  speakingStyle: string;
  initialAttitude: string;
  hiddenMotive: string;
  credibility: number;
  relation: string;
  keyLine: string;
  knownFacts: string[];
};

export type CaseClue = {
  clueId: string;
  index: string;
  title: string;
  category: "surface" | "contradiction" | "hidden" | "anomaly" | "reversal";
  type: "chat" | "image" | "surveillance" | "audio" | "archive" | "physical" | "record";
  source: string;
  sceneId: string;
  relatedFactIds: string[];
  discoveryMethod: string;
  surfaceMeaning: string;
  trueMeaning: string;
  critical: boolean;
  importance: number;
  credibility: number;
  evidencePrompt: string;
  voicePrompt?: string;
  videoPrompt?: string;
};

export type CaseAction = {
  actionId: string;
  label: string;
  description: string;
  clueIds?: string[];
  addFlags?: string[];
  nextSceneId?: string;
  risk?: "低" | "中" | "高";
};

export type CaseMessage = {
  messageId: string;
  sender: string;
  role: "anonymous" | "npc" | "system" | "player";
  time: string;
  text: string;
  attachmentLabel?: string;
};

export type CaseChoice = {
  choiceId: string;
  text: string;
  consequence: string;
  nextSceneId?: string;
  clueIds?: string[];
  addFlags?: string[];
};

export type EvidenceDisplay = {
  evidenceId: string;
  title: string;
  format: "image" | "surveillance" | "audio" | "document" | "record";
  label: string;
  content: string;
  detail: string;
  clueIds: string[];
  imageSrc?: string;
  evidencePrompt: string;
  voicePrompt?: string;
  videoPrompt?: string;
};

export type ReasoningOption = {
  optionId: string;
  label: string;
  text: string;
  endingId: CaseEndingId;
  requiredClueIds?: string[];
  requiredFlags?: string[];
};

export type NextSceneRule = {
  ruleId: string;
  condition: string;
  nextSceneId: string;
};

export type CaseScene = {
  sceneId: string;
  sceneName: string;
  sceneType: CaseSceneType;
  act: number;
  order: number;
  location: string;
  time: string;
  purpose: string;
  description: string;
  objective: string;
  imageSrc?: string;
  backgroundImagePrompt: string;
  imagePrompt: string;
  bgmPrompt: string;
  ambientSfxPrompt: string;
  sfxPrompt: string;
  voicePrompt: string;
  videoPrompt: string;
  evidencePrompt: string;
  availableActions: CaseAction[];
  evidenceItems: EvidenceDisplay[];
  npcMessages: CaseMessage[];
  playerChoices: CaseChoice[];
  reasoningOptions?: ReasoningOption[];
  nextSceneRules: NextSceneRule[];
};

export type CaseEnding = {
  endingId: CaseEndingId;
  title: string;
  subtitle: string;
  summary: string;
  archiveConclusion: string;
  rating: string;
  rank: "C" | "A" | "S";
  unlockedArchive: string;
};

export type CaseData = {
  meta: {
    caseId: string;
    slug: string;
    title: string;
    hook: string;
    type: string;
    duration: string;
    level: string;
    tags: string[];
    district: string;
    location: string;
    status: string;
    openingEvent: string;
    conflict: string;
    coreAnomaly: string;
  };
  truthTree: {
    truth: string;
    hiddenTruth: string;
    surfaceTruth: string;
    keyReversal: string;
    facts: CaseFact[];
  };
  npcs: CaseNpc[];
  clues: CaseClue[];
  misdirections: Array<{
    misdirectionId: string;
    belief: string;
    factBasis: string;
    explanation: string;
  }>;
  reversals: Array<{
    reversalId: string;
    level: number;
    type: string;
    surfaceBelief: string;
    realExplanation: string;
    foreshadowingClueIds: string[];
    triggerClueId: string;
  }>;
  initialSceneId: string;
  scenes: CaseScene[];
  endings: Record<CaseEndingId, CaseEnding>;
  archive: {
    archiveId: string;
    summary: string;
    knownFacts: string[];
    openQuestions: string[];
    nextCaseHook: string;
    investigatorNote: string;
  };
  assets: {
    coverImageSrc?: string;
    archiveImageSrc?: string;
    coverImagePrompt: string;
    archiveImagePrompt: string;
    globalBgmPrompt: string;
    globalSfxPrompt: string;
    voiceEvidencePrompt: string;
    teaserVideoPrompt: string;
  };
};
