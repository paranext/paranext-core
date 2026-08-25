using System.Collections.Concurrent;
using System.Diagnostics.CodeAnalysis;
using Paranext.DataProvider;
using Paranext.DataProvider.NetworkObjects.Documentation;

namespace TestParanextDataProvider
{
    [ExcludeFromCodeCoverage]
    internal class DummyPapiClient : PapiClient
    {
        // ConcurrentQueue (not Queue): PDP registration ends in SendEventAsync, and per-project
        // PDP creation registers PDPs concurrently (same motivation as
        // _documentationByRequestType below), so concurrent tests can enqueue from multiple
        // threads at once.
        private readonly ConcurrentQueue<(string eventType, object? eventParameters)> _sentEvents =
            new();

        private readonly Queue<(
            string requestType,
            IReadOnlyList<object?>? requestContents
        )> _sentRequests = [];

        // ConcurrentDictionary (not Dictionary): RegisterRequestHandlerAsync writes this on every
        // PDP registration, and per-project PDP creation registers PDPs concurrently (fire-
        // and-forget, not serialized behind a single creation lock - see
        // ParatextProjectDataProviderFactoryBase.GetProjectDataProviderID), so concurrent tests can
        // legitimately hit this from multiple threads at once.
        private readonly ConcurrentDictionary<
            string,
            OpenRpcSingleMethodDocumentation?
        > _documentationByRequestType = new();

        /// <summary>
        /// Test-only override for how a <c>network:registerEvent</c> request resolves. Defaults to
        /// "main accepted" (returns <c>true</c>) — the normal happy path that services under test
        /// rely on so they don't take their registration-failure branches. A test can swap in a
        /// delegate that returns <c>false</c> (registry rejection) or throws (registry failure) to
        /// exercise those best-effort branches. Scoped strictly to <c>network:registerEvent</c> so
        /// no other test's <see cref="SendRequestAsync{T}"/> expectations change.
        /// </summary>
        public Func<bool> RegisterEventResponse { get; set; } = () => true;

        // Event handlers registered through RegisterEventHandler, keyed by event type. Mirrors
        // _localMethods, which the base client keeps for request handlers.
        private readonly ConcurrentDictionary<string, Delegate> _localEventHandlers = new();

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
            get
            {
                // Same contract as Queue.Dequeue: throw when empty
                return _sentEvents.TryDequeue(out var sentEvent)
                    ? sentEvent
                    : throw new InvalidOperationException("No sent events to dequeue.");
            }
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
            // Central-registry event registration returns an acceptance boolean; defer to the
            // configurable RegisterEventResponse (defaults to "main accepted", mirroring
            // ConnectAsync's "pretend we succeeded") so a test can drive the registration-failure
            // paths. Kept strictly to this one request type so no other test's SendRequestAsync
            // expectations change.
            if (requestType == "network:registerEvent")
                // T is bool here; there is no non-casting way to satisfy the generic return type.
                return Task.FromResult<T?>((T)(object)RegisterEventResponse());
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

        /// <summary>
        /// Records the handler instead of adding a JSON-RPC local method (the base client's
        /// <c>_jsonRpc</c> does not exist here), and — importantly — reproduces StreamJsonRpc's
        /// duplicate-name rejection.
        /// <para>
        /// The throw is not incidental fidelity. <c>JsonRpc.AddLocalRpcMethod</c> refuses a second
        /// method with the same name and equivalent parameter list, so two components each calling
        /// <c>RegisterEventHandler</c> for one event name is a startup-killing bug that no test could
        /// otherwise catch: the fault only appears against a live connection. Reproducing it here
        /// makes that class of mistake fail in the suite instead of at launch. Consumers that need to
        /// share an event should subscribe to a fan-out (e.g.
        /// <c>SettingsService.SettingsChanged</c>) rather than register a second handler.
        /// </para>
        /// </summary>
        public override void RegisterEventHandler(string eventType, Delegate eventHandler)
        {
            if (!_localEventHandlers.TryAdd(eventType, eventHandler))
                throw new InvalidOperationException(
                    $"A method with the same name and equivalent parameters has already been "
                        + $"registered: \"{eventType}\""
                );
        }

        /// <summary>
        /// Test-only accessor reporting whether an event handler is registered for the given event
        /// type. The counterpart of <see cref="IsHandlerRegistered"/> for events.
        /// </summary>
        public bool IsEventHandlerRegistered(string eventType) =>
            _localEventHandlers.ContainsKey(eventType);

        /// <summary>
        /// Test-only helper that invokes a locally-registered event handler directly, standing in for
        /// the announcement main would push over the websocket.
        /// </summary>
        public void InvokeEventHandler(string eventType, params object?[] args)
        {
            if (!_localEventHandlers.TryGetValue(eventType, out var handler))
                throw new InvalidOperationException(
                    $"No handler registered for event type \"{eventType}\""
                );
            handler.DynamicInvoke(args);
        }

        #endregion
    }
}
