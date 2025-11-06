import { createEditor, SerializedEditorState } from 'lexical';
import { $generateHtmlFromNodes, $generateNodesFromDOM } from '@lexical/html';
import { $getRoot, $insertNodes } from 'lexical';
import { editorTheme } from '@/components/editor/themes/editor-theme';
import { nodes } from './nodes';

/**
 * Convert HTML string to Lexical SerializedEditorState
 *
 * @param html - HTML string to convert
 * @returns SerializedEditorState that can be used with the Editor component
 */
export function htmlToEditorState(html: string): SerializedEditorState {
  const editor = createEditor({
    namespace: 'EditorUtils',
    theme: editorTheme,
    nodes,
    onError: (error: Error) => {
      console.error(error);
    },
  });

  let serializedState: SerializedEditorState | null = null;

  editor.update(
    () => {
      const parser = new DOMParser();
      const dom = parser.parseFromString(html, 'text/html');
      const generatedNodes = $generateNodesFromDOM(editor, dom);

      $getRoot().clear();
      $insertNodes(generatedNodes);
    },
    {
      discrete: true,
    },
  );

  editor.getEditorState().read(() => {
    serializedState = editor.getEditorState().toJSON();
  });

  if (!serializedState) {
    throw new Error('Failed to convert HTML to editor state');
  }

  return serializedState;
}

/**
 * Convert Lexical SerializedEditorState to HTML string
 *
 * @param editorState - SerializedEditorState to convert
 * @returns HTML string
 */
export function editorStateToHtml(editorState: SerializedEditorState): string {
  const editor = createEditor({
    namespace: 'EditorUtils',
    theme: editorTheme,
    nodes,
    onError: (error: Error) => {
      console.error(error);
    },
  });

  const initialEditorState = editor.parseEditorState(JSON.stringify(editorState));
  editor.setEditorState(initialEditorState);

  let html = '';

  editor.getEditorState().read(() => {
    html = $generateHtmlFromNodes(editor);
  });

  // Clean up the HTML to remove Lexical-specific attributes and simplify structure
  html = html
    // Remove class attributes
    .replace(/\s+class="[^"]*"/g, '')
    // Remove style attributes
    .replace(/\s+style="[^"]*"/g, '')
    // Remove empty spans
    .replace(/<span>(.*?)<\/span>/g, '$1')
    // Simplify nested formatting tags (e.g., <b><strong>text</strong></b> -> <b>text</b>)
    .replace(/<b><strong>(.*?)<\/strong><\/b>/g, '<b>$1</b>')
    .replace(/<i><em>(.*?)<\/em><\/i>/g, '<i>$1</i>')
    .replace(/<u><span>(.*?)<\/span><\/u>/g, '<u>$1</u>')
    .replace(/<s><span>(.*?)<\/span><\/s>/g, '<s>$1</s>');

  return html;
}
