import { vi } from 'vitest';
import { debounce, DEBOUNCE_CANCELED_ERROR_MESSAGE } from './util';

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

  it('should reject with the cancel error message when canceled before the debounce fires', async () => {
    const mockFunction = vi.fn();
    const debounceFn = debounce(mockFunction, 1);

    const result = debounceFn();
    debounceFn.cancel();

    await expect(result).rejects.toThrow(DEBOUNCE_CANCELED_ERROR_MESSAGE);
    expect(mockFunction).not.toHaveBeenCalled();
  });

  it('should allow new calls after cancel', async () => {
    const mockFunction = vi.fn().mockReturnValue(42);
    const debounceFn = debounce(mockFunction, 1);

    const canceled = debounceFn();
    debounceFn.cancel();
    await expect(canceled).rejects.toThrow(DEBOUNCE_CANCELED_ERROR_MESSAGE);

    expect(await debounceFn()).toBe(42);
    expect(mockFunction).toHaveBeenCalledTimes(1);
  });

  it('should be a no-op when cancel is called with no pending invocation', () => {
    const mockFunction = vi.fn();
    const debounceFn = debounce(mockFunction, 1);

    expect(() => debounceFn.cancel()).not.toThrow();
  });
});
