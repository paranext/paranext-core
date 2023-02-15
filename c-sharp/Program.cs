using System.Text.Json;
using System.Text.Json.Nodes;
using Paranext.DataProvider.Data;
using Paranext.DataProvider.Utils;
using Paranext.DataProvider.Web;
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
        Console.WriteLine("Connected");

        // Add request handlers
        bool result = await connection.RegisterRequest(RequestTypes.AddOne, val =>
        {
            if (val is not JsonElement element || element.GetArrayLength() != 1)
                return new RequestReturn("Unexpected data in request: " + val);

            int? intVal = ErrorUtils.IgnoreErrors("Trying to parse data from server", () => element[0].GetInt32());
            if (intVal == null)
                return new RequestReturn("Unexpected data in request: " + val);

            return new RequestReturn(intVal + 1);
        });

        if (!result)
            return;

        // Main loop for handling messages from the server
        await connection.HandleMessages();

        Console.WriteLine("Connection closed");
    }
}
