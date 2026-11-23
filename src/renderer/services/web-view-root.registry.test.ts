import { beforeEach, describe, expect, test, vi } from 'vitest';
import type { RegisteredWebViewRoot } from '@renderer/global-this-web-view.model';
import { claimWebViewRoots, registerWebViewRoot } from '@renderer/services/web-view-root.registry';

const mocks = vi.hoisted(() => ({ loggerDebug: vi.fn(), loggerWarn: vi.fn() }));

vi.mock('@shared/services/logger.service', () => ({
  logger: { debug: mocks.loggerDebug, info: vi.fn(), warn: mocks.loggerWarn, error: vi.fn() },
}));

const WEB_VIEW_ID = 'registry-view';

/** An iframe stand-in showing its own document, as far as the registry reads one */
function makeIframe() {
  const shownDocument = document.implementation.createHTMLDocument('');
  const iframe = { contentDocument: shownDocument };
  // The registry reads only `contentDocument`
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  const iframeRef = { current: iframe as unknown as HTMLIFrameElement };
  return { iframeRef, shownDocument };
}

function makeRoot(rootDocument: Document): RegisteredWebViewRoot {
  return { unmountRoot: vi.fn(), document: rootDocument, hasUnloaded: false };
}

beforeEach(() => {
  vi.clearAllMocks();
});

describe('the web view root registry', () => {
  test('hands a root to the owner whose iframe shows its document, and only that owner', () => {
    const first = makeIframe();
    const second = makeIframe();
    const onFirstRoot = vi.fn();
    const onSecondRoot = vi.fn();
    const releaseFirst = claimWebViewRoots(WEB_VIEW_ID, first.iframeRef, onFirstRoot);
    const releaseSecond = claimWebViewRoots(WEB_VIEW_ID, second.iframeRef, onSecondRoot);
    try {
      const firstRoot = makeRoot(first.shownDocument);
      const secondRoot = makeRoot(second.shownDocument);

      registerWebViewRoot(WEB_VIEW_ID, firstRoot);
      registerWebViewRoot(WEB_VIEW_ID, secondRoot);

      expect(onFirstRoot.mock.calls).toEqual([[firstRoot]]);
      expect(onSecondRoot.mock.calls).toEqual([[secondRoot]]);
    } finally {
      releaseFirst();
      releaseSecond();
    }
  });

  test('stops handing roots to an owner that released its claim, and logs the root it drops', () => {
    const released = makeIframe();
    const remaining = makeIframe();
    const onReleasedRoot = vi.fn();
    const onRemainingRoot = vi.fn();
    const release = claimWebViewRoots(WEB_VIEW_ID, released.iframeRef, onReleasedRoot);
    const releaseRemaining = claimWebViewRoots(WEB_VIEW_ID, remaining.iframeRef, onRemainingRoot);
    try {
      expect(release()).toBe(true);
      const releasedRoot = makeRoot(released.shownDocument);
      const remainingRoot = makeRoot(remaining.shownDocument);

      registerWebViewRoot(WEB_VIEW_ID, remainingRoot);
      expect(mocks.loggerDebug).not.toHaveBeenCalled();
      registerWebViewRoot(WEB_VIEW_ID, releasedRoot);

      expect(onRemainingRoot.mock.calls).toEqual([[remainingRoot]]);
      expect(onReleasedRoot).not.toHaveBeenCalled();
      expect(mocks.loggerDebug).toHaveBeenCalledWith(expect.stringContaining(WEB_VIEW_ID));
      // Releasing twice is a no-op
      expect(release()).toBe(false);
    } finally {
      releaseRemaining();
    }
  });
});
