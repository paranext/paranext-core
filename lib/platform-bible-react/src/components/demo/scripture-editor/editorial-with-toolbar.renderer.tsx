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
  // eslint-disable-next-line no-null/no-null, react-hooks/rules-of-hooks
  const editorRef = useRef<EditorRef | null>(null);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [scrRef, setScrRef] = useState(initialScrRef);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [canUndo, setCanUndo] = useState(false);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [canRedo, setCanRedo] = useState(false);
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
        onStateChange={(newCanUndo, newCanRedo, newBlockMarker) => {
          setCanUndo(newCanUndo);
          setCanRedo(newCanRedo);
          setBlockMarker(newBlockMarker);
        }}
      />
    </CanvasWithDescription>
  );
}
