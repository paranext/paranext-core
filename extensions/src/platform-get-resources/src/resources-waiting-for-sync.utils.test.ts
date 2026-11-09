import { describe, expect, it } from 'vitest';
import { getIdsWaitingForSync } from './resources-waiting-for-sync.utils';

describe('getIdsWaitingForSync', () => {
  it.each([
    ['nothing clicked, nothing held', [], [], []],
    ['clicked but not held', ['a'], [], []],
    ['held but not clicked', [], ['a'], []],
    ['clicked and held', ['a'], ['a'], ['a']],
    ['only the held one of two clicked', ['a', 'b'], ['b'], ['b']],
    ['uid comparison ignores case', ['AbC-1'], ['abc-1'], ['AbC-1']],
    ['held uid in upper case', ['abc-1'], ['ABC-1'], ['abc-1']],
  ])('%s', (_name, clicked, held, expected) => {
    expect(getIdsWaitingForSync(clicked, held)).toEqual(expected);
  });
});
