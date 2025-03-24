import { describe, it, expect, beforeEach, vi } from 'vitest';
import { EventRollingTimeCounter } from './event-rolling-time-counter';

describe('EventRollingTimeCounter', () => {
  let counter: EventRollingTimeCounter;

  beforeEach(() => {
    counter = new EventRollingTimeCounter(3);
  });

  it('should initialize with totalInstances as 0', () => {
    expect(counter.totalInstances).toBe(0);
  });

  it('should record instances and update totalInstances', () => {
    counter.recordInstance();
    expect(counter.totalInstances).toBe(1);

    counter.recordInstance();
    expect(counter.totalInstances).toBe(2);
  });

  it('should not violate threshold if not enough data', () => {
    vi.spyOn(performance, 'now').mockReturnValue(1000);
    counter.recordInstance();

    expect(counter.hasViolatedThreshold(500)).toBe(false);
  });

  it('should not violate threshold if time difference is greater than threshold', () => {
    vi.spyOn(performance, 'now').mockReturnValue(1000);
    counter.recordInstance();

    vi.spyOn(performance, 'now').mockReturnValue(2000);
    counter.recordInstance();

    vi.spyOn(performance, 'now').mockReturnValue(3000);
    counter.recordInstance();

    expect(counter.hasViolatedThreshold(500)).toBe(false);
  });

  it('should violate the threshold if time difference is less than threshold', () => {
    vi.spyOn(performance, 'now').mockReturnValue(1000);
    counter.recordInstance();

    vi.spyOn(performance, 'now').mockReturnValue(1500);
    counter.recordInstance();

    vi.spyOn(performance, 'now').mockReturnValue(2000);
    counter.recordInstance();

    expect(counter.hasViolatedThreshold(1500)).toBe(true);
  });

  it('should handle more instances than the buffer can hold', () => {
    vi.spyOn(performance, 'now').mockReturnValue(1000);
    counter.recordInstance();

    vi.spyOn(performance, 'now').mockReturnValue(2000);
    counter.recordInstance();

    vi.spyOn(performance, 'now').mockReturnValue(3000);
    counter.recordInstance();

    vi.spyOn(performance, 'now').mockReturnValue(4000);
    counter.recordInstance();

    expect(counter.totalInstances).toBe(4);
    expect(counter.hasViolatedThreshold(2000)).toBe(false);
  });
});
