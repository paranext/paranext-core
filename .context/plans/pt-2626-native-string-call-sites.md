# PT-2626 follow-up: string-util call sites that should be native

> **Frozen record** — written and executed 2026-08-25 on `pt-2626-native-string-call-sites`. Line
> citations below were accurate at that commit; follow the current files rather than this document.
> The sweep counts are a snapshot of that day's tree.

Three work items from a sweep of `paranext-core` and `paratext-bible-internal-extensions` for call
sites that pass a string through `platform-bible-utils`' grapheme-aware helpers but do not need
grapheme awareness at all.

Independent of the `GraphemeString` branch: once a site uses native `String` methods it no longer
calls `string-util`, so these can land in either order.

## Why native, not `GraphemeString`

The wrapper swap on `pt-2626-grapheme-string-util` made every `string-util` function delegate to
`GraphemeString`, so all of these sites already got faster without an edit. They are still paying for
segmentation they do not need. Segmenting a string is the expensive step; native `String` never
segments, and is several times faster than even a reused `GraphemeString` instance.

**A site qualifies only when both the needle and the haystack are ASCII by construction.** An ASCII
needle alone is not enough: `startsWith('á', 'a')` is `false` grapheme-aware and `true` native,
because the `a` is part of a cluster. The haystack has to be a machine-generated identifier, key,
path, or markup — never user-facing text.

The counter-example is in the extensions repo: `link-error.component.tsx` calls
`indexOf(text, 'https://')`, whose needle is ASCII but whose haystack is a user-facing error message.
That site must **not** go native; it wants a single `GraphemeString` instance instead, and it is
tracked separately.

## Shared safety argument: index-space consistency

Several of these sites take an index from one call and feed it to another:

```ts
const colonIndex = indexOf(requestType, ':');
const category = substring(requestType, 0, colonIndex);
```

This is safe to convert **as a unit**. A grapheme index paired with a grapheme `substring` and a
UTF-16 index paired with a native `substring` produce the identical result — the two index spaces
agree on where the separator is, they just count differently on the way there. What is never safe is
converting one call and leaving its partner, which mixes index spaces.

So each work item converts a whole expression, never a single call.

The one behavioral difference in all three items is the same: a needle immediately followed by a
combining mark. Grapheme-aware search refuses a match that ends mid-cluster, native accepts it. For
`get́Foo` the current code says "not a getter" and native says "getter". None of these haystacks
can realistically contain that, and where it matters it is called out per item.

---

## WI-1 · Proxy traps dispatch on ASCII method-name prefixes

**Files** `src/shared/services/data-provider.service.ts` (5 sites),
`src/shared/services/network-object.service.ts` (3 sites)

**What** Every property access on a data provider or network object goes through a `Proxy` trap that
classifies the property name by prefix:

| Site | Call |
| --- | --- |
| `data-provider.service.ts:399` | `startsWith(prop, 'subscribe')` |
| `data-provider.service.ts:449` | `startsWith(prop, 'get')`, `startsWith(prop, 'subscribe')` |
| `data-provider.service.ts:465` | `startsWith(prop, 'subscribe')` |
| `data-provider.service.ts:692-693` | `startsWith(fnName, 'get')`, `startsWith(fnName, 'set')` |
| `network-object.service.ts:386, 432, 458` | `startsWith(key, 'on')` |

**Why it qualifies** The haystack is a JavaScript property name from a TypeScript API surface, and the
needle is a lowercase ASCII prefix. Both ASCII by construction.

**Why it is the highest-frequency item** These traps run on *every* property access on every data
provider and network object. They are also the one place where the construct-once refactor is
impossible even in principle: the trap receives a fresh key string each invocation, so there is
nothing to hold an instance across. Native is the only available fix.

**Risk** A method name containing a combining mark directly after the prefix would newly classify as
a getter/setter/event. This *is* reachable — U+0301 is `ID_Continue`, so `{ get́Data() {} }` parses
and `Object.keys` returns `get́Data` — but the failure is loud rather than silent: such a method
groups as a `get`, trips the get/set-count check in `buildDataProvider`, and `registerEngine`
rejects the whole provider. Nobody writes such an identifier by accident, and if they do they find
out immediately.

---

