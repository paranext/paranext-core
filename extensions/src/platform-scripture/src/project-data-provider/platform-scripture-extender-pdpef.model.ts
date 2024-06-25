import { IProjectDataProviderEngine, IProjectDataProviderEngineFactory } from '@papi/core';
import papi, { LayeringProjectDataProviderEngineFactory } from '@papi/backend';
import { escapeStringRegexp } from 'platform-bible-utils';
import ScriptureExtenderProjectDataProviderEngine, {
  SCRIPTURE_EXTENDER_OVERLAY_PROJECT_INTERFACES,
  SCRIPTURE_EXTENDER_PROJECT_INTERFACES,
  ScriptureExtenderOverlayPDPs,
} from './platform-scripture-extender-pdpe.model';

/** PDP Factory ID for the Scripture Extender PDPF */
export const SCRIPTURE_EXTENDER_PDPF_ID = 'platformScripture.scriptureExtenderPdpf';

/** Regex strings for the project interfaces the Scripture Extender Layering PDPF layers over */
const SCRIPTURE_EXTENDER_OVERLAY_PROJECT_INTERFACES_REGEX_STRINGS =
  SCRIPTURE_EXTENDER_OVERLAY_PROJECT_INTERFACES.map((projectInterface) =>
    escapeStringRegexp(projectInterface),
  );

class ScriptureExtenderProjectDataProviderEngineFactory
  extends LayeringProjectDataProviderEngineFactory<typeof SCRIPTURE_EXTENDER_PROJECT_INTERFACES>
  implements IProjectDataProviderEngineFactory<typeof SCRIPTURE_EXTENDER_PROJECT_INTERFACES>
{
  projectInterfacesToLayerOver = SCRIPTURE_EXTENDER_OVERLAY_PROJECT_INTERFACES_REGEX_STRINGS;

  providedProjectInterfaces = SCRIPTURE_EXTENDER_PROJECT_INTERFACES;

  // Implementing an interface method, so can't be static
  // eslint-disable-next-line class-methods-use-this
  async createProjectDataProviderEngine(
    projectId: string,
  ): Promise<
    IProjectDataProviderEngine<
      ['platformScripture.USJ_Book', 'platformScripture.USJ_Chapter', 'platformScripture.USJ_Verse']
    >
  > {
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
