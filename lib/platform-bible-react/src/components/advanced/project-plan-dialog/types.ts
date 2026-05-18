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
  name: string;
  description?: string;
  markComplete: MarkCompleteMode;
  taskStart: TaskStartCondition;
  requiresEditing: RequiresEditingMode;
  effort: TaskEffort;
  bookCountsByDifficulty?: BookCountsByDifficulty;
}

export interface PlanStage {
  id: string;
  name: string;
  description?: string;
  tasks: PlanTask[];
}

export type StageId = string;

export interface CheckSetting {
  checkId: string;
  notifyOnlyInStage: StageId | null;
  requiredInStage: StageId | null;
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

export interface OrgProvidedPlan {
  id: string;
  name: string;
  version: string;
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
