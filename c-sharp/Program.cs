using System.Text.Json;
using Paranext.DataProvider.MessageHandlers;
using Paranext.DataProvider.Messages;
using Paranext.DataProvider.MessageTransports;
using Paranext.DataProvider.NetworkObjects;
using Paratext.Data;
using PtxUtils;

namespace Paranext.DataProvider;

public static class Program
{
    public static async Task Main()
    {
        Console.WriteLine("Paranext data provider starting up");

        ParatextData.Initialize("assets");
        ScrText scrText = ScrTextCollection.Get("WEB");

        using PapiClient papi = new();
        try
        {
            if (!await papi.ConnectAsync())
            {
                Console.WriteLine("Paranext data provider could not connect");
                return;
            }

            if (!papi.RegisterRequestHandler(RequestType.AddOne, RequestAddOne))
            {
                Console.WriteLine("Paranext data provider could not register request handler");
                return;
            }

            var tdp = new TimeDataProvider(papi);
            tdp.RegisterDataProvider();

            Console.WriteLine("Paranext data provider ready!");
            papi.BlockUntilMessageHandlingComplete();
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
