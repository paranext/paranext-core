import type {
  LocalizationMatrixRow,
  PlanStage,
  PlanTask,
  ProjectPlanData,
  TranslationStatus,
  TranslationsStaleAfter,
} from './types';

/**
 * Compute the translation status for one (item, target-language) pair.
 *
 * Decision tree:
 *
 * - If the target language is the source language → 'translated' (it always exists).
 * - If there is no name string for the target language → 'missing'.
 * - If the source has been updated after the staleness watermark for this (item, language) pair →
 *   'needs-review'.
 * - Otherwise → 'translated'.
 */
export function computeTranslationStatus(
  item: { id: string; names: Record<string, string>; sourceUpdatedAt: number },
  sourceLanguageId: string,
  targetLanguageId: string,
  staleAfter: TranslationsStaleAfter,
): TranslationStatus {
  if (sourceLanguageId === targetLanguageId) return 'translated';
  const hasTranslation = !!item.names[targetLanguageId]?.trim();
  if (!hasTranslation) return 'missing';
  const watermark = staleAfter[item.id]?.[targetLanguageId];
  if (typeof watermark === 'number' && item.sourceUpdatedAt > watermark) return 'needs-review';
  return 'translated';
}

/**
 * Collect every language id that appears as a key in any stage or task name/description dictionary,
 * plus the plan's declared source language. Order: source language first, then the rest in the
 * order they were first observed.
 */
export function gatherLanguagesUsed(plan: ProjectPlanData): string[] {
  const ordered: string[] = [plan.sourceLanguageId];
  const seen = new Set<string>(ordered);
  const visit = (record: Record<string, string>) => {
    Object.keys(record).forEach((key) => {
      if (!seen.has(key)) {
        seen.add(key);
        ordered.push(key);
      }
    });
  };
  plan.stages.forEach((stage) => {
    visit(stage.names);
    visit(stage.descriptions);
    stage.tasks.forEach((task) => {
      visit(task.names);
      visit(task.descriptions);
    });
  });
  return ordered;
}

function buildRow(
  item: PlanStage | PlanTask,
  itemKind: 'stage' | 'task',
  parentStageId: string | undefined,
  sourceLanguageId: string,
  languages: string[],
  staleAfter: TranslationsStaleAfter,
): LocalizationMatrixRow {
  const statusByLanguage: Record<string, TranslationStatus> = {};
  languages.forEach((language) => {
    statusByLanguage[language] = computeTranslationStatus(
      item,
      sourceLanguageId,
      language,
      staleAfter,
    );
  });
  return {
    itemKind,
    itemId: item.id,
    parentStageId,
    sourceLabel: item.names[sourceLanguageId] ?? item.id,
    statusByLanguage,
  };
}

/**
 * Build the matrix of localization status used by the Localization tab. Stages appear first; each
 * stage row is followed by its tasks in order.
 */
export function buildLocalizationMatrix(
  plan: ProjectPlanData,
  languages: string[],
): LocalizationMatrixRow[] {
  const rows: LocalizationMatrixRow[] = [];
  plan.stages.forEach((stage) => {
    rows.push(
      buildRow(
        stage,
        'stage',
        undefined,
        plan.sourceLanguageId,
        languages,
        plan.translationsStaleAfter,
      ),
    );
    stage.tasks.forEach((task) => {
      rows.push(
        buildRow(
          task,
          'task',
          stage.id,
          plan.sourceLanguageId,
          languages,
          plan.translationsStaleAfter,
        ),
      );
    });
  });
  return rows;
}
