/**
 * Presentational overlay popover component. Renders a popover using Radix Popover with a virtual
 * anchor positioned at the requested coordinates. Renders content based on type: text, list,
 * description, richText, card.
 *
 * This is a pure presentational component with no dependency on the overlay store. The renderer's
 * overlay wrapper connects it to the store.
 */

import { LocalizeKey } from 'platform-bible-utils';
import { type KeyboardEvent, type ReactNode, useCallback } from 'react';
import * as PopoverPrimitive from '@radix-ui/react-popover';
import { Popover, PopoverAnchor, PopoverContent } from '../../shadcn-ui/popover';
import { Button } from '../../shadcn-ui/button';
import { Z_INDEX_OVERLAY } from '../../z-index';

// ── Public Types ──

/** An action button displayed at the bottom of a card-type popover */
export type OverlayPopoverAction = {
  id: string;
  label: string | LocalizeKey;
  variant?: 'default' | 'destructive' | 'secondary';
};

/** A segment of styled text within rich text content */
export type OverlayRichTextRun = {
  text: string | LocalizeKey;
  bold?: boolean;
  italic?: boolean;
  scriptureRef?: boolean;
};

/**
 * The content to display inside a popover. Discriminated union on `type`:
 *
 * - `'text'` — Simple text with an optional title and a plain-text body.
 * - `'list'` — A bulleted list of items with an optional title.
 * - `'description'` — A term/detail list, useful for metadata or properties.
 * - `'richText'` — Styled text composed of runs with inline formatting.
 * - `'card'` — A card with title, body text, and action buttons.
 */
export type OverlayPopoverContent =
  | {
      type: 'text';
      title?: string | LocalizeKey;
      body: string | LocalizeKey;
    }
  | {
      type: 'list';
      title?: string | LocalizeKey;
      items: (string | LocalizeKey)[];
    }
  | {
      type: 'description';
      title?: string | LocalizeKey;
      entries: { term: string | LocalizeKey; detail: string | LocalizeKey }[];
    }
  | {
      type: 'richText';
      title?: string | LocalizeKey;
      body: OverlayRichTextRun[];
    }
  | {
      type: 'card';
      title?: string | LocalizeKey;
      body: string | LocalizeKey;
      actions: OverlayPopoverAction[];
    };

/** Props for the presentational OverlayPopover component */
export type OverlayPopoverProps = {
  /** The content to display inside the popover */
  content: OverlayPopoverContent;
  /** Document-relative position for the popover anchor */
  position: { x: number; y: number };
  /** Optional anchor dimensions */
  anchor?: { width?: number; height?: number };
  /** Preferred side of the anchor. Defaults to 'bottom'. */
  side?: 'top' | 'bottom' | 'left' | 'right';
  /** Maximum width in pixels. Defaults to 320. */
  maxWidth?: number;
  /** Whether to display an arrow pointing toward the anchor. Defaults to true. */
  showArrow?: boolean;
  /** Called when the user clicks an action button (card content) */
  onAction?: (actionId: string) => void;
  /** Called when the popover is dismissed */
  onDismiss: () => void;
};

// ── Constants ──

/** Default max width for popovers */
const DEFAULT_MAX_WIDTH = 320;

/** Default max height for popovers */
const MAX_HEIGHT = 400;

// ── Internal Components ──

/** Renders the title if present */
function PopoverTitle({ title }: { title?: string }) {
  if (!title) return undefined;
  return <div className="tw-mb-2 tw-font-bold">{title}</div>;
}

/** Renders text content */
function TextContent({ content }: { content: Extract<OverlayPopoverContent, { type: 'text' }> }) {
  return (
    <>
      <PopoverTitle title={content.title?.toString()} />
      <p className="tw-m-0">{content.body}</p>
    </>
  );
}

/** Renders list content */
function ListContent({ content }: { content: Extract<OverlayPopoverContent, { type: 'list' }> }) {
  return (
    <>
      <PopoverTitle title={content.title?.toString()} />
      <ul className="tw-m-0 tw-pl-5 [&>li]:tw-mb-1">
        {content.items.map((item, index) => (
          // List items are plain strings with no unique identifier
          // eslint-disable-next-line react/no-array-index-key
          <li key={index}>{item}</li>
        ))}
      </ul>
    </>
  );
}

