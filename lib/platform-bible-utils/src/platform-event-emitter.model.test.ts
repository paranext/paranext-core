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
