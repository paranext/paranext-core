import type { IconCatalogEntry, IconConcept } from './icon-usage.model';

/**
 * A detected inconsistency: one icon drawn for several concepts (`same-icon`), or one concept drawn
 * with several icons (`same-concept`)
 */
export type IconConflict =
  | {
      kind: 'same-icon';
      /** `icon:<name>`, the key of its note in `ICON_CONFLICT_NOTES` */
      id: string;
      icon: string;
      concepts: IconConcept[];
    }
  | {
      kind: 'same-concept';
      /** `concept:<concept>`, the key of its note in `ICON_CONFLICT_NOTES` */
      id: string;
      concept: IconConcept;
      icons: string[];
    };

/**
 * Finds every icon used for more than one concept and every concept drawn with more than one icon.
 * Mirrored usages are ignored: a right-to-left or other-side twin is the same concept by design.
 *
 * @param entries The icon catalog
 * @returns The conflicts, same-concept conflicts first, each group sorted by id
 */
export function findIconConflicts(entries: IconCatalogEntry[]): IconConflict[] {
  const iconsByConcept = new Map<IconConcept, Set<string>>();
  const sameIcon: IconConflict[] = [];

  entries.forEach((entry) => {
    const concepts = new Set<IconConcept>();
    entry.usages
      .filter((usage) => !usage.isMirrored)
      .forEach((usage) => {
        concepts.add(usage.concept);
        const icons = iconsByConcept.get(usage.concept) ?? new Set<string>();
        icons.add(entry.name);
        iconsByConcept.set(usage.concept, icons);
      });
    if (concepts.size > 1)
      sameIcon.push({
        kind: 'same-icon',
        id: `icon:${entry.name}`,
        icon: entry.name,
        concepts: [...concepts].sort(),
      });
  });

  const sameConcept: IconConflict[] = [...iconsByConcept.entries()]
    .filter(([, icons]) => icons.size > 1)
    .map(([concept, icons]) => ({
      kind: 'same-concept',
      id: `concept:${concept}`,
      concept,
      icons: [...icons].sort(),
    }));

  const byId = (a: IconConflict, b: IconConflict) => a.id.localeCompare(b.id);
  return [...sameConcept.sort(byId), ...sameIcon.sort(byId)];
}
