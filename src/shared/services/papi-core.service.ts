/** Exporting empty object so people don't have to put 'type' in their import statements */
const core = {};
export default core;

export type { ExecutionActivationContext } from '@extension-host/extension-types/extension-activation-context.model';

export type { ExecutionToken } from '@node/models/execution-token.model';

export type { DialogTypes } from '@renderer/components/dialogs/dialog-definition.model';
export type { UseDialogCallbackOptions } from '@renderer/hooks/papi-hooks/use-dialog-callback.hook';

export type { default as IDataProvider } from '@shared/models/data-provider.interface';
export type {
  DataProviderUpdateInstructions,
  DataProviderDataType,
  DataProviderSubscriberOptions,
} from '@shared/models/data-provider.model';
export type { WithNotifyUpdate } from '@shared/models/data-provider-engine.model';
export type { default as IDataProviderEngine } from '@shared/models/data-provider-engine.model';
export type { DialogOptions } from '@shared/models/dialog-options.model';
export type {
  ExtensionDataScope,
  MandatoryProjectDataType,
} from '@shared/models/project-data-provider.model';
export type { ProjectMetadata } from '@shared/models/project-metadata.model';
export type {
  GetWebViewOptions,
  SavedWebViewDefinition,
  UseWebViewStateHook,
  WebViewContentType,
  WebViewDefinition,
  WebViewProps,
} from '@shared/models/web-view.model';

export type { IWebViewProvider } from '@shared/models/web-view-provider.model';

// TODO: Do we need this here? How to fix?
// export type { SettingEvent } from '@shared/services/settings.service-model';
