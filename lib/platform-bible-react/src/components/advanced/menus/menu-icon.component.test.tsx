// @vitest-environment jsdom
import { describe, expect, it } from 'vitest';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import MenuItemIcon from './menu-icon.component';

describe('MenuItemIcon image icons', () => {
  it('wraps a leading image in a box as wide as the icon-less spacer', () => {
    const { container } = render(<MenuItemIcon icon="icon.png" menuLabel="Item" leading />);
    const box = container.querySelector('[data-slot="menu-icon-image-box"]');
    expect(box).not.toBeNull();
    expect(box).toHaveClass('tw:w-5', 'tw:shrink-0', 'tw:justify-center', 'tw:me-2');
    const image = box?.querySelector('img');
    expect(image).toHaveClass('tw:max-h-5', 'tw:max-w-5');
  });

  it('leaves a trailing image unwrapped', () => {
    const { container } = render(<MenuItemIcon icon="icon.png" menuLabel="Item" />);
    expect(container.querySelector('[data-slot="menu-icon-image-box"]')).toBeNull();
    expect(container.querySelector('img')).toHaveClass('tw:ms-2');
  });
});
