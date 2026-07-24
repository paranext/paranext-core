import type { BasePlanCatalog, ProjectPlanData, ProjectPlanEditorViewOptions } from './types';

/** Stable timestamps so Storybook stays deterministic. */
const T_BASE = 1_700_000_000_000;
const T_RECENT = 1_710_000_000_000;
const T_STALE_WATERMARK = 1_705_000_000_000;

export const mockViewOptions: ProjectPlanEditorViewOptions = {
  stageLabelsByIndex: ['Drafting', 'Team Review', 'Consultant Review', 'Final Prep'],
  commentTagRows: [
    { tagId: 'tag-comm-1', label: 'Project (Translator)', projectId: 'proj-main' },
    { tagId: 'tag-comm-2', label: 'Project (Consultant)', projectId: 'proj-main' },
  ],
  backTranslationProjects: [{ id: 'bt-1', name: 'BT (English)', isDaughter: false }],
  basicCheckRows: [
    { checkId: 'check-cv', label: 'Chapter/Verse Numbers' },
    { checkId: 'check-markers', label: 'Markers' },
    { checkId: 'check-chars', label: 'Characters' },
    { checkId: 'check-punct', label: 'Punctuation' },
    { checkId: 'check-refs', label: 'References' },
    { checkId: 'check-quotes', label: 'Quotations' },
  ],
  bookCountsByDifficulty: { easiest: 12, easy: 18, moderate: 22, difficult: 14 },
  projectIsRegistered: true,
  projectIsSba: false,
  availableLanguages: [
    { id: 'en', displayName: 'English' },
    { id: 'es', displayName: 'Spanish' },
    { id: 'fr', displayName: 'French' },
    { id: 'pt', displayName: 'Portuguese' },
  ],
};

