import { formatTimeSpan } from './date-time-format-util';

const MS_PER_SECOND = 1000;
const MS_PER_MINUTE = 60 * MS_PER_SECOND;
const MS_PER_DAY = 24 * 60 * MS_PER_MINUTE;

/** Fixed reference "now" so the tests never depend on the real clock. */
const to = new Date('2024-08-03T08:00:00.000Z');
const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });

describe('formatTimeSpan', () => {
  it('reports a sub-second-past span as "now", not "1 second ago"', () => {
    // Any past event less than a full second ago should round to 0 seconds ("now"),
    // matching the behavior for a sub-second future event.
    const since = new Date(to.getTime() - 1); // 1 ms ago
    expect(formatTimeSpan(rtf, since, to)).toBe(rtf.format(0, 'second'));
  });

  it('rounds elapsed seconds to nearest rather than always rounding away from zero', () => {
    // 1.4 s ago should round to 1 second ago, not 2.
    const since = new Date(to.getTime() - 1400);
    expect(formatTimeSpan(rtf, since, to)).toBe(rtf.format(-1, 'second'));
  });

  it('formats a whole-second past span correctly', () => {
    const since = new Date(to.getTime() - 3 * MS_PER_SECOND);
    expect(formatTimeSpan(rtf, since, to)).toBe(rtf.format(-3, 'second'));
  });

  it('formats a minutes-ago span correctly', () => {
    const since = new Date(to.getTime() - 5 * MS_PER_MINUTE);
    expect(formatTimeSpan(rtf, since, to)).toBe(rtf.format(-5, 'minute'));
  });

  it('formats an hours-ago span correctly', () => {
    const since = new Date(to.getTime() - 3 * 60 * MS_PER_MINUTE);
    expect(formatTimeSpan(rtf, since, to)).toBe(rtf.format(-3, 'hour'));
  });

  it('formats a multi-day-ago span correctly', () => {
    const since = new Date(to.getTime() - 2 * MS_PER_DAY);
    expect(formatTimeSpan(rtf, since, to)).toBe(rtf.format(-2, 'day'));
  });

  it('formats a sub-second future span as "now"', () => {
    const since = new Date(to.getTime() + 1);
    expect(formatTimeSpan(rtf, since, to)).toBe(rtf.format(0, 'second'));
  });
});
