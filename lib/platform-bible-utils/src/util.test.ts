import { vi } from 'vitest';
import { debounce } from './util';

describe('debounce', () => {
  it('should return a promise, not the synchronously returned value, when called synchronously', () => {
    const returnValue = 3;
    const debounceFn = debounce(() => {
      return returnValue;
    }, 1);

    debounceFn();
    debounceFn();
    expect(debounceFn()).not.toEqual(returnValue);
  });

  it('should not call the debounced function immediately', () => {
    const mockFunction = vi.fn();
    const debounceFn = debounce(mockFunction, 1);

    debounceFn();
    debounceFn();
    expect(mockFunction).not.toHaveBeenCalled();
  });

  it('should call the debounced function asynchronously once per set of synchronous calls', async () => {
    const mockFunction = vi.fn();
    const debounceFn = debounce(mockFunction, 1);

    debounceFn();
    debounceFn();
    expect(mockFunction).not.toHaveBeenCalled();

    await debounceFn();

    expect(mockFunction).toHaveBeenCalledTimes(1);

    await debounceFn();
    await debounceFn();

    expect(mockFunction).toHaveBeenCalledTimes(3);

    debounceFn();
    debounceFn();
    debounceFn();
    debounceFn();
    await debounceFn();

    expect(mockFunction).toHaveBeenCalledTimes(4);
  });
});
