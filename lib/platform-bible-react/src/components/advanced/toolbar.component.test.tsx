// @vitest-environment jsdom

import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { Toolbar } from './toolbar.component';

describe('Toolbar', () => {
  it('applies position: relative by default when no style is passed', () => {
    const { container } = render(<Toolbar id="my-toolbar" onSelectMenuItem={vi.fn()} />);

    expect(container.querySelector('#my-toolbar')).toHaveStyle({ position: 'relative' });
  });

  it('merges a caller-supplied style with the default position: relative', () => {
    const { container } = render(
      <Toolbar id="my-toolbar" onSelectMenuItem={vi.fn()} style={{ paddingInlineEnd: 150 }} />,
    );

    expect(container.querySelector('#my-toolbar')).toHaveStyle({
      position: 'relative',
      paddingInlineEnd: '150px',
    });
  });
});
