import { act, render } from '@testing-library/react';
import { Editorial } from '@eten-tech-foundation/platform-editor';
import type { Usj } from '@eten-tech-foundation/scripture-utilities';
import genUsj from './test-fixtures/gen.usj.json';

describe('Editorial', () => {
  it('mounts without errors when given a c+v-only USJ', async () => {
    await act(async () => {
      render(<Editorial defaultUsj={genUsj as unknown as Usj} />);
    });
  });
});
