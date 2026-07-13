import type PapiBackend from '@papi/backend';
import { getErrorMessage, serialize, type PlatformEventEmitter } from 'platform-bible-utils';
import { SCRIPTURE_EDITOR_WEBVIEW_TYPE } from './platform-scripture-editor.utils';

const BIBLE_TEXTS_PANEL_WEBVIEW_TYPE = 'platformScriptureEditor.bibleTexts';
const COMMENTARIES_PANEL_WEBVIEW_TYPE = 'platformScriptureEditor.commentaries';

/** Reads the three admin layout settings for a project and serializes them into a signature. */
async function readLayoutSignature(papi: typeof PapiBackend, projectId: string): Promise<string> {
  const pdp = await papi.projectDataProviders.get('platform.base', projectId);
  const [modelTexts, resources, tab] = await Promise.all([
    pdp.getSetting('platformScripture.modelTexts'),
    pdp.getSetting('platformScripture.referencedProjectsAndResources'),
    pdp.getSetting('platformScripture.sharedLayoutDefaultTab'),
  ]);
  return serialize({ modelTexts, resources, tab });
}

/** Maps a `sharedLayoutDefaultTab` value to the col-3 panel web view type, or `undefined`. */
function webViewTypeForTab(tab: string | undefined): string | undefined {
  if (tab === 'ScriptureResource') return BIBLE_TEXTS_PANEL_WEBVIEW_TYPE;
  if (tab === 'CommentaryResource') return COMMENTARIES_PANEL_WEBVIEW_TYPE;
  return undefined;
}

/**
 * Applies the admin's col-3 active tab for a project by bringing the matching resource panel to
 * front (PAPI has no direct `focusTab` for extensions; bring-to-front on an existing web view is
 * equivalent). No-op when the setting is unset/unrecognized. Never throws.
 */
export async function focusSharedLayoutDefaultTab(
  papi: typeof PapiBackend,
  projectId: string,
): Promise<void> {
  try {
    const pdp = await papi.projectDataProviders.get('platform.base', projectId);
    const tab = await pdp.getSetting('platformScripture.sharedLayoutDefaultTab');
    const webViewType = webViewTypeForTab(typeof tab === 'string' ? tab : undefined);
    if (!webViewType) return;
    await papi.webViews.openWebView(webViewType, undefined, {
      existingId: '?',
      createNewIfNotFound: false,
      bringToFront: true,
    });
  } catch (e) {
    papi.logger.warn(`focusSharedLayoutDefaultTab failed for ${projectId}: ${getErrorMessage(e)}`);
  }
}

/**
 * Coordinates team-member receipt of a shared layout. On each Send/Receive completion, if the open
 * simple-mode project's layout changed and the sync was not a known auto-sync, it notifies the
 * member with an "Apply now" action; the reactive panels keep holding until the member applies.
 * Auto-syncs (project switch) and confirmations apply immediately: re-arm the panels + focus the
 * col-3 tab. All state is in-memory and lost on app close.
 */
export class SharedLayoutReceiver {
  private readonly lastAppliedSignatureByProjectId = new Map<string, string>();

  private readonly pendingNotifiedSignatureByProjectId = new Map<string, string>();

  private readonly projectIdByNotificationId = new Map<string | number, string>();

  private readonly autoSyncProjectIds = new Set<string>();

  private readonly unsubscribe: () => void;

  /**
   * Serializes `handleSyncCompleted` runs. `onSyncStateChanged` completions are
   * fired-and-forgotten, so overlapping ones could otherwise interleave between the auto-mark /
   * dedup reads and their write-backs and double-notify. Chaining each run after the previous keeps
   * the checks atomic.
   */
  private handling: Promise<void> = Promise.resolve();

  constructor(
    private readonly papi: typeof PapiBackend,
    private readonly reArmEmitter: PlatformEventEmitter<{ projectId: string }>,
  ) {
    this.unsubscribe = this.papi.network.getNetworkEvent<{ isSyncing: boolean }>(
      'paratextBibleSendReceive.onSyncStateChanged',
    )(({ isSyncing }) => {
      if (!isSyncing)
        this.handling = this.handling
          .then(() => this.handleSyncCompleted())
          .catch((e) =>
            this.papi.logger.warn(`Shared-layout sync handler failed: ${getErrorMessage(e)}`),
          );
    });
  }

