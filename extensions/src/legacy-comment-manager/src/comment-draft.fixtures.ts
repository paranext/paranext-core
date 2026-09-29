/** Shared test fixtures for comment-draft test suites. */
import type {
  SerializedEditorState,
  SerializedElementNode,
  SerializedParagraphNode,
  SerializedTextNode,
} from 'lexical';

/**
 * Builds a minimal, valid `SerializedEditorState` containing a single paragraph of `text`. A draft
 * test only ever stores and compares this value as an opaque blob, so its exact shape doesn't
 * matter, but `CommentDraft.editorState`/`commentEdits` values are typed as
 * `SerializedEditorState`, not a string, and a fixture that lies about its shape is the same
 * problem in miniature as a type that lies about its values. Typed the same way
 * `comment-thread.component.test.tsx` (in `platform-bible-react`) types its own fixture: the base
 * `SerializedEditorState` widens each node to `SerializedLexicalNode`, which has no `children`, so
 * a paragraph/text literal needs the narrower element-node type parameter to typecheck.
 */
export function makeEditorState(
  text: string,
): SerializedEditorState<SerializedParagraphNode & SerializedElementNode<SerializedTextNode>> {
  return {
    root: {
      children: [
        {
          children: [
            {
              detail: 0,
              format: 0,
              mode: 'normal',
              style: '',
              text,
              type: 'text',
              version: 1,
            },
          ],
          direction: 'ltr',
          format: '',
          indent: 0,
          type: 'paragraph',
          version: 1,
          textFormat: 0,
          textStyle: '',
        },
      ],
      direction: 'ltr',
      format: '',
      indent: 0,
      type: 'root',
      version: 1,
    },
  };
}
