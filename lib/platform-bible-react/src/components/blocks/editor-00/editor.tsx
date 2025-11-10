'use client';

import { InitialConfigType, LexicalComposer } from '@lexical/react/LexicalComposer';
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin';
import { EditorState, SerializedEditorState } from 'lexical';

import { editorTheme } from '@/components/editor/themes/editor-theme';
import { TooltipProvider } from '@/components/shadcn-ui/tooltip';

import { nodes } from './nodes';
import { Plugins } from './plugins';

const editorConfig: InitialConfigType = {
  namespace: 'Editor',
  theme: editorTheme,
  nodes,
  onError: (error: Error) => {
    console.error(error);
  },
};

export function Editor({
  editorState,
  editorSerializedState,
  onChange,
  onSerializedChange,
  placeholder = 'Start typing ...',
  autoFocus = false,
}: {
  editorState?: EditorState;
  editorSerializedState?: SerializedEditorState;
  onChange?: (editorState: EditorState) => void;
  onSerializedChange?: (editorSerializedState: SerializedEditorState) => void;
  placeholder?: string;
  autoFocus?: boolean;
}) {
  return (
    <div className="pr-twp tw-overflow-hidden tw-rounded-lg tw-border tw-bg-background tw-shadow">
      <LexicalComposer
        initialConfig={{
          ...editorConfig,
          ...(editorState ? { editorState } : {}),
          ...(editorSerializedState ? { editorState: JSON.stringify(editorSerializedState) } : {}),
        }}
      >
        <TooltipProvider>
          <Plugins placeholder={placeholder} autoFocus={autoFocus} />

          <OnChangePlugin
            ignoreSelectionChange
            onChange={(latestEditorState) => {
              onChange?.(latestEditorState);
              onSerializedChange?.(latestEditorState.toJSON());
            }}
          />
        </TooltipProvider>
      </LexicalComposer>
    </div>
  );
}
