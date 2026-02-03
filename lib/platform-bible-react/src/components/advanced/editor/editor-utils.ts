import { editorTheme } from '@/components/advanced/editor/themes/editor-theme';
import { createHeadlessEditor } from '@lexical/headless';
import { $generateHtmlFromNodes, $generateNodesFromDOM } from '@lexical/html';
import {
  $getRoot,
  $insertNodes,
  SerializedEditorState,
  SerializedElementNode,
  SerializedLexicalNode,
  SerializedTextNode,
} from 'lexical';
import React from 'react';
import { nodes } from './nodes';

/**
 * Focus a content-editable element within a container and move the cursor to the end
 *
 * @param container - The container element to search within
 * @returns True if a content-editable element was found and focused, false otherwise
 */
export function focusContentEditable(container: HTMLElement): boolean {
  const contentEditableField = container.querySelector<HTMLElement>('[contenteditable="true"]');
  if (!contentEditableField) return false;

  contentEditableField.focus();

  // Move cursor to the end
  const selection = window.getSelection();
  const range = document.createRange();
  range.selectNodeContents(contentEditableField);
  range.collapse(false); // false = collapse to end
  selection?.removeAllRanges();
  selection?.addRange(range);

  return true;
}

/**
 * Recursively check if any children have meaningful editor content
 *
 * @param children - Array of serialized lexical nodes to check
 * @returns True if any child has content, false otherwise
 */
function doChildrenHaveEditorContent(
  children: (SerializedLexicalNode | SerializedElementNode | SerializedTextNode)[] | undefined,
): boolean {
  if (!children) return false;

  return children.some(
    (child: SerializedLexicalNode | SerializedElementNode | SerializedTextNode) => {
      if (child && 'text' in child && child.text.trim().length > 0) return true;

      if (!child || !('children' in child)) return false;

      return doChildrenHaveEditorContent(child.children);
    },
  );
}

/**
 * Check if the editor state has any meaningful content
 *
 * @param editorState - SerializedEditorState to check
 * @returns True if the editor has content, false if it's empty
 */
export function hasEditorContent(editorState: SerializedEditorState | undefined): boolean {
  if (!editorState?.root?.children) return false;
  return doChildrenHaveEditorContent(editorState.root.children);
}

/**
 * Convert HTML string to Lexical SerializedEditorState
 *
 * @param html - HTML string to convert
 * @returns SerializedEditorState that can be used with the Editor component
 */
export function htmlToEditorState(html: string): SerializedEditorState {
  if (!html || html.trim() === '') {
    throw new Error('Input HTML is empty');
  }

  const editor = createHeadlessEditor({
    namespace: 'EditorUtils',
    theme: editorTheme,
    nodes,
    onError: (error: Error) => {
      console.error(error);
    },
  });

  let serializedState: SerializedEditorState | undefined;

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
  const editor = createHeadlessEditor({
    namespace: 'EditorUtils',
    theme: editorTheme,
    nodes,
    onError: (error: Error) => {
      console.error(error);
    },
  });

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
    // Remove all class attributes (including Tailwind classes)
    .replace(/\s+class="[^"]*"/g, '')
    // Remove empty spans
    .replace(/<span>(.*?)<\/span>/g, '$1')
    // Simplify nested bold tags (e.g., <b><strong>text</strong></b> -> <b>text</b>)
    .replace(/<b><strong[^>]*>(.*?)<\/strong><\/b>/g, '<b>$1</b>')
    .replace(/<strong><b[^>]*>(.*?)<\/b><\/strong>/g, '<b>$1</b>')
    // Simplify nested italic tags (e.g., <i><em>text</em></i> -> <i>text</i>)
    .replace(/<i><em[^>]*>(.*?)<\/em><\/i>/g, '<i>$1</i>')
    .replace(/<em><i[^>]*>(.*?)<\/i><\/em>/g, '<i>$1</i>')
    // Simplify nested underline tags (e.g., <u><span>text</span></u> -> <u>text</u>)
    .replace(/<u><span[^>]*>(.*?)<\/span><\/u>/g, '<u>$1</u>')
    // Simplify nested strikethrough tags (e.g., <s><span>text</span></s> -> <s>text</s>)
    .replace(/<s><span[^>]*>(.*?)<\/span><\/s>/g, '<s>$1</s>')
    // Convert all <br> variants to XML-compatible <br/> for Paratext
    .replace(/<br\s*\/?>/gi, '<br/>');

  return html;
}

/**
 * Handle keyboard events for editor navigation to prevent parent listbox from intercepting
 * navigation keys. This should be used on a container wrapping the Editor component.
 *
 * @param event - The keyboard event
 * @returns True if the event was handled (and should be stopped from propagating), false otherwise
 */
export function handleEditorKeyNavigation(event: React.KeyboardEvent<HTMLElement>): boolean {
  // Keys that should be kept within the editor for navigation
  const navigationKeys = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Home', 'End'];

  if (navigationKeys.includes(event.key)) {
    event.stopPropagation();
    return true;
  }

  return false;
}
