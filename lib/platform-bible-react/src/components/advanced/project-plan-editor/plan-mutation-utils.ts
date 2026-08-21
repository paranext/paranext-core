import type { PlanStage, PlanTask, ProjectPlanData } from './types';

/** Returned by `removeTask` so the caller can supply a working `Undo` toast. */
export interface RemovedTaskInfo {
  task: PlanTask;
  stageId: string;
  taskIndex: number;
}

/** Returned by `removeStage` so the caller can supply a working `Undo` toast. */
export interface RemovedStageInfo {
  stage: PlanStage;
  stageIndex: number;
}

export function moveTaskWithinStage(
  plan: ProjectPlanData,
  stageId: string,
  fromIndex: number,
  toIndex: number,
): ProjectPlanData {
  const stages = plan.stages.map((stage) => {
    if (stage.id !== stageId) return stage;
    const tasks = [...stage.tasks];
    if (fromIndex < 0 || fromIndex >= tasks.length) return stage;
    const clampedTo = Math.max(0, Math.min(tasks.length - 1, toIndex));
    const [moved] = tasks.splice(fromIndex, 1);
    tasks.splice(clampedTo, 0, moved);
    return { ...stage, tasks };
  });
  return { ...plan, stages };
}

export function moveTaskAcrossStages(
  plan: ProjectPlanData,
  fromStageId: string,
  fromTaskIndex: number,
  toStageId: string,
  toTaskIndex: number,
): ProjectPlanData {
  if (fromStageId === toStageId) {
    return moveTaskWithinStage(plan, fromStageId, fromTaskIndex, toTaskIndex);
  }
  const fromStage = plan.stages.find((s) => s.id === fromStageId);
  if (!fromStage) return plan;
  const movedTask = fromStage.tasks[fromTaskIndex];
  if (!movedTask) return plan;
  const stages = plan.stages.map((stage) => {
    if (stage.id === fromStageId) {
      return { ...stage, tasks: stage.tasks.filter((_, i) => i !== fromTaskIndex) };
    }
    if (stage.id === toStageId) {
      const tasks = [...stage.tasks];
      const insertAt = Math.max(0, Math.min(tasks.length, toTaskIndex));
      tasks.splice(insertAt, 0, movedTask);
      return { ...stage, tasks };
    }
    return stage;
  });
  return { ...plan, stages };
}

export function moveStage(
  plan: ProjectPlanData,
  fromIndex: number,
  toIndex: number,
): ProjectPlanData {
  if (fromIndex < 0 || fromIndex >= plan.stages.length) return plan;
  const stages = [...plan.stages];
  const [moved] = stages.splice(fromIndex, 1);
  const clampedTo = Math.max(0, Math.min(stages.length, toIndex));
  stages.splice(clampedTo, 0, moved);
  return { ...plan, stages };
}

export function removeTask(
  plan: ProjectPlanData,
  stageId: string,
  taskIndex: number,
): { next: ProjectPlanData; removed: RemovedTaskInfo | undefined } {
  const stage = plan.stages.find((s) => s.id === stageId);
  if (!stage) return { next: plan, removed: undefined };
  const task = stage.tasks[taskIndex];
  if (!task) return { next: plan, removed: undefined };
  const next: ProjectPlanData = {
    ...plan,
    stages: plan.stages.map((s) =>
      s.id === stageId ? { ...s, tasks: s.tasks.filter((_, i) => i !== taskIndex) } : s,
    ),
  };
  return { next, removed: { task, stageId, taskIndex } };
}

export function restoreTask(plan: ProjectPlanData, info: RemovedTaskInfo): ProjectPlanData {
  return {
    ...plan,
    stages: plan.stages.map((s) => {
      if (s.id !== info.stageId) return s;
      const tasks = [...s.tasks];
      const insertAt = Math.max(0, Math.min(tasks.length, info.taskIndex));
      tasks.splice(insertAt, 0, info.task);
      return { ...s, tasks };
    }),
  };
}

export function removeStage(
  plan: ProjectPlanData,
  stageIndex: number,
): { next: ProjectPlanData; removed: RemovedStageInfo | undefined } {
  const stage = plan.stages[stageIndex];
  if (!stage) return { next: plan, removed: undefined };
  const next: ProjectPlanData = {
    ...plan,
    stages: plan.stages.filter((_, i) => i !== stageIndex),
  };
  return { next, removed: { stage, stageIndex } };
}

export function restoreStage(plan: ProjectPlanData, info: RemovedStageInfo): ProjectPlanData {
  const stages = [...plan.stages];
  const insertAt = Math.max(0, Math.min(stages.length, info.stageIndex));
  stages.splice(insertAt, 0, info.stage);
  return { ...plan, stages };
}

export function updateTask(
  plan: ProjectPlanData,
  stageId: string,
  taskIndex: number,
  patch: Partial<PlanTask>,
): ProjectPlanData {
  return {
    ...plan,
    stages: plan.stages.map((stage) => {
      if (stage.id !== stageId) return stage;
      return {
        ...stage,
        tasks: stage.tasks.map((task, i) => (i === taskIndex ? { ...task, ...patch } : task)),
      };
    }),
  };
}

export function updateStage(
  plan: ProjectPlanData,
  stageIndex: number,
  patch: Partial<PlanStage>,
): ProjectPlanData {
  return {
    ...plan,
    stages: plan.stages.map((stage, i) => (i === stageIndex ? { ...stage, ...patch } : stage)),
  };
}

/** Formats a stage option with its 1-based index. Used by the Checks tab. */
export function formatStageOption(
  stage: PlanStage,
  index: number,
  sourceLanguageId: string,
): string {
  return `${index + 1}. ${stage.names[sourceLanguageId] ?? stage.id}`;
}
