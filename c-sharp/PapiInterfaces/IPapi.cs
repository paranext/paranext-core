using System;
using System.Threading.Tasks;

namespace Platform.Bible.PapiInterfaces
{
    /// <summary>
    /// Interface implemented in PlatformBible, supplied as a parameter to
    /// Extension.Activate.
    /// </summary>
    public interface IPapi : IDisposable
    {
        #region Methods
        // REVIEW: Decide whether we need this. Possibly, when general-purpose commands are implemented for the// C# side, we will
        // just need something like Task RegisterCommand(ICommand command);
        ///// <summary>
        ///// Register a request handler with the server.
        ///// </summary>
        ///// <param name="requestType">The request type to register (typically prefixed with the name of the extension and a colon).
        ///// For example, "transcelerator:blah"</param>
        ///// <param name="requestHandler">Method that is called when a request of the specified type is received from the server</param>
        ///// <param name="responseTimeoutInMs">Number of milliseconds to wait for the registration response to be received</param>
        ///// <returns><see cref="Task"/> that will resolve to true if registration was successful, false otherwise</returns>
        //Task<bool> RegisterRequestHandler(
        //    string requestType,
        //    Func<dynamic, IResponseToRequest> requestHandler,
        //    int responseTimeoutInMs = 1000
        //);

        /// <summary>
        /// Called by extensions to register a data provider
        /// </summary>
        /// <param name="dataProvider">The data provider to register</param>
        Task RegisterDataProvider(IDataProvider dataProvider);

        /// <summary>
        /// Request the given event handler to be called <paramref name="eventHandler"/> whenever an event of type <paramref name="eventType"/> is received.
        /// </summary>
        /// <param name="eventType">Event type to monitor</param>
        /// <param name="eventHandler">Action to perform when an event is received</param>
        void RegisterEventHandler(string eventType, Action<dynamic?> eventHandler);

        /// <summary>
        /// Request the given event handler to no longer be called <paramref name="eventHandler"/> whenever an event of type <paramref name="eventType"/> is received.
        /// </summary>
        /// <param name="eventType">Event type to monitor</param>
        /// <param name="eventHandler">Action reference previously passed to RegisterEventHandler</param>
        void UnregisterEventHandler(string eventType, Action<dynamic?> eventHandler);

        /// <summary>
        /// Send an event message to the server.
        /// </summary>
        /// <param name="message">Event message to send</param>
        void SendEvent(IMessageEvent message);

        #endregion
    }
}
