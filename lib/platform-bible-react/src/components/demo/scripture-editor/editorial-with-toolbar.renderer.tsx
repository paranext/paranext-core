import { Editorial, EditorRef } from '@eten-tech-foundation/platform-editor';
import { SerializedVerseRef } from '@sillsdev/scripture';
import { useRef, useState } from 'react';
import { CanvasWithDescription } from '@/components/demo/scripture-editor/canvas-with-description.component';
import { PlatformToolbar } from '@/components/demo/scripture-editor/PlatformToolbar';

/**
 * Render function that combines the Editorial component with a PlatformToolbar. This provides a
 * complete editing experience with undo/redo, navigation, and other toolbar features.
 *
 * Use this as a render function in a Storybook story, not as a component.
 */
export function renderEditorialWithToolbar(
  args: Parameters<typeof Editorial>[0],
  context: {
    viewMode: string;
    parameters?: { docs?: { description?: { story?: string } }; description?: string };
  },
  initialScrRef: SerializedVerseRef,
) {
  // This is a Storybook render function, not a React component; hooks are valid here but ESLint
  // cannot detect that, so rules-of-hooks must be disabled for each hook call
  // eslint-disable-next-line no-null/no-null, react-hooks/rules-of-hooks
  const editorRef = useRef<EditorRef | null>(null);
  // Render function (not a component) - hooks are valid but ESLint cannot detect it
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [scrRef, setScrRef] = useState(initialScrRef);
  // Render function (not a component) - hooks are valid but ESLint cannot detect it
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [canUndo, setCanUndo] = useState(false);
  // Render function (not a component) - hooks are valid but ESLint cannot detect it
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [canRedo, setCanRedo] = useState(false);
  // Render function (not a component) - hooks are valid but ESLint cannot detect it
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [blockMarker, setBlockMarker] = useState<string | undefined>();

  return (
    <CanvasWithDescription
      viewMode={context.viewMode}
      description={context.parameters?.docs?.description?.story ?? context.parameters?.description}
    >
      <PlatformToolbar
        editorRef={editorRef}
        scrRef={scrRef}
        onScrRefChange={setScrRef}
        isReadonly={false}
        canUndo={canUndo}
        canRedo={canRedo}
        blockMarker={blockMarker}
      />
      <Editorial
        {...args}
        ref={editorRef}
        scrRef={scrRef}
        onScrRefChange={setScrRef}
        onStateChange={({
          canUndo: nextCanUndo,
          canRedo: nextCanRedo,
          blockMarker: nextBlockMarker,
        }) => {
          setCanUndo(nextCanUndo);
          setCanRedo(nextCanRedo);
          setBlockMarker(nextBlockMarker);
        }}
      />
    </CanvasWithDescription>
  );
}
