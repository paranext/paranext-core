import { MarkdownRenderer } from '@/components/advanced/extension-marketplace/markdown-renderer.component';
import { Button } from '@/components/shadcn-ui/button';
import { Input } from '@/components/shadcn-ui/input';
import { Label } from '@/components/shadcn-ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/shadcn-ui/popover';
import { Textarea } from '@/components/shadcn-ui/textarea';
import { ToggleGroup, ToggleGroupItem } from '@/components/shadcn-ui/toggle-group';
import { useMemo, useState } from 'react';
import { buildLocalizationMatrix, gatherLanguagesUsed } from './localization-status-utils';
import { usePlanEditorAdmin } from './plan-editor-admin-context';
import { TranslationStatusPill } from './translation-status-pill.component';
import type {
  LocalizationMatrixRow,
  PlanStage,
  PlanTask,
  ProjectPlanData,
  ProjectPlanEditorViewOptions,
  TranslationStatus,
} from './types';

export interface LocalizationTabProps {
  plan: ProjectPlanData;
  viewOptions: ProjectPlanEditorViewOptions;
  onPatchStage: (stageIndex: number, patch: Partial<PlanStage>) => void;
  onPatchTask: (stageId: string, taskIndex: number, patch: Partial<PlanTask>) => void;
}

export function LocalizationTab({
  plan,
  viewOptions,
  onPatchStage,
  onPatchTask,
}: LocalizationTabProps) {
  const languagesUsed = useMemo(() => gatherLanguagesUsed(plan), [plan]);
  // Include declared available languages even when nothing is translated yet.
  const allLanguages = useMemo(() => {
    const ids = new Set<string>(languagesUsed);
    viewOptions.availableLanguages.forEach((l) => ids.add(l.id));
    // Keep source language first, then the rest in insertion order.
    const ordered = [plan.sourceLanguageId];
    ids.forEach((id) => {
      if (!ordered.includes(id)) ordered.push(id);
    });
    return ordered;
  }, [languagesUsed, viewOptions.availableLanguages, plan.sourceLanguageId]);

  const matrix = useMemo(() => buildLocalizationMatrix(plan, allLanguages), [plan, allLanguages]);
  const languageDisplayName = (id: string) =>
    viewOptions.availableLanguages.find((l) => l.id === id)?.displayName ?? id;

  return (
    <div className="tw:flex tw:flex-col tw:gap-3">
      <div className="tw:text-sm tw:text-muted-foreground">
        Overview of which stage and task names have been translated. Click any pill to edit that
        translation; &ldquo;Needs review&rdquo; means the source has changed since the translation
        was created.
      </div>
      <div className="tw:overflow-auto tw:rounded-lg tw:border tw:border-border">
        <table className="tw:w-full tw:text-sm">
          <thead className="tw:bg-muted/40">
            <tr>
              <th className="tw:p-2 tw:text-start tw:font-medium">Item</th>
              {allLanguages.map((langId) => (
                <th key={langId} className="tw:p-2 tw:text-start tw:font-medium" scope="col">
                  {languageDisplayName(langId)}
                  {langId === plan.sourceLanguageId && (
                    <span className="tw:ms-1 tw:text-xs tw:text-muted-foreground">(source)</span>
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {matrix.map((row) => (
              <MatrixRow
                key={`${row.itemKind}-${row.itemId}`}
                row={row}
                allLanguages={allLanguages}
                plan={plan}
                onPatchStage={onPatchStage}
                onPatchTask={onPatchTask}
                languageDisplayName={languageDisplayName}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function MatrixRow({
  row,
  allLanguages,
  plan,
  onPatchStage,
  onPatchTask,
  languageDisplayName,
}: {
  row: LocalizationMatrixRow;
  allLanguages: string[];
  plan: ProjectPlanData;
  onPatchStage: (stageIndex: number, patch: Partial<PlanStage>) => void;
  onPatchTask: (stageId: string, taskIndex: number, patch: Partial<PlanTask>) => void;
  languageDisplayName: (id: string) => string;
}) {
  const target = useMemo(() => findItem(plan, row), [plan, row]);
  if (!target) return undefined;

  const sourcePreview = target.item.names[plan.sourceLanguageId] ?? '';

  return (
    <tr className="tw:border-t tw:border-border">
      <td className="tw:p-2">
        <div className={row.itemKind === 'task' ? 'tw:ps-4' : 'tw:font-medium'}>
          <span className="tw:me-2 tw:text-xs tw:uppercase tw:text-muted-foreground">
            {row.itemKind}
          </span>
          {row.sourceLabel}
        </div>
      </td>
      {allLanguages.map((langId) => {
        const status = row.statusByLanguage[langId];
        return (
          <td key={langId} className="tw:p-2 tw:align-middle">
            <LanguageCell
              status={status}
              isSourceLanguage={langId === plan.sourceLanguageId}
              sourcePreview={sourcePreview}
              currentName={target.item.names[langId] ?? ''}
              currentDescription={target.item.descriptions[langId] ?? ''}
              languageDisplayName={languageDisplayName(langId)}
              onSave={({ name, description }) => {
                if ('stageIndex' in target) {
                  const updatedNames = { ...target.item.names, [langId]: name };
                  const updatedDescriptions = {
                    ...target.item.descriptions,
                    [langId]: description,
                  };
                  const patch: Partial<PlanStage> = {
                    names: updatedNames,
                    descriptions: updatedDescriptions,
                  };
                  if (langId === plan.sourceLanguageId) {
                    patch.sourceUpdatedAt = Date.now();
                  }
                  onPatchStage(target.stageIndex, patch);
                } else {
                  const updatedNames = { ...target.item.names, [langId]: name };
                  const updatedDescriptions = {
                    ...target.item.descriptions,
                    [langId]: description,
                  };
                  const patch: Partial<PlanTask> = {
                    names: updatedNames,
                    descriptions: updatedDescriptions,
                  };
                  if (langId === plan.sourceLanguageId) {
                    patch.sourceUpdatedAt = Date.now();
                  }
                  onPatchTask(target.stageId, target.taskIndex, patch);
                }
              }}
            />
          </td>
        );
      })}
    </tr>
  );
}

function LanguageCell({
  status,
  isSourceLanguage,
  sourcePreview,
  currentName,
  currentDescription,
  languageDisplayName,
  onSave,
}: {
  status: TranslationStatus;
  isSourceLanguage: boolean;
  sourcePreview: string;
  currentName: string;
  currentDescription: string;
  languageDisplayName: string;
  onSave: (values: { name: string; description: string }) => void;
}) {
  const isAdmin = usePlanEditorAdmin();
  const [name, setName] = useState(currentName);
  const [description, setDescription] = useState(currentDescription);
  const [mode, setMode] = useState<'edit' | 'preview'>('edit');

  return (
    <Popover
      onOpenChange={(open) => {
        if (open) {
          setName(currentName);
          setDescription(currentDescription);
          setMode('edit');
        }
      }}
    >
      <PopoverTrigger asChild>
        <button
          type="button"
          aria-label={`${languageDisplayName}: ${status}`}
          className="tw:cursor-pointer tw:outline-none tw:focus-visible:ring-2 tw:focus-visible:ring-ring tw:rounded-md"
        >
          <TranslationStatusPill
            status={status}
            sourcePreview={!isSourceLanguage ? sourcePreview : undefined}
          />
        </button>
      </PopoverTrigger>
      <PopoverContent className="tw:w-96">
        <div className="tw:flex tw:flex-col tw:gap-2">
          <div className="tw:flex tw:items-center tw:justify-between">
            <div className="tw:text-sm tw:font-medium">
              {languageDisplayName}
              {isSourceLanguage && (
                <span className="tw:ms-1 tw:text-xs tw:text-muted-foreground">(source)</span>
              )}
            </div>
            <TranslationStatusPill status={status} />
          </div>
          <div className="tw:flex tw:flex-col tw:gap-1">
            <Label>Name</Label>
            <Input
              value={name}
              maxLength={60}
              disabled={!isAdmin}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="tw:flex tw:items-center tw:justify-between">
            <Label>Description</Label>
            <ToggleGroup
              type="single"
              value={mode}
              onValueChange={(next) => {
                if (next === 'edit' || next === 'preview') setMode(next);
              }}
              variant="outline"
              size="sm"
              aria-label="Description editor mode"
            >
              <ToggleGroupItem value="edit">Edit</ToggleGroupItem>
              <ToggleGroupItem value="preview">Preview</ToggleGroupItem>
            </ToggleGroup>
          </div>
          {mode === 'edit' ? (
            <Textarea
              rows={5}
              value={description}
              disabled={!isAdmin}
              onChange={(e) => setDescription(e.target.value)}
            />
          ) : (
            <div className="tw:min-h-24 tw:rounded-md tw:border tw:border-border tw:p-2">
              <MarkdownRenderer
                markdown={description.trim() ? description : '_No description yet._'}
              />
            </div>
          )}
          {!isSourceLanguage && sourcePreview && (
            <details className="tw:rounded-md tw:border tw:border-dashed tw:border-border tw:p-2 tw:text-xs">
              <summary className="tw:cursor-pointer tw:text-muted-foreground">
                Source preview
              </summary>
              <div className="tw:mt-1">{sourcePreview}</div>
            </details>
          )}
          <div className="tw:flex tw:justify-end tw:gap-2">
            <Button size="sm" disabled={!isAdmin} onClick={() => onSave({ name, description })}>
              Save
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}

function findItem(
  plan: ProjectPlanData,
  row: LocalizationMatrixRow,
):
  | { stageIndex: number; item: PlanStage }
  | { stageId: string; taskIndex: number; item: PlanTask }
  | undefined {
  if (row.itemKind === 'stage') {
    const stageIndex = plan.stages.findIndex((s) => s.id === row.itemId);
    if (stageIndex < 0) return undefined;
    return { stageIndex, item: plan.stages[stageIndex] };
  }
  const stage = plan.stages.find((s) => s.id === row.parentStageId);
  if (!stage) return undefined;
  const taskIndex = stage.tasks.findIndex((t) => t.id === row.itemId);
  if (taskIndex < 0) return undefined;
  return { stageId: stage.id, taskIndex, item: stage.tasks[taskIndex] };
}
