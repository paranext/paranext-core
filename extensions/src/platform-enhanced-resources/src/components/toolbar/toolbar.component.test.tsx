// @vitest-environment jsdom
import { beforeAll, describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ShrinkStepOverride } from 'platform-bible-react';
import { EnhancedResourceTabBar } from './toolbar.component';

// jsdom ships no ResizeObserver. Radix's Popper (behind the scope Select) builds one on mount, and
// the bar itself hands one to `useShrinkStep`. Tests drive the step through `ShrinkStepOverride`
// instead of a real measurement, so a no-op is enough.
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

const TAB_LABELS = ['Dictionary', 'Encyclopedia', 'Media', 'Maps'];

function renderAtStep(shrinkStep: number) {
  return render(
    <ShrinkStepOverride value={shrinkStep}>
      <EnhancedResourceTabBar
        activeTab="dictionary"
        onTabChange={vi.fn()}
        scope="current-verse"
        onScopeChange={vi.fn()}
        // Written inline rather than hoisted so TypeScript checks the localize keys against the
        // component's own key union — a hoisted object is no longer a fresh literal, and a misspelled
        // key would slip through as an unchecked extra property.
        localizedStringsWithLoadingState={[
          {
            '%enhancedResources_toolbar_tab_dictionary%': 'Dictionary',
            '%enhancedResources_toolbar_tab_encyclopedia%': 'Encyclopedia',
            '%enhancedResources_toolbar_tab_media%': 'Media',
            '%enhancedResources_toolbar_tab_maps%': 'Maps',
          },
          false,
        ]}
      />
    </ShrinkStepOverride>,
  );
}

describe('EnhancedResourceTabBar', () => {
  it('shows every tab label while there is room', () => {
    renderAtStep(0);

    TAB_LABELS.forEach((label) => {
      expect(screen.getByText(label)).toBeInTheDocument();
    });
  });

  it('drops all four tab labels together once the bar narrows, so the tabs never sit half-labelled', () => {
    renderAtStep(1);

    TAB_LABELS.forEach((label) => {
      expect(screen.queryByText(label)).not.toBeInTheDocument();
    });
  });

  it('keeps every tab reachable by name after the labels go, so the icons are not the only handle', () => {
    // The visible text is gone, so the accessible name rests entirely on each trigger's
    // `aria-label`. Drop that and a screen reader is left with four unnamed icon buttons.
    renderAtStep(1);

    TAB_LABELS.forEach((label) => {
      expect(screen.getByRole('tab', { name: new RegExp(label, 'i') })).toBeInTheDocument();
    });
  });

  it('narrows the scope select alongside the labels, so the space the labels freed is not just left empty', () => {
    const { unmount } = renderAtStep(0);
    const wideClassName = screen.getByRole('combobox').className;
    unmount();

    renderAtStep(1);

    expect(wideClassName).toMatch(/(?:^|\s)tw:w-44(?:\s|$)/);
    expect(screen.getByRole('combobox').className).toMatch(/(?:^|\s)tw:w-32(?:\s|$)/);
  });
});
