import { describe, it, expect } from 'vitest';
import { resolveTextCollectionProjectId } from './scripture-text-grid-project.utils';

const CONNECTION_PROJECT = 'text-connection-project';
const OTHER_CONNECTION_PROJECT = 'another-text-connection-project';
const RESOURCE_PROJECT = 'displayed-bible-resource';

describe('resolveTextCollectionProjectId', () => {
  it('always uses an explicit projectId, ignoring the active-editor candidate', () => {
    expect(
      resolveTextCollectionProjectId(undefined, {
        explicitProjectId: CONNECTION_PROJECT,
        candidateProjectId: RESOURCE_PROJECT,
        candidateIsOwnResource: true,
      }),
    ).toBe(CONNECTION_PROJECT);
  });

  it('adopts the active-editor candidate when it is not one of the displayed resources', () => {
    expect(
      resolveTextCollectionProjectId(undefined, {
        explicitProjectId: undefined,
        candidateProjectId: CONNECTION_PROJECT,
        candidateIsOwnResource: false,
      }),
    ).toBe(CONNECTION_PROJECT);
  });

  it('follows the active editor to a different (non-resource) text-collection project', () => {
    expect(
      resolveTextCollectionProjectId(CONNECTION_PROJECT, {
        explicitProjectId: undefined,
        candidateProjectId: OTHER_CONNECTION_PROJECT,
        candidateIsOwnResource: false,
      }),
    ).toBe(OTHER_CONNECTION_PROJECT);
  });

  it('keeps the latched project when the active editor is one of the grid’s own resources', () => {
    // The core fix: clicking a verse in a resource cell makes that resource the active editor. The
    // grid must keep showing the current project instead of switching to the resource and blanking.
    expect(
      resolveTextCollectionProjectId(CONNECTION_PROJECT, {
        explicitProjectId: undefined,
        candidateProjectId: RESOURCE_PROJECT,
        candidateIsOwnResource: true,
      }),
    ).toBe(CONNECTION_PROJECT);
  });

  it('keeps the latched project when there is no active-editor candidate', () => {
    expect(
      resolveTextCollectionProjectId(CONNECTION_PROJECT, {
        explicitProjectId: undefined,
        candidateProjectId: undefined,
        candidateIsOwnResource: false,
      }),
    ).toBe(CONNECTION_PROJECT);
  });
});
