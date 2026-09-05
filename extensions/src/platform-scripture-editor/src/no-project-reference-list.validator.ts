import type { SettingValidator } from '@papi/core';
import { isFreeResource } from './free-resources.utils';
import { isDblResourceReference } from './resource-reference.utils';

/**
 * Validates a write to either of the app-scoped no-project reading-choice settings.
 *
 * Deliberately stricter than the project-scoped `resourceReferenceListValidator` in
 * `platform-scripture`, which has to accept every reference type a shared project file can carry.
 * These two settings are written by exactly one caller — the no-project resource picker — and only
 * ever hold free DBL resources, so anything else in them is corruption rather than a case to
 * tolerate. Rejecting at the write is what keeps a hand-edited settings file from putting a non-DBL
 * reference in front of a user who has no project to resolve it against.
 *
 * The validator lives here rather than reusing `platform-scripture`'s: extensions are separate
 * bundles, so importing that module's runtime code across the boundary is not available — only its
 * types are.
 *
 * `dataVersion` is checked for shape but NOT for downgrades. The project-scoped list needs
 * downgrade protection because Send/Receive can bring a teammate's older copy back over yours;
 * these settings are local and single-writer, so there is no older copy to defend against.
 */
export const noProjectReferenceListValidator: SettingValidator<
  | 'platformScriptureEditor.noProjectModelTexts'
  | 'platformScriptureEditor.noProjectReferencedResources'
> = async (newValue, currentValue) => {
  if (typeof newValue !== 'object' || !newValue)
    throw new Error('No-project reference list must be an object.');

  if (typeof newValue.dataVersion !== 'string' || !/^\d+\.\d+(\.\d+)?$/.test(newValue.dataVersion))
    throw new Error(
      `No-project reference list \`dataVersion\` "${newValue.dataVersion}" is malformed; expected "major.minor[.patch]".`,
    );

  if (!Array.isArray(newValue.items))
    throw new Error('No-project reference list `items` must be an array.');

  const invalidIndex = newValue.items.findIndex(
    (item) =>
      typeof item !== 'object' ||
      !item ||
      !('type' in item) ||
      item.type !== 'dblResource' ||
      !('id' in item) ||
      typeof item.id !== 'string' ||
      !('name' in item) ||
      typeof item.name !== 'string',
  );
  if (invalidIndex !== -1)
    throw new Error(
      `No-project reference at index ${invalidIndex} is not a DBL resource reference with a string \`id\` and \`name\`.`,
    );

  // The allowlist enforced at the layer every writer passes through, not just in the panels' own
  // write helper. Without it the restriction is only as good as the callers that remember it, and
  // any extension calling `papi.settings.setSetting` could seed a non-free resource that goes live
  // the moment the curated list widens to cover it.
  //
  // Scoped to what is being ADDED. An item already in `currentValue` is allowed through even if it
  // is not allowlisted now, so that a stored pick SURVIVES the allowlist narrowing and comes back if
  // it widens again — `free-resources.const.ts` says it will. Rejecting those instead would force
  // the write path to strip them, destroying them on the next unrelated pick; the read path already
  // hides them, so nothing unofferable reaches the user either way.
  const storedIds = new Set(
    (Array.isArray(currentValue?.items) ? currentValue.items : [])
      .filter(isDblResourceReference)
      .map((item) => item.id.toUpperCase()),
  );
  const notFreeIndex = newValue.items.findIndex(
    (item) =>
      isDblResourceReference(item) &&
      !isFreeResource(item.id) &&
      !storedIds.has(item.id.toUpperCase()),
  );
  if (notFreeIndex !== -1)
    throw new Error(
      `No-project reference at index ${notFreeIndex} is not a free / openly-licensed resource.`,
    );

  return true;
};

export default noProjectReferenceListValidator;
