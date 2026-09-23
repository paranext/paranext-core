// Electron's `WebFrameMain` reports a missing parent or frame as `null`, so these fixtures do too.
/* eslint-disable no-null/no-null */
import { describe, expect, it, vi } from 'vitest';
import {
  type DisplayMediaRequestFrame,
  selectDisplayMediaSource,
} from '@main/services/display-media-request.util';

vi.mock('@shared/services/logger.service', () => ({
  logger: { debug: vi.fn(), error: vi.fn(), info: vi.fn(), warn: vi.fn() },
}));

/** Builds a window's top frame, which is its own `top` and has no parent */
function createTopFrame(): DisplayMediaRequestFrame {
  const topFrame: DisplayMediaRequestFrame = {
    url: 'http://localhost:1212/index.html',
    parent: null,
    top: null,
  };
  topFrame.top = topFrame;
  return topFrame;
}

function createChildFrame(parent: DisplayMediaRequestFrame, url: string): DisplayMediaRequestFrame {
  return { url, parent, top: parent.top };
}

describe('selectDisplayMediaSource', () => {
  it('grants the top frame when the top frame asks', () => {
    const topFrame = createTopFrame();

    expect(selectDisplayMediaSource(topFrame)).toBe(topFrame);
  });

  it('denies a web view, which is an about:srcdoc child of the top frame', () => {
    const webViewFrame = createChildFrame(createTopFrame(), 'about:srcdoc');

    expect(selectDisplayMediaSource(webViewFrame)).toBeUndefined();
  });

  it('denies an about:blank child of the top frame', () => {
    const blankFrame = createChildFrame(createTopFrame(), 'about:blank');

    expect(selectDisplayMediaSource(blankFrame)).toBeUndefined();
  });

  it('denies a frame nested inside a web view', () => {
    const webViewFrame = createChildFrame(createTopFrame(), 'about:srcdoc');
    const nestedFrame = createChildFrame(webViewFrame, 'about:blank');

    expect(selectDisplayMediaSource(nestedFrame)).toBeUndefined();
  });

  it('denies a request whose frame is gone', () => {
    expect(selectDisplayMediaSource(null)).toBeUndefined();
    expect(selectDisplayMediaSource(undefined)).toBeUndefined();
  });
});
