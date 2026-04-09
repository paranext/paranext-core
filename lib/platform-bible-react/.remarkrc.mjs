// Remark configuration for MDX files in lib/platform-bible-react.
// Mirrors root .remarkrc.mjs which covers src/stories/*.mdx.

const config = {
  plugins: [
    // Parse and serialize MDX syntax (JSX, imports, exports in markdown)
    'remark-mdx',
    // GitHub Flavored Markdown: tables, strikethrough, task lists
    'remark-gfm',
  ],
  settings: {
    // Use - for unordered list bullets (consistent with root config)
    bullet: '-',
    // Use --- for thematic breaks (consistent with root config)
    rule: '-',
  },
};

export default config;
