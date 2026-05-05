// @vitest-environment jsdom
// FootnoteList exposes ARIA roles (role="listbox" + role="option" on each li); we query by those
// rather than the implicit "listitem" role - the wrapping <li> is overridden by role="option".
import { describe, it, expect, vi, beforeAll } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import type { Usj } from '@eten-tech-foundation/scripture-utilities';
import type { UseWebViewStateHook } from '@papi/core';
import { EnhancedResourceFootnotesPane } from './footnotes-pane.component';

// jsdom does not implement ResizeObserver; the component installs one via a ref callback so a
// no-op stub is enough to keep the render path from throwing. ResizablePanelGroup also queries
// it internally. We build the constructor with vi.fn() returning a plain object so we don't
// hit the @typescript-eslint/class-methods-use-this warning that real class methods would.
beforeAll(() => {
  if (typeof globalThis.ResizeObserver === 'undefined') {
    const stubResizeObserver = vi.fn(() => ({
      observe: vi.fn(),
      unobserve: vi.fn(),
      disconnect: vi.fn(),
    }));
    // The DOM lib types ResizeObserver as a constructor with required browser-only fields
    // (notably the `prototype` shape). A vi.fn factory satisfies the runtime contract but
    // not the structural typing, so a cast through `unknown` is the correct shape adapter.
    // eslint-disable-next-line no-type-assertion/no-type-assertion
    globalThis.ResizeObserver = stubResizeObserver as unknown as typeof ResizeObserver;
  }
});

// Minimal USJ with a single note for smoke-testing the rendering path.
const SAMPLE_USJ: Usj = {
  type: 'USJ',
  version: '0.2.1',
  content: [
    { type: 'chapter', marker: 'c', number: '1' },
    { type: 'verse', marker: 'v', number: '1' },
    'In the beginning God created the heavens and the earth.',
    {
      type: 'note',
      marker: 'f',
      caller: '+',
      content: [
        { type: 'char', marker: 'fr', content: ['1.1 '] },
        { type: 'char', marker: 'ft', content: ['Or "the earth was a vast wasteland".'] },
      ],
    },
  ],
};

// Stand-in for UseWebViewStateHook that matches the real 3-tuple shape so it satisfies the
// component's prop type without an `any` assertion. The setter and resetter are vi.fn() spies
// so individual tests could assert on them if needed.
const mockUseWebViewState: UseWebViewStateHook = <T,>(_key: string, defaultValue: T) => [
  defaultValue,
  vi.fn<(value: T) => void>(),
  vi.fn<() => void>(),
];

describe('EnhancedResourceFootnotesPane', () => {
  it('renders all notes from the USJ via FootnoteList when visible', () => {
    render(
      <EnhancedResourceFootnotesPane
        usj={SAMPLE_USJ}
        isVisible
        useWebViewState={mockUseWebViewState}
      >
        <div>scripture pane child</div>
      </EnhancedResourceFootnotesPane>,
    );
    // FootnoteList renders each note as a <li role="option"> inside a role="listbox" container.
    expect(screen.getAllByRole('option').length).toBeGreaterThan(0);
  });

  it('hides the footnote list when isVisible=false (children still render)', () => {
    render(
      <EnhancedResourceFootnotesPane
        usj={SAMPLE_USJ}
        isVisible={false}
        useWebViewState={mockUseWebViewState}
      >
        <div data-testid="children">scripture pane child</div>
      </EnhancedResourceFootnotesPane>,
    );
    expect(screen.queryAllByRole('option')).toHaveLength(0);
    expect(screen.getByTestId('children')).toBeTruthy();
  });
});
