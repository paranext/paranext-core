# markers-checklist E2E Tests

**Everything in this directory is parked.** The Markers checklist belongs to the Inventory &
Checklists work (epic PT-2049, "Inventory & Checklists"). These specs are its written test
scenarios, kept so that work can start from them. No config collects them, nothing in CI runs them,
and none of them has run to completion.

> **Note:** These tests are experimental and were generated as part of an AI-assisted porting
> workflow.

## These tests have never run

No configuration has been found in which this suite runs to completion, and it is not part of any
routine test run. Nothing reports on it, so nothing notices when the app changes underneath it: the
tests here have silently absorbed fixture refactors, menu-label renames, a Tailwind prefix
migration, and UI redesigns without anyone seeing a failure.

**Read anything below as a record of intent, not as coverage.** A test in this directory passing
review is not evidence the behaviour it describes works, and its absence of failures is not evidence
of health.

## What is here

| File                                              | What it does                                                                                                                                             | Needs                                                                                            |
| ------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------ |
| `markers-checklist-commands.spec.ts`              | Wire-level check of the `platformScripture.checklistService` network object (`buildChecklistData`, `resolveComparativeTexts`, `validateMarkerSettings`). | An app you started yourself with the PAPI websocket on port 8876, and a Paratext (USFM) project. |
| `markers-checklist-functional-UI-PKG-002.spec.ts` | The Markers Checklist web view: toolbar, data table, Hide Matches, Show Verse Text, Copy, persistence and the error state.                               | An app in Power mode attached over CDP, and the `wgPIDGIN` project.                              |
| `markers-checklist-functional-UI-PKG-003.spec.ts` | The Marker Settings dialog: its two fields and their validation.                                                                                         | An app in Power mode attached over CDP, and the `wgPIDGIN` project.                              |
| `markers-checklist-journey.spec.ts`               | Flows across the web view and the settings dialog.                                                                                                       | An app in Power mode attached over CDP, and the `wgPIDGIN` project.                              |
| `wiring-theme-5.spec.ts`                          | Scope selection, navigation, project retargeting and toolbar behaviour of the web view.                                                                  | As above, plus one more project to add as a comparative text.                                    |

None of the specs edits project text. The four UI specs write evidence screenshots under
`.context/features/markers-checklist/proofs/e2e-evidence`. Those four open the checklist with the
`platformScripture.openMarkersChecklist` command, because the editor menu hides its entry in both
interface modes.

**Size:** 5 spec files — 41 `test(...)` declarations and 3 `test.fixme(...)`.

## What keeps them parked

- `playwright-cdp.config.ts` testIgnores `**/markers-checklist/**`, so a bare `npm run test:e2e-cdp`
  does not collect them. The testIgnore also applies to a file named on the command line.
- `playwright.config.ts` has no project for this directory, so `test:e2e:all` does not see it, and
  there is no dedicated npm script.
- `markers-checklist-commands.spec.ts` skips itself when nothing answers on the PAPI websocket; the
  other four attach to the app over CDP through `fixtures/cdp.fixture.ts`.

Each spec keeps a header comment saying it is parked.

## What has to exist before they can run

1. **A project fixture the suite owns.** The UI specs expect the `wgPIDGIN` project to be installed
   on the machine, and nothing in the suite provides it.
2. **A way to see failures.** The `no-silent-skips` reporter (`e2e-tests/reporters/`) fails a run in
   which tests are reported skipped that nobody asked to skip; it can only watch a suite that a
   config collects.
3. **Re-check each scenario against the finished feature**, then remove the testIgnore, give the
   directory a project or an npm script, and drop the header comments and this section.

## How to run them by hand

Only on a machine prepared as above.

```bash
./.erb/scripts/refresh.sh
npx playwright test --config e2e-tests/playwright-cdp.config.ts tests/markers-checklist/
```

Because the config's testIgnore applies to a file named on the command line, remove
`'**/markers-checklist/**'` from `testIgnore` locally for the run, and put it back afterwards.
