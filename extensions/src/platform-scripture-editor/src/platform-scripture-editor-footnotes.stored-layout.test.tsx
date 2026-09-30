// @vitest-environment jsdom
import '@testing-library/jest-dom';
import { act, render } from '@testing-library/react';
import { ComponentProps, useState } from 'react';
import { afterEach, beforeAll, beforeEach, describe, expect, it, vi } from 'vitest';
import { Usj } from '@eten-tech-foundation/scripture-utilities';
import * as PlatformBibleReact from 'platform-bible-react';
import { FootnotesLayout } from './platform-scripture-editor-footnotes.component';

vi.mock('@papi/frontend', () => ({
  logger: { warn: vi.fn(), debug: vi.fn(), info: vi.fn(), error: vi.fn() },
}));

type OnLayoutChange = ComponentProps<
  typeof PlatformBibleReact.ResizablePanelGroup
>['onLayoutChange'];

/**
 * The layout-change callback the component last handed its panel group. The panel library reports
 * layouts only after measuring, which jsdom cannot do, so the tests drive the callback directly.
 */
let latestOnLayoutChange: OnLayoutChange;

vi.mock('platform-bible-react', async (importOriginal) => {
  const actual = await importOriginal<typeof PlatformBibleReact>();
  function ResizablePanelGroupSpy({
    onLayoutChange,
    ...props
  }: ComponentProps<typeof actual.ResizablePanelGroup>) {
    latestOnLayoutChange = onLayoutChange;
    // Forwarding every prop unchanged is the point of this spy.
    // eslint-disable-next-line react/jsx-props-no-spreading
    return <actual.ResizablePanelGroup onLayoutChange={onLayoutChange} {...props} />;
  }
  return { ...actual, ResizablePanelGroup: ResizablePanelGroupSpy };
});

beforeAll(() => {
  if (typeof globalThis.ResizeObserver === 'undefined') {
    const stubResizeObserver = vi.fn(() => ({
      observe: vi.fn(),
      unobserve: vi.fn(),
      disconnect: vi.fn(),
    }));
    // ResizeObserver constructor as a vi.fn factory satisfies runtime contract but not structural
    // typing; we cast through unknown to adapt it to the required type
    // eslint-disable-next-line no-type-assertion/no-type-assertion
    globalThis.ResizeObserver = stubResizeObserver as unknown as typeof ResizeObserver;
  }
  if (typeof Element.prototype.scrollIntoView === 'undefined') {
    Element.prototype.scrollIntoView = vi.fn();
  }
});

/** Every write the component made to its web-view state, in order, as `[key, value]`. */
let stateWrites: [string, unknown][] = [];

function useRecordingWebViewState<T>(
  key: string,
  defaultValue: T,
): [T, (stateValue: T) => void, () => void] {
  const [value, setValue] = useState<T>(defaultValue);
  return [
    value,
    (stateValue: T) => {
      stateWrites.push([key, stateValue]);
      setValue(stateValue);
    },
    () => setValue(defaultValue),
  ];
}

const usj: Usj = { type: 'USJ', version: '3.1', content: [] };

function layout(isPaneVisible: boolean) {
  return (
    <FootnotesLayout
      usj={usj}
      showMarkers
      useWebViewState={useRecordingWebViewState}
      localizedStrings={{}}
      onClose={() => {}}
      isPaneVisible={isPaneVisible}
    >
      <div data-testid="editor" />
    </FootnotesLayout>
  );
}

/** Lets the size debounce (50ms) run out. */
async function flushSizeDebounce() {
  await act(async () => {
    vi.advanceTimersByTime(100);
  });
}

function sizeWrites() {
  return stateWrites.filter(([key]) => key === 'footnotesPaneSizePercent');
}

beforeEach(() => {
  vi.useFakeTimers();
  stateWrites = [];
  latestOnLayoutChange = undefined;
});

afterEach(() => {
  vi.useRealTimers();
});

describe('FootnotesLayout stored pane size', () => {
  it('stores the pane size a layout reports while the pane is shown', async () => {
    render(layout(true));
    act(() => latestOnLayoutChange?.({ 'scripture-text': 65, 'footnotes-pane': 35 }));
    await flushSizeDebounce();
    expect(sizeWrites()).toEqual([['footnotesPaneSizePercent', 35]]);
  });

  it('stores nothing from a layout reported while the pane is hidden', async () => {
    render(layout(false));
    act(() => latestOnLayoutChange?.({ 'scripture-text': 100 }));
    // Even a layout that still names the pane (a report racing the pane's removal) says nothing
    // about the split to restore.
    act(() => latestOnLayoutChange?.({ 'scripture-text': 90, 'footnotes-pane': 10 }));
    await flushSizeDebounce();
    expect(sizeWrites()).toEqual([]);
  });

  describe('in a container too short for the stored size', () => {
    // 100px tall: the pane's floor (its close button, 24px) is then 24% — above the stored 20%.
    beforeEach(() => {
      vi.spyOn(HTMLElement.prototype, 'clientHeight', 'get').mockReturnValue(100);
    });
    afterEach(() => {
      vi.restoreAllMocks();
    });

    it('clamps the stored size into the limits while the pane is shown', () => {
      render(layout(true));
      const writes = sizeWrites();
      expect(writes).toHaveLength(1);
      expect(writes[0][1]).toBeGreaterThanOrEqual(24);
    });

    it('leaves the stored size alone while the pane is hidden', () => {
      render(layout(false));
      expect(sizeWrites()).toEqual([]);
    });
  });

  it('drops a size still waiting out the debounce when the pane closes', async () => {
    const { rerender } = render(layout(true));
    act(() => latestOnLayoutChange?.({ 'scripture-text': 70, 'footnotes-pane': 30 }));
    rerender(layout(false));
    await flushSizeDebounce();
    expect(sizeWrites()).toEqual([]);
  });
});

describe('FootnotesLayout pane location request', () => {
  function requestLocationChange() {
    act(() => {
      window.dispatchEvent(
        new MessageEvent('message', { data: { method: 'changeFootnotesPaneLocation' } }),
      );
    });
  }

  it('moves a shown pane', () => {
    render(layout(true));
    requestLocationChange();
    expect(stateWrites).toContainEqual(['footnotesPanePosition', 'trailing']);
  });

  it('leaves a hidden pane where it was', () => {
    render(layout(false));
    requestLocationChange();
    expect(stateWrites.filter(([key]) => key === 'footnotesPanePosition')).toEqual([]);
  });
});
