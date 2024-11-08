using System.Text.Json;
using SIL.Extensions;

namespace Paranext.DataProvider.NetworkObjects;

/// <summary>
/// This is a sample data provider for demonstration purposes
/// </summary>
internal class TimeDataProvider : DataProvider
{
    // Fire an event that says our "time data" updated once per second
    private readonly System.Timers.Timer _timer = new(TimeSpan.FromSeconds(1));

    public TimeDataProvider(PapiClient papiClient)
        : base("current-time", papiClient) { }

    protected override Task StartDataProviderAsync()
    {
        _timer.Elapsed += (_, _) =>
        {
            SendDataUpdateEvent("*", "TimeDataProvider timer elapsed");
        };
        _timer.AutoReset = true;
        _timer.Enabled = true;
        return Task.CompletedTask;
    }

    protected override List<(string functionName, Delegate function)> GetFunctions()
    {
        return
        [
            (
                "getTime",
                (JsonElement _) =>
                {
                    return DateTime.Now.ToISO8601TimeFormatWithUTCString();
                }
            ),
        ];
    }
}
