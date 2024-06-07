import {
  IProjectDataProviderEngine,
  IProjectDataProviderEngineFactory,
  ProjectMetadataWithoutFactoryInfo,
} from '@papi/core';
import papi from '@papi/backend';
import { escapeStringRegexp } from 'platform-bible-utils';
import ScriptureExtenderProjectDataProviderEngine, {
  SCRIPTURE_EXTENDER_OVERLAY_PROJECT_INTERFACES,
  SCRIPTURE_EXTENDER_PROJECT_INTERFACES,
  ScriptureExtenderOverlayPDPs,
} from './platform-scripture-extender-pdpe.model';

/** PDP Factory ID for the Scripture Extender PDPF */
export const SCRIPTURE_EXTENDER_PDPF_ID = 'platformScripture.scriptureExtenderPdpf';
const SCRIPTURE_EXTENDER_PDPF_ID_REGEX_STRING = escapeStringRegexp(SCRIPTURE_EXTENDER_PDPF_ID);

/** Regex strings for the project interfaces the Scripture Extender Layering PDPF layers over */
const SCRIPTURE_EXTENDER_OVERLAY_PROJECT_INTERFACES_REGEX_STRINGS =
  SCRIPTURE_EXTENDER_OVERLAY_PROJECT_INTERFACES.map((projectInterface) =>
    escapeStringRegexp(projectInterface),
  );

class ScriptureExtenderProjectDataProviderEngineFactory
  implements IProjectDataProviderEngineFactory<typeof SCRIPTURE_EXTENDER_PROJECT_INTERFACES>
{
  // Implementing an interface method, so can't be static
  // eslint-disable-next-line class-methods-use-this
  async getAvailableProjects(): Promise<ProjectMetadataWithoutFactoryInfo[]> {
    try {
      const projectsToOverlayMetadata = await papi.projectLookup.getMetadataForAllProjects({
        includeProjectInterfaces: SCRIPTURE_EXTENDER_OVERLAY_PROJECT_INTERFACES_REGEX_STRINGS,
        // The `projectInterface`s we provide are excluded because we don't need to provide them
        // again if they're already provided. Wrapped in another array so we only exclude projects
        // that already serve all the `projectInterface`s we support
        excludeProjectInterfaces: [SCRIPTURE_EXTENDER_PROJECT_INTERFACES],
        excludePdpFactoryIds: SCRIPTURE_EXTENDER_PDPF_ID_REGEX_STRING,
      });
      return projectsToOverlayMetadata.map((projectMetadataToOverlay) => {
        const projectMetadata: ProjectMetadataWithoutFactoryInfo & { pdpFactoryInfo?: unknown } =
          projectMetadataToOverlay;
        delete projectMetadata.pdpFactoryInfo;
        projectMetadata.projectInterfaces = SCRIPTURE_EXTENDER_PROJECT_INTERFACES;
        return projectMetadata;
      });
    } catch (e) {
      throw new Error(
        `${SCRIPTURE_EXTENDER_PDPF_ID} was not able to get metadata for projects to overlay. ${e}`,
      );
    }
  }

  // Implementing an interface method, so can't be static
  // eslint-disable-next-line class-methods-use-this
  async createProjectDataProviderEngine(
    projectId: string,
  ): Promise<IProjectDataProviderEngine<['platformScripture.USJ_Chapter']>> {
    // We're creating a ScriptureExtenderOverlayPDPs. Seems Object.fromEntries doesn't support
    // mapped types very well
    // eslint-disable-next-line no-type-assertion/no-type-assertion
    const pdpsToOverlay = Object.fromEntries(
      await Promise.all(
        SCRIPTURE_EXTENDER_OVERLAY_PROJECT_INTERFACES.map(async (projectInterface) => {
          const pdp = await papi.projectDataProviders.get(projectInterface, projectId);
          return [projectInterface, pdp] as const;
        }),
      ),
    ) as ScriptureExtenderOverlayPDPs;

    return new ScriptureExtenderProjectDataProviderEngine(projectId, pdpsToOverlay);
  }
}

export default ScriptureExtenderProjectDataProviderEngineFactory;
