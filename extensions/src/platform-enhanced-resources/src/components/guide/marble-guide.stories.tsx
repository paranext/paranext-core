import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { useCallback, useState } from 'react';
import { Button } from 'platform-bible-react';
import { getLocalizedStrings } from '../../../../../../.storybook/localization.utils';
// Single source of truth for the extension-local `--er-*` color tokens. Side-effect import so
// Storybook (which doesn't load the extension's web-view SCSS bundle) injects the same
// `:root { --er-* }` declarations via style-loader.
import '../../_er-tokens.scss';
import { MarbleGuide, MARBLE_GUIDE_STRING_KEYS } from './marble-guide.component';

const localizedStrings = getLocalizedStrings([...MARBLE_GUIDE_STRING_KEYS]);

const meta: Meta<typeof MarbleGuide> = {
  title: 'Bundled Extensions/platform-enhanced-resources/MarbleGuide',
  component: MarbleGuide,
  tags: ['autodocs'],
  // Args are intentionally minimal - the Default story drives every prop through real state.
  // Defining args at the meta level would suggest static-args usage and conflict with the
  // controlled-state interactive flow this WP requires (see Theme 4 / SB #2 in the feedback brief).
  decorators: [
    (Story) => (
      // The Dialog renders into a portal at document.body, so the surrounding container exists
      // mostly to provide a stable backdrop in the Storybook canvas.
      <div className="tw:relative tw:h-[720px] tw:w-[1024px] tw:border tw:border-border tw:bg-muted/40">
        <div className="tw:p-4 tw:text-sm tw:text-muted-foreground">
          MarbleGuide Dialog renders in a portal - look at the centred modal.
        </div>
        <Story />
      </div>
    ),
  ],
};
export default meta;

/**
 * Default - the only story for MarbleGuide. Theme 4 / SB #2 of the phase-3-ui-design feedback brief
 * requires a single fully-interactive story per component, driven by `useState` over the real
 * `MarbleGuide` Dialog rather than a static-args snapshot.
 *
 * What this story demonstrates:
 *
 * - Open the Dialog via the "Show guide" trigger button.
 * - Close the Dialog via the in-dialog Close button, the built-in Esc key, the overlay click, or the
 *   shadcn Dialog X corner button (all funnel through `onOpenChange` -> `onClose`).
 * - Toggle the "Don't show this again" checkbox; the new value is observable in the inline
 *   "neverShowAgain" / "lastPersisted" lines below the trigger so a reviewer can confirm the
 *   close-with-preference-save flow without opening devtools.
 * - Keyboard navigation: Tab cycles between Close button and the checkbox; Esc closes. shadcn Dialog
 *   provides focus trap + Tab routing automatically.
 *
 * No `NeverShowAgainChecked`, `Closed`, or static-args `Interactive` stories - those states are all
 * reachable from this interactive flow (toggle the checkbox to reach the "checked" state; close to
 * reach the "closed" state).
 */
export const Default: StoryObj<typeof MarbleGuide> = {
  parameters: { chromatic: { disableSnapshot: true } },
  render: function Render() {
    // Controller state: mirrors the parent contract from MarbleGuideFormState in
    // ui-spec-marble-guide-form.md - `isVisible` (open) and `neverShowAgain`.
    const [open, setOpen] = useState(true);
    const [neverShowAgain, setNeverShowAgain] = useState(false);
    // `lastPersisted` mirrors what production wiring (phase-3-ui) will save to settings on close:
    // ShowMarbleGuide = !neverShowAgain. Surfaced inline so reviewers can verify that closing the
    // dialog after toggling the checkbox flows the new preference through `onClose`.
    const [lastPersisted, setLastPersisted] = useState<boolean | undefined>(undefined);

    const handleClose = useCallback(() => {
      // Production wiring will persist `showGuide = !neverShowAgain` here; the story records the
      // value that would be saved so the close-with-preference-save flow is observable.
      setLastPersisted(!neverShowAgain);
      setOpen(false);
    }, [neverShowAgain]);

    const handleNeverShowAgainChange = useCallback((next: boolean) => {
      setNeverShowAgain(next);
    }, []);

    const handleReopen = useCallback(() => {
      setOpen(true);
    }, []);

    return (
      <div className="tw:flex tw:flex-col tw:gap-3 tw:p-4">
        <div className="tw:flex tw:flex-wrap tw:items-center tw:gap-3">
          <Button
            type="button"
            onClick={handleReopen}
            disabled={open}
            data-testid="story-show-guide-button"
          >
            Show guide
          </Button>
          <span
            className="tw:text-sm tw:text-muted-foreground"
            data-testid="story-state-display-never-show-again"
          >
            neverShowAgain = {neverShowAgain ? 'true' : 'false'}
          </span>
          <span
            className="tw:text-sm tw:text-muted-foreground"
            data-testid="story-state-display-last-persisted"
          >
            lastPersisted (showGuide saved on last close) ={' '}
            {lastPersisted === undefined ? '(none yet)' : (!lastPersisted).toString()}
          </span>
        </div>
        <p className="tw:text-sm tw:text-muted-foreground">
          Click <strong>Show guide</strong> to (re)open the Dialog. Toggle the checkbox inside the
          Dialog and close via the Close button, Esc, the X corner button, or the overlay click; the
          inline lines above reflect the live <code>neverShowAgain</code> value plus the
          <code> showGuide </code>preference that wiring would persist on close.
        </p>
        <MarbleGuide
          open={open}
          neverShowAgain={neverShowAgain}
          onClose={handleClose}
          onNeverShowAgainChange={handleNeverShowAgainChange}
          localizedStringsWithLoadingState={[localizedStrings, false]}
        />
      </div>
    );
  },
};
