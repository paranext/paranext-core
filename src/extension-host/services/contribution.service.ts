import { ExtensionManifest } from '@extension-host/extension-types/extension-manifest.model';
import { AsyncVariable, JsonDocumentLike, Unsubscriber } from 'platform-bible-utils';
import * as nodeFS from '@node/services/node-file-system.service';
import { joinUriPaths } from '@node/utils/util';
import logger from '@shared/services/logger.service';
import SettingsDocumentCombiner from '@shared/utils/settings-document-combiner';
import { platformSettings } from '@extension-host/data/core-settings-info.data';
import MenuDocumentCombiner from '@shared/utils/menu-document-combiner';
import menuDataObject from '@extension-host/data/menu.data.json';
import ProjectSettingsDocumentCombiner from '@shared/utils/project-settings-document-combiner';
import { platformProjectSettings } from '@extension-host/data/core-project-settings-info.data';
import LocalizedStringsDocumentCombiner from '@shared/utils/localized-strings-document-combiner';

// #region document combiners - manage the extension contributions. Services should layer over these

/**
 * Object that keeps track of all settings contributions in the platform. To listen to updates to
 * the settings contributions, subscribe to its `onDidRebuild` event (consider debouncing as each
 * contribution will trigger a rebuild).
 *
 * Keeping this object separate from the data provider and disabling the `set` calls in the data
 * provider prevents random services from changing system settings contributions unexpectedly.
 */
export const settingsDocumentCombiner = new SettingsDocumentCombiner(platformSettings);
/**
 * Object that keeps track of all active menus in the platform. Call
 * {@link MenuDataDataProviderEngine.rebuildMenus} in the service host after updating this object.
 *
 * Keeping this object separate from the data provider and disabling the `set` calls in the data
 * provider prevents random services from changing system menus unexpectedly.
 */
export const menuDocumentCombiner = new MenuDocumentCombiner(menuDataObject);
/**
 * Object that keeps track of all project settings contributions in the platform. To listen to
 * updates to the project settings contributions, subscribe to its `onDidRebuild` event (consider
 * debouncing as each contribution will trigger a rebuild).
 *
 * Keeping this object separate from the network object prevents random services from changing
 * system project settings contributions unexpectedly.
 */
export const projectSettingsDocumentCombiner = new ProjectSettingsDocumentCombiner(
  platformProjectSettings,
);
/**
 * Object that keeps track of all localized string contributions in the platform. To listen to
 * updates to the localized string contributions, subscribe to its `onDidRebuild` event (consider
 * debouncing as each contribution will trigger a rebuild).
 *
 * Keeping this object separate from the data provider and disabling the `set` calls in the data
 * provider prevents random services from changing system localized string contributions
 * unexpectedly.
 */
export const localizedStringsDocumentCombiner = new LocalizedStringsDocumentCombiner({});

// #endregion

const onDidResyncContributionsSubscriptions: (() => Promise<void>)[] = [];
/**
 * Event that runs asynchronous functions after extension contributions are finished being set up
 * and after they are re-synced. Function calls are awaited
 */
export function onDidResyncContributions(callback: () => Promise<void>): Unsubscriber {
  onDidResyncContributionsSubscriptions.push(callback);
  return () => {
    const callbackIndex = onDidResyncContributionsSubscriptions.indexOf(callback);
    if (callbackIndex < 0) return false;
    onDidResyncContributionsSubscriptions.splice(callbackIndex, 1);
    return true;
  };
}

let resyncContributionsCount = -1;
function createNewResyncContributionsVariable() {
  resyncContributionsCount += 1;
  return new AsyncVariable<undefined>(`resyncContributions ${resyncContributionsCount}`, -1);
}
let resyncContributionsVariable = createNewResyncContributionsVariable();

/**
 * Returns a promise that resolves when the extension service is done resyncing contributions. If it
 * has already set up contributions before and is not currently resyncing contributions, the promise
 * will already be resolved.
 *
 * This should be used when attempting to access contribution information to ensure you aren't
 * accessing incomplete or out-of-date contribution information
 */
export async function waitForResyncContributions() {
  return resyncContributionsVariable.promise;
}

