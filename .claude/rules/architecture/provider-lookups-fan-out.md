---
paths:
  - "src/renderer/**"
  - "src/shared/**"
  - "src/extension-host/**"
  - "extensions/src/**"
  - "lib/platform-bible-react/**"
---

# A Provider Lookup Is a Fan-Out: Diff and Cache in Reactive Consumers

`projectDataProviders.get(...)`, `projectLookupService.getMetadataForProject(...)` and
`getMetadataForAllProjects(...)` are not local reads. Each one asks EVERY registered PDP factory,
in every process, for its project list, and the layering factories in the extension host answer by
asking every other factory again. One call from the renderer reaches the C# factories several times.
The lookup service deliberately keeps no cache (the answer changes as factories register and
resources install), so bounding the cost is the caller's job.

## The rule

When one of those calls sits inside something that can fire repeatedly — a React effect keyed on the
set of open web views, a subscription callback, a settings watcher, any loop over a set another
surface writes — the consumer MUST:

1. **Act on the diff.** Acquire only the members that joined; release only the members that left;
   never tear down and rebuild the whole set because one member changed.
2. **Keep what it resolved for its own lifetime.** A member that leaves and rejoins costs one new
   subscription, not a new lookup. Hold the promise, not the value, so concurrent joins share one
   lookup.
3. **Remember a failure for a bounded time, then retry.** A failed lookup is not retried until a
   delay has passed (the hook uses 30 seconds), whatever the reason for it: the lookup service
   cannot reliably tell "no such project" from "no factory has answered yet", since it rejects with
   `No project found` for a factory that registers late or a resource installed mid-session too.
   The delay is what bounds a flapping id to one fan-out per window; the expiry is what lets a
   project the backend begins serving later be picked up without reloading the window. A provider
   that was reached but could not be subscribed to (its network object gone after an extension
   host restart) counts as a failure the same way, timed from its first failure so a flapping id
   cannot keep pushing its own retry out, and the dead proxy is not reused for ever. The
   scroll-group service's `ensureVersificationSubscribed` evicts immediately on failure instead;
   that is fine for a module-level cache with few callers, and too eager for a consumer whose
   inputs can flap.
4. **Release what you acquired without throwing.** An unsubscriber is a round trip to a provider
   that may already be gone; call it inside `try/catch`, log a rejection or a `false` result at
   debug level, and never leave the promise floating. `UnsubscriberAsyncList` does this for you when
   a list fits; when you hand-roll per-member bookkeeping, you own it.
5. **Return no cleanup from the membership effect.** React runs an effect's cleanup before every
   re-run, which is exactly the tear-down-everything the rule forbids. Release on unmount from a
   separate empty-deps effect.

Reference implementation: `src/renderer/hooks/use-open-project-book-ids.hook.ts` (the membership
effect, `getBaseProjectDataProvider`, `markProviderFailed` and `releaseBooksPresentSubscription`).
Its tests pin the contract: a survivor is not re-acquired when another member leaves, a member that
flaps five times is looked up once, a failed id is not retried within the delay and is after it, a
provider that failed to subscribe is looked up afresh after the delay, two joins during one in-flight
lookup share it, a member that leaves before its provider resolves is never subscribed, one that
leaves while its subscription is settling is released once, and a rejecting unsubscriber is logged
rather than thrown.

## Why this needs a rule

The call looks like a cheap getter, so the cost is invisible at the call site and only shows up as
a whole-app hang. PT-4597: a panel republishing its navigable project ids ~15 times a second made
the toolbar's book-list hook rebuild every subscription each time, producing ~20,000 lookups and
~52,000 extension-host-to-C# requests in three minutes; .NET stopped answering, the extension
host's socket to main died, and the app had to be force-killed. Fixing the flapping input alone does
not close the class; the previous flapping input to the same hook had already been fixed once
(PT-4501, #2772).

Rationale and rejected alternatives: `adr-provider-lookup-is-a-fan-out` in
[`Architecture-Decisions.md`](../../../.context/standards/Architecture-Decisions.md).
