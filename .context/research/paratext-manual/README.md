# Paratext Training Manual (bundled text)

This directory contains the text of the Paratext Training Manual in AI-readable Markdown.

## Provenance & license

- **Source**: the manual's content is maintained at
  [github.com/sillsdev/paratext-manual](https://github.com/sillsdev/paratext-manual) (published
  at [manual.paratext.org](https://manual.paratext.org)) and is **MIT licensed** — see
  [`LICENSE-upstream.txt`](LICENSE-upstream.txt) (© SIL LSDev), which covers the manual content
  in this directory.
- This copy was derived from manual.paratext.org (January 2026 scrape; per-file `source_url` and
  `scraped_date` frontmatter identify each page) and lightly normalized for agent use.
- **Screenshots are not bundled.** Image embeds are replaced with `*[image: … — see the
  upstream manual]*` notes; consult the `source_url` page for the figures.

## Directory Structure

```
paratext-manual/
├── chapters/            # 25 chapter markdown files
├── stages/              # 6 stage overview files
├── appendices/          # 3 appendix files
├── admin/               # Administrator's manual (10 files)
├── index.md             # Index of all content (chapters, stages, appendices, admin)
├── videos.md            # Video links appearing in the bundled files (regenerated from corpus)
├── LICENSE-upstream.txt # Upstream MIT license
└── README.md            # This file
```

## For AI Agents

### Quick Navigation

1. **Start with `index.md`** — indexes every file: chapters, stage overviews, appendices, and
   the administrator's manual
2. **Read specific chapters** — files in `chapters/` are chunked by chapter
3. **Check `videos.md`** — links to video training content found in the bundled files
4. **Administrator topics** — files in `admin/` for project setup and management

### File Format

Each markdown file includes YAML frontmatter with:
- `title` - Page title
- `source_url` - Original URL for verification
- `scraped_date` - When the content was captured
- `chapter` / `stage` - Organizational metadata (where applicable)

### Content Markers

- 💡 **Tip** - Helpful suggestions
- ⚠️ **Warning** - Important cautions
- ℹ️ **Note** - Additional information
- 🎬 **Video** - Link to training video
