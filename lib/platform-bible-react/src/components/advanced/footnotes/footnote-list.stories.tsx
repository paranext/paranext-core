import { useEffect, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, waitFor, within } from 'storybook/test';
import { MarkerObject } from '@eten-tech-foundation/scripture-utilities';
import { FootnoteList } from '@/components/advanced/footnotes/footnote-list.component';
import { getFormatCallerFunction } from 'platform-bible-utils';
import '@/components/demo/scripture-editor/usj-nodes.css';
import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from '@/components/shadcn-ui/resizable';
import { usjFootnotes } from './footnotes.usj.data';

const meta: Meta<typeof FootnoteList> = {
  title: 'Advanced/FootnoteList',
  component: FootnoteList,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className="tw:h-[300px] tw:overflow-hidden tw:border tw:border-slate-300 tw:p-4">
        <Story />
      </div>
    ),
  ],
  argTypes: {
    layout: {
      control: { type: 'radio' },
      options: ['horizontal', 'vertical'],
    },
  },
};
export default meta;

type Story = StoryObj<typeof FootnoteList>;

// Shared template with selection state
function Template({ footnotes = [], listId = 'default-list-id', ...restArgs }: Story['args'] = {}) {
  const [selectedFootnote, setSelectedFootnote] = useState<MarkerObject | undefined>();

  return (
    <FootnoteList
      {...restArgs}
      footnotes={footnotes}
      listId={listId}
      selectedFootnote={selectedFootnote}
      onFootnoteSelected={(footnote) => setSelectedFootnote(footnote)}
    />
  );
}

// Shared template with resizable panels and stubbed in Scripture.
function ScripturePanelTemplate({
  footnotes = [],
  listId = 'default-list-id',
  showMarkers,
  ...restArgs
}: Story['args'] = {}) {
  const [selectedFootnote, setSelectedFootnote] = useState<MarkerObject | undefined>();

  return (
    <ResizablePanelGroup
      direction={restArgs.layout === 'horizontal' ? 'vertical' : 'horizontal'}
      className="tw:h-full tw:min-h-0 tw:w-full"
    >
      <ResizablePanel className="tw:flex tw:min-h-0 tw:flex-col">
        <div className="tw:flex tw:min-h-0 tw:flex-1 tw:flex-col">
          <p>
            <sup>11</sup>In the beginning
            {showMarkers ? (
              <span className="tw:text-blue-400">
                \f + \fr 1.11 \fr* This is a simple footnote \f
              </span>
            ) : (
              <sup>a</sup>
            )}
            ...
          </p>
        </div>
      </ResizablePanel>

      <>
        <ResizableHandle />
        <ResizablePanel
          defaultSize={39}
          className="tw:flex tw:min-h-0 tw:flex-col tw:bg-sidebar tw:pb-0 tw:pl-2 tw:pr-0 tw:pt-2"
          minSize={15}
          maxSize={85}
        >
          <div className="tw:flex tw:min-h-0 tw:flex-1 tw:flex-col">
            <Template
              {...restArgs}
              footnotes={footnotes}
              listId={listId}
              selectedFootnote={selectedFootnote}
              showMarkers={showMarkers}
              onFootnoteSelected={(footnote) => setSelectedFootnote(footnote)}
            />
          </div>
        </ResizablePanel>
      </>
    </ResizablePanelGroup>
  );
}

export const Basic: Story = {
  render: Template,
  args: {
    footnotes: usjFootnotes,
    listId: 'storybook-Basic',
    showMarkers: false,
    layout: 'horizontal',
  },
};

/**
 * A row reached from the keyboard shows its focus ring INSIDE the row. The list scrolls, and a
 * scrolling element clips anything its rows paint past its edges, so a ring drawn outside the row
 * would lose its sides.
 */
export const KeyboardFocusRing: Story = {
  render: Template,
  args: {
    footnotes: usjFootnotes,
    listId: 'storybook-KeyboardFocusRing',
    showMarkers: false,
    layout: 'horizontal',
  },
  play: async ({ canvasElement }) => {
    const [firstRow] = within(canvasElement).getAllByRole('option');
    await userEvent.tab();
    expect(document.activeElement).toBe(firstRow);
    expect(firstRow.matches(':focus-visible')).toBe(true);

    // Tailwind composes a ring from several `box-shadow` layers, most of them zero-size
    // placeholders. Split on the commas BETWEEN layers, not the ones inside a color function.
    const paintedLayers = getComputedStyle(firstRow)
      .boxShadow.split(/,(?![^(]*\))/)
      .map((layer) => layer.trim())
      .filter((layer) => !/0px 0px 0px 0px( inset)?$/.test(layer));
    // A ring is painted at all ...
    expect(paintedLayers.length).toBeGreaterThan(0);
    // ... and every painted layer is inset, so none of it lies outside the row box.
    expect(paintedLayers.filter((layer) => !/\binset\b/.test(layer))).toEqual([]);
  },
};

