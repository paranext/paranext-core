import usePromise from '@renderer/hooks/papi-hooks/use-promise.hook';
import useEvent from '@renderer/hooks/papi-hooks/use-event.hook';
import useEventAsync from '@renderer/hooks/papi-hooks/use-event-async.hook';
import useDataProvider from '@renderer/hooks/papi-hooks/use-data-provider.hook';
import useData from '@renderer/hooks/papi-hooks/use-data.hook';
import useSetting from '@renderer/hooks/papi-hooks/use-setting.hook';
import useProjectData from '@renderer/hooks/papi-hooks/use-project-data.hook';
import useProjectDataProvider from '@renderer/hooks/papi-hooks/use-project-data-provider.hook';
import useDialogCallback from '@renderer/hooks/papi-hooks/use-dialog-callback.hook';
import useDataProviderMulti from '@renderer/hooks/papi-hooks/use-data-provider-multi.hook';

// Declare an interface for the object we're exporting so that JSDoc comments propagate
export interface PapiHooks {
  useDialogCallback: typeof useDialogCallback;
  usePromise: typeof usePromise;
  useEvent: typeof useEvent;
  useEventAsync: typeof useEventAsync;
  useProjectDataProvider: typeof useProjectDataProvider;
  useDataProvider: typeof useDataProvider;
  useDataProviderMulti: typeof useDataProviderMulti;
  /** JSDOC DESTINATION UseDataHook */
  useData: typeof useData;
  /** JSDOC DESTINATION UseProjectDataHook */
  useProjectData: typeof useProjectData;
  useSetting: typeof useSetting;
}

/**
 * JSDOC SOURCE papiHooks
 *
 * All React hooks to be exposed on the papi
 */
const papiHooks: PapiHooks = {
  useDialogCallback,
  usePromise,
  useEvent,
  useEventAsync,
  useProjectDataProvider,
  useDataProvider,
  useDataProviderMulti,
  useData,
  useProjectData,
  useSetting,
};

export default papiHooks;
