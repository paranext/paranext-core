import { dataProviderService } from '@shared/services/data-provider.service';
import { logger } from '@shared/services/logger.service';
import { getErrorMessage } from 'platform-bible-utils';

/**
 * Reads the ordered list of project ids the user has most recently opened as their main/active
 * project in Simple mode (most-recent first; see `platformScripture.recentlyOpenedProjects`).
 * Process-agnostic — `dataProviderService` resolves the same underlying data provider whether
 * called from the renderer or the main process.
 *
 * @returns The recents list, or an empty array if the data provider is unavailable or the read
 *   fails for any reason (e.g. not yet registered during cold boot). A read failure is logged
 *   (unlike an unavailable provider, which is a routine early-startup state) so it stays
 *   distinguishable from a genuine zero-state in logs.
 */
export async function getRecentlyOpenedProjectIds(): Promise<string[]> {
  try {
    const recentsProvider = await dataProviderService.get(
      'platformScripture.recentlyOpenedProjects',
    );
    if (!recentsProvider) return [];
    const recents = await recentsProvider.getRecentProjects(undefined);
    return Array.isArray(recents) ? recents : [];
  } catch (e) {
    logger.warn(`Could not read recentlyOpenedProjects; treating as empty: ${getErrorMessage(e)}`);
    return [];
  }
}
