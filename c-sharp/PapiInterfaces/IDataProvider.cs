using System.Text.Json.Nodes;

namespace Platform.Bible.PapiInterfaces
{
    /// <summary>
    /// Interface to be implemented by extensions that expose a data provider to Platform.Bible via PAPI.
    /// </summary>
    public interface IDataProvider
    {
        /// <summary>
        /// The name (typically prefixed with the name of the extension and a colon). For example, "transcelerator:questions"
        /// </summary>
        string Name { get; }

        /// <summary>
        /// Initializes the data provider
        /// </summary>
        /// <remarks>Once a data provider has started, it should send out update events whenever its data changes.</remarks>
        void Start();

        /// <summary>
        /// Handle a request from a service using this data provider
        /// </summary>
        /// <param name="functionName">This would typically be "getXYZ" or "setXYZ", where "XYZ" is a type of data handled by this provider</param>
        /// <param name="args">Optional arguments provided by the requester for the function indicated</param>
        /// <returns>ResponseToRequest value that either contains a response for the function or an error message</returns>
        ResponseToRequest HandleRequest(string functionName, JsonArray args);
    }
}
