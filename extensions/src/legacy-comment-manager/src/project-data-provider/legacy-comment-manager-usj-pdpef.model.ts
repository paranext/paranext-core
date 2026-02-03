import papi, { LayeringProjectDataProviderEngineFactory } from '@papi/backend';
import { IProjectDataProviderEngine, IProjectDataProviderEngineFactory } from '@papi/core';
import { escapeStringRegexp } from 'platform-bible-utils';
import {
  LegacyCommentUsjOverlayPDPs,
  LEGACY_COMMENT_USJ_PROJECT_INTERFACES,
  LEGACY_COMMENT_USJ_OVERLAY_PROJECT_INTERFACES,
  LegacyCommentUsjProjectDataProviderEngine,
} from './legacy-comment-manager-usj-pdpe.model';

/** PDP Factory ID for the Comment USJ PDPF */
export const LEGACY_COMMENT_USJ_PDPF_ID = 'legacyCommentManager.commentsUsjPdpf';

/**
 * Regex strings for the project interfaces the Scripture Extender Layering PDPF layers over
 *
 * Need to wrap in an array to AND the interfaces together since this Layering PDPF only supports
 * projects that have all three interfaces available
 */
const LEGACY_COMMENT_USJ_OVERLAY_PROJECT_INTERFACES_REGEX_STRINGS = [
  LEGACY_COMMENT_USJ_OVERLAY_PROJECT_INTERFACES.map((projectInterface) =>
    escapeStringRegexp(projectInterface),
  ),
];

export class LegacyCommentManagerUsjProjectDataProviderEngineFactory
  extends LayeringProjectDataProviderEngineFactory<typeof LEGACY_COMMENT_USJ_PROJECT_INTERFACES>
  implements IProjectDataProviderEngineFactory<typeof LEGACY_COMMENT_USJ_PROJECT_INTERFACES>
{
  projectInterfacesToLayerOver = LEGACY_COMMENT_USJ_OVERLAY_PROJECT_INTERFACES_REGEX_STRINGS;

  providedProjectInterfaces = LEGACY_COMMENT_USJ_PROJECT_INTERFACES;

  // Implementing an interface method, so can't be static
  // eslint-disable-next-line @typescript-eslint/class-methods-use-this
  async createProjectDataProviderEngine(
    projectId: string,
  ): Promise<IProjectDataProviderEngine<typeof LEGACY_COMMENT_USJ_PROJECT_INTERFACES>> {
    // We're creating a LegacyCommentManagerOverlayPDPs. Seems Object.fromEntries doesn't support
    // mapped types very well
    // eslint-disable-next-line no-type-assertion/no-type-assertion
    const pdpsToOverlay = Object.fromEntries(
      await Promise.all(
        LEGACY_COMMENT_USJ_OVERLAY_PROJECT_INTERFACES.map(async (projectInterface) => {
          const pdp = await papi.projectDataProviders.get(projectInterface, projectId);
          return [projectInterface, pdp] as const;
        }),
      ),
    ) as LegacyCommentUsjOverlayPDPs;

    return new LegacyCommentUsjProjectDataProviderEngine(projectId, pdpsToOverlay);
  }
}

export default LegacyCommentManagerUsjProjectDataProviderEngineFactory;
