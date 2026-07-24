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
using Paratext.Data.Repository;
using PtxUtils;
using PtxUtils.Progress;

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

            // Log the ParatextData.dll assembly version then change it to 10.<our semver>
            var appInfo = AppService.GetAppInfo(papi);
            var appVersion = SemVerUtils.ConvertSemVerToVersion(appInfo.Version);
            Console.WriteLine(
                $"ParatextData.dll assembly version: {ParatextInfo.ParatextVersion}. Changing to {appVersion}"
            );
            ParatextInfo.ParatextVersion = appVersion;

            var paratextProjects = new LocalParatextProjects(papi);

            // Adapted from Paratext's `Program.StaticInitialization`
            ParatextDataSettings.Initialize(new PersistedParatextDataSettings(papi));
            PtxUtilsDataSettings.Initialize(new PersistedPtxUtilsSettings(papi));

            // Initializes the versioning manager
            VersioningManager.Initialize();

            SettingsService.Initialize(papi);
            var paratextFactory = new ParatextProjectDataProviderFactory(papi, paratextProjects);
            var paratextPublishedFactory = new ParatextPublishedProjectDataProviderFactory(
                papi,
                paratextProjects
            );
            var paratextSendReceiveService = new ParatextProjectSendReceiveService(
                papi,
                paratextFactory,
                appInfo
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
