import { JsonDocumentLike, settingsDocumentSchema } from 'platform-bible-utils';
import Ajv2020 from 'ajv/dist/2020';
import SettingsDocumentCombinerBase, {
  LocalizedSettingsContributionInfo,
  SettingsContributionInfo,
} from '@shared/utils/settings-document-combiner-base';

// #region Helper functions

const ajv = new Ajv2020();
const validate = ajv.compile(settingsDocumentSchema);

function performSchemaValidation(document: JsonDocumentLike, docType: string): void {
  if (!validate(document))
    throw new Error(`Invalid ${docType} settings document: ${ajv.errorsText(validate.errors)}`);
}

// #endregion

export class SettingsDocumentCombiner extends SettingsDocumentCombinerBase {
  /**
   * Get the current set of settings contribution info given all the input documents. Localized
   * string keys have not been localized to corresponding strings.
   *
   * NOTE: If the input documents might have changed since the last time the settings contributions
   * were retrieved, you can call `rebuild` to incorporate those document changes before calling
   * this getter. For example, if one of the input document objects changed and
   * `addOrUpdateContribution` wasn't called explicitly, those document changes will not be seen in
   * the current set of settings contributions. If all the input documents are static, then there is
   * no need to ever rebuild once all the documents have been contributed to this combiner.
   */
  getSettingsContributionInfo(): SettingsContributionInfo | undefined {
    if (!this.latestOutput) return undefined;

    // All our validation and stuff was to make this the case
    // eslint-disable-next-line no-type-assertion/no-type-assertion
    return this.latestOutput as SettingsContributionInfo;
  }

  /**
   * Get the current set of settings contribution info given all the input documents with all
   * localized string keys localized properly.
   *
   * NOTE: If the input documents might have changed since the last time the settings contributions
   * were retrieved, you can call `rebuild` to incorporate those document changes before calling
   * this getter. For example, if one of the input document objects changed and
   * `addOrUpdateContribution` wasn't called explicitly, those document changes will not be seen in
   * the current set of settings contributions. If all the input documents are static, then there is
   * no need to ever rebuild once all the documents have been contributed to this combiner.
   */
  async getLocalizedSettingsContributionInfo(): Promise<
    LocalizedSettingsContributionInfo | undefined
  > {
    return this.getLocalizedOutput();
  }

  protected override performSchemaValidation(document: JsonDocumentLike, docType: string): void {
    performSchemaValidation(document, docType);
  }
}

export default SettingsDocumentCombiner;
