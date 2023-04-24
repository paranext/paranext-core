import usePromise from '@renderer/hooks/papi-hooks/use-promise.hook';
import useEvent from '@renderer/hooks/papi-hooks/use-event.hook';
import useEventAsync from '@renderer/hooks/papi-hooks/use-event-async.hook';
import useDataProvider from '@renderer/hooks/papi-hooks/use-data-provider.hook';
import useData from '@renderer/hooks/papi-hooks/use-data.hook';

/** All React hooks to be exposed on the papi */
const papiHooks = {
  usePromise,
  useEvent,
  useEventAsync,
  useDataProvider,
  useData,
};

export default papiHooks;

export type PapiHooks = typeof papiHooks;
