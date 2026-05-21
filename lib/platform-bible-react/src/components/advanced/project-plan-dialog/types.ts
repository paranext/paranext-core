export type MarkCompleteMode = 'by-book' | 'by-chapter' | 'by-project';

export type RequiresEditingMode = 'no' | 'scripture-text';

export type TaskStartCondition =
  | 'after-previous-task-on-same-book'
  | 'after-previous-stage-on-same-book'
  | 'after-previous-task-anywhere'
  | 'after-previous-stage-anywhere'
  | 'manual';

export interface TaskEffort {
  easiest: number;
  easy: number;
  moderate: number;
  difficult: number;
}

export interface BookCountsByDifficulty {
  easiest: number;
  easy: number;
  moderate: number;
  difficult: number;
}

export interface PlanTask {
  id: string;
  /** Per-locale display names. Keys are BCP-47-ish lang codes (e.g. "en", "pt-BR", "zh-Hans"). */
  names: Record<string, string>;
  /** Per-locale descriptions. Same key convention as `names`. */
  descriptions: Record<string, string>;
  markComplete: MarkCompleteMode;
  taskStart: TaskStartCondition;
  requiresEditing: RequiresEditingMode;
  effort: TaskEffort;
  bookCountsByDifficulty?: BookCountsByDifficulty;
}

export interface PlanStage {
  id: string;
  /** Per-locale display names. Keys are BCP-47-ish lang codes (e.g. "en", "pt-BR", "zh-Hans"). */
  names: Record<string, string>;
  /** Per-locale descriptions. Same key convention as `names`. */
  descriptions: Record<string, string>;
  tasks: PlanTask[];
}

export type StageId = string;

export interface CheckSetting {
  checkId: string;
  notifyOnlyInStage?: StageId;
  requiredInStage?: StageId;
}

export interface ProjectPlan {
  id: string;
  name: string;
  basePlanRef?: string;
  stages: PlanStage[];
  checks: CheckSetting[];
}

export interface Selection {
  stageId?: string;
  taskId?: string;
}

export type ProvidedPlanKind = 'factory' | 'organization';

export interface OrgProvidedPlan {
  id: string;
  name: string;
  version: string;
  /**
   * Source of the plan. `'factory'` = built-in default that ships with the product;
   * `'organization'` = template provided by the user's organization. Undefined is treated as
   * `'organization'` for backwards compatibility.
   */
  kind?: ProvidedPlanKind;
  stages: PlanStage[];
  checks: CheckSetting[];
}

export interface CheckCatalogItem {
  id: string;
  name: string;
  group: CheckGroupId;
}

export type CheckGroupId =
  | 'basic-checks'
  | 'spelling'
  | 'unresolved-notes'
  | 'other'
  | 'back-translation';

export interface CheckGroup {
  id: CheckGroupId;
  label: string;
  items: CheckCatalogItem[];
}
