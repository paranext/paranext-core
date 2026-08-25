/** The `projectInterface`s the pdpf serves */
// TypeScript is upset without `satisfies` here because `as const` makes the array readonly but it

import papi, { ProjectDataProviderEngine, logger } from '@papi/backend';
import { DataProviderUpdateInstructions, IProjectDataProviderEngine } from '@papi/core';
import { SerializedVerseRef } from '@sillsdev/scripture';
import type { ProjectDataProviderInterfaces } from 'papi-shared-types';
import { UnsubscriberAsync, UnsubscriberAsyncList } from 'platform-bible-utils';
import {
  USJBookProjectInterfaceDataTypes,
  USJChapterProjectInterfaceDataTypes,
  USJVerseProjectInterfaceDataTypes,
} from 'platform-scripture';
import { Usj, usjToUsxString, usxStringToUsj } from '@eten-tech-foundation/scripture-utilities';
import { correctUsjVersion, correctUsxStringVersion } from './scripture.util';

/** The `projectInterface`s the Scripture Extender PDPF serves */
// TypeScript is upset without `satisfies` here because `as const` makes the array readonly but it
// needs to be used in ProjectMetadata as not readonly :p
export const SCRIPTURE_EXTENDER_PROJECT_INTERFACES = [
  'platformScripture.USJ_Book',
  'platformScripture.USJ_Chapter',
  'platformScripture.USJ_Verse',
] as const satisfies [
  'platformScripture.USJ_Book',
  'platformScripture.USJ_Chapter',
  'platformScripture.USJ_Verse',
];

/** The project interfaces the Scripture Extender Layering PDPF layers over */
// TypeScript is upset without `satisfies` here because `as const` makes the array readonly but it
// needs to be used in ProjectMetadata as not readonly :p
export const SCRIPTURE_EXTENDER_OVERLAY_PROJECT_INTERFACES = [
  'platformScripture.USX_Book',
  'platformScripture.USX_Chapter',
  'platformScripture.USX_Verse',
] as const satisfies [
  'platformScripture.USX_Book',
  'platformScripture.USX_Chapter',
  'platformScripture.USX_Verse',
];

export type ScriptureExtenderOverlayPDPs = {
  [ProjectInterface in (typeof SCRIPTURE_EXTENDER_OVERLAY_PROJECT_INTERFACES)[number]]: ProjectDataProviderInterfaces[ProjectInterface];
};

