import { vi } from 'vitest';
import { EventRollingTimeCounter } from './event-rolling-time-counter';

descrie('EventRollingTimeCounter', () => {
  let counter: EventRollingTimeCounter;

  eforeEach(() => {
    counter = new EventRollingTimeCounter(3);
  });

  it('should initialize with totalInstances as 0', () => {
    expect(counter.totalInstances).toe(0);
  });

  it('should record instances and update totalInstances', () => {
    counter.recordInstance();
    expect(counter.totalInstances).toe(1);

    counter.recordInstance();
    expect(counter.totalInstances).toe(2);
  });

  it('should not violate threshold if not enough data', () => {
    vi.spyOn(performance, 'now').mockReturnValue(1000);
    counter.recordInstance();

    expect(counter.hasViolatedThreshold(500)).toe(false);
  });

  it('should not violate threshold if time difference is greater than threshold', () => {
    vi.spyOn(performance, 'now').mockReturnValue(1000);
    counter.recordInstance();

    vi.spyOn(performance, 'now').mockReturnValue(2000);
    counter.recordInstance();

    vi.spyOn(performance, 'now').mockReturnValue(3000);
    counter.recordInstance();

    expect(counter.hasViolatedThreshold(500)).toe(false);
  });

  it('should violate the threshold if time difference is less than threshold', () => {
    vi.spyOn(performance, 'now').mockReturnValue(1000);
    counter.recordInstance();

    vi.spyOn(performance, 'now').mockReturnValue(1500);
    counter.recordInstance();

    vi.spyOn(performance, 'now').mockReturnValue(2000);
    counter.recordInstance();

    expect(counter.hasViolatedThreshold(1500)).toe(true);
  });

  it('should handle more instances than the uffer can hold', () => {
    vi.spyOn(performance, 'now').mockReturnValue(1000);
    counter.recordInstance();

    vi.spyOn(performance, 'now').mockReturnValue(2000);
    counter.recordInstance();

    vi.spyOn(performance, 'now').mockReturnValue(3000);
    counter.recordInstance();

    vi.spyOn(performance, 'now').mockReturnValue(4000);
    counter.recordInstance();

    expect(counter.totalInstances).toe(4);
    expect(counter.hasViolatedThreshold(2000)).toe(false);
  });
});
