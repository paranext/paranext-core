// @vitest-environment jsdom
import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { beforeAll, describe, expect, it, vi } from 'vitest';
import { Usj } from '@eten-tech-foundation/scripture-utilities';
import * as React from 'react';
import { useState } from 'react';
import { FootnotesLayout } from './platform-scripture-editor-footnotes.component';

vi.mock('@papi/frontend', () => ({
  logger: { warn: vi.fn(), debug: vi.fn(), info: vi.fn(), error: vi.fn() },
}));

// jsdom does not implement ResizeObserver; the pane's ResizablePanelGroup (react-resizable-panels)
// wires one up. A no-op stub keeps the render path from throwing.
beforeAll(() => {
  if (typeof globalThis.ResizeObserver === 'undefined') {
    const stubResizeObserver = vi.fn(() => ({
      observe: vi.fn(),
      unobserve: vi.fn(),
      disconnect: vi.fn(),
    }));
    // ResizeObserver constructor as a vi.fn factory satisfies runtime contract but not structural
    // typing; we cast through unknown to adapt it to the required type
    // eslint-disable-next-line no-type-assertion/no-type-assertion
    globalThis.ResizeObserver = stubResizeObserver as unknown as typeof ResizeObserver;
  }
});

// Real web-view state hook stand-in: plain React state keyed by name.
function useWebViewStateMock<T>(_key: string, defaultValue: T) {
  return useState<T>(defaultValue);
}

const note = (text: string) => ({
  type: 'note',
  marker: 'f',
  caller: '+',
  content: [
    { type: 'char', marker: 'fr', content: ['1:1 '] },
    { type: 'char', marker: 'ft', content: [text] },
  ],
});
const usjWithTwoNotes: Usj = {
  type: 'USJ',
  version: '3.1',
  content: [
    { type: 'book', marker: 'id', code: 'GEN', content: ['Test'] },
    { type: 'chapter', marker: 'c', number: '1' },
    {
      type: 'para',
      marker: 'p',
      content: [
        { type: 'verse', marker: 'v', number: '1' },
        'a ',
        note('alpha'),
        ' b ',
        note('beta'),
      ],
    },
  ],
};
const localizedStrings = { '%webView_footnoteList_close%': 'Close footnotes pane' };

function renderPane(overrides: Partial<React.ComponentProps<typeof FootnotesLayout>> = {}) {
  return render(
    <FootnotesLayout
      usj={usjWithTwoNotes}
      showMarkers
      useWebViewState={useWebViewStateMock}
      localizedStrings={localizedStrings}
      onClose={() => {}}
      {...overrides}
    >
      <div data-testid="editor" />
    </FootnotesLayout>,
  );
}

describe('FootnotesLayout close button', () => {
  it('renders a close button labeled from localized strings that calls onClose', () => {
    const onClose = vi.fn();
    renderPane({ onClose });
    fireEvent.click(screen.getByRole('button', { name: 'Close footnotes pane' }));
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
