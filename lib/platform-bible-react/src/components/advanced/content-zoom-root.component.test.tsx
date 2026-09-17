// @vitest-environment jsdom
import { createRef } from 'react';
import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import {
  ContentZoomAreaProvider,
  ContentZoomRoot,
  CONTENT_ZOOM_CSS_VARIABLE_PREFIX,
  CONTENT_ZOOM_DEFAULT_CSS_VARIABLE,
  CONTENT_ZOOM_POPUP_ATTRIBUTE,
  CONTENT_ZOOM_ROOT_ATTRIBUTE,
  getContentZoomPopupStyle,
  useContentZoomArea,
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

function AreaProbe() {
  const area = useContentZoomArea();
  return <span data-testid="probe">{area === undefined ? 'none' : `[${area}]`}</span>;
}

describe('content zoom area context', () => {
  it('exports the pop-up and variable literals that mirror core’s constants', () => {
    expect(CONTENT_ZOOM_POPUP_ATTRIBUTE).toBe('data-platform-content-zoom-popup');
    expect(CONTENT_ZOOM_CSS_VARIABLE_PREFIX).toBe('--platform-content-zoom-');
    expect(CONTENT_ZOOM_DEFAULT_CSS_VARIABLE).toBe('--platform-content-zoom-default');
  });

  it('reports no area outside every provider', () => {
    const { getByTestId } = render(<AreaProbe />);
    expect(getByTestId('probe').textContent).toBe('none');
  });

  it('a ContentZoomRoot provides its own area to what it renders', () => {
    const main = render(
      <ContentZoomRoot>
        <AreaProbe />
      </ContentZoomRoot>,
    );
    expect(main.getByTestId('probe').textContent).toBe('[]');
    main.unmount();
    const named = render(
      <ContentZoomRoot area="footnotes">
        <AreaProbe />
      </ContentZoomRoot>,
    );
    expect(named.getByTestId('probe').textContent).toBe('[footnotes]');
  });

  it('a provider names an area without rendering any element of its own', () => {
    const { container, getByTestId } = render(
      <ContentZoomAreaProvider area="footnotes">
        <AreaProbe />
      </ContentZoomAreaProvider>,
    );
    expect(getByTestId('probe').textContent).toBe('[footnotes]');
    expect(container.firstElementChild?.tagName).toBe('SPAN');
    expect(container.querySelector(`[${CONTENT_ZOOM_ROOT_ATTRIBUTE}]`)).toBeNull();
  });

  it('a provider without an area names the main area', () => {
    const { getByTestId } = render(
      <ContentZoomAreaProvider>
        <AreaProbe />
      </ContentZoomAreaProvider>,
    );
    expect(getByTestId('probe').textContent).toBe('[]');
  });

  it('the nearest provider wins', () => {
    const { getByTestId } = render(
      <ContentZoomRoot>
        <ContentZoomAreaProvider area="footnotes">
          <AreaProbe />
        </ContentZoomAreaProvider>
      </ContentZoomRoot>,
    );
    expect(getByTestId('probe').textContent).toBe('[footnotes]');
  });

  it('builds the pop-up factor from the area’s variable, falling back to the default', () => {
    expect(getContentZoomPopupStyle('')).toEqual({
      '--platform-content-zoom-popup-factor':
        'var(--platform-content-zoom-main, var(--platform-content-zoom-default, 1))',
    });
    expect(getContentZoomPopupStyle('footnotes')).toEqual({
      '--platform-content-zoom-popup-factor':
        'var(--platform-content-zoom-footnotes, var(--platform-content-zoom-default, 1))',
    });
  });
});
