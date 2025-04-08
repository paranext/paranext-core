import { isLocalizeKey, LocalizeKey } from 'platform-bible-utils';
import { EditorDecorations } from 'platform-scripture-editor';

/**
 * Merge two sets of editor decorations. `b` takes precedence over `a` where applicable. `b`
 * decorations with the same id overwrite `a` decorations
 *
 * Does not modify the decorations objects passed in
 *
 * @param a Set of decorations into which to merge new decorations
 * @param b New decorations to merge into `a`
 * @returns New object containing merged decorations
 */
export function mergeDecorations(
  a: EditorDecorations | undefined,
  b: EditorDecorations | undefined,
): EditorDecorations {
  return {
    ...a,
    ...b,
    headers: {
      ...a?.headers,
      ...b?.headers,
    },
    containers: {
      ...a?.containers,
      ...b?.containers,
    },
  };
}

/**
 * MODIFIES THE `decorations` OBJECT by removing specified entries
 *
 * @param decorations Editor decorations from which to remove some decorations
 * @param decorationsToRemove List of IDs of decorations to remove completely
 */
export function removeDecorations(
  decorations: EditorDecorations | undefined,
  decorationsToRemove: string[] | undefined,
) {
  if (!decorations || !decorationsToRemove) return;

  // Get all the objects in the decorations object (assuming they all have decorations mapped by id)
  const decorationMaps = Object.values(decorations).filter((map) => map && typeof map === 'object');
  decorationMaps.forEach((decorationMap) =>
    Object.keys(decorationMap).forEach((id) => {
      if (decorationsToRemove.includes(id)) delete decorationMap[id];
    }),
  );
}

export function getLocalizeKeysFromDecorations(
  decorations: EditorDecorations | undefined,
): LocalizeKey[] {
  if (!decorations) return [];

  if (!decorations.headers) return [];

  const localizeKeys: LocalizeKey[] = [];
  Object.values(decorations.headers).forEach((header) => {
    if (header.iconAltText && isLocalizeKey(header.iconAltText))
      localizeKeys.push(header.iconAltText);
    if (header.title && isLocalizeKey(header.title)) localizeKeys.push(header.title);
    if (header.descriptionMd && isLocalizeKey(header.descriptionMd))
      localizeKeys.push(header.descriptionMd);
  });

  return localizeKeys;
}