export class ScriptureExtenderProjectDataProviderEngine
  extends ProjectDataProviderEngine<typeof SCRIPTURE_EXTENDER_PROJECT_INTERFACES>
  implements IProjectDataProviderEngine<typeof SCRIPTURE_EXTENDER_PROJECT_INTERFACES>
{
  /** The PDPs this layering PDP needs to function */
  private readonly pdps: ScriptureExtenderOverlayPDPs;

  private bookUSXUnsubscriberPromise: Promise<UnsubscriberAsync>;
  private chapterUSXUnsubscriberPromise: Promise<UnsubscriberAsync>;
  private verseUSXUnsubscriberPromise: Promise<UnsubscriberAsync>;

  constructor(
    private readonly projectId: string,
    pdpsToOverlay: ScriptureExtenderOverlayPDPs,
  ) {
    super();
    this.pdps = pdpsToOverlay;

    this.bookUSXUnsubscriberPromise = this.pdps['platformScripture.USX_Book'].subscribeBookUSX(
      // Just picked a key for no reason in particular because we don't need anything in particular
      // here because we're listening for all updates
      { book: 'GEN', chapterNum: 1, verseNum: 1 },
      () => {
        this.notifyUpdate('BookUSJ');
      },
      { whichUpdates: '*', retrieveDataImmediately: false },
    );

    // Synchronously set up an error logger because an IIFE says this.bookUSXUnsubscriberPromise
    // is being used before it is defined (most likely because it's a separate function running
    // inside the constructor)
    // code-review-disable-next-line complain-about-promise-chains ;)
    this.bookUSXUnsubscriberPromise.catch((e) => {
      logger.error(
        `Scripture Extender PDP for project ${this.projectId} failed to subscribe to BookUSX! ${e}`,
      );
    });

    // Set up subscriptions to listen for changes to the project data to overlay and update
    // our own subscribers
    this.chapterUSXUnsubscriberPromise = this.pdps[
      'platformScripture.USX_Chapter'
    ].subscribeChapterUSX(
      // Just picked a key for no reason in particular because we don't need anything in particular
      // here because we're listening for all updates
      { book: 'GEN', chapterNum: 1, verseNum: 1 },
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

    this.verseUSXUnsubscriberPromise = this.pdps['platformScripture.USX_Verse'].subscribeVerseUSX(
      // Just picked a key for no reason in particular because we don't need anything in particular
      // here because we're listening for all updates
      { book: 'GEN', chapterNum: 1, verseNum: 1 },
      () => {
        this.notifyUpdate('VerseUSJ');
      },
      { whichUpdates: '*', retrieveDataImmediately: false },
    );

    // Synchronously set up an error logger because an IIFE says this.verseUSXUnsubscriberPromise
    // is being used before it is defined (most likely because it's a separate function running
    // inside the constructor)
    // code-review-disable-next-line complain-about-promise-chains ;)
    this.verseUSXUnsubscriberPromise.catch((e) => {
      logger.error(
        `Scripture Extender PDP for project ${this.projectId} failed to subscribe to VerseUSX! ${e}`,
      );
    });
  }

  // A read-modify-write round-trips through `usxStringToUsj` in the getters below and back out
  // through the two setters here. On the extension host that parse runs on `@xmldom/xmldom` (see
  // ADR-0024), which silently repairs recoverable USX defects rather than rejecting them — the
  // renderer's native `DOMParser` rejects the same input — so what these setters persist is the
  // repaired form, not what was on disk.
  // TODO(PT-4444): make the two processes agree on what USX is valid, then drop this note.

  // Do not emit update events when running this method because we are subscribing to data updates
  // and sending out update events in the constructor
  @papi.dataProviders.decorators.doNotNotify
  async setBookUSJ(
    verseRef: SerializedVerseRef,
    bookUsj: Usj,
  ): Promise<DataProviderUpdateInstructions<USJBookProjectInterfaceDataTypes>> {
    const didSucceed = await this.pdps['platformScripture.USX_Book'].setBookUSX(
      verseRef,
      correctUsxStringVersion(usjToUsxString(bookUsj)),
    );
    if (didSucceed) return true;
    return false;
  }

  // Do not emit update events when running this method because we are subscribing to data updates
  // and sending out update events in the constructor
  @papi.dataProviders.decorators.doNotNotify
  async setChapterUSJ(
    verseRef: SerializedVerseRef,
    chapterUsj: Usj,
  ): Promise<DataProviderUpdateInstructions<USJChapterProjectInterfaceDataTypes>> {
    const didSucceed = await this.pdps['platformScripture.USX_Chapter'].setChapterUSX(
      verseRef,
      correctUsxStringVersion(usjToUsxString(chapterUsj)),
    );
    if (didSucceed) return true;
    return false;
  }

  // setVerseUSJ doesn't use instance state but cannot be static because it implements the
  // IProjectDataProviderEngine interface
  // eslint-disable-next-line @typescript-eslint/class-methods-use-this
  async setVerseUSJ(): Promise<DataProviderUpdateInstructions<USJVerseProjectInterfaceDataTypes>> {
    throw new Error('Cannot call setVerseUSJ, use setChapterUSJ or setBookUSJ instead');
  }

  async getBookUSJ(verseRef: SerializedVerseRef): Promise<Usj | undefined> {
    const usx = await this.pdps['platformScripture.USX_Book'].getBookUSX(verseRef);
    return usx ? correctUsjVersion(usxStringToUsj(usx)) : undefined;
  }

  async getChapterUSJ(verseRef: SerializedVerseRef): Promise<Usj | undefined> {
    const usx = await this.pdps['platformScripture.USX_Chapter'].getChapterUSX(verseRef);
    return usx ? correctUsjVersion(usxStringToUsj(usx)) : undefined;
  }

  async getVerseUSJ(verseRef: SerializedVerseRef): Promise<Usj | undefined> {
    const usx = await this.pdps['platformScripture.USX_Verse'].getVerseUSX(verseRef);
    return usx ? correctUsjVersion(usxStringToUsj(usx)) : undefined;
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

    unsubscriberList.add(
      await this.bookUSXUnsubscriberPromise,
      await this.chapterUSXUnsubscriberPromise,
      await this.verseUSXUnsubscriberPromise,
    );

    return unsubscriberList.runAllUnsubscribers();
  }
}

export default ScriptureExtenderProjectDataProviderEngine;