## WI-2 · `deserializeRequestType` runs on every PAPI message

**File** `src/shared/utils/util.ts:97-107`

**What** Four segmenting calls on the same string to split `category:directive`:

```ts
const colonIndex = indexOf(requestType, REQUEST_TYPE_SEPARATOR);
if (colonIndex <= 0 || colonIndex >= stringLength(requestType) - 1) throw ...
const category = substring(requestType, 0, colonIndex);
const directive = substring(requestType, colonIndex + 1);
```

**Why it qualifies** `REQUEST_TYPE_SEPARATOR` is `':'`, and request types are built by
`serializeRequestType` from internal category and directive identifiers. The bounds check
`colonIndex >= length - 1` means "the separator is the last character", which is true in either index
space.

**Why it matters** It is on the path of every message crossing the PAPI boundary — the highest call
volume of the three, on short strings where four segmentations are pure overhead.

**Risk** A request type whose directive begins with a combining mark currently throws and would
afterwards parse. `serializeRequestType` cannot produce one from real identifiers.

---

## WI-3 · The web view `<head>` splice is the largest single cost

**File** `src/renderer/services/web-view.service-host.ts:2150-2168`

**What** Four segmenting calls over an entire HTML document to inject the CSP, styles, and imports:

```ts
const headStart = indexOf(webViewContent, '<head');
const headEnd = indexOf(webViewContent, '>', headStart);
...
webViewContent = `${substring(webViewContent, 0, headEnd + 1)} ... ${substring(webViewContent, headEnd + 1)}`;
```

**Why it qualifies** The needles are ASCII markup. The haystack is a whole HTML document that may
well contain non-ASCII text, but the search targets only the opening `<head` tag and its closing `>`,
and the indexes are used solely to splice the same string — so the index space never escapes.

**Why it matters most in wall-clock** Instrumented runs attribute roughly 5–11 seconds of startup and
~1.2 seconds per tab open to this site, because it segments the full document four times. This is the
single largest string cost in the app.

**Note on the `-1` sentinel** When the document has no `<head`, `headStart` is `-1` and is passed as
the `position` of the next `indexOf`. That is currently harmless — `stringz`, native, and the shipped
`GraphemeString` all clamp a negative position to 0 — so this conversion **preserves the behavior**.
Adding an explicit `headStart < 0` guard would be a readability improvement but *is* a behavior
change on malformed documents, so it is deliberately excluded here and left as a separate decision.

---

## Verification for all three

Native and grapheme-aware must agree on every realistic input, so the test for each item pins the
observable output rather than the index arithmetic:

- WI-1: no test. Native `startsWith` matches a superset of what the grapheme-aware version matches,
  and every property name these traps see is ASCII, so a `get`/`forgetful` case cannot distinguish
  the two implementations — it passes either way. (There is no `data-provider.service.test.ts` or
  `network-object.service.test.ts` to add it to in any case.) The behavior that *is* worth pinning
  is the loud-failure path described under WI-1's risk, which `registerEngine` already enforces.
- WI-2: round-trip `serializeRequestType` → `deserializeRequestType`, including a category and a
  directive containing non-ASCII text, proving the split lands in the same place either way. In
  `papi-util.test.ts`.
- WI-3: the splice is extracted as `spliceIntoWebViewHead` (`web-view-head.util.ts`) so it can be
  reached at all, and `web-view-head.util.test.ts` asserts it against both an independently computed
  expectation and the grapheme-aware implementation it replaced, over documents with astral
  characters, combining marks, and a CRLF pair on each side of the `<head>` tag. The two known gaps —
  a document with no `<head`, and a `>` inside an attribute value — are pinned as they behave today,
  so changing either reads as deliberate.

### What the `<head>` splice actually cost

Measured with the pre-change helper against the post-change native method, four calls per document:

| Document | helper (4 calls) | native |
| --- | --- | --- |
| 100 KB | 36 ms | ~0 ms |
| 500 KB | 186 ms | ~0 ms |
| 2 MB | 1023 ms | ~0 ms |

Web views inline their bundled app, so 1–2 MB is ordinary — which is where the "~1.2 s per tab open"
figure above comes from.

---

## The full sweep

