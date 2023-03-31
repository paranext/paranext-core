import usePromise from '@renderer/hooks/papi-hooks/usePromise';
import useEvent from '@renderer/hooks/papi-hooks/useEvent';
import useEventAsync from '@renderer/hooks/papi-hooks/useEventAsync';
import useData from '@renderer/hooks/papi-hooks/useData';

/** All React hooks to be exposed on the papi */
export default {
  usePromise,
  useEvent,
  useEventAsync,
  useData,
};
