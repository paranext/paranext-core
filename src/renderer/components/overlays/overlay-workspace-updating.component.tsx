import { useLocalizedStrings } from '@renderer/hooks/papi-hooks';
import {
  getWorkspaceUpdating,
  subscribeToWorkspaceUpdating,
} from '@renderer/services/workspace-updating-store';
import { Button, Progress, Spinner, Z_INDEX_MODAL } from 'platform-bible-react';
import { LocalizeKey } from 'platform-bible-utils';
import {
  type FocusEvent,
  type KeyboardEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { createPortal } from 'react-dom';

const WORKSPACE_UPDATING_KEY: LocalizeKey = '%overlay_workspaceUpdating%';

const LOCALIZED_STRING_KEYS: LocalizeKey[] = [WORKSPACE_UPDATING_KEY];

/** Z-index below modals so modal dialogs remain accessible during a project switch */
const Z_INDEX_WORKSPACE_UPDATING = Z_INDEX_MODAL - 1;

type Props = {
  label: string;
  /** Localized label for the Cancel button. Only rendered when onCancel is provided. */
  cancelLabel?: string;
  /** Whether the Cancel button can be clicked (e.g. false after a single-shot cancel fired) */
  isCancelEnabled?: boolean;
  /**
   * When provided, a Cancel button is rendered under the label and the overlay contains focus: the
   * container is focused on mount (so mid-keystroke input can't land in the covered editor) and
   * Tab/Shift+Tab cannot move focus outside the overlay.
   */
  onCancel?: () => void;
  /**
   * Live progress status text rendered under the label: for determinate progress the current item
   * (e.g. a project name), for indeterminate progress a complete localized message. Omitted → no
   * progress area is rendered (the legacy project-switch overlay).
   */
  progressText?: string;
  /**
   * Determinate progress as a 0–1 fraction, rendered as a progress bar under the progress text.
   * Undefined while progressText is provided means indeterminate progress.
   */
  progressValue?: number;
};

export function WorkspaceUpdatingOverlayPresentational({
  label,
  cancelLabel,
  isCancelEnabled,
  onCancel,
  progressText,
  progressValue,
}: Props) {
  // React's useRef requires null as the initial value for DOM refs
  // eslint-disable-next-line no-null/no-null
  const containerRef = useRef<HTMLDivElement>(null);
  // React's useRef requires null as the initial value for DOM refs
  // eslint-disable-next-line no-null/no-null
  const cancelButtonRef = useRef<HTMLButtonElement>(null);

  // Focus the overlay container on mount so mid-keystroke input lands here instead of a focused
  // editor. The container rather than the Cancel button, so a Space/Enter typed just as the
  // overlay appears can't silently cancel the sync — cancelling deliberately remains Tab (to the
  // button) + Enter, or a click. Focused via ref because jsx-a11y flags the autoFocus attribute.
  // No-op in legacy (no onCancel) mode: the ref is only attached in cancel mode.
  useEffect(() => {
    containerRef.current?.focus();
  }, []);

  // Trap Tab/Shift+Tab: the Cancel button is the only tab stop under the overlay, so tabbing must
  // not escape to the (covered but still mounted) editor beneath.
  const handleKeyDown = useCallback((event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key !== 'Tab') return;
    event.preventDefault();
    cancelButtonRef.current?.focus();
  }, []);

  // Re-contain focus if it leaves the overlay (e.g. programmatic focus elsewhere, or the button
  // disabling itself after a click). relatedTarget is where focus is headed; when it is missing
  // (body/nowhere) or outside the container, pull focus back.
  const handleBlur = useCallback((event: FocusEvent<HTMLDivElement>) => {
    const container = containerRef.current;
    if (!container) return;
    if (event.relatedTarget && container.contains(event.relatedTarget)) return;
    // Refocus after the in-flight focus transition completes: while focusout is dispatching, the
    // focus move has not been committed yet, so a synchronous focus() here can be dropped. The
    // activeElement re-check avoids stealing focus back if it ended up inside after all.
    queueMicrotask(() => {
      const active = document.activeElement;
      if (active && container.contains(active)) return;
      container.focus();
    });
  }, []);

  // Two complete literals rather than a template with a conditional suffix: the tailwindcss
  // prettier plugin rewrites class strings inside template-literal expressions and can drop the
  // separating space. Cancel mode adds tw:outline-none to suppress the focus ring on the
  // (programmatically focused) plain background div.
  const containerClassName = onCancel
    ? 'tw:fixed tw:inset-0 tw:flex tw:flex-col tw:items-center tw:justify-center tw:gap-3 tw:bg-background tw:outline-none'
    : 'tw:fixed tw:inset-0 tw:flex tw:flex-col tw:items-center tw:justify-center tw:gap-3 tw:bg-background';

  return (
    <div className="pr-twp">
      {/* Focus containment is only active in cancel mode (onCancel provided); without it the
          rendered output and behavior are unchanged from the original project-switch overlay.
          tabIndex -1 makes the container programmatically focusable without adding a tab stop. */}
      {/* The container is a focus sink, not an interactive control; key handling only traps Tab */}
      {/* eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions */}
      <div
        ref={onCancel ? containerRef : undefined}
        role="status"
        tabIndex={onCancel ? -1 : undefined}
        onKeyDown={onCancel ? handleKeyDown : undefined}
        onBlur={onCancel ? handleBlur : undefined}
        className={containerClassName}
        // For some reason, applying tw:top-12 tw:right-2 tw:bottom-2 tw:left-2 instead of tw:inset-0 did not work.
        // The top value of 48px corresponds to the height (tw:h-12) of the toolbar, and the other insets allow for window borders.
        // Originally, I used 8px insets to match the window border size, but currently some content can drift into the border area,
        // making the border look dirty, so I am now using 2px borders, but maybe we can things up and revisit this.
        style={{ zIndex: Z_INDEX_WORKSPACE_UPDATING, top: 48, right: 2, bottom: 2, left: 2 }}
      >
        <Spinner />
        <p className="tw:text-sm tw:font-medium">{label}</p>
        {progressText !== undefined && (
          <p className="tw:text-sm tw:text-muted-foreground">{progressText}</p>
        )}
        {/* platform-bible-react's Progress (shadcn/Radix) has no indeterminate visual — without a
            value it renders an empty track — so the bar only appears for determinate progress;
            indeterminate progress is shown as text only. */}
        {progressValue !== undefined && (
          <Progress value={progressValue * 100} className="tw:w-64" />
        )}
        {onCancel && (
          <Button ref={cancelButtonRef} disabled={!isCancelEnabled} onClick={onCancel}>
            {cancelLabel}
          </Button>
        )}
      </div>
    </div>
  );
}

export function WorkspaceUpdatingOverlay() {
  const [isUpdating, setIsUpdating] = useState(getWorkspaceUpdating);

  const syncState = useCallback(() => {
    setIsUpdating(getWorkspaceUpdating());
  }, []);

  useEffect(() => {
    syncState();
    return subscribeToWorkspaceUpdating(syncState);
  }, [syncState]);

  const [localizedStrings] = useLocalizedStrings(LOCALIZED_STRING_KEYS);

  if (!isUpdating) return undefined;

  // Bypasses OverlayHost intentionally: this overlay must cover the editor content area.
  // Rendered below modals (Z_INDEX_MODAL - 1) so any modal that appears during the transition
  // remains accessible. A future cleanup could extend the OverlayHost type system to include
  // a loadingSpinner type.
  return createPortal(
    <WorkspaceUpdatingOverlayPresentational label={localizedStrings[WORKSPACE_UPDATING_KEY]} />,
    document.body,
  );
}

export default WorkspaceUpdatingOverlay;
