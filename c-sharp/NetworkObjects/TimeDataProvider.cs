using Paranext.DataProvider.MessageHandlers;
using Paranext.DataProvider.MessageTransports;
using SIL.Extensions;

namespace Paranext.DataProvider.NetworkObjects
{
    /// <summary>
    /// This is a sample data provider for demonstration purposes
    /// </summary>
    internal class TimeDataProvider : DataProvider
    {
        // Fire an event that says our "time data" updated once per second
        private readonly System.Timers.Timer _timer = new(TimeSpan.FromSeconds(1));

        public TimeDataProvider(PapiClient papiClient)
            : base("current-time", papiClient) { }

        protected override void StartDataProvider()
        {
            _timer.Elapsed += (_, _) =>
            {
                SendDataUpdateEvent();
            };
            _timer.AutoReset = true;
            _timer.Enabled = true;
        }

        protected override ResponseToRequest HandleGetRequest(string[] arguments)
        {
            return ResponseToRequest.Succeeded(DateTime.Now.ToISO8601TimeFormatWithUTCString());
        }

        protected override ResponseToRequest HandleSetRequest(string[] arguments)
        {
            return ResponseToRequest.Failed("Setting the time is not allowed");
        }
    }
}
