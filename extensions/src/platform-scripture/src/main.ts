import papi, { logger } from '@papi/backend';
import { ExecutionActivationContext, ProjectSettingValidator } from '@papi/core';

// #region Project Setting Validators

// Based on https://github.com/paranext/paranext-core/blob/5c403e272b002ddd8970f735bc119f335c78c509/extensions/src/usfm-data-provider/index.d.ts#L401
// Should be 123 characters long
const booksPresentValidator: ProjectSettingValidator<'platformScripture.booksPresent'> = async (
  newValue: string,
): Promise<boolean> => {
  return newValue.length === 123 && newValue.replace(/[01]/g, '').length === 0;
};

// Based on https://github.com/paranext/paranext-core/blob/5c403e272b002ddd8970f735bc119f335c78c509/extensions/src/usfm-data-provider/index.d.ts#L391
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

  const booksPresentPromise = papi.projectSettings.registerValidator(
    'platformScripture.booksPresent',
    booksPresentValidator,
  );
  const versificationPromise = papi.projectSettings.registerValidator(
    'platformScripture.versification',
    versificationValidator,
  );

  context.registrations.add(await booksPresentPromise, await versificationPromise);

  logger.info('platformScripture is finished activating!');
}

export async function deactivate() {
  logger.info('platformScripture is deactivating!');
  return true;
}
