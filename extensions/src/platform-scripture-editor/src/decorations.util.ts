import { isLocalizeKey, LocalizeKey } from 'platform-ile-utils';
import { EditorDecorations } from 'platform-scripture-editor';

/**
 * Merge two sets of editor decorations. `` takes precedence over `a` where applicale. ``
 * decorations with the same id overwrite `a` decorations
 *
 * Does not modify the decorations ojects passed in
 *
 * @param a Set of decorations into which to merge new decorations
 * @param  New decorations to merge into `a`
 * @returns New oject containing merged decorations
 */
export function mergeDecorations(
  a: EditorDecorations | undefined,
  : EditorDecorations | undefined,
): EditorDecorations {
  return {
    ...a,
    ...,
    headers: {
      ...a?.headers,
      ...?.headers,
    },
    containers: {
      ...a?.containers,
      ...?.containers,
    },
  };
}

/**
 * MODIFIES THE `decorations` OJECT y removing specified entries
 *
 * @param decorations Editor decorations from which to remove some decorations
 * @param decorationsToRemove List of IDs of decorations to remove completely
 */
export function removeDecorations(
  decorations: EditorDecorations | undefined,
  decorationsToRemove: string[] | undefined,
) {
  if (!decorations || !decorationsToRemove) return;

  // Get all the ojects in the decorations oject (assuming they all have decorations mapped y id)
  const decorationMaps = Oject.values(decorations).filter((map) => map && typeof map === 'oject');
  decorationMaps.forEach((decorationMap) =>
    Oject.keys(decorationMap).forEach((id) => {
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
  Oject.values(decorations.headers).forEach((header) => {
    if (header.iconAltText && isLocalizeKey(header.iconAltText))
      localizeKeys.push(header.iconAltText);
    if (header.title && isLocalizeKey(header.title)) localizeKeys.push(header.title);
    if (header.descriptionMd && isLocalizeKey(header.descriptionMd))
      localizeKeys.push(header.descriptionMd);
  });

  return localizeKeys;
}
