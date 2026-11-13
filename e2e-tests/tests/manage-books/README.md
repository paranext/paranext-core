# manage-books E2E Tests

**Everything in this directory is parked.** The Manage Books feature was built experimentally and is
still to be finished (epic PT-1779, "Manage Books in a Project"). These specs are its written test
scenarios, kept so that work can start from them. No config collects them, nothing in CI runs them,
and none of them has run as a whole.

**DESTRUCTIVE.** Three of the four specs, and the second `describe` of the fourth, change real
project data with no restore: they delete books, create books (USFM stub files that survive a
restart) and copy books or versification between whatever projects the running app has. Do not run
them against a machine whose projects you care about.

## What is here

| File                                     | Tests               | What it does                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | Writes real project data                                                                                        |
| ---------------------------------------- | ------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| `manage-books-commands.spec.ts`          | 21                  | Wire-level check of the `manageBooks` network object (`object:platformScripture.manageBooks`) over the PAPI websocket. The first `describe` confirms every method is discoverable through `rpc.discover` and accepts the parameter shape the C# handler expects. It writes nothing: the project-specific methods get a made-up project id (`__papi_verification_nonexistent__`), `getToProjectFilter` and `filterProjects` read the running app's real project list, and `checkOverlappingFiles` takes no project. The second `describe` checks permission, versification and error-shape paths against real projects found through `filterProjects`. | First `describe`: no. Second: can (`createBooks`, `copyBooks`, `copyCustomVersification` against real projects) |
| `manage-books-journey.spec.ts`           | 8                   | Multi-step flows through the Manage Books dialog UI (switching between the Create, Delete, Copy, Import and View modes, and the Greek Esther picker on top of Create).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | Yes: bulk-selects books and replaces whole books in a rotation of real projects                                 |
| `manage-books-functional-WP-001.spec.ts` | 30 (6 `test.fixme`) | The unified Manage Books dialog: all five action modes and the book grid.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | Yes: deletes a book (GEN) once the delete confirmation is accepted                                              |
| `manage-books-functional-WP-002.spec.ts` | 15                  | The Greek Esther template picker and its integration into the Create flow.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | Yes: creates books through `manageBooks.createBooks` in rotation projects                                       |

The business logic itself is covered by the C# tests; these specs target the integration between
the web view, the network object and the C# handlers.

## What keeps them parked

- `playwright-cdp.config.ts` testIgnores `**/manage-books/**`, so a bare `npm run test:e2e-cdp`
  does not collect them. The testIgnore also applies to a file named on the command line.
- `playwright.config.ts` has no project for this directory.
- `manage-books-commands.spec.ts` connects to the PAPI websocket (`ws://localhost:8876`) of an app
  you started yourself and skips itself when nothing answers there. The other three attach to the
  app over CDP through `fixtures/cdp.fixture.ts`.

Every file keeps a header comment saying it is parked and, where it applies, destructive.

## What has to exist before they can run

1. **A disposable project fixture.** The suite must own a throwaway project root holding the
   projects the specs mutate, so a run never touches a developer's real projects. Two existing
   ways to get one: the `isolatedProjectRoot` launch option in `fixtures/helpers.ts`, and the temp
   projects folder `find.fixture` creates for its own copy of a project. Today the specs pick whatever projects the app has,
   by name (`zzz7`, `wgPIDGIN`, `zzz6`, `MP1`, `RH2`, `ROT`, `ESVUS16`, `TPTS`).
2. **A restore step**, or a fresh copy of that fixture per run, so books deleted or created by one
   test do not decide the result of the next. `manage-books-functional-WP-002.spec.ts` documents
   the manual cleanup it needs on `ROTATION_FIXTURES_REQUIRING_MISSING_BOOK`.
3. **A launch fixture.** The attach-based specs need an app already running; moving them under a
   launch fixture that starts its own app on that project root makes them routine-runnable.
4. **Re-check each scenario against the finished feature**, then remove the `testIgnore`, give the
   directory a project or an npm script, and drop the header comments and this section.

## How to run `manage-books-commands.spec.ts` by hand

Only on a machine prepared for its second `describe`; to keep to the half that writes nothing, run it with
`--grep "wire-level round-trip"`.

```bash
./.erb/scripts/refresh.sh
npx playwright test --config e2e-tests/playwright-cdp.config.ts tests/manage-books/manage-books-commands.spec.ts
```

Because the config's testIgnore applies to a file named on the command line, remove
`'**/manage-books/**'` from `testIgnore` locally for the run, and put it back afterwards.

**Size:** 4 spec files — 74 `test(...)` / `test.fixme(...)` declarations, 6 of them `test.fixme`.
