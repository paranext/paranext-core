using System.Text.Json;
using Paranext.DataProvider.MessageHandlers;
using Paranext.DataProvider.Messages;
using Paranext.DataProvider.MessageTransports;
using PtxUtils;

namespace Paranext.DataProvider;

public static class Program
{
    public static async Task Main(/* string[] args */)
    {
        PapiClient connection = new();

        // Connect to the server
        Console.WriteLine("Connecting...");
        Task connectTask = connection.Connect();
        await connectTask;
        if (connectTask.Exception != null)
        {
            Console.Error.WriteLine("Error connecting:\n" + connectTask.Exception);
            return;
        }
        Console.WriteLine("Paranext .NET connected");

        ManualResetEventSlim messageHandlingIsComplete = new(false);
        Thread messageHandlingThread = new(
            new ThreadStart(async () => {
                await connection.HandleMessages();
                messageHandlingIsComplete.Set();
            }));
        messageHandlingThread.Start();

        // Add request handlers
        bool result = await connection.RegisterRequestHandler(RequestType.AddOne, RequestAddOne);
        if (!result)
            return;

        messageHandlingIsComplete.Wait();
        Console.WriteLine("Paranext .NET connection closed");
    }

    #region Request handlers
    private static ResponseToRequest RequestAddOne(dynamic val)
    {
        if (val is not JsonElement element || element.GetArrayLength() != 1)
            return new ResponseToRequest("Unexpected data in request: " + val);

        int? intVal = ErrorUtils.IgnoreErrors("Trying to parse data from server", () => element[0].GetInt32());
        if (intVal == null)
            return new ResponseToRequest("Unexpected data in request: " + val);

        return new ResponseToRequest(intVal + 1);
    }
    #endregion
}
