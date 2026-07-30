import React, { useEffect, useRef, useState } from 'react';
import { useLocalizedStrings } from '@papi/frontend/react';
import { DestructiveKeyConfirmation, isMacOs } from 'platform-bible-react';
import { LocalizeKey } from 'platform-bible-utils';
import { findScrollContainer } from '../editor-dom.util';
import {
  AnchorRect,
  ArmedHint,
  computeAnchorRect,
  CONFIRMING_KEY_LOCALIZED_STRING_KEYS,
  confirmingKey,
  getConfirmingKeyDisplayLabel,
  readArmedHint,
} from './two-step-delete-tooltip.utils';

const REMOVE_VERSE_MARKER_KEY: LocalizeKey =
  '%webView_platformScriptureEditor_twoStepDelete_removeVerseNumber%';
const DELETE_SELECTION_KEY: LocalizeKey =
  '%webView_platformScriptureEditor_twoStepDelete_deleteSelection%';
const LOCALIZED_STRING_KEYS: LocalizeKey[] = [
  REMOVE_VERSE_MARKER_KEY,
  DELETE_SELECTION_KEY,
  ...CONFIRMING_KEY_LOCALIZED_STRING_KEYS,
];

const EMPTY_ANCHOR_RECT: AnchorRect = { top: 0, left: 0, width: 0, height: 0 };

type ArmedData = AnchorRect & ArmedHint;

type Props = { children: React.ReactNode };

/**
 * Renders the destructive "press again to delete" hint while a verse marker (or a selection
 * containing verse markers) is armed for the two-step delete. This lives in core — not the editor
 * repo — so the user-facing copy is localized. Rendering itself is delegated to
 * `platform-bible-react`'s `DestructiveKeyConfirmation`; this component owns only detecting the
 * armed state and where to anchor it.
 *
 * The editor (shared-react's StructureKeyboardPlugin) publishes the armed state to its root as
 * `data-verse-delete-intent`/`data-verse-delete-kind` and marks the armed marker with
 * `verse-selected`; this overlay observes those DOM signals and anchors the hint to the marker.
 * Mirrors {@link ../paragraph-marker-tooltip/paragraph-marker-tooltip-overlay.component}.
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
  // - Live: the MutationObserver/scroll listener below react to the editor's
  //   data-verse-delete-*/verse-selected DOM signals in real time to arm, disarm, and re-anchor the
  //   hint while this tab is visible.
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
      const root = positionAnchor.querySelector('[data-verse-delete-kind]');
      const hint = readArmedHint(root);
      const marker = positionAnchor.querySelector<HTMLElement>('.verse-selected');
      if (!hint || !marker) {
        setArmed(undefined);
        return;
      }
      setArmed({ ...hint, ...computeAnchorRect(marker, positionAnchor) });
    };

    // The editor toggles the root's data-verse-delete-* attributes and the marker's verse-selected
    // class; observe both so the tooltip arms/disarms and re-anchors in lockstep with the editor.
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

  const messageKey = armed?.kind === 'selection' ? DELETE_SELECTION_KEY : REMOVE_VERSE_MARKER_KEY;

  return (
    <div ref={positionAnchorRef} className="tw:relative">
      {children}
      <DestructiveKeyConfirmation
        open={!!armed}
        anchorRect={armed ?? EMPTY_ANCHOR_RECT}
        message={localizedStrings[messageKey]}
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
