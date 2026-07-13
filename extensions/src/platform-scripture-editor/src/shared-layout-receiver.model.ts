import type PapiBackend from '@papi/backend';
import { getErrorMessage, serialize, type PlatformEventEmitter } from 'platform-bible-utils';

const BIBLE_TEXTS_PANEL_WEBVIEW_TYPE = 'platformScriptureEditor.bibleTexts';
const COMMENTARIES_PANEL_WEBVIEW_TYPE = 'platformScriptureEditor.commentaries';
const SCRIPTURE_EDITOR_WEBVIEW_TYPE = 'platformScriptureEditor.react';

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

  constructor(
    private readonly papi: typeof PapiBackend,
    private readonly reArmEmitter: PlatformEventEmitter<{ projectId: string }>,
  ) {
    this.unsubscribe = this.papi.network.getNetworkEvent<{ isSyncing: boolean }>(
      'paratextBibleSendReceive.onSyncStateChanged',
    )(({ isSyncing }) => {
      if (!isSyncing)
        this.handleSyncCompleted().catch((e) =>
          this.papi.logger.warn(`Shared-layout sync handler failed: ${getErrorMessage(e)}`),
        );
    });
  }

  /** Mark that an in-flight sync for this project was initiated by us (auto). */
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
    await this.papi.notifications.dismiss(notificationId);
    this.projectIdByNotificationId.delete(notificationId);
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

    const signature = await readLayoutSignature(this.papi, projectId);
    if (signature === this.lastAppliedSignatureByProjectId.get(projectId)) return; // unchanged
    if (signature === this.pendingNotifiedSignatureByProjectId.get(projectId)) return; // already asked

    this.pendingNotifiedSignatureByProjectId.set(projectId, signature);
    const notificationId = await this.papi.notifications.send({
      severity: 'info',
      message: '%sharedLayout_newLayoutAvailable%',
      clickCommand: 'platformScriptureEditor.applySharedLayout',
      clickCommandLabel: '%sharedLayout_applyNow%',
    });
    this.projectIdByNotificationId.set(notificationId, projectId);
  }
}
