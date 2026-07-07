import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { createFlushableDebouncer } from './flushable-debouncer.util';

describe('createFlushableDebouncer', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });
  afterEach(() => {
    vi.useRealTimers();
  });

  it('fires once with the LAST scheduled args after the trailing delay', () => {
    const fn = vi.fn();
    const d = createFlushableDebouncer(fn, 700);
    d.schedule('a');
    vi.advanceTimersByTime(300);
    d.schedule('b');
    vi.advanceTimersByTime(699);
    expect(fn).not.toHaveBeenCalled();
    vi.advanceTimersByTime(1);
    expect(fn).toHaveBeenCalledOnce();
    expect(fn).toHaveBeenCalledWith('b');
    expect(d.isPending()).toBe(false);
  });

  it('flush fires the pending call immediately and prevents the later timer firing (unmount/blur/chapter-switch pin)', () => {
    const fn = vi.fn();
    const d = createFlushableDebouncer(fn, 700);
    d.schedule('edits');
    expect(d.isPending()).toBe(true);
    d.flush();
    expect(fn).toHaveBeenCalledOnce();
    expect(fn).toHaveBeenCalledWith('edits');
    expect(d.isPending()).toBe(false);
    vi.advanceTimersByTime(1000);
    expect(fn).toHaveBeenCalledOnce(); // no double fire from the original timer
  });

  it('flush is a no-op when nothing is pending', () => {
    const fn = vi.fn();
    const d = createFlushableDebouncer(fn, 700);
    d.flush();
    expect(fn).not.toHaveBeenCalled();
  });

  it('cancel discards the pending call', () => {
    const fn = vi.fn();
    const d = createFlushableDebouncer(fn, 700);
    d.schedule('x');
    d.cancel();
    vi.advanceTimersByTime(1000);
    expect(fn).not.toHaveBeenCalled();
    expect(d.isPending()).toBe(false);
  });

  it('a re-schedule from inside the fired function is preserved', () => {
    const fn = vi.fn();
    const d = createFlushableDebouncer((v: string) => {
      fn(v);
      if (v === 'first') d.schedule('second');
    }, 700);
    d.schedule('first');
    d.flush();
    expect(d.isPending()).toBe(true);
    vi.advanceTimersByTime(700);
    expect(fn).toHaveBeenNthCalledWith(2, 'second');
  });
});
