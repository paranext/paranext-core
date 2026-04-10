// Remark configuration for MDX files in src/stories/.
// Runs via `format:core: remark "./src/**/*.mdx" -o`
// Mirrored by lib/platform-bible-react/.remarkrc.mjs

const config = {
  plugins: [
    // Parse and serialize MDX syntax (JSX, imports, exports in markdown)
    'remark-mdx',
    // GitHub Flavored Markdown: tables, strikethrough, task lists
    'remark-gfm',
  ],
  settings: {
    // Use - for unordered list bullets (consistent with lib config)
    bullet: '-',
    // Use --- for thematic breaks (consistent with lib config)
    rule: '-',
  },
};

export default config;
