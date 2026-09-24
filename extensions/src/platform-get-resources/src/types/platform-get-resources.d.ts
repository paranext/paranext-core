declare module 'platform-get-resources' {
  // @ts-ignore: TS2307 - Cannot find module '@papi/core' or its corresponding type declarations
  import { DataProviderDataType, IDataProvider } from '@papi/core';
  import type { DblResourceData } from 'platform-bible-utils';

  export type GetResourcesDataTypes = {
    /** List of information about resources that are available from the DBL */
    DblResources: DataProviderDataType<undefined, DblResourceData[], never>;
  };

  /**
   * Whether a newer version of each resource is available from the DBL, keyed by DBL Entry UID.
   *
   * Only the backend can determine this — it compares the revision of the locally installed
   * resource against the revision in the DBL catalog — so a resource missing from the map means
   * "unknown", and callers should keep whatever value they already have rather than guessing.
   */
  export type DblResourceUpdateStatus = { [dblEntryUid: string]: boolean | undefined };

  /**
   * The local project id each catalogued DBL resource is installed as, keyed by DBL Entry UID. An
   * empty string means the resource is not installed; a resource absent from the map is one the
   * backend did not report on, and keeps whatever the caller already has.
   *
   * Only the backend can produce this: a resource project's id is unrelated to the DBL entry it was
   * installed from — the entry uid is recorded in the project's settings, which is what
   * ParatextData matches on — so nothing in the local project list identifies the catalog row it
   * belongs to.
   */
  export type DblResourceInstallStatus = { [dblEntryUid: string]: string | undefined };

  /**
   * Which texts licensing terms prohibit using as a model or base for a new translation.
   *
   * Both halves are needed: a catalog row is matched by its DBL id, but an installed text that is
   * restricted by its copyright statement rather than by being on the rights holder's list has no
   * DBL id to match on, only a local project id.
   */
  export type ModelTextRestrictions = {
    /** Lowercase DBL entry ids of the restricted texts on the rights holder's list. */
    dblIds: string[];
    /**
     * Uppercase local project ids (the same format as `DblResourceData.projectId`) of the installed
     * resources that are restricted, whether or not their DBL id is on the list.
     */
    projectIds: string[];
  };

  export type IDblResourcesProvider = IDataProvider<GetResourcesDataTypes> & {
    /**
     * Recomputes whether a newer version of each known resource is available from the DBL,
     * comparing the locally installed revision against the revision in the DBL catalog already in
     * memory.
     *
     * Never contacts the DBL, and gives up rather than blocking when the provider is busy, so it is
     * cheap enough to call on a UI refresh. In exchange it answers for only what it already knows:
     * the result is empty if the catalog has not been fetched yet this session, or if another DBL
     * operation (a fetch, install, or uninstall) currently holds the provider. Treat a resource
     * missing from the result as "unknown" and keep whatever value you have.
     *
     * Comparing revisions across the whole catalog is not free. Prefer a background refresh; the
     * one path that waits on it is the refresh a caller runs straight after installing, updating or
     * removing a resource, where the user is already waiting on their own action.
     *
     * @returns Whether an update is available, keyed by DBL Entry UID.
     * @experimental
     */
    recomputeDblResourcesUpdateStatus: () => Promise<DblResourceUpdateStatus>;
    /**
     * Recomputes which of the resources in the DBL catalog are installed locally, and under which
     * project id.
     *
     * Callers cannot work this out for themselves: a resource project's id is unrelated to the DBL
     * entry it was installed from, so matching a catalog row to a local project by id — exactly or
     * by prefix — is guesswork that fails for any resource whose ids diverge.
     *
     * Never contacts the DBL, and gives up rather than blocking when the provider is busy. Unlike
     * {@link recomputeDblResourcesUpdateStatus} it still answers before the catalog has been fetched
     * — install status is a property of the machine, not of the catalog — but names only the
     * resources that are installed until the catalog arrives, and cannot report a removal in that
     * state. Read an empty map as "no answer" and keep the values you have; reading it as "nothing
     * is installed" would clear every installed flag.
     *
     * @returns The local project id of each catalogued resource, keyed by DBL Entry UID; an empty
     *   string for one that is not installed.
     * @experimental
     */
    recomputeDblResourcesInstallStatus: () => Promise<DblResourceInstallStatus>;
    /**
     * Lists the texts that licensing terms prohibit using as a model or base for a new translation.
     *
     * Never contacts the DBL: the id list ships with the backend, and the installed resources are
     * read from disk, so it answers offline and before the catalog has been fetched. Call it again
     * after installing a resource, since a newly installed restricted text is only reported in
     * `projectIds` once it is on disk.
     *
     * This is the only source of `DblResourceData.isRestrictedAsModelText`: the catalog rows the
     * provider returns do not carry it, and `platformGetResources` stamps it on every row it
     * serves.
     *
     * @returns The restricted DBL ids and installed project ids.
     */
    listModelTextRestrictions: () => Promise<ModelTextRestrictions>;
    /**
     * Installs or updates a DBL resource to the local filesystem.
     *
     * Idempotent: a resource that is already installed and up to date resolves without doing
     * anything, rather than rejecting. Callers cannot tell "installed now" from "already there",
     * and none needs to — a caller whose catalog wrongly reports the resource missing would
     * otherwise have no way out, since every retry would fail identically. "Already installed" is
     * decided against a freshly refreshed project collection, so a resource removed outside this
     * process is installed for real rather than reported as already present. See
     * `adr-dbl-install-is-idempotent`.
     *
     * @param uid DBL Entry UID that is used to identify the resource
     */
    installDblResource: (uid: string) => Promise<void>;
    /**
     * Uninstalls a DBL resource from the local filesystem
     *
     * @param uid DBL Entry UID that is used to identify the resource
     */
    uninstallDblResource: (uid: string) => Promise<void>;
    /**
     * Detects if credentials for the DBL have been configured or not. Does not check if they are
     * valid or not.
     *
     * @returns True if any credentials are configured, false if not.
     */
    isGetDblResourcesAvailable: () => Promise<boolean>;
  };

  /**
   * Why the DBL resource catalog cannot be shown, when it cannot.
   *
   * - `notConfigured` — this build has no DBL credentials, so there is no catalog to fetch and no
   *   amount of retrying will produce one. Nothing is wrong; offering a retry here would be an
   *   inert control attached to a false failure.
   * - `notReady` — the resources data provider has not registered yet. Transient, so a later call can
   *   succeed.
   */
  export type DblResourceCatalogUnavailableReason = 'notConfigured' | 'notReady';

  /**
   * The DBL resource catalog, or the reason there is none to show.
   *
   * A genuine fetch failure REJECTS rather than resolving to `unavailable`. That split is the whole
   * point of this type: a caller can tell "this build cannot download DBL resources" (show nothing,
   * offer no retry) from "the fetch broke" (say so, offer a retry) without having to guess at an
   * ambiguous absent value.
   */
  export type DblResourceCatalog =
    | { status: 'available'; resources: DblResourceData[] }
    | { status: 'unavailable'; reason: DblResourceCatalogUnavailableReason };
}

