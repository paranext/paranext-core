using Paranext.DataProvider.Data;
using Paranext.DataProvider.Web;

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

        // Handle any messages sent from the server
        do
        {
            Console.WriteLine("Waiting for a request...");
            Task<Message?> receiveTask = connection.ReceiveMessage<Message>();
            Message? message = await receiveTask;
            if (receiveTask.Exception != null)
            {
                Console.Error.WriteLine("Error getting message:\n" + receiveTask.Exception);
                continue;
            }

            // TODO: Handle the message
            Console.WriteLine("Got request: " + message?.ToString());

        } while (connection.Connected);

        Console.WriteLine("Connection closed");
    }
}
