// @vitest-environment jsdom

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useStylesheet } from 'platform-bible-react';
import { useCommentaryMarkerStyles } from './use-commentary-marker-styles.hook';

// Mock the SCSS bundle imports so we can assert on deterministic strings rather than the real
// generated CSS (which would also break the test environment with `?inline` parsing).
vi.mock('./marker-styles/hbkeng.scss?inline', () => ({ default: 'HBKENG_CSS' }));
vi.mock('./marker-styles/tnn.scss?inline', () => ({ default: 'TNN_CSS' }));
vi.mock('./marker-styles/tnd.scss?inline', () => ({ default: 'TND_CSS' }));

vi.mock('platform-bible-react', () => ({
  useStylesheet: vi.fn(),
}));

const mockUseStylesheet = vi.mocked(useStylesheet);

// DBL entry UIDs — must match the keys in use-commentary-marker-styles.hook.ts and the C#
// `CommentariesWhiteList` in DblResourcesDataProvider.cs.
const HBKENG_UID = '97196133a859179b';
const TNN_UID = '090f7cbf7924b245';
const TND_UID = 'b58b80b798e22be6';

describe('useCommentaryMarkerStyles', () => {
  beforeEach(() => {
    mockUseStylesheet.mockClear();
  });

  it.each([
    ['HBKENG', `${HBKENG_UID}_local-suffix`, 'HBKENG_CSS'],
    ['TNN', `${TNN_UID}_local-suffix`, 'TNN_CSS'],
    ['TND', `${TND_UID}_local-suffix`, 'TND_CSS'],
  ])(
    'applies %s styles when projectId is prefixed by its DBL UID',
    (_label, projectId, expected) => {
      renderHook(() => useCommentaryMarkerStyles(projectId));
      expect(mockUseStylesheet).toHaveBeenLastCalledWith(expected);
    },
  );

  it('matches DBL UID case-insensitively', () => {
    renderHook(() => useCommentaryMarkerStyles(`${HBKENG_UID.toUpperCase()}_LOCAL-SUFFIX`));
    expect(mockUseStylesheet).toHaveBeenLastCalledWith('HBKENG_CSS');
  });

  it.each<[string, string | undefined]>([
    ['undefined', undefined],
    ['empty string', ''],
    ['unrelated project id', 'some-other-project-id-1234567890abcdef'],
  ])('applies no stylesheet when projectId is %s', (_label, projectId) => {
    renderHook(() => useCommentaryMarkerStyles(projectId));
    expect(mockUseStylesheet).toHaveBeenLastCalledWith(undefined);
  });

  it('swaps stylesheets when projectId changes between commentaries', () => {
    const initialProps: { projectId: string | undefined } = { projectId: `${HBKENG_UID}_a` };
    const { rerender } = renderHook(
      ({ projectId }: { projectId: string | undefined }) => useCommentaryMarkerStyles(projectId),
      { initialProps },
    );
    expect(mockUseStylesheet).toHaveBeenLastCalledWith('HBKENG_CSS');

    rerender({ projectId: `${TNN_UID}_b` });
    expect(mockUseStylesheet).toHaveBeenLastCalledWith('TNN_CSS');

    rerender({ projectId: 'unrelated-project-id' });
    expect(mockUseStylesheet).toHaveBeenLastCalledWith(undefined);
  });
});
