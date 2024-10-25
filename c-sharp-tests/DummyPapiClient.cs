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

        public void AddSettingValueToTreatAsValid(
            string pbSettingName,
            string newValue,
            string oldValue
        )
        {
            if (!_validSettings.TryGetValue(pbSettingName, out var values))
            {
                _validSettings[pbSettingName] = values =
                    new List<(string newValue, string oldValue)>();
            }
            values.Add((newValue, oldValue));
        }

        #region Overrides of PapiClient

        public override Task<bool> ConnectAsync()
        {
            return Task.FromResult(true); // Pretend we succeeded
        }

        public override Task DisconnectAsync()
        {
            // Nothing to do
            return Task.CompletedTask;
        }

        public override async Task<bool> RegisterRequestHandlerAsync(
            string requestType,
            Delegate requestHandler,
            int responseTimeoutInMs = 5000
        )
        {
            return _localMethods.TryAdd(requestType, requestHandler);
        }

        public override Task SendEventAsync(string eventType, object? eventParameters)
        {
            return Task.CompletedTask;
        }

        public override Task<T?> SendRequestAsync<T>(
            string requestType,
            IReadOnlyList<object?>? requestContents
        )
            where T : default
        {
            return Task.FromResult<T?>(default);
        }

        #endregion
    }
}
