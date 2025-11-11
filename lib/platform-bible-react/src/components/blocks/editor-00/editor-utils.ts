import { $generateHtmlFromNodes, $generateNodesFromDOM } from '@lexical/html';
import { $getRoot, $insertNodes, createEditor, SerializedEditorState } from 'lexical';

/**
 * Check if the editor state has any meaningful content
 *
 * @param editorState - SerializedEditorState to check
 * @returns True if the editor has content, false if it's empty
 */
export function hasEditorContent(editorState: SerializedEditorState | undefined): boolean {
  if (!editorState) return false;

  const editor = createEditor();

  const parsedEditorState = editor.parseEditorState(JSON.stringify(editorState));
  editor.setEditorState(parsedEditorState);

  let hasContent = false;

  editor.getEditorState().read(() => {
    const root = $getRoot();
    const textContent = root.getTextContent().trim();
    hasContent = textContent.length > 0;
  });

  return hasContent;
}

/**
 * Convert Paratext specific HTML string to Lexical SerializedEditorState
 *
 * @param html - HTML string to convert
 * @returns SerializedEditorState that can be used with the Editor component
 */
export function htmlToEditorState(html: string): SerializedEditorState {
  if (!html || html.trim() === '') {
    throw new Error('Input HTML is empty');
  }

  // Clean up the HTML to replace PT9-specific attributes and simplify structure
  const cleanHtml = html
    // Replace `<strikethrough>` with `<s>`
    .replace(/<strikethrough>([\s\S]*?)<\/strikethrough>/gi, '<s>$1</s>')
    // Remove `<color>` tags but keep their content
    // TODO: This needs to be revisited when we know how we want to handle the <color> tag
    .replace(/<color[^>]*>([\s\S]*?)<\/color>/gi, '$1')
    // Remove `<language>` tags but keep their content
    // TODO: This needs to be revisited when we know how we want to handle the <language> tag
    .replace(/<language[^>]*>([\s\S]*?)<\/language>/gi, '$1');

  const editor = createEditor();

  let serializedState: SerializedEditorState | undefined;

  editor.update(
    () => {
      const parser = new DOMParser();
      const dom = parser.parseFromString(cleanHtml, 'text/html');
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
  const editor = createEditor();

  const parsedEditorState = editor.parseEditorState(JSON.stringify(editorState));
  editor.setEditorState(parsedEditorState);

  let html = '';

  editor.getEditorState().read(() => {
    html = $generateHtmlFromNodes(editor);
  });

  // Clean up the HTML to remove Shadcn/Lexical-specific attributes and simplify structure
  html = html
    // Remove style attributes
    .replace(/\s+style="[^"]*"/g, '')
    // Remove empty spans
    .replace(/<span>(.*?)<\/span>/g, '$1')
    // Simplify nested formatting tags (e.g., <b><strong>text</strong></b> -> <b>text</b>)
    .replace(/<b><strong>(.*?)<\/strong><\/b>/g, '<b>$1</b>');

  return html;
}
