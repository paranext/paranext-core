using System;

namespace Platform.Bible.PapiInterfaces
{
    /// <summary>
    /// Interface to be implemented by extensions to raise custom events.
    /// </summary>
    public interface IMessageEvent
    {
        /// <summary>
        /// Event ID (typically prefixed with the name of the extension and a colon). For example, "transcelerator:questionTranslationUpdated"
        /// </summary>
        string EventType { get; set; }

        /// <summary>
        /// Weakly typed contents of the event message.
        /// </summary>
        dynamic? EventContents { get; set; }

        /// <summary>
        /// The intended type of the data stored in <see cref="EventContents"/>. This is used during deserialization.
        /// </summary>
        public Type EventContentsType { get; }
    }
}
