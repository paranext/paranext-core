import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import UnsubscriberAsyncList, {
  LATE_ARRIVAL_REPORT_WINDOW_MS,
  resetLateArrivalReportWindowsForTests,
} from './unsubscriber-async-list';

describe('UnsubscriberAsyncList', () => {
  beforeEach(() => {
    // Late-arrival reporting is throttled per list name, and those windows outlive the lists, so
    // without this a test that reports a late arrival silently spends the next test's budget
    resetLateArrivalReportWindowsForTests();
    // The list logs what it does with late arrivals; keep the test output readable
    vi.spyOn(console, 'error').mockImplementation(() => {});
    vi.spyOn(console, 'warn').mockImplementation(() => {});
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

  test('says so when it undoes a late arrival, rather than doing it silently', async () => {
    // From the caller's point of view a subscription it just set up has been taken away. Without a
    // line here that happens with no record anywhere, which is the hardest kind of thing to chase.
    const list = new UnsubscriberAsyncList('late-arrival-list');
    await list.runAllUnsubscribers();

    list.add(async () => true);
    // `add` cannot await the unsubscriber it runs, so let the microtask it queued settle
    await Promise.resolve();
    await Promise.resolve();

    expect(vi.mocked(console.warn)).toHaveBeenCalledWith(
      expect.stringContaining('late-arrival-list'),
    );
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

describe('UnsubscriberAsyncList late-arrival log throttling', () => {
  beforeEach(() => {
    resetLateArrivalReportWindowsForTests();
    vi.spyOn(console, 'error').mockImplementation(() => {});
    vi.spyOn(console, 'warn').mockImplementation(() => {});
    vi.useFakeTimers();
  });

  afterEach(() => {
    // Drop pending summary timers before the fake clock goes away, so none of them survive to fire
    // against the real one
    resetLateArrivalReportWindowsForTests();
    vi.useRealTimers();
  });

  /** Seals a list so anything added to it afterwards is a late arrival. */
  async function sealedList(name: string): Promise<UnsubscriberAsyncList> {
    const list = new UnsubscriberAsyncList(name);
    await list.runAllUnsubscribers();
    return list;
  }

  /** Adds `count` late unsubscribers and lets their async reporting settle. */
  async function addLate(list: UnsubscriberAsyncList, count: number): Promise<void> {
    for (let i = 0; i < count; i += 1) list.add(async () => true);
    await vi.advanceTimersByTimeAsync(0);
  }

  /** Adds late unsubscribers that throw the given messages, and lets their reporting settle. */
  async function addLateThrowing(
    list: UnsubscriberAsyncList,
    ...messages: string[]
  ): Promise<void> {
    messages.forEach((message) =>
      list.add(async () => {
        throw new Error(message);
      }),
    );
    await vi.advanceTimersByTimeAsync(0);
  }

  test('still reports a lone late arrival verbatim, so one occurrence stays discoverable', async () => {
    const list = await sealedList('lonely');

    await addLate(list, 1);

    expect(vi.mocked(console.warn)).toHaveBeenCalledTimes(1);
    expect(vi.mocked(console.warn)).toHaveBeenCalledWith(
      expect.stringContaining('arrived after the list was run'),
    );
  });

  test('collapses a storm into the first warning plus one count, not one line per occurrence', async () => {
    const list = await sealedList('storm');

    await addLate(list, 500);

    // The whole point: 500 late arrivals must not cost 500 console calls over IPC
    expect(vi.mocked(console.warn)).toHaveBeenCalledTimes(1);

    await vi.advanceTimersByTimeAsync(LATE_ARRIVAL_REPORT_WINDOW_MS);

    expect(vi.mocked(console.warn)).toHaveBeenCalledTimes(2);
    expect(vi.mocked(console.warn)).toHaveBeenLastCalledWith(expect.stringContaining('499'));
  });

  test('shares one budget across every list with the same name', async () => {
    // The storm this guards against builds a NEW list per occurrence, so a per-instance budget
    // would throttle nothing at all
    const lists = await Promise.all(
      Array.from({ length: 50 }, () => sealedList('rebuilt-every-time')),
    );

    await Promise.all(lists.map((list) => addLate(list, 1)));

    expect(vi.mocked(console.warn)).toHaveBeenCalledTimes(1);
  });

  test('reports again once the window has passed', async () => {
    const list = await sealedList('recovers');

    await addLate(list, 5);
    await vi.advanceTimersByTimeAsync(LATE_ARRIVAL_REPORT_WINDOW_MS);
    vi.mocked(console.warn).mockClear();

    await addLate(list, 1);

    expect(vi.mocked(console.warn)).toHaveBeenCalledTimes(1);
    expect(vi.mocked(console.warn)).toHaveBeenCalledWith(
      expect.stringContaining('arrived after the list was run'),
    );
  });

  test('does not let a chatty success path mask a late unsubscriber that failed', async () => {
    const list = await sealedList('mixed');

    await addLate(list, 10);
    list.add(async () => false);
    await vi.advanceTimersByTimeAsync(0);

    expect(vi.mocked(console.error)).toHaveBeenCalledTimes(1);
    expect(vi.mocked(console.error)).toHaveBeenCalledWith(expect.stringContaining('failed'));
  });

  test('keeps separate budgets per list name', async () => {
    const first = await sealedList('first-name');
    const second = await sealedList('second-name');

    await addLate(first, 1);
    await addLate(second, 1);

    expect(vi.mocked(console.warn)).toHaveBeenCalledTimes(2);
  });

  test('throttles a storm of throws down to the first error plus one count', async () => {
    const list = await sealedList('throwing-storm');

    await addLateThrowing(list, ...Array.from({ length: 200 }, () => 'the same boom'));

    expect(vi.mocked(console.error)).toHaveBeenCalledTimes(1);
    expect(vi.mocked(console.error)).toHaveBeenCalledWith(expect.stringContaining('the same boom'));

    await vi.advanceTimersByTimeAsync(LATE_ARRIVAL_REPORT_WINDOW_MS);

    expect(vi.mocked(console.error)).toHaveBeenCalledTimes(2);
    expect(vi.mocked(console.error)).toHaveBeenLastCalledWith(expect.stringContaining('199'));
  });

  test('keeps the causes legible when a storm of throws has more than one cause', async () => {
    // A bare count cannot distinguish one recurring fault from several different ones, and the
    // suppressed occurrences are the only place the other causes appear at all
    const list = await sealedList('throwing-many-causes');

    await addLateThrowing(list, 'first cause', 'second cause', 'third cause');
    await vi.advanceTimersByTimeAsync(LATE_ARRIVAL_REPORT_WINDOW_MS);

    const summary = vi.mocked(console.error).mock.lastCall?.[0];
    // 'first cause' opened the window verbatim; the other two were suppressed and sampled
    expect(summary).toContain('second cause');
    expect(summary).toContain('third cause');
  });

  test('caps the sampled errors so a storm of unique messages cannot grow without bound', async () => {
    const list = await sealedList('throwing-unique-causes');

    await addLateThrowing(list, ...Array.from({ length: 100 }, (_, i) => `cause ${i}`));
    await vi.advanceTimersByTimeAsync(LATE_ARRIVAL_REPORT_WINDOW_MS);

    const summary = vi.mocked(console.error).mock.lastCall?.[0];
    expect(summary).toContain('99');
    // 'cause 0' opened the window, so 'cause 1'..'cause 3' are the three sampled — and no more
    expect(summary).toContain('cause 1');
    expect(summary).toContain('cause 3');
    expect(summary).not.toContain('cause 4');
  });

  // This pair exists to keep test isolation from depending on every test inventing a unique list
  // name. Windows are keyed by name and outlive the lists that opened them, so without the
  // `beforeEach` reset the second of these two would find the first's window still open and report
  // nothing. Remove the reset and this pair fails; a name-discipline comment would not.
  test('a reused list name reports verbatim even though an earlier test used it', async () => {
    const list = await sealedList('shared-across-tests');

    await addLate(list, 1);

    expect(vi.mocked(console.warn)).toHaveBeenCalledTimes(1);
  });

  test('and reports verbatim again here, because each test starts with an unspent budget', async () => {
    const list = await sealedList('shared-across-tests');

    await addLate(list, 1);

    expect(vi.mocked(console.warn)).toHaveBeenCalledTimes(1);
  });
});
