// @vitest-environment jsdom
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { SHRINK_STEP, useShrinkStepValue } from '@/context/shrink-step.context';
import { ShrinkStepOverride } from '@/context/shrink-step-override.component';
import {
  getToolbarOSReservedSpaceClassName,
  Toolbar,
} from '@/components/advanced/toolbar.component';

/** Reads the step from inside the toolbar, which is the only position that sees the provider. */
function StepProbe() {
  return <span data-testid="step">{useShrinkStepValue()}</span>;
}

/** Jsdom ships no `ResizeObserver`. This one records which element the toolbar chose to measure. */
class RecordingResizeObserver implements ResizeObserver {
  static instances: RecordingResizeObserver[] = [];

  observed: Element[] = [];

  constructor() {
    RecordingResizeObserver.instances.push(this);
  }

  observe(target: Element) {
    this.observed.push(target);
  }

  unobserve(target: Element) {
    this.observed = this.observed.filter((element) => element !== target);
  }

  disconnect() {
    this.observed = [];
  }
}

describe('Toolbar', () => {
  it('lets the content area shrink below its content width, so the project selector and reference control give way before anything is clipped', () => {
    render(
      <Toolbar onSelectMenuItem={() => {}}>
        <span data-testid="content-child">Content</span>
      </Toolbar>,
    );

    const contentArea = screen.getByTestId('content-child').parentElement;

    expect(contentArea).not.toBeNull();
    expect(contentArea?.className).toMatch(/(?:^|\s)tw:min-w-0(?:\s|$)/);
  });

  it('keeps the app menu area rigid so menu titles are never clipped', () => {
    render(
      <Toolbar
        onSelectMenuItem={() => {}}
        appMenuAreaChildren={<span data-testid="app-menu-child">Logo</span>}
      >
        <span>Content</span>
      </Toolbar>,
    );

    // Two levels up: the child sits in an inner flex row inside the app-menu area wrapper.
    const appMenuArea = screen.getByTestId('app-menu-child').parentElement?.parentElement;

    expect(appMenuArea).not.toBeNull();
    // The absence of `tw:min-w-0` is what actually protects this area — it leaves `min-width: auto`
    // in place, pinning the area at its content's width. `tw:shrink-0` is belt-and-braces (with
    // `tw:basis-0` its shrink factor already resolves to zero), so asserting only that would pass
    // even if the real protection were removed.
    expect(appMenuArea?.className).not.toMatch(/(?:^|\s)tw:min-w-0(?:\s|$)/);
    expect(appMenuArea?.className).toMatch(/(?:^|\s)tw:shrink-0(?:\s|$)/);
  });

  it('publishes the widest shrink step to its children by default', () => {
    render(
      <Toolbar onSelectMenuItem={() => {}}>
        <StepProbe />
      </Toolbar>,
    );

    expect(screen.getByTestId('step')).toHaveTextContent(String(SHRINK_STEP.WIDE));
  });

  it('publishes an overridden shrink step, so stories and tests can drive the ladder without a layout engine', () => {
    render(
      <ShrinkStepOverride value={SHRINK_STEP.MINIMUM}>
        <Toolbar onSelectMenuItem={() => {}}>
          <StepProbe />
        </Toolbar>
      </ShrinkStepOverride>,
    );

    expect(screen.getByTestId('step')).toHaveTextContent(String(SHRINK_STEP.MINIMUM));
  });

  describe('what it measures', () => {
    const originalResizeObserver = globalThis.ResizeObserver;

    beforeEach(() => {
      RecordingResizeObserver.instances = [];
      globalThis.ResizeObserver = RecordingResizeObserver;
    });

    afterEach(() => {
      globalThis.ResizeObserver = originalResizeObserver;
    });

    it('measures the inner content row, not the wrapper that reserves the OS caption buttons', () => {
      // The reserve is padding on the outer box on macOS and on the Windows/Linux fallback, but a
      // sibling wrapper's padding when Electron reports a live overlay rect. Measuring the outer box
      // would therefore report up to ~150px more room on one path than another at the same window
      // width, so the same window would abbreviate the reference on one OS but not the next.
      render(
        <Toolbar
          onSelectMenuItem={() => {}}
          id="app-toolbar"
          className={getToolbarOSReservedSpaceClassName('darwin')}
        >
          <span>Content</span>
        </Toolbar>,
      );
      const outerBox = document.getElementById('app-toolbar');
      const [observed] = RecordingResizeObserver.instances.flatMap((instance) => instance.observed);

      expect(observed).toBeDefined();
      expect(observed).not.toBe(outerBox);
      expect(outerBox?.contains(observed)).toBe(true);
      // Whatever element it settles on, the reserve and the toolbar's own inline padding have to be
      // outside it — that is the property the thresholds depend on, not the identity of the node.
      expect(observed.className).not.toMatch(/tw:ps-\[85px\]/);
      expect(observed.className).not.toMatch(/(?:^|\s)tw:px-4(?:\s|$)/);
    });
  });
});
