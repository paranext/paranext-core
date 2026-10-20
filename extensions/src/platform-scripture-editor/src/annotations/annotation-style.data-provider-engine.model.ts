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

/**
 * The whitespace-separated values of a CSS shorthand, with a parenthesized value (`var(--gap)`,
 * `calc(1px + 2px)`) kept whole.
 */
function shorthandValues(value: string): string[] {
  const values: string[] = [];
  let depth = 0;
  let current = '';
  [...value.trim()].forEach((character) => {
    if (character === '(') depth += 1;
    if (character === ')') depth -= 1;
    if (depth === 0 && /\s/.test(character)) {
      if (current) values.push(current);
      current = '';
    } else current += character;
  });
  if (current) values.push(current);
  return values;
}

/** The declarations of the three rules a registered style becomes. */
type EdgeDeclarations = {
  /** On every element the annotation paints. */
  every: string[];
  /** On the first element it paints only. */
  start: string[];
  /** On the last element it paints only. */
  end: string[];
};

/**
 * Convert annotation style properties to CSS declarations, splitting the box properties across the
 * elements an annotation paints so that one spanning several elements (a verse number and the text
 * after it, text on both sides of a char span's edge) draws one box rather than one per element:
 *
 * - `border`: the block sides on every element, the inline-start side on the first and the inline-end
 *   side on the last.
 * - `borderRadius` with one value: the two start corners on the first element and the two end corners
 *   on the last. Several values or an elliptical `/` form stay on every element.
 * - `padding` and `margin` with one or two values: the block part on every element, the inline part
 *   on the first element's start and the last element's end. Three or four values stay on every
 *   element.
 *
 * An annotation that paints one element gets all three rules, so it is drawn as the unsplit style
 * draws it. Logical properties put the start on the right in right-to-left text.
 */
function stylesToCss(properties: AnnotationStyleProperties): EdgeDeclarations {
  const every: string[] = [];
  const start: string[] = [];
  const end: string[] = [];

  Object.entries(properties).forEach(([key, value]) => {
    if (value === undefined) return;
    const cssProperty = toKebabCase(key);
    const values = shorthandValues(String(value));

    if (key === 'border') {
      every.push(declaration('border-block', value));
      start.push(declaration('border-inline-start', value));
      end.push(declaration('border-inline-end', value));
      return;
    }
    if (key === 'borderRadius' && values.length === 1 && !values[0].includes('/')) {
      start.push(
        declaration('border-start-start-radius', value),
        declaration('border-end-start-radius', value),
      );
      end.push(
        declaration('border-start-end-radius', value),
        declaration('border-end-end-radius', value),
      );
      return;
    }
    if ((key === 'padding' || key === 'margin') && values.length <= 2) {
      const [block, inline = block] = values;
      every.push(declaration(`${cssProperty}-block`, block));
      start.push(declaration(`${cssProperty}-inline-start`, inline));
      end.push(declaration(`${cssProperty}-inline-end`, inline));
      return;
    }
    every.push(declaration(cssProperty, value));
  });

  return { every, start, end };
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
      const { every, start, end } = stylesToCss(definition);

      // Rules targeting the class names the editor paints an annotation of this type with: one on
      // every element it paints, and one each on its first and last element. These need to keep up
      // with the editor's annotation class names. See the annotation documentation:
      // https://github.com/paranext/scripture-editors/tree/main/packages/platform#annotation-styles
      // The regex replaces unexpected characters with hyphens to ensure class names are acceptable
      // Note that the regex could result in consecutive and/or trailing hyphens
      const type = `external-${typeName.replace(/[^a-zA-Z0-9-]/g, '-')}`;
      const rule = (prefix: string, declarations: string[]) => {
        if (declarations.length > 0)
          cssRules.push(`.${prefix}-${type} {\n${declarations.join('\n')}\n}`);
      };
      rule('editor-typed-mark', every);
      rule('editor-typed-markStart', start);
      rule('editor-typed-markEnd', end);
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
