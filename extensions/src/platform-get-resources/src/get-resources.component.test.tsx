// @vitest-environment jsdom

import { describe, it, expect, vi, beforeAll, afterAll } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import type { DblResourceData } from 'platform-bible-utils';
import { GetResources } from './get-resources.component';

/*
 * The language filter and the grid must agree on which resources are in play. When they disagree —
 * options built from the whole catalogue while rows are filtered by type — the dropdown offers a
 * language whose only entries are of a hidden type, and choosing it lands on "No results". These
 * tests pin both halves: what the filter offers, and what happens to a selection the filter stops
 * offering.
 */

// jsdom implements none of what opening a combo box needs: ResizeObserver for cmdk's command list,
// and scrollIntoView for the option it highlights.
beforeAll(() => {
  vi.stubGlobal(
    'ResizeObserver',
    vi.fn(() => ({ observe: vi.fn(), unobserve: vi.fn(), disconnect: vi.fn() })),
  );
  if (!Element.prototype.scrollIntoView) {
    Element.prototype.scrollIntoView = () => {};
  }
});
afterAll(() => {
  vi.unstubAllGlobals();
});

const resource = (
  overrides: Pick<DblResourceData, 'bestLanguageName' | 'type'> & Partial<DblResourceData>,
): DblResourceData => ({
  dblEntryUid: `uid-${overrides.bestLanguageName}-${overrides.type}`,
  displayName: `RES-${overrides.bestLanguageName}`,
  fullName: `Resource ${overrides.bestLanguageName} ${overrides.type}`,
  size: 1000,
  installed: false,
  updateAvailable: false,
  projectId: `prj-${overrides.bestLanguageName}`,
  ...overrides,
});

// Coptic has no Scripture resource, so it must not be offered while the type filter is Scripture.
const RESOURCES: DblResourceData[] = [
  resource({ bestLanguageName: 'Amharic', type: 'ScriptureResource' }),
  resource({ bestLanguageName: 'Nepali', type: 'ScriptureResource' }),
  resource({ bestLanguageName: 'Coptic', type: 'XmlResource' }),
];

function renderGetResources(overrides: Partial<Parameters<typeof GetResources>[0]> = {}) {
  render(
    <GetResources
      resources={RESOURCES}
      selectedTypes={['ScriptureResource']}
      selectedLanguages={[]}
      {...overrides}
    />,
  );
}

/** The language filter is the second combo box; the first is the type filter. */
function openLanguageFilter() {
  const triggers = screen.getAllByRole('combobox').filter((el) => el.tagName === 'BUTTON');
  fireEvent.click(triggers[1]);
  return screen.queryAllByRole('option').map((option) => option.textContent ?? '');
}

describe('GetResources language filter', () => {
  it('offers only languages that have a resource of a selected type', () => {
    renderGetResources();

    const offered = openLanguageFilter();

    expect(offered.some((label) => label.includes('Amharic'))).toBe(true);
    expect(offered.some((label) => label.includes('Nepali'))).toBe(true);
    expect(offered.some((label) => label.includes('Coptic'))).toBe(false);
  });

  it('counts only resources of a selected type', () => {
    renderGetResources({
      resources: [
        ...RESOURCES,
        resource({ bestLanguageName: 'Amharic', type: 'XmlResource' }),
        resource({ bestLanguageName: 'Amharic', type: 'CommentaryResource' }),
      ],
    });

    const amharic = openLanguageFilter().find((label) => label.includes('Amharic'));

    // Three Amharic resources exist, but only one is Scripture.
    expect(amharic).toContain('1');
  });

  it('offers every language when no type is selected', () => {
    renderGetResources({ selectedTypes: [] });

    expect(openLanguageFilter().some((label) => label.includes('Coptic'))).toBe(true);
  });

  it('ignores a selected language the type filter no longer offers, rather than emptying the grid', () => {
    // Coptic is persisted from a session where XML resources were shown. Filtering rows on it now
    // would hide every Scripture row and leave no way to un-pick it.
    renderGetResources({ selectedLanguages: ['Coptic'] });

    expect(screen.getByText('Resource Amharic ScriptureResource')).toBeDefined();
    expect(screen.getByText('Resource Nepali ScriptureResource')).toBeDefined();
  });
});
