// @vitest-environment jsdom
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { SHRINK_STEP, ShrinkStepOverride } from 'platform-bible-react';
import { beforeAll, describe, expect, it } from 'vitest';
import { ParagraphStyleTrigger } from './paragraph-style-trigger.component';

// jsdom doesn't ship ResizeObserver. Radix's Popper positioning, used by the popover and by the
// tooltip inside ToolbarCompoundLabel, instantiates one on mount. Same stub as
// paragraph-style-label.component.test.tsx.
class NoopResizeObserver implements ResizeObserver {
  private readonly targets = new Set<Element>();

  observe(target: Element) {
    this.targets.add(target);
  }

  unobserve(target: Element) {
    this.targets.delete(target);
  }

  disconnect() {
    this.targets.clear();
  }
}

beforeAll(() => {
  if (typeof globalThis.ResizeObserver === 'undefined') {
    globalThis.ResizeObserver = NoopResizeObserver;
  }
});

function renderTrigger(shrinkStep?: number) {
  const trigger = (
    <ParagraphStyleTrigger
      blockMarker="toc1"
      styleName="Table of Contents 1"
      isStructureProtected={false}
      markerMenuItems={[]}
      localizedStrings={{}}
    />
  );
  return render(
    shrinkStep === undefined ? (
      trigger
    ) : (
      <ShrinkStepOverride value={shrinkStep}>{trigger}</ShrinkStepOverride>
    ),
  );
}

/** The zone's flex item is the wrapper `div` around the button, not the button itself. */
const wrapperOf = (button: HTMLElement) => button.parentElement;

describe('ParagraphStyleTrigger', () => {
  it('floors itself at the marker once the style name has been dropped', () => {
    renderTrigger(SHRINK_STEP.MINIMUM);

    const button = screen.getByRole('button', { name: 'Paragraph Selection' });

    // The marker is all that is left at this step and has no shorter form, so the trigger has to
    // stop narrowing here rather than let the toolbar zone squeeze into the marker itself.
    expect(button.className).toMatch(/(?:^|\s)tw:min-w-min(?:\s|$)/);
    expect(wrapperOf(button)?.className).toMatch(/(?:^|\s)tw:min-w-min(?:\s|$)/);
  });

  it('keeps shrinking freely while the style name is still rendered', () => {
    renderTrigger(SHRINK_STEP.TIGHTER);

    const button = screen.getByRole('button', { name: 'Paragraph Selection' });

    // A `min-content` floor is only right once the style name is gone. While the name is rendered
    // it contributes its longest word to `min-content`, which is far wider than the zone can spare
    // — the trigger would refuse to shrink and have its trailing border clipped by the zone
    // instead of ellipsising the name, which is the whole failure this floor exists to prevent.
    expect(button.className).toMatch(/(?:^|\s)tw:min-w-0(?:\s|$)/);
    expect(button.className).not.toMatch(/(?:^|\s)tw:min-w-min(?:\s|$)/);
    expect(wrapperOf(button)?.className).toMatch(/(?:^|\s)tw:min-w-0(?:\s|$)/);
    expect(wrapperOf(button)?.className).not.toMatch(/(?:^|\s)tw:min-w-min(?:\s|$)/);
  });

  it('shows a dropdown chevron at full width', () => {
    const { container } = renderTrigger();

    expect(container.querySelector('svg')).not.toBeNull();
  });

  it('drops the chevron at the narrowest step, so the marker is never sliced against it', () => {
    // The chevron is decoration on a control already reduced to a bordered code, and dropping it is
    // what buys the room the marker needs at a column's minimum width. The popover semantics on the
    // button are untouched, so nothing changes for keyboard or screen-reader users.
    const { container } = renderTrigger(SHRINK_STEP.MINIMUM);

    expect(screen.getByText('toc1')).toBeInTheDocument();
    expect(container.querySelector('svg')).toBeNull();
  });

  it('renders nothing at all without a marker', () => {
    // No marker and no block are the same state to a user: without this the trigger would show an
    // empty box, a dangling separator, and the generic fallback description. Both spellings of
    // "no marker" reach this from the editor — undefined before any selection has resolved, and
    // the empty string for a selection in no block.
    [undefined, ''].forEach((blockMarker) => {
      const { container } = render(
        <ParagraphStyleTrigger
          blockMarker={blockMarker}
          styleName="Paragraph"
          isStructureProtected={false}
          markerMenuItems={[]}
          localizedStrings={{}}
        />,
      );

      expect(container).toBeEmptyDOMElement();
    });
  });
});
