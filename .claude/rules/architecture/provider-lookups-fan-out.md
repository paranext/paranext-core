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
3. **Remember a failure for a bounded time, then retry in place.** A failed lookup is not retried
   until a delay has passed (the hook uses 30 seconds), whatever the reason for it: the lookup
   service cannot reliably tell "no such project" from "no factory has answered yet", since it
   rejects with `No project found` for a factory that registers late or a resource installed
   mid-session too. The retry must be **timer-driven, armed by the failure itself**, not left to
   the next membership change: a push-driven consumer's diff never revisits a member that stays in
   the set, so a retry that waits for a rejoin never fires for a project that simply stays open.
   The delay is what bounds a flapping id to one fan-out per window; the timer is what lets a
   project the backend begins serving later be picked up without reloading the window. A provider
   that was reached but could not be subscribed to (its network object gone after an extension
   host restart) counts as a failure the same way, timed from its first failure so a flapping id
   cannot keep pushing its own retry out, and the dead proxy is not reused for ever; a later
   successful subscribe clears the stamp so a working provider is never discarded. While a member
   cannot report, it contributes nothing, not its previous answer. The scroll-group service's
   `ensureVersificationSubscribed` evicts immediately on failure instead; that is fine for a
   pull-driven, module-level cache that is re-read on every use, and both too eager and
   insufficient for a push-driven consumer whose inputs can flap.
4. **Release what you acquired without throwing.** An unsubscriber is a round trip to a provider
   that may already be gone; call it inside `try/catch`, log a rejection or a `false` result at
   debug level, and never leave the promise floating. `UnsubscriberAsyncList` does this for you when
   a list fits; when you hand-roll per-member bookkeeping, you own it.
5. **Return no cleanup from the membership effect.** React runs an effect's cleanup before every
   re-run, which is exactly the tear-down-everything the rule forbids. Release on unmount from a
   separate empty-deps effect.

Reference implementation: `src/renderer/hooks/use-open-project-book-ids.hook.ts` (the membership
effect, `getBaseProjectDataProvider`, `handleBooksPresentFailure`, `scheduleBooksPresentRetry`
and `releaseBooksPresentSubscription`). Its tests pin the contract: a survivor is not re-acquired when
another member leaves, a member that flaps five times is looked up once, a failed id is retried
after the delay whether it stays in the set or rejoins and not before, a retry that fails again waits
a full delay, an id that flaps inside the delay still costs one fan-out per window, leaving or
unmounting cancels a pending retry, a retry that fails again leaves the returned list untouched, a
provider that failed to subscribe is looked up afresh after the delay and one that then subscribed
fine is kept, a late failure from a superseded subscription does not mark the provider its
replacement subscribed to, a member that cannot report contributes no books rather than its old
list, two joins during one in-flight lookup share it, a member that leaves before its provider
resolves is never subscribed, one that leaves while its subscription is settling is released once,
and a rejecting unsubscriber is logged rather than thrown.

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
