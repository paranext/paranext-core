# PT-4494: Block Web View Sockets Even When the Network Fails to Initialize — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** `blockWebSocketsToPapiNetwork()` runs whether `networkService.initialize()` resolves or rejects, so a renderer that fails to connect never leaves extension sandboxing off.

**Architecture:** Add a small helper next to the flag in `renderer-web-socket.service.ts` that awaits a given initialize function inside `try/finally` and blocks in the `finally`. `src/renderer/index.tsx` calls the helper instead of calling `initialize()` and then blocking. The block must stay *after* initialize settles: the renderer's no-Electron-bridge fallback in `src/client/services/web-socket.factory.ts:34-35` connects to main with `PapiRendererWebSocket` on the PAPI port, so blocking earlier would break that connection.

**Tech Stack:** TypeScript, Vitest (jsdom).

**Spec:** None. The user skipped the spec; this plan argues from Jira PT-4494 (description and Definition of Done) and the brainstorming conversation.

## Global Constraints

- Branch `pt-4494-sandbox-on-network-init-failure`, worktree `.claude/worktrees/PT-4494`.
- Out of scope: surfacing a degraded state in the UI when the renderer can't connect (DoD item 4). Split to its own ticket.
- Out of scope: inverting the default (blocked from the start, with the factory fallback using the native `WebSocket`). Possible follow-up.
- Do not change the PAPI-port match in `isPotentialConnectionToPapiNetwork`.
- Verification uses lint, tests and build, not `npm run typecheck` (user preference).
- Comments must be forward-facing: no ticket or PR narration in source.

## Review Focus

1. **`initialize()` rejects.** Expect sockets to the PAPI port to be blocked, and the original error to reach the existing `catch` in `index.tsx` so "Service(s) failed to initialize!" is still logged. Pinned in Task 1 (`blocks after initialize rejects`, `rethrows the initialize error`).
2. **Before initialize settles.** The renderer's own fallback connection must still be allowed to reach the PAPI port. Pinned in Task 1 (`allows the PAPI port before initialize settles`).
3. **After blocking, other localhost ports still work.** Extensions may open sockets to other ports. Pinned in Task 1 (`still allows other ports after blocking`).
4. **`initialize()` throws synchronously instead of returning a rejected promise.** It should still block. Pinned in Task 1 (`blocks when initialize throws synchronously`).
5. **`initialize()` never settles.** Sandboxing stays off until it does. This is a known gap and not fixed here: the fallback path needs the port open until connect finishes. Mention it in the PR description as a follow-up candidate, together with the invert-the-default alternative.

---

### Task 1: Always block after initialize, and use it at renderer startup

**Files:**
- Modify: `src/renderer/services/renderer-web-socket.service.ts`. Add the helper and update the `blockWebSocketsToPapiNetwork` doc comment, which currently says "Once our network is running".
- Modify: `src/renderer/index.tsx:139` and `:151-152`. Replace `await networkService.initialize();` with the helper, and delete the later standalone `blockWebSocketsToPapiNetwork()` call along with its comment. Update the import on line 23.
- Create: `src/renderer/services/renderer-web-socket.service.test.ts`.
- Regenerate: `lib/papi-dts/papi.d.ts` with `npm run build:types`, because the service module's exports appear there. Never edit it by hand.

**Interfaces:**
- Produces: `export async function initializeNetworkThenBlockPapiWebSockets(initialize: () => Promise<void>): Promise<void>`. It awaits `initialize()` inside `try`, calls `blockWebSocketsToPapiNetwork()` in `finally`, and lets any error propagate.
- `index.tsx` call: `await initializeNetworkThenBlockPapiWebSockets(() => networkService.initialize());`

- [ ] **Step 1: Write the failing tests**

The flag is module-level, so each test needs a fresh module: call `vi.resetModules()` in `beforeEach`, then `await import('./renderer-web-socket.service')`. Use `vi.stubGlobal('WebSocket', FakeWebSocket)` so allowed constructions return a fake without opening a real socket, and `vi.unstubAllGlobals()` in `afterEach`. Build URLs from `WEBSOCKET_PORT` (`@shared/data/rpc.model`).

