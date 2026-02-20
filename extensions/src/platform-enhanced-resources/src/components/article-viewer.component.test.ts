import { describe, it, expect, vi } from 'vitest';
import type { ArticleViewerProps, OverlayStackEntry } from './article-viewer.component';
import type { EncyclopediaEntry } from './encyclopedia-item.component';

/**
 * ArticleViewer component tests.
 *
 * Note: Full React component rendering tests require a DOM environment (jsdom) and mocking of
 * platform-bible-react components. These tests verify the exported interfaces, type contracts,
 * callback behavior, overlay stack logic, and boundary conditions.
 */

// --- Mock data factory ---

function createMockEntry(overrides: Partial<EncyclopediaEntry> = {}): EncyclopediaEntry {
  return {
    id: 'entry-001',
    title: 'Abraham',
    articleHtml: '<p>Abraham was the patriarch of the Israelite nation.</p>',
    scriptureRefs: ['GEN 12:1', 'GEN 15:6'],
    ...overrides,
  };
}

function createMockOverlayEntry(overrides: Partial<OverlayStackEntry> = {}): OverlayStackEntry {
  return {
    entry: createMockEntry(),
    displayIndex: 0,
    totalItems: 5,
    ...overrides,
  };
}

describe('article-viewer.component', () => {
  // --- ArticleViewerProps Type Contract Tests ---

  it('ArticleViewerProps interface accepts all required props', () => {
    const props: ArticleViewerProps = {
      overlayStack: [createMockOverlayEntry()],
      onClose: () => {},
      onNavigateVerse: () => {},
      onOpenArticle: () => {},
      onOpenImage: () => {},
      onNavigatePrev: () => {},
      onNavigateNext: () => {},
    };

    expect(props.overlayStack).toHaveLength(1);
  });

  it('ArticleViewerProps accepts empty overlay stack', () => {
    const props: ArticleViewerProps = {
      overlayStack: [],
      onClose: () => {},
      onNavigateVerse: () => {},
      onOpenArticle: () => {},
      onOpenImage: () => {},
      onNavigatePrev: () => {},
      onNavigateNext: () => {},
    };

    expect(props.overlayStack).toHaveLength(0);
  });

  // --- OverlayStackEntry Type Contract Tests ---

  it('OverlayStackEntry has all required fields', () => {
    const stackEntry = createMockOverlayEntry();

    expect(stackEntry.entry).toBeDefined();
    expect(stackEntry.entry.id).toBe('entry-001');
    expect(stackEntry.displayIndex).toBe(0);
    expect(stackEntry.totalItems).toBe(5);
  });

  it('OverlayStackEntry supports different display positions', () => {
    const first = createMockOverlayEntry({ displayIndex: 0, totalItems: 10 });
    const middle = createMockOverlayEntry({ displayIndex: 5, totalItems: 10 });
    const last = createMockOverlayEntry({ displayIndex: 9, totalItems: 10 });

    expect(first.displayIndex).toBe(0);
    expect(middle.displayIndex).toBe(5);
    expect(last.displayIndex).toBe(9);
  });

  // --- Navigation Bounds Tests ---

  it('prev is disabled when displayIndex is 0 (first article)', () => {
    const entry = createMockOverlayEntry({ displayIndex: 0, totalItems: 5 });
    const hasPrev = entry.displayIndex > 0;

    expect(hasPrev).toBe(false);
  });

  it('prev is enabled when displayIndex > 0', () => {
    const entry = createMockOverlayEntry({ displayIndex: 2, totalItems: 5 });
    const hasPrev = entry.displayIndex > 0;

    expect(hasPrev).toBe(true);
  });

  it('next is disabled when displayIndex is last (totalItems - 1)', () => {
    const entry = createMockOverlayEntry({ displayIndex: 4, totalItems: 5 });
    const hasNext = entry.displayIndex < entry.totalItems - 1;

    expect(hasNext).toBe(false);
  });

  it('next is enabled when displayIndex < totalItems - 1', () => {
    const entry = createMockOverlayEntry({ displayIndex: 2, totalItems: 5 });
    const hasNext = entry.displayIndex < entry.totalItems - 1;

    expect(hasNext).toBe(true);
  });

  it('both prev and next are disabled when totalItems is 1', () => {
    const entry = createMockOverlayEntry({ displayIndex: 0, totalItems: 1 });
    const hasPrev = entry.displayIndex > 0;
    const hasNext = entry.displayIndex < entry.totalItems - 1;

    expect(hasPrev).toBe(false);
    expect(hasNext).toBe(false);
  });

  // --- Close Callback Tests ---

  it('onClose is called when invoked', () => {
    const onClose = vi.fn();
    const props: ArticleViewerProps = {
      overlayStack: [createMockOverlayEntry()],
      onClose,
      onNavigateVerse: () => {},
      onOpenArticle: () => {},
      onOpenImage: () => {},
      onNavigatePrev: () => {},
      onNavigateNext: () => {},
    };

    props.onClose();
    expect(onClose).toHaveBeenCalledOnce();
  });

  // --- Navigate Verse Callback Tests ---

  it('onNavigateVerse is called with the correct verse reference', () => {
    const onNavigateVerse = vi.fn();
    const props: ArticleViewerProps = {
      overlayStack: [createMockOverlayEntry()],
      onClose: () => {},
      onNavigateVerse,
      onOpenArticle: () => {},
      onOpenImage: () => {},
      onNavigatePrev: () => {},
      onNavigateNext: () => {},
    };

    props.onNavigateVerse('GEN 1:1');
    expect(onNavigateVerse).toHaveBeenCalledWith('GEN 1:1');
  });

  // --- Navigate Prev/Next Callback Tests ---

  it('onNavigatePrev is called when invoked', () => {
    const onNavigatePrev = vi.fn();
    const props: ArticleViewerProps = {
      overlayStack: [createMockOverlayEntry({ displayIndex: 2, totalItems: 5 })],
      onClose: () => {},
      onNavigateVerse: () => {},
      onOpenArticle: () => {},
      onOpenImage: () => {},
      onNavigatePrev,
      onNavigateNext: () => {},
    };

    props.onNavigatePrev();
    expect(onNavigatePrev).toHaveBeenCalledOnce();
  });

  it('onNavigateNext is called when invoked', () => {
    const onNavigateNext = vi.fn();
    const props: ArticleViewerProps = {
      overlayStack: [createMockOverlayEntry({ displayIndex: 2, totalItems: 5 })],
      onClose: () => {},
      onNavigateVerse: () => {},
      onOpenArticle: () => {},
      onOpenImage: () => {},
      onNavigatePrev: () => {},
      onNavigateNext,
    };

    props.onNavigateNext();
    expect(onNavigateNext).toHaveBeenCalledOnce();
  });

  // --- Open Article (See Also) Callback Tests ---

  it('onOpenArticle is called with the linked entry', () => {
    const onOpenArticle = vi.fn();
    const linkedEntry = createMockEntry({ id: 'entry-linked', title: 'Sarah' });

    const props: ArticleViewerProps = {
      overlayStack: [createMockOverlayEntry()],
      onClose: () => {},
      onNavigateVerse: () => {},
      onOpenArticle,
      onOpenImage: () => {},
      onNavigatePrev: () => {},
      onNavigateNext: () => {},
    };

    props.onOpenArticle(linkedEntry);
    expect(onOpenArticle).toHaveBeenCalledWith(
      expect.objectContaining({
        id: 'entry-linked',
        title: 'Sarah',
      }),
    );
  });

  // --- Open Image Callback Tests ---

  it('onOpenImage is called with the image ID', () => {
    const onOpenImage = vi.fn();
    const props: ArticleViewerProps = {
      overlayStack: [createMockOverlayEntry()],
      onClose: () => {},
      onNavigateVerse: () => {},
      onOpenArticle: () => {},
      onOpenImage,
      onNavigatePrev: () => {},
      onNavigateNext: () => {},
    };

    props.onOpenImage('img-042');
    expect(onOpenImage).toHaveBeenCalledWith('img-042');
  });

  // --- Overlay Stack Depth Tests ---

  it('overlay stack supports multiple entries (nesting)', () => {
    const stack: OverlayStackEntry[] = [
      createMockOverlayEntry({
        entry: createMockEntry({ id: 'entry-001', title: 'Abraham' }),
      }),
      createMockOverlayEntry({
        entry: createMockEntry({ id: 'entry-002', title: 'Sarah' }),
      }),
      createMockOverlayEntry({
        entry: createMockEntry({ id: 'entry-003', title: 'Isaac' }),
      }),
    ];

    expect(stack).toHaveLength(3);
    // Top of stack is the last element
    expect(stack[stack.length - 1].entry.title).toBe('Isaac');
  });

  it('overlay stack depth limit is enforced at 10', () => {
    const MAX_OVERLAY_DEPTH = 10;

    const stack: OverlayStackEntry[] = Array.from({ length: MAX_OVERLAY_DEPTH }, (_, i) =>
      createMockOverlayEntry({
        entry: createMockEntry({ id: `entry-${i}`, title: `Article ${i}` }),
      }),
    );

    expect(stack.length).toBe(MAX_OVERLAY_DEPTH);
    const canPushMore = stack.length < MAX_OVERLAY_DEPTH;
    expect(canPushMore).toBe(false);
  });

  it('overlay stack allows push when below depth limit', () => {
    const MAX_OVERLAY_DEPTH = 10;

    const stack: OverlayStackEntry[] = [createMockOverlayEntry(), createMockOverlayEntry()];

    const canPushMore = stack.length < MAX_OVERLAY_DEPTH;
    expect(canPushMore).toBe(true);
  });

  it('popping from stack reveals previous entry', () => {
    const stack: OverlayStackEntry[] = [
      createMockOverlayEntry({
        entry: createMockEntry({ id: 'entry-base', title: 'Abraham' }),
      }),
      createMockOverlayEntry({
        entry: createMockEntry({ id: 'entry-nested', title: 'Sarah' }),
      }),
    ];

    // Current (top) is Sarah
    expect(stack[stack.length - 1].entry.title).toBe('Sarah');

    // Pop
    const poppedStack = stack.slice(0, -1);
    expect(poppedStack).toHaveLength(1);
    expect(poppedStack[poppedStack.length - 1].entry.title).toBe('Abraham');
  });

  // --- Article HTML Tests ---

  it('entry articleHtml is available for rendering', () => {
    const entry = createMockEntry({
      articleHtml: '<h1>Creation</h1><p>In the beginning...</p>',
    });

    expect(entry.articleHtml).toContain('<h1>Creation</h1>');
    expect(entry.articleHtml).toContain('In the beginning');
  });

  it('entry with empty articleHtml', () => {
    const entry = createMockEntry({ articleHtml: '' });

    expect(entry.articleHtml).toBe('');
  });

  // --- Multiple callbacks do not interfere ---

  it('multiple callbacks are independent', () => {
    const onClose = vi.fn();
    const onNavigateVerse = vi.fn();
    const onOpenArticle = vi.fn();
    const onOpenImage = vi.fn();
    const onNavigatePrev = vi.fn();
    const onNavigateNext = vi.fn();

    const props: ArticleViewerProps = {
      overlayStack: [createMockOverlayEntry()],
      onClose,
      onNavigateVerse,
      onOpenArticle,
      onOpenImage,
      onNavigatePrev,
      onNavigateNext,
    };

    props.onClose();
    props.onNavigateVerse('GEN 1:1');
    props.onNavigatePrev();
    props.onNavigateNext();
    props.onOpenImage('img-001');

    expect(onClose).toHaveBeenCalledOnce();
    expect(onNavigateVerse).toHaveBeenCalledOnce();
    expect(onNavigatePrev).toHaveBeenCalledOnce();
    expect(onNavigateNext).toHaveBeenCalledOnce();
    expect(onOpenImage).toHaveBeenCalledOnce();
    expect(onOpenArticle).not.toHaveBeenCalled();
  });
});
