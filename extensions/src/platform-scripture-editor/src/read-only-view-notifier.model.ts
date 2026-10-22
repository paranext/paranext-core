import papi, { logger } from '@papi/backend';
import { ExecutionToken, SavedWebViewDefinition, WebViewDefinition } from '@papi/core';
import {
  formatReplacementString,
  getErrorMessage,
  Mutex,
  MutexMap,
  Unsubscriber,
  UnsubscriberAsync,
} from 'platform-bible-utils';
import {
  SCRIPTURE_EDITOR_WEBVIEW_TYPE,
  showsReadOnlyPreview,
} from './platform-scripture-editor.utils';

/**
 * Time in milliseconds to wait before sending another notification informing the user that the
 * editor is read-only because it shows Preview
 */
const READONLY_NOTIFICATION_DISMISS_DURATION_MS = 24 * 60 * 60 * 1000;

/** Time in milliseconds to throttle repeat notifications for the same project */
const READONLY_NOTIFICATION_THROTTLE_MS = 8 * 1000;

/**
 * Notifier that tells users a Scripture Editor WebView is read-only because it shows Preview (Power
 * mode's formatted view). It announces once each time a WebView enters Preview, and only for a
 * project the user can edit. Allows dismissing notifications per-project for 24 hours.
 */
export class ReadOnlyViewNotifier {
  /** UserData storage key for the disabled map */
  private readonly disabledMapUserDataKey =
    'platformScriptureEditor.markerViewNotificationDisabled';

  /** Map of notification IDs to project IDs */
  private readonly projectIdsByNotificationId = new Map<string | number, string>();

  /** Map of project IDs to the time (in milliseconds) they were disabled */
  private disabledMap: Record<string, number> = {};
  /** Map of project IDs to timestamp (ms) of the last sent notification */
  private lastNotificationByProject: Record<string, number> = {};
  /** Map of per-project mutexes to avoid races when checking/updating last notification timestamps */
  private projectMutexes = new MutexMap();
  /** Map of editor WebView IDs to whether the WebView showed Preview when last handled */
  private readonly lastShownByWebViewId = new Map<string, boolean>();

  constructor(
    private papiInstance: typeof papi,
    private executionToken: ExecutionToken,
  ) {}

  /**
   * Starts the notifier by loading persisted state and registering necessary commands and listeners
   *
   * @returns Array of disposables for the registered commands and listeners
   */
  async start(): Promise<(Unsubscriber | UnsubscriberAsync)[]> {
    // Load persisted disable map once and cache it in memory
    try {
      const rawDisableMap =
        (await this.papiInstance.storage.readUserData(
          this.executionToken,
          this.disabledMapUserDataKey,
        )) ?? '{}';
      this.disabledMap = JSON.parse(rawDisableMap);
    } catch (e) {
      logger.warn(`Failed to load read-only-view disable map from storage: ${getErrorMessage(e)}`);
      this.disabledMap = {};
    }
    // Register command to dismiss for a project for 24 hours
    const dismissCommand = this.papiInstance.commands.registerCommand(
      'platformScriptureEditor.dismissMarkerNotificationForProjectToday',
      async (notificationId) => {
        if (!notificationId) return;
        const projectId = this.projectIdsByNotificationId.get(notificationId);
        if (!projectId) return;
        // Update in-memory map and persist
        this.disabledMap[projectId] = Date.now();
        try {
          await this.papiInstance.storage.writeUserData(
            this.executionToken,
            this.disabledMapUserDataKey,
            JSON.stringify(this.disabledMap),
          );
        } catch (e) {
          logger.warn(
            `Failed to persist read-only-view disable map for project ${projectId}: ${getErrorMessage(e)}`,
          );
        }
        // Clean up the runtime mapping
        this.projectIdsByNotificationId.delete(notificationId);
      },
      {
        method: {
          summary: "Don't show the read-only Preview notification for this project for 24 hours",
          params: [{ name: 'notificationId', required: true, schema: { type: 'string' } }],
          result: { name: 'return value', schema: { type: 'null' } },
        },
      },
    );

    // Listeners for new or updated webviews
    const onOpen = this.papiInstance.webViews.onDidOpenWebView(({ webView }) =>
      this.handleWebView(webView),
    );
    const onUpdate = this.papiInstance.webViews.onDidUpdateWebView(({ webView }) =>
      this.handleWebView(webView),
    );

    // A closed WebView's next appearance is a new entry, even if it reuses the ID
    const onClose = this.papiInstance.webViews.onDidCloseWebView(({ webView }) => {
      this.lastShownByWebViewId.delete(webView.id);
    });

    return [await dismissCommand, onOpen, onUpdate, onClose];
  }

