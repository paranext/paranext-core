// @vitest-environment jsdom
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { TabToolbar } from '@/components/advanced/tab-toolbar/tab-toolbar.component';
import { SHRINK_STEP, useShrinkStepValue } from '@/context/shrink-step.context';

describe('TabToolbar', () => {
  it('does not force tw:h-full on the start/center/end area wrappers (breaks vertical centering)', () => {
    render(
      <TabToolbar
        onSelectProjectMenuItem={() => {}}
        onSelectViewInfoMenuItem={() => {}}
        startAreaChildren={<span data-testid="start-child">Start</span>}
        centerAreaChildren={<span data-testid="center-child">Center</span>}
        endAreaChildren={<span data-testid="end-child">End</span>}
      />,
    );

    const startWrapper = screen.getByTestId('start-child').parentElement;
    const centerWrapper = screen.getByTestId('center-child').parentElement;
    const endWrapper = screen.getByTestId('end-child').parentElement;

    [startWrapper, centerWrapper, endWrapper].forEach((wrapper) => {
      expect(wrapper).not.toBeNull();
      expect(wrapper?.className).not.toMatch(/(?:^|\s)tw:h-full(?:\s|$)/);
    });
  });

  it('does not wrap the start/center/end area wrappers onto multiple lines (the enclosing TabToolbarContainer has a fixed height and clips overflow, so wrapped content is not hidden cleanly but sliced through the middle and shown overlapping)', () => {
    render(
      <TabToolbar
        onSelectProjectMenuItem={() => {}}
        onSelectViewInfoMenuItem={() => {}}
        startAreaChildren={<span data-testid="start-child">Start</span>}
        centerAreaChildren={<span data-testid="center-child">Center</span>}
        endAreaChildren={<span data-testid="end-child">End</span>}
      />,
    );

    const startWrapper = screen.getByTestId('start-child').parentElement;
    const centerWrapper = screen.getByTestId('center-child').parentElement;
    const endWrapper = screen.getByTestId('end-child').parentElement;

    [startWrapper, centerWrapper, endWrapper].forEach((wrapper) => {
      expect(wrapper).not.toBeNull();
      expect(wrapper?.className).toMatch(/(?:^|\s)tw:flex-nowrap(?:\s|$)/);
      expect(wrapper?.className).not.toMatch(/(?:^|\s)tw:flex-wrap(?:\s|$)/);
    });
  });

  it('lets the start and center zones shrink below their content width (tw:min-w-0), so the flex algorithm takes space from them instead of pushing the end zone out of the clipped container', () => {
    render(
      <TabToolbar
        onSelectProjectMenuItem={() => {}}
        onSelectViewInfoMenuItem={() => {}}
        startAreaChildren={<span data-testid="start-child">Start</span>}
        centerAreaChildren={<span data-testid="center-child">Center</span>}
        endAreaChildren={<span data-testid="end-child">End</span>}
      />,
    );

    const startWrapper = screen.getByTestId('start-child').parentElement;
    const centerWrapper = screen.getByTestId('center-child').parentElement;

    [startWrapper, centerWrapper].forEach((wrapper) => {
      expect(wrapper).not.toBeNull();
      expect(wrapper?.className).toMatch(/(?:^|\s)tw:min-w-0(?:\s|$)/);
    });
  });

  it('keeps the end zone rigid so the view-info menu and its icon buttons are never the ones squeezed out (they have no shorter form to fall back to)', () => {
    render(
      <TabToolbar
        onSelectProjectMenuItem={() => {}}
        onSelectViewInfoMenuItem={() => {}}
        startAreaChildren={<span data-testid="start-child">Start</span>}
        endAreaChildren={<span data-testid="end-child">End</span>}
      />,
    );

    const endWrapper = screen.getByTestId('end-child').parentElement;

    expect(endWrapper).not.toBeNull();
    expect(endWrapper?.className).toMatch(/(?:^|\s)tw:shrink-0(?:\s|$)/);
    expect(endWrapper?.className).not.toMatch(/(?:^|\s)tw:min-w-0(?:\s|$)/);
  });

  it('publishes its shrink step down to the items inside it, so a laddered label sees the real value', () => {
    // Guards the wiring end to end: `TabToolbar` forwards the prop, `TabToolbarContainer` puts it
    // on the context, and a descendant reads it. Each piece is exercised elsewhere; only this
    // catches them being connected wrongly.
    function StepProbe() {
      return <span data-testid="step">{useShrinkStepValue()}</span>;
    }

    render(
      <TabToolbar
        onSelectProjectMenuItem={() => {}}
        onSelectViewInfoMenuItem={() => {}}
        shrinkStep={SHRINK_STEP.MINIMUM}
        startAreaChildren={<StepProbe />}
      />,
    );

    expect(screen.getByTestId('step')).toHaveTextContent(String(SHRINK_STEP.MINIMUM));
  });

  it('reports the widest step to its items by default', () => {
    function StepProbe() {
      return <span data-testid="step">{useShrinkStepValue()}</span>;
    }

    render(
      <TabToolbar
        onSelectProjectMenuItem={() => {}}
        onSelectViewInfoMenuItem={() => {}}
        startAreaChildren={<StepProbe />}
      />,
    );

    expect(screen.getByTestId('step')).toHaveTextContent(String(SHRINK_STEP.WIDE));
  });

  it('keeps the end zone growing so the wide-width split across the three zones is unchanged (grow and shrink are independent; dropping grow would visibly shift the center zone)', () => {
    render(
      <TabToolbar
        onSelectProjectMenuItem={() => {}}
        onSelectViewInfoMenuItem={() => {}}
        endAreaChildren={<span data-testid="end-child">End</span>}
      />,
    );

    const endWrapper = screen.getByTestId('end-child').parentElement;

    expect(endWrapper?.className).toMatch(/(?:^|\s)tw:grow-\[1\](?:\s|$)/);
  });
});
