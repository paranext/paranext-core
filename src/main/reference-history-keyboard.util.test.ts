import {
  getPhysicalHistoryNavigationDirection,
  resolveHistoryNavigationDirection,
} from './reference-history-keyboard.util';

/** Build a `HistoryKeyInput` with all modifiers off, then apply overrides */
function key(
  keyName: string,
  modifiers: Partial<{ alt: boolean; control: boolean; shift: boolean; meta: boolean }> = {},
) {
  return { key: keyName, alt: false, control: false, shift: false, meta: false, ...modifiers };
}

describe('getPhysicalHistoryNavigationDirection', () => {
  describe('on Windows/Linux', () => {
    it.each(['win32', 'linux'] as const)('detects Alt+Left as back on %s', (platform) => {
      expect(getPhysicalHistoryNavigationDirection(key('ArrowLeft', { alt: true }), platform)).toBe(
        'back',
      );
    });

    it.each(['win32', 'linux'] as const)('detects Alt+Right as forward on %s', (platform) => {
      expect(
        getPhysicalHistoryNavigationDirection(key('ArrowRight', { alt: true }), platform),
      ).toBe('forward');
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
    it('detects Cmd+[ as back', () => {
      expect(getPhysicalHistoryNavigationDirection(key('[', { meta: true }), 'darwin')).toBe(
        'back',
      );
    });

    it('detects Cmd+] as forward', () => {
      expect(getPhysicalHistoryNavigationDirection(key(']', { meta: true }), 'darwin')).toBe(
        'forward',
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

describe('resolveHistoryNavigationDirection', () => {
  it('passes the physical direction through in LTR', () => {
    expect(resolveHistoryNavigationDirection('back', 'ltr')).toBe('back');
    expect(resolveHistoryNavigationDirection('forward', 'ltr')).toBe('forward');
  });

  it('swaps the physical direction in RTL', () => {
    expect(resolveHistoryNavigationDirection('back', 'rtl')).toBe('forward');
    expect(resolveHistoryNavigationDirection('forward', 'rtl')).toBe('back');
  });
});
