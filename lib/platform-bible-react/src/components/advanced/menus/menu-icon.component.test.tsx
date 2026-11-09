// @vitest-environment jsdom
import { describe, expect, it } from 'vitest';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import MenuItemIcon from './menu-icon.component';

describe('MenuItemIcon image icons', () => {
  it('wraps a leading image in a 16px box, the size of a named icon and of the icon-less spacer', () => {
    const { container } = render(
      <MenuItemIcon icon="icon.png" menuLabel="Item" leading leadingSlot="icon" />,
    );
    const box = container.querySelector('[data-slot="menu-icon-image-box"]');
    expect(box).not.toBeNull();
    expect(box).toHaveClass('tw:w-4', 'tw:shrink-0', 'tw:justify-center', 'tw:me-2');
    const image = box?.querySelector('img');
    expect(image).toHaveClass('tw:max-h-4', 'tw:max-w-4');
  });

  it('caps a trailing image at 16px and leaves it unwrapped', () => {
    const { container } = render(<MenuItemIcon icon="icon.png" menuLabel="Item" />);
    expect(container.querySelector('[data-slot="menu-icon-image-box"]')).toBeNull();
    expect(container.querySelector('img')).toHaveClass('tw:max-h-4', 'tw:max-w-4', 'tw:ms-2');
  });

  it('gives an icon-less item in a list with leading icons a 16px spacer', () => {
    const { container } = render(<MenuItemIcon menuLabel="Item" leading leadingSlot="icon" />);
    expect(container.querySelector('[data-slot="menu-icon-spacer"]')).toHaveClass('tw:w-4');
  });

  it('renders nothing for an icon-less item in a list without leading icons', () => {
    const { container } = render(<MenuItemIcon menuLabel="Item" leading leadingSlot="none" />);
    expect(container).toBeEmptyDOMElement();
  });
});
