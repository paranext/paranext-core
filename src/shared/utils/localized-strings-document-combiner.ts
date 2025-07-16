import {
  LocalizedStringDeprecationInfo,
  DocumentCombiner,
  JsonDocumentLike,
  LanguageStrings,
  LocalizeKey,
  LocalizedStringDataContribution,
  isLocalizeKey,
  isString,
  localizedStringsDocumentSchema,
} from 'platform-bible-utils';
import Ajv2020 from 'ajv/dist/2020';
import { PLATFORM_NAMESPACE } from '@shared/data/platform.data';
import { logger } from '@shared/services/logger.service';

/** Map from localized string key to deprecation message for that string if one exists */
type StringsDeprecationInfo = { [key: LocalizeKey]: LocalizedStringDeprecationInfo | undefined };

// #region Helper functions

const ajv = new Ajv2020();
const validate = ajv.compile(localizedStringsDocumentSchema);

function performSchemaValidation(document: JsonDocumentLike, docType: string): void {
  if (!validate(document))
    throw new Error(
      `Invalid ${docType} localized strings document: ${ajv.errorsText(validate.errors)}`,
    );
}

/** Modifies the input localized string contribution by canonizing the locales */
export function transformLocalizedStringDataToCanonicalLocales(
  stringData: LocalizedStringDataContribution,
): LocalizedStringDataContribution {
  if (!stringData.localizedStrings) return stringData;

  return {
    ...stringData,
    localizedStrings: Object.fromEntries(
      Object.entries(stringData.localizedStrings).map(([locale, langStrings]) => [
        Intl.getCanonicalLocales(locale)[0],
        langStrings,
      ]),
    ),
  };
}

function gatherDeprecationInfo(document: LocalizedStringDataContribution) {
  const deprecationInfo: StringsDeprecationInfo = {};

  if (!document.metadata) return deprecationInfo;

  Object.entries(document.metadata).forEach(([key, metadata]) => {
    if (metadata.deprecationInfo) {
      // Object.entries is not preserving that key is a LocalizeKey
      // eslint-disable-next-line no-type-assertion/no-type-assertion
      deprecationInfo[key as LocalizeKey] = metadata.deprecationInfo;
    }
  });

  return deprecationInfo;
}

// #endregion

/** Combines Localized String contributions. Normalizes locales to BCP 47 form */
export class LocalizedStringsDocumentCombiner extends DocumentCombiner {
  /** Map from localized string key to deprecation message for that string if one exists */
  deprecatedStringsByKey: StringsDeprecationInfo = {};

  constructor(baseDocument: JsonDocumentLike) {
    super(baseDocument, { copyDocuments: false, ignoreDuplicateProperties: true });

    const rebuildDeprecationInfo = () => {
      this.deprecatedStringsByKey = gatherDeprecationInfo(this.getLocalizedStringData());
    };

    rebuildDeprecationInfo();
    // on rebuild, update deprecation info
    this.onDidRebuild(rebuildDeprecationInfo);
  }

