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

  test('unsubscribes something added while the list is being run', async () => {
    // Registration is asynchronous, so an unsubscriber can arrive while the thing it belongs to is
    // already being torn down. The run snapshots the set and then clears it, so storing a late
    // arrival would drop it and leak the subscription for the rest of the session.
    const list = new UnsubscriberAsyncList('test');
    const lateUnsubscriber = vi.fn(async () => true);
    let addTheLateOne = () => {};
    list.add(async () => {
      addTheLateOne();
      return true;
    });
    addTheLateOne = () => list.add(lateUnsubscriber);

    await list.runAllUnsubscribers();

    expect(lateUnsubscriber).toHaveBeenCalledTimes(1);
  });

  test('unsubscribes something added after the list has been run', async () => {
    const list = new UnsubscriberAsyncList('test');
    await list.runAllUnsubscribers();
    const lateUnsubscriber = vi.fn(async () => true);

    list.add(lateUnsubscriber);
    // `add` cannot await the unsubscriber it runs, so let the microtask it queued settle
    await Promise.resolve();

    expect(lateUnsubscriber).toHaveBeenCalledTimes(1);
    expect(list.unsubscribers.size).toBe(0);
  });

  test('unsubscribes a late disposable by calling its dispose', async () => {
    const list = new UnsubscriberAsyncList('test');
    await list.runAllUnsubscribers();
    const disposable = { dispose: vi.fn(async () => true) };

    list.add(disposable);
    await Promise.resolve();

    expect(disposable.dispose).toHaveBeenCalledTimes(1);
  });

  test('reports a late unsubscriber that throws instead of leaving it unhandled', async () => {
    const list = new UnsubscriberAsyncList('test');
    await list.runAllUnsubscribers();

    list.add(async () => {
      throw new Error('late boom');
    });
    await Promise.resolve();
    await Promise.resolve();

    expect(vi.mocked(console.error)).toHaveBeenCalledWith(expect.stringContaining('late boom'));
  });
});
