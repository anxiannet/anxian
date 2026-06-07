import { wh0002 } from "./wh-0002";
import { wh0003 } from "./wh-0003";
import { wh0004 } from "./wh-0004";
import type { CaseData } from "./types";

export const casesBySlug: Record<string, CaseData> = {
  [wh0002.meta.slug]: wh0002,
  [wh0003.meta.slug]: wh0003,
  [wh0004.meta.slug]: wh0004,
};

export function getCaseBySlug(slug: string) {
  return casesBySlug[slug];
}

export type {
  CaseAction,
  CaseChoice,
  CaseClue,
  CaseData,
  CaseEnding,
  CaseEndingId,
  CaseScene,
  CaseSceneType,
  EvidenceDisplay,
  ReasoningOption,
} from "./types";
