# Verse-aligned multi-translation grid — feasibility & approach

**Status:** investigation complete, ready for engineering review
**Audience:** developers who would scope/build this (specifically, anyone with write access to the `Editorial` editor — the `@eten-tech-foundation/platform-editor` package)
**Author:** Alex Mercado (UX), AI-assisted investigation
**PRD:** [Simple — Saroj views resources in a text collection](https://docs.google.com/document/d/1MhkhWION9uOuNYFbUgJKUsDQRdumC6dOK4EnIYRuGmY/edit?tab=t.0)

---

## TL;DR

We want to show several Bible translations as aligned columns: verse 1 of every
translation on one row, verse 2 on the next, and so on. The obstacle is that the
Scripture editor models a verse as an inline marker with no container around its
text, so CSS has no per-verse box to place on a grid row. The recommended fix is to
add a new read-only "view mode" upstream in `platform-editor` that wraps each verse's
content in a real block-level node, then align those blocks across columns with CSS
subgrid. A JavaScript height-sync hack is available as an interim demo. Rough cost for
the real feature: ~5–6 developer-weeks, read-only only.

**Confidence:** the document-model findings below were verified directly against the
`platform-editor` source. The cost numbers are rough order-of-magnitude estimates, not
commitments.

---

## 1. Goal

This maps to a nice-to-have in the PRD:

> Saroj sees the different versions of a verse side-by-side, and each verse is horizontally
> aligned with the other versions of the same verse.

Concretely: display several Scripture translations side by side as columns in a CSS grid, where
**corresponding verses line up on the same row across every column** (verse 1 of every
translation in one row, verse 2 in the next, etc.), so a reader's eye can scan a single
verse horizontally across translations.

Constraints for this effort:

- **Read-only** content. No editing in the aligned view.
- The new capability must live **side by side** with the editor as it works today —
  it must not replace it. Existing single-column editing behavior stays untouched.

---

## 2. Background: why this isn't free

The Scripture editor we use is `@eten-tech-foundation/platform-editor` — specifically its
`Editorial` React component, which is built on **Lexical** (the text-editor framework that
backs it; it stores the document as a tree of typed nodes). The Scripture content itself is
loaded as **USJ** (Unified Scripture JSON — the JSON serialization of a USFM document; USFM
is the markup format Bible translations are authored in).

In the editor's current document model, **a verse is an inline marker, not a container**.
It behaves like a USFM _milestone marker_: a point in the text that says "verse N starts
here," with no element wrapping the verse's body. Concretely, a paragraph's content is a
flat run of inline siblings:

```
.para  (block)
  ├─ span.verse "1"         ← the verse-number marker only
  ├─ "In the beginning…"     ← verse 1's words (bare text / character spans)
  ├─ span.verse "2"
  ├─ "And the earth…"       ← verse 2's words
  └─ …
```

Three facts follow from this, and they are the whole reason alignment is non-trivial:

1. **There is no per-verse element.** A verse's text is an unwrapped run of inline nodes;
   nothing groups "the marker plus the words that belong to it."
2. **One paragraph holds many verses** — the paragraph (block) boundary is not the verse
   boundary.
3. **One verse can span multiple paragraphs** (poetry, e.g. `\q` quote-line markers).

CSS row-alignment (grid / subgrid) can only line up boxes that are **grid items**. With no
per-verse box, there is nothing to place on a grid row. That is the core obstacle — not
iframes, and not scrolling (see §4).

(Verified in source: the adaptor's `createPara` builds a paragraph node whose `children` is a
flat array of marker and text nodes; the verse node renders the number only. See §9 (a) to
re-check this yourself.)

---

## 3. Where the change goes: Lexical, or Editorial?

**It's the same stack at two layers, so this isn't really a choice between the two.**

- `Editorial` is a thin React wrapper over an internal `Editor` component that just composes
  Lexical plugins. It owns almost no document logic. (Verified: `Editorial.tsx` forwards its
  props straight to `Editor`.)
- The verse/paragraph model — the part we need to change — lives in the **Lexical node
  definitions and the USJ→editor adaptor**. The adaptor is in `platform-editor`'s
  `src/editor/adaptors/usj-editor.adaptor.ts`; the verse node classes themselves
  (`ImmutableVerseNode`, etc.) live in `platform-editor`'s internal `shared` / `shared-react`
  workspace packages, which the adaptor imports.

So we don't pick between Lexical and Editorial. We **add a new Lexical verse node variant
plus an adaptor path** down in `platform-editor`, and surface it through `Editorial` with no
change to `Editorial`'s shape. The change is upstream in `platform-editor`; paranext-core
consumes it as a new option.

**Critical enabler:** the editor already selects the verse node class based on view
configuration. The adaptor does (verified, line ~307 of the adaptor):

```ts
const VerseNodeClass = getVerseNodeClass(_viewOptions) ?? ImmutableVerseNode;
```

and `ViewOptions` already carries an explicit notion of view modes (e.g. a `markerMode` that
switches the document model between editable / visible / read-only renderings). That means a
**block-verse variant can be added as a new view mode** that coexists with the default. This
is exactly the "side-by-side, don't replace" requirement, and it materially lowers cost:
we're extending a seam that already exists, rather than carving a new one.

---

## 4. Approaches we considered

| #   | Approach                                                                                                   | Verdict             | Why                                                                                                                                                                                                                                  |
| --- | ---------------------------------------------------------------------------------------------------------- | ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| A   | One iframe/WebView per column, align across them                                                           | **Rejected**        | CSS cannot align boxes across an iframe boundary; each iframe is an isolated layout context. Dead on arrival.                                                                                                                        |
| B   | One merged editor that interleaves all columns into a single grid                                          | **Rejected**        | Forces all translations into one document model; heavy, and conflates separate documents into one.                                                                                                                                   |
| C   | N unmodified read-only editors + **JavaScript height-sync** (measure each verse marker, pad rows to match) | **Viable fallback** | Works _today_ with no upstream change — verse markers are keyed nodes reachable via the editor's `getElementByKey`. But it's JS measurement and reflow, not native layout, so it's fragile under font swaps, resize, and async load. |
| D   | **New block-verse Lexical node variant** + outer CSS subgrid                                               | **Chosen**          | Native CSS alignment: robust, and scales to any number of columns. Cost is an upstream document-model addition, but it's additive and gated behind a view mode.                                                                      |

> **`display: contents`** (used in D and §6) removes an element's own box from layout while
> keeping its children in the layout flow — it lets a subgrid "chain" pass through wrapper
> elements that would otherwise break it. **Subgrid** lets a nested grid inherit its parent
> grid's row/column tracks, which is what makes corresponding verses share rows across columns.

Two early fears turned out **not** to be blockers, which is why D is attractive:

- **Iframes are not required.** `Editorial` is a plain React component; several instances can
  render inline in one DOM tree. There is already a side-by-side Storybook story that does this,
  in paranext-core at `src/stories/platform/ten-layout-shared.tsx` (it renders two `Editorial`s
  as columns sharing a single Scripture reference).
- **Editorial does not impose scrolling.** Verified: none of the editor's content selectors —
  `.editor-container`, `.editor-inner`, `.editor-input` — set `overflow`, `max-height`, or
  `contain`. (Other selectors in the package's CSS do set `overflow`, but on unrelated
  elements like dropdowns and the placeholder, not on the content chain.) The scroll pane is
  added by the host (us), which we control. So the package itself does not sever a subgrid
  chain running down through the editor.

---

## 5. What we're left with (the chosen approach)

Build approach **D**, with **C as a possible interim**:

> A new **verse-primary view mode** in `platform-editor` whose Lexical node model wraps each
> verse's content in a **block-level verse node** (a real element, not an inline marker).
> N read-only `Editorial` instances render as sibling columns inside an outer CSS grid; each
> column is a subgrid spanning the verse rows, and each verse block is placed on the row keyed
> by its verse number. Verses then align natively across columns with no JavaScript.

This view mode lives **alongside** the existing paragraph-primary mode. Default behavior and
editing are untouched.

### The one genuinely hard design decision (must be made explicitly)

You **cannot** simultaneously (a) preserve exact paragraph structure and (b) have one grid row
per verse — _because verses can cross paragraph boundaries_ (fact 3 in §2). For an aligned
read-only comparison view, the recommended call is:

- Make the verse-block view **verse-primary**: group content by verse into one block per
  verse, flattening intra-verse paragraph nuances (e.g. a poetry line break becomes a `<br>`-like
  break _inside_ the verse's cell rather than a separate row).
- Key rows by **verse number**, so columns stay aligned even when translations differ in
  paragraphing or versification (a missing or merged verse leaves a gap on that row rather
  than shifting everything below it out of alignment).

This is a product decision, not just an implementation detail — get sign-off on it before
building.

---

## 6. How to get there

Steps 1–4 are upstream in `platform-editor`; steps 5–6 are in paranext-core.

1. **Define a block-verse Lexical node** (e.g. `VerseBlockNode`) in `platform-editor`'s `shared`
   package: an element node that contains a verse's marker plus its content. Start with a
   read-only-only (immutable) variant to keep scope tight.
2. **Add an adaptor path**: in the USJ→editor adaptor (the `recurseNodes` / `createPara`
   functions in `usj-editor.adaptor.ts`), regroup each paragraph's flat verse-runs into verse
   blocks when the new view mode is active. Handle the cross-paragraph case per the §5 decision.
3. **Register a new view mode / view option** that selects the block-verse node class through the
   existing `getVerseNodeClass` seam. Leave the default mode unchanged.
4. **CSS**: give the block-verse view a structure that supports a subgrid chain — i.e. the
   levels between the grid and each verse block use `display: contents` or `subgrid` (see §4 for
   what these do). Being read-only sidesteps the known caveats of combining `contenteditable`
   with `display: contents`.
5. **paranext-core layout**: an outer grid container whose rows are verse numbers; each
   `Editorial` column is a `grid-template-rows: subgrid` item spanning all rows; verse blocks
   placed by `grid-row: <verse-number>`.
6. **Wire reference sync** across columns so they navigate together. Reuse the existing
   `scrRef`-passing pattern from the side-by-side story (`scrRef` = Scripture reference, i.e. the
   book/chapter/verse — BCV — location the editor is showing). Handle versification gaps between
   translations.

**Interim option (C):** if a working demo is needed before the upstream node lands, build the
`getElementByKey` height-sync coordinator against the existing side-by-side story. It's
throwaway code, but it proves the UX and de-risks the layout and reference-sync work.

---

## 7. What's possible vs. not (the specifics that matter)

- **Possible:** native, JavaScript-free vertical alignment of verses across N read-only
  columns — _once verses are real blocks_. Subgrid is designed for exactly this: descendants of
  sibling columns can share their ancestor's row tracks, as long as the subgrid /
  `display: contents` chain between them is unbroken.
- **Possible cheaply (relatively):** adding the variant _side by side_, because the view-mode
  and node-class seam already exists — we extend it rather than fork the editor. "Cheaply" is
  relative to forking; it is still an upstream document-model change (see §8).
- **Not possible:** aligning verses while leaving today's inline-marker model untouched — there
  is no per-verse box to place on a row. The JS height-sync fallback (C) is the only route that
  needs no upstream change, and it trades robustness for speed.
- **Not possible:** keeping exact paragraph structure _and_ one-row-per-verse when verses cross
  paragraphs. The aligned view must use verse-primary grouping (§5).
- **Not a problem (despite early worry):** iframes (not required) and editor-imposed scrolling
  (the package doesn't set it on the content chain; the host controls scrolling).

---

## 8. Cost estimate

These are **rough, order-of-magnitude estimates** for one developer at **read-only** scope —
not commitments. They assume familiarity with the `platform-editor` codebase ramps up during
the spike. A reader scoping this should re-estimate against their own team's velocity.

| Phase                                                                                                    | Rough estimate | Risk                                                                       |
| -------------------------------------------------------------------------------------------------------- | -------------- | -------------------------------------------------------------------------- |
| Spike: hand-build a block-verse node rendering in one column (no adaptor polish)                         | ~1 week        | Low — goal is just to confirm the node renders and the subgrid chain holds |
| Production block-verse node + adaptor regrouping + new view mode                                         | ~2–3 weeks     | **Medium — cross-paragraph verse grouping is the main risk**               |
| Outer subgrid layout + reference sync + versification gaps in paranext-core                              | ~1 week        | Low–medium                                                                 |
| Testing: versification edge cases, right-to-left scripts, footnotes/character styles inside verse blocks | ~1 week        | Medium — long tail of USFM edge cases                                      |

**Total: roughly 5–6 developer-weeks** for a solid read-only feature, with the cross-paragraph
grouping decision (§5) as the dominant risk. The **interim height-sync demo (C)** is roughly
3–5 days if you need to show the UX sooner.

Editing support in the aligned view is explicitly **out of scope**. It would cost substantially
more (caret and selection behavior across block-verses, node normalization) — don't let it
creep in.

---

## 9. Example prompts to hand an LLM

These assume the agent has the `platform-editor` source available. The package ships its
`src/`; in paranext-core it's at `node_modules/@eten-tech-foundation/platform-editor/src/`.

> **Note on scope of the vendored source:** the adaptor, the theme, and the editor CSS are all
> in that `src/` directory and can be inspected directly. The verse _node-class definitions_
> (`ImmutableVerseNode`, `getVerseNodeClass`) are not — they live in `platform-editor`'s
> internal `shared` / `shared-react` workspace packages, which the adaptor imports but which are
> not vendored into `node_modules/.../src/`. To verify claims about the node classes themselves,
> an agent needs the full `platform-editor` repo, not just the installed package.

**(a) Independently verify the core finding**

```
In node_modules/@eten-tech-foundation/platform-editor/src, confirm or refute: a verse is
modeled as an inline milestone-style marker (rendered as span.verse), and a verse's text lives
as flat inline siblings inside a .para block — i.e. there is no per-verse container element, a
paragraph can hold multiple verses, and a verse can span multiple paragraphs. Cite the adaptor
function that assembles paragraph children (look at usj-editor.adaptor.ts) and the theme entry
that maps the verse node to its CSS class (editor.theme.ts). Note that the verse node class
itself is imported from the "shared"/"shared-react" packages, which are not vendored here.
```

**(b) Spike the block-verse node**

```
In the platform-editor codebase, prototype a read-only "verse-primary" view mode whose
Lexical node model wraps each verse's content (the verse marker plus all text up to the next
verse marker) in a new block-level element node, instead of the current inline marker. Add it
behind a new view option (extend the existing ViewOptions / getVerseNodeClass seam) so the
existing paragraph-primary mode is unchanged. Handle the case where a verse spans multiple
paragraphs by flattening its content into a single verse block (poetry line breaks become
in-block breaks). Show the resulting DOM for a sample chapter.
```

**(c) Build the aligned grid layout (paranext-core side)**

```
Using the existing side-by-side Editorial Storybook story (paranext-core,
src/stories/platform/ten-layout-shared.tsx) as a starting point, render N read-only Editorial
instances as sibling columns in a CSS grid whose rows correspond to verse numbers. Make each column a `grid-template-rows: subgrid` item spanning all rows, and place
each verse block on `grid-row: <verse-number>`. Verify that corresponding verses align across
columns with zero JavaScript measurement. Use `display: contents` on intermediate wrapper
elements as needed to keep the subgrid chain unbroken from the outer grid down to each verse
block. (This assumes the block-verse view mode from prompt (b) exists.)
```

**(d) Interim fallback: JS height-sync, no upstream change**

```
Without modifying @eten-tech-foundation/platform-editor, build a coordinator that aligns
verses across N read-only Editorial columns. Use the editor's getElementByKey (exposed on the
editor ref) to locate each verse marker's DOM element per column, measure vertical offsets,
re-measure on changes with a ResizeObserver, and pad each verse's run so corresponding verses
share a vertical position. Note the robustness limits (font load, async render, resize) in
comments — this is a measurement-based fallback, not native layout.
```

**(e) Stress-test the hard decision**

```
Given that verses can cross paragraph boundaries and translations differ in paragraphing and
versification, argue for or against a "verse-primary" grid view that groups content by verse
(one row per verse number) versus preserving paragraph structure. Identify which Scripture
content (poetry, section headings, footnotes, verse bridges like "1-2") breaks each approach,
and recommend one for a read-only parallel-translation reader.
```