/** Clears extension contributions and re-adds them. Only call from `extension.service.ts`! */
export async function resyncContributions(
  extensionsToAdd: Readonly<ExtensionManifest & { dirUri: string }>[],
) {
  if (resyncContributionsVariable.hasSettled)
    resyncContributionsVariable = createNewResyncContributionsVariable();

  menuDocumentCombiner.deleteAllContributions();
  settingsDocumentCombiner.deleteAllContributions();
  projectSettingsDocumentCombiner.deleteAllContributions();
  localizedStringsDocumentCombiner.deleteAllContributions();

  // Load up all the extension contributions asynchronously
  const extensionsContributions = await Promise.all(
    extensionsToAdd.map(async (extension) => {
      let localizedStringsDocument: JsonDocumentLike | undefined;
      if (extension.localizedStrings) {
        try {
          // TODO: Provide a way to make sure extensions don't tell us to read files outside their dir
          const localizedStringsJson = await nodeFS.readFileText(
            joinUriPaths(extension.dirUri, extension.localizedStrings),
          );
          localizedStringsDocument = JSON.parse(localizedStringsJson);
        } catch (error) {
          logger.warn(
            `Could not load localized strings contribution for ${extension.name}: ${error}`,
          );
        }
      }
      let menuDocument: JsonDocumentLike | undefined;
      if (extension.menus) {
        try {
          // TODO: Provide a way to make sure extensions don't tell us to read files outside their dir
          const menuJson = await nodeFS.readFileText(
            joinUriPaths(extension.dirUri, extension.menus),
          );
          menuDocument = JSON.parse(menuJson);
        } catch (error) {
          logger.warn(`Could not load menu contribution for ${extension.name}: ${error}`);
        }
      }
      let settingsDocument: JsonDocumentLike | undefined;
      if (extension.settings) {
        try {
          // TODO: Provide a way to make sure extensions don't tell us to read files outside their dir
          const settingsJson = await nodeFS.readFileText(
            joinUriPaths(extension.dirUri, extension.settings),
          );
          settingsDocument = JSON.parse(settingsJson);
        } catch (error) {
          logger.warn(`Could not load settings contribution for ${extension.name}: ${error}`);
        }
      }
      let projectSettingsDocument: JsonDocumentLike | undefined;
      if (extension.projectSettings) {
        try {
          // TODO: Provide a way to make sure extensions don't tell us to read files outside their dir
          const projectSettingsJson = await nodeFS.readFileText(
            joinUriPaths(extension.dirUri, extension.projectSettings),
          );
          projectSettingsDocument = JSON.parse(projectSettingsJson);
        } catch (error) {
          logger.warn(
            `Could not load project settings contribution for ${extension.name}: ${error}`,
          );
        }
      }

      return {
        name: extension.name,
        localizedStringsDocument,
        menuDocument,
        settingsDocument,
        projectSettingsDocument,
      };
    }),
  );

  // Load contributions in the order in which the extensions are loaded
  extensionsContributions.forEach(
    ({
      name,
      localizedStringsDocument,
      menuDocument,
      settingsDocument,
      projectSettingsDocument,
    }) => {
      if (localizedStringsDocument)
        try {
          localizedStringsDocumentCombiner.addOrUpdateContribution(name, localizedStringsDocument);
        } catch (error) {
          logger.warn(`Could not add localized strings contribution for ${name}: ${error}`);
        }
      if (menuDocument)
        try {
          menuDocumentCombiner.addOrUpdateContribution(name, menuDocument);
        } catch (error) {
          logger.warn(`Could not add menu contribution for ${name}: ${error}`);
        }
      if (settingsDocument)
        try {
          settingsDocumentCombiner.addOrUpdateContribution(name, settingsDocument);
        } catch (error) {
          logger.warn(`Could not add settings contribution for ${name}: ${error}`);
        }
      if (projectSettingsDocument)
        try {
          projectSettingsDocumentCombiner.addOrUpdateContribution(name, projectSettingsDocument);
        } catch (error) {
          logger.warn(`Could not add project settings contribution for ${name}: ${error}`);
        }
    },
  );

  resyncContributionsVariable.resolveToValue(undefined, true);

  // Do things in response to finishing resyncing contributions
  await Promise.all([...onDidResyncContributionsSubscriptions].map(async (callback) => callback()));
}
