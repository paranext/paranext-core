// @vitest-environment jsdom
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { TabToolbar } from '@/components/advanced/tab-toolbar/tab-toolbar.component';

describe('TabToolbar', () => {
  it('does not force tw:h-full on the start/center/end area wrappers (breaks vertical centering)', () => {
    render(
      <TabToolbar
        onSelectProjectMenuItem={() => {}}
        onSelectViewInfoMenuItem={() => {}}
        startAreaChildren={<span data-testid="start-child">Start</span>}
        centerAreaChildren={<span data-testid="center-child">Center</span>}
        endAreaChildren={<span data-testid="end-child">End</span>}
      />,
    );

    const startWrapper = screen.getByTestId('start-child').parentElement;
    const centerWrapper = screen.getByTestId('center-child').parentElement;
    const endWrapper = screen.getByTestId('end-child').parentElement;

    [startWrapper, centerWrapper, endWrapper].forEach((wrapper) => {
      expect(wrapper).not.toBeNull();
      expect(wrapper?.className).not.toMatch(/(?:^|\s)tw:h-full(?:\s|$)/);
    });
  });

  it('does not wrap the start/center/end area wrappers onto multiple lines (the enclosing TabToolbarContainer has a fixed height and clips overflow, so wrapped content is not hidden cleanly but sliced through the middle and shown overlapping)', () => {
    render(
      <TabToolbar
        onSelectProjectMenuItem={() => {}}
        onSelectViewInfoMenuItem={() => {}}
        startAreaChildren={<span data-testid="start-child">Start</span>}
        centerAreaChildren={<span data-testid="center-child">Center</span>}
        endAreaChildren={<span data-testid="end-child">End</span>}
      />,
    );

    const startWrapper = screen.getByTestId('start-child').parentElement;
    const centerWrapper = screen.getByTestId('center-child').parentElement;
    const endWrapper = screen.getByTestId('end-child').parentElement;

    [startWrapper, centerWrapper, endWrapper].forEach((wrapper) => {
      expect(wrapper).not.toBeNull();
      expect(wrapper?.className).toMatch(/(?:^|\s)tw:flex-nowrap(?:\s|$)/);
      expect(wrapper?.className).not.toMatch(/(?:^|\s)tw:flex-wrap(?:\s|$)/);
    });
  });
});
