import { describe, it, expect } from 'vitest';
import { resolveTextCollectionProjectId } from './scripture-text-grid-project.utils';

const PROJECT_A = 'proj-a';
const PROJECT_B = 'proj-b';
const PINNED_PROJECT = 'pinned-project';

describe('resolveTextCollectionProjectId', () => {
  it('seeds an unbound grid from the active editor', () => {
    expect(
      resolveTextCollectionProjectId(undefined, {
        explicitProjectId: undefined,
        activeEditorProjectId: PROJECT_A,
      }),
    ).toBe(PROJECT_A);
  });

  it('keeps the project it already shows when the active editor moves to another', () => {
    expect(
      resolveTextCollectionProjectId(PROJECT_A, {
        explicitProjectId: undefined,
        activeEditorProjectId: PROJECT_B,
      }),
    ).toBe(PROJECT_A);
  });

  it('keeps the project it already shows when the active editor reports none', () => {
    expect(
      resolveTextCollectionProjectId(PROJECT_A, {
        explicitProjectId: undefined,
        activeEditorProjectId: undefined,
      }),
    ).toBe(PROJECT_A);
  });

  it('always uses an explicit projectId, over both the shown project and the active editor', () => {
    expect(
      resolveTextCollectionProjectId(PROJECT_A, {
        explicitProjectId: PINNED_PROJECT,
        activeEditorProjectId: PROJECT_B,
      }),
    ).toBe(PINNED_PROJECT);
  });
});
