import { describe, expect, it } from 'vitest';
import { isNameTakenError } from '@renderer/services/name-taken-error.util';

/**
 * The messages here are copied from the throw sites, not invented: getting one of them wrong makes
 * a window that lost the app-global hosting race report the routine outcome as a failure — and
 * stops it logging the phrase the multi-window e2e greps for to prove the step-aside happened.
 */
describe('isNameTakenError', () => {
  it('recognizes the local guard in networkObjectService.set', () => {
    expect(
      isNameTakenError('Network object with id platform.themeService is already registered'),
    ).toBe(true);
  });

  it('recognizes the local guard in dataProviderService.registerEngine', () => {
    expect(
      isNameTakenError(
        'Data provider with name platform.themeServiceDataProvider is already registered',
      ),
    ).toBe(true);
  });

  // What a whole network object losing the race to another window actually reports: `set` could not
  // register any of the object's methods, and throws the per-method reasons together.
  it('recognizes a network object registration the central registry refused', () => {
    expect(
      isNameTakenError(
        'Unable to register network object with id ScrollGroupService:\n' +
          '\tError: Could not register request handler for object:ScrollGroupService\n' +
          '\tError: Could not register request handler for object:ScrollGroupService.getScrRef',
      ),
    ).toBe(true);
  });

  it('recognizes a network event name the central registry refused', () => {
    expect(
      isNameTakenError(
        'Event "theme:onDidChangeTheme" was rejected by the central registry (likely already registered from another process).',
      ),
    ).toBe(true);
  });

  it.each([
    ['a network service that has shut down', 'Network service has shut down; not reconnecting'],
    ['a request that timed out', 'Request timed out for object:ScrollGroupService'],
    [
      'an object that already carried an onDidDispose',
      'You can\'t register "ScrollGroupService" as a network object since it already has an onDidDispose property',
    ],
    ['an RPC handler that was never set up', 'RPC handler not set'],
  ])('does not read %s as the name being taken', (_description, errorMessage) => {
    expect(isNameTakenError(errorMessage)).toBe(false);
  });
});
