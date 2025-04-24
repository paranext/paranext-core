import {
  DocumentCombiner,
  endsWith,
  ensureArray,
  JsonDocumentLike,
  slice,
  THEME_SUFFIX_DARK,
  THEME_SUFFIX_LIGHT,
  ThemeContribution,
  ThemeDefinition,
  ThemeDefinitionPartial,
  themeDocumentSchema,
} from 'platform-bible-utils';
import Ajv2020 from 'ajv/dist/2020';
import { PLATFORM_NAMESPACE } from '@shared/data/platform.data';

/** {@link ThemeDefinition} with some extra information to help with managing the theme */
export type ThemeDefinitionExpanded = ThemeDefinition & {
  /**
   * Id of the theme this theme is paired with (light/dark). Used for flipping the theme. No pair if
   * `undefined`
   */
  pairId: string | undefined;
};

/**
 * {@link ThemeDefinitionExpanded} mapped by theme id. All extensions' theme contributions are
 * combined and aggregated into one of these
 */
export type ThemeDefinitionsById = { [themeId: string]: ThemeDefinitionExpanded | undefined };

// #region Helper functions

const ajv = new Ajv2020();
const validate = ajv.compile(themeDocumentSchema);

function performSchemaValidation(document: JsonDocumentLike, docType: string): void {
  if (!validate(document))
    throw new Error(`Invalid ${docType} theme document: ${ajv.errorsText(validate.errors)}`);
}

function getThemePair(
  themeDefinition: ThemeDefinition,
  themesData: ThemeDefinition[],
): ThemeDefinition | undefined {
  let pairId = '';
  if (themeDefinition.id === 'light') pairId = 'dark';
  else if (themeDefinition.id === 'dark') pairId = 'light';
  else if (themeDefinition.type === 'light') {
    pairId = endsWith(themeDefinition.id, THEME_SUFFIX_LIGHT)
      ? `${slice(themeDefinition.id, 0, -THEME_SUFFIX_LIGHT.length)}${THEME_SUFFIX_DARK}`
      : `${themeDefinition.id}${THEME_SUFFIX_DARK}`;
  } else if (themeDefinition.type === 'dark') {
    pairId = endsWith(themeDefinition.id, THEME_SUFFIX_DARK)
      ? `${slice(themeDefinition.id, 0, -THEME_SUFFIX_DARK.length)}${THEME_SUFFIX_LIGHT}`
      : `${themeDefinition.id}${THEME_SUFFIX_LIGHT}`;
  }

  if (pairId)
    return themesData.find((themeDefinitionToPair) => themeDefinitionToPair.id === pairId);

  return undefined;
}

function transformThemeDefinitionPartialToThemeDefinition(
  themeDefinitionPartial: ThemeDefinitionPartial,
): ThemeDefinition {
  return {
    type: endsWith(themeDefinitionPartial.id, THEME_SUFFIX_DARK) ? 'dark' : 'light',
    ...themeDefinitionPartial,
  };
}

function transformThemeContributionToThemeDefinitionsById(
  contribution: ThemeContribution,
): ThemeDefinitionsById {
  const themesData = ensureArray(contribution).map(
    transformThemeDefinitionPartialToThemeDefinition,
  );
  const themeDefinitionsById: ThemeDefinitionsById = {};

  themesData.forEach((themeDefinition) => {
    // If the theme is already added as a pair of another theme, don't need to re-add it
    if (themeDefinitionsById[themeDefinition.id]) return;

    const themePair = getThemePair(themeDefinition, themesData);

    themeDefinitionsById[themeDefinition.id] = {
      ...themeDefinition,
      pairId: themePair?.id,
    };

    if (!themePair) return;

    themeDefinitionsById[themePair.id] = {
      ...themePair,
      pairId: themeDefinition.id,
    };
  });

  return themeDefinitionsById;
}

// #endregion

/** Combines Theme contributions */
export class ThemesDocumentCombiner extends DocumentCombiner {
  constructor(baseDocument: JsonDocumentLike) {
    super(baseDocument, { copyDocuments: false, ignoreDuplicateProperties: false });
  }

  /**
   * Get the current set of all theme data based on theme contributions given all the input
   * documents. Localized string keys have not been localized to corresponding strings.
   *
   * NOTE: If the input documents might have changed since the last time the theme contributions
   * were retrieved, you can call `rebuild` to incorporate those document changes before calling
   * this getter. For example, if one of the input document objects changed and
   * `addOrUpdateContribution` wasn't called explicitly, those document changes will not be seen in
   * the current set of theme contributions. If all the input documents are static, then there is no
   * need to ever rebuild once all the documents have been contributed to this combiner.
   */
  getAllThemeDefinitionsById(): ThemeDefinitionsById | undefined {
    if (!this.latestOutput) return undefined;

    // All our validation and stuff was to make this the case
    // eslint-disable-next-line no-type-assertion/no-type-assertion
    return this.latestOutput as ThemeDefinitionsById;
  }

  protected override validateBaseDocument(baseDocument: JsonDocumentLike): void {
    performSchemaValidation(baseDocument, PLATFORM_NAMESPACE);
  }

  protected override transformBaseDocumentAfterValidation(
    baseDocument: JsonDocumentLike,
  ): JsonDocumentLike {
    return transformThemeContributionToThemeDefinitionsById(
      // We validated that this is true
      // eslint-disable-next-line no-type-assertion/no-type-assertion
      baseDocument as ThemeContribution,
    );
  }

  protected override validateContribution(documentName: string, document: JsonDocumentLike): void {
    // Make sure it is a ThemeContribution
    performSchemaValidation(document, documentName);
  }

  protected override transformContributionAfterValidation(
    _documentName: string,
    document: JsonDocumentLike,
  ): JsonDocumentLike {
    return transformThemeContributionToThemeDefinitionsById(
      // We validated that this is true
      // eslint-disable-next-line no-type-assertion/no-type-assertion
      document as ThemeContribution,
    );
  }

  protected override validateOutput(): void {
    // We already validated input documents and built the output ourselves, so we don't have any more
    // validating to do. Unless someday we want to double check we have a properly formatted
    // `AllThemeDefinitionsById`
  }
}
