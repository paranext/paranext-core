using System.Diagnostics.CodeAnalysis;
using Paranext.DataProvider;
using Paranext.DataProvider.NetworkObjects.Documentation;

namespace TestParanextDataProvider
{
    [ExcludeFromCodeCoverage]
    internal class DummyPapiClient : PapiClient
    {
        private readonly Queue<(string eventType, object? eventParameters)> _sentEvents = [];

        private readonly Queue<(
            string requestType,
            IReadOnlyList<object?>? requestContents
        )> _sentRequests = [];

        private readonly Dictionary<
            string,
            OpenRpcSingleMethodDocumentation?
        > _documentationByRequestType = [];

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
            TimeSpan? timeout = null,
            OpenRpcSingleMethodDocumentation? documentation = null
        )
        {
            _documentationByRequestType[requestType] = documentation;
            return Task.FromResult(_localMethods.TryAdd(requestType, requestHandler));
        }

        /// <summary>
        /// Test-only accessor for the OpenRPC documentation a request type was registered with
        /// (null when registered without docs, or when not registered at all). Lets tests assert the
        /// <c>NetworkObjectDocumentation</c> experimental cascade onto each method's wire docs.
        /// </summary>
        public OpenRpcSingleMethodDocumentation? GetDocumentationFor(string requestType) =>
            _documentationByRequestType.GetValueOrDefault(requestType);

        /// <summary>
        /// Test-only helper to unregister a request handler so a test can replace one a shared
        /// <c>SetUp</c> registered (<see cref="RegisterRequestHandlerAsync"/> uses
        /// <c>TryAdd</c> and will not overwrite an existing key).
        /// </summary>
        public void RemoveRequestHandler(string requestType) =>
            _localMethods.TryRemove(requestType, out _);

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
            _sentRequests.Enqueue((requestType, requestContents));
            // Central-registry event registration returns an acceptance boolean; pretend main
            // accepted (mirrors ConnectAsync's "pretend we succeeded") so services under test don't
            // take their registration-failure paths. Kept strictly to this one request type so no
            // other test's SendRequestAsync expectations change.
            if (requestType == "network:registerEvent")
                // T is bool here; there is no non-casting way to satisfy the generic return type.
                return Task.FromResult<T?>((T)(object)true);
            return Task.FromResult<T?>(default);
        }

        /// <summary>
        /// Test-only count of requests sent through <see cref="SendRequestAsync{T}"/> that were NOT
        /// handled by a locally-registered handler (i.e. would have gone over the wire to main).
        /// </summary>
        public int SentRequestCount
        {
            get { return _sentRequests.Count; }
        }

        /// <summary>
        /// Test-only dequeue of the oldest captured outgoing request (see
        /// <see cref="SentRequestCount"/>). Lets tests assert wire calls like
        /// <c>network:registerEvent</c> without a live PAPI connection.
        /// </summary>
        public (string requestType, IReadOnlyList<object?>? requestContents) NextSentRequest
        {
            get { return _sentRequests.Dequeue(); }
        }

        /// <summary>
        /// Test-only accessor that reports whether a handler is registered in
        /// <c>_localMethods</c> for the given wire name. Exposes the protected
        /// dictionary directly so tests can verify registration without the
        /// fragile "probe by invocation" pattern (which conflates "handler
        /// present" with "handler threw on bad args").
        /// </summary>
        public bool IsHandlerRegistered(string requestType) =>
            _localMethods.ContainsKey(requestType);

        /// <summary>
        /// Test-only helper that invokes a locally-registered request handler directly (bypassing the
        /// websocket the base client would use) and returns its result. Lets a test assert what a
        /// registered command handler returns without a live PAPI connection.
        /// </summary>
        public object? InvokeRequestHandler(string requestType, params object?[] args)
        {
            if (!_localMethods.TryGetValue(requestType, out var handler))
                throw new InvalidOperationException(
                    $"No handler registered for request type \"{requestType}\""
                );
            return handler.DynamicInvoke(args);
        }

        #endregion
    }
}