  /**
   * Handles a WebView being opened or updated, sending a notification when it has just entered
   * Preview and notifications are not disabled for its project
   *
   * @param webViewDefinition WebView that was opened or updated
   */
  private async handleWebView(webViewDefinition: SavedWebViewDefinition | WebViewDefinition) {
    try {
      // We are only interested in our editor WebViews, so ignore others
      if (webViewDefinition.webViewType !== SCRIPTURE_EDITOR_WEBVIEW_TYPE) return;

      const isPowerMode =
        (await this.papiInstance.settings.get('platform.interfaceMode')) === 'power';
      const { projectId, state } = webViewDefinition;
      const isShowingPreview = showsReadOnlyPreview(state?.viewType, isPowerMode);

      // Announce only on the change into Preview. Every handled event updates the record, so
      // leaving Preview (including through a mode change) makes the next entry announce again.
      const wasShowingPreview = this.lastShownByWebViewId.get(webViewDefinition.id) ?? false;
      this.lastShownByWebViewId.set(webViewDefinition.id, isShowingPreview);
      if (!isShowingPreview || wasShowingPreview) return;

      // If no projectId, can't proceed. Just warn and be done
      if (!projectId) {
        logger.warn(
          `ReadOnlyViewNotifier found an editor view WebView (${webViewDefinition.id}) with no projectId!`,
        );
        return;
      }

      // If the view is already read-only for another reason, Preview adds nothing to announce
      if (state?.isReadOnly) return;

      // A user who cannot edit Scripture could not edit in any view. A failed lookup does not
      // suppress the notification.
      if (!(await this.canUserEditScripture(projectId))) return;

      // Check if this notification is disabled for this project
      const disabledTime = this.disabledMap[projectId];
      // If the disable time hasn't elapsed yet, don't send another notification
      if (disabledTime && Date.now() < disabledTime + READONLY_NOTIFICATION_DISMISS_DURATION_MS)
        return;

      // Acquire a per-project mutex and atomically check/reserve the last-notification timestamp
      // so we don't send the same notification multiple times in quick succession
      const projectMutex: Mutex = this.projectMutexes.get(projectId);
      await projectMutex.runExclusive(async () => {
        const lastSent = this.lastNotificationByProject[projectId];
        if (lastSent && Date.now() < lastSent + READONLY_NOTIFICATION_THROTTLE_MS) return;

        // Resolve project name if possible
        let projectName = projectId;
        try {
          const pdp = await this.papiInstance.projectDataProviders.get('platform.base', projectId);
          projectName = (await pdp.getSetting('platform.name')) ?? projectId;
        } catch (e) {
          // fall back to id
          logger.warn(
            `ReadOnlyViewNotifier failed to get project name for project ${projectId}: ${getErrorMessage(
              e,
            )}`,
          );
        }

        // Localize and format the notification message and click label
        const messageKey = '%platformScriptureEditor_previewView_readonly_message_format%';
        const clickLabelKey = '%platformScriptureEditor_previewView_readonly_dismiss%';
        let localizedMessageTemplate = messageKey;
        let localizedClickLabel = clickLabelKey;
        try {
          const localized = await this.papiInstance.localization.getLocalizedStrings({
            localizeKeys: [messageKey, clickLabelKey],
          });
          localizedMessageTemplate = localized[messageKey] ?? messageKey;
          localizedClickLabel = localized[clickLabelKey] ?? localizedClickLabel;
        } catch (e) {
          logger.warn(
            `Failed to get localized strings for read-only Preview notification: ${getErrorMessage(e)}`,
          );
        }

        const message = formatReplacementString(localizedMessageTemplate, { projectName });

        // Send notification informing that Preview is read-only for this WebView/project
        const notificationId = await this.papiInstance.notifications.send({
          severity: 'info',
          message,
          clickCommand: 'platformScriptureEditor.dismissMarkerNotificationForProjectToday',
          clickCommandLabel: localizedClickLabel,
          // This prompt is about this editor's project, and the editor may be in a window the user
          // is not currently looking at.
          webViewId: webViewDefinition.id,
        });
        this.projectIdsByNotificationId.set(notificationId, projectId);

        // Record the last-send time so we don't send duplicates too quickly
        this.lastNotificationByProject[projectId] = Date.now();
      });
    } catch (e) {
      logger.warn(`ReadOnlyViewNotifier failed handling WebView: ${getErrorMessage(e)}`);
    }
  }

  /**
   * Whether the user may edit Scripture in a project. Fails open: a project that does not offer the
   * permission lookup, or a lookup that fails, counts as editable.
   */
  private async canUserEditScripture(projectId: string): Promise<boolean> {
    try {
      const pdp = await this.papiInstance.projectDataProviders.get(
        'platformScripture.scriptureEditPermissions',
        projectId,
      );
      return !pdp || (await pdp.canUserEditScripture());
    } catch (e) {
      logger.warn(
        `ReadOnlyViewNotifier failed to check Scripture edit permission for project ${projectId}: ${getErrorMessage(e)}`,
      );
      return true;
    }
  }
}
