using System.Timers;
using Paranext.DataProvider.MessageHandlers;
using Paranext.DataProvider.MessageTransports;
using SIL.Extensions;

namespace Paranext.DataProvider.NetworkObjects
{
    internal class TimeDataProvider : DataProvider
    {
        private readonly System.Timers.Timer _timer = new System.Timers.Timer(
            TimeSpan.FromSeconds(1)
        );

        public TimeDataProvider(PapiClient papiClient)
            : base("current-time", papiClient) { }

        private void TimerFired(object? state, ElapsedEventArgs args)
        {
            ReportDataUpdate();
        }

        protected override void StartDataProvider()
        {
            _timer.Elapsed += TimerFired;
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
