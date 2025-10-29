declare module 'annotation-style.data-provider' {
  // @ts-ignore: TS2307 - Cannot find module '@papi/core' or its corresponding type declarations
  import type { DataProviderDataType, IDataProvider } from '@papi/core';
  import type { KebabCase } from 'platform-bible-utils';

  /**
   * CSS-like style properties for annotations. This is a constrained subset of CSS that allows
   * extensions to define custom annotation styles while supporting theme variables.
   *
   * Supports CSS custom properties (e.g., `var(--primary)`) for theme-aware styling.
   */
  export type AnnotationStyleProperties = {
    /**
     * Background color. Supports CSS color values including theme variables.
     *
     * @example 'yellow'
     *
     * @example 'rgba(255, 255, 0, 0.3)'
     *
     * @example 'hsl(var(--accent))'
     */
    backgroundColor?: string;

    /**
     * Border style.
     *
     * @example '1px solid red'
     *
     * @example '2px dashed hsl(var(--border))'
     */
    border?: string;

    /**
     * Border radius for rounded corners.
     *
     * @example '4px'
     *
     * @example '0.25rem'
     */
    borderRadius?: string;

    /**
     * Text color. Supports CSS color values including theme variables.
     *
     * @example 'red'
     *
     * @example '#ff0000'
     *
     * @example 'hsl(var(--primary))'
     *
     * @example 'var(--destructive)'
     */
    color?: string;

    /**
     * Cursor style when hovering over annotated text.
     *
     * @example 'pointer'
     *
     * @example 'help'
     */
    cursor?: string;

    /**
     * Font style.
     *
     * @example 'italic'
     *
     * @example 'oblique'
     */
    fontStyle?: string;

    /**
     * Font weight (normal, bold, or numeric values 100-900).
     *
     * @example 'bold'
     *
     * @example '600'
     */
    fontWeight?: string | number;

    /**
     * Margin.
     *
     * @example '2px'
     *
     * @example '0.25rem 0.5rem'
     */
    margin?: string;

    /**
     * Opacity (0 to 1).
     *
     * @example 0.5
     *
     * @example '0.8'
     */
    opacity?: string | number;

    /**
     * Padding.
     *
     * @example '2px'
     *
     * @example '0.25rem 0.5rem'
     */
    padding?: string;

    /**
     * Text decoration color. Supports CSS color values including theme variables.
     *
     * @example 'red'
     *
     * @example 'hsl(var(--destructive))'
     */
    textDecorationColor?: string;

    /**
     * Text decoration line (underline, overline, line-through, or combinations).
     *
     * @example 'underline'
     *
     * @example 'underline wavy'
     *
     * @example 'line-through'
     */
    textDecorationLine?: string;

    /**
     * Text decoration style (solid, double, dotted, dashed, wavy).
     *
     * @example 'wavy'
     *
     * @example 'dotted'
     */
    textDecorationStyle?: string;

    /**
     * Text decoration thickness.
     *
     * @example '2px'
     *
     * @example '0.1em'
     */
    textDecorationThickness?: string;
  };

  /**
   * A nonce (unique identifier) returned when setting an annotation style, used for deleting that
   * style later.
   */
  export type AnnotationStyleNonce = string;

  /** Data types for the annotation style data provider. */
  export type AnnotationStyleDataProviderDataTypes = {
    /** Complete CSS stylesheet containing all registered annotation styles. */
    AnnotationStylesheet: DataProviderDataType<undefined, string, never>;
  };

  /** Custom methods for the annotation style data provider. */
  export type AnnotationStyleDataProviderMethods = {
    /**
     * Register a new annotation style or update an existing one.
     *
     * Note that if the same `typeName` is used again, it will throw an error. Each annotation style
     * must have a unique `typeName`. To update an existing style, delete it first using its nonce
     * and then register the new style.
     *
     * @example
     *
     * ```typescript
     * const nonce = await annotationStyleDataProvider.registerAnnotationStyle(
     *   'spelling-error',
     *   {
     *     textDecorationLine: 'underline',
     *     textDecorationStyle: 'wavy',
     *     textDecorationColor: 'hsl(var(--destructive))',
     *     cursor: 'pointer',
     *   },
     * );
     * ```
     *
     * @param typeName A unique name for the annotation style type. This should be in kebab-case
     *   (lowercase letters and hyphens only) to ensure valid CSS class naming.
     * @param definition The annotation style definition containing style properties
     * @returns A nonce (unique identifier) that can be used to delete this style later
     */
    registerAnnotationStyle<T extends string>(
      typeName: KebabCase<T>,
      definition: AnnotationStyleProperties,
    ): Promise<AnnotationStyleNonce>;

    /**
     * Delete an annotation style using its nonce.
     *
     * @example
     *
     * ```typescript
     * const deleted = await annotationStyleDataProvider?.deleteAnnotationStyle(nonce);
     * if (deleted) {
     *   console.debug('Annotation style successfully deleted');
     * } else {
     *   console.warn('Annotation style not found');
     * }
     * ```
     *
     * @param nonce The nonce returned from registerAnnotationStyle
     * @returns True if the style was successfully deleted, false if the nonce was not found
     */
    deleteAnnotationStyle(nonce: AnnotationStyleNonce): Promise<boolean>;

    /**
     * Provides all registered annotation styles in stylesheet form
     *
     * @example
     *
     * ```typescript
     * const stylesheet = await annotationStyleDataProvider.getAnnotationStylesheet();
     * console.log('Current annotation styles stylesheet:', stylesheet);
     * ```
     *
     * @returns Complete CSS stylesheet containing all registered annotation styles
     */
    getAnnotationStylesheet(): Promise<string>;
  };

  /**
   * Data provider for managing annotation styles. Allows extensions to register custom annotation
   * styles that are converted to CSS stylesheets for use in the editor.
   */
  export type AnnotationStyleDataProvider = IDataProvider<AnnotationStyleDataProviderDataTypes> &
    AnnotationStyleDataProviderMethods;
}

declare module 'papi-shared-types' {
  import type { AnnotationStyleDataProvider } from 'annotation-style.data-provider';

  export interface DataProviders {
    'platformScriptureEditor.annotationStyle': AnnotationStyleDataProvider;
  }
}
