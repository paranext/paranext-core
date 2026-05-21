import { useEffect, useMemo, useState } from 'react';
import { Languages } from 'lucide-react';
import { Button } from '@/components/shadcn-ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/shadcn-ui/dialog';
import { Toggle } from '@/components/shadcn-ui/toggle';
import { OrgPlanPicker } from '@/components/advanced/project-plan-dialog/org-plan-picker.component';
import { LanguageSwitcher } from '@/components/advanced/project-plan-dialog/project-plan-dialog-checks-merged.component';
import { StageTabsStages } from '@/components/advanced/project-plan-dialog/stage-tabs-stages.component';
import { GlobalToggleStages } from '@/components/advanced/project-plan-dialog/global-toggle-stages.component';
import {
  DEFAULT_LANG,
  planLangs,
  type LangCode,
} from '@/components/advanced/project-plan-dialog/localized.utils';
import type {
  CheckSetting,
  OrgProvidedPlan,
  PlanStage,
  PlanTask,
  ProjectPlan,
} from '@/components/advanced/project-plan-dialog/types';

export interface ProjectPlanDialogStageTabsProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  projectName: string;
  plan: ProjectPlan;
  orgProvidedPlans: OrgProvidedPlan[];
  /**
   * How the per-stage Description / Checks / Tasks sections are presented:
   *
   * - `'tabs'` (default): each stage exposes its own tabs inside its accordion.
   * - `'global'`: a single section toggle above the stage list switches every stage at once, and
   *   stage/task names are edited inline in their row headers.
   */
  stagesVariant?: 'tabs' | 'global';
  onSubmit: (plan: ProjectPlan) => void;
  onCancel?: () => void;
}

