---
paths:
  - "**/*.mdx"
  - "**/*.stories.tsx"
  - "**/*.stories.ts"
---

## Linking Between Storybook Pages

**Do NOT use relative Markdown file links** (`./other.mdx`, `./other.mdx#anchor`) to link
between docs pages. They resolve only in GitHub's source view, not in the built Storybook
(which serves SPA routes like `?path=/docs/…`, not the source file tree). Use one of
Storybook's supported mechanisms instead:

- **`<LinkTo>`** (from `@storybook/addon-links`, registered in `.storybook/main.ts`) — the
  official component for navigating to another story or docs page from MDX. Import the
  default export and pass the target page's `title`:

  ```mdx
  import LinkTo from '@storybook/addon-links/react';

  <LinkTo title="Guidelines/Applying Changes">Applying Changes</LinkTo>
  ```

  Preferred for page-to-page navigation. `<LinkTo>` targets a page (optionally a `story`/`name`);
  it does not take a heading anchor.

- **`?path=` deep link** — a plain Markdown link to the docs route, and the only supported way
  to target a **heading** on another page:

  ```mdx
  [Applying Changes](?path=/docs/guidelines-applying-changes--docs#microcopy)
  ```

### Deriving the id

The page id is the `<Meta title>` lowercased with **every space and `/` replaced by `-`**
(collapsing repeats): `Guidelines/Applying Changes` → `guidelines-applying-changes`. An
autodocs page's id is `<id>--docs`. Heading slugs are GitHub-style (lowercase, spaces → `-`,
punctuation stripped), e.g. `## Microcopy` → `#microcopy`. Note: heading anchors are ignored
on Canvas/story views that use Controls.

### Provenance

- `?path=/docs/<id>` and `?path=/docs/<id>#anchor` forms — Storybook MDX docs:
  <https://github.com/storybookjs/storybook/blob/next/docs/writing-docs/mdx.mdx>
- `<LinkTo>` component — `@storybook/addon-links` (`@storybook/addon-links/react`, default export).
- Id normalization — CSF `sanitize`/`toId`:
  <https://github.com/ComponentDriven/csf/blob/next/src/index.ts>
- Heading slugs — rehype-slug / github-slugger.