  /**
   * Mark that an in-flight sync for this project was initiated by us (auto), so its completion
   * applies silently instead of prompting the member.
   *
   * Accepted v1 risk: `onSyncStateChanged` carries only `{ isSyncing }` — no sync or project id —
   * so this mark is consumed by whichever matching-project sync completes first. If an unrelated
   * sync for the same project completes before the intended auto-sync, it consumes the mark and the
   * real project-switch sync is then mis-categorized as manual. This is inherent to the event shape
   * and documented as an accepted risk in the design spec; it is deliberate, not an oversight.
   */
  markAutoSync(projectId: string): void {
    this.autoSyncProjectIds.add(projectId);
  }

  /** Apply the current synced layout for a project: re-arm panels, focus col-3 tab, note applied. */
  async applyForProject(projectId: string): Promise<void> {
    this.reArmEmitter.emit({ projectId });
    await focusSharedLayoutDefaultTab(this.papi, projectId);
    try {
      this.lastAppliedSignatureByProjectId.set(
        projectId,
        await readLayoutSignature(this.papi, projectId),
      );
    } catch (e) {
      this.papi.logger.warn(`Could not read applied layout signature: ${getErrorMessage(e)}`);
    }
    this.pendingNotifiedSignatureByProjectId.delete(projectId);
  }

  /** "Apply now" handler: apply the layout for the project tied to the notification, then dismiss. */
  async applyFromNotification(notificationId: string | number): Promise<void> {
    const projectId = this.projectIdByNotificationId.get(notificationId);
    if (!projectId) return;
    await this.applyForProject(projectId);
    try {
      await this.papi.notifications.dismiss(notificationId);
    } finally {
      // Drop the mapping even if dismiss throws so the entry can't leak.
      this.projectIdByNotificationId.delete(notificationId);
    }
  }

  dispose(): void {
    this.unsubscribe();
  }

  private async getOpenSimpleModeProjectId(): Promise<string | undefined> {
    if ((await this.papi.settings.get('platform.interfaceMode')) !== 'simple') return undefined;
    const defs = await this.papi.webViews.getAllOpenWebViewDefinitions();
    const editor = defs.find(
      (def) => def.webViewType === SCRIPTURE_EDITOR_WEBVIEW_TYPE && !def.state?.isReadOnly,
    );
    return editor?.projectId;
  }

  private async handleSyncCompleted(): Promise<void> {
    const projectId = await this.getOpenSimpleModeProjectId();
    if (!projectId) return;

    // Auto-sync (e.g. project switch): apply silently, no notification.
    if (this.autoSyncProjectIds.has(projectId)) {
      this.autoSyncProjectIds.delete(projectId);
      await this.applyForProject(projectId);
      return;
    }

    // Fail-open: this read intentionally relies on the outer catch (subscription handler). Unlike
    // `applyForProject`'s signature read — caught locally so an apply still completes — a failure
    // here should abort the notify path entirely rather than notify with an unknown signature.
    const signature = await readLayoutSignature(this.papi, projectId);
    if (signature === this.lastAppliedSignatureByProjectId.get(projectId)) return; // unchanged
    if (signature === this.pendingNotifiedSignatureByProjectId.get(projectId)) return; // already asked

    // Record the pending/notification bookkeeping only AFTER a successful send. If `send` throws,
    // the outer catch logs it and nothing is retained, so the next sync with this same changed
    // layout notifies again rather than being silently suppressed as "already asked".
    const notificationId = await this.papi.notifications.send({
      severity: 'info',
      message: '%sharedLayout_newLayoutAvailable%',
      clickCommand: 'platformScriptureEditor.applySharedLayout',
      clickCommandLabel: '%sharedLayout_applyNow%',
    });
    this.projectIdByNotificationId.set(notificationId, projectId);
    this.pendingNotifiedSignatureByProjectId.set(projectId, signature);
  }
}
