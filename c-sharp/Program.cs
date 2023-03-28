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
        using (PapiClient papi = new())
        {
            Console.WriteLine("Connecting Paranext data provider...");
            var connectTask = papi.ConnectAsync();
            if (!await connectTask)
            {
                Console.Error.WriteLine("Paranext data provider could not connect");
                if (connectTask.Exception != null)
                    Console.Error.WriteLine(connectTask.Exception);
                return;
            }
            Console.WriteLine("Paranext data provider connected");

            var registerTask = papi.RegisterRequestHandlerAsync(RequestType.AddOne, RequestAddOne);
            if (!await registerTask)
            {
                Console.Error.WriteLine("Could not register request handler");
                if (registerTask.Exception != null)
                    Console.Error.WriteLine(registerTask.Exception);
                return;
            }

            papi.BlockUntilMessageHandlingComplete();
        }
        Console.WriteLine("Paranext data provider disconnected");
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
