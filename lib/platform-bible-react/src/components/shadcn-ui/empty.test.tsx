// @vitest-environment jsdom
import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from '@/components/shadcn-ui/empty';

describe('Empty', () => {
  // jsdom computes no Tailwind CSS, so these pin the class strings and slot names a `shadcn apply`
  // would revert. `.storybook/preview.ts` adds `pr-twp` to `document.body`, so Storybook renders
  // correctly whether or not the components apply the class — only this suite can catch its loss.

  function renderFullComposition() {
    const { container } = render(
      <Empty>
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <svg />
          </EmptyMedia>
          <EmptyTitle>No projects</EmptyTitle>
          <EmptyDescription>Projects you open will appear here.</EmptyDescription>
        </EmptyHeader>
        <EmptyContent>Action</EmptyContent>
      </Empty>,
    );
    return container;
  }

  it.each([
    ['empty', 'Empty'],
    ['empty-header', 'EmptyHeader'],
    ['empty-icon', 'EmptyMedia'],
    ['empty-title', 'EmptyTitle'],
    ['empty-description', 'EmptyDescription'],
    ['empty-content', 'EmptyContent'],
  ])('applies the pr-twp scope class on the %s slot (%s)', (slot) => {
    const container = renderFullComposition();

    expect(container.querySelector(`[data-slot="${slot}"]`)).toHaveClass('pr-twp');
  });

  it('keeps upstream data-slot values, including empty-icon on EmptyMedia', () => {
    const container = renderFullComposition();

    // EmptyMedia is deliberately named for the media it holds while keeping upstream's slot value,
    // so shadcn-doc selectors targeting [data-slot=empty-icon] keep matching.
    expect(container.querySelector('[data-slot="empty-icon"]')).toBeInTheDocument();
    expect(container.querySelector('[data-slot="empty-media"]')).not.toBeInTheDocument();
  });

  it('keeps pr-twp on EmptyMedia for both variants, so the cva base can be re-baselined freely', () => {
    const { container } = render(
      <>
        <EmptyMedia data-testid="default-media" />
        <EmptyMedia variant="icon" data-testid="icon-media" />
      </>,
    );

    const [defaultMedia, iconMedia] = container.querySelectorAll('[data-slot="empty-icon"]');
    expect(defaultMedia).toHaveClass('pr-twp');
    expect(iconMedia).toHaveClass('pr-twp');
  });

  it('merges a caller className onto the root without dropping pr-twp', () => {
    const { container } = render(<Empty className="tw:border" />);

    const root = container.querySelector('[data-slot="empty"]');
    expect(root).toHaveClass('pr-twp');
    expect(root).toHaveClass('tw:border');
  });
});
