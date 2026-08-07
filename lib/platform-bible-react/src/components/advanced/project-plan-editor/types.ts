/**
 * Type definitions for the Project Plan Editor component family.
 *
 * Distilled from the PT9-to-PT10 port spec at:
 * `.context/features/project-plans/ui-specifications/ui-state-contracts.md`.
 *
 * Storybook-only: the types here intentionally project onto the wire types from PT10's
 * `data-contracts.md`. Concrete persistence lives outside this component.
 */

export type TaskType =
  | 'ManualByBook'
  | 'ManualByChapter'
  | 'ManualByProject'
  | 'BasicCheck'
  | 'NoteCheck'
  | 'BackTranslationStatus'
  | 'DerivedProjectNoteCheck'
  | 'NotesAssignedToMeCheck'
  | 'InterlinearStatus'
  | 'BiblicalTermDiscussion'
  | 'SpellingDiscussion'
  | 'IncorrectWords'
  | 'UnknownWords'
  | 'ParallelPassages'
  | 'BiblicalTerms'
  | 'MissingVerses'
  | 'OutOfDateVerses'
  | 'DerivedStatus';

export type AvailabilityType =
  | 'WhenBookStarts'
  | 'WhenStageIsComplete'
  | 'WhenStageIsCompleteByChapter'
  | 'AfterPreviousTaskForBook'
  | 'AfterPreviousTaskForChapter'
  | 'WhenProjectStarts';

export interface EditingRequiredItem {
  targetKind: 'ScriptureText' | 'BackTranslation' | 'None';
  projectName: string | undefined;
}

/** Status of one (item, target-language) pair in the Localization tab. */
export type TranslationStatus = 'translated' | 'missing' | 'needs-review';

/**
 * Per-item, per-target-language source-timestamp watermark. The translation is "needs-review" when
 * the source-language text changes after this watermark and has not been re-translated since.
 */
export type TranslationsStaleAfter = Record<string, Record<string, number>>;

export interface PlanTask {
  id: string;
  type: TaskType;
  /** Localized name dictionary (languageId → string). */
  names: Record<string, string>;
  /** Localized description dictionary. Markdown. */
  descriptions: Record<string, string>;
  availability: AvailabilityType;
  prerequisiteStageId: string | undefined;
  /** Single-element list (PT9 quirk — BHV-312). */
  editingRequiredList: EditingRequiredItem[];
  easiestBooksVpd: number;
  easyBooksVpd: number;
  moderateBooksVpd: number;
  difficultBooksVpd: number;
  /** Monotonic timestamp updated whenever the source-language text changes. */
  sourceUpdatedAt: number;
}

export interface PlanStage {
  id: string;
  names: Record<string, string>;
  descriptions: Record<string, string>;
  tasks: PlanTask[];
  sourceUpdatedAt: number;
}

export interface PlanCheck {
  id: string;
  type: TaskType;
  /** Stage at which the check becomes Required (-1 = "Never"). */
  requiredStageIndex: number;
  /**
   * Stage at which the check is Notify-only (-1 = "Never"). Must be strictly less than
   * `requiredStageIndex` when both are set (INV-B17, UI-only).
   */
  optionalStageIndex: number;
  details: string | undefined;
}

export interface ProjectPlanData {
  stages: PlanStage[];
  checks: PlanCheck[];
  basePlanType: 'None' | 'StandardPlan' | 'CustomPlan';
  basePlanId: string | undefined;
  basePlanName: string | undefined;
  planVersion: string;
  basePlanModified: boolean;
  sourceLanguageId: string;
  /** Per-item, per-target-language source-timestamp watermark for translation staleness. */
  translationsStaleAfter: TranslationsStaleAfter;
  /** Per-translation last-updated timestamps, keyed `${itemId}::${languageId}` → epoch ms. */
  translationsUpdatedAt: Record<string, number>;
}

export interface BasePlanVersion {
  version: string;
  releaseDate?: string;
  description?: string;
}

export interface BasePlanVersionedOption {
  compositeId: string;
  displayName: string;
  kind: 'factory' | 'custom' | 'project';
  isObsolete: boolean;
  versions: BasePlanVersion[];
  description?: string;
}

export interface BasePlanCatalog {
  factory: BasePlanVersionedOption[];
  custom: BasePlanVersionedOption[];
  fromOtherProjects: BasePlanVersionedOption[];
}

export interface SelectedBasePlan {
  basePlanId: string;
  version: string;
}

export interface CommentTagRow {
  tagId: string;
  label: string;
  projectId: string | undefined;
}

export interface BackTranslationProject {
  id: string;
  name: string;
  isDaughter: boolean;
}

export interface BasicCheckRow {
  checkId: string;
  label: string;
}

export interface ProjectPlanEditorViewOptions {
  stageLabelsByIndex: string[];
  commentTagRows: CommentTagRow[];
  backTranslationProjects: BackTranslationProject[];
  basicCheckRows: BasicCheckRow[];
  bookCountsByDifficulty: { easiest: number; easy: number; moderate: number; difficult: number };
  projectIsRegistered: boolean;
  projectIsSba: boolean;
  /** Available UI languages for the localization tab and editor language picker. */
  availableLanguages: Array<{ id: string; displayName: string }>;
}

export interface ProjectPlanEditorViewContext {
  isAdministrator: boolean;
  projectName: string | undefined;
  basePlanName: string;
  hasNewPlanVersionAvailable: boolean;
}

export type EditorMode = 'per-project' | 'standalone-base-plan';

export type EditorSelection =
  | { kind: 'none' }
  | { kind: 'stage'; stageIndex: number }
  | { kind: 'task'; stageIndex: number; taskIndex: number };

/** Cell row in the Localization tab matrix (one per stage or task). */
export interface LocalizationMatrixRow {
  itemKind: 'stage' | 'task';
  itemId: string;
  parentStageId?: string;
  /** Name of the item in the plan's source language, used for the row label. */
  sourceLabel: string;
  statusByLanguage: Record<string, TranslationStatus>;
}
