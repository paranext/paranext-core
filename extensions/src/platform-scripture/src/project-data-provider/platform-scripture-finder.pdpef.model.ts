import { escapeStringRegexp } from 'platform-bible-utils';
import { IProjectDataProviderEngine, IProjectDataProviderEngineFactory } from '@papi/core';
import papi, { LayeringProjectDataProviderEngineFactory } from '@papi/backend';
import {
  SCRIPTURE_FINDER_OVERLAY_PROJECT_INTERFACES,
  SCRIPTURE_FINDER_PROJECT_INTERFACES,
  ScriptureFinderOverlayPDPs,
  ScriptureFinderProjectDataProviderEngine,
} from './platform-scripture-finder-pdpe.model';

/** PDP Factory ID for the Scripture Finder PDPF */
export const SCRIPTURE_FINDER_PDPF_ID = 'platformScripture.scriptureFinderPdpf';

/**
 * Regex strings for the project interfaces the Scripture Finder Layering PDPF layers over
 *
 * Need to wrap in an array to AND the interfaces together since this Layering PDPF only supports
 * projects that have all three interfaces available
 */
const SCRIPTURE_FINDER_OVERLAY_PROJECT_INTERFACES_REGEX_STRINGS = [
  SCRIPTURE_FINDER_OVERLAY_PROJECT_INTERFACES.map((projectInterface) =>
    escapeStringRegexp(projectInterface),
  ),
];

export class ScriptureFinderProjectDataProviderEngineFactory
  extends LayeringProjectDataProviderEngineFactory<typeof SCRIPTURE_FINDER_PROJECT_INTERFACES>
  implements IProjectDataProviderEngineFactory<typeof SCRIPTURE_FINDER_PROJECT_INTERFACES>
{
  projectInterfacesToLayerOver = SCRIPTURE_FINDER_OVERLAY_PROJECT_INTERFACES_REGEX_STRINGS;

  providedProjectInterfaces = SCRIPTURE_FINDER_PROJECT_INTERFACES;

  // Implementing an interface method, so can't be static
  // eslint-disable-next-line @typescript-eslint/class-methods-use-this
  async createProjectDataProviderEngine(
    projectId: string,
  ): Promise<IProjectDataProviderEngine<typeof SCRIPTURE_FINDER_PROJECT_INTERFACES>> {
    // We're creating a ScriptureFinderOverlayPDPs. Seems Object.fromEntries doesn't support
    // mapped types very well
    // eslint-disable-next-line no-type-assertion/no-type-assertion
    const pdpsToOverlay = Object.fromEntries(
      await Promise.all(
        SCRIPTURE_FINDER_OVERLAY_PROJECT_INTERFACES.map(async (projectInterface) => {
          const pdp = await papi.projectDataProviders.get(projectInterface, projectId);
          return [projectInterface, pdp] as const;
        }),
      ),
    ) as ScriptureFinderOverlayPDPs;

    return new ScriptureFinderProjectDataProviderEngine(pdpsToOverlay);
  }
}

export default ScriptureFinderProjectDataProviderEngineFactory;
