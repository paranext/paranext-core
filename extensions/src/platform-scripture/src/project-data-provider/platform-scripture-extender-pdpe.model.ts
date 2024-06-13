/** The `projectInterface`s the pdpf serves */
// TypeScript is upset without `satisfies` here because `as const` makes the array readonly but it

import papi, { ProjectDataProviderEngine, logger } from '@papi/backend';
import { DataProviderUpdateInstructions, IProjectDataProviderEngine } from '@papi/core';
import { VerseRef } from '@sillsdev/scripture';
import type { ProjectDataProviderInterfaces } from 'papi-shared-types';
import { UnsubscriberAsync, UnsubscriberAsyncList } from 'platform-bible-utils';
import { USJChapterProjectInterfaceDataTypes } from 'platform-scripture';
import { Usj, usjToUsxString, usxStringToUsj } from '@biblionexus-foundation/scripture-utilities';

/** The `projectInterface`s the Scripture Extender PDPF serves */
// TypeScript is upset without `satisfies` here because `as const` makes the array readonly but it
// needs to be used in ProjectMetadata as not readonly :p
export const SCRIPTURE_EXTENDER_PROJECT_INTERFACES = [
  'platformScripture.USJ_Chapter',
] as const satisfies ['platformScripture.USJ_Chapter'];

/** The project interfaces the Scripture Extender Layering PDPF layers over */
// TypeScript is upset without `satisfies` here because `as const` makes the array readonly but it
// needs to be used in ProjectMetadata as not readonly :p
export const SCRIPTURE_EXTENDER_OVERLAY_PROJECT_INTERFACES = [
  'platformScripture.USX_Chapter',
] as const satisfies ['platformScripture.USX_Chapter'];

export type ScriptureExtenderOverlayPDPs = {
  [ProjectInterface in (typeof SCRIPTURE_EXTENDER_OVERLAY_PROJECT_INTERFACES)[number]]: ProjectDataProviderInterfaces[ProjectInterface];
};

class ScriptureExtenderProjectDataProviderEngine
  extends ProjectDataProviderEngine<typeof SCRIPTURE_EXTENDER_PROJECT_INTERFACES>
  implements IProjectDataProviderEngine<typeof SCRIPTURE_EXTENDER_PROJECT_INTERFACES>
{
  /** The PDPs this layering PDP needs to function */
  private readonly pdps: ScriptureExtenderOverlayPDPs;

  private chapterUSXUnsubscriberPromise: Promise<UnsubscriberAsync>;

  constructor(
    private readonly projectId: string,
    pdpsToOverlay: ScriptureExtenderOverlayPDPs,
  ) {
    super();
    this.pdps = pdpsToOverlay;

    // Set up subscriptions to listen for changes to the project data to overlay and update
    // our own subscribers
    this.chapterUSXUnsubscriberPromise = this.pdps[
      'platformScripture.USX_Chapter'
    ].subscribeChapterUSX(
      // Just picked a key for no reason in particular because we don't need anything in particular
      // here because we're listening for all updates
      new VerseRef(1, 1, 1),
      () => {
        this.notifyUpdate('ChapterUSJ');
      },
      { whichUpdates: '*', retrieveDataImmediately: false },
    );

    // Synchronously set up an error logger because an IIFE says this.chapterUSXUnsubscriberPromise
    // is being used before it is defined (most likely because it's a separate function running
    // inside the constructor)
    // code-review-disable-next-line complain-about-promise-chains ;)
    this.chapterUSXUnsubscriberPromise.catch((e) => {
      logger.error(
        `Scripture Extender PDP for project ${this.projectId} failed to subscribe to ChapterUSX! ${e}`,
      );
    });
  }

  // Do not emit update events when running this method because we are subscribing to data updates
  // and sending out update events in the constructor
  @papi.dataProviders.decorators.doNotNotify
  async setChapterUSJ(
    verseRef: VerseRef,
    chapterUsj: Usj,
  ): Promise<DataProviderUpdateInstructions<USJChapterProjectInterfaceDataTypes>> {
    const didSucceed = await this.pdps['platformScripture.USX_Chapter'].setChapterUSX(
      verseRef,
      usjToUsxString(chapterUsj),
    );
    if (didSucceed) return true;
    return false;
  }

  async getChapterUSJ(verseRef: VerseRef): Promise<Usj | undefined> {
    const usx = await this.pdps['platformScripture.USX_Chapter'].getChapterUSX(verseRef);
    return usx ? usxStringToUsj(usx) : undefined;
  }

  /**
   * Disposes of this Project Data Provider Engine. Unsubscribes from listening to overlaid PDPs
   *
   * @returns `true` if successfully unsubscribed
   */
  async dispose(): Promise<boolean> {
    const unsubscriberList = new UnsubscriberAsyncList(
      `Scripture Extender PDP Engine ${this.projectId} Overlaid PDP Unsubscribers`,
    );

    unsubscriberList.add(await this.chapterUSXUnsubscriberPromise);

    return unsubscriberList.runAllUnsubscribers();
  }
}

export default ScriptureExtenderProjectDataProviderEngine;
