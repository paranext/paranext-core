/**
 * Unit tests for {@link projectUsersToWrite}.
 *
 * These run under vitest (`npm test`), not Playwright: the decision they cover is pure, and the
 * behaviour at stake is invisible in a passing run — writing a project-users file at all is what
 * downgrades a project from ParatextData's "no file, always administrator" default.
 */
import { describe, expect, it } from 'vitest';
import { projectUsersToWrite } from './comment-test-helpers';

describe('which project users to write', () => {
  it('writes nothing when the caller asked for no users', () => {
    // ParatextData grants full access to a project with NO users file. A caller passing [] is
    // asking for exactly that, so the machine's own registered user must not drag a file into
    // existence and take the permission away.
    expect(projectUsersToWrite([], ['localUser'], 'RegisteredUser')).toBeUndefined();
  });

  it('still writes nothing when the machine has a registered user and local users', () => {
    expect(projectUsersToWrite([], [], 'RegisteredUser')).toBeUndefined();
    expect(projectUsersToWrite([], ['localUser'], undefined)).toBeUndefined();
  });

  it('includes the current and local users when the caller did ask for users', () => {
    // Once the file exists, a user missing from it has no role and every comment write is refused —
    // so a caller that wants users still needs the machine's own name in there.
    expect(projectUsersToWrite(['Alice'], ['localUser'], 'RegisteredUser')).toEqual([
      'Alice',
      'localUser',
      'RegisteredUser',
    ]);
  });

  it('does not repeat a name that arrives from more than one source', () => {
    expect(projectUsersToWrite(['Alice'], ['Alice'], 'Alice')).toEqual(['Alice']);
  });
});