export const mockPlan: ProjectPlanData = {
  basePlanType: 'StandardPlan',
  basePlanId: 'silcompact',
  basePlanName: 'SIL Compact',
  planVersion: '1.2',
  basePlanModified: false,
  sourceLanguageId: 'en',
  // Translations for the Spanish version of the "Initial Drafting" task were created BEFORE the
  // source was updated, so the matrix shows "needs review" for that single cell.
  translationsStaleAfter: {
    'task-1-1': { es: T_STALE_WATERMARK },
    'task-1-2': { es: T_STALE_WATERMARK, fr: T_STALE_WATERMARK },
    'task-2-1': { es: T_STALE_WATERMARK, fr: T_STALE_WATERMARK },
    'stage-1': { es: T_STALE_WATERMARK, fr: T_STALE_WATERMARK },
    'stage-2': { es: T_STALE_WATERMARK, fr: T_STALE_WATERMARK },
    'stage-3': { es: T_STALE_WATERMARK, fr: T_STALE_WATERMARK },
  },
  translationsUpdatedAt: {},
  stages: [
    {
      id: 'stage-1',
      names: { en: 'Drafting', es: 'Borrador', fr: 'Rédaction' },
      descriptions: {
        en: 'Translators produce the first draft of the text. **All books** must reach this stage before the project advances.',
        es: 'Los traductores producen el primer borrador del texto.',
        fr: 'Les traducteurs produisent la première version du texte.',
      },
      sourceUpdatedAt: T_BASE,
      tasks: [
        {
          id: 'task-1-1',
          type: 'ManualByBook',
          // The source was updated AFTER the staleness watermark — `es` will show "needs review".
          names: { en: 'Initial Drafting', es: 'Borrador inicial', fr: 'Rédaction initiale' },
          descriptions: {
            en: 'Write the first pass of the text.\n\n- Aim for clarity, not polish.\n- Mark unclear passages with `?`.',
            es: 'Escriba el primer borrador del texto.',
            fr: 'Rédigez la première version du texte.',
          },
          availability: 'WhenBookStarts',
          prerequisiteStageId: undefined,
          editingRequiredList: [{ targetKind: 'ScriptureText', projectName: 'Main Project' }],
          easiestBooksVpd: 200,
          easyBooksVpd: 150,
          moderateBooksVpd: 100,
          difficultBooksVpd: 60,
          sourceUpdatedAt: T_RECENT,
        },
        {
          id: 'task-1-2',
          type: 'ManualByChapter',
          names: { en: 'Self-Check Pass' },
          descriptions: { en: 'Translator re-reads each chapter and flags issues.' },
          availability: 'AfterPreviousTaskForChapter',
          prerequisiteStageId: undefined,
          editingRequiredList: [{ targetKind: 'ScriptureText', projectName: 'Main Project' }],
          easiestBooksVpd: 180,
          easyBooksVpd: 140,
          moderateBooksVpd: 90,
          difficultBooksVpd: 50,
          sourceUpdatedAt: T_BASE,
        },
      ],
    },
    {
      id: 'stage-2',
      names: { en: 'Team Review', es: 'Revisión del equipo' },
      descriptions: { en: 'Internal review by the translation team.' },
      sourceUpdatedAt: T_BASE,
      tasks: [
        {
          id: 'task-2-1',
          type: 'ManualByChapter',
          names: { en: 'Team Discussion', es: 'Discusión del equipo' },
          descriptions: { en: 'Translators discuss flagged passages chapter by chapter.' },
          availability: 'WhenStageIsCompleteByChapter',
          prerequisiteStageId: 'stage-1',
          editingRequiredList: [{ targetKind: 'None', projectName: undefined }],
          easiestBooksVpd: 90,
          easyBooksVpd: 70,
          moderateBooksVpd: 50,
          difficultBooksVpd: 30,
          sourceUpdatedAt: T_BASE,
        },
      ],
    },
    {
      id: 'stage-3',
      names: { en: 'Final Prep' },
      descriptions: { en: 'Last consistency pass before publication.' },
      sourceUpdatedAt: T_BASE,
      tasks: [
        {
          id: 'task-3-1',
          type: 'ManualByProject',
          names: { en: 'Final Consistency Check' },
          descriptions: { en: 'Whole-project final pass before handing off.' },
          availability: 'WhenProjectStarts',
          prerequisiteStageId: 'stage-2',
          editingRequiredList: [{ targetKind: 'None', projectName: undefined }],
          easiestBooksVpd: 40,
          easyBooksVpd: 30,
          moderateBooksVpd: 20,
          difficultBooksVpd: 10,
          sourceUpdatedAt: T_BASE,
        },
      ],
    },
  ],
  checks: [
    {
      id: 'check-row-cv',
      type: 'BasicCheck',
      requiredStageIndex: 0,
      optionalStageIndex: -1,
      details: 'check-cv',
    },
    // Markers: dependent on Chapter/Verse — Notify-only is locked because Required is "Drafting" (index 0),
    // which leaves only "Never" available for Notify-only. The Checks tab uses this to demo the
    // single-option-disabled rule.
    {
      id: 'check-row-markers',
      type: 'BasicCheck',
      requiredStageIndex: 0,
      optionalStageIndex: -1,
      details: 'check-markers',
    },
    {
      id: 'check-row-chars',
      type: 'BasicCheck',
      requiredStageIndex: 1,
      optionalStageIndex: 0,
      details: 'check-chars',
    },
    {
      id: 'check-row-punct',
      type: 'BasicCheck',
      requiredStageIndex: 2,
      optionalStageIndex: 1,
      details: 'check-punct',
    },
    {
      id: 'check-row-refs',
      type: 'BasicCheck',
      requiredStageIndex: 2,
      optionalStageIndex: 0,
      details: 'check-refs',
    },
    {
      id: 'check-row-quotes',
      type: 'BasicCheck',
      requiredStageIndex: -1,
      optionalStageIndex: -1,
      details: 'check-quotes',
    },
  ],
};

export const mockEmptyPlan: ProjectPlanData = {
  ...mockPlan,
  stages: [],
  basePlanName: undefined,
  basePlanId: undefined,
};

export const mockBasePlanCatalog: BasePlanCatalog = {
  factory: [
    {
      compositeId: 'silcompact',
      displayName: 'SIL Compact',
      kind: 'factory',
      isObsolete: false,
      description:
        'Lean three-stage workflow for small teams: Drafting → Team Review → Final Prep.',
      versions: [
        { version: '1.2', releaseDate: '2025-09-12', description: 'Adds Self-Check Pass.' },
        { version: '1.1', releaseDate: '2024-11-04' },
        { version: '1.0', releaseDate: '2023-03-20' },
      ],
    },
    {
      compositeId: 'silstandard',
      displayName: 'SIL Standard',
      kind: 'factory',
      isObsolete: false,
      description: 'Five-stage workflow with consultant review and back-translation.',
      versions: [
        { version: '2.0', releaseDate: '2025-06-01' },
        { version: '1.4', releaseDate: '2024-02-10' },
      ],
    },
  ],
  custom: [
    {
      compositeId: 'org-custom-1',
      displayName: 'Org Custom (Bible Society)',
      kind: 'custom',
      isObsolete: false,
      description: 'Local plan customised by the Bible Society administrators.',
      versions: [{ version: '1.0', releaseDate: '2025-01-15' }],
    },
  ],
  fromOtherProjects: [
    {
      compositeId: 'proj-neighbour',
      displayName: 'Neighbour Project Plan',
      kind: 'project',
      isObsolete: false,
      versions: [{ version: '1.3', releaseDate: '2024-08-22' }],
    },
  ],
};
