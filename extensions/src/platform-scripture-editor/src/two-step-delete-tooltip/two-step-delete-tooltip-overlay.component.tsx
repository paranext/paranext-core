import React, { useEffect, useRef, useState } from 'react';
import { useLocalizedStrings } from '@papi/frontend/react';
import { DestructiveKeyConfirmation } from 'platform-bible-react';
import { LocalizeKey } from 'platform-bible-utils';
import {
  AnchorRect,
  ArmedHint,
  computeAnchorRect,
  CONFIRMING_KEY_LOCALIZED_STRING_KEYS,
  confirmingKey,
  readArmedHint,
} from './two-step-delete-tooltip.utils';

const REMOVE_VERSE_MARKER_KEY: LocalizeKey =
  '%webView_platformScriptureEditor_twoStepDelete_removeVerseMarker%';
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
  // scrollContainerRef: the ancestor whose scroll moves content; assigned by walking ancestors.
  const scrollContainerRef = useRef<HTMLElement | undefined>(undefined);
  const rafIdRef = useRef<number>(0);

  const [localizedStrings] = useLocalizedStrings(LOCALIZED_STRING_KEYS);

  useEffect(() => {
    const positionAnchor = positionAnchorRef.current;
    if (!positionAnchor) return undefined;

    // Find the scroll container by walking UP through parentElement ancestors until one has
    // overflow-y auto/scroll; falls back to positionAnchor. (Same approach as the paragraph
    // tooltip overlay — the editor's scroll container is an ancestor of positionAnchor.)
    let scrollContainer: HTMLElement = positionAnchor;
    let candidate: HTMLElement | null = positionAnchor.parentElement;
    while (candidate) {
      const { overflowY } = window.getComputedStyle(candidate);
      if (overflowY === 'auto' || overflowY === 'scroll') {
        scrollContainer = candidate;
        break;
      }
      candidate = candidate.parentElement;
    }
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
  const showArrow = armed?.kind !== 'selection';

  return (
    <div ref={positionAnchorRef} className="tw:relative">
      {children}
      <DestructiveKeyConfirmation
        open={!!armed}
        anchorRect={armed ?? EMPTY_ANCHOR_RECT}
        message={localizedStrings[messageKey]}
        confirmingKeyLabel={armed ? localizedStrings[confirmingKey(armed.intent)] : ''}
        showArrow={showArrow}
      />
    </div>
  );
}
