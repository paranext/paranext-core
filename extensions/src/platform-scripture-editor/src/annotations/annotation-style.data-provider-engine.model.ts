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

/** The declarations of the rules a registered style becomes. */
type StyleDeclarations = {
  /** On every element the annotation paints, exactly as the host wrote them. */
  every: string[];
  /** Removes the inline-start sides from an element the annotation's first element is not. */
  notStart: string[];
  /** Removes the inline-end sides from an element the annotation's last element is not. */
  notEnd: string[];
};

/** The box properties whose inline sides are removed from elements that are not an edge. */
const BOX_PROPERTIES = ['padding', 'margin', 'border', 'borderRadius'] as const;

/** The declarations that zero one box property's inline-start and inline-end sides. */
const REMOVED_SIDES: Record<(typeof BOX_PROPERTIES)[number], { start: string[]; end: string[] }> = {
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
 * Convert annotation style properties to CSS declarations. Every property goes on the base rule
 * exactly as the host wrote it, and the box properties (`border`, `borderRadius`, `padding`,
 * `margin`) also get two override rules that remove the sides that do not belong on an element
 * which is not an edge of the annotation, so an annotation spanning several elements (a verse
 * number and the text after it, text on both sides of a char span's edge) draws one box rather than
 * one per element:
 *
 * - An element that is not the first loses its inline-start padding, margin, border and the two start
 *   corners' radii.
 * - An element that is not the last loses the inline-end equivalents.
 *
 * Removing sides, rather than splitting the value, works for any value form: a `var()`, three or
 * four values, an elliptical radius, a priority. A host value with `!important` gets an override
 * with `!important` too, and the override's selector (`:not()` adds a class, so specificity
 * (0,2,0)) outranks the base rule's (0,1,0) when both are important.
 *
 * An annotation that paints one element carries both edge classes, so nothing is removed and it is
 * drawn exactly as the style reads. A middle element loses both inline sides. An element no edge
 * class is put on (a gutter glyph beside other painted elements, the content of a collapsed note)
 * keeps only the block sides. Logical properties put the start on the right in right-to-left text.
 */
function stylesToCss(properties: AnnotationStyleProperties): StyleDeclarations {
  const every: string[] = [];
  const notStart: string[] = [];
  const notEnd: string[] = [];

  Object.entries(properties).forEach(([key, value]) => {
    if (value === undefined) return;
    every.push(declaration(toKebabCase(key), value));
  });

  BOX_PROPERTIES.forEach((key) => {
    const value = properties[key];
    if (value === undefined) return;
    const priority = isImportant(value) ? ' !important' : '';
    const { start, end } = REMOVED_SIDES[key];
    notStart.push(...start.map((removed) => `  ${removed}${priority};`));
    notEnd.push(...end.map((removed) => `  ${removed}${priority};`));
  });

  return { every, notStart, notEnd };
}

/** Storage for annotation styles with their nonces and definitions. */
type AnnotationStyleEntry = {
  nonce: AnnotationStyleNonce;
  typeName: string;
  definition: AnnotationStyleProperties;
};

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

    const cssRules: string[] = [];

    // Generate CSS rules for each registered annotation style
    [...this.#styleEntriesByName.values()].forEach((entry) => {
      const { typeName, definition } = entry;
      const { every, notStart, notEnd } = stylesToCss(definition);

      // Rules targeting the class names the editor paints an annotation of this type with: one on
      // every element it paints, and one each on its first and last element, which the override
      // rules exclude. These need to keep up
      // with the editor's annotation class names. See the annotation documentation:
      // https://github.com/paranext/scripture-editors/tree/main/packages/platform#annotation-styles
      // The regex replaces unexpected characters with hyphens to ensure class names are acceptable
      // Note that the regex could result in consecutive and/or trailing hyphens
      const type = `external-${typeName.replace(/[^a-zA-Z0-9-]/g, '-')}`;
      const base = `.editor-typed-mark-${type}`;
      const rule = (selector: string, declarations: string[]) => {
        if (declarations.length > 0) cssRules.push(`${selector} {\n${declarations.join('\n')}\n}`);
      };
      rule(base, every);
      rule(`${base}:not(.editor-typed-markStart-${type})`, notStart);
      rule(`${base}:not(.editor-typed-markEnd-${type})`, notEnd);
    });

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
