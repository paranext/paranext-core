// @vitest-environment jsdom
import { act, renderHook } from '@testing-library/react';
import { vi } from 'vitest';
import { PlatformEventEmitter, SingleColumnMenu } from 'platform-bible-utils';

const mockContextKeyValues = new Map<string, string | number | boolean>();
const mockOnDidChangeEmitter = new PlatformEventEmitter<{ key: string; value: unknown }>();

vi.mock('@shared/services/context-keys.service', () => ({
  contextKeysService: {
    get: (key: string) => mockContextKeyValues.get(key),
    onDidChange: (callback: (event: { key: string; value: unknown }) => void) =>
      mockOnDidChangeEmitter.event(callback),
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

  it('should re-evaluate when a context key changes', () => {
    const { result } = renderHook(() => useEvaluatedMenu(menuData, { webViewId: 'wv1' }));
    expect(result.current?.items.map((item) => item.label)).toEqual(['%always%']);

    act(() => {
      mockContextKeyValues.set('test.webView.wv1.visible', true);
      mockOnDidChangeEmitter.emit({ key: 'test.webView.wv1.visible', value: true });
    });
    expect(result.current?.items.map((item) => item.label)).toEqual(['%always%', '%conditional%']);
  });
});
