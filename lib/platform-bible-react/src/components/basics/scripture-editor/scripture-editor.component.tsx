import { Editorial, EditorRef } from '@eten-tech-foundation/platform-editor';
import { Usj, USJ_TYPE, USJ_VERSION } from '@eten-tech-foundation/scripture-utilities';
import '@/components/basics/scripture-editor/scripture-editor.component.css';

const DEFAULT_USJ: Usj = {
  type: USJ_TYPE,
  version: USJ_VERSION,
  content: ['hello world'],
};

/** Component to render a scripture editor (or viewer) */
export function ScriptureEditor({editorRef, defaultUsj = DEFAULT_USJ}: {editorRef: React.MutableRefObject<EditorRef | null>, defaultUsj?: Usj }) {
  return (
    <div>
      <h1>Scripture Editor Component</h1>
      <p>This component is under construction.</p>
      <Editorial ref={editorRef} defaultUsj={defaultUsj} />
    </div>
  );
}

// TODO: Mock data
// Expose all parameters for the component
