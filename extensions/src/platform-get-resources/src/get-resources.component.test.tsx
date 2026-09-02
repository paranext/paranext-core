// @vitest-environment jsdom

import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { GetResources, RESOURCE_ACTION_PROVIDER_NOT_READY } from './get-resources.component';

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
        onInstallOrRemoveResource={() =>
          Promise.reject(new Error(RESOURCE_ACTION_PROVIDER_NOT_READY))
        }
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
});
