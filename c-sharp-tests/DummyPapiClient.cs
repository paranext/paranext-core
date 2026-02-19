using System.Diagnostics.CodeAnalysis;
using Paranext.DataProvider;

namespace TestParanextDataProvider
{
    [ExcludeFromCodeCoverage]
    internal class DummyPapiClient : PapiClient
    {
        private readonly Queue<(string eventType, object? eventParameters)> _sentEvents = [];

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

        #region Test helper methods

        /// <summary>
        /// Checks whether a request handler has been registered for the given request type.
        /// Used by NetworkObjectRegistrationTests to verify command registration.
        /// </summary>
        public bool IsRequestHandlerRegistered(string requestType)
        {
            return _localMethods.ContainsKey(requestType);
        }

        /// <summary>
        /// Returns all registered request type keys.
        /// Used by NetworkObjectRegistrationTests to verify registration counts.
        /// </summary>
        public IReadOnlyCollection<string> GetRegisteredRequestTypes()
        {
            return _localMethods.Keys.ToList().AsReadOnly();
        }

        /// <summary>
        /// Returns the delegate registered for the given request type, or null if not found.
        /// Used by NetworkObjectRegistrationTests to verify handler parameter counts.
        /// </summary>
        public Delegate? GetRegisteredHandler(string requestType)
        {
            _localMethods.TryGetValue(requestType, out var handler);
            return handler;
        }

        #endregion
    }
}
