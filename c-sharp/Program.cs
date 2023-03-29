using System.Text.Json;
using Paranext.DataProvider.MessageHandlers;
using Paranext.DataProvider.Messages;
using Paranext.DataProvider.MessageTransports;
using PtxUtils;

namespace Paranext.DataProvider;

public static class Program
{
    public static async Task Main()
    {
        Console.WriteLine("Paranext data provider starting up");

        using (PapiClient papi = new())
        {
            if (!await papi.ConnectAsync())
            {
                Console.WriteLine("Paranext data provider could not connect");
                return;
            }

            if (!await papi.RegisterRequestHandlerAsync(RequestType.AddOne, RequestAddOne))
            {
                Console.WriteLine("Paranext data provider could not register request handler");
                return;
            }

            Console.WriteLine("Paranext data provider ready!");
            papi.BlockUntilMessageHandlingComplete();
        }

        Console.WriteLine("Paranext data provider shutting down");
    }

    #region Request handlers
    private static ResponseToRequest RequestAddOne(dynamic val)
    {
        if (val is not JsonElement element || element.GetArrayLength() != 1)
            return new ResponseToRequest("Unexpected data in request: " + val);

        int? intVal = ErrorUtils.IgnoreErrors(
            "Trying to parse data from server",
            () => element[0].GetInt32()
        );
        if (intVal == null)
            return new ResponseToRequest("Unexpected data in request: " + val);

        return new ResponseToRequest(intVal + 1);
    }
    #endregion
}
