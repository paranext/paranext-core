using System.Diagnostics;
using Paranext.DataProvider.Checks;
using Paranext.DataProvider.NetworkObjects;
using Paranext.DataProvider.Projects;
using Paranext.DataProvider.Projects.DigitalBibleLibrary;
using Paranext.DataProvider.Services;
using Paranext.DataProvider.Users;
using Paratext.Data;
using PtxUtils;

namespace Paranext.DataProvider;

public static class Program
{
    public static async Task Main()
    {
        Console.WriteLine("Paranext data provider starting up");
        Thread.CurrentThread.Name = "Main";

        var listener = new ConsoleTraceListener { TraceOutputOptions = TraceOptions.DateTime };
        // Clear the default listeners to stop Debug.Assert from crashing the app
        Trace.Listeners.Clear();
        // Log all trace messages to the console
        Trace.Listeners.Add(listener);
        Trace.AutoFlush = true;

        using PapiClient papi = new();
        try
        {
            if (!await papi.ConnectAsync())
            {
                Console.WriteLine("Paranext data provider could not connect");
                return;
            }

            // Log the ParatextData.dll assembly version then change it to 10.<our semver>
            var appInfo = AppService.GetAppInfo(papi);
            var appVersion = SemVerUtils.ConvertSemVerToVersion(appInfo.Version);
            Console.WriteLine(
                $"ParatextData.dll assembly version: {ParatextInfo.ParatextVersion}. Changing to {appVersion}"
            );
            ParatextInfo.ParatextVersion = appVersion;

            var paratextProjects = new LocalParatextProjects();

            // Adapted from Paratext's `Program.StaticInitialization`
            ParatextDataSettings.Initialize(new PersistedParatextDataSettings(papi));
            PtxUtilsDataSettings.Initialize(new PersistedPtxUtilsSettings(papi));

            var paratextFactory = new ParatextProjectDataProviderFactory(papi, paratextProjects);
            var checkRunner = new CheckRunner(papi);
            var dblResources = new DblResourcesDataProvider(papi);
            var paratextRegistrationService = new ParatextRegistrationService(papi);
            await Task.WhenAll(
                paratextFactory.InitializeAsync(),
                checkRunner.RegisterDataProviderAsync(),
                dblResources.RegisterDataProviderAsync(),
                paratextRegistrationService.InitializeAsync()
            );

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
