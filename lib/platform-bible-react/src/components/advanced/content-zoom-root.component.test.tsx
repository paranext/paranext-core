// @vitest-environment jsdom
import { createRef } from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ContentZoomRoot } from '@/components/advanced/content-zoom-root.component';
import {
  CONTENT_ZOOM_ROOT_ATTRIBUTE,
  useContentZoomTextProps,
} from '@/context/content-zoom-text.context';

function ProjectText({ children }: { children: string }) {
  const contentZoomTextProps = useContentZoomTextProps();
  return (
    <span
      data-testid="library-text"
      // The hook returns only the content-zoom marker attribute, or nothing.
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...contentZoomTextProps}
    >
      {children}
    </span>
  );
}

describe('ContentZoomRoot', () => {
  it('renders a div carrying the marker attribute with an empty value for the main area', () => {
    const { container } = render(<ContentZoomRoot>text</ContentZoomRoot>);
    const element = container.firstElementChild;
    expect(element?.tagName).toBe('DIV');
    expect(element?.getAttribute(CONTENT_ZOOM_ROOT_ATTRIBUTE)).toBe('');
  });

  it('renders a span when asked, for inline text inside phrasing content', () => {
    const { container } = render(
      <p>
        <button type="button">GEN 1:1</button>
        <ContentZoomRoot as="span">In the beginning</ContentZoomRoot>
      </p>,
    );
    const marked = container.querySelectorAll(`[${CONTENT_ZOOM_ROOT_ATTRIBUTE}]`);
    expect(marked).toHaveLength(1);
    expect(marked[0].tagName).toBe('SPAN');
    expect(marked[0].textContent).toBe('In the beginning');
    expect(marked[0].parentElement?.tagName).toBe('P');
  });

  it('names a zoom area through the area prop', () => {
    const { container } = render(<ContentZoomRoot area="footnotes">notes</ContentZoomRoot>);
    expect(container.firstElementChild?.getAttribute(CONTENT_ZOOM_ROOT_ATTRIBUTE)).toBe(
      'footnotes',
    );
  });

  it('passes className, dir and other props through', () => {
    const { container } = render(
      <ContentZoomRoot as="span" className="tw:flex-1" dir="rtl" id="x" aria-label="content">
        content
      </ContentZoomRoot>,
    );
    const element = container.querySelector('span');
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

  it('forwards its ref to the rendered element, for either tag', () => {
    const divRef = createRef<HTMLDivElement>();
    const spanRef = createRef<HTMLElement>();
    render(
      <>
        <ContentZoomRoot ref={divRef}>div text</ContentZoomRoot>
        <ContentZoomRoot ref={spanRef} as="span">
          span text
        </ContentZoomRoot>
      </>,
    );
    expect(divRef.current?.tagName).toBe('DIV');
    expect(spanRef.current?.tagName).toBe('SPAN');
    expect(spanRef.current?.getAttribute(CONTENT_ZOOM_ROOT_ATTRIBUTE)).toBe('');
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

  it('opts nothing inside it into library text marking (it provides no context)', () => {
    const { container } = render(
      <ContentZoomRoot>
        <ProjectText>library text</ProjectText>
      </ContentZoomRoot>,
    );
    expect(container.querySelectorAll(`[${CONTENT_ZOOM_ROOT_ATTRIBUTE}]`)).toHaveLength(1);
    expect(screen.getByTestId('library-text')).not.toHaveAttribute(CONTENT_ZOOM_ROOT_ATTRIBUTE);
  });
});