The three items above were the highest-value sites. A wider sweep — every call to a segmenting
helper in a file that imports it, not just those with a quoted ASCII needle — found **86 call sites
across 32 files** in `paranext-core`. Of those, **73 converted to native** and 13 did not.

### What did not convert, and why

| Site | Reason |
| --- | --- |
| `scripture-util.ts:309, 311` — `split(bookName, '-')`, `split(parts[0], '\xff08')` | Localized book names. ASCII separators, but the haystack is user-facing text; needs a human call. |
| `scripture-util.ts:833, 842, 844` — the USJ trailing-whitespace trim | Genuinely wants one `GraphemeString` instance, not native. The loop re-segments per iteration, which is the only quadratic shape left. Belongs to the construct-once work — measured at ~256 ms per call; see the TODO at the site. |
| `book.utils.ts:165-174` — book search | Split since this table was written: the localized-name and localized-id comparisons stay grapheme-aware, because that is the case grapheme awareness exists for. The English name and canon id went native — an ASCII haystack makes the index spaces coincide whatever the query is. |
| `extension-host.ts:167` — `substring(exampleData, 0, 100)` | Truncating arbitrary data for a log line. Native could cut a surrogate pair in half and emit a broken glyph. |
| `extension-asset.utils.ts` — the `> 100` length guard | See below. |

### Two sites that qualify for reasons other than the stated rule

Both were converted, and both are safe, but neither is safe *because* the needle and haystack are
ASCII by construction — so the reason is written down here rather than left to be re-derived.

**Namespace-ownership gates** — `menu-document-combiner.ts:47, 65, 76, 90, 93, 332`,
`settings-document-combiner-base.ts:222`, `theme.service-host.ts:135, 445`. These check that a
contributed name starts with the contributing document's namespace. The needle is
`` `${documentName}.` ``, derived from the extension's `name`, which `parseManifest` does not
restrict to ASCII — so this is not the "JavaScript property names from a TypeScript API surface"
case the proxy traps are. What makes it safe is the trailing `.`: native prefix matching differs
from grapheme only when the character following the match is a combining mark, and a combining mark
is not a `.`. A name that is genuinely inside a foreign namespace still fails, and a name that
merely *starts* with a foreign namespace's letters cannot end its match on the separator. No
cross-namespace escalation is constructible.

**`inventory-utils.ts:9`** — `codePointAt(char, 0)` → `char.codePointAt(0)`. The haystack is user
scripture text, which the rule excludes outright. It is safe for a narrower reason: at index 0 the
two agree by definition — the first code point of the first grapheme cluster *is* the string's
first code point. Only index 0 has this property; the same conversion at any other index would be
wrong.

### The length guard is worth its own note

`getAssetPathInfoFromExtensionUri` converted almost entirely — the URI is percent-encoded and ASCII while it is
being parsed. But `extensionName` and `assetPath` go through `decodeURIComponent` first, and the
guard that follows reads:

```ts
if (stringLength(extensionName) > 100 || stringLength(assetPath) > 100)
  throw new Error('... must be less than 100 characters each');
```

Counting UTF-16 units here would silently tighten the limit for any non-Latin script — a 60-character
Chinese extension name is 60 graphemes but can be far more code units, and would start failing a
"100 characters" rule that its author reads as satisfied. The error message says *characters*, and to
the person reading it that means graphemes. This one stays grapheme-aware and carries a comment
saying so.

The neighbouring `assetPath.startsWith('assets/')` checks *did* convert: a filesystem path prefix is
correctly compared by code unit, and every other path check in the codebase already does.

### The latent index-space mix it tidied on the way past

Not a live bug — grapheme and native `slice` agree for every input here, astral and combining-mark
cases included, because `PDP_FACTORY_LABEL` is ASCII. It is the shape the migration exists to kill,
found already written. `project-lookup.service-model.ts:57-58` mixed index spaces in a single
expression:

```ts
endsWith(pdpFactoryNetworkObjectName, PDP_FACTORY_LABEL)
  ? slice(pdpFactoryNetworkObjectName, 0, -PDP_FACTORY_LABEL.length)
```

A native UTF-16 `.length` used as a negative *grapheme* index. Harmless while the label is ASCII, and
it would stay harmless until someone changed the label. Converting the expression to native makes
both halves agree by construction rather than by coincidence.
