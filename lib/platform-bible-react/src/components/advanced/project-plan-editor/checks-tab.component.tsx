import { Label } from '@/components/shadcn-ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/shadcn-ui/select';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/shadcn-ui/tooltip';
import { useMemo } from 'react';
import { usePlanEditorAdmin } from './plan-editor-admin-context';
import type { PlanCheck, PlanStage, ProjectPlanData } from './types';

export interface ChecksTabProps {
  plan: ProjectPlanData;
  basicCheckRows: Array<{ checkId: string; label: string }>;
  onPatchCheck: (checkId: string, patch: Partial<PlanCheck>) => void;
}

interface StageOption {
  value: string;
  label: string;
  /** -1 means "Never". */
  stageIndex: number;
}

function buildStageOptions(stages: PlanStage[], sourceLanguageId: string): StageOption[] {
  const options: StageOption[] = [{ value: '-1', label: 'Never', stageIndex: -1 }];
  stages.forEach((stage, index) => {
    options.push({
      value: String(index),
      label: `${index + 1}. ${stage.names[sourceLanguageId] ?? stage.id}`,
      stageIndex: index,
    });
  });
  return options;
}

export function ChecksTab({ plan, basicCheckRows, onPatchCheck }: ChecksTabProps) {
  const isAdmin = usePlanEditorAdmin();
  const allStageOptions = useMemo(
    () => buildStageOptions(plan.stages, plan.sourceLanguageId),
    [plan.stages, plan.sourceLanguageId],
  );

  const checkRows = useMemo(() => {
    return basicCheckRows.map((row) => {
      const check = plan.checks.find((c) => c.details === row.checkId);
      return { row, check };
    });
  }, [basicCheckRows, plan.checks]);

  return (
    <div className="tw:flex tw:flex-col tw:gap-3">
      <div className="tw:grid tw:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)_minmax(0,1fr)] tw:gap-3 tw:text-sm tw:font-medium">
        <div />
        <div>
          <div>Notify only (optional)</div>
          <div className="tw:text-xs tw:font-normal tw:text-muted-foreground">
            Show summary of errors in All Tasks and My Tasks, but do not require checks to pass.
          </div>
        </div>
        <div>
          <div>Required in stage</div>
          <div className="tw:text-xs tw:font-normal tw:text-muted-foreground">
            Checks must pass in this stage before the next stage can begin.
          </div>
        </div>
      </div>

      <fieldset className="tw:rounded-lg tw:border tw:border-border tw:p-3">
        <legend className="tw:px-1 tw:text-sm tw:font-medium">Basic Checks</legend>
        <div className="tw:flex tw:flex-col tw:gap-2">
          {checkRows.map(({ row, check }) => (
            <CheckRow
              key={row.checkId}
              label={row.label}
              check={check}
              allStageOptions={allStageOptions}
              isAdmin={isAdmin}
              onPatchCheck={(patch) => check && onPatchCheck(check.id, patch)}
            />
          ))}
        </div>
      </fieldset>
    </div>
  );
}

function CheckRow({
  label,
  check,
  allStageOptions,
  isAdmin,
  onPatchCheck,
}: {
  label: string;
  check: PlanCheck | undefined;
  allStageOptions: StageOption[];
  isAdmin: boolean;
  onPatchCheck: (patch: Partial<PlanCheck>) => void;
}) {
  const requiredStageIndex = check?.requiredStageIndex ?? -1;
  const optionalStageIndex = check?.optionalStageIndex ?? -1;

  // Notify-only must be strictly EARLIER than Required-in-stage (INV-B17). Filter accordingly.
  // If Required is "Never" or stage 0, only "Never" is available, so we disable the Notify-only
  // select entirely and surface the controlling field.
  const optionalOptions: StageOption[] = useMemo(() => {
    if (requiredStageIndex < 0) {
      return [{ value: '-1', label: 'Never', stageIndex: -1 }];
    }
    return allStageOptions.filter(
      (option) => option.stageIndex === -1 || option.stageIndex < requiredStageIndex,
    );
  }, [allStageOptions, requiredStageIndex]);

  const optionalSingleOption = optionalOptions.length === 1;
  const optionalDisabledReason =
    optionalSingleOption && requiredStageIndex < 1
      ? 'Choose a "Required in stage" value of 2 or later to enable a notify-only stage here.'
      : undefined;

  return (
    <div className="tw:grid tw:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)_minmax(0,1fr)] tw:items-center tw:gap-3">
      <Label className="tw:text-sm">{label}</Label>

      <DisabledAwareSelect
        ariaLabel={`${label} — Notify only`}
        value={optionalSingleOption ? optionalOptions[0].value : String(optionalStageIndex)}
        options={optionalOptions}
        disabled={!isAdmin || optionalSingleOption}
        disabledReason={optionalDisabledReason}
        onValueChange={(value) => onPatchCheck({ optionalStageIndex: Number(value) })}
      />

      <DisabledAwareSelect
        ariaLabel={`${label} — Required in stage`}
        value={String(requiredStageIndex)}
        options={allStageOptions}
        disabled={!isAdmin || allStageOptions.length <= 1}
        onValueChange={(value) => {
          const next = Number(value);
          // Cascade: keep notify-only strictly less than required; reset to "Never" if it would be invalid.
          const patch: Partial<PlanCheck> = { requiredStageIndex: next };
          if (next >= 0 && optionalStageIndex >= next) patch.optionalStageIndex = -1;
          if (next < 0) patch.optionalStageIndex = -1;
          onPatchCheck(patch);
        }}
      />
    </div>
  );
}

function DisabledAwareSelect({
  ariaLabel,
  value,
  options,
  disabled,
  disabledReason,
  onValueChange,
}: {
  ariaLabel: string;
  value: string;
  options: StageOption[];
  disabled: boolean;
  disabledReason?: string;
  onValueChange: (value: string) => void;
}) {
  const trigger = (
    <SelectTrigger aria-label={ariaLabel} className="tw:w-full">
      <SelectValue />
    </SelectTrigger>
  );
  const select = (
    <Select value={value} onValueChange={onValueChange} disabled={disabled}>
      {trigger}
      <SelectContent>
        {options.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
  if (!disabled || !disabledReason) {
    return (
      <div className="tw:flex tw:flex-col tw:gap-1">
        {select}
        {disabled && options.length === 1 && (
          <span className="tw:text-xs tw:text-muted-foreground">Only one valid option.</span>
        )}
      </div>
    );
  }
  return (
    <div className="tw:flex tw:flex-col tw:gap-1">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <span className="tw:block tw:w-full">{select}</span>
          </TooltipTrigger>
          <TooltipContent>
            <span className="tw:text-xs">{disabledReason}</span>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <span className="tw:text-xs tw:text-muted-foreground">{disabledReason}</span>
    </div>
  );
}
