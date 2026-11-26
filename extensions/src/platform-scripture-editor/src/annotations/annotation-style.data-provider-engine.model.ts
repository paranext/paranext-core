import { DataProviderEngine, logger } from '@papi/backend';
import type { DataProviderUpdateInstructions, IDataProviderEngine } from '@papi/core';
import type {
  AnnotationStyleDataProviderDataTypes,
  AnnotationStyleNonce,
  AnnotationStyleProperties,
} from 'platform-scripture-editor';
import { KebabCase, newGuid, toKebabCase } from 'platform-bible-utils';

/** A CSS declaration line. */
function declaration(property: string, value: string | number): string {
  return `  ${property}: ${value};`;
}

/** Storage for annotation styles with their nonces and definitions. */
type AnnotationStyleEntry = {
  nonce: AnnotationStyleNonce;
  typeName: string;
  definition: AnnotationStyleProperties;
};

/** The box properties whose inline sides are removed from elements that are not an edge. */
const BOX_PROPERTIES = ['padding', 'margin', 'border', 'borderRadius'] as const;

type BoxProperty = (typeof BOX_PROPERTIES)[number];

/** An inline side of an annotation, and the edge class the editor puts on the element there. */
const SIDES = [
  { side: 'start', edgeClass: 'editor-typed-markStart' },
  { side: 'end', edgeClass: 'editor-typed-markEnd' },
] as const;

/** The declarations that zero one box property's inline-start and inline-end sides. */
const REMOVED_SIDES: Record<BoxProperty, { start: string[]; end: string[] }> = {
  padding: { start: ['padding-inline-start: 0'], end: ['padding-inline-end: 0'] },
  margin: { start: ['margin-inline-start: 0'], end: ['margin-inline-end: 0'] },
  border: { start: ['border-inline-start: none'], end: ['border-inline-end: none'] },
  borderRadius: {
    start: ['border-start-start-radius: 0', 'border-end-start-radius: 0'],
    end: ['border-start-end-radius: 0', 'border-end-end-radius: 0'],
  },
};

/** Whether a CSS value carries a priority, with or without a space before the `!`. */
function isImportant(value: string | number): boolean {
  return /!\s*important\s*$/i.test(String(value));
}

/**
 * The class-name part of a registered type, as the editor writes it in an annotation's classes. The
 * regex replaces unexpected characters with hyphens to ensure class names are acceptable. Note that
 * the regex could result in consecutive and/or trailing hyphens.
 */
function classType(typeName: string): string {
  return `external-${typeName.replace(/[^a-zA-Z0-9-]/g, '-')}`;
}

/** One CSS rule, or nothing for no declarations. */
function cssRule(selector: string, declarations: string[]): string | undefined {
  return declarations.length > 0 ? `${selector} {\n${declarations.join('\n')}\n}` : undefined;
}

/**
 * Convert the registered annotation styles to CSS rules. Every property goes on its type's base
 * rule exactly as the host wrote it, and the box properties (`border`, `borderRadius`, `padding`,
 * `margin`) also get override rules that remove the sides that do not belong on an element which is
 * not an edge of the annotation, so an annotation spanning several elements (a verse number and the
 * text after it, text on both sides of a char span's edge) draws one box rather than one per
 * element:
 *
 * - An element that is not the first loses its inline-start padding, margin, border and the two start
 *   corners' radii.
 * - An element that is not the last loses the inline-end equivalents.
 *
 * Removing sides, rather than splitting the value, works for any value form: a `var()`, three or
 * four values, an elliptical radius, a priority. A host value with `!important` gets an override
 * with `!important` too.
 *
 * The overrides do not outrank anything a base rule would not: each has the base rule's specificity
 * (0,1,0) (the `:not()` sits inside `:where()`) and comes after every base rule. So a stylesheet
 * rule that outranks a base rule (the formatted views' `.text-spacing .verse` spacing) also
 * outranks the override, and an element keeps a side that is the matching edge of any registered
 * annotation setting the same property: an override for a side skips every element carrying that
 * edge class of any type with that box property, not only its own. Where two such annotations paint
 * one element, that element shows one value per property, the base rule registered later.
 *
 * An annotation that paints one element carries both edge classes, so nothing is removed and it is
 * drawn exactly as the style reads. A middle element loses both inline sides. An element no edge
 * class is put on (a gutter glyph beside other painted elements, the content of a collapsed note)
 * keeps only the block sides. Logical properties put the start on the right in right-to-left text.
 */
