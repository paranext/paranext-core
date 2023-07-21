import usePromise from '@renderer/hooks/papi-hooks/use-promise.hook';
import useEvent from '@renderer/hooks/papi-hooks/use-event.hook';
import useEventAsync from '@renderer/hooks/papi-hooks/use-event-async.hook';
import useDataProvider from '@renderer/hooks/papi-hooks/use-data-provider.hook';
import useData from '@renderer/hooks/papi-hooks/use-data.hook';

// Declare an interface for the object we're exporting so that JSDoc comments propagate
export interface PapiHooks {
  usePromise: typeof usePromise;
  useEvent: typeof useEvent;
  useEventAsync: typeof useEventAsync;
  useDataProvider: typeof useDataProvider;
  /** JSDOC DESTINATION UseDataHook */
  useData: typeof useData;
}

/** JSDOC SOURCE papiHooks
 * All React hooks to be exposed on the papi
 */
const papiHooks: PapiHooks = {
  usePromise,
  useEvent,
  useEventAsync,
  useDataProvider,
  useData,
};

export default papiHooks;
