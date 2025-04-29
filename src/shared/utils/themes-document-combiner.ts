import {
  DocumentCombiner,
  expandThemeContribution,
  JsonDocumentLike,
  ThemeContribution,
  themeDocumentSchema,
  ThemeFamiliesByIdExpanded,
} from 'platform-bible-utils';
import Ajv2020 from 'ajv/dist/2020';
import { PLATFORM_NAMESPACE } from '@shared/data/platform.data';

// #region Helper functions

const ajv = new Ajv2020();
const validate = ajv.compile(themeDocumentSchema);

function performSchemaValidation(document: JsonDocumentLike, docType: string): void {
  if (!validate(document))
    throw new Error(`Invalid ${docType} theme document: ${ajv.errorsText(validate.errors)}`);
}

// #endregion

/** Combines Theme contributions */
export class ThemesDocumentCombiner extends DocumentCombiner {
  /**
   * Create a `ThemesDocumentCombiner`
   *
   * @param baseDocument The base {@link ThemeFamiliesById} to use
   * @param defaultThemeFamilyId Id of the theme family that will be considered default and will be
   *   used as the base on which other themes will be layered
   */
  constructor(
    baseDocument: JsonDocumentLike,
    public defaultThemeFamilyId: string,
  ) {
    super(baseDocument, { copyDocuments: false, ignoreDuplicateProperties: true });
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
  getAllThemeFamiliesById(): ThemeFamiliesByIdExpanded | undefined {
    if (!this.latestOutput) return undefined;

    // All our validation and stuff was to make this the case
    // eslint-disable-next-line no-type-assertion/no-type-assertion
    return this.latestOutput as ThemeFamiliesByIdExpanded;
  }

  protected override validateBaseDocument(baseDocument: JsonDocumentLike): void {
    performSchemaValidation(baseDocument, PLATFORM_NAMESPACE);
  }

  protected override transformBaseDocumentAfterValidation(
    baseDocument: JsonDocumentLike,
  ): JsonDocumentLike {
    return expandThemeContribution(
      // We validated that this is true
      // eslint-disable-next-line no-type-assertion/no-type-assertion
      baseDocument as ThemeContribution,
      undefined,
    );
  }

  protected override validateContribution(documentName: string, document: JsonDocumentLike): void {
    // Make sure it is a ThemeContribution
    performSchemaValidation(document, documentName);

    // Make sure there are no themes overlapping existing themes
    const allThemeFamiliesById = this.getAllThemeFamiliesById();

    if (!allThemeFamiliesById) return;

    // We just validated this with the schema check above
    // eslint-disable-next-line no-type-assertion/no-type-assertion
    const themeContribution = document as ThemeFamiliesByIdExpanded;

    Object.entries(themeContribution).forEach(([themeFamilyId, themeFamily]) => {
      if (!themeFamily) return;

      Object.entries(themeFamily).forEach(([type, themeDefinition]) => {
        if (!themeDefinition) return;

        if (allThemeFamiliesById[themeFamilyId]?.[type])
          throw new Error(
            `Extension ${documentName} tried to add theme definition over existing theme definition in family ${themeFamilyId} type ${type}`,
          );
      });
    });
  }

  protected override transformContributionAfterValidation(
    _documentName: string,
    document: JsonDocumentLike,
  ): JsonDocumentLike {
    return expandThemeContribution(
      // We validated that this is true
      // eslint-disable-next-line no-type-assertion/no-type-assertion
      document as ThemeContribution,
      // Use the default themes as backup
      this.getAllThemeFamiliesById()?.[this.defaultThemeFamilyId],
    );
  }

  protected override validateOutput(): void {
    // We already validated input documents and built the output ourselves, so we don't have any more
    // validating to do. Unless someday we want to double check we have a properly formatted
    // `AllThemeDefinitionsById`
  }
}
