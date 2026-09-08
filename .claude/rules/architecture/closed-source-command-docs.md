# Doc Altitude for Closed-Source-Backed Commands

Some PAPI commands are declared in this repo (a C# stub, a `.d.ts` augmentation) but only really
implemented by a closed-source consumer — today, Paratext 10 Studio's private
`repo-patches/paranext-core.patch`. The doc comment's `@throws PlatformUnimplementedException if
not running in an application that implements this command (e.g., Paratext 10 Studio)` phrasing
already says as much: Studio is named as an example implementer, not as the contract.

## The rule

For a command in this position, the XML doc / TSDoc describes **caller-visible guarantees** — what
a caller may rely on, and what it must not assume — never the current implementer's specific
mechanism, tuning constants, or internal heuristics.

- **Write:** "callers must not assume every shared project is present locally once this resolves."
- **Don't write:** "syncs an initial batch of 5, then tries the rest one at a time until it finds a
  project with a non-Observer role" — that is Studio's current implementation, not the command's
  contract.

## Why

- **This repo can't verify it.** The real logic lives in a private patch this repo doesn't contain
  and can't run tests against (see `adr-closed-source-command-doc-altitude` in
  `Architecture-Decisions.md`). A doc that asserts specific constants is a claim this repo has no
  way to keep honest — the next time Studio's patch is regenerated (`save-repo-patches`), the doc
  here has no signal that it drifted.
- **It's the wrong altitude even before drift.** A command's public doc should describe the command,
  not one build of one implementer's current approach to satisfying it. If a second white-label app
  ever implements this contract differently, implementation-specific prose here becomes flatly wrong
  for that caller while looking authoritative.
- **Guarantee-level prose is more durable AND more actionable than a bare pointer elsewhere.**
  "See the other repo for details" doesn't work for readers of this repo (including a future AI
  agent) who might not have access to or knowledge of the actual implementation(s), and doesn't
  survive a swapped implementer either. Stating what a caller may/must-not assume is the one thing
  that stays true regardless of which conforming implementation is running, and it's exactly the
  information a caller needs to write correct code against the command.

## How to apply

When documenting (or reviewing a doc change to) a command whose real behavior lives in
`paratext-bible-send-receive` or any other closed-source/swappable extension:

1. State what always holds for **any** conforming implementation — not what the current one happens
   to do.
2. If you're tempted to write a specific number, threshold, or named internal check, ask whether a
   caller actually needs that number to use the command correctly, or whether a weaker "may/must not
   assume X" statement covers the same ground without pinning down how it's achieved.
3. Don't invent requirements the contract doesn't actually have, either — "must" language should
   reflect a real invariant every implementation is expected to honor (e.g., "must throw
   `PlatformUnimplementedException` if not implemented"), not a guess dressed up as a guarantee.

See `adr-closed-source-command-doc-altitude` in
[`Architecture-Decisions.md`](../../../.context/standards/Architecture-Decisions.md) for the
decision history and the specific case (`paratextBibleSendReceive.syncProjects`) that surfaced this.
