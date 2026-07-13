import { CATEGORY_COMMAND } from '@shared/data/rpc.model';
import { logger } from '@shared/services/logger.service';
import { networkObjectService } from '@shared/services/network-object.service';
import * as networkService from '@shared/services/network.service';
import { settingsService } from '@shared/services/settings.service';
import {
  NETWORK_OBJECT_NAME_WEB_VIEW_SERVICE,
  WebViewServiceType,
} from '@shared/services/web-view.service-model';
import { serializeRequestType } from '@shared/utils/util';
import { SCRIPTURE_EDITOR_WEBVIEW_TYPE } from '@shared/models/web-view.model';
import { AsyncVariable } from 'platform-bible-utils';

const SHUTDOWN_SYNC_TIME_OUT_MS = 10 * 60 * 1000; // 10 minutes

/**
 * Runs cleanup tasks (e.g., syncing projects) when the user closes the main window.
 *
 * In Simple mode: cancels any in-progress sync, then S/Rs the open writable Scripture Editor's
 * project. All errors are swallowed — extension may not be installed, or may fail — shutdown must
 * never be permanently blocked.
 *
 * In Power mode (or any non-Simple mode): returns immediately with no automatic S/R.
 */
export async function performShutdownTasks(): Promise<void> {
  try {
    await performShutdownTasksInternal();
  } catch (e) {
    logger.error('Unexpected error during shutdown tasks:', e);
  }
}

async function performShutdownTasksInternal(): Promise<void> {
  // Power mode: close immediately — no automatic S/R on shutdown.
  // If the setting can't be read, default to simple mode to avoid skipping S/R and risking data loss.
  let interfaceMode: string | undefined;
  try {
    interfaceMode = await settingsService.get('platform.interfaceMode');
  } catch {
    /* settings service unavailable — treat as simple mode to avoid data loss */
  }
  if (interfaceMode !== undefined && interfaceMode !== 'simple') return;

  // Simple mode: cancel any in-progress sync first (e.g. a first-sync on startup), then S/R
  // the active project.
  try {
    await networkService.requestNoRetry(
      serializeRequestType(CATEGORY_COMMAND, 'paratextBibleSendReceive.cancelSync'),
    );
  } catch {
    /* no sync in progress, or extension unavailable */
  }

  // S/R only the currently open writable Scripture Editor's project.
  // If only a read-only Resource Viewer is open (no local changes possible), skip S/R.
  let projectId: string | undefined;
  try {
    const webViewService = await networkObjectService.get<WebViewServiceType>(
      NETWORK_OBJECT_NAME_WEB_VIEW_SERVICE,
    );
    const openDefs = await webViewService?.getAllOpenWebViewDefinitions();
    // Simple mode allows at most one writable Scripture Editor at a time, so find() is sufficient.
    // Power mode can have multiple — revisit this if S/R on shutdown is ever extended to Power mode.
    const activeEditor = openDefs?.find(
      (def) => def.webViewType === SCRIPTURE_EDITOR_WEBVIEW_TYPE && !def.state?.isReadOnly,
    );
    projectId = activeEditor?.projectId;
  } catch {
    /* WebView service unavailable */
  }

  if (!projectId) return;

  logger.info('Syncing project on shutdown...');

  // Copy to a const so TypeScript knows the type is string inside the async IIFE below.
  const syncProjectId = projectId;
  const syncComplete = new AsyncVariable<void>('shutdown sync', SHUTDOWN_SYNC_TIME_OUT_MS);
  (async () => {
    try {
      await networkService.requestNoRetry(
        serializeRequestType(CATEGORY_COMMAND, 'paratextBibleSendReceive.sendReceiveProjects'),
        [syncProjectId],
      );
      if (!syncComplete.hasTimedOut) syncComplete.resolveToValue(undefined);
    } catch {
      // sync failed — settle anyway
      if (!syncComplete.hasTimedOut) syncComplete.resolveToValue(undefined);
    }
  })();
  try {
    await syncComplete.promise;
    logger.info('Sync on shutdown complete');
  } catch {
    /* timed out */
  }
}
