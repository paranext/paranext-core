import { PlatformEventEmitter } from './platform-event-emitter.model';

describe('unsubscribing', () => {
  it('does not prevent other subscribers from running when unsubscribing in a callback', () => {
    const shouldUnsubscribeSubscriptions = [false, true, false, true, true, false];
    // Map of event number to which event subscription indices ran for that event number
    // Purposely making this an array, not a Set, to make sure we catch duplicate runs
    const subscriptionResults: { [eventNum: string]: number[] } = {};

    const numEventsToEmit = 3;
    // Array of each event number that should have been run: [0, 1, 2, ..., numEventsToEdit - 1]
    const eventNumArray = [...Array(numEventsToEmit).keys()];
    // Array of each event number that should have been run after unsubscribing
    // (basically eventNumArray without the first event)
    const [, ...eventNumArrayAfterUnsubscribing] = eventNumArray;
    let nextEventNum = 0;
    const emitter = new PlatformEventEmitter<number>();
    const emitEvent = () => {
      emitter.emit(nextEventNum);
      nextEventNum += 1;
    };
    const unsubscribers = shouldUnsubscribeSubscriptions.map((shouldUnsubscribe, i) =>
      emitter.subscribe((eventNum) => {
        const subscriptionResultsForEventNum = subscriptionResults[eventNum] ?? [];
        if (!subscriptionResults[eventNum])
          subscriptionResults[eventNum] = subscriptionResultsForEventNum;

        subscriptionResultsForEventNum.push(i);

        if (shouldUnsubscribe) unsubscribers[i]();
      }),
    );

    for (let i = 0; i < numEventsToEmit; i += 1) emitEvent();

    // There should be results for each event that was run
    expect(
      Object.keys(subscriptionResults)
        .map((eventNumString) => parseInt(eventNumString, 10))
        .sort(),
    ).toEqual(eventNumArray);

    // All should have run the first time
    expect(subscriptionResults[0]).toEqual(
      shouldUnsubscribeSubscriptions.map((_shouldUnsubscribe, i) => i),
    );
    eventNumArrayAfterUnsubscribing.forEach((eventNum) => {
      // Only the `false` ones (didn't unsubscribe) should have run after the first time
      expect(subscriptionResults[eventNum]).toEqual(
        shouldUnsubscribeSubscriptions
          .map((shouldUnsubscribe, i) => (shouldUnsubscribe ? undefined : i))
          .filter((i) => i !== undefined),
      );
    });
  });
});

describe('emitIsolated', () => {
  it('runs the subscribers after one that throws and reports which one threw', () => {
    const emitter = new PlatformEventEmitter<string>();
    const subscribersRun: number[] = [];
    const thrown = new Error('subscriber blew up');
    emitter.subscribe(() => subscribersRun.push(0));
    emitter.subscribe(() => {
      throw thrown;
    });
    emitter.subscribe(() => subscribersRun.push(2));
    const reportedErrors: [unknown, number][] = [];

    emitter.emitIsolated('the news', (error, subscriberIndex) => {
      reportedErrors.push([error, subscriberIndex]);
    });

    expect(subscribersRun).toEqual([0, 2]);
    expect(reportedErrors).toEqual([[thrown, 1]]);
  });

  it('does not throw out of the emit when a subscriber throws', () => {
    const emitter = new PlatformEventEmitter<undefined>();
    emitter.subscribe(() => {
      throw new Error('subscriber blew up');
    });

    expect(() => emitter.emitIsolated(undefined, () => {})).not.toThrow();
  });

  it('gives every subscriber the event, unlike emit which stops at the first throw', () => {
    const emitter = new PlatformEventEmitter<number>();
    const eventsSeenByLastSubscriber: number[] = [];
    emitter.subscribe(() => {
      throw new Error('subscriber blew up');
    });
    emitter.subscribe((eventNumber) => {
      eventsSeenByLastSubscriber.push(eventNumber);
    });

    expect(() => emitter.emit(1)).toThrow('subscriber blew up');
    expect(eventsSeenByLastSubscriber).toEqual([]);

    emitter.emitIsolated(2, () => {});

    expect(eventsSeenByLastSubscriber).toEqual([2]);
  });

  it('still refuses to emit once disposed', async () => {
    const emitter = new PlatformEventEmitter<undefined>();
    await emitter.dispose();

    expect(() => emitter.emitIsolated(undefined, () => {})).toThrow('Emitter is disposed');
  });
});
