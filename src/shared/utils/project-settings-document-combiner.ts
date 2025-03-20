import Ajv2020 from 'ajv/dist/2020';
import { ProjectSettingNames, ProjectSettingTypes } from 'papi-shared-types';
import {
  JsonDocumentLike,
  Localized,
  ProjectSetting,
  ProjectSettingsGroup,
  projectSettingsDocumentSchema,
} from 'platform-bible-utils';
import SettingsDocumentCombinerBase from '@shared/utils/settings-document-combiner-base';

/**
 * Information about one specific setting. Basically just {@link Setting} but with specific default
 * type info
 */
type ProjectSettingInfo<ProjectSettingName extends ProjectSettingNames> = ProjectSetting & {
  default: ProjectSettingTypes[ProjectSettingName];
};

/** Information about all settings. Keys are setting keys, values are information for that setting */
type AllProjectSettingsInfo = {
  [ProjectSettingName in ProjectSettingNames]: ProjectSettingInfo<ProjectSettingName>;
};

export type ProjectSettingsContributionInfo = {
  /** Map of extension name to that extension's provided settings groups if provided */
  contributions: { [extensionName: string]: ProjectSettingsGroup[] | undefined };
  /**
   * Map of setting name to setting definition. For type specificity and ease of accessing settings
   * since they're a bit hard to find in `contributions`
   */
  settings: Partial<AllProjectSettingsInfo>;
};

export type LocalizedProjectSettingsContributionInfo = Localized<ProjectSettingsContributionInfo>;

// #region Helper functions

const ajv = new Ajv2020();
const validate = ajv.compile(projectSettingsDocumentSchema);

function performSchemaValidation(document: JsonDocumentLike, docType: string): void {
  if (!validate(document))
    throw new Error(
      `Invalid ${docType} project settings document: ${ajv.errorsText(validate.errors)}`,
    );
}

// #endregion

export class ProjectSettingsDocumentCombiner extends SettingsDocumentCombinerBase {
  protected override readonly settingTypeName = 'Project Setting';

  /**
   * Get the current set of project settings contribution info given all the input documents.
   * Localized string keys have not been localized to corresponding strings.
   *
   * NOTE: If the input documents might have changed since the last time the project settings
   * contributions were retrieved, you can call `rebuild` to incorporate those document changes
   * before calling this getter. For example, if one of the input document objects changed and
   * `addOrUpdateContribution` wasn't called explicitly, those document changes will not be seen in
   * the current set of project settings contributions. If all the input documents are static, then
   * there is no need to ever rebuild once all the documents have been contributed to this
   * combiner.
   */
  getProjectSettingsContributionInfo(): ProjectSettingsContributionInfo | undefined {
    if (!this.latestOutput) return undefined;

    // All our validation and stuff was to make this the case
    // eslint-disable-next-line no-type-assertion/no-type-assertion
    return this.latestOutput as ProjectSettingsContributionInfo;
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
  async getLocalizedProjectSettingsContributionInfo(): Promise<
    LocalizedProjectSettingsContributionInfo | undefined
  > {
    // Project Settings are just Settings with a couple extra optional properties, so we can type
    // assert them freely
    // eslint-disable-next-line no-type-assertion/no-type-assertion
    return this.getLocalizedOutput() as Promise<
      LocalizedProjectSettingsContributionInfo | undefined
    >;
  }

  protected override performSchemaValidation(document: JsonDocumentLike, docType: string): void {
    performSchemaValidation(document, docType);
  }
}

export default ProjectSettingsDocumentCombiner;