declare module 'papi-shared-types' {
  import type { DblResourceCatalog, IDblResourcesProvider } from 'platform-get-resources';
  import type { DblResourceData } from 'platform-bible-utils';

  export interface DataProviders {
    'platformGetResources.dblResourcesProvider': IDblResourcesProvider;
  }

  export interface CommandHandlers {
    /**
     * Opens a new Get Resources web view and returns the WebView id
     *
     * @returns WebView id for new Get Resources WebView or `undefined` if not created
     */
    'platformGetResources.openGetResources': () => Promise<string | undefined>;

    /**
     * Opens a new Home web view and returns the WebView id
     *
     * @param shouldShowProjectsOnly Open Home scoped to editable projects, leaving out the
     *   published resources that otherwise share its list. Set by entry points that are asking "get
     *   me to one of my projects"; Home's own entry points omit it and list both. Applies to the
     *   open it is passed on only — it does not stick to the tab.
     * @returns WebView id for new Home WebView or `undefined` if not created
     */
    'platformGetResources.openHome': (
      shouldShowProjectsOnly?: boolean,
    ) => Promise<string | undefined>;

    /**
     * Opens a "New Tab" web view and returns the WebView id
     *
     * @param tabGroupId Id of the tab group (panel) to put the new tab in
     * @returns WebView id for new tab WebView or `undefined` if not created
     */
    'platformGetResources.openNewTab': (tabGroupId?: string) => Promise<string | undefined>;

