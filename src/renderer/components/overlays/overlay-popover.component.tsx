/**
 * Overlay popover component. Renders a popover using Radix Popover with a virtual anchor positioned
 * at the requested coordinates. Renders content based on type: text, markdown, card.
 *
 * Contains both the presentational component (OverlayPopoverPresentational, exported for tests and
 * stories) and the store-connected component (OverlayPopover) that resolves LocalizeKeys and
 * connects to the overlay store.
 */

import { Popover as PopoverPrimitive } from 'radix-ui';
import { useLocalizedStrings } from '@renderer/hooks/papi-hooks';
import { resolveAndRemoveOverlay } from '@renderer/services/overlays/overlay-store';
import {
  OverlayEntry,
  PopoverContent as PopoverContentModel,
} from '@renderer/services/overlays/overlay.service-model';
import {
  Button,
  MarkdownRenderer,
  Popover,
  PopoverAnchor,
  PopoverContent,
  Z_INDEX_OVERLAY,
} from 'platform-bible-react';
import { type KeyboardEvent, useCallback, useMemo, useRef } from 'react';
import { isLocalizeKey, LanguageStrings, LocalizeKey } from 'platform-bible-utils';

// ── Public Types ──

/** Props for the presentational OverlayPopoverPresentational component */
export type OverlayPopoverPresentationalProps = {
  /** The content to display inside the popover */
  content: PopoverContentModel;
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
  return <div className="tw:mb-2 tw:font-bold">{title}</div>;
}

/** Renders text content */
function TextContentRenderer({
  content,
}: {
  content: Extract<PopoverContentModel, { type: 'text' }>;
}) {
  return (
    <>
      <PopoverTitle title={content.title?.toString()} />
      <p className="tw:m-0">{content.body}</p>
    </>
  );
}

/** Renders markdown content */
function MarkdownContentRenderer({
  content,
}: {
  content: Extract<PopoverContentModel, { type: 'markdown' }>;
}) {
  return <MarkdownRenderer markdown={content.markdown} className="tw:prose-sm" />;
}

/** Renders card content with action buttons */
function CardContentRenderer({
  content,
  onAction,
}: {
  content: Extract<PopoverContentModel, { type: 'card' }>;
  onAction: (actionId: string) => void;
}) {
  return (
    <>
      <PopoverTitle title={content.title?.toString()} />
      <p className="tw:m-0">{content.body}</p>
      <div className="tw:mt-3 tw:flex tw:justify-end tw:gap-2">
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
  content: PopoverContentModel;
  onAction: (actionId: string) => void;
}) {
  switch (content.type) {
    case 'text':
      return <TextContentRenderer content={content} />;
    case 'markdown':
      return <MarkdownContentRenderer content={content} />;
    case 'card':
      return <CardContentRenderer content={content} onAction={onAction} />;
    default:
      return undefined;
  }
}

// ── Presentational Component ──

/**
 * Pure presentational popover component. Renders a popover anchored to a position using Radix
 * Popover. Supports text, markdown, and card content types with optional action buttons and arrow
 * indicator.
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
        className="tw:overflow-y-auto"
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
              fill: 'var(--popover)',
              stroke: 'var(--border)',
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

  switch (content.type) {
    case 'text':
      pushIfKey(keys, content.title);
      pushIfKey(keys, content.body);
      break;
    case 'markdown':
      pushIfKey(keys, content.markdown);
      break;
    case 'card':
      pushIfKey(keys, content.title);
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
  switch (content.type) {
    case 'text':
      return {
        ...content,
        title: content.title ? resolve(content.title, localizedStrings) : undefined,
        body: resolve(content.body, localizedStrings),
      };
    case 'markdown':
      return {
        ...content,
        markdown: resolve(content.markdown, localizedStrings),
      };
    case 'card':
      return {
        ...content,
        title: content.title ? resolve(content.title, localizedStrings) : undefined,
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
 * action labels) via `useLocalizedStrings`, manages overlay lifecycle, and delegates rendering to
 * {@link OverlayPopoverPresentational}.
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

  const handleAction = useCallback(
    (actionId: string) => {
      if (hasResolved.current) return;
      hasResolved.current = true;
      resolveAndRemoveOverlay(overlay.id, overlay.type, actionId);
    },
    [overlay],
  );

  const handleDismiss = useCallback(() => {
    if (hasResolved.current) return;
    hasResolved.current = true;
    resolveAndRemoveOverlay(overlay.id, overlay.type, undefined);
  }, [overlay]);

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
