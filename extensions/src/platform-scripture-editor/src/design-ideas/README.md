# Design Ideas (platform-scripture-editor)

Stories in this folder are **design idea explorations** for the platform-scripture-editor. They are not wired into the running extension — they exist only to evaluate UX/design ideas in Storybook.

If a design here is approved, productionizing it is a separate effort.

## Why this folder exists

Sometimes the easiest way to evaluate a UI idea is to see it on screen with realistic data. A trial-balloon implementation in the live extension (e.g. PR #2153) merges code we may not want to keep. A "design ideas" Storybook story lets reviewers play with the same visual outcome without taking on production code.

## Conventions

- One concept per `*.stories.tsx` file.
- Story `Meta.title` starts with `Design Ideas / Scripture Editor / …`.
- Stories use **only** pre-existing public APIs of `@eten-tech-foundation/platform-editor`, `platform-bible-react`, and `platform-bible-utils`. If a design requires new public API, that is itself a design discussion to have _before_ merging the productionizing change.
- Any workaround needed because the desired API doesn't exist yet is documented with an inline `NOTE:` comment in the story file.
- Story file path follows PR [#2321](https://github.com/paranext/paranext-core/pull/2321)'s convention: stories live inside the owning extension folder.

## Current ideas

| File                                                                                                     | Concept                                                                                              | Origin                                                          |
| -------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------- | --------------------------------------------------------------- |
| [`scripture-editor-with-footnotes-pane.stories.tsx`](./scripture-editor-with-footnotes-pane.stories.tsx) | Footnote editor embedded inline inside the footnotes pane of the scripture editor (row-swap on edit) | PR [#2153](https://github.com/paranext/paranext-core/pull/2153) |
