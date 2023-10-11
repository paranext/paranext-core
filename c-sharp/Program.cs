using System.Text.Json;
using Paranext.DataProvider.MessageHandlers;
using Paranext.DataProvider.Messages;
using Paranext.DataProvider.MessageTransports;
using Paranext.DataProvider.NetworkObjects;
using Paranext.DataProvider.Projects;
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

            //TODO: Delete this once we stop including test objects in the builds
            if (!await papi.RegisterRequestHandler(RequestType.AddOne, RequestAddOne))
            {
                Console.WriteLine("Paranext data provider could not register request handler");
                return;
            }

            var tdp = new TimeDataProvider(papi);
            var sdp = new UsfmDataProvider(papi, "assets", "WEB");
            var paratextPsi = new ParatextProjectStorageInterpreter(papi);
            var paratextFactory = new ParatextProjectDataProviderFactory(papi, paratextPsi);

            await tdp.RegisterDataProvider();
            await sdp.RegisterDataProvider();
            await paratextPsi.RegisterDataProvider();
            await paratextFactory.Initialize();

            Console.WriteLine("Paranext data provider ready!");
            await papi.MessageHandlingCompleteTask;
            Console.WriteLine("Paranext data provider message handling complete");
        }
        finally
        {
            await papi.DisconnectAsync();
        }

        Console.WriteLine("Paranext data provider shutting down");
    }

    #region Request handlers

    private static ResponseToRequest RequestAddOne(dynamic val)
    {
        if (val is not JsonElement element || element.GetArrayLength() != 1)
            return ResponseToRequest.Failed("Unexpected data in request: " + val);

        int intVal = ErrorUtils.IgnoreErrors(
            "Trying to parse data from server",
            () => element[0].GetInt32()
        );

        return ResponseToRequest.Succeeded(intVal + 1);
    }

    #endregion
}
