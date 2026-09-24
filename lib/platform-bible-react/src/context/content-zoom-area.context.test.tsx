// @vitest-environment jsdom
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, it, expect } from 'vitest';
import {
  ContentZoomAreaProvider,
  CONTENT_ZOOM_CSS_VARIABLE_PREFIX,
  CONTENT_ZOOM_DEFAULT_CSS_VARIABLE,
  CONTENT_ZOOM_POPUP_ATTRIBUTE,
  CONTENT_ZOOM_ROOT_ATTRIBUTE,
  getContentZoomPopupStyle,
  useContentZoomArea,
} from '@/context/content-zoom-area.context';
import { ContentZoomRoot } from '@/components/advanced/content-zoom-root.component';

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
