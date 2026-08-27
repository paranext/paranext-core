# A Narrowed Search Cannot Tell "Absent" From "Somewhere Else"

When a search is narrowed — by path, by glob, by `grep -v`, or simply by looking only where you
expect the answer to live — a clean result means **"not here"**, never **"not anywhere"**. Treat
those as two different findings. Reporting the first as the second is how a false gap gets filed,
and how a real one gets missed.

Before concluding that something is missing:

1. **Widen the search** until it covers everywhere the thing could legitimately live, or
2. **Open the file** where it would be defined and look.

State which you did. "Not found under `src/renderer`" and "not present in the repo" are different
claims and should not be written the same way.

## Two ways this actually went wrong

- **The exclusion swallowed the evidence.** A sweep for stale anchor links into
  `Architecture-Decisions.md` filtered that file out with `grep -v 'Architecture-Decisions.md'`. That
  drops every *line containing that filename* — which is precisely what an anchor link is. The sweep
  came back clean while the stale anchors sat there. Exclude by **path**, not by substring.
- **The search looked where the caller was, not where the thing is defined.** A check for a missing
  `'x-experimental': true` marker searched the shard files, because that is where the method lives.
  The marker lives on the registration's documentation object, elsewhere. The clean result nearly
  became a filed API-compliance gap that did not exist.

## A related trap: a generated artifact cannot show what it is not generated from

`lib/papi-dts/papi.d.ts` is generated from the **type** surface. A regenerated-types diff therefore
cannot reveal a missing wire marker: a command, network object, data provider or network event
registered without `'x-experimental': true` produces a byte-identical `papi.d.ts`. Verify the wire
marker by reading the registration's documentation object, or the live OpenRPC document at
`rpc.discover` — never by inferring it from the type surface. See
[Paranext-Core-Patterns.md § Experimental APIs](../../.context/standards/Paranext-Core-Patterns.md#experimental-apis).

## Tooling note

`grep` on the team's development machines is **ugrep**, not GNU grep. Do not assume flag semantics
match GNU's; check when a flag matters to the result.
