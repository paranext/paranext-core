import {
  DocumentCombiner,
  JsonDocumentLike,
  LanguageStrings,
  LocalizedStringDataContribution,
  isString,
  localizedStringsDocumentSchema,
} from 'platform-bible-utils';
import Ajv2020 from 'ajv/dist/2020';
import { PLATFORM_NAMESPACE } from '@shared/data/platform.data';

// #region Helper functions

const ajv = new Ajv2020();
const validate = ajv.compile(localizedStringsDocumentSchema);

function performSchemaValidation(document: JsonDocumentLike, docType: string): void {
  if (!validate(document))
    throw new Error(`Invalid ${docType} settings document: ${ajv.errorsText(validate.errors)}`);
}

/** Modifies the input localized string contribution by canonizing the locales */
function transformLocalizedStringDataToCanonicalLocales(
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

// #endregion

/** Combines Localized String contributions. Normalizes locales to BCP 47 form */
export default class LocalizedStringsDocumentCombiner extends DocumentCombiner {
  constructor(baseDocument: JsonDocumentLike) {
    super(baseDocument, { copyDocuments: false, ignoreDuplicateProperties: true });
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
      // TypeScript seems to dense to understand this is literally exactly the return signature
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

  // We don't need `this` on this override method
  // eslint-disable-next-line class-methods-use-this
  protected override validateBaseDocument(baseDocument: JsonDocumentLike): void {
    performSchemaValidation(baseDocument, PLATFORM_NAMESPACE);
  }

  // We don't need `this` on this override method
  // eslint-disable-next-line class-methods-use-this
  protected override transformBaseDocumentAfterValidation(
    baseDocument: JsonDocumentLike,
  ): JsonDocumentLike {
    return transformLocalizedStringDataToCanonicalLocales(
      // We validated that this is true
      // eslint-disable-next-line no-type-assertion/no-type-assertion
      baseDocument as LocalizedStringDataContribution,
    );
  }

  // We don't need `this` on this override method
  // eslint-disable-next-line class-methods-use-this
  protected override validateContribution(_documentName: string, document: JsonDocumentLike): void {
    performSchemaValidation(document, PLATFORM_NAMESPACE);
  }

  // We don't need `this` on this override method
  // eslint-disable-next-line class-methods-use-this
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

  // We don't need `this` on this override method
  // eslint-disable-next-line class-methods-use-this
  protected override validateOutput(output: JsonDocumentLike): void {
    performSchemaValidation(output, 'output');
  }
}
