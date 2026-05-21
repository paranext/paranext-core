import { useEffect, useMemo, useState } from 'react';
import { Globe, Languages, Plus } from 'lucide-react';
import { Button } from '@/components/shadcn-ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/shadcn-ui/dialog';
import { Input } from '@/components/shadcn-ui/input';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/shadcn-ui/popover';
import { Toggle } from '@/components/shadcn-ui/toggle';
import { cn } from '@/utils/shadcn-ui/utils';
import { OrgPlanPicker } from '@/components/advanced/project-plan-dialog/org-plan-picker.component';
import { MergedStagesTasksChecks } from '@/components/advanced/project-plan-dialog/merged-stages-tasks-checks.component';
import {
  DEFAULT_LANG,
  langDisplayName,
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

export interface ProjectPlanDialogChecksMergedProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  projectName: string;
  plan: ProjectPlan;
  orgProvidedPlans: OrgProvidedPlan[];
  onSubmit: (plan: ProjectPlan) => void;
  onCancel?: () => void;
}

export function ProjectPlanDialogChecksMerged({
  open,
  onOpenChange,
  projectName,
  plan,
  orgProvidedPlans,
  onSubmit,
  onCancel,
}: ProjectPlanDialogChecksMergedProps) {
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

  const handleChecksChange = (checks: CheckSetting[]) =>
    setWorkingPlan((p) => ({ ...p, checks }));

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
          <MergedStagesTasksChecks
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

interface LanguageSwitcherProps {
  displayLang: LangCode;
  availableLangs: LangCode[];
  onChangeLang: (next: LangCode) => void;
  onAddLanguage: (code: LangCode) => void;
}

function LanguageSwitcher({
  displayLang,
  availableLangs,
  onChangeLang,
  onAddLanguage,
}: LanguageSwitcherProps) {
  const [open, setOpen] = useState(false);
  const [addOpen, setAddOpen] = useState(false);
  const [newCode, setNewCode] = useState('');

  const handleAdd = () => {
    const code = newCode.trim();
    if (!code) return;
    onAddLanguage(code);
    setNewCode('');
    setAddOpen(false);
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" className="tw:h-9 tw:gap-1.5">
          <Globe className="tw:h-4 tw:w-4" />
          <span className="tw:text-xs tw:font-normal tw:text-muted-foreground">Lang:</span>
          <span>{langDisplayName(displayLang)}</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" style={{ zIndex: 600 }} className="tw:w-64 tw:p-1">
        <ul className="tw:flex tw:flex-col">
          {availableLangs.map((lang) => (
            <li key={lang}>
              <button
                type="button"
                onClick={() => {
                  onChangeLang(lang);
                  setOpen(false);
                }}
                className={cn(
                  'tw:flex tw:w-full tw:items-center tw:justify-between tw:rounded tw:px-2 tw:py-1 tw:text-start tw:text-sm tw:hover:bg-accent',
                  lang === displayLang && 'tw:bg-accent',
                )}
              >
                <span>{langDisplayName(lang)}</span>
                <span className="tw:text-[10px] tw:uppercase tw:text-muted-foreground">
                  {lang}
                </span>
              </button>
            </li>
          ))}
          <li className="tw:my-1 tw:border-t" />
          <li>
            {addOpen ? (
              <div className="tw:flex tw:items-center tw:gap-1 tw:px-2 tw:py-1">
                <Input
                  autoFocus
                  placeholder="e.g. de, id, zh-Hant"
                  value={newCode}
                  onChange={(e) => setNewCode(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleAdd();
                    }
                    if (e.key === 'Escape') {
                      e.preventDefault();
                      setAddOpen(false);
                      setNewCode('');
                    }
                  }}
                  className="tw:h-7 tw:text-xs"
                />
                <Button size="sm" className="tw:h-7" onClick={handleAdd}>
                  Add
                </Button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setAddOpen(true)}
                className="tw:flex tw:w-full tw:items-center tw:gap-1 tw:rounded tw:px-2 tw:py-1 tw:text-start tw:text-sm tw:text-muted-foreground tw:hover:bg-accent"
              >
                <Plus className="tw:h-3.5 tw:w-3.5" />
                Add language…
              </button>
            )}
          </li>
        </ul>
      </PopoverContent>
    </Popover>
  );
}

export default ProjectPlanDialogChecksMerged;
