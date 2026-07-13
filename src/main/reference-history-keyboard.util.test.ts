import { getPhysicalHistoryNavigationDirection } from './reference-history-keyboard.util';

/** Build a `HistoryKeyInput` with all modifiers off, then apply overrides */
function key(
  keyName: string,
  modifiers: Partial<{ alt: boolean; control: boolean; shift: boolean; meta: boolean }> = {},
) {
  return { key: keyName, alt: false, control: false, shift: false, meta: false, ...modifiers };
}

describe('getPhysicalHistoryNavigationDirection', () => {
  describe('on Windows/Linux', () => {
    it.each(['win32', 'linux'] as const)('detects Alt+Left as left on %s', (platform) => {
      expect(getPhysicalHistoryNavigationDirection(key('ArrowLeft', { alt: true }), platform)).toBe(
        'left',
      );
    });

    it.each(['win32', 'linux'] as const)('detects Alt+Right as right on %s', (platform) => {
      expect(
        getPhysicalHistoryNavigationDirection(key('ArrowRight', { alt: true }), platform),
      ).toBe('right');
    });

    it('requires an exact modifier match', () => {
      expect(
        getPhysicalHistoryNavigationDirection(
          key('ArrowLeft', { alt: true, control: true }),
          'win32',
        ),
      ).toBeUndefined();
      expect(
        getPhysicalHistoryNavigationDirection(
          key('ArrowLeft', { alt: true, shift: true }),
          'win32',
        ),
      ).toBeUndefined();
      expect(
        getPhysicalHistoryNavigationDirection(key('ArrowLeft', { alt: true, meta: true }), 'win32'),
      ).toBeUndefined();
    });

    it('ignores arrows without Alt', () => {
      expect(getPhysicalHistoryNavigationDirection(key('ArrowLeft'), 'win32')).toBeUndefined();
      expect(
        getPhysicalHistoryNavigationDirection(key('ArrowLeft', { control: true }), 'win32'),
      ).toBeUndefined();
    });

    it('ignores the macOS bracket shortcuts', () => {
      expect(
        getPhysicalHistoryNavigationDirection(key('[', { meta: true }), 'win32'),
      ).toBeUndefined();
      expect(
        getPhysicalHistoryNavigationDirection(key('[', { alt: true }), 'win32'),
      ).toBeUndefined();
    });
  });

  describe('on macOS', () => {
    it('detects Cmd+[ as left', () => {
      expect(getPhysicalHistoryNavigationDirection(key('[', { meta: true }), 'darwin')).toBe(
        'left',
      );
    });

    it('detects Cmd+] as right', () => {
      expect(getPhysicalHistoryNavigationDirection(key(']', { meta: true }), 'darwin')).toBe(
        'right',
      );
    });

    it('leaves Cmd+Shift+[/] free for tab focus navigation', () => {
      expect(
        getPhysicalHistoryNavigationDirection(key('[', { meta: true, shift: true }), 'darwin'),
      ).toBeUndefined();
      expect(
        getPhysicalHistoryNavigationDirection(key(']', { meta: true, shift: true }), 'darwin'),
      ).toBeUndefined();
    });

    it('requires an exact modifier match', () => {
      expect(
        getPhysicalHistoryNavigationDirection(key('[', { meta: true, alt: true }), 'darwin'),
      ).toBeUndefined();
      expect(
        getPhysicalHistoryNavigationDirection(key('[', { meta: true, control: true }), 'darwin'),
      ).toBeUndefined();
      expect(getPhysicalHistoryNavigationDirection(key('['), 'darwin')).toBeUndefined();
    });

    it('does not intercept Option+arrows (system move-by-word)', () => {
      expect(
        getPhysicalHistoryNavigationDirection(key('ArrowLeft', { alt: true }), 'darwin'),
      ).toBeUndefined();
      expect(
        getPhysicalHistoryNavigationDirection(key('ArrowRight', { alt: true }), 'darwin'),
      ).toBeUndefined();
    });
  });
});
