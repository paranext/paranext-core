import usePromise from '@renderer/hooks/papi-hooks/use-promise.hook';
import useEvent from '@renderer/hooks/papi-hooks/use-event.hook';
import useEventAsync from '@renderer/hooks/papi-hooks/useEventAsync';
import useDataProvider from '@renderer/hooks/papi-hooks/useDataProvider';
import useData from '@renderer/hooks/papi-hooks/useData';

/** All React hooks to be exposed on the papi */
const papiHooks = {
  usePromise,
  useEvent,
  useEventAsync,
  useDataProvider,
  useData,
};

export default papiHooks;