export const WithCustomCallerFormatting: Story = {
  render: Template,
  args: {
    footnotes: usjFootnotes,
    listId: 'storybook-WithCustomCallerFormatting',
    showMarkers: true,
    layout: 'horizontal',
    formatCaller: getFormatCallerFunction(usjFootnotes, ['†', '‡', '⁂', '★', '☆']),
  },
};

export const Raw: Story = {
  render: Template,
  args: {
    footnotes: usjFootnotes,
    listId: 'storybook-Raw',
    showMarkers: true,
    layout: 'horizontal',
    formatCaller: (caller) => caller,
  },
};

/**
 * One row swapped for a host-supplied editor, via `editingFootnoteIndex` + `renderEditingFootnote`.
 * The row keeps its place in the list and is tinted as the entry being edited, and Tab reaches the
 * editor's own controls at that position rather than skipping past the row.
 *
 * The stand-in below is deliberately not the real footnote editor: this list's contract is only
 * that it renders whatever node the host returns, in that note's place. For the real editor in this
 * slot, see the `InlineToolbarGroupsUndoRedoWithTheDropdowns` story under
 * `Advanced/FootnoteEditor`.
 */
export const EditingRow: Story = {
  render: Template,
  args: {
    footnotes: usjFootnotes,
    listId: 'storybook-EditingRow',
    showMarkers: false,
    layout: 'horizontal',
    editingFootnoteIndex: 1,
    renderEditingFootnote: (footnote, index) => (
      <div className="tw:rounded-[6px] tw:border-2 tw:border-ring tw:p-2 tw:text-sm">
        {`Host-supplied editor for note ${index + 1} (\\${footnote.marker})`}
      </div>
    ),
  },
};

/** Stands in for a row editor that reaches its full height only after it loads its note. */
function GrowingEditor({ index }: { index: number }) {
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    const timeout = setTimeout(() => setIsLoaded(true), 150);
    return () => clearTimeout(timeout);
  }, []);
  return (
    <div
      className="tw:rounded-[6px] tw:border-2 tw:border-ring tw:p-2 tw:text-sm"
      style={{ height: isLoaded ? 180 : 40 }}
    >
      {`Editor for note ${index + 1}`}
    </div>
  );
}

function EditingRowRevealTemplate(args: Story['args'] = {}) {
  const [editingIndex, setEditingIndex] = useState(usjFootnotes.length - 1);
  return (
    <div className="tw:flex tw:h-full tw:flex-col">
      <button type="button" onClick={() => setEditingIndex(0)}>
        Edit the first note
      </button>
      <div className="tw:min-h-0 tw:flex-1">
        <FootnoteList
          {...args}
          footnotes={usjFootnotes}
          listId="storybook-EditingRowRevealed"
          editingFootnoteIndex={editingIndex}
          renderEditingFootnote={(_footnote, index) => <GrowingEditor key={index} index={index} />}
        />
      </div>
    </div>
  );
}

/** Whether `element` lies wholly inside `container`'s visible box. */
function isWhollyInside(element: Element, container: Element) {
  const box = element.getBoundingClientRect();
  const view = container.getBoundingClientRect();
  return box.top >= view.top - 0.5 && box.bottom <= view.bottom + 0.5;
}

/**
 * The row being edited is brought wholly into view when editing starts on it - also once the editor
 * inside it has loaded and grown, and when editing moves to another row.
 */
export const EditingRowRevealed: Story = {
  render: EditingRowRevealTemplate,
  args: { showMarkers: false, layout: 'horizontal' },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const list = canvas.getByRole('listbox');
    const editingRow = () => {
      const row = list.querySelector('[data-state="editing"]');
      if (!row) throw new Error('no editing row');
      return row;
    };

    await waitFor(() => {
      expect(editingRow().getBoundingClientRect().height).toBeGreaterThan(180);
      expect(isWhollyInside(editingRow(), list)).toBe(true);
    });

    await userEvent.click(canvas.getByRole('button', { name: 'Edit the first note' }));
    await waitFor(() => {
      expect(editingRow().textContent).toContain('Editor for note 1');
      expect(editingRow().getBoundingClientRect().height).toBeGreaterThan(180);
      expect(isWhollyInside(editingRow(), list)).toBe(true);
    });
  },
};

export const Formatted: Story = {
  render: ScripturePanelTemplate,
  args: {
    footnotes: usjFootnotes,
    listId: 'storybook-Formatted',
    showMarkers: false,
    layout: 'vertical',
  },
};

export const ShowMarkers: Story = {
  render: ScripturePanelTemplate,
  args: {
    footnotes: usjFootnotes,
    listId: 'storybook-ShowMarkers',
    showMarkers: true,
    layout: 'vertical',
    formatCaller: (caller) => caller,
  },
};
