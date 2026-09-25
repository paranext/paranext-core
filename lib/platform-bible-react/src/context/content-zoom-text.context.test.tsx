import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, expect, it } from 'vitest';
import {
  CONTENT_ZOOM_LABEL_ATTRIBUTE,
  CONTENT_ZOOM_ROOT_ATTRIBUTE,
  CONTENT_ZOOM_SCOPE_ATTRIBUTE,
  ContentZoomTextProvider,
  useContentZoomTextProps,
} from '@/context/content-zoom-text.context';

/** A stand-in for a library component that renders project text inline. */
function ProjectText({ children }: { children: string }) {
  const contentZoomTextProps = useContentZoomTextProps();
  return (
    <span
      data-testid="project-text"
      // The hook returns only the content-zoom marker and label attributes, or nothing.
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...contentZoomTextProps}
    >
      {children}
    </span>
  );
}

describe('content-zoom-text context', () => {
  it('exports the attribute literals that mirror core’s constants', () => {
    expect(CONTENT_ZOOM_ROOT_ATTRIBUTE).toBe('data-platform-content-zoom-root');
    expect(CONTENT_ZOOM_SCOPE_ATTRIBUTE).toBe('data-platform-content-zoom-scope');
    expect(CONTENT_ZOOM_LABEL_ATTRIBUTE).toBe('data-platform-content-zoom-label');
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

  it('names the area on every text element when the provider has a label', () => {
    render(
      <ContentZoomTextProvider area="entries" label="Dictionary">
        <ProjectText>λόγος</ProjectText>
        <ProjectText>word</ProjectText>
      </ContentZoomTextProvider>,
    );
    screen.getAllByTestId('project-text').forEach((element) => {
      expect(element).toHaveAttribute(CONTENT_ZOOM_ROOT_ATTRIBUTE, 'entries');
      expect(element).toHaveAttribute(CONTENT_ZOOM_LABEL_ATTRIBUTE, 'Dictionary');
    });
  });

  it('writes no label for a provider without one or with an empty one', () => {
    render(
      <>
        <ContentZoomTextProvider area="entries">
          <ProjectText>unlabelled</ProjectText>
        </ContentZoomTextProvider>
        <ContentZoomTextProvider area="footnotes" label="">
          <ProjectText>empty label</ProjectText>
        </ContentZoomTextProvider>
      </>,
    );
    const [unlabelled, emptyLabel] = screen.getAllByTestId('project-text');
    // Positive control: both are marked, so the missing label is not a missing marker.
    expect(unlabelled).toHaveAttribute(CONTENT_ZOOM_ROOT_ATTRIBUTE, 'entries');
    expect(emptyLabel).toHaveAttribute(CONTENT_ZOOM_ROOT_ATTRIBUTE, 'footnotes');
    expect(unlabelled).not.toHaveAttribute(CONTENT_ZOOM_LABEL_ATTRIBUTE);
    expect(emptyLabel).not.toHaveAttribute(CONTENT_ZOOM_LABEL_ATTRIBUTE);
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
