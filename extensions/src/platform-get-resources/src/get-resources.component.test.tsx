// @vitest-environment jsdom

import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi, beforeAll, afterAll } from 'vitest';
import type { DblResourceData } from 'platform-bible-utils';
import { FAILED_PRECONDITION, isPlatformError } from 'platform-bible-utils';
import {
  GetResources,
  newResourceActionProviderNotReadyError,
  RESOURCE_ACTION_PROVIDER_NOT_READY,
} from './get-resources.component';

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

/*
 * A failed catalog fetch and a genuinely empty catalog are the same picture to the user unless the
 * component distinguishes them: "no resources found" reads as a truthful answer, so a user who is
 * merely offline stops looking. Get Resources is also where the resource picker sends people when
 * its own list looks empty, so both surfaces reporting emptiness for the same failure leaves no way
 * forward at all.
 */

const STRINGS = {
  '%resources_noResults%': 'No resources found',
  '%resources_noResultsError%': 'Unable to search for resources',
  '%resources_retry%': 'Try again',
  '%resources_providerNotReady%': 'Resources are not ready yet, translated',
  '%resources_get%': 'Get',
};

describe('GetResources', () => {
  it('reports a failed fetch instead of claiming there are no resources', () => {
    render(
      <GetResources
        localizedStringsWithLoadingState={[STRINGS, false]}
        resources={[]}
        isResourcesError
      />,
    );

    expect(screen.getByText('Unable to search for resources')).toBeInTheDocument();
    expect(screen.queryByText('No resources found')).not.toBeInTheDocument();
  });

  it('offers a retry that re-drives the fetch when the fetch failed', () => {
    const onRetryResources = vi.fn();
    render(
      <GetResources
        localizedStringsWithLoadingState={[STRINGS, false]}
        resources={[]}
        isResourcesError
        onRetryResources={onRetryResources}
      />,
    );

    fireEvent.click(screen.getByRole('button', { name: 'Try again' }));

    expect(onRetryResources).toHaveBeenCalledTimes(1);
  });

  // The web view cannot supply this message itself: it holds no localized strings, so any text it
  // authored would reach the user as untranslated English. It sends a sentinel and this component
  // supplies the wording.
  it('shows its own localized message for the provider-not-ready sentinel, not the raw sentinel', async () => {
    const resource = {
      dblEntryUid: 'uid-1',
      displayName: 'NIV',
      fullName: 'New International Version',
      bestLanguageName: 'English',
      type: 'ScriptureResource' as const,
      size: 1000,
      installed: false,
      updateAvailable: false,
      projectId: 'proj-1',
    };

    render(
      <GetResources
        localizedStringsWithLoadingState={[STRINGS, false]}
        resources={[resource]}
        selectedTypes={['ScriptureResource']}
        selectedLanguages={['English']}
        onInstallOrRemoveResource={() => Promise.reject(newResourceActionProviderNotReadyError())}
      />,
    );

    fireEvent.click(screen.getByRole('button', { name: 'Get' }));

    expect(await screen.findByText('Resources are not ready yet, translated')).toBeInTheDocument();
    expect(screen.queryByText(RESOURCE_ACTION_PROVIDER_NOT_READY)).not.toBeInTheDocument();
  });

  // The error state REPLACES the table, and a row action is the only other thing that clears this
  // alert — so without the retry clearing it, a failed install followed by a failed catalog refresh
  // pins the alert above a list that has since recovered, with no way left to dismiss it.
  it('clears a stale install-failure alert when the catalog is retried', async () => {
    const onRetryResources = vi.fn();
    const resource = {
      dblEntryUid: 'uid-1',
      displayName: 'NIV',
      fullName: 'New International Version',
      bestLanguageName: 'English',
      type: 'ScriptureResource' as const,
      size: 1000,
      installed: false,
      updateAvailable: false,
      projectId: 'proj-1',
    };

    const { rerender } = render(
      <GetResources
        localizedStringsWithLoadingState={[STRINGS, false]}
        resources={[resource]}
        selectedTypes={['ScriptureResource']}
        selectedLanguages={['English']}
        onInstallOrRemoveResource={() => Promise.reject(new Error('the install blew up'))}
      />,
    );

    fireEvent.click(screen.getByRole('button', { name: 'Get' }));
    expect(await screen.findByText('the install blew up')).toBeInTheDocument();

    // The catalog refresh then fails, replacing the table with the error state.
    rerender(
      <GetResources
        localizedStringsWithLoadingState={[STRINGS, false]}
        resources={[]}
        isResourcesError
        onRetryResources={onRetryResources}
      />,
    );
    expect(screen.getByText('the install blew up')).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'Try again' }));

    expect(onRetryResources).toHaveBeenCalledTimes(1);
    expect(screen.queryByText('the install blew up')).not.toBeInTheDocument();
  });

  it('keeps the plain no-resources text when the fetch succeeded and returned nothing', () => {
    render(<GetResources localizedStringsWithLoadingState={[STRINGS, false]} resources={[]} />);

    expect(screen.getByText('No resources found')).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Try again' })).not.toBeInTheDocument();
  });

  // PAPI rewrites a rejection that crosses a process boundary as
  // `JSON-RPC Request error (-32000): <original>`. The sentinel is a public export, so the next
  // caller may well raise it from the extension host rather than from inside the web view's own
  // React tree — an equality check would fall through and put the raw machine token, JSON-RPC
  // prefix and all, in front of the user.
  it('classifies the provider-not-ready rejection as a failed precondition', () => {
    const error = newResourceActionProviderNotReadyError();

    // The machine-readable class, for anything that is not this component: a log surface, a generic
    // handler, a caller deciding whether the action is worth retrying.
    expect(isPlatformError(error)).toBe(true);
    expect(error.code).toBe(FAILED_PRECONDITION);
    expect(error.message).toContain(RESOURCE_ACTION_PROVIDER_NOT_READY);
  });

  // The code cannot be the discriminant: `doRequest` rebuilds a TypeScript rejection that crosses a
  // process boundary as a message-only PlatformError, so a caller raising this from the extension
  // host arrives with the code stripped and the prefix added.
  it('recognises the provider-not-ready sentinel through a cross-process rejection prefix', async () => {
    const resource = {
      dblEntryUid: 'uid-1',
      displayName: 'NIV',
      fullName: 'New International Version',
      bestLanguageName: 'English',
      type: 'ScriptureResource' as const,
      size: 1000,
      installed: false,
      updateAvailable: false,
      projectId: 'proj-1',
    };

    render(
      <GetResources
        localizedStringsWithLoadingState={[STRINGS, false]}
        resources={[resource]}
        selectedTypes={['ScriptureResource']}
        selectedLanguages={['English']}
        onInstallOrRemoveResource={() =>
          Promise.reject(
            new Error(`JSON-RPC Request error (-32000): ${RESOURCE_ACTION_PROVIDER_NOT_READY}`),
          )
        }
      />,
    );

    fireEvent.click(screen.getByRole('button', { name: 'Get' }));

    expect(await screen.findByText('Resources are not ready yet, translated')).toBeInTheDocument();
    expect(screen.queryByText(/JSON-RPC/)).not.toBeInTheDocument();
  });

  // Every real install failure crosses a process boundary, so its message arrives carrying the
  // prefix. The prefix is diagnostic noise to whoever is reading the alert.
  it('strips the cross-process prefix from a real action failure before showing it', async () => {
    const resource = {
      dblEntryUid: 'uid-1',
      displayName: 'NIV',
      fullName: 'New International Version',
      bestLanguageName: 'English',
      type: 'ScriptureResource' as const,
      size: 1000,
      installed: false,
      updateAvailable: false,
      projectId: 'proj-1',
    };

    render(
      <GetResources
        localizedStringsWithLoadingState={[STRINGS, false]}
        resources={[resource]}
        selectedTypes={['ScriptureResource']}
        selectedLanguages={['English']}
        onInstallOrRemoveResource={() =>
          Promise.reject(
            new Error('JSON-RPC Request error (-32000): This resource is no longer available'),
          )
        }
      />,
    );

    fireEvent.click(screen.getByRole('button', { name: 'Get' }));

    expect(await screen.findByText('This resource is no longer available')).toBeInTheDocument();
  });
});

/*
 * The language filter and the grid must agree on which resources are in play. When they disagree —
 * options built from the whole catalogue while rows are filtered by type — the dropdown offers a
 * language whose only entries are of a hidden type, and choosing it lands on "No results". These
 * tests pin both halves: what the filter offers, and what happens to a selection the filter stops
 * offering.
 */

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
