import { vi } from 'vitest';
import { SingleColumnMenu } from 'platform-bible-utils';

const mockKeyValues = new Map<string, string | number | boolean>();

vi.mock('@shared/services/context-keys.service', () => ({
  contextKeysService: { get: (key: string) => mockKeyValues.get(key) },
}));

// eslint-disable-next-line import/first
import { evaluateMenuRecordingReads } from './evaluate-menu-recording-reads.util';

const menu: SingleColumnMenu = {
  groups: { 'test.group': { order: 1 } },
  items: [
    {
      label: '%a%',
      group: 'test.group',
      order: 1,
      command: 'test.a',
      localizeNotes: '',
      when: 'test.a && test.b',
    },
    {
      label: '%c%',
      group: 'test.group',
      order: 2,
      command: 'test.c',
      localizeNotes: '',
      enabledWhen: 'test.{webViewId}.c',
    },
  ],
};

describe('evaluateMenuRecordingReads', () => {
  beforeEach(() => mockKeyValues.clear());

  it('records only the keys actually read, short-circuiting on the first falsy operand', () => {
    const { readKeys } = evaluateMenuRecordingReads(menu, { webViewId: 'wv1' }, () => {});
    expect(readKeys).toEqual(new Set(['test.a', 'test.wv1.c']));
  });

  it('records the second operand once the first is truthy', () => {
    mockKeyValues.set('test.a', true);
    const { readKeys } = evaluateMenuRecordingReads(menu, { webViewId: 'wv1' }, () => {});
    expect(readKeys).toEqual(new Set(['test.a', 'test.b', 'test.wv1.c']));
  });

  it('does not read a key whose template variable is unresolved', () => {
    const { readKeys } = evaluateMenuRecordingReads(menu, {}, () => {});
    expect(readKeys).toEqual(new Set(['test.a']));
  });

  it('returns the evaluated menu', () => {
    const { evaluatedMenu } = evaluateMenuRecordingReads(menu, { webViewId: 'wv1' }, () => {});
    expect(evaluatedMenu.items.map((item) => item.label)).toEqual(['%c%']);
  });
});
