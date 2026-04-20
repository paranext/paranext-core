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

        /// <summary>
        /// Test-only read-only view of the request-type keys currently registered
        /// on this client. Used by CAP-012 <c>ManageBooksServiceRegistrationTests</c>
        /// to assert the Theme-1 single-NetworkObject registration constraint:
        /// every manage-books wire method dispatches via
        /// <c>object:platformScripture.manageBooks.{method}</c> and no individual
        /// <c>command:</c> handlers are registered for manage-books.
        /// </summary>
        public IReadOnlyCollection<string> RegisteredRequestTypes => _localMethods.Keys.ToArray();

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
