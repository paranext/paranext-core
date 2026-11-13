/*
 * What happens after the Team layout dialog saves, in the "Save and sync" design: "Save and sync"
 * runs a Send/Receive for the project right away; Save alone, or a Send/Receive that fails, leaves the layout not sent yet. A not-sent layout puts the project in need of a Sync
 * (its dot), and the Edit team layout button, the dialog and Home's Sync reason say so until a
 * Sync succeeds. Confirmation and failure show as toasts (`sonner`; render a `Sonner` alongside).
 */

import { sonner } from 'platform-bible-react';
import { useState } from 'react';
import type { UnifiedItem } from './home-unified.component';
import type { UnifiedCatalog } from './use-unified-catalog.hook';

const STRINGS = {
  sent: 'Team layout sent. Members get it at their next Send/Receive.',
  sendFailed: 'Team layout saved, but not sent. Sync {project} when you’re back online.',
  notSentTooltip: 'Team layout saved {date}. Sync to share it with the team.',
} as const;

/** "Nov 5": the day a team layout was saved, in the not-sent notices. */
export const TEAM_LAYOUT_SAVED_DATE_FORMAT = new Intl.DateTimeFormat(undefined, {
  month: 'short',
  day: 'numeric',
});

/** The Edit team layout button's tooltip while the project's saved layout has not been sent. */
export function teamLayoutNotSentTooltip(project: UnifiedItem | undefined): string | undefined {
  if (!project?.teamLayoutSavedIso) return undefined;
  return STRINGS.notSentTooltip.replace(
    '{date}',
    TEAM_LAYOUT_SAVED_DATE_FORMAT.format(new Date(project.teamLayoutSavedIso)),
  );
}

/** How long the story's failing Send/Receive takes, as the mock catalog's Sync does. */
const SYNC_DURATION_MS = 700;

export type TeamLayoutSend = {
  /** A Send/Receive for the project is running. */
  isSyncing: (project: UnifiedItem | undefined) => boolean;
  /** Call after the dialog saves: sends the layout now, or records it as not sent. */
  afterSave: (project: UnifiedItem, send: boolean) => void;
  /** Sends a saved layout: a Send/Receive for the project. */
  syncNow: (project: UnifiedItem) => void;
};

export function useTeamLayoutSend(
  catalog: UnifiedCatalog,
  /** The story's switch for an offline or failing Send/Receive. */
  isSendFailing = false,
): TeamLayoutSend {
  const [failingSyncIds, setFailingSyncIds] = useState<ReadonlySet<string>>(new Set());

  const send = (project: UnifiedItem) => {
    const failedMessage = STRINGS.sendFailed.replace('{project}', project.shortName);
    if (isSendFailing) {
      setFailingSyncIds((ids) => new Set(ids).add(project.id));
      setTimeout(() => {
        setFailingSyncIds((ids) => new Set([...ids].filter((id) => id !== project.id)));
        catalog.markTeamLayoutUnsent(project.id);
        sonner.error(failedMessage);
      }, SYNC_DURATION_MS);
      return;
    }
    catalog
      .applyAction(project, { kind: 'sync' })
      .then(() => sonner.success(STRINGS.sent))
      .catch(() => sonner.error(failedMessage));
  };

  return {
    isSyncing: (project) =>
      project !== undefined &&
      (failingSyncIds.has(project.id) || catalog.inFlightIds.includes(project.id)),
    afterSave: (project, shouldSend) => {
      if (shouldSend) send(project);
      else catalog.markTeamLayoutUnsent(project.id);
    },
    syncNow: send,
  };
}
