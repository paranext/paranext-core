// @vitest-environment jsdom
// jsdom, not this package's default node environment: the anchor is looked up in a real DOM.

import { describe, expect, it } from 'vitest';
import { PendingCommentSteps, startPendingComment } from './start-pending-comment.util';

/** Steps that record the order they ran in, and the container the popover was anchored to */
function recordingSteps() {
  const ran: string[] = [];
  let anchoredTo: HTMLElement | undefined;
  const steps: PendingCommentSteps = {
    recordPendingRange: () => ran.push('record range'),
    highlightPendingRange: () => ran.push('highlight range'),
    anchorPopover: (editorContainer) => {
      ran.push('anchor popover');
      anchoredTo = editorContainer;
    },
    openCommentEditor: () => ran.push('open editor'),
  };
  return { steps, ran, anchoredTo: () => anchoredTo };
}

describe('startPendingComment', () => {
  it('records and highlights the range, then anchors the popover in the rendered text and opens it', () => {
    const root = document.createElement('div');
    const renderedText = document.createElement('div');
    renderedText.className = 'usfm';
    root.appendChild(renderedText);
    const { steps, ran, anchoredTo } = recordingSteps();

    expect(startPendingComment(root, steps)).toBe(true);

    expect(ran).toEqual(['record range', 'highlight range', 'anchor popover', 'open editor']);
    expect(anchoredTo()).toBe(renderedText);
  });

  it('does nothing at all when the book has no rendered text to anchor the popover to', () => {
    // No range recorded and no highlight set, not just no popover: only the popover's cancel and
    // save handlers clear those, so either would be stranded.
    const root = document.createElement('div');
    root.appendChild(document.createElement('p'));
    const { steps, ran } = recordingSteps();

    expect(startPendingComment(root, steps)).toBe(false);

    expect(ran).toEqual([]);
  });
});
