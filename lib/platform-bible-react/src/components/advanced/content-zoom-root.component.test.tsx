// @vitest-environment jsdom
import { createRef } from 'react';
import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import {
  ContentZoomRoot,
  CONTENT_ZOOM_ROOT_ATTRIBUTE,
} from '@/components/advanced/content-zoom-root.component';

describe('ContentZoomRoot', () => {
  it('exports the attribute literal that mirrors core’s constant', () => {
    expect(CONTENT_ZOOM_ROOT_ATTRIBUTE).toBe('data-platform-content-zoom-root');
  });

  it('renders a div carrying the marker attribute with an empty value for the main area', () => {
    const { container } = render(<ContentZoomRoot>text</ContentZoomRoot>);
    const element = container.firstElementChild;
    expect(element?.tagName).toBe('DIV');
    expect(element?.hasAttribute(CONTENT_ZOOM_ROOT_ATTRIBUTE)).toBe(true);
    expect(element?.getAttribute(CONTENT_ZOOM_ROOT_ATTRIBUTE)).toBe('');
  });

  it('names a zoom area through the area prop', () => {
    const { container } = render(<ContentZoomRoot area="footnotes">notes</ContentZoomRoot>);
    expect(container.firstElementChild?.getAttribute(CONTENT_ZOOM_ROOT_ATTRIBUTE)).toBe(
      'footnotes',
    );
  });

  it('passes className, dir and other div props through', () => {
    const { container } = render(
      <ContentZoomRoot className="tw:flex-1" dir="rtl" id="x" aria-label="content">
        content
      </ContentZoomRoot>,
    );
    const element = container.querySelector('div');
    expect(element?.className).toBe('tw:flex-1');
    expect(element?.getAttribute('dir')).toBe('rtl');
    expect(element?.id).toBe('x');
    expect(element?.getAttribute('aria-label')).toBe('content');
  });

  it('renders its children', () => {
    const { container, getByTestId } = render(
      <ContentZoomRoot>
        some text
        <span data-testid="nested">nested</span>
      </ContentZoomRoot>,
    );
    expect(container.textContent).toContain('some text');
    expect(getByTestId('nested')).toBeInTheDocument();
  });

  it('forwards its ref to the rendered element', () => {
    const ref = createRef<HTMLDivElement>();
    const { container } = render(<ContentZoomRoot ref={ref}>text</ContentZoomRoot>);
    expect(ref.current).toBe(container.firstElementChild);
    expect(ref.current?.getAttribute(CONTENT_ZOOM_ROOT_ATTRIBUTE)).toBe('');
  });

  it('the area prop wins over a marker attribute passed through props', () => {
    const { container } = render(
      <ContentZoomRoot area="footnotes" {...{ 'data-platform-content-zoom-root': 'other' }}>
        text
      </ContentZoomRoot>,
    );
    expect(container.firstElementChild?.getAttribute(CONTENT_ZOOM_ROOT_ATTRIBUTE)).toBe(
      'footnotes',
    );
  });
});
