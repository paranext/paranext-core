# papi-live.fixture audit (A.9 step 1)

**Audit date:** 2026-05-19
**Auditor:** Claude (PR-A foundation)
**Subject:** [`e2e-tests/fixtures/papi-live.fixture.ts`](../papi-live.fixture.ts)

Plan reference: `.context/plans/we-ported-the-first-vectorized-gizmo.md` Part 2
Section A.9 step 1 — "papi-live.fixture audit. Before any other validation step,
audit `e2e-tests/papi-live.fixture.ts` for the capabilities PR-B will need:
arbitrary positional args, full response payload return, error-code extraction
without throw. Document findings. If gaps exist, extend the fixture in PR-A (not
PR-B) — the fixture is foundation, and PR-B's wire-conformance assumes it works."

## Capabilities required by PR-B

| Capability                                                   | Required by PR-B for                                                                                      | Audit result                                                                                                                                                                                                                                                                                                             |
| ------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Arbitrary positional args                                    | Wire-conformance tests call commands with `representativeInput.params[]` of varying arity                 | **Pass.** `sendCommand(commandName, ...args)` and `sendCommandRaw(commandName, ...args)` use rest parameters and forward `args` as a positional array via `jsonRpcClient.request(\`command:${commandName}\`, args)`. Any arity is supported.                                                                             |
| Full typed response payload return                           | Wire-conformance asserts `expect(response).toMatchObject(returnSchema)` against the actual command result | **Pass.** `sendCommand<T>(): Promise<T>` returns the deserialized result directly; tests pass their expected type as the generic parameter. The raw response (with `result` and `error` slots) is available via `sendCommandRaw`.                                                                                        |
| Error-code extraction without throw on business-logic errors | Wire-conformance verifies `errors[].code` values without the call raising                                 | **Pass.** `sendCommandRaw(commandName, ...args): Promise<JSONRPCResponse>` returns the full JSON-RPC response including `response.error.code` when present, without throwing. The doc comment explicitly calls out this use case ("Use this when you need to inspect error codes rather than just catching exceptions"). |

## Additional capabilities observed (not required by PR-B but useful)

- **Skip guard via `canConnectToPapi()`** — graceful skip when the app isn't
  running. Will be useful in CI where the app may not be available.
- **Retry logic on connection** — 3 attempts with 2s delay between, helps avoid
  flakiness when the app is still warming up.
- **Connection-loss detection** — clear error message if the .NET data provider
  crashes mid-test.
- **Per-request timeout via `jsonRpcClient.timeout()`** — applied per-request
  rather than globally, useful for varying command costs.
- **`request` / `requestRaw` escape hatches** — for non-`command:` JSON-RPC
  methods (e.g., `rpc.discover`).

## Gaps identified

**None.** The fixture as it ships satisfies every PR-B requirement. PR-A does
NOT need to extend `papi-live.fixture.ts`.

## Implications for PR-B

PR-B's wire-conformance test generator (`generate-wire-conformance-tests.ts` per
plan B.4) can emit Playwright tests that:

```ts
import { test, expect, canConnectToPapi } from '../../fixtures/papi-live.fixture';

test.beforeAll(async () => {
  test.skip(!(await canConnectToPapi()), 'PAPI server not running');
});

test('command:checklist.getItem matches return schema', async ({ papiLive }) => {
  const response = await papiLive.sendCommandRaw('checklist.getItem', 'item-001');
  expect(response.error).toBeUndefined();
  expect(response.result).toMatchObject(returnSchemaFromIntegrationPlan);
});

test('command:checklist.getItem returns documented error code for unknown item', async ({
  papiLive,
}) => {
  const response = await papiLive.sendCommandRaw('checklist.getItem', '__missing__');
  expect(response.error?.code).toBe(-32001);
});
```

No fixture changes needed before PR-B starts.

## Out of scope (separate audits PR-B will need)

- **Setup-state fixtures** at `e2e-tests/fixtures/setup/<identifier>.ts` —
  referenced by `representativeInput.setup` in `data-contracts.json`. These
  don't exist yet for any feature; the spec-generator / contract-writer must
  emit them as part of contract derivation. The in-flight feature's contract
  derivation in A.9 step 5 will reveal which setup scripts are needed.
- **App-runner integration** (PR-B B.3 app-start smoke) — uses the
  `app-runner` skill; not the papi-live fixture.
- **log-inspector integration** (PR-B B.3) — uses the `log-inspector` skill.
