/**
 * Thin wrapper that connects the presentational OverlayPopover from platform-bible-react to the
 * renderer's overlay store. Resolves any LocalizeKey values in popover content before passing them
 * to the presentational component.
 */

import { useLocalizedStrings } from '@renderer/hooks/papi-hooks';
import { removeOverlay } from '@renderer/services/overlay-store';
import { OverlayEntry, PopoverContent } from '@shared/models/overlay.service-model';
import { OverlayPopover as PresentationalPopover } from 'platform-bible-react';
import { useCallback, useMemo, useRef } from 'react';
import { isLocalizeKey, LanguageStrings, LocalizeKey } from 'platform-bible-utils';

/** Helper to push a value to the keys array if it is a LocalizeKey */
function pushIfKey(keys: LocalizeKey[], value: string | LocalizeKey | undefined): void {
  if (typeof value === 'string' && isLocalizeKey(value)) keys.push(value);
}

/** Collects all LocalizeKey values from popover content */
function collectPopoverKeys(content: PopoverContent): LocalizeKey[] {
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
  content: PopoverContent,
  localizedStrings: LanguageStrings,
): PopoverContent {
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

type OverlayPopoverProps = {
  overlay: Extract<OverlayEntry, { type: 'popover' }>;
};

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
    <PresentationalPopover
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
