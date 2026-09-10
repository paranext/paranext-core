---
paths:
  - 'src/**'
  - 'lib/**'
  - 'extensions/src/**'
---

## Native `String` Methods vs. the Grapheme-Aware Helpers

`platform-bible-utils` exports grapheme-aware versions of the `String` methods — `includes`,
`indexOf`, `startsWith`, `endsWith`, `slice`, `split`, `substring`, `stringLength`, `at`,
`charAt`, `codePointAt`. They segment their input into grapheme clusters so that a search cannot
match half of a user-perceived character, and so that "length" means what a person reading the
string would say it means.

Segmenting is expensive, and it is the whole cost: native `String` never segments and is several
times faster than even a reused `GraphemeString` instance. On a hot path over a large string the
difference is measured in seconds, not microseconds. So the choice matters, in both directions.

### The rule

**Use native `String` only when both the needle and the haystack are ASCII by construction.**

An ASCII needle alone is not enough. `startsWith('á', 'a')` is `false` grapheme-aware and
`true` native, because the `a` is part of a cluster — so the haystack decides. It qualifies when it
is a machine-generated identifier, key, request type, property name, or markup that the code itself
produced. It does not qualify when it is user-facing text, a localized string, scripture text, an
error message, a file name off disk, or a name an extension author chose.

Some cases that look like they qualify and do not:

- **File names off disk.** macOS stores filenames decomposed, so `café.d.ts` is `cafe` + U+0301.
  Native prefix matching lets an extension named `cafe` claim it.
- **Extension-derived names.** An extension's `name` in its manifest is not restricted to ASCII, so
  anything built from it — a settings namespace, a menu `namePrefix`, a kebab-cased module name —
  is not ASCII by construction either.
- **Error messages.** Even when the code builds part of the message, the rest comes from wherever
  the error did.

Going the other way, some cases that look like they need grapheme awareness and do not:

- **An ASCII haystack with an arbitrary needle** — such as an English book name or a 3-letter canon
  id searched with a user-typed query. Every cluster in an ASCII haystack is one code unit, so the
  two index spaces coincide and a non-ASCII needle cannot match either way.

When a site does not qualify but is hot, the answer is a single reused `GraphemeString` instance,
not native `String`. Segmenting once and reusing is the fix for a loop that re-segments; it is not
a license to change what the code means.

### Convert whole expressions, never single calls

An index from one call is fed to another constantly:

```ts
const colonIndex = indexOf(requestType, ':');
const category = substring(requestType, 0, colonIndex);
```

A grapheme index with a grapheme `substring`, and a UTF-16 index with a native `substring`, give
identical results — the two index spaces agree on *where* the separator is, they just count
differently getting there. **Mixing them is a silent, data-dependent bug.** So convert the whole
expression or none of it, and when reviewing a diff that touches one of these calls, find its
partner.

### Non-string arguments

The helpers throw `Input must be a string` when handed a non-string; native methods duck-type
instead. A guard that relies on the helper to reject a malformed input stops rejecting it the
moment it goes native, and often keeps *looking* correct:

```ts
['../../secret.txt'].includes('..');  // false — Array#includes compares elements
(42).length < 1;                      // false — length is undefined, undefined < 1 is false
```

Any guard converted to a native method needs an explicit `isString` check, and its test must assert
the guard's own error rather than a bare `toThrow()` — a non-string reaching the code below usually
throws anyway, from somewhere else.

### Publishing

`platform-bible-utils` and `platform-bible-react` are consumed through their committed `dist/`, and
the root `npm run build` does not rebuild them. A source change in either package that is not
accompanied by `npm run build:pbu` / `npm run build:pbr` and a committed `dist/` **does not ship**,
and CI cannot see the skew. `platform-bible-react`'s bundle embeds `platform-bible-utils`' `dist`,
so rebuilding the latter requires rebuilding the former too.
