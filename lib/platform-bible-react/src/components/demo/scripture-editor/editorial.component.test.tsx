import { act, render } from '@testing-library/react';
import { Editorial } from '@eten-tech-foundation/platform-editor';
import type { Usj } from '@eten-tech-foundation/scripture-utilities';
import genUsj from './test-data/GEN.usj.json';

describe('Editorial', () => {
  it('mounts without errors when given a c+v-only USJ', async () => {
    // JSON imports are widened to string by TypeScript; double assertion bridges to Usj's string-literal type fields
    // eslint-disable-next-line no-type-assertion/no-type-assertion
    const usj = genUsj as unknown as Usj;
    const { container } = await act(async () => render(<Editorial defaultUsj={usj} />));
    expect(container.firstChild).not.toBeNull();
  });
});
