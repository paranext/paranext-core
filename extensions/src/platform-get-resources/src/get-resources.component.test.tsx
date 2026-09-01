// @vitest-environment jsdom

import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { GetResources } from './get-resources.component';

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

  it('keeps the plain no-resources text when the fetch succeeded and returned nothing', () => {
    render(<GetResources localizedStringsWithLoadingState={[STRINGS, false]} resources={[]} />);

    expect(screen.getByText('No resources found')).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Try again' })).not.toBeInTheDocument();
  });
});
