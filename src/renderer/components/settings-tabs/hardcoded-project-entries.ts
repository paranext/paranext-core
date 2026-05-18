import { LocalizeKey } from 'platform-bible-utils';

/** A hard-coded Project-section sidebar entry whose content is not yet ported from PT9. */
export type HardcodedProjectEntry = {
  /** Stable, kebab-case identifier used for selection. */
  id: string;
  /** Localization key whose resolved value is shown in the sidebar. */
  labelKey: LocalizeKey;
};

/**
 * The Project-section sidebar entries pulled from PT9's settings layout. These are placeholders —
 * selecting one renders the Coming Soon panel until the corresponding screen is ported.
 *
 * Order matches the PT9 settings sidebar.
 */
export const HARDCODED_PROJECT_ENTRIES: ReadonlyArray<HardcodedProjectEntry> = [
  { id: 'language-settings', labelKey: '%settings_project_languageSettings%' },
  { id: 'books', labelKey: '%settings_project_books%' },
  { id: 'inventories', labelKey: '%settings_project_inventories%' },
  { id: 'scripture-reference', labelKey: '%settings_project_scriptureReferenceSettings%' },
  { id: 'biblical-terms', labelKey: '%settings_project_biblicalTerms%' },
  { id: 'quotation-rules', labelKey: '%settings_project_quotationRules%' },
  { id: 'project-plan', labelKey: '%settings_project_projectPlan%' },
  { id: 'user-permissions', labelKey: '%settings_project_userPermissions%' },
  { id: 'priorities', labelKey: '%settings_project_priorities%' },
  { id: 'project-canons', labelKey: '%settings_project_projectCanons%' },
];

/** Stable id for the always-present dynamic "Project properties" entry. */
export const PROJECT_PROPERTIES_ENTRY_ID = 'project-properties';
