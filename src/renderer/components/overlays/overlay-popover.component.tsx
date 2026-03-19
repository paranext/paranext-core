/**
 * Overlay popover component. Renders a popover using Radix Popover with a virtual anchor positioned
 * at the requested coordinates. Renders content based on type: text, list, description, richText,
 * card.
 *
 * Contains both the presentational component (OverlayPopoverPresentational, exported for tests and
 * stories) and the store-connected component (OverlayPopover) that resolves LocalizeKeys and
 * connects to the overlay store.
 */

import * as PopoverPrimitive from '@radix-ui/react-popover';
import { useLocalizedStrings } from '@renderer/hooks/papi-hooks';
import { removeOverlay } from '@renderer/services/overlays/overlay-store';
import {
  OverlayEntry,
  PopoverContent as PopoverContentModel,
} from '@renderer/services/overlays/overlay.service-model';
import {
  Button,
  Popover,
  PopoverAnchor,
  PopoverContent,
  Z_INDEX_OVERLAY,
} from 'platform-bible-react';
import { type KeyboardEvent, type ReactNode, useCallback, useMemo, useRef } from 'react';
import { isLocalizeKey, LanguageStrings, LocalizeKey } from 'platform-bible-utils';

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
export type OverlayPopoverContentType =
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

/** Props for the presentational OverlayPopoverPresentational component */
export type OverlayPopoverPresentationalProps = {
  /** The content to display inside the popover */
  content: OverlayPopoverContentType;
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
function TextContentRenderer({
  content,
}: {
  content: Extract<OverlayPopoverContentType, { type: 'text' }>;
}) {
  return (
    <>
      <PopoverTitle title={content.title?.toString()} />
      <p className="tw-m-0">{content.body}</p>
    </>
  );
}

/** Renders list content */
function ListContentRenderer({
  content,
}: {
  content: Extract<OverlayPopoverContentType, { type: 'list' }>;
}) {
  return (
    <>
      <PopoverTitle title={content.title?.toString()} />
      <ul className="tw-m-0 tw-pl-5">
        {content.items.map((item, index) => (
          // List items are plain strings with no unique identifier
          // eslint-disable-next-line react/no-array-index-key
          <li key={index} style={{ marginBottom: '0.25rem' }}>
            {item}
          </li>
        ))}
      </ul>
    </>
  );
}

/** Renders description (definition list) content */
function DescriptionContentRenderer({
  content,
}: {
  content: Extract<OverlayPopoverContentType, { type: 'description' }>;
}) {
  return (
    <>
      <PopoverTitle title={content.title?.toString()} />
      <dl className="tw-m-0">
        {content.entries.map((entry, index) => (
          // Description entries have no unique identifier
          // eslint-disable-next-line react/no-array-index-key
          <div key={index}>
            <dt style={{ marginTop: index === 0 ? 0 : '0.5rem', fontWeight: 600 }}>{entry.term}</dt>
            <dd style={{ marginBottom: '0.25rem', marginLeft: 0 }}>{entry.detail}</dd>
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
function RichTextContentRenderer({
  content,
}: {
  content: Extract<OverlayPopoverContentType, { type: 'richText' }>;
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
  content: Extract<OverlayPopoverContentType, { type: 'card' }>;
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
  content: OverlayPopoverContentType;
  onAction: (actionId: string) => void;
}) {
  switch (content.type) {
    case 'text':
      return <TextContentRenderer content={content} />;
    case 'list':
      return <ListContentRenderer content={content} />;
    case 'description':
      return <DescriptionContentRenderer content={content} />;
    case 'richText':
      return <RichTextContentRenderer content={content} />;
    case 'card':
      return <CardContentRenderer content={content} onAction={onAction} />;
    default:
      return undefined;
  }
}

// ── Presentational Component ──

/**
 * Pure presentational popover component. Renders a popover anchored to a position using Radix
 * Popover. Supports text, list, description, rich text, and card content types with optional action
 * buttons and arrow indicator.
 *
 * This component has no dependency on the overlay store or localization hooks. Use it directly in
 * tests and Storybook stories. For production rendering via the overlay service, use
 * {@link OverlayPopover} instead — it handles LocalizeKey resolution and store lifecycle.
 */
export function OverlayPopoverPresentational({
  content,
  position,
  anchor,
  side = 'bottom',
  maxWidth = DEFAULT_MAX_WIDTH,
  showArrow = true,
  onAction,
  onDismiss,
}: OverlayPopoverPresentationalProps) {
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
          <PopoverPrimitive.Arrow
            style={{
              fill: 'hsl(var(--popover))',
              stroke: 'hsl(var(--border))',
              strokeWidth: 1,
            }}
          />
        )}
        <PopoverBody content={content} onAction={handleAction} />
      </PopoverContent>
    </Popover>
  );
}

// ── Localization Helpers ──

/** Helper to push a value to the keys array if it is a LocalizeKey */
function pushIfKey(keys: LocalizeKey[], value: string | LocalizeKey | undefined): void {
  if (typeof value === 'string' && isLocalizeKey(value)) keys.push(value);
}

/** Collects all LocalizeKey values from popover content */
function collectPopoverKeys(content: PopoverContentModel): LocalizeKey[] {
  const keys: LocalizeKey[] = [];
  pushIfKey(keys, content.title);

  switch (content.type) {
    case 'text':
      pushIfKey(keys, content.body);
      break;
    case 'list':
      content.items.forEach((item) => pushIfKey(keys, item));
      break;
    case 'description':
      content.entries.forEach((entry) => {
        pushIfKey(keys, entry.term);
        pushIfKey(keys, entry.detail);
      });
      break;
    case 'richText':
      content.body.forEach((run) => pushIfKey(keys, run.text));
      break;
    case 'card':
      pushIfKey(keys, content.body);
      content.actions.forEach((action) => pushIfKey(keys, action.label));
      break;
    default:
      break;
  }
  return keys;
}

/** Resolves a string-or-LocalizeKey value using the localized strings map */
function resolve(
  value: string | LocalizeKey,
  localizedStrings: LanguageStrings,
): string | LocalizeKey {
  return isLocalizeKey(value) ? (localizedStrings[value] ?? value) : value;
}

/** Resolves LocalizeKey values in popover content using localized strings */
function localizePopoverContent(
  content: PopoverContentModel,
  localizedStrings: LanguageStrings,
): PopoverContentModel {
  const title = content.title ? resolve(content.title, localizedStrings) : undefined;

  switch (content.type) {
    case 'text':
      return { ...content, title, body: resolve(content.body, localizedStrings) };
    case 'list':
      return {
        ...content,
        title,
        items: content.items.map((item) => resolve(item, localizedStrings)),
      };
    case 'description':
      return {
        ...content,
        title,
        entries: content.entries.map((entry) => ({
          term: resolve(entry.term, localizedStrings),
          detail: resolve(entry.detail, localizedStrings),
        })),
      };
    case 'richText':
      return {
        ...content,
        title,
        body: content.body.map((run) => ({ ...run, text: resolve(run.text, localizedStrings) })),
      };
    case 'card':
      return {
        ...content,
        title,
        body: resolve(content.body, localizedStrings),
        actions: content.actions.map((action) => ({
          ...action,
          label: resolve(action.label, localizedStrings),
        })),
      };
    default:
      return content;
  }
}

// ── Store-Connected Component ──

type OverlayPopoverProps = {
  overlay: Extract<OverlayEntry, { type: 'popover' }>;
};

/**
 * Production popover component. Resolves LocalizeKey values in popover content (titles, body text,
 * list items, action labels) via `useLocalizedStrings`, manages overlay lifecycle, and delegates
 * rendering to {@link OverlayPopoverPresentational}.
 *
 * This is the component rendered by `OverlayHost`. Do not use it directly in tests or Storybook —
 * use {@link OverlayPopoverPresentational} instead, which accepts plain props without requiring an
 * `OverlayEntry`.
 */
export function OverlayPopover({ overlay }: OverlayPopoverProps) {
  const hasResolved = useRef(false);

  const localizeKeys = useMemo(() => collectPopoverKeys(overlay.content), [overlay.content]);
  const [localizedStrings] = useLocalizedStrings(localizeKeys);

  const localizedContent = useMemo(
    () => localizePopoverContent(overlay.content, localizedStrings),
    [overlay.content, localizedStrings],
  );

  const resolveAndRemove = useCallback(
    (actionId: string | undefined) => {
      if (hasResolved.current) return;
      hasResolved.current = true;
      removeOverlay(overlay.id);
      overlay.resolve(actionId);
    },
    [overlay],
  );

  const handleAction = useCallback(
    (actionId: string) => {
      resolveAndRemove(actionId);
    },
    [resolveAndRemove],
  );

  const handleDismiss = useCallback(() => {
    resolveAndRemove(undefined);
  }, [resolveAndRemove]);

  return (
    <OverlayPopoverPresentational
      content={localizedContent}
      position={overlay.position}
      anchor={{
        width: overlay.request.anchor.width,
        height: overlay.request.anchor.height,
      }}
      side={overlay.request.side}
      maxWidth={overlay.request.maxWidth}
      showArrow={overlay.request.showArrow}
      onAction={handleAction}
      onDismiss={handleDismiss}
    />
  );
}
