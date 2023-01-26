import { useEffect, useRef } from 'react';

// Used from https://usehooks.com/usePrevious/ with unlicense license
/**
 * Holds the value of the input variable at the previous render
 * @param value Value whose previous value to track
 * @returns Value of the input variable at the previous render
 */
export default <T>(value: T) => {
  // The ref object is a generic container whose current property is mutable ...
  // ... and can hold any value, similar to an instance property on a class
  const ref = useRef<T>();
  // Store current value in ref
  useEffect(() => {
    ref.current = value;
  }, [value]); // Only re-run if value changes
  // Return previous value (happens before update in useEffect above)
  return ref.current;
};
