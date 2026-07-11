import { describe, expect, test } from 'vitest';
import { getVerseNavigationCommand } from '@main/verse-navigation-shortcuts.util';

const NO_MODIFIERS = { control: false, alt: false, meta: false, shift: false };

describe('getVerseNavigationCommand on Windows/Linux', () => {
  test.each([
    [{ key: 'F8', ...NO_MODIFIERS }, 'platform.goToNextChapter'],
    [{ key: 'F8', ...NO_MODIFIERS, control: true }, 'platform.goToPreviousChapter'],
    [{ key: 'F9', ...NO_MODIFIERS }, 'platform.goToNextBook'],
    [{ key: 'F9', ...NO_MODIFIERS, control: true }, 'platform.goToPreviousBook'],
    [{ key: 'ArrowDown', ...NO_MODIFIERS, control: true }, 'platform.goToNextVerse'],
    [{ key: 'ArrowUp', ...NO_MODIFIERS, control: true }, 'platform.goToPreviousVerse'],
    [{ key: 'b', ...NO_MODIFIERS, control: true }, 'platform.openBookChapterControl'],
    [{ key: 'B', ...NO_MODIFIERS, control: true }, 'platform.openBookChapterControl'],
  ])('maps %o to %s', (input, expected) => {
    expect(getVerseNavigationCommand(input, false)).toBe(expected);
  });

  test.each([
    [{ key: 'ArrowDown', ...NO_MODIFIERS }],
    [{ key: 'ArrowUp', ...NO_MODIFIERS }],
    [{ key: 'b', ...NO_MODIFIERS }],
    [{ key: 'F8', ...NO_MODIFIERS, alt: true }],
    [{ key: 'F8', ...NO_MODIFIERS, meta: true }],
    [{ key: 'F8', ...NO_MODIFIERS, shift: true }],
    [{ key: 'b', ...NO_MODIFIERS, control: true, shift: true }],
    [{ key: 'ArrowUp', ...NO_MODIFIERS, control: true, alt: true }],
    [{ key: 'Tab', ...NO_MODIFIERS, control: true }],
  ])('returns undefined for %o', (input) => {
    expect(getVerseNavigationCommand(input, false)).toBeUndefined();
  });
});

describe('getVerseNavigationCommand on macOS', () => {
  test.each([
    [{ key: 'F8', ...NO_MODIFIERS }, 'platform.goToNextChapter'],
    [{ key: 'F8', ...NO_MODIFIERS, meta: true }, 'platform.goToPreviousChapter'],
    [{ key: 'F9', ...NO_MODIFIERS }, 'platform.goToNextBook'],
    [{ key: 'F9', ...NO_MODIFIERS, meta: true }, 'platform.goToPreviousBook'],
    [{ key: 'ArrowDown', ...NO_MODIFIERS, meta: true }, 'platform.goToNextVerse'],
    [{ key: 'ArrowUp', ...NO_MODIFIERS, meta: true }, 'platform.goToPreviousVerse'],
    [{ key: 'b', ...NO_MODIFIERS, meta: true }, 'platform.openBookChapterControl'],
    [{ key: 'B', ...NO_MODIFIERS, meta: true }, 'platform.openBookChapterControl'],
  ])('maps %o to %s', (input, expected) => {
    expect(getVerseNavigationCommand(input, true)).toBe(expected);
  });

  test.each([
    // Control combos are not claimed on macOS: ⌃F8 is the system "move focus to status
    // menus" shortcut, and ⌃↑/⌃↓ belong to Mission Control/App Exposé
    [{ key: 'F8', ...NO_MODIFIERS, control: true }],
    [{ key: 'F9', ...NO_MODIFIERS, control: true }],
    [{ key: 'ArrowDown', ...NO_MODIFIERS, control: true }],
    [{ key: 'ArrowUp', ...NO_MODIFIERS, control: true }],
    [{ key: 'b', ...NO_MODIFIERS, control: true }],
    [{ key: 'ArrowDown', ...NO_MODIFIERS }],
    [{ key: 'ArrowUp', ...NO_MODIFIERS }],
    [{ key: 'b', ...NO_MODIFIERS }],
    [{ key: 'F8', ...NO_MODIFIERS, alt: true }],
    [{ key: 'F8', ...NO_MODIFIERS, shift: true }],
    [{ key: 'b', ...NO_MODIFIERS, meta: true, shift: true }],
    [{ key: 'ArrowUp', ...NO_MODIFIERS, meta: true, alt: true }],
    [{ key: 'Tab', ...NO_MODIFIERS, meta: true }],
  ])('returns undefined for %o', (input) => {
    expect(getVerseNavigationCommand(input, true)).toBeUndefined();
  });
});
