using System;

namespace Platform.Bible.PapiInterfaces
{
    /// <summary>
    /// Response to a data provider request
    /// </summary>
    public class ResponseToRequest
    {
        public ResponseToRequest(bool success, dynamic? resultsOrErrorMessage)
        {
            Success = success;
            if (!success && !(resultsOrErrorMessage is string))
            {
                throw new ArgumentException(
                    $"If the response is not a success, {nameof(resultsOrErrorMessage)} must be an error message.",
                    nameof(resultsOrErrorMessage)
                );
            }

            ResultsOrErrorMessage = resultsOrErrorMessage;
        }

        public bool Success { get; }

        public dynamic? ResultsOrErrorMessage { get; }
    }
}
