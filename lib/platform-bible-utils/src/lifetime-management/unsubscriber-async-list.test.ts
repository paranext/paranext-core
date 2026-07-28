import { beforeEach, describe, expect, test, vi } from 'vitest';
import UnsubscriberAsyncList from './unsubscriber-async-list';

describe('UnsubscriberAsyncList', () => {
  beforeEach(() => {
    // The list logs failures; keep the test output readable
    vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  test('runs every unsubscriber and reports success', async () => {
    const list = new UnsubscriberAsyncList('test');
    const first = vi.fn(async () => true);
    const second = vi.fn(async () => true);
    list.add(first, second);

    const allSucceeded = await list.runAllUnsubscribers();

    expect(first).toHaveBeenCalled();
    expect(second).toHaveBeenCalled();
    expect(allSucceeded).toBe(true);
  });

  test('one unsubscriber throwing does not strand the ones after it', async () => {
    // This list cleans up after a window closes, which now happens repeatedly rather than once at
    // shutdown, so a single bad unsubscriber must not leak every subscription behind it
    const list = new UnsubscriberAsyncList('test');
    const afterTheThrower = vi.fn(async () => true);
    list.add(() => {
      throw new Error('synchronous boom');
    }, afterTheThrower);

    const allSucceeded = await list.runAllUnsubscribers();

    expect(afterTheThrower).toHaveBeenCalled();
    expect(allSucceeded).toBe(false);
  });

  test('an unsubscriber rejecting does not strand the ones after it either', async () => {
    const list = new UnsubscriberAsyncList('test');
    const afterTheRejecter = vi.fn(async () => true);
    list.add(async () => {
      throw new Error('async boom');
    }, afterTheRejecter);

    const allSucceeded = await list.runAllUnsubscribers();

    expect(afterTheRejecter).toHaveBeenCalled();
    expect(allSucceeded).toBe(false);
  });

  test('reports failure when an unsubscriber returns false', async () => {
    const list = new UnsubscriberAsyncList('test');
    list.add(async () => false);

    expect(await list.runAllUnsubscribers()).toBe(false);
  });

  test('clears the list so a second run does not re-run anything', async () => {
    const list = new UnsubscriberAsyncList('test');
    const unsubscriber = vi.fn(async () => true);
    list.add(unsubscriber);

    await list.runAllUnsubscribers();
    await list.runAllUnsubscribers();

    expect(unsubscriber).toHaveBeenCalledTimes(1);
  });

  test('does not add the same unsubscriber twice', async () => {
    const list = new UnsubscriberAsyncList('test');
    const unsubscriber = vi.fn(async () => true);
    list.add(unsubscriber, unsubscriber);

    await list.runAllUnsubscribers();

    expect(unsubscriber).toHaveBeenCalledTimes(1);
  });
});
