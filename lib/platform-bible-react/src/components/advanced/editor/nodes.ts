/**
 * This file was automatically generated on installation of the Shadcn/Lexical editor. The default
 * location of this file has been changed to integrate better with our project structure.
 *
 * Original file location: src/components/blocks/editor-00/nodes.ts
 *
 * Shadcn/Lexical Editor Documentation: https://shadcn-editor.vercel.app/docs/
 */

import { HeadingNode, QuoteNode } from '@lexical/rich-text';
import { Klass, LexicalNode, LexicalNodeReplacement, ParagraphNode, TextNode } from 'lexical';

export const nodes: ReadonlyArray<Klass<LexicalNode> | LexicalNodeReplacement> = [
  HeadingNode,
  ParagraphNode,
  TextNode,
  QuoteNode,
];
