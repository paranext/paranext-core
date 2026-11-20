/*
 * The Scripture editor's toolbar as Simple mode shows it, built from the same components
 * `platform-scripture-editor.web-view.tsx` puts in its `TabToolbar`: the project menu (hamburger),
 * Undo and Redo, the paragraph-style trigger, then — at the end — Edit team layout and the USFM
 * structure lock; Edit team layout carries the unsent-changes dot while a saved team layout has
 * not been sent. The pieces that read project data through PAPI (`TeamLayoutButton`,
 * `StructureProtectionButton`) are stood in for by what they render: the same button, and the
 * presentational `LockToggleButtonView`.
 *
 * Nothing here edits text: Undo and Redo stay disabled, the hamburger's menu is empty, and the
 * paragraph-style menu only closes. Edit team layout opens whatever `onEditTeamLayout` opens.
 */

import { PanelsTopLeft } from 'lucide-react';
import {
  Button,
  MARKER_MENU_STRING_KEYS,
  type MarkerMenuItem,
  TabToolbar,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
  UNDO_REDO_BUTTONS_STRING_KEYS,
  UndoRedoButtons,
} from 'platform-bible-react';
import type { Localized, MultiColumnMenu } from 'platform-bible-utils';
import { useMemo, useState } from 'react';
import { getLocalizedStrings } from '../../../.storybook/localization.utils';
import {
  ParagraphStyleTrigger,
  PARAGRAPH_STYLE_TRIGGER_STRING_KEYS,
} from '../../../extensions/src/platform-scripture-editor/src/paragraph-style-trigger.component';
import {
  LockToggleButtonView,
  STRUCTURE_PROTECTION_BUTTON_STRING_KEYS,
  type ShortcutSpec,
} from '../../../extensions/src/platform-scripture-editor/src/structure-protection-button.component';
import { TEAM_LAYOUT_BUTTON_STRING_KEYS } from '../../../extensions/src/platform-scripture-editor/src/team-layout-button.component';
import { useParagraphMenuOpenState } from '../../../extensions/src/platform-scripture-editor/src/use-paragraph-menu-open-state.hook';

const LOCALIZED_STRINGS = getLocalizedStrings([
  ...UNDO_REDO_BUTTONS_STRING_KEYS,
  ...PARAGRAPH_STYLE_TRIGGER_STRING_KEYS,
  ...MARKER_MENU_STRING_KEYS,
  ...STRUCTURE_PROTECTION_BUTTON_STRING_KEYS,
  ...TEAM_LAYOUT_BUTTON_STRING_KEYS,
]);

const TEAM_LAYOUT_LABEL =
  LOCALIZED_STRINGS['%webView_platformScriptureEditor_teamLayout_ariaLabel%'] ??
  '%webView_platformScriptureEditor_teamLayout_ariaLabel%';

/** The hamburger's menu. Empty: only the button is part of this design idea. */
const PROJECT_MENU: Localized<MultiColumnMenu> = { columns: {}, groups: {}, items: [] };

const PARAGRAPH_MARKERS: MarkerMenuItem[] = [
  {
    marker: 'p',
    title: 'Paragraph',
    subtitle: 'normal (with indent first line)',
    action: () => {},
  },
  { marker: 'm', title: 'Margin Paragraph', subtitle: 'no first line indent', action: () => {} },
  { marker: 'q1', title: 'Poetic Line Level 1', action: () => {} },
  { marker: 'q2', title: 'Poetic Line Level 2', action: () => {} },
];

/** Ctrl/Cmd+Shift+L, as `StructureProtectionButton` binds it. */
const STRUCTURE_LOCK_SHORTCUT: ShortcutSpec = {
  matches: (event) =>
    (event.ctrlKey || event.metaKey) &&
    event.shiftKey &&
    !event.altKey &&
    event.key.toLowerCase() === 'l',
  hint: 'Ctrl+Shift+L',
};

const doNothing = () => {};

export function SimpleEditorToolbar({
  onEditTeamLayout,
  teamLayoutNotSentTooltip,
}: {
  /** Opens the Team layout dialog, as `TeamLayoutButton` does for a project administrator. */
  onEditTeamLayout?: () => void;
  /**
   * Set while a team layout saved on this computer has not been sent: the button carries the dot of
   * a project with unsent changes, and this is its tooltip.
   */
  teamLayoutNotSentTooltip?: string;
} = {}) {
  // Starts protected, as a Simple-mode project does. The lock also disables the paragraph-style
  // trigger, as in the editor.
  const [isStructureProtected, setIsStructureProtected] = useState(true);
  const { isMenuOpen, setIsMenuOpen } = useParagraphMenuOpenState({
    isReadOnly: false,
    isStructureProtected,
    hasBlockMarker: true,
    notifyStructureProtected: doNothing,
  });
  const markerMenuItems = useMemo(() => PARAGRAPH_MARKERS, []);

  return (
    <TabToolbar
      projectMenuData={PROJECT_MENU}
      onSelectProjectMenuItem={doNothing}
      onSelectViewInfoMenuItem={doNothing}
      startAreaChildren={
        <>
          <UndoRedoButtons
            className="tw:h-8"
            onUndoClick={doNothing}
            onRedoClick={doNothing}
            canUndo={false}
            canRedo={false}
            localizedStrings={LOCALIZED_STRINGS}
          />
          <ParagraphStyleTrigger
            blockMarker="p"
            styleName="Paragraph"
            isStructureProtected={isStructureProtected}
            markerMenuItems={markerMenuItems}
            localizedStrings={LOCALIZED_STRINGS}
            isMenuOpen={isMenuOpen}
            onMenuOpenChange={setIsMenuOpen}
            onReturnFocusToEditor={doNothing}
          />
        </>
      }
      endAreaChildren={
        <>
          {/* The end area is flex-row-reverse, so the lock comes first to render last. */}
          <LockToggleButtonView
            isLocked={isStructureProtected}
            isDisabled={false}
            isStateLoading={false}
            onToggle={() => setIsStructureProtected((isProtected) => !isProtected)}
            unlockedTooltipKey="%webView_platformScriptureEditor_structureProtection_stateEditable%"
            lockedTooltipKey="%webView_platformScriptureEditor_structureProtection_stateProtected%"
            disabledTooltipKey="%webView_platformScriptureEditor_structureProtection_lockedByAdmin%"
            ariaLabelKey="%webView_platformScriptureEditor_structureProtection_ariaLabel%"
            shortcut={STRUCTURE_LOCK_SHORTCUT}
            localizedStrings={LOCALIZED_STRINGS}
            className="tw:h-8"
          />
          {/* What `TeamLayoutButton` renders for a project administrator. */}
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  aria-label={TEAM_LAYOUT_LABEL}
                  aria-description={teamLayoutNotSentTooltip}
                  onClick={onEditTeamLayout}
                  className="tw:relative tw:h-8"
                  size="icon"
                  variant="ghost"
                >
                  <PanelsTopLeft />
                  {teamLayoutNotSentTooltip && (
                    <span className="tw:absolute tw:end-1 tw:top-1 tw:h-2 tw:w-2 tw:rounded-full tw:bg-primary" />
                  )}
                </Button>
              </TooltipTrigger>
              <TooltipContent>{teamLayoutNotSentTooltip ?? TEAM_LAYOUT_LABEL}</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </>
      }
    />
  );
}

export default SimpleEditorToolbar;