  /**
   * Get the current set of localized string contributions given all the input documents.
   *
   * NOTE: If the input documents might have changed since the last time the localized string
   * contributions were retrieved, you can call `rebuild` to incorporate those document changes
   * before calling this getter. For example, if one of the input document objects changed and
   * `addOrUpdateContribution` wasn't called explicitly, those document changes will not be seen in
   * the current set of localized string contributions. If all the input documents are static, then
   * there is no need to ever rebuild once all the documents have been contributed to this
   * combiner.
   *
   * @param locale Optionally specify a locale to get the language strings for just that locale.
   *   Internally converted to BCP 47
   */
  getLocalizedStringData(): LocalizedStringDataContribution;
  // This is an overload
  // eslint-disable-next-line no-dupe-class-members
  getLocalizedStringData(locale: string): LanguageStrings | undefined;
  // This is the implementation of an overloaded method
  // eslint-disable-next-line no-dupe-class-members
  getLocalizedStringData<T extends string | undefined>(
    locale?: T,
  ): T extends string ? LanguageStrings | undefined : LocalizedStringDataContribution {
    if (!this.latestOutput)
      // TypeScript seems too dense to understand this is literally exactly the return signature
      // eslint-disable-next-line no-type-assertion/no-type-assertion
      return (locale ? undefined : {}) as T extends string
        ? LanguageStrings | undefined
        : LocalizedStringDataContribution;

    // All our validation and stuff was to make this the case
    // eslint-disable-next-line no-type-assertion/no-type-assertion
    const localizedStringData = this.latestOutput as LocalizedStringDataContribution;

    // TypeScript seems to dense to understand this is literally exactly the return signature
    // eslint-disable-next-line no-type-assertion/no-type-assertion
    return (
      locale && isString(locale)
        ? localizedStringData.localizedStrings?.[Intl.getCanonicalLocales(locale)[0]]
        : localizedStringData
    ) as T extends string ? LanguageStrings | undefined : LocalizedStringDataContribution;
  }

  override addOrUpdateContribution(documentName: string, document: JsonDocumentLike) {
    // Log a warning if someone adds a localization to an existing deprecated string before adding
    // that extension's strings

    // We will verify everything we need to use
    // eslint-disable-next-line no-type-assertion/no-type-assertion
    const contribution = document as LocalizedStringDataContribution;

    if (
      typeof contribution === 'object' &&
      !Array.isArray(contribution) &&
      // Testing null to make sure we don't try to iterate over null
      // eslint-disable-next-line no-null/no-null
      contribution !== null &&
      typeof contribution.localizedStrings === 'object' &&
      !Array.isArray(contribution.localizedStrings) &&
      // Testing null to make sure we don't try to iterate over null
      // eslint-disable-next-line no-null/no-null
      contribution !== null
    ) {
      Object.entries(contribution.localizedStrings).forEach(([language, strings]) => {
        // Testing null to make sure we don't try to iterate over null
        // eslint-disable-next-line no-null/no-null
        if (typeof strings !== 'object' || Array.isArray(strings) || strings === null) return;
        Object.keys(strings).forEach((localizeKey) => {
          if (!isString(localizeKey) || !isLocalizeKey(localizeKey)) return;
          const deprecationInfo = this.deprecatedStringsByKey[localizeKey];
          if (deprecationInfo) {
            logger.warn(
              `Extension ${documentName} added a localization in ${language} to LocalizeKey ${localizeKey} deprecated ${deprecationInfo.date}: ${deprecationInfo.message}`,
            );
          }
        });
      });
    }

    return super.addOrUpdateContribution(documentName, document);
  }

  protected override validateBaseDocument(baseDocument: JsonDocumentLike): void {
    performSchemaValidation(baseDocument, PLATFORM_NAMESPACE);
  }

  protected override transformBaseDocumentAfterValidation(
    baseDocument: JsonDocumentLike,
  ): JsonDocumentLike {
    return transformLocalizedStringDataToCanonicalLocales(
      // We validated that this is true
      // eslint-disable-next-line no-type-assertion/no-type-assertion
      baseDocument as LocalizedStringDataContribution,
    );
  }

  protected override validateContribution(_documentName: string, document: JsonDocumentLike): void {
    performSchemaValidation(document, PLATFORM_NAMESPACE);
  }

  protected override transformContributionAfterValidation(
    _documentName: string,
    document: JsonDocumentLike,
  ): JsonDocumentLike {
    return transformLocalizedStringDataToCanonicalLocales(
      // We validated that this is true
      // eslint-disable-next-line no-type-assertion/no-type-assertion
      document as LocalizedStringDataContribution,
    );
  }

  protected override validateOutput(output: JsonDocumentLike): void {
    performSchemaValidation(output, 'output');
  }
}

export default LocalizedStringsDocumentCombiner;
