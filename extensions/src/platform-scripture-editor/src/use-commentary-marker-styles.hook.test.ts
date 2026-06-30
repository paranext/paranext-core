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
// Hand-authored override appended after the generated commentary stylesheet (disabled-link stopgap).
vi.mock('./marker-styles/commentary-overrides.scss?inline', () => ({ default: 'OVERRIDES_CSS' }));

vi.mock('platform-bible-react', () => ({
  useStylesheet: vi.fn(),
}));

const mockUseStylesheet = vi.mocked(useStylesheet);

/** The single string argument most recently passed to `useStylesheet`. */
function lastStylesheet(): string | undefined {
  return mockUseStylesheet.mock.lastCall?.[0];
}

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
    (_label, projectId, expectedCss) => {
      renderHook(() => useCommentaryMarkerStyles(projectId));
      expect(lastStylesheet()).toContain(expectedCss);
    },
  );

  it.each([
    ['HBKENG', `${HBKENG_UID}_local-suffix`],
    ['TNN', `${TNN_UID}_local-suffix`],
    ['TND', `${TND_UID}_local-suffix`],
  ])(
    'appends the disabled-link override after the %s stylesheet so it wins the cascade',
    (label, projectId) => {
      renderHook(() => useCommentaryMarkerStyles(projectId));
      const sheet = lastStylesheet() ?? '';
      const generatedCss = `${label}_CSS`;
      expect(sheet).toContain('OVERRIDES_CSS');
      // The override must come AFTER the generated CSS — equal specificity, later source order wins.
      expect(sheet.indexOf('OVERRIDES_CSS')).toBeGreaterThan(sheet.indexOf(generatedCss));
    },
  );

  it('matches DBL UID case-insensitively', () => {
    renderHook(() => useCommentaryMarkerStyles(`${HBKENG_UID.toUpperCase()}_LOCAL-SUFFIX`));
    expect(lastStylesheet()).toContain('HBKENG_CSS');
  });

  it.each<[string, string | undefined]>([
    ['undefined', undefined],
    ['empty string', ''],
    ['unrelated project id', 'some-other-project-id-1234567890abcdef'],
  ])('applies no stylesheet (and no override) when projectId is %s', (_label, projectId) => {
    renderHook(() => useCommentaryMarkerStyles(projectId));
    // No commentary matched, so nothing is injected — not even the override.
    expect(mockUseStylesheet).toHaveBeenLastCalledWith(undefined);
  });

  it('swaps stylesheets when projectId changes between commentaries', () => {
    const initialProps: { projectId: string | undefined } = { projectId: `${HBKENG_UID}_a` };
    const { rerender } = renderHook(
      ({ projectId }: { projectId: string | undefined }) => useCommentaryMarkerStyles(projectId),
      { initialProps },
    );
    expect(lastStylesheet()).toContain('HBKENG_CSS');

    rerender({ projectId: `${TNN_UID}_b` });
    expect(lastStylesheet()).toContain('TNN_CSS');

    rerender({ projectId: 'unrelated-project-id' });
    expect(mockUseStylesheet).toHaveBeenLastCalledWith(undefined);
  });
});
