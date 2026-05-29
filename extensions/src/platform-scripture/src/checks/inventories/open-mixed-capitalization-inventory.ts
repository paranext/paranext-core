import papi, { logger } from '@papi/frontend';
import { GetWebViewOptions } from '@papi/core';

/** Options passed when opening the Mixed Capitalization inventory web view. */
interface MixedCapitalizationInventoryWebViewOptions extends GetWebViewOptions {
  projectId: string | undefined;
}

/**
 * Web-view type for the Mixed Capitalization inventory, matching the sibling inventory web-view
 * types (`platformScripture.characterInventory`, `platformScripture.punctuationInventory`, etc.).
 */
export const mixedCapitalizationInventoryWebViewType =
  'platformScripture.mixedCapitalizationInventory';

// === PORTED FROM PT9 ===
// Source: Paratext/Paratext/Checks/CheckType.cs (CheckType.InternalValue for Mixed Capitalization)
// Maps to: spec-012 / INV-A03
// The PT9 `CheckType.InternalValue` for the Mixed Capitalization check is the typo
// "MixexCapitalization". It is the on-wire identity persisted in PT9-touched projects, so it must
// be preserved verbatim for round-trip interop — renaming it would break inventory resolution.
/**
 * On-wire `CheckType` identity for the Mixed Capitalization inventory. This is the PT9
 * `CheckType.InternalValue` literal, including the historical "Mixex" misspelling, preserved
 * verbatim so inventories round-trip with projects previously touched by Paratext 9.
 */
export const mixedCapitalizationCheckId = 'MixexCapitalization';

/**
 * Project setting key holding the space-separated list of approved (valid) Mixed Capitalization
 * items. The SSF parameter name is spelled correctly — only the `CheckType` carries the PT9 typo.
 */
export const validMixedCapitalizationSetting = 'platformScripture.validMixedCapitalization';

/**
 * Project setting key holding the space-separated list of unapproved (invalid) Mixed Capitalization
 * items. The SSF parameter name is spelled correctly — only the `CheckType` carries the PT9 typo.
 */
export const invalidMixedCapitalizationSetting = 'platformScripture.invalidMixedCapitalization';

// === PORTED FROM PT9 ===
// Source: Paratext/Paratext/WindowCollection.cs:463-473 (FindOrCreateInventoryForm)
// Maps to: BHV-651 / gm-017 (window-dedup contract)
// PT9 keys open inventory forms on (scrText, inventory.Type): an existing matching form is brought
// to front via MakeActive() rather than re-Initialized; otherwise a new form is opened. PT10
// implements this with the `existingId: '?' / createNewIfNotFound: false` probe pattern shared by
// the sibling open commands (main.ts openManageBooks / openFind).
/**
 * Opens (or re-activates) the Mixed Capitalization inventory web view for the project tied to the
 * calling editor's web view.
 *
 * The project context is inherited from the triggering editor's web view (`webViewId`). If a Mixed
 * Capitalization inventory web view is already open it is brought to the front and reused rather
 * than duplicated — there is at most one inventory window per project. Returns the existing-or-new
 * web-view id, or `undefined` when no project context can be resolved from `webViewId`.
 *
 * @param webViewId - The id of the calling editor's web view, used to resolve the project.
 * @returns The id of the open Mixed Capitalization inventory web view, or `undefined` when no
 *   project context could be resolved.
 */
export async function openMixedCapitalizationInventory(
  webViewId?: string,
): Promise<string | undefined> {
  let projectId: string | undefined;

  if (webViewId) {
    const webViewDefinition = await papi.webViews.getOpenWebViewDefinition(webViewId);
    projectId = webViewDefinition?.projectId;
  }

  if (!projectId) {
    logger.debug('Cannot open Mixed Capitalization inventory: no project context resolved');
    return undefined;
  }

  const options: MixedCapitalizationInventoryWebViewOptions = { projectId };

  // Reuse an already-open Mixed Capitalization inventory window for this web-view type rather than
  // duplicating it. `existingId: '?'` matches any open instance; if none is found we fall through
  // and create a new one.
  const existingId = await papi.webViews.openWebView(
    mixedCapitalizationInventoryWebViewType,
    { type: 'float', floatSize: { width: 700, height: 800 } },
    { ...options, existingId: '?', createNewIfNotFound: false },
  );
  if (existingId) {
    // Bring the existing window to the front (MakeActive); do NOT re-initialize.
    await papi.webViews.reloadWebView(mixedCapitalizationInventoryWebViewType, existingId, options);
    return existingId;
  }

  return papi.webViews.openWebView(
    mixedCapitalizationInventoryWebViewType,
    { type: 'float', floatSize: { width: 700, height: 800 } },
    options,
  );
}
