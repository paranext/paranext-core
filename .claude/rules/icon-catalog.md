## Keep the Icon Catalog Current

Platform.Bible documents every icon shown anywhere in the application — the renderer, bundled
extensions, and the `platform-bible-react` component library — in ONE hand-curated catalog:

- **Single source of truth** → `src/stories/icon-catalog/icon-usage.data.ts`

It is rendered by the `IconCatalog` component on the core Storybook's **Reference → Icons** page
(`src/stories/icon-catalog.mdx`), which opens with the conflicts the catalog contains.

### Before you pick an icon

Look it up on that page. Reuse the icon the app already draws for the meaning you need, and do not
pick an icon that already means something else.

- **No Tabler icons.** Use `lucide-react` only; do not add an `@tabler/icons-react` import, and when
  you touch one, replace it with the lucide equivalent (lucide `X` for close, `Check` for selected).
- **Never `Check` or `ArrowUp` for submit.** A checkmark means checked or selected; `ArrowUp` is for
  sorting. The submit icon is still to be chosen by UX.

### Decided icons

The UX lead's decisions are listed in the page's **UX decisions** section
(`src/stories/icon-catalog.mdx`) and stated in each decided note in `ICON_CONFLICT_NOTES`
(`decided: true`). Follow them over the icon the code uses today:

| Meaning                    | Use                                  | Not                                |
| -------------------------- | ------------------------------------ | ---------------------------------- |
| Bible texts panel          | `BookOpen` (as for resources)        | `Book`                             |
| Checks                     | `CircleCheck`                        | `CircleCheckBig`, `ClipboardCheck` |
| Commentaries panel         | `BookMarked`                         | `FileText`                         |
| Edit                       | `Pen`                                | `Pencil`                           |
| Error / warning            | `CircleAlert` / `TriangleAlert`      | `Info`, tabler alert icons         |
| Import                     | `Import`                             | `FolderInput`, `Download`          |
| Back                       | `ArrowLeft`                          | `ArrowUp`                          |
| Opens outside the app      | `ExternalLink`                       | `Link`                             |
| Undo / redo                | `Undo2` / `Redo2`                    | `Undo`, `Redo`                     |
| Sorting                    | `ArrowUp` / `ArrowDown`              | `ChevronUp`, `ChevronDown`         |
| Book names                 | to be chosen by UX                   | `BookA` (the dictionary icon)      |
| Get Resources              | `Download`                           | `BookOpen`                         |
| Language                   | `Languages`                          | `Globe`                            |
| Search                     | `Search`                             | `TextSearch`, tabler `IconSearch`  |

When the UX lead decides another conflict, add it to that section and mark its note `decided: true`
with a recommendation that starts with "Decided:".

### The rule

Whenever you **add, change, move or remove** an icon — a `lucide-react` or `@tabler/icons-react`
import that renders a glyph, or a lucide name in a menu (`iconNameBefore` / `iconNameAfter`) or a web
view (`iconName`) — update `ICON_CATALOG` in the same change:

- Each usage names its repo-relative `location`, a short `meaning`, and a `concept` from
  `ICON_CONCEPTS` (`icon-usage.model.ts`). Reuse an existing concept when the meaning is the same —
  that is what lets the catalog see two icons drawn for one thing. Add a concept only when none fits.
- An import under an alias (`AlertCircle` for `CircleAlert`) goes in the entry's `importedAs`; the
  entry's `name` is lucide's canonical name (its `displayName`).
- Mark a right-to-left or other-side twin `isMirrored`, so the pair is not reported as a conflict.

If the change creates or removes a conflict, add or remove its note in `ICON_CONFLICT_NOTES` with a
severity (`fix`, `review`, `acceptable`) and a recommendation. Fixing a `fix` conflict is better than
adding a note for a new one.

### Enforcement

`src/stories/icon-catalog/icon-usage.data.test.ts` fails when a shipped file imports or names an icon
the catalog does not list at that location, when a listed location no longer shows its icon, and
when the conflict notes do not match the conflicts the catalog contains. Its name scan finds menu
JSON values and quoted registered names that contain a hyphen or sit on a line mentioning "icon"; it
misses a one-word name passed positionally on a line of its own, or a name built by concatenation —
catalog those by hand.
