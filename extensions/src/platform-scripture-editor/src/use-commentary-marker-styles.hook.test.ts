// @vitest-environment jsdom

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useStylesheet } from 'platform-bible-react';
import { useCommentaryMarkerStyles } from './use-commentary-marker-styles.hook';

// Mock the SCSS bundle imports so we can assert on deterministic strings rather than the real
// generated CSS (which would also break the test environment with `?inline` parsing). One mock per
// supported commentary resource — keep in sync with the imports in the hook.
vi.mock('./marker-styles/hbkeng.scss?inline', () => ({ default: 'HBKENG_CSS' }));
vi.mock('./marker-styles/hbkcs.scss?inline', () => ({ default: 'HBKCS_CSS' }));
vi.mock('./marker-styles/hbkct.scss?inline', () => ({ default: 'HBKCT_CSS' }));
vi.mock('./marker-styles/hbkfra.scss?inline', () => ({ default: 'HBKFRA_CSS' }));
vi.mock('./marker-styles/hbkpt.scss?inline', () => ({ default: 'HBKPT_CSS' }));
vi.mock('./marker-styles/hbkesp.scss?inline', () => ({ default: 'HBKESP_CSS' }));
vi.mock('./marker-styles/tnn.scss?inline', () => ({ default: 'TNN_CSS' }));
vi.mock('./marker-styles/tnnesp.scss?inline', () => ({ default: 'TNNESP_CSS' }));
vi.mock('./marker-styles/tnnptg.scss?inline', () => ({ default: 'TNNPTG_CSS' }));
vi.mock('./marker-styles/tnnfr.scss?inline', () => ({ default: 'TNNFR_CSS' }));
vi.mock('./marker-styles/tnd.scss?inline', () => ({ default: 'TND_CSS' }));
vi.mock('./marker-styles/tndesp.scss?inline', () => ({ default: 'TNDESP_CSS' }));
vi.mock('./marker-styles/tndptg.scss?inline', () => ({ default: 'TNDPTG_CSS' }));
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
// `CommentariesWhiteList` in DblResourcesDataProvider.cs. One entry per supported commentary; the
// mocked stylesheet for each is `${label}_CSS`.
const COMMENTARIES: ReadonlyArray<readonly [label: string, uid: string]> = [
  ['HBKENG', '97196133a859179b'],
  ['HBKCS', '6c21e835eb8ca3b2'],
  ['HBKCT', '77dc05b26ce399dd'],
  ['HBKFRA', '815f988992157b10'],
  ['HBKPT', '24daa5f24f0020b3'],
  ['HBKESP', '1ff24938918bd69e'],
  ['TNN', '090f7cbf7924b245'],
  ['TNNESP', '0617c397f003127c'],
  ['TNNPTG', '233345361843ce8b'],
  ['TNNFR', 'd95fde28b4346e61'],
  ['TND', 'b58b80b798e22be6'],
  ['TNDESP', '943164c222f75687'],
  ['TNDPTG', 'e0b3f20ff8677585'],
];

const HBKENG_UID = '97196133a859179b';

describe('useCommentaryMarkerStyles', () => {
  beforeEach(() => {
    mockUseStylesheet.mockClear();
  });

  it.each(COMMENTARIES)(
    'applies %s styles when projectId is prefixed by its DBL UID',
    (label, uid) => {
      renderHook(() => useCommentaryMarkerStyles(`${uid}_local-suffix`));
      expect(lastStylesheet()).toContain(`${label}_CSS`);
    },
  );

  it.each(COMMENTARIES)(
    'appends the disabled-link override after the %s stylesheet so it wins the cascade',
    (label, uid) => {
      renderHook(() => useCommentaryMarkerStyles(`${uid}_local-suffix`));
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
    const tnnUid = '090f7cbf7924b245';
    const initialProps: { projectId: string | undefined } = { projectId: `${HBKENG_UID}_a` };
    const { rerender } = renderHook(
      ({ projectId }: { projectId: string | undefined }) => useCommentaryMarkerStyles(projectId),
      { initialProps },
    );
    expect(lastStylesheet()).toContain('HBKENG_CSS');

    rerender({ projectId: `${tnnUid}_b` });
    expect(lastStylesheet()).toContain('TNN_CSS');

    rerender({ projectId: 'unrelated-project-id' });
    expect(mockUseStylesheet).toHaveBeenLastCalledWith(undefined);
  });
});
