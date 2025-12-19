import { DataProviderEngine, logger } from '@papi/backend';
import type { DataProviderUpdateInstructions, IDataProviderEngine } from '@papi/core';
import type {
  AnnotationStyleDataProviderDataTypes,
  AnnotationStyleNonce,
  AnnotationStyleProperties,
} from 'platform-scripture-editor';
import { KebabCase, newGuid, toKebabCase } from 'platform-bible-utils';

/**
 * Convert annotation style properties to CSS property declarations.
 *
 * @param properties Annotation style properties object
 * @returns CSS property declarations as a string
 */
function stylesToCss(properties: AnnotationStyleProperties): string {
  const cssLines: string[] = [];

  Object.entries(properties).forEach(([key, value]) => {
    if (value === undefined) return;

    const cssProperty = toKebabCase(key);
    cssLines.push(`  ${cssProperty}: ${value};`);
  });

  return cssLines.join('\n');
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
      const cssProperties = stylesToCss(definition);
      if (!cssProperties) return;

      // Create a CSS rule targeting elements with the annotation type as a class
      // e.g., .annotation-type-spelling-error { ... }
      // The regex replaces unexpected characters with hyphens to ensure class names are acceptable
      // Note that the regex could result in consecutive and/or trailing hyphens
      const className = `annotation-type-${typeName.replace(/[^a-zA-Z0-9-]/g, '-')}`;
      cssRules.push(`.${className} {\n${cssProperties}\n}`);
    });

    this.#latestStylesheet = cssRules.join('\n\n');
    return this.#latestStylesheet;
  }

  // eslint-disable-next-line @typescript-eslint/class-methods-use-this
  async setAnnotationStylesheet(): Promise<
    DataProviderUpdateInstructions<AnnotationStyleDataProviderDataTypes>
  > {
    throw new Error('Annotation stylesheet is read-only. Cannot set stylesheet directly.');
  }
}

export default AnnotationStyleDataProviderEngine;
