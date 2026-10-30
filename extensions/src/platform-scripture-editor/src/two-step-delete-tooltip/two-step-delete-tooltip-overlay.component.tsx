import React, { useEffect, useRef, useState } from 'react';
import { useLocalizedStrings } from '@papi/frontend/react';
import { DestructiveKeyConfirmation, isMacOs } from 'platform-bible-react';
import { LocalizeKey } from 'platform-bible-utils';
import { findScrollContainer } from '../editor-dom.util';
import {
  AnchorRect,
  ArmedHint,
  CONFIRMING_KEY_LOCALIZED_STRING_KEYS,
  confirmingKey,
  getConfirmingKeyDisplayLabel,
  hintMessageKey,
  readArmedHint,
  resolveArmedAnchorRect,
  TWO_STEP_DELETE_MESSAGE_STRING_KEYS,
} from './two-step-delete-tooltip.utils';

const LOCALIZED_STRING_KEYS: LocalizeKey[] = [
  ...TWO_STEP_DELETE_MESSAGE_STRING_KEYS,
  ...CONFIRMING_KEY_LOCALIZED_STRING_KEYS,
];

const EMPTY_ANCHOR_RECT: AnchorRect = { top: 0, left: 0, width: 0, height: 0 };

type ArmedData = AnchorRect & ArmedHint;

type Props = { children: React.ReactNode };

/**
 * Renders the destructive "press again to delete" hint while a verse marker, a selection containing
 * verse markers, or a paragraph merge is armed for the two-step delete. This lives in core — not
 * the editor repo — so the user-facing copy is localized. Rendering itself is delegated to
 * `platform-bible-react`'s `DestructiveKeyConfirmation`; this component owns only detecting the
 * armed state and where to anchor it.
 *
 * The DOM contract with the editor (shared-react's StructureKeyboardPlugin), which this overlay
 * observes:
 *
 * - The editor root carries `data-verse-delete-intent` and `data-verse-delete-kind` while a delete is
 *   armed.
 * - An armed verse marker carries `verse-selected`.
 * - An armed paragraph's gutter marker carries `para-merge-armed` — or, when the paragraph shows no
 *   marker, the paragraph itself does. The gutter marker is told apart by its
 *   `data-text-type="marker"` attribute, and carries `--para-merge-armed-text-left` and
 *   `--para-merge-armed-text-width`: where its text sits within its box.
 *
 * The hint anchors to the marked element, narrowed to a gutter marker's text, or, for a paragraph
 * that shows no marker, to the caret (see `resolveArmedAnchorRect`). Mirrors
 * {@link ../paragraph-marker-tooltip/paragraph-marker-tooltip-overlay.component}.
 */
export function TwoStepDeleteTooltipOverlay({ children }: Props) {
  const [armed, setArmed] = useState<ArmedData | undefined>(undefined);

  // positionAnchorRef: the position:relative element; coordinate origin for getBoundingClientRect.
  // The ref needs to start out with null for it to work as an element ref
  // eslint-disable-next-line no-null/no-null
  const positionAnchorRef = useRef<HTMLDivElement>(null);
  // scrollContainerRef: the ancestor whose scroll moves content; assigned via findScrollContainer.
  const scrollContainerRef = useRef<HTMLElement | undefined>(undefined);
  const rafIdRef = useRef<number>(0);

  const [localizedStrings] = useLocalizedStrings(LOCALIZED_STRING_KEYS);

  // Cross-view sync (see .claude/rules/cross-view-sync-hidden-views.md):
  // - Live: the MutationObserver/scroll listener below react to the editor's data-verse-delete-*
  //   attributes and the verse-selected / para-merge-armed classes in real time to arm, disarm, and
  //   re-anchor the hint while this tab is visible.
  // - Hidden: intentionally not handled, because arming can't happen while hidden — the editor only
  //   publishes an armed state in response to a Backspace/Delete keypress while it holds keyboard
  //   focus, and rc-dock hides an inactive tab's pane via display:none, which force-blurs whatever
  //   was focused inside it. So there's no armed state to catch up on when the tab is reactivated;
  //   if arming happened and the tab is then hidden, that's the same focus loss the editor treats
  //   as a cancel.
  useEffect(() => {
    const positionAnchor = positionAnchorRef.current;
    if (!positionAnchor) return undefined;

    // Style-only matching (requireOverflow: false): this lookup runs once on mount, possibly before
    // content has loaded and made anything overflow, so "actually overflowing right now" would be
    // the wrong criterion here. Falls back to positionAnchor if no scrolling ancestor is found.
    // Mirrors ParagraphMarkerTooltipOverlay.
    const scrollContainer =
      findScrollContainer(positionAnchor, { requireOverflow: false }) ?? positionAnchor;
    scrollContainerRef.current = scrollContainer;

    const sync = () => {
      const hint = readArmedHint(positionAnchor.querySelector('[data-verse-delete-kind]'));
      const anchorRect = hint
        ? resolveArmedAnchorRect(hint, positionAnchor, window.getSelection())
        : undefined;
      setArmed(hint && anchorRect ? { ...hint, ...anchorRect } : undefined);
    };

    // The editor toggles the root's data-verse-delete-* attributes, and verse-selected on an armed
    // verse marker or para-merge-armed on an armed paragraph's marker; observe both so the tooltip
    // arms/disarms and re-anchors in lockstep with the editor.
    const observer = new MutationObserver(sync);
    observer.observe(positionAnchor, {
      subtree: true,
      childList: true,
      attributes: true,
      attributeFilter: ['data-verse-delete-intent', 'data-verse-delete-kind', 'class'],
    });

    const handleScroll = () => {
      cancelAnimationFrame(rafIdRef.current);
      rafIdRef.current = requestAnimationFrame(sync);
    };
    scrollContainer.addEventListener('scroll', handleScroll, { passive: true });

    sync();

    return () => {
      observer.disconnect();
      scrollContainer.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(rafIdRef.current);
    };
  }, []); // refs are stable; empty deps is correct

  return (
    <div ref={positionAnchorRef} className="tw:relative">
      {children}
      <DestructiveKeyConfirmation
        open={!!armed}
        anchorRect={armed ?? EMPTY_ANCHOR_RECT}
        message={armed ? localizedStrings[hintMessageKey(armed)] : ''}
        confirmingKeyLabel={
          armed
            ? getConfirmingKeyDisplayLabel(
                armed.intent,
                localizedStrings[confirmingKey(armed.intent)],
                isMacOs(),
              )
            : ''
        }
      />
    </div>
  );
}
