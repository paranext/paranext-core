// @vitest-environment jsdom
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, expect, it } from 'vitest';
import { SHRINK_STEP, useShrinkStepValue } from '@/context/shrink-step.context';
import { Toolbar } from '@/components/advanced/toolbar.component';

/** Reads the step from inside the toolbar, which is the only position that sees the provider. */
function StepProbe() {
  return <span data-testid="step">{useShrinkStepValue()}</span>;
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

  it('publishes an explicitly supplied shrink step, so stories and tests can drive the ladder without a layout engine', () => {
    render(
      <Toolbar onSelectMenuItem={() => {}} shrinkStep={SHRINK_STEP.MINIMUM}>
        <StepProbe />
      </Toolbar>,
    );

    expect(screen.getByTestId('step')).toHaveTextContent(String(SHRINK_STEP.MINIMUM));
  });
});
