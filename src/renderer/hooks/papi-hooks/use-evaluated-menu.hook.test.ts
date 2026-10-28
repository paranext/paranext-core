// @vitest-environment jsdom
import { act, renderHook } from '@testing-library/react';
import { useEffect, useState } from 'react';
import { vi } from 'vitest';
import { PlatformEventEmitter, SingleColumnMenu } from 'platform-bible-utils';

const mockContextKeyValues = new Map<string, string | number | boolean>();
const mockOnDidChangeEmitter = new PlatformEventEmitter<{ key: string; value: unknown }>();
const mockUnsubscribe = vi.fn();
const mockGet = vi.fn((key: string) => mockContextKeyValues.get(key));
let mockChangeSequence = 0;

vi.mock('@shared/services/context-keys.service', () => ({
  contextKeysService: {
    get: (key: string) => mockGet(key),
    getChangeSequence: () => mockChangeSequence,
    onDidChange: (callback: (event: { key: string; value: unknown }) => void) => {
      const unsubscribe = mockOnDidChangeEmitter.event(callback);
      return () => {
        mockUnsubscribe();
        return unsubscribe();
      };
    },
  },
}));

vi.mock('@shared/services/logger.service', () => ({
  logger: { debug: vi.fn(), info: vi.fn(), warn: vi.fn(), error: vi.fn() },
}));

// Import after mocks so the hook picks up the mocked services
// eslint-disable-next-line import/first
import { useEvaluatedMenu } from './use-evaluated-menu.hook';

const menuData: SingleColumnMenu = {
  groups: { 'test.group': { order: 1 } },
  items: [
    {
      label: '%always%',
      group: 'test.group',
      order: 1,
      command: 'test.always',
      localizeNotes: '',
    },
    {
      label: '%conditional%',
      group: 'test.group',
      order: 2,
      command: 'test.conditional',
      localizeNotes: '',
      when: 'test.webView.{webViewId}.visible',
    },
  ],
};

describe('useEvaluatedMenu', () => {
  beforeEach(() => {
    mockContextKeyValues.clear();
    mockUnsubscribe.mockClear();
    mockGet.mockClear();
    mockChangeSequence = 0;
  });

  it('should return undefined for undefined menu data', () => {
    const { result } = renderHook(() => useEvaluatedMenu(undefined, {}));
    expect(result.current).toBeUndefined();
  });

  it('should evaluate the menu with the provided template vars', () => {
    mockContextKeyValues.set('test.webView.wv1.visible', true);
    const { result } = renderHook(() => useEvaluatedMenu(menuData, { webViewId: 'wv1' }));
    expect(result.current?.items.map((item) => item.label)).toEqual(['%always%', '%conditional%']);
  });

  it('should pick up a key set by an earlier effect before the hook subscribed', () => {
    const { result } = renderHook(() => {
      // Runs before the hook's own subscription effect, after the first render evaluated
      useEffect(() => {
        mockContextKeyValues.set('test.webView.wv1.visible', true);
        mockChangeSequence += 1;
      }, []);
      return useEvaluatedMenu(menuData, { webViewId: 'wv1' });
    });
    expect(result.current?.items.map((item) => item.label)).toEqual(['%always%', '%conditional%']);
  });

  it('should catch up when a render that reused the memo saw a newer change sequence', () => {
    // Referentially stable so the second render reuses the memoized evaluation
    const templateVars = { webViewId: 'wv1' };
    const { result } = renderHook(() => {
      const evaluated = useEvaluatedMenu(menuData, templateVars);
      // A render-phase update re-renders before the commit; the memo keeps the first evaluation
      const [bumped, setBumped] = useState(false);
      if (!bumped) {
        mockContextKeyValues.set('test.webView.wv1.visible', true);
        mockChangeSequence += 1;
        setBumped(true);
      }
      return evaluated;
    });
    expect(result.current?.items.map((item) => item.label)).toEqual(['%always%', '%conditional%']);
  });

  it('evaluates the menu exactly once on a plain mount', () => {
    const { result } = renderHook(() => useEvaluatedMenu(menuData, { webViewId: 'wv1' }));
    expect(mockGet).toHaveBeenCalledTimes(1);
    expect(result.current?.items.map((item) => item.label)).toEqual(['%always%']);
  });

  it('should re-evaluate when a context key changes', () => {
    const { result } = renderHook(() => useEvaluatedMenu(menuData, { webViewId: 'wv1' }));
    expect(result.current?.items.map((item) => item.label)).toEqual(['%always%']);

    act(() => {
      mockContextKeyValues.set('test.webView.wv1.visible', true);
      mockChangeSequence += 1;
      mockOnDidChangeEmitter.emit({ key: 'test.webView.wv1.visible', value: true });
    });
    expect(result.current?.items.map((item) => item.label)).toEqual(['%always%', '%conditional%']);
  });

  it('should unsubscribe from context key changes on unmount', () => {
    const { unmount } = renderHook(() => useEvaluatedMenu(menuData, { webViewId: 'wv1' }));
    expect(mockUnsubscribe).not.toHaveBeenCalled();
    unmount();
    expect(mockUnsubscribe).toHaveBeenCalledTimes(1);
  });
});
