import { beforeEach, describe, expect, it, vi } from 'vitest';
import { ProcessType } from '@shared/global-this.model';
import { STARTUP_MARK_MAIN_PROCESS_TAG } from '@shared/data/platform.data';
import { logger } from '@shared/services/logger.service';
import {
  markStartup,
  markStartupOnce,
  STARTUP_MARK_PREFIX,
} from '@shared/utils/startup-timing.util';

// Use an explicit factory (matching the convention used by every other test that mocks this
// module) rather than the bare `vi.mock('@shared/services/logger.service')` automock: the shared
// `__mocks__/logger.service.ts` defines plain functions, not `vi.fn()`, so an automocked
// `logger.info` is not spy-capable and assertions like `toHaveBeenCalledTimes` fail with
// "is not a spy".
vi.mock('@shared/services/logger.service', () => ({
  logger: { info: vi.fn(), warn: vi.fn(), error: vi.fn() },
}));

describe('markStartup', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    globalThis.processType = ProcessType.Main;
  });

  it('emits one parseable mark line when enabled', () => {
    globalThis.startupMarks = true;
    markStartup('window-created');
    expect(logger.info).toHaveBeenCalledTimes(1);
    const line = vi.mocked(logger.info).mock.calls[0][0];
    expect(line).toMatch(
      new RegExp(`^${STARTUP_MARK_PREFIX} ${ProcessType.Main} window-created \\d+$`),
    );
  });

  it('is a no-op when disabled', () => {
    globalThis.startupMarks = false;
    markStartup('window-created');
    expect(logger.info).not.toHaveBeenCalled();
  });

  it('strips line terminators from the name so the mark stays on one parseable line', () => {
    globalThis.startupMarks = true;
    markStartup('activate-start Some\nExtension');
    const line = vi.mocked(logger.info).mock.calls[0][0];
    expect(line).not.toContain('\n');
    expect(line).toMatch(
      new RegExp(`^${STARTUP_MARK_PREFIX} ${ProcessType.Main} activate-start Some-Extension \\d+$`),
    );
  });
});

describe('markStartupOnce', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    globalThis.processType = ProcessType.Main;
  });

  it('emits the mark only once per name across repeated calls', () => {
    globalThis.startupMarks = true;
    // Unique name: the once-set is module-scoped and persists across tests.
    markStartupOnce('once-repeated');
    markStartupOnce('once-repeated');
    markStartupOnce('once-repeated');
    expect(logger.info).toHaveBeenCalledTimes(1);
  });

  it('is a no-op when disabled', () => {
    globalThis.startupMarks = false;
    markStartupOnce('once-disabled');
    expect(logger.info).not.toHaveBeenCalled();
  });
});

describe('STARTUP_MARK_MAIN_PROCESS_TAG', () => {
  it('equals ProcessType.Main so the startup-waterfall parser detects the run boundary', () => {
    // The startup-waterfall CLI parser (.erb/scripts/startup-waterfall.util.ts `selectLatestRun`)
    // keys the multi-launch run boundary on the bare literal STARTUP_MARK_MAIN_PROCESS_TAG, while
    // the main process actually emits marks tagged with globalThis.processType (= ProcessType.Main).
    // These are kept identical only by a comment because the CLI module cannot import ProcessType
    // (that would pull in global-this.model, React, and aliases the CLI can't resolve). If they ever
    // diverge, selectLatestRun silently stops finding boundaries and merges launches into one bogus
    // Total span. This pins the cross-module contract that the comment only asks for.
    expect(STARTUP_MARK_MAIN_PROCESS_TAG).toBe(ProcessType.Main);
  });
});
