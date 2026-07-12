import { describe, it, expect } from 'vitest';
import { resolveTextCollectionProjectId } from './scripture-text-grid-project.utils';

const CONNECTION_PROJECT = 'text-connection-project';
const OTHER_CONNECTION_PROJECT = 'another-text-connection-project';
const RESOURCE_PROJECT = 'plain-bible-resource';

describe('resolveTextCollectionProjectId', () => {
  it('always uses an explicit projectId, ignoring the active-editor candidate', () => {
    expect(
      resolveTextCollectionProjectId(undefined, {
        explicitProjectId: CONNECTION_PROJECT,
        candidateProjectId: RESOURCE_PROJECT,
        candidateHasTextConnection: false,
      }),
    ).toBe(CONNECTION_PROJECT);
  });

  it('adopts the active-editor candidate when it is a text-collection project', () => {
    expect(
      resolveTextCollectionProjectId(undefined, {
        explicitProjectId: undefined,
        candidateProjectId: CONNECTION_PROJECT,
        candidateHasTextConnection: true,
      }),
    ).toBe(CONNECTION_PROJECT);
  });

  it('follows the active editor to a different text-collection project', () => {
    expect(
      resolveTextCollectionProjectId(CONNECTION_PROJECT, {
        explicitProjectId: undefined,
        candidateProjectId: OTHER_CONNECTION_PROJECT,
        candidateHasTextConnection: true,
      }),
    ).toBe(OTHER_CONNECTION_PROJECT);
  });

  it('keeps the latched project when the active editor is a resource with no text connection', () => {
    // The core fix: focusing a grid resource cell makes it the active editor, but it has no text
    // collection — the grid must keep showing the previously-resolved project, not blank out.
    expect(
      resolveTextCollectionProjectId(CONNECTION_PROJECT, {
        explicitProjectId: undefined,
        candidateProjectId: RESOURCE_PROJECT,
        candidateHasTextConnection: false,
      }),
    ).toBe(CONNECTION_PROJECT);
  });

  it('keeps the latched project when there is no active-editor candidate', () => {
    expect(
      resolveTextCollectionProjectId(CONNECTION_PROJECT, {
        explicitProjectId: undefined,
        candidateProjectId: undefined,
        candidateHasTextConnection: false,
      }),
    ).toBe(CONNECTION_PROJECT);
  });

  it('is undefined before any text-collection project has been resolved', () => {
    expect(
      resolveTextCollectionProjectId(undefined, {
        explicitProjectId: undefined,
        candidateProjectId: RESOURCE_PROJECT,
        candidateHasTextConnection: false,
      }),
    ).toBeUndefined();
  });
});