```ts
const papiUrl = `ws://localhost:${WEBSOCKET_PORT}`;

it('allows the PAPI port before initialize settles', async () => {
  const { PapiRendererWebSocket } = await importFresh();
  expect(new PapiRendererWebSocket(papiUrl)).toBeInstanceOf(FakeWebSocket);
});

it('blocks after initialize resolves', async () => {
  const mod = await importFresh();
  await mod.initializeNetworkThenBlockPapiWebSockets(async () => {});
  expect(() => new mod.PapiRendererWebSocket(papiUrl)).toThrow(`Invalid URL: ${papiUrl}`);
});

it('blocks after initialize rejects', async () => {
  const mod = await importFresh();
  await expect(
    mod.initializeNetworkThenBlockPapiWebSockets(() => Promise.reject(new Error('induced'))),
  ).rejects.toThrow('induced');
  expect(() => new mod.PapiRendererWebSocket(papiUrl)).toThrow(`Invalid URL: ${papiUrl}`);
});

it('rethrows the initialize error', ...)
// The rejection is the same Error instance that was passed in (toBe), so index.tsx's catch logs it.

it('blocks when initialize throws synchronously', ...)
// initialize = () => { throw new Error('sync'); }; the helper rejects with 'sync', and the PAPI port is blocked.

it('still allows other ports after blocking', ...)
// After the helper resolves, new PapiRendererWebSocket('ws://localhost:1234') is a FakeWebSocket.
```

- [ ] **Step 2: Run the tests to confirm they fail**

Run: `npm test -- src/renderer/services/renderer-web-socket.service.test.ts`
Expected: the helper tests fail because `initializeNetworkThenBlockPapiWebSockets` is not a function. `allows the PAPI port before initialize settles` passes, since it pins current behavior.

- [ ] **Step 3: Implement the helper and switch `index.tsx` to it**

Write a TSDoc on the helper that says why the block sits in `finally` and why it can't run before initialize (the fallback in `web-socket.factory.ts`). In `index.tsx`, `markStartup('papi-connected')` stays directly after the helper call, so it still marks only on success.

- [ ] **Step 4: Run the tests to confirm they pass**

Run: `npm test -- src/renderer/services/renderer-web-socket.service.test.ts`
Expected: all 6 pass.

- [ ] **Step 5: Regenerate types, lint, and run the full TS tests**

Run: `npm run build:types && npm run lint && npm test`
Expected: `papi.d.ts` gains the helper's declaration, and both lint and tests are clean.

- [ ] **Step 6: Reproduce the bug by hand (the ticket's repro)**

Temporarily make the helper's argument `() => Promise.reject(new Error('induced'))` in `index.tsx`. Start the app with `unset ELECTRON_RUN_AS_NODE; npm start`. Confirm that "Service(s) failed to initialize!" is logged, and that `new WebSocket('ws://localhost:8876')` run from a web view's devtools throws `Invalid URL: ws://localhost:8876`. Revert the temporary change, and check that `git diff src/renderer/index.tsx` shows only the intended edit.

- [ ] **Step 7: Commit**

```bash
git add src/renderer/services/renderer-web-socket.service.ts src/renderer/services/renderer-web-socket.service.test.ts src/renderer/index.tsx lib/papi-dts/papi.d.ts .context/designs/2026-11-09-pt-4494-sandbox-on-network-init-failure-plan.md
git commit -m "PT-4494: Block web view sockets to PAPI even if network init fails"
```

The commit body explains the bug and that the block stays after initialize because of the factory fallback. End it with the attribution lines.

### Task 2: Follow-up ticket for the degraded state

- [ ] Draft a Jira ticket (use the `jira-creation` skill) for DoD item 4: whether a renderer that couldn't connect should surface that instead of rendering as healthy. Show the draft to the user before creating it. Link it to PT-4494, and also note Review Focus #5 (initialize never settles) and the invert-the-default alternative.
