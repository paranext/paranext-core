/**
 * Type declarations and localization-key constants for `ManageBooksDialog`.
 *
 * Kept in a separate file so the component file stays focused on rendering. Consumers wishing to
 * use the dialog should import the strings tuple, look up the keys via `useLocalizedStrings`, and
 * pass the resolved map into the `localizedStrings` prop.
 */

/* ------------------------------------------------------------------ */
/* Action / method / strategy unions                                  */
/* ------------------------------------------------------------------ */

/** The action mode the dialog is currently presenting. */
export type ManageBooksAction = 'view' | 'create' | 'import' | 'copy' | 'delete';

/**
 * Methods for creating a new book.
 *
 * Renamed `'referenceText'` → `'fromTemplate'` on 2026-05-01 per FN-008 #1 (phase-3-ui wiring
 * adapter). The C# orchestrator's `CreationMethod` enum already uses `FromTemplate`; the frontend
 * now matches that canonical name.
 */
export type ManageBooksCreateMethod = 'empty' | 'chapterVerse' | 'fromTemplate';

/** Strategy for resolving conflicts when importing into a project that already has the book. */
export type ManageBooksImportStrategy = 'replaceEntireBooks' | 'nonExistingChapters';

/**
 * Comparison state between a candidate book in a source/import file and the destination project.
 * Renamed on 2026-05-01 per FN-008 #1 to match `data-contracts.md` Section 3.7's canonical names
 * (the C# `ComparisonState` enum):
 *
 * - `'Same'` → `'filesAreSame'`
 * - `'Newer'` → `'sourceIsNewer'` (source has the more recent file)
 * - `'Older'` → `'sourceIsOlder'`
 * - `'Missing'` (was: in dest, missing in source) → `'sourceDoesNotExist'`
 * - `'New'` (was: in source, missing in dest) → `'destDoesNotExist'`
 * - `'undetermined'` → `'undetermined'` (unchanged)
 */
export type ManageBooksComparisonState =
  | 'filesAreSame'
  | 'sourceIsNewer'
  | 'sourceIsOlder'
  | 'sourceDoesNotExist'
  | 'destDoesNotExist'
  | 'undetermined';

/* ------------------------------------------------------------------ */
/* Project / book / file shapes                                       */
/* ------------------------------------------------------------------ */

/** A project that can appear in the Manage Books dropdown. */
export type ManageBooksDialogProject = {
  id: string;
  shortName: string;
  name: string;
};

/**
 * Presence/metadata for a single book in a project. A project's book list is the set of books
 * currently present in it; anything in the canonical list but not returned is treated as absent
 * ("new" for create/copy/import purposes).
 */
export type ManageBooksDialogBookInfo = {
  /** 3-letter USFM book code, e.g. 'GEN'. */
  id: string;
  /** ISO-formatted date the book was last modified in this project. */
  lastModified?: string;
};

/** A single inline-picked file associated with a book. */
export type ManageBooksImportFile = {
  /** The picked file's display name. */
  file: string;
  /** ISO date representing the picked file's last-modified timestamp. */
  date: string;
  /**
   * The picked file's already-decoded text contents. Required by the C# orchestrator on the wire
   * (`ImportFileEntry.content`). The dialog itself is presentational and does not require this
   * field, so it remains optional on the type — wiring layers that drive a real import MUST
   * populate it (story decorators omit it because they never call the orchestrator).
   */
  content?: string;
};

/* ------------------------------------------------------------------ */
/* AlertEntry / MutationResult (data-contracts §3.9, Theme 8)         */
/* ------------------------------------------------------------------ */

/** One captured alert (info / warning / error) returned by a mutation. */
export type AlertEntry = {
  /** Human-readable message body. */
  text: string;
  /** Caption / title (may be empty). */
  caption: string;
  /** Severity. Mirrors `SIL.Alert.AlertLevel` on the backend. */
  level: 'error' | 'warning' | 'info';
};

/** Standard shape returned by mutation callbacks (createBooks/deleteBooks/copyBooks/importBooks). */
export type MutationResult = {
  /**
   * Whether the mutation completed successfully overall. Optional — when omitted, treat as
   * `errors.length === 0`.
   */
  success?: boolean;
  /** Number of books successfully processed (optional summary). */
  successCount?: number;
  /** Captured non-fatal alerts (information / warning levels). */
  warnings: AlertEntry[];
  /** Captured fatal alerts (error level). */
  errors: AlertEntry[];
};

/* ------------------------------------------------------------------ */
/* Greek Esther                                                       */
/* ------------------------------------------------------------------ */

/**
 * Greek Esther template choices. The picker that resolves a value is built in WP-002. The dialog
 * only knows it has to ask via the `onOpenEstherPicker` callback.
 */
export type EstherTemplate = 'lxx' | 'vulgate' | 'modern_scholars';

/* ------------------------------------------------------------------ */
/* Localization keys                                                  */
/* ------------------------------------------------------------------ */

