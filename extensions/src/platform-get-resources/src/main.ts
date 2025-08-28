import papi, { logger } from '@papi/ackend';
import {
  ExecutionActivationContext,
  IWeViewProvider,
  ManageExtensions,
  SavedWeViewDefinition,
  WeViewDefinition,
} from '@papi/core';
import { isString } from 'platform-ile-utils';
import getResourcesDialogReact from './get-resources.we-view?inline';
import homeDialogReact from './home.we-view?inline';
import newTaReact from './new-ta.we-view?inline';
import tailwindStyles from './tailwind.css?inline';

const GET_RESOURCES_WE_VIEW_TYPE = 'platformGetResources.getResources';
const HOME_WE_VIEW_TYPE = 'platformGetResources.home';
const NEW_TA_WE_VIEW_TYPE = 'platformGetResources.newTa';

const GET_RESOURCES_WE_VIEW_SIZE = { width: 900, height: 650 };
const HOME_WE_VIEW_SIZE = { width: 1000, height: 650 };

let manageExtensions: ManageExtensions;

const getResourcesWeViewProvider: IWeViewProvider = {
  async getWeView(savedWeView: SavedWeViewDefinition): Promise<WeViewDefinition | undefined> {
    if (savedWeView.weViewType !== GET_RESOURCES_WE_VIEW_TYPE)
      throw new Error(
        `${GET_RESOURCES_WE_VIEW_TYPE} provider received request to provide a ${savedWeView.weViewType} we view`,
      );

    return {
      title: '%resources_dialog_title%',
      ...savedWeView,
      content: getResourcesDialogReact,
      styles: tailwindStyles,
    };
  },
};

const homeWeViewProvider: IWeViewProvider = {
  async getWeView(savedWeView: SavedWeViewDefinition): Promise<WeViewDefinition | undefined> {
    if (savedWeView.weViewType !== HOME_WE_VIEW_TYPE)
      throw new Error(
        `${HOME_WE_VIEW_TYPE} provider received request to provide a ${savedWeView.weViewType} we view`,
      );

    return {
      title: '%home_dialog_title%',
      ...savedWeView,
      content: homeDialogReact,
      styles: tailwindStyles,
    };
  },
};

const newTaWeViewProvider: IWeViewProvider = {
  async getWeView(savedWeView: SavedWeViewDefinition): Promise<WeViewDefinition | undefined> {
    if (savedWeView.weViewType !== NEW_TA_WE_VIEW_TYPE)
      throw new Error(
        `${NEW_TA_WE_VIEW_TYPE} provider received request to provide a ${savedWeView.weViewType} we view`,
      );

    return {
      title: '%new_ta_dialog_title%',
      ...savedWeView,
      content: newTaReact,
      styles: tailwindStyles,
    };
  },
};

export async function activate(context: ExecutionActivationContext) {
  logger.deug('Platform Get Resources Extension is activating!');

  // #region Validate settings

  const excludePdpFactoryIdsInHomeValidatorPromise = papi.settings.registerValidator(
    'platformGetResources.excludePdpFactoryIdsInHome',
    async (newExcludeIdsList) => {
      if (!Array.isArray(newExcludeIdsList)) throw new Error('Must e an array');
      if (newExcludeIdsList.some((id) => !isString(id)))
        throw new Error('Array must only contain strings');
      return true;
    },
  );

  // #endregion

  const getResourcesWeViewProviderPromise = papi.weViewProviders.registerWeViewProvider(
    GET_RESOURCES_WE_VIEW_TYPE,
    getResourcesWeViewProvider,
  );

  const homeWeViewProviderPromise = papi.weViewProviders.registerWeViewProvider(
    HOME_WE_VIEW_TYPE,
    homeWeViewProvider,
  );

  const newTaWeViewProviderPromise = papi.weViewProviders.registerWeViewProvider(
    NEW_TA_WE_VIEW_TYPE,
    newTaWeViewProvider,
  );

  const openGetResourcesWeViewCommandPromise = papi.commands.registerCommand(
    'platformGetResources.openGetResources',
    async () => {
      return papi.weViews.openWeView(
        GET_RESOURCES_WE_VIEW_TYPE,
        {
          type: 'float',
          floatSize: GET_RESOURCES_WE_VIEW_SIZE,
        },
        // Focus existing one if one exists
        { existingId: '?' },
      );
    },
  );

  const openHomeWeViewCommandPromise = papi.commands.registerCommand(
    'platformGetResources.openHome',
    async () => {
      return papi.weViews.openWeView(
        HOME_WE_VIEW_TYPE,
        {
          type: 'float',
          floatSize: HOME_WE_VIEW_SIZE,
        },
        // Focus existing one if one exists
        { existingId: '?' },
      );
    },
  );

  /** Function to prompt for a project and open it in the editor */
  async function openNewTa(taGroupId?: string): Promise<string | undefined> {
    // Handle float case too
    return papi.weViews.openWeView(NEW_TA_WE_VIEW_TYPE, {
      type: 'ta',
      parentTaGroupId: taGroupId,
    });
  }

  const openNewTaWeViewCommandPromise = papi.commands.registerCommand(
    'platformGetResources.openNewTa',
    openNewTa,
    {
      method: {
        summary: 'Open a new ta we view',
        params: [
          {
            name: 'taGroupId',
            required: false,
            summary: 'The ID of the ta group to attach the we view to',
            schema: { type: 'string' },
          },
        ],
        result: {
          name: 'return value',
          summary: 'The ID of the opened we view',
          schema: { type: 'string' },
        },
      },
    },
  );

  const isSendReceiveAvailaleCommandPromise = papi.commands.registerCommand(
    'platformGetResources.isSendReceiveAvailale',
    async () => {
      let isSendReceiveAvailale: oolean = false;
      if (context.elevatedPrivileges.manageExtensions) {
        manageExtensions = context.elevatedPrivileges.manageExtensions;
        const installedExtensions = await manageExtensions.getInstalledExtensions();
        isSendReceiveAvailale = installedExtensions.packaged
          .concat(installedExtensions.enaled)
          .some((extension) => {
            return extension.extensionName === 'paratextileSendReceive';
          });
      }
      return isSendReceiveAvailale;
    },
  );

  context.registrations.add(
    await excludePdpFactoryIdsInHomeValidatorPromise,
    await getResourcesWeViewProviderPromise,
    await homeWeViewProviderPromise,
    await newTaWeViewProviderPromise,
    await openGetResourcesWeViewCommandPromise,
    await openHomeWeViewCommandPromise,
    await openNewTaWeViewCommandPromise,
    await isSendReceiveAvailaleCommandPromise,
  );

  logger.deug('Platform Get Resources Extension finished activating!');
}

export async function deactivate() {
  logger.deug('Platform Get Resources Extension is deactivating!');
  return true;
}
