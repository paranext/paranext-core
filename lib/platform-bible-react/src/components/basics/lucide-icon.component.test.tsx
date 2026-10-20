// @vitest-environment jsdom
import { describe, expect, it } from 'vitest';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { LUCIDE_ICON_NAMES, LucideIcon } from './lucide-icon.component';

describe('LucideIcon', () => {
  it('renders an svg for every name in LUCIDE_ICON_NAMES', () => {
    expect(LUCIDE_ICON_NAMES.length).toBeGreaterThan(0);
    const namesWithoutSvg = LUCIDE_ICON_NAMES.filter((name) => {
      const { container, unmount } = render(<LucideIcon name={name} />);
      const hasSvg = Boolean(container.querySelector('svg'));
      unmount();
      return !hasSvg;
    });
    expect(namesWithoutSvg).toEqual([]);
  });

  it('returns nothing for an unknown name', () => {
    const { container } = render(<LucideIcon name="not-a-real-icon" />);
    expect(container).toBeEmptyDOMElement();
  });

  it('the svg strokes with currentColor', () => {
    const { container } = render(<LucideIcon name="search" />);
    expect(container.querySelector('svg')?.getAttribute('stroke')).toBe('currentColor');
  });

  it('hides the svg from assistive technology and applies the class name', () => {
    const { container } = render(<LucideIcon name="search" className="extra" />);
    const svg = container.querySelector('svg');
    expect(svg).toHaveAttribute('aria-hidden', 'true');
    expect(svg).toHaveClass('extra');
  });
});