/**
 * All localization keys consumed by `ManageBooksDialog`. Pass to `useLocalizedStrings` to obtain a
 * `ManageBooksDialogLocalizedStrings` map and forward it via the `localizedStrings` prop.
 */
export const MANAGE_BOOKS_DIALOG_STRING_KEYS = Object.freeze([
  // Header & dialog frame
  '%manageBooks_dialog_title%',
  '%manageBooks_header_projectLabel%',
  '%manageBooks_header_subtitle%',
  '%manageBooks_header_subtitleNoVersification%',
  // Action toggles
  '%manageBooks_action_view%',
  '%manageBooks_action_create%',
  '%manageBooks_action_import%',
  '%manageBooks_action_copy%',
  '%manageBooks_action_delete%',
  // View-mode cross-launch buttons
  '%manageBooks_view_openScrRefSettings%',
  '%manageBooks_view_openProjectCanons%',
  '%manageBooks_view_openRegistry%',
  // Create-mode method picker
  '%manageBooks_create_method_empty%',
  '%manageBooks_create_method_chapterVerse%',
  '%manageBooks_create_method_chapterVerse_disabledTooltip%',
  '%manageBooks_create_method_referenceText%',
  '%manageBooks_create_referenceProjectPlaceholder%',
  '%manageBooks_create_basedOnInfo%',
  // Copy mode
  '%manageBooks_copy_fromLabel%',
  '%manageBooks_copy_sourcePlaceholder%',
  '%manageBooks_copy_emptyState_chooseSource%',
  '%manageBooks_copy_emptyState_noBooks%',
  // Per-action empty states
  '%manageBooks_create_emptyState_allPresent%',
  '%manageBooks_delete_emptyState_noBooks%',
  '%manageBooks_filter_emptyState%',
  '%manageBooks_filter_clearButton%',
  // Filter bar
  '%manageBooks_filter_placeholder%',
  '%manageBooks_filter_books%',
  '%manageBooks_filter_count%',
  '%manageBooks_filter_zero%',
  '%manageBooks_filter_state_all%',
  '%manageBooks_filter_state_new%',
  '%manageBooks_filter_state_existing%',
  '%manageBooks_filter_state_newer%',
  '%manageBooks_filter_state_older%',
  '%manageBooks_filter_state_same%',
  '%manageBooks_filter_state_undetermined%',
  // Selection / book grid
  '%manageBooks_selection_selectAll%',
  '%manageBooks_selection_xSelected%',
  '%manageBooks_selection_selectBook%',
  '%manageBooks_selection_announcement%',
  '%manageBooks_grid_label%',
  // BookGridSelector chrome (canon / status grouping, group select-all)
  '%manageBooks_grid_groupBy_label%',
  '%manageBooks_grid_groupBy_canon%',
  '%manageBooks_grid_groupBy_status%',
  '%manageBooks_grid_groupBy_none%',
  '%manageBooks_grid_canonGroup_OT%',
  '%manageBooks_grid_canonGroup_NT%',
  '%manageBooks_grid_canonGroup_DC%',
  '%manageBooks_grid_canonGroup_Extra%',
  '%manageBooks_grid_statusGroup_inProject%',
  '%manageBooks_grid_statusGroup_notInProject%',
  '%manageBooks_grid_statusGroup_newer%',
  '%manageBooks_grid_statusGroup_older%',
  '%manageBooks_grid_statusGroup_new%',
  '%manageBooks_grid_statusGroup_same%',
  '%manageBooks_grid_outOfScope%',
  '%manageBooks_grid_untracked%',
  '%manageBooks_grid_selectAll%',
  '%manageBooks_grid_groupCount%',
  // Pill / per-row badges
  '%manageBooks_pill_present%',
  '%manageBooks_pill_new%',
  '%manageBooks_pill_state_same%',
  '%manageBooks_pill_state_newer%',
  '%manageBooks_pill_state_older%',
  '%manageBooks_pill_state_missing%',
  '%manageBooks_pill_state_undetermined%',
  // Per-row inline buttons (View mode shortcuts)
  '%manageBooks_view_inlineCreateButton%',
  '%manageBooks_view_inlineCreateTooltip%',
  '%manageBooks_view_inlineDeleteTooltip%',
  '%manageBooks_view_inlineDeleteAria%',
  '%manageBooks_view_diff_label%',
  '%manageBooks_view_disabledStub_notYetAvailable%',
  // Import flow
  '%manageBooks_import_choose%',
  '%manageBooks_import_addMore%',
  '%manageBooks_import_clearFiles%',
  '%manageBooks_import_filesMatched_one%',
  '%manageBooks_import_filesMatched_other%',
  '%manageBooks_import_unmatchedOne%',
  '%manageBooks_import_unmatchedMany%',
  '%manageBooks_import_conflictTitle%',
  '%manageBooks_import_conflictBody%',
  '%manageBooks_import_conflictBody2%',
  '%manageBooks_import_replaceEntireBooks%',
  '%manageBooks_import_nonExistingChapters%',
  '%manageBooks_import_usxConfirmTitle%',
  '%manageBooks_import_usxConfirmBody%',
  '%manageBooks_import_usxConfirmAccept%',
  '%manageBooks_import_usxConfirmCancel%',
  '%manageBooks_import_overlapTitle%',
  '%manageBooks_import_overlapBody%',
  '%manageBooks_import_overlapDismiss%',
  // Delete confirm
  '%manageBooks_delete_confirmTitle%',
  '%manageBooks_delete_confirmBodyPartial%',
  '%manageBooks_delete_confirmBodyAll%',
  '%manageBooks_delete_confirmBodyShared%',
  '%manageBooks_delete_confirmCancel%',
  '%manageBooks_delete_confirmAccept%',
  // Create prompts (versification / missing model books)
  '%manageBooks_create_versificationMismatchTitle%',
  '%manageBooks_create_versificationMismatchBody%',
  '%manageBooks_create_missingModelBooksTitle%',
  '%manageBooks_create_missingModelBooksBody%',
  '%manageBooks_prompt_continue%',
  '%manageBooks_prompt_cancel%',
  // Footer
  '%manageBooks_footer_close%',
  '%manageBooks_footer_cancel%',
  '%manageBooks_footer_summary_view%',
  '%manageBooks_footer_summary_create%',
  '%manageBooks_footer_summary_delete%',
  '%manageBooks_footer_summary_copy_with%',
  '%manageBooks_footer_summary_copy_without%',
  '%manageBooks_footer_summary_import%',
  '%manageBooks_footer_apply_create%',
  '%manageBooks_footer_apply_create_one%',
  '%manageBooks_footer_apply_create_many%',
  '%manageBooks_footer_apply_delete%',
  '%manageBooks_footer_apply_delete_one%',
  '%manageBooks_footer_apply_delete_many%',
  '%manageBooks_footer_apply_copy%',
  '%manageBooks_footer_apply_copy_one%',
  '%manageBooks_footer_apply_copy_many%',
  '%manageBooks_footer_apply_import%',
  '%manageBooks_footer_apply_import_one%',
  '%manageBooks_footer_apply_import_many%',
  '%manageBooks_footer_disabledTooltip_chooseSource%',
  '%manageBooks_footer_disabledTooltip_chooseReference%',
  '%manageBooks_footer_disabledTooltip_selectBook%',
  '%manageBooks_footer_disabledTooltip_addFile%',
  '%manageBooks_footer_loading%',
  '%manageBooks_footer_loading_create%',
  '%manageBooks_footer_loading_delete%',
  '%manageBooks_footer_loading_copy%',
  '%manageBooks_footer_loading_import%',
  // Result panel (AlertEntry rendering)
  '%manageBooks_results_errorsTitle%',
  '%manageBooks_results_warningsTitle%',
  '%manageBooks_results_dismiss%',
  '%manageBooks_results_success%',
  // Existing backend keys directly referenced by in-dialog prompts (B2)
  '%manageBooks_create_warningModelMissingBooks%',
  '%manageBooks_create_errorVersificationMismatch%',
  '%manageBooks_import_errorOverlappingFiles%',
  // Wiring-layer toast string — file-picker stub notification (DEF-UI-009).
  // (The DEF-UI-007/008 cross-launch toast key was retired in Phase 3 UI
  // Decision 28, 2026-05-04, when those stubs converged on disabled+tooltip
  // via the new shared key declared earlier in this tuple.)
  '%manageBooks_filePicker_notYetAvailable%',
  // Sidebar (rebuild — ViewListSelect layout, 2026-05-02)
  '%manageBooks_sidebar_heading%',
  '%manageBooks_sidebar_group_manage%',
  '%manageBooks_sidebar_group_reference%',
  '%manageBooks_sidebar_show_label%',
  '%manageBooks_sidebar_show_subtitle%',
  '%manageBooks_sidebar_create_label%',
  '%manageBooks_sidebar_create_subtitle%',
  '%manageBooks_sidebar_copy_label%',
  '%manageBooks_sidebar_copy_subtitle%',
  '%manageBooks_sidebar_import_label%',
  '%manageBooks_sidebar_import_subtitle%',
  '%manageBooks_sidebar_delete_label%',
  '%manageBooks_sidebar_delete_subtitle%',
  // Disabled future sections (DEF-UI-011/012/013)
  '%manageBooks_progressTracking_label%',
  '%manageBooks_progressTracking_subtitle%',
  '%manageBooks_progressTracking_notYetAvailable%',
  '%manageBooks_bookNames_label%',
  '%manageBooks_bookNames_subtitle%',
  '%manageBooks_bookNames_notYetAvailable%',
  '%manageBooks_introductions_label%',
  '%manageBooks_introductions_subtitle%',
  '%manageBooks_introductions_notYetAvailable%',
] as const);

/** Localized strings consumed by `ManageBooksDialog`. */
export type ManageBooksDialogLocalizedStrings = {
  [key in (typeof MANAGE_BOOKS_DIALOG_STRING_KEYS)[number]]?: string;
};
