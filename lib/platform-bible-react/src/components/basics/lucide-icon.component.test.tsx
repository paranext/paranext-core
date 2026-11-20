// @vitest-environment jsdom
import { describe, expect, it } from 'vitest';
import { render } from '@testing-library/react';
import { ClipboardCopy, ClipboardPaste, ClipboardType, Redo2, Scissors, Undo2 } from 'lucide-react';
import '@testing-library/jest-dom';
import { isLucideIconName, LUCIDE_ICON_NAMES, LucideIcon } from './lucide-icon.component';
import { LUCIDE_ICONS_BY_NAME } from './lucide-icons.util';

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

  it('isLucideIconName accepts listed names only, not undefined or inherited keys', () => {
    expect(isLucideIconName('search')).toBe(true);
    expect(isLucideIconName('not-a-real-icon')).toBe(false);
    expect(isLucideIconName('constructor')).toBe(false);
    expect(isLucideIconName(undefined)).toBe(false);
  });

  it('maps the clipboard and undo/redo names to their lucide icons', () => {
    expect(LUCIDE_ICONS_BY_NAME).toMatchObject({
      'clipboard-copy': ClipboardCopy,
      'undo-2': Undo2,
      'redo-2': Redo2,
    });
    expect(isLucideIconName('clipboard-copy')).toBe(true);
    expect(isLucideIconName('undo-2')).toBe(true);
    expect(isLucideIconName('redo-2')).toBe(true);
  });

  it('maps the cut and paste names to their lucide icons', () => {
    expect(LUCIDE_ICONS_BY_NAME).toMatchObject({
      scissors: Scissors,
      'clipboard-paste': ClipboardPaste,
      'clipboard-type': ClipboardType,
    });
    expect(isLucideIconName('scissors')).toBe(true);
    expect(isLucideIconName('clipboard-paste')).toBe(true);
    expect(isLucideIconName('clipboard-type')).toBe(true);
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
