import { describe, it, expect } from 'vitest';
import {
  buildLocalizationMatrix,
  computeTranslationStatus,
  gatherLanguagesUsed,
} from './localization-status-utils';
import type { PlanStage, ProjectPlanData } from './types';

const stage: PlanStage = {
  id: 'stage-1',
  names: { en: 'Drafting', es: 'Borrador' },
  descriptions: { en: 'Draft text', es: 'Texto borrador' },
  tasks: [
    {
      id: 'task-1',
      type: 'ManualByBook',
      names: { en: 'Initial Draft', fr: 'Brouillon initial' },
      descriptions: { en: 'Write the first pass' },
      availability: 'WhenBookStarts',
      prerequisiteStageId: undefined,
      editingRequiredList: [{ targetKind: 'None', projectName: undefined }],
      easiestBooksVpd: 200,
      easyBooksVpd: 150,
      moderateBooksVpd: 100,
      difficultBooksVpd: 50,
      sourceUpdatedAt: 1000,
    },
  ],
  sourceUpdatedAt: 1000,
};

const basePlan: ProjectPlanData = {
  stages: [stage],
  checks: [],
  basePlanType: 'None',
  basePlanId: undefined,
  basePlanName: undefined,
  planVersion: '1.0',
  basePlanModified: false,
  sourceLanguageId: 'en',
  translationsStaleAfter: {},
  translationsUpdatedAt: {},
};

describe('computeTranslationStatus', () => {
  it('returns translated when target equals source language', () => {
    expect(computeTranslationStatus(stage, 'en', 'en', basePlan.translationsStaleAfter)).toBe(
      'translated',
    );
  });

  it('returns missing when no string exists in target language', () => {
    expect(
      computeTranslationStatus(stage.tasks[0], 'en', 'es', basePlan.translationsStaleAfter),
    ).toBe('missing');
  });

  it('returns translated when a non-empty string exists in target language', () => {
    expect(computeTranslationStatus(stage, 'en', 'es', basePlan.translationsStaleAfter)).toBe(
      'translated',
    );
  });

  it('returns needs-review when source was updated after the staleness watermark', () => {
    const staleAfter = { 'stage-1': { es: 500 } };
    expect(computeTranslationStatus(stage, 'en', 'es', staleAfter)).toBe('needs-review');
  });

  it('returns translated when the staleness watermark is at-or-after the source update', () => {
    const staleAfter = { 'stage-1': { es: 1000 } };
    expect(computeTranslationStatus(stage, 'en', 'es', staleAfter)).toBe('translated');
  });
});

describe('gatherLanguagesUsed', () => {
  it('lists the source language first and dedupes the rest', () => {
    expect(gatherLanguagesUsed(basePlan)).toEqual(['en', 'es', 'fr']);
  });
});

describe('buildLocalizationMatrix', () => {
  it('emits one row per stage and task in document order', () => {
    const matrix = buildLocalizationMatrix(basePlan, ['en', 'es', 'fr']);
    expect(matrix).toHaveLength(2);
    expect(matrix[0]).toMatchObject({
      itemKind: 'stage',
      itemId: 'stage-1',
      sourceLabel: 'Drafting',
    });
    expect(matrix[1]).toMatchObject({
      itemKind: 'task',
      itemId: 'task-1',
      parentStageId: 'stage-1',
      sourceLabel: 'Initial Draft',
    });
    expect(matrix[1].statusByLanguage.es).toBe('missing');
    expect(matrix[1].statusByLanguage.fr).toBe('translated');
  });
});