export function ProjectPlanDialogStageTabs({
  open,
  onOpenChange,
  projectName,
  plan,
  orgProvidedPlans,
  stagesVariant = 'tabs',
  onSubmit,
  onCancel,
}: ProjectPlanDialogStageTabsProps) {
  const [workingPlan, setWorkingPlan] = useState<ProjectPlan>(plan);
  const [displayLang, setDisplayLangState] = useState<LangCode>(DEFAULT_LANG);
  const [previousLang, setPreviousLang] = useState<LangCode | undefined>(undefined);
  // Extra languages the user has explicitly added during this session (so they appear in the
  // switcher dropdown even though they have no content yet anywhere in the plan).
  const [extraLangs, setExtraLangs] = useState<LangCode[]>([]);
  // Translation helpers (reference line, Copy button, coverage chips). OFF by default —
  // auto-engages once the user picks a non-default language for the first time in this session.
  const [translateMode, setTranslateMode] = useState(false);
  const [hasAutoEngaged, setHasAutoEngaged] = useState(false);

  useEffect(() => {
    if (open) {
      setWorkingPlan(plan);
      setDisplayLangState(DEFAULT_LANG);
      setPreviousLang(undefined);
      setExtraLangs([]);
      setTranslateMode(false);
      setHasAutoEngaged(false);
    }
  }, [open, plan]);

  const availableLangs = useMemo(() => {
    const set = new Set<LangCode>(planLangs(workingPlan.stages));
    for (const lang of extraLangs) set.add(lang);
    set.add(DEFAULT_LANG);
    set.add(displayLang);
    return Array.from(set).sort();
  }, [workingPlan.stages, extraLangs, displayLang]);

  const setDisplayLang = (next: LangCode) => {
    if (next === displayLang) return;
    setPreviousLang(displayLang);
    setDisplayLangState(next);
    // Auto-engage translate mode the first time the user switches away from the default lang.
    // After that, the toggle is fully manual.
    if (!hasAutoEngaged && next !== DEFAULT_LANG) {
      setTranslateMode(true);
      setHasAutoEngaged(true);
    }
  };

  const handleAddLanguage = (code: LangCode) => {
    const trimmed = code.trim();
    if (!trimmed) return;
    if (!extraLangs.includes(trimmed) && !availableLangs.includes(trimmed)) {
      setExtraLangs((prev) => [...prev, trimmed]);
    }
    setDisplayLang(trimmed);
  };

  const isDirty = useMemo(
    () => JSON.stringify(workingPlan) !== JSON.stringify(plan),
    [workingPlan, plan],
  );

  const updateStages = (updater: (prev: PlanStage[]) => PlanStage[]) =>
    setWorkingPlan((prev) => ({ ...prev, stages: updater(prev.stages) }));

  const handleStageChange = (next: PlanStage) =>
    updateStages((prev) => prev.map((s) => (s.id === next.id ? next : s)));

  const handleTaskChange = (next: PlanTask) =>
    updateStages((prev) =>
      prev.map((s) => ({
        ...s,
        tasks: s.tasks.map((t) => (t.id === next.id ? next : t)),
      })),
    );

  const handleChecksChange = (checks: CheckSetting[]) => setWorkingPlan((p) => ({ ...p, checks }));

  const handleOrgPlanReplace = (selected: OrgProvidedPlan) => {
    setWorkingPlan({
      ...workingPlan,
      basePlanRef: selected.id,
      name: selected.name,
      stages: structuredClone(selected.stages),
      checks: structuredClone(selected.checks),
    });
  };

  const handleCancel = () => {
    if (onCancel) onCancel();
    onOpenChange(false);
  };

  const handleSubmit = () => {
    onSubmit(workingPlan);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="tw:inset-0 tw:flex tw:h-screen tw:max-h-none tw:w-screen tw:max-w-none tw:sm:max-w-none tw:translate-x-0 tw:translate-y-0 tw:flex-col tw:gap-0 tw:rounded-none tw:p-0 tw:rtl:translate-x-0">
        <DialogHeader className="tw:border-b tw:p-4 tw:pb-3">
          <DialogTitle>Project Plan: {projectName}</DialogTitle>
        </DialogHeader>

        <div className="tw:flex tw:flex-wrap tw:items-center tw:justify-between tw:gap-3 tw:border-b tw:px-4 tw:py-3">
          <div className="tw:flex tw:items-center tw:gap-2">
            <span className="tw:text-sm tw:text-muted-foreground">Project Plan:</span>
            <span className="tw:text-sm tw:font-medium">{workingPlan.name}</span>
          </div>
          <div className="tw:flex tw:flex-wrap tw:items-center tw:gap-2">
            <OrgPlanPicker
              orgProvidedPlans={orgProvidedPlans}
              currentBasePlanRef={workingPlan.basePlanRef}
              isDirty={isDirty}
              onReplaceWith={handleOrgPlanReplace}
            />
            <LanguageSwitcher
              displayLang={displayLang}
              availableLangs={availableLangs}
              onChangeLang={setDisplayLang}
              onAddLanguage={handleAddLanguage}
            />
            <Toggle
              pressed={translateMode}
              onPressedChange={setTranslateMode}
              aria-label="Toggle translation helpers"
              title="Show reference text, copy buttons, and translation coverage indicators per field"
              className="tw:h-9 tw:gap-1.5 tw:px-2.5"
              size="sm"
            >
              <Languages className="tw:h-4 tw:w-4" />
              <span className="tw:text-xs">Translate</span>
            </Toggle>
          </div>
        </div>

        <div className="tw:flex-1 tw:overflow-auto tw:px-4 tw:py-3">
          {stagesVariant === 'global' ? (
            <GlobalToggleStages
              stages={workingPlan.stages}
              checks={workingPlan.checks}
              displayLang={displayLang}
              previousLang={previousLang}
              translateMode={translateMode}
              onStagesChange={updateStages}
              onStageChange={handleStageChange}
              onTaskChange={handleTaskChange}
              onChecksChange={handleChecksChange}
            />
          ) : (
            <StageTabsStages
              stages={workingPlan.stages}
              checks={workingPlan.checks}
              displayLang={displayLang}
              previousLang={previousLang}
              translateMode={translateMode}
              onStagesChange={updateStages}
              onStageChange={handleStageChange}
              onTaskChange={handleTaskChange}
              onChecksChange={handleChecksChange}
            />
          )}
        </div>

        <DialogFooter className="tw:border-t tw:p-4">
          <Button variant="outline" onClick={handleCancel}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>OK</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default ProjectPlanDialogStageTabs;
