# manage-books E2E Tests

One spec, `manage-books-commands.spec.ts`: a wire-level check of the `manageBooks` network object
(`object:platformScripture.manageBooks`) against a running app. It confirms every method is
discoverable through `rpc.discover` and that each accepts the parameter shape the C# handler expects,
so a mismatch surfaces as a JSON-RPC protocol error (-32601 / -32602) rather than a business error.
The business logic itself is covered by the C# tests.

Every call uses a made-up project id (`__papi_verification_nonexistent__`), so nothing real is read
or written.

## How to run

The spec connects to the PAPI websocket (`ws://localhost:8876`) of an app you started yourself and
skips itself when nothing answers there:

```bash
./.erb/scripts/refresh.sh
npx playwright test --config e2e-tests/playwright-cdp.config.ts tests/manage-books/manage-books-commands.spec.ts
```

`playwright-cdp.config.ts` testIgnores `**/manage-books/**`, so a bare `npm run test:e2e-cdp` does
not collect it, and the directory is not a project in `playwright.config.ts`. The testIgnore also
applies to a file named on the command line; to run the spec, remove `'**/manage-books/**'` from
`testIgnore` locally for the run.

**Size:** 1 spec file — 13 `test(...)` declarations.