/** Renders description (definition list) content */
function DescriptionContent({
  content,
}: {
  content: Extract<OverlayPopoverContent, { type: 'description' }>;
}) {
  return (
    <>
      <PopoverTitle title={content.title?.toString()} />
      <dl className="tw-m-0 [&>div:first-child>dt]:tw-mt-0 [&>div>dd]:tw-mb-1 [&>div>dd]:tw-ml-0 [&>div>dt]:tw-mt-2 [&>div>dt]:tw-font-semibold">
        {content.entries.map((entry, index) => (
          // Description entries have no unique identifier
          // eslint-disable-next-line react/no-array-index-key
          <div key={index}>
            <dt>{entry.term}</dt>
            <dd>{entry.detail}</dd>
          </div>
        ))}
      </dl>
    </>
  );
}

/** Renders a single rich text run with optional styling */
function RichTextRunSpan({ run }: { run: OverlayRichTextRun }) {
  let element: ReactNode = run.text;

  if (run.bold) {
    element = <strong>{element}</strong>;
  }
  if (run.italic) {
    element = <em>{element}</em>;
  }
  if (run.scriptureRef) {
    element = <span className="tw-italic">{element}</span>;
  }

  return element;
}

/** Renders rich text content */
function RichTextContent({
  content,
}: {
  content: Extract<OverlayPopoverContent, { type: 'richText' }>;
}) {
  return (
    <>
      <PopoverTitle title={content.title?.toString()} />
      <div>
        {content.body.map((run, index) => (
          // Rich text runs have no unique identifier
          // eslint-disable-next-line react/no-array-index-key
          <RichTextRunSpan key={index} run={run} />
        ))}
      </div>
    </>
  );
}

/** Renders card content with action buttons */
function CardContentRenderer({
  content,
  onAction,
}: {
  content: Extract<OverlayPopoverContent, { type: 'card' }>;
  onAction: (actionId: string) => void;
}) {
  return (
    <>
      <PopoverTitle title={content.title?.toString()} />
      <p className="tw-m-0">{content.body}</p>
      <div className="tw-mt-3 tw-flex tw-justify-end tw-gap-2">
        {content.actions.map((action) => (
          <Button
            key={action.id}
            variant={action.variant ?? 'default'}
            size="sm"
            onClick={() => onAction(action.id)}
          >
            {action.label}
          </Button>
        ))}
      </div>
    </>
  );
}

/** Renders popover content based on type */
function PopoverBody({
  content,
  onAction,
}: {
  content: OverlayPopoverContent;
  onAction: (actionId: string) => void;
}) {
  switch (content.type) {
    case 'text':
      return <TextContent content={content} />;
    case 'list':
      return <ListContent content={content} />;
    case 'description':
      return <DescriptionContent content={content} />;
    case 'richText':
      return <RichTextContent content={content} />;
    case 'card':
      return <CardContentRenderer content={content} onAction={onAction} />;
    default:
      return undefined;
  }
}

// ── Main Component ──

/**
 * Renders a popover anchored to a position using Radix Popover. Supports text, list, description,
 * rich text, and card content types with optional action buttons and arrow indicator.
 */
export function OverlayPopover({
  content,
  position,
  anchor,
  side = 'bottom',
  maxWidth = DEFAULT_MAX_WIDTH,
  showArrow = true,
  onAction,
  onDismiss,
}: OverlayPopoverProps) {
  const handleOpenChange = useCallback(
    (open: boolean) => {
      if (!open) onDismiss();
    },
    [onDismiss],
  );

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onDismiss();
      }
    },
    [onDismiss],
  );

  const handleAction = useCallback(
    (actionId: string) => {
      if (onAction) onAction(actionId);
    },
    [onAction],
  );

  return (
    <Popover open onOpenChange={handleOpenChange}>
      <PopoverAnchor asChild>
        <div
          data-overlay-popover-anchor
          style={{
            position: 'fixed',
            left: position.x,
            top: position.y,
            width: anchor?.width ?? 0,
            height: anchor?.height ?? 0,
            pointerEvents: 'none',
          }}
        />
      </PopoverAnchor>
      <PopoverContent
        data-overlay-popover
        className="tw-overflow-y-auto"
        side={side}
        align="start"
        sideOffset={showArrow ? 8 : 4}
        style={{
          zIndex: Z_INDEX_OVERLAY,
          maxWidth,
          maxHeight: MAX_HEIGHT,
        }}
        onKeyDown={handleKeyDown}
        onOpenAutoFocus={(e) => e.preventDefault()}
        onCloseAutoFocus={(e) => e.preventDefault()}
      >
        {showArrow && (
          <PopoverPrimitive.Arrow className="tw-fill-popover tw-stroke-border tw-stroke-1" />
        )}
        <PopoverBody content={content} onAction={handleAction} />
      </PopoverContent>
    </Popover>
  );
}
