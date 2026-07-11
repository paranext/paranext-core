import { beforeEach, describe, expect, it, vi } from 'vitest';
import { ProcessType } from '@shared/global-this.model';
import { logger } from '@shared/services/logger.service';
import { markStartup, STARTUP_MARK_PREFIX } from '@shared/utils/startup-timing.util';

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
});
