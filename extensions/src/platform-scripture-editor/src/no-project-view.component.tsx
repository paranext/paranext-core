import { Empty, EmptyDescription, EmptyHeader, EmptyTitle } from 'platform-bible-react';
import {
  NO_PROJECT_VIEW_KEYS,
  type NoProjectViewLocalizedStrings,
  type NoProjectViewStringKey,
} from './no-project-view.const';
import type { ProjectPresence } from './use-project-presence.hook';

const { NO_PROJECT_SELECTED_KEY, NO_PROJECTS_TITLE_KEY, NO_PROJECTS_DESCRIPTION_KEY } =
  NO_PROJECT_VIEW_KEYS;

// Re-exported so consumers keep importing the view's contract from the view.
export {
  NO_PROJECT_VIEW_STRING_KEYS,
  type NoProjectViewLocalizedStrings,
  type NoProjectViewStringKey,
} from './no-project-view.const';

const localize = (strings: NoProjectViewLocalizedStrings, key: NoProjectViewStringKey) =>
  strings[key] ?? key;

export type NoProjectViewProps = {
  /** Whether the user has any project of their own. Only `none` shows the guidance. */
  presence: ProjectPresence;
  /** Localized strings for both contents. Missing strings fall back to their keys. */
  localizedStrings?: NoProjectViewLocalizedStrings;
};

/**
 * Replaces the editor canvas when the editor has no project. When the user has no projects at all
 * it explains how to get one — register Paratext, or ask a project administrator — and otherwise it
 * says no project is selected.
 *
 * Accessibility: only the guidance is announced. It renders into a `role="status"` region that
 * stays mounted, empty, in the other state, so its arrival is announced as a change. The plain "No
 * project selected" sits outside the region: every Simple launch passes through it before a project
 * opens, and announcing it would tell a user with projects that none is selected. The inner `Empty`
 * carries no role of its own; nested live regions announce twice or not at all. Focus is left
 * alone: there is no editor content in this state for focus to have been lost from.
 */
export function NoProjectView({ presence, localizedStrings = {} }: NoProjectViewProps) {
  const isShowingGuidance = presence === 'none';

  return (
    <div className="tw:flex tw:h-full tw:items-center tw:justify-center tw:px-4">
      {!isShowingGuidance && localize(localizedStrings, NO_PROJECT_SELECTED_KEY)}
      <div role="status">
        {isShowingGuidance && (
          <Empty>
            <EmptyHeader>
              {/* `EmptyTitle` renders a `div`, not a heading. This message is the entire content of
                  the editor panel, so it needs a real heading for structure-based navigation. */}
              <EmptyTitle>
                <h2>{localize(localizedStrings, NO_PROJECTS_TITLE_KEY)}</h2>
              </EmptyTitle>
              <EmptyDescription>
                {localize(localizedStrings, NO_PROJECTS_DESCRIPTION_KEY)}
              </EmptyDescription>
            </EmptyHeader>
          </Empty>
        )}
      </div>
    </div>
  );
}
