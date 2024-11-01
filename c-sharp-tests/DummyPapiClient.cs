using System.Diagnostics.CodeAnalysis;
using Paranext.DataProvider;

namespace TestParanextDataProvider
{
    [ExcludeFromCodeCoverage]
    internal class DummyPapiClient : PapiClient
    {
        private readonly Dictionary<
            string,
            List<(string newValue, string oldValue)>
        > _validSettings = [];
        private readonly Queue<(string eventType, object? eventParameters)> _sentEvents = [];

        public void AddSettingValueToTreatAsValid(
            string pbSettingName,
            string newValue,
            string oldValue
        )
        {
            if (!_validSettings.TryGetValue(pbSettingName, out var values))
            {
                _validSettings[pbSettingName] = values = [];
            }
            values.Add((newValue, oldValue));
        }

        #region Overrides of PapiClient

        public override Task<bool> ConnectAsync()
        {
            // Pretend we succeeded
            return Task.FromResult(true);
        }

        public override Task DisconnectAsync()
        {
            // Nothing to do
            return Task.CompletedTask;
        }

        public override Task<bool> RegisterRequestHandlerAsync(
            string requestType,
            Delegate requestHandler,
            TimeSpan? timeout
        )
        {
            return Task.FromResult(_localMethods.TryAdd(requestType, requestHandler));
        }

        public override Task SendEventAsync(string eventType, object? eventParameters)
        {
            _sentEvents.Enqueue((eventType, eventParameters));
            return Task.CompletedTask;
        }

        public int SentEventCount
        {
            get { return _sentEvents.Count; }
        }

        public (string eventType, object? eventParameters) NextSentEvent
        {
            get { return _sentEvents.Dequeue(); }
        }

        public override Task<T?> SendRequestAsync<T>(
            string requestType,
            IReadOnlyList<object?>? requestContents
        )
            where T : default
        {
            if (_localMethods.TryGetValue(requestType, out _))
                return base.SendRequestAsync<T>(requestType, requestContents);
            return Task.FromResult<T?>(default);
        }

        #endregion
    }
}