function stylesheetRules(entries: AnnotationStyleEntry[]): string[] {
  const bases: (string | undefined)[] = [];
  const overrides: (string | undefined)[] = [];

  entries.forEach(({ typeName, definition }) => {
    const base = `.editor-typed-mark-${classType(typeName)}`;
    const every: string[] = [];
    Object.entries(definition).forEach(([key, value]) => {
      if (value === undefined) return;
      every.push(declaration(toKebabCase(key), value));
    });
    bases.push(cssRule(base, every));

    SIDES.forEach(({ side, edgeClass }) => {
      // The overrides of one side, grouped by the edge classes that exempt an element from them.
      const removedByExemptions = new Map<string, string[]>();
      BOX_PROPERTIES.forEach((key) => {
        const value = definition[key];
        if (value === undefined) return;
        const exemptions = entries
          .filter((entry) => entry.definition[key] !== undefined)
          .map((entry) => `.${edgeClass}-${classType(entry.typeName)}`)
          .join(', ');
        const priority = isImportant(value) ? ' !important' : '';
        const removed = removedByExemptions.get(exemptions) ?? [];
        removed.push(
          ...REMOVED_SIDES[key][side].map((sideRemoved) => `  ${sideRemoved}${priority};`),
        );
        removedByExemptions.set(exemptions, removed);
      });
      removedByExemptions.forEach((removed, exemptions) =>
        overrides.push(cssRule(`${base}:where(:not(${exemptions}))`, removed)),
      );
    });
  });

  return [...bases, ...overrides].filter((rule) => rule !== undefined);
}

/**
 * Data provider engine for managing annotation styles. Converts style objects to CSS stylesheets
 * that can be injected into the editor.
 */
export class AnnotationStyleDataProviderEngine
  extends DataProviderEngine<AnnotationStyleDataProviderDataTypes>
  implements IDataProviderEngine<AnnotationStyleDataProviderDataTypes>
{
  readonly #styleEntriesByName = new Map<string, AnnotationStyleEntry>();
  #latestStylesheet: string | undefined;

  async registerAnnotationStyle<T extends string>(
    typeName: KebabCase<T>,
    styleProperties: AnnotationStyleProperties,
  ): Promise<AnnotationStyleNonce> {
    if (!typeName) throw new Error('Annotation style name must be a non-empty string');
    if (this.#styleEntriesByName.has(typeName))
      throw new Error(`Annotation style with type "${typeName}" is already registered.`);

    const nonce = newGuid();
    this.#styleEntriesByName.set(typeName, { nonce, typeName, definition: styleProperties });
    logger.debug(
      `Annotation style registered: type="${typeName}", nonce="${nonce}", styles=${JSON.stringify(styleProperties)}`,
    );

    this.#latestStylesheet = undefined;
    this.notifyUpdate(['AnnotationStylesheet']);
    return nonce;
  }

  async deleteAnnotationStyle(nonce: AnnotationStyleNonce): Promise<boolean> {
    const entry = [...this.#styleEntriesByName.values()].find((e) => e.nonce === nonce);
    if (!entry) {
      logger.warn(`Attempted to delete annotation style with unknown nonce: "${nonce}"`);
      return false;
    }

    this.#styleEntriesByName.delete(entry.typeName);
    logger.debug(`Annotation style deleted for type="${entry.typeName}", nonce="${nonce}"`);

    this.#latestStylesheet = undefined;
    this.notifyUpdate(['AnnotationStylesheet']);
    return true;
  }

  async getAnnotationStylesheet(): Promise<string> {
    if (this.#latestStylesheet) return this.#latestStylesheet;

    // Rules targeting the class names the editor paints an annotation of each type with: one on
    // every element it paints, and the overrides its first and last element are exempt from. These
    // need to keep up with the editor's annotation class names. See the annotation documentation:
    // https://github.com/paranext/scripture-editors/tree/main/packages/platform#annotation-styles
    const cssRules = stylesheetRules([...this.#styleEntriesByName.values()]);

    this.#latestStylesheet = cssRules.join('\n\n');
    return this.#latestStylesheet;
  }

  // setAnnotationStylesheet doesn't use instance state but cannot be static because it implements
  // the IDataProviderEngine<AnnotationStyleDataProviderDataTypes> interface
  // eslint-disable-next-line @typescript-eslint/class-methods-use-this
  async setAnnotationStylesheet(): Promise<
    DataProviderUpdateInstructions<AnnotationStyleDataProviderDataTypes>
  > {
    throw new Error('Annotation stylesheet is read-only. Cannot set stylesheet directly.');
  }
}

export default AnnotationStyleDataProviderEngine;
