# Paratext Training Manual (Scraped)

This directory contains the Paratext Training Manual scraped from [manual.paratext.org](https://manual.paratext.org) 
in AI-readable Markdown format.

## Directory Structure

```
manual/
├── chapters/          # 25 chapter markdown files
├── stages/            # 6 stage overview files
├── appendices/        # 3 appendix files
├── admin/             # Administrator's manual (9 chapters)
├── images/            # Downloaded screenshots and diagrams
├── index.md           # Index of manual chapters
├── videos.md          # Video link compilation
└── README.md          # This file
```

## For AI Agents

### Quick Navigation

1. **Start with `index.md`** - Contains structured index of all content with sections
2. **Read specific chapters** - Files in `chapters/` are chunked by chapter
3. **Check `videos.md`** - For any video training content
4. **Administrator topics** - Files in `admin/` for project setup and management

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
