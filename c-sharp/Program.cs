using System.Text.Json;
using Paranext.DataProvider.Checks;
using Paranext.DataProvider.MessageTransports;
using Paranext.DataProvider.NetworkObjects;
using Paranext.DataProvider.Projects;
using Paranext.DataProvider.Services;
using Paratext.Data;
using PtxUtils;

namespace Paranext.DataProvider;

public static class Program
{
    public static async Task Main()
    {
        Console.WriteLine("Paranext data provider starting up");
        Thread.CurrentThread.Name = "Main";

        using PapiClient papi = new();
        try
        {
            if (!await papi.ConnectAsync())
            {
                Console.WriteLine("Paranext data provider could not connect");
                return;
            }

            var paratextProjects = new LocalParatextProjects();

            // Adapted from Paratext's `Program.StaticInitialization`
            ParatextDataSettings.Initialize(new PersistedParatextDataSettings(papi));
            PtxUtilsDataSettings.Initialize(new PersistedPtxUtilsSettings(papi));

            var paratextFactory = new ParatextProjectDataProviderFactory(papi, paratextProjects);
            var checkRunner = new CheckRunner(papi);
            await Task.WhenAll(
                paratextFactory.InitializeAsync(),
                checkRunner.RegisterDataProviderAsync()
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

    private static int RequestAddOne(JsonElement element)
    {
        if (element.GetArrayLength() != 1)
            throw new InvalidDataException("Unexpected data in request: " + element);

        int intVal = ErrorUtils.IgnoreErrors(
            "Trying to parse data from server",
            () => element[0].GetInt32()
        );

        return intVal + 1;
    }

    #endregion
}
