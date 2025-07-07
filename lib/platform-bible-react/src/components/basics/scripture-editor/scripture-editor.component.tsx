import { Editorial } from '@eten-tech-foundation/platform-editor';
import { Usj, USJ_TYPE, USJ_VERSION } from '@eten-tech-foundation/scripture-utilities';
import '@/components/basics/scripture-editor/scripture-editor.component.css';

const defaultUsj:Usj = {
  type: USJ_TYPE,
  version: USJ_VERSION,
  content: ["hello world"],
}

/**
 * Component to render a scripture editor (or viewer)
 */
export function ScriptureEditor() {
  return (
    <div>
      <h1>Scripture Editor Component</h1>
      <p>This component is under construction.</p>
      <Editorial defaultUsj={defaultUsj} />
    </div>
  );
}
