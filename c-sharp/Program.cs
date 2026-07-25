using System.Diagnostics;
using Paranext.DataProvider.Checklists;
using Paranext.DataProvider.Checks;
using Paranext.DataProvider.EnhancedResources;
using Paranext.DataProvider.ManageBooks;
using Paranext.DataProvider.NetworkObjects;
using Paranext.DataProvider.ParatextUtils;
using Paranext.DataProvider.Projects;
using Paranext.DataProvider.Projects.DigitalBibleLibrary;
using Paranext.DataProvider.Projects.SendReceive;
using Paranext.DataProvider.Services;
using Paranext.DataProvider.Users;
using Paratext.Data;
using Paratext.Data.Languages;
using Paratext.Data.Repository;
using PtxUtils;
using PtxUtils.Progress;
using SIL.WritingSystems;

namespace Paranext.DataProvider;

public static class Program
{
    public static async Task Main()
    {
        Console.WriteLine("Paranext data provider starting up");
        StartupTiming.Mark("process-start");
        Thread.CurrentThread.Name = "Main";

        var listener = new ConsoleTraceListener
        {
            TraceOutputOptions = TraceOptions.DateTime,
            // Ignore trace for every S/R-able project https://github.com/ubsicap/Paratext/blob/master/ParatextData/Repository/SharingLogic.cs#L450
            Filter = new TraceExclusionFilter("CreateSharedProject for {0} ({1})"),
        };
        // PNX001 bans `System.Diagnostics.Trace` for app logging (use `Console.WriteLine`),
        // but here we legitimately need to configure the Trace subsystem itself so that
        // ParatextData.dll's internal Trace output is redirected to Console (the app's
        // single logging sink). This is a bootstrap responsibility — the whole purpose
        // of this block is to bridge Trace → Console — so rewriting these three lines to
        // use Console.WriteLine would defeat the intent. Scope the suppression to just
        // the bootstrap lines.
#pragma warning disable PNX001
        // Clear the default listeners to stop Debug.Assert from crashing the app
        Trace.Listeners.Clear();
        // Log all trace messages to the console
        Trace.Listeners.Add(listener);
        Trace.AutoFlush = true;
#pragma warning restore PNX001

        // Tell `ProgressUtils` to run "UI" code and "run later" code immediately as a simple
        // implementation so we don't miss `ParatextData` code that needs to run.
        ProgressUtils.Implementation = new ProgressUtilsRunImmediately();

        using PapiClient papi = new();
        try
        {
            if (!await papi.ConnectAsync())
            {
                Console.WriteLine("Paranext data provider could not connect");
                return;
            }
            StartupTiming.Mark("papi-connected");

            // Initialize the shared store early since papi uses it
            await SharedStoreService.InitializeAsync(papi);
            papi.SetSharedStore(SharedStoreService.GetSharedStore());
            StartupTiming.Mark("shared-store-initialized");

            // Log the ParatextData.dll assembly version then change it to 10.<our semver>
            var appInfo = AppService.GetAppInfo(papi);
            var appVersion = SemVerUtils.ConvertSemVerToVersion(appInfo.Version);
            Console.WriteLine(
                $"ParatextData.dll assembly version: {ParatextInfo.ParatextVersion}. Changing to {appVersion}"
            );
            ParatextInfo.ParatextVersion = appVersion;
            StartupTiming.Mark("app-info-initialized");

            var paratextProjects = new LocalParatextProjects(papi);

            // Adapted from Paratext's `Program.StaticInitialization`
            ParatextDataSettings.Initialize(new PersistedParatextDataSettings(papi));
            PtxUtilsDataSettings.Initialize(new PersistedPtxUtilsSettings(papi));
            StartupTiming.Mark("paratext-data-settings-initialized");

            // Initializes the versioning manager
            VersioningManager.Initialize();

            // Load the persisted project-metadata snapshot (if valid for this app version) so
            // project lists and targeted project loads can be served before the full scan
            // completes. Must run before the early Initialize below so that scan defers to the
            // snapshot-mode gate; with no valid snapshot this is a no-op and startup is unchanged.
            paratextProjects.TryEnterSnapshotMode(appInfo.Version);

            // Start the project scan as soon as its prerequisites are ready (ParatextData
            // settings/version, versioning manager) so it overlaps the rest of pre-barrier init
            // instead of starting inside the barrier. Initialize is idempotent behind a lock, so
            // the factories' StartFactoryAsync calls in the barrier below wait for (or no-op
            // after) this same scan. A failure here is retried by the factories' own Initialize
            // calls - synchronous in the barrier without a snapshot (where it would surface), and
            // kicked in the background with error logging in snapshot mode.
            ThreadingUtils.ObserveTaskLoggingErrorsToStderr(
                Task.Run(paratextProjects.Initialize),
                "Early project scan"
            );

            // Pre-warm the one-time SIL LanguageLookup construction (SLDR langtags fetch + parse,
            // multiple seconds cold) that ScrTextExtensions.GetLanguageTag's legacy fallback
            // (LanguageIdHelper.FromCommonLanguageName) forces lazily for projects with a
            // missing/placeholder LanguageIsoCode. Warming it here keeps that cost off the first
            // getAvailableProjects request, which is on the critical path to showing scripture.
            ThreadingUtils.ObserveTaskLoggingErrorsToStderr(
                Task.Run(async () =>
                {
                    // LanguageLookup requires Sldr, which the scan initializes early on
                    // (ParatextData.Initialize -> WritingSystemRepository.Initialize). Wait for
                    // that instead of initializing Sldr here so the warm-up stays a pure
                    // optimization with no init-ordering responsibilities of its own; skip
                    // (bounded) if the scan never gets there - the organic fallback still works.
                    var sldrDeadline = DateTime.UtcNow + TimeSpan.FromSeconds(30);
                    while (!Sldr.IsInitialized)
                    {
                        if (DateTime.UtcNow > sldrDeadline)
                        {
                            Console.WriteLine(
                                "Skipping LanguageLookup warm-up: Sldr was not initialized in time"
                            );
                            return;
                        }
                        await Task.Delay(50);
                    }
                    StartupTiming.Mark("language-lookup-warm-start");
                    // Load langtags from the SLDR cache (or the embedded fallback) WITHOUT the
                    // network download the LanguageLookup ctor would otherwise attempt. This keeps
                    // the warm-up off the network entirely and skips CreateSldrCacheDirectory -
                    // the one throw site outside Sldr's catch blocks, which would poison
                    // LanguageIdHelper's exception-caching Lazy for the whole session. Cost:
                    // langtags.json is not refreshed this session (nothing else refreshes it
                    // either - it is first-load-only in libpalaso and ParatextData - so resolution
                    // matches the organic path minus at most one conditional GET of freshness).
                    Sldr.InitializeLanguageTags(downloadLanguageTags: false);
                    LanguageIdHelper.FromCommonLanguageName("English");
                    StartupTiming.Mark("language-lookup-warm-end");
                }),
                "LanguageLookup warm-up"
            );

            SettingsService.Initialize(papi);
            StartupTiming.Mark("settings-service-initialized");
            var paratextFactory = new ParatextProjectDataProviderFactory(papi, paratextProjects);
            var paratextPublishedFactory = new ParatextPublishedProjectDataProviderFactory(
                papi,
                paratextProjects
            );
            var paratextSendReceiveService = new ParatextProjectSendReceiveService(
                papi,
                paratextFactory,
                appInfo,
                paratextProjects
            );
            var inventoryDataProvider = new InventoryDataProvider(papi, paratextProjects);
            var checkRunner = new CheckRunner(papi, inventoryDataProvider);
            var dblResources = new DblResourcesDataProvider(papi, paratextProjects);
            var paratextRegistrationService = new ParatextRegistrationService(papi);
            var checklistNetworkObject = new ChecklistNetworkObject(papi);
            var manageBooksService = new ManageBooksService(
                papi,
                paratextProjects,
                paratextFactory
            );
            var enhancedResourceFactory = new EnhancedResourceFactory(
                papi,
                paratextProjects,
                new MarbleDataLoader()
            );
            var versificationConversionService = new VersificationConversionService(papi);

            // Non-critical: register in the background - started BEFORE the critical barrier is
            // awaited so these services run concurrently with it without gating "ready". Starting
            // them after the barrier would shrink the head start TS consumers with bounded one-shot
            // acquisition (e.g. the checklist and manage-books web views) rely on.
            // Wrap EACH registration in its own Task.Run so a synchronous throw (e.g. from the
            // non-async ManageBooksService.RegisterNetworkObjectAsync before its first await) is
            // captured into that service's task rather than escaping unobserved AND without
            // orphaning the siblings: Task.WhenAll evaluates its arguments left-to-right, so a bare
            // Task.Run(() => Task.WhenAll(a(), b(), ...)) that threw synchronously partway through
            // would leave the already-started tasks unobserved and never start the later ones. Each
            // Task.Run returns an already-scheduled task, so all five always start and every fault
            // (sync or async) flows into the WhenAll. Log faults to stderr so they surface at error
            // level in the main process log - a fault here means these features are missing for the
            // whole session.
            ThreadingUtils.ObserveTaskLoggingErrorsToStderr(
                Task.WhenAll(
                    Task.Run(() => inventoryDataProvider.RegisterDataProviderAsync()),
                    Task.Run(() => checkRunner.RegisterDataProviderAsync()),
                    Task.Run(() => checklistNetworkObject.InitializeAsync()),
                    Task.Run(() => manageBooksService.RegisterNetworkObjectAsync()),
                    Task.Run(() => enhancedResourceFactory.InitializeAsync())
                ),
                "Background service registration"
            );

            // Bridge the S/R write gate to the PAPI (event + getAutoSyncBlocking). Initialized in the
            // critical barrier below so it is serving before extension activation.
            var sendReceiveBlockNotifierService = new SendReceiveBlockNotifierService(papi);

            StartupTiming.Mark("init-barrier-start");
            // Critical path: everything the renderer needs to list projects and open an editor.
            await Task.WhenAll(
                paratextFactory.InitializeAsync(),
                paratextPublishedFactory.InitializeAsync(),
                versificationConversionService.InitializeAsync(),
                paratextRegistrationService.InitializeAsync(),
                paratextSendReceiveService.InitializeAsync(),
                dblResources.RegisterDataProviderAsync(),
                sendReceiveBlockNotifierService.InitializeAsync()
            );
            StartupTiming.Mark("init-barrier-end");

            // Things that only run in our "noisy dev mode" go here
            var noisyDevModeEnvVar = Environment.GetEnvironmentVariable("DEV_NOISY");
            var isNoisyDevMode = noisyDevModeEnvVar != null && noisyDevModeEnvVar == "true";
            if (isNoisyDevMode)
            {
                var tdp = new TimeDataProvider(papi);
                await Task.WhenAll(
                    tdp.RegisterDataProviderAsync(),
                    //TODO: Delete this once we stop including test objects in the builds
                    papi.RegisterRequestHandlerAsync("command:test.addOne", RequestAddOne)
                );
            }

            Console.WriteLine(
                $"Paranext data provider ready! {(isNoisyDevMode ? " (noisy dev mode)" : "")}"
            );
            await papi.DisconnectTask;
            Console.WriteLine("Paranext data provider message handling complete");
        }
        finally
        {
            await papi.DisconnectAsync();
        }

        Console.WriteLine("Paranext data provider shutting down");
    }

    #region Request handlers

    private static int RequestAddOne(int value)
    {
        return value + 1;
    }

    #endregion
}
