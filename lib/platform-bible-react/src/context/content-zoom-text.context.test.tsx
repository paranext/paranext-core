import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, expect, it } from 'vitest';
import {
  CONTENT_ZOOM_ROOT_ATTRIBUTE,
  ContentZoomTextProvider,
  useContentZoomTextProps,
} from '@/context/content-zoom-text.context';

/** A stand-in for a library component that renders project text inline. */
function ProjectText({ children }: { children: string }) {
  const contentZoomTextProps = useContentZoomTextProps();
  return (
    <span
      data-testid="project-text"
      // The hook returns only the content-zoom marker attribute, or nothing.
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...contentZoomTextProps}
    >
      {children}
    </span>
  );
}

describe('content-zoom-text context', () => {
  it('exports the attribute literal that mirrors core’s constant', () => {
    expect(CONTENT_ZOOM_ROOT_ATTRIBUTE).toBe('data-platform-content-zoom-root');
  });

  it('marks nothing outside a provider', () => {
    render(<ProjectText>In the beginning</ProjectText>);
    expect(screen.getByTestId('project-text')).not.toHaveAttribute(CONTENT_ZOOM_ROOT_ATTRIBUTE);
  });

  it('marks text as the main area inside a provider without an area', () => {
    render(
      <ContentZoomTextProvider>
        <ProjectText>In the beginning</ProjectText>
      </ContentZoomTextProvider>,
    );
    expect(screen.getByTestId('project-text')).toHaveAttribute(CONTENT_ZOOM_ROOT_ATTRIBUTE, '');
  });

  it('marks text with the provider’s named area', () => {
    render(
      <ContentZoomTextProvider area="entries">
        <ProjectText>אֱלֹהִים</ProjectText>
      </ContentZoomTextProvider>,
    );
    expect(screen.getByTestId('project-text')).toHaveAttribute(
      CONTENT_ZOOM_ROOT_ATTRIBUTE,
      'entries',
    );
  });

  it('marks no element of its own', () => {
    const { container } = render(
      <ContentZoomTextProvider>
        <div>
          <button type="button">Resolve</button>
          <ProjectText>In the beginning</ProjectText>
        </div>
      </ContentZoomTextProvider>,
    );
    const marked = container.querySelectorAll(`[${CONTENT_ZOOM_ROOT_ATTRIBUTE}]`);
    expect(marked).toHaveLength(1);
    expect(marked[0]).toBe(screen.getByTestId('project-text'));
  });
});
