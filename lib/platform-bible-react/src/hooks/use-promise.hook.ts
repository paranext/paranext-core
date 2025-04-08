import { useEffect, useRef, useState } from 'react';

export type UsePromiseOptions = {
  /**
   * Whether to leave the value as the most recent resolved promise value or set it back to
   * defaultValue while running the promise again. Defaults to true
   */
  preserveValue?: boolean;
};

/** Set up defaults for options for usePromise hook */
function getUsePromiseOptionsDefaults(options: UsePromiseOptions): UsePromiseOptions {
  return {
    preserveValue: true,
    ...options,
  };
}

/**
 * Awaits a promise and returns a loading value while the promise is unresolved
 *
 * @param promiseFactoryCallback A function that returns the promise to await. If this callback is
 *   undefined, the current value will be returned (defaultValue unless it was previously changed
 *   and `options.preserveValue` is true), and there will be no loading.
 *
 *   WARNING: MUST BE STABLE - const or wrapped in useCallback. The reference must not be updated
 *   every render
 * @param defaultValue The initial value to return while first awaiting the promise. If
 *   `options.preserveValue` is false, this value is also shown while awaiting the promise on
 *   subsequent calls.
 *
 *   Note: this parameter is internally assigned to a `ref`, so changing it will not cause any hooks
 *   to re-run with its new value. This means that, if the `promiseFactoryCallback` changes and
 *   `options.preserveValue` is `false`, the returned value will be set to the current
 *   `defaultValue`. However, the returned value will not be updated if`defaultValue` changes.
 * @param options Various options for adjusting how this hook runs the `promiseFactoryCallback`
 *
 *   Note: this parameter is internally assigned to a `ref`, so changing it will not cause any hooks
 *   to re-run with its new value. However, the latest `options.preserveValue` will always be used
 *   appropriately to determine whether to preserve the returned value when changing the
 *   `promiseFactoryCallback`
 * @returns `[value, isLoading]`
 *
 *   - `value`: the current value for the promise, either the defaultValue or the resolved promise value
 *   - `isLoading`: whether the promise is waiting to be resolved
 */
export const usePromise = <T>(
  promiseFactoryCallback: (() => Promise<T>) | undefined,
  defaultValue: T,
  options: UsePromiseOptions = {},
): [value: T, isLoading: boolean] => {
  // Use defaultValue as a ref so it doesn't update dependency arrays
  const defaultValueRef = useRef(defaultValue);
  defaultValueRef.current = defaultValue;
  // Use options as a ref so it doesn't update dependency arrays
  const optionsDefaultedRef = useRef(options);
  optionsDefaultedRef.current = getUsePromiseOptionsDefaults(optionsDefaultedRef.current);

  const [value, setValue] = useState<T>(() => defaultValueRef.current);
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
          setValue(() => result);
          setIsLoading(false);
        }
      }
    })();

    return () => {
      // Mark this promise as old and not to be used
      promiseIsCurrent = false;
      if (!optionsDefaultedRef.current.preserveValue) setValue(() => defaultValueRef.current);
    };
  }, [promiseFactoryCallback]);

  return [value, isLoading];
};
export default usePromise;
