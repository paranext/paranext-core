import { useEffect, useState } from 'react';

/**
 * Awaits a promise and returns a loading value while the promise is unresolved
 *
 * @param promiseFactoryCallback A function that returns the promise to await. If the promise
 *   resolves to undefined, the value will not change. If this callback is undefined, the current
 *   value will be returned (defaultValue unless it was previously changed and preserveValue is
 *   true), and there will be no loading.
 *
 *   WARNING: MUST BE STABLE - const or wrapped in useCallback. The reference must not be updated
 *   every render
 * @param defaultValue The initial value to return while first awaiting the promise. If
 *   preserveValue is false, this value is also shown while awaiting the promise on subsequent
 *   calls.
 *
 *   WARNING: MUST BE STABLE - const or wrapped in useState, useMemo, etc. The reference must not be
 *   updated every render
 * @param preserveValue Whether to leave the value as the most recent resolved promise value or set
 *   it back to defaultValue while running the promise again. Default to true
 * @returns `[value, isLoading]`
 *
 *   - `value`: the current value for the promise, either the defaultValue or the resolved promise value
 *   - `isLoading`: whether the promise is waiting to be resolved
 */
const usePromise = <T>(
  promiseFactoryCallback: (() => Promise<T | undefined>) | undefined,
  defaultValue: T,
  preserveValue = true,
): [value: T, isLoading: boolean] => {
  const [value, setValue] = useState<T>(() => defaultValue);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  useEffect(() => {
    let promiseIsCurrent = true;
    // If a promiseFactoryCallback was provided, we are loading. Otherwise, there is no loading to do
    setIsLoading(!!promiseFactoryCallback);
    (async () => {
      // If there is a callback to run, run it
      if (promiseFactoryCallback) {
        const result = await promiseFactoryCallback();
        // If the promise was not already replaced, update the value
        if (promiseIsCurrent) {
          // If the promise returned undefined, it purposely did this to do nothing. Maybe its dependencies are not set up
          if (result !== undefined) setValue(() => result);
          setIsLoading(false);
        }
      }
    })();

    return () => {
      // Mark this promise as old and not to be used
      promiseIsCurrent = false;
      if (!preserveValue) setValue(() => defaultValue);
    };
  }, [promiseFactoryCallback, defaultValue, preserveValue]);

  return [value, isLoading];
};
export default usePromise;
