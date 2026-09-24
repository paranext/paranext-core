import { DocsPage, useOf } from '@storybook/addon-docs/blocks';

function FilePath() {
  // `parameters.fileName` is set automatically by Storybook's preview store to the story's
  // import path (e.g. "./src/renderer/components/overlays/overlay-popover.stories.tsx"). No build
  // step or per-story configuration is required.
  const resolved = useOf('meta');
  if (resolved.type !== 'meta') return undefined;
  const { fileName } = resolved.preparedMeta.parameters;
  if (typeof fileName !== 'string') return undefined;

  return (
    <code
      style={{
        display: 'block',
        margin: '0 0 1rem',
        fontSize: '0.8rem',
        opacity: 0.6,
      }}
    >
      {fileName}
    </code>
  );
}

/** Default autodocs template with the story's source file path shown at the top. */
export function DocsPageWithFilePath() {
  return (
    <>
      <FilePath />
      <DocsPage />
    </>
  );
}
