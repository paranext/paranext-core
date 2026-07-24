import React, { Fragment, useEffect, useRef, useState } from 'react';
import { useLocalizedStrings } from '@papi/frontend/react';
import {
  cn,
  Kbd,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from 'platform-bible-react';
import { formatReplacementStringToArray, LocalizeKey } from 'platform-bible-utils';
import {
  AnchorRect,
  ArmedHint,
  computeAnchorRect,
  confirmingKey,
  readArmedHint,
} from './verse-delete-tooltip.utils';

const REMOVE_VERSE_MARKER_KEY: LocalizeKey =
  '%webView_platformScriptureEditor_verseDelete_removeVerseMarker%';
const DELETE_SELECTION_KEY: LocalizeKey =
  '%webView_platformScriptureEditor_verseDelete_deleteSelection%';
const LOCALIZED_STRING_KEYS: LocalizeKey[] = [REMOVE_VERSE_MARKER_KEY, DELETE_SELECTION_KEY];

type ArmedData = AnchorRect & ArmedHint;

type Props = { children: React.ReactNode };

/**
 * Renders the destructive "press again to delete" hint while a verse marker (or a selection
 * containing verse markers) is armed for the two-step delete. This lives in core — not the editor
 * repo — so the user-facing copy is localized and the surface is a vetted ShadCN Tooltip rather
 * than a hand-rolled one.
 *
 * The editor (shared-react's StructureKeyboardPlugin) publishes the armed state to its root as
 * `data-verse-delete-intent`/`data-verse-delete-kind` and marks the armed marker with
 * `verse-selected`; this overlay observes those DOM signals and anchors a Tooltip to the marker.
 * Mirrors {@link ../paragraph-marker-tooltip/paragraph-marker-tooltip-overlay.component}.
 */
export function VerseDeleteTooltipOverlay({ children }: Props) {
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
  const message = localizedStrings[messageKey];

  return (
    <div ref={positionAnchorRef} className="tw:relative">
      {children}
      <TooltipProvider>
        {/* onOpenChange no-op satisfies Radix's controlled-component contract and silences the dev warning */}
        <Tooltip open={!!armed} onOpenChange={() => {}}>
          <TooltipTrigger
            aria-hidden="true"
            tabIndex={-1}
            className={cn(
              'tw:absolute tw:opacity-0 tw:pointer-events-none',
              'tw:p-0 tw:border-0 tw:bg-transparent tw:cursor-default tw:min-w-0 tw:min-h-0',
            )}
            style={{
              top: armed?.top ?? 0,
              left: armed?.left ?? 0,
              width: armed?.width ?? 0,
              height: armed?.height ?? 0,
            }}
          />
          <TooltipContent
            side="bottom"
            align="start"
            showArrow={false}
            // Padding moves onto the inner div below so its tint background can reach the
            // tooltip's rounded edges instead of leaving an untinted padding gutter. Also zero out
            // TooltipContent's has-data-[slot=kbd]:pe-1.5 (the Kbd we render always matches it) —
            // that :has() selector otherwise out-specificities a plain tw:p-0 and leaves a gap on
            // the trailing edge.
            className={cn(
              'tw:p-0 tw:has-data-[slot=kbd]:pe-0 tw:bg-background tw:text-destructive tw:border tw:border-destructive',
            )}
          >
            {armed ? (
              <div className="tw:inline-flex tw:w-full tw:h-full tw:items-center tw:gap-1.5 tw:rounded-md tw:bg-destructive/10 tw:px-3 tw:py-1.5">
                {formatReplacementStringToArray(message, {
                  key: (
                    <Kbd
                      className={cn(
                        // Kbd's base styling sets text-muted-foreground (unconditioned) plus
                        // in-data-[slot=tooltip-content]:text-background (for the default dark
                        // tooltip). Override both forms explicitly so tailwind-merge drops both
                        // base rules instead of leaving the winner up to CSS cascade order.
                        'tw:border tw:border-destructive tw:text-destructive tw:in-data-[slot=tooltip-content]:text-destructive',
                      )}
                    >
                      {confirmingKey(armed.intent)}
                    </Kbd>
                  ),
                }).map((part, index) => (
                  // The array is static per render (one fixed localized string + one kbd), so index
                  // is a stable, safe key — mirrors the about-dialog.component.tsx precedent.
                  // eslint-disable-next-line react/no-array-index-key
                  <Fragment key={`key-${index}`}>{part}</Fragment>
                ))}
              </div>
            ) : undefined}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
}
