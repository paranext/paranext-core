import papi, { logger } from '@papi/backend';
import { ExecutionActivationContext, ProjectSettingValidator } from '@papi/core';
import ScriptureExtenderProjectDataProviderEngineFactory, {
  SCRIPTURE_EXTENDER_PDPF_ID,
} from './project-data-provider/platform-scripture-extender-pdpef.model';
import { SCRIPTURE_EXTENDER_PROJECT_INTERFACES } from './project-data-provider/platform-scripture-extender-pdpe.model';

// #region Project Setting Validators

// Should be 123 characters long
const booksPresentValidator: ProjectSettingValidator<'platformScripture.booksPresent'> = async (
  newValue: string,
): Promise<boolean> => {
  return newValue.length === 123 && newValue.replace(/[01]/g, '').length === 0;
};

// There are 7 options in the enum
const versificationValidator: ProjectSettingValidator<'platformScripture.versification'> = async (
  newValue: number,
): Promise<boolean> => {
  return (
    typeof newValue === 'number' && newValue >= 0 && newValue <= 6 && Number.isInteger(newValue)
  );
};

// #endregion

export async function activate(context: ExecutionActivationContext) {
  logger.info('platformScripture is activating!');

  const scriptureExtenderPdpefPromise =
    papi.projectDataProviders.registerProjectDataProviderEngineFactory(
      SCRIPTURE_EXTENDER_PDPF_ID,
      SCRIPTURE_EXTENDER_PROJECT_INTERFACES,
      new ScriptureExtenderProjectDataProviderEngineFactory(SCRIPTURE_EXTENDER_PDPF_ID),
    );

  const includeProjectsCommandPromise = papi.commands.registerCommand(
    'platformScripture.toggleIncludeMyParatext9Projects',
    async (shouldInclude) => {
      const currentSettingValue =
        shouldInclude !== undefined
          ? !shouldInclude
          : await papi.settings.get('platformScripture.includeMyParatext9Projects');
      const newSettingValue = !currentSettingValue;
      await papi.settings.set('platformScripture.includeMyParatext9Projects', newSettingValue);
      return newSettingValue;
    },
  );
  const includeProjectsValidatorPromise = papi.settings.registerValidator(
    'platformScripture.includeMyParatext9Projects',
    async (newValue) => typeof newValue === 'boolean',
  );
  const booksPresentPromise = papi.projectSettings.registerValidator(
    'platformScripture.booksPresent',
    booksPresentValidator,
  );
  const versificationPromise = papi.projectSettings.registerValidator(
    'platformScripture.versification',
    versificationValidator,
  );

  context.registrations.add(
    await scriptureExtenderPdpefPromise,
    await includeProjectsCommandPromise,
    await includeProjectsValidatorPromise,
    await booksPresentPromise,
    await versificationPromise,
  );

  logger.info('platformScripture is finished activating!');
}

export async function deactivate() {
  logger.info('platformScripture is deactivating!');
  return true;
}
