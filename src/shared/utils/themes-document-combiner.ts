import {
  DocumentCombiner,
  endsWith,
  ensureArray,
  JsonDocumentLike,
  slice,
  THEME_SUFFIX_DARK,
  THEME_SUFFIX_LIGHT,
  ThemeContribution,
  ThemeData,
  ThemeDataPartial,
  themeDocumentSchema,
} from 'platform-bible-utils';
import Ajv2020 from 'ajv/dist/2020';
import { PLATFORM_NAMESPACE } from '@shared/data/platform.data';

/** {@link ThemeData} with some extra information to help with managing the theme */
export type ThemeDataExpanded = ThemeData & {
  /**
   * Id of the theme this theme is paired with (light/dark). Used for flipping the theme. No pair if
   * `undefined`
   */
  pairId: string | undefined;
};

/**
 * {@link ThemeDataExpanded} mapped by theme id. All extensions' theme contributions are combined and
 * aggregated into one of these
 */
export type AllThemeData = { [themeId: string]: ThemeDataExpanded | undefined };

// #region Helper functions

const ajv = new Ajv2020();
const validate = ajv.compile(themeDocumentSchema);

function performSchemaValidation(document: JsonDocumentLike, docType: string): void {
  if (!validate(document))
    throw new Error(`Invalid ${docType} theme document: ${ajv.errorsText(validate.errors)}`);
}

function getThemePair(themeData: ThemeData, themesData: ThemeData[]): ThemeData | undefined {
  let pairId = '';
  if (themeData.id === 'light') pairId = 'dark';
  else if (themeData.id === 'dark') pairId = 'light';
  else if (themeData.type === 'light') {
    pairId = endsWith(themeData.id, THEME_SUFFIX_LIGHT)
      ? `${slice(themeData.id, 0, -THEME_SUFFIX_LIGHT.length)}${THEME_SUFFIX_DARK}`
      : `${themeData.id}${THEME_SUFFIX_DARK}`;
  } else if (themeData.type === 'dark') {
    pairId = endsWith(themeData.id, THEME_SUFFIX_DARK)
      ? `${slice(themeData.id, 0, -THEME_SUFFIX_DARK.length)}${THEME_SUFFIX_LIGHT}`
      : `${themeData.id}${THEME_SUFFIX_LIGHT}`;
  }

  if (pairId) return themesData.find((themeDataToPair) => themeDataToPair.id === pairId);

  return undefined;
}

function transformThemeDataPartialToThemeData(themeDataPartial: ThemeDataPartial): ThemeData {
  return {
    type: endsWith(themeDataPartial.id, THEME_SUFFIX_DARK) ? 'dark' : 'light',
    ...themeDataPartial,
  };
}

function transformThemeContributionToAllThemeData(contribution: ThemeContribution): AllThemeData {
  const themesData = ensureArray(contribution).map(transformThemeDataPartialToThemeData);
  const allThemeData: AllThemeData = {};

  themesData.forEach((themeData) => {
    // If the theme is already added as a pair of another theme, don't need to re-add it
    if (allThemeData[themeData.id]) return;

    const themePair = getThemePair(themeData, themesData);

    allThemeData[themeData.id] = {
      ...themeData,
      pairId: themePair?.id,
    };

    if (!themePair) return;

    allThemeData[themePair.id] = {
      ...themePair,
      pairId: themeData.id,
    };
  });

  return allThemeData;
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
  getAllThemeData(): AllThemeData | undefined {
    if (!this.latestOutput) return undefined;

    // All our validation and stuff was to make this the case
    // eslint-disable-next-line no-type-assertion/no-type-assertion
    return this.latestOutput as AllThemeData;
  }

  protected override validateBaseDocument(baseDocument: JsonDocumentLike): void {
    performSchemaValidation(baseDocument, PLATFORM_NAMESPACE);
  }

  protected override transformBaseDocumentAfterValidation(
    baseDocument: JsonDocumentLike,
  ): JsonDocumentLike {
    return transformThemeContributionToAllThemeData(
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
    return transformThemeContributionToAllThemeData(
      // We validated that this is true
      // eslint-disable-next-line no-type-assertion/no-type-assertion
      document as ThemeContribution,
    );
  }

  protected override validateOutput(): void {
    // We already validated input documents and built the output ourselves, so we don't have any more
    // validating to do. Unless someday we want to double check we have a properly formatted
    // `AllThemeData`
  }
}
