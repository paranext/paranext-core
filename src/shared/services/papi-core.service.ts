/** Exporting empty object so people don't have to put 'type' in their import statements */
const core = {};
export default core;

export type { ExecutionActivationContext } from '@extension-host/extension-types/extension-activation-context.model';
export type { ExecutionToken } from '@node/models/execution-token.model';
export type { ElevatedPrivileges } from '@shared/models/elevated-privileges.model';
export type {
  ExtensionIdentifier,
  HashValues,
  InstalledExtensions,
  ManageExtensions,
} from '@shared/models/manage-extensions-privilege.model';
export type {
  HandleUri,
  RegisterUriHandler,
  UriHandler,
} from '@shared/models/handle-uri-privilege.model';
export type { DialogTypes } from '@renderer/components/dialogs/dialog-definition.model';
export type { UseDialogCallbackOptions } from '@renderer/hooks/papi-hooks/use-dialog-callback.hook';
export type {
  IDataProvider,
  IDisposableDataProvider,
} from '@shared/models/data-provider.interface';
export type {
  DataProviderUpdateInstructions,
  DataProviderDataType,
  DataProviderSubscriberOptions,
} from '@shared/models/data-provider.model';
export type { WithNotifyUpdate } from '@shared/models/data-provider-engine.model';
export type { IDataProviderEngine } from '@shared/models/data-provider-engine.model';
export type { DialogOptions } from '@shared/models/dialog-options.model';
export type { NetworkableObject, NetworkObject } from '@shared/models/network-object.model';
export type { PlatformNotification } from '@shared/models/notification.service-model';
export type {
  Components as ComponentsDocumentation,
  MethodDocumentationWithoutName,
  NetworkObjectDocumentation,
  SingleMethodDocumentation,
} from '@shared/models/openrpc.model';
export type {
  ExtensionDataScope,
  MandatoryProjectDataTypes,
} from '@shared/models/project-data-provider.model';
export type { IProjectDataProviderEngine } from '@shared/models/project-data-provider-engine.model';
export type { IProjectDataProviderEngineFactory } from '@shared/models/project-data-provider-engine-factory.model.ts';
export type { IBaseProjectDataProviderEngine } from '@shared/models/base-project-data-provider-engine.model';
export type {
  IProjectDataProviderFactory,
  ProjectMetadataFilterOptions,
} from '@shared/models/project-data-provider-factory.interface';
export type {
  ProjectDataProviderFactoryMetadataInfo,
  ProjectMetadata,
  ProjectMetadataWithoutFactoryInfo,
} from '@shared/models/project-metadata.model';
export type {
  LocalizationData,
  LocalizationSelector,
  LocalizationSelectors,
} from '@shared/services/localization.service-model';
export type { NetworkObjectDetails } from '@shared/models/network-object.model';
export type { AppInfo } from '@shared/services/app.service-model';
export type { SettingValidator } from '@shared/services/settings.service-model';
export type { ScrollGroupScrRef } from '@shared/services/scroll-group.service-model';
export type { FocusSubject } from '@shared/services/window.service-model';
export type {
  GetWebViewOptions,
  OpenWebViewOptions,
  SavedWebViewDefinition,
  UseWebViewStateHook,
  UseWebViewScrollGroupScrRefHook,
  WebViewContentType,
  WebViewDefinition,
  WebViewProps,
} from '@shared/models/web-view.model';
export type {
  IDisposableWebViewProvider,
  IWebViewProvider,
} from '@shared/models/web-view-provider.model';
export type {
  SimultaneousProjectSettingsChanges,
  ProjectSettingValidator,
} from '@shared/services/project-settings.service-model';
