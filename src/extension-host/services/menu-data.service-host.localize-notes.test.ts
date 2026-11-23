import { describe, expect, test } from 'vitest';
import { getRealCombinedMenus } from './menu-data.service-host.test-utils';

/** Every `localizeNotes` string at any depth of `value`, with the label key it annotates. */
function collectLocalizeNotes(value: unknown): { label: string; note: string }[] {
  if (Array.isArray(value)) return value.flatMap(collectLocalizeNotes);
  if (!value || typeof value !== 'object') return [];
  const own: { label: string; note: string }[] = [];
  if ('localizeNotes' in value && typeof value.localizeNotes === 'string') {
    const label = 'label' in value && typeof value.label === 'string' ? value.label : '(no label)';
    own.push({ label, note: value.localizeNotes });
  }
  return [...own, ...Object.values(value).flatMap(collectLocalizeNotes)];
}

describe('Translator notes in the shipped menus', () => {
  /**
   * `localizeNotes` is read by translators, who need where the label appears and what it means. Why
   * an item is hidden in a mode, and how to bring it back, belongs in a code review or commit
   * message, not in a note a translator has to read.
   */
  const DEVELOPER_ONLY_WORDING = /Hidden in|to restore|hiddenInterfaceModes/i;

  test('no localizeNotes carries developer rationale', () => {
    const notes = collectLocalizeNotes(getRealCombinedMenus());
    // Positive control: the walk found notes to check.
    expect(notes.length).toBeGreaterThan(50);
    expect(notes.filter(({ note }) => DEVELOPER_ONLY_WORDING.test(note))).toEqual([]);
  });
});