    /**
     * Whether the Send/Receive extension is part of this build.
     *
     * @returns `true` if Send/Receive is available to the user, `false` if it is not, or
     *   `undefined` if availability could not be determined. Treat `undefined` as unknown — never
     *   as unavailable — since it means this extension had no way to check, not that Send/Receive
     *   is missing.
     */
    'platformGetResources.isSendReceiveAvailable': () => Promise<boolean | undefined>;

    /**
     * Returns DBL resources from memory cache.
     *
     * If no cached value exists, attempts to fetch them. Failed refresh attempts do NOT clear
     * existing cached data.
     *
     * Each row's `isRestrictedAsModelText` is set from the backend's model-text restrictions. A
     * read waits up to two seconds for the first answer; if none has arrived by then the rows are
     * returned without the flag, and a later read carries it.
     *
     * @returns The cached catalog, or an `unavailable` result when this build cannot produce one.
     * @throws When the fetch itself fails. Callers that render an error state with a retry should
     *   key it on the rejection, never on an `unavailable` result — retrying the latter cannot
     *   change the answer.
     */
    'platformGetResources.getCachedResources': () => Promise<DblResourceCatalog>;

    /**
     * Brings the catalog's derived flags (`installed`, `projectId`, `updateAvailable`) up to date
     * and resolves once they are.
     *
     * `getCachedResources` does not wait for that sync, so it is always one refresh behind: it
     * answers from the array it already has. Call this after changing local state — installing,
     * updating or removing a resource — and then re-read the catalog, or the read will return the
     * flags from before the change. Without it an updated resource keeps its "update available"
     * flag until the catalog is read a second time, because nothing else about the row changes.
     *
     * @param shouldRecomputeUpdateStatus Whether to also refresh `updateAvailable`. Defaults to
     *   `true`. It costs a second backend round trip, and only the Get Resources list renders that
     *   flag, so a caller that reads `installed` alone — a panel, a picker, the text grid — should
     *   pass `false` rather than wait on a value it discards.
     * @experimental
     */
    'platformGetResources.refreshResourceFlags': (
      shouldRecomputeUpdateStatus?: boolean,
    ) => Promise<void>;

    /**
     * Returns locally-installed, read-only resources that are NOT in the DBL catalog (e.g. VULGP83,
     * TNN, TND, HBK) as synthetic `DblResourceData` entries.
     *
     * Convention: each returned entry has `dblEntryUid === projectId`, marking it as non-DBL.
     * Callers (e.g. `selectTextConnection`) detect this and create a `ProjectReference` instead of
     * a `DblResourceReference` so the resource is loadable without a catalog entry. Each entry's
     * `isRestrictedAsModelText` is set the same way as in `getCachedResources`.
     *
     * @returns Synthetic resource entries for locally-installed non-DBL resources. Also returns
     *   `[]` when the C# data provider has not registered its projects yet or the lookup threw —
     *   callers cannot distinguish those from a genuine "no local non-DBL resources" result, so a
     *   caller that needs a retry or loading affordance must get that signal from elsewhere.
     */
    'platformGetResources.getLocalNonDblResources': () => Promise<DblResourceData[]>;

    // `paratextBibleSendReceive.*` commands are deliberately NOT declared here. This file is
    // auto-included (via `typeRoots`) into the TypeScript programs of extension repos developed
    // against core — including the closed-source Send/Receive extension itself, where duplicate or
    // drifted declarations collide with the authoritative ones. Core's copy of the Send/Receive
    // seam lives in `src/@types/paratext-bible-send-receive/`, which external extension programs
    // do not include.
  }

  export interface SettingTypes {
    /**
     * List of PDP Factory IDs to exclude when searching for projects to display in the Home
     * projects list
     */
    'platformGetResources.excludePdpFactoryIdsInHome': string[];
  }
}
