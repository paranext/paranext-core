using System;
using System.Diagnostics;
using System.Diagnostics.CodeAnalysis;
using System.Threading;
using Paranext.DataProvider.ParatextUtils;

namespace TestParanextDataProvider.ParatextUtils
{
    /// <summary>
    /// Verifies that <see cref="TextSearchingTraceListener"/> latches <c>FoundText</c> on a
    /// matching trace, and that <c>currentThreadOnly</c> ignores traces written on other threads.
    /// Each test adds its listener to the process-global <see cref="Trace.Listeners"/> and removes
    /// it again, so the collection is left as it was found.
    /// </summary>
    [TestFixture]
    [ExcludeFromCodeCoverage]
    internal class TextSearchingTraceListenerTests
    {
        private const string TEXT_TO_FIND = "REST ProtocolError = 401";

        [Test]
        public void Default_MatchingTraceOnSameThread_SetsFoundText()
        {
            TextSearchingTraceListener listener = new(TEXT_TO_FIND);

            RunWithListener(listener, () => Trace.TraceWarning($"Request failed: {TEXT_TO_FIND}"));

            Assert.That(listener.FoundText, Is.True);
        }

        [Test]
        public void Default_MatchingTraceOnOtherThread_SetsFoundText()
        {
            TextSearchingTraceListener listener = new(TEXT_TO_FIND);

            RunWithListener(listener, () => TraceOnOtherThread($"Request failed: {TEXT_TO_FIND}"));

            Assert.That(
                listener.FoundText,
                Is.True,
                "an unscoped listener sees traces from every thread"
            );
        }

        [Test]
        public void CurrentThreadOnly_MatchingTraceOnSameThread_SetsFoundText()
        {
            TextSearchingTraceListener listener = new(TEXT_TO_FIND, currentThreadOnly: true);

            RunWithListener(listener, () => Trace.TraceWarning($"Request failed: {TEXT_TO_FIND}"));

            Assert.That(listener.FoundText, Is.True);
        }

        [Test]
        public void CurrentThreadOnly_MatchingTraceOnOtherThread_DoesNotSetFoundText()
        {
            TextSearchingTraceListener listener = new(TEXT_TO_FIND, currentThreadOnly: true);

            RunWithListener(
                listener,
                () =>
                {
                    TraceOnOtherThread($"Request failed: {TEXT_TO_FIND}");
                    Assert.That(
                        listener.FoundText,
                        Is.False,
                        "a thread-scoped listener must ignore traces from other threads"
                    );

                    // Positive control: the same listener, still attached, does match a trace on
                    // its own thread, so the negative assertion above is not vacuous.
                    Trace.TraceWarning($"Request failed: {TEXT_TO_FIND}");
                }
            );

            Assert.That(listener.FoundText, Is.True);
        }

        [TestCase(false)]
        [TestCase(true)]
        public void NonMatchingTrace_DoesNotSetFoundText(bool currentThreadOnly)
        {
            TextSearchingTraceListener listener = new(TEXT_TO_FIND, currentThreadOnly);

            RunWithListener(
                listener,
                () =>
                {
                    Trace.TraceWarning("REST ProtocolError = 404");
                    TraceOnOtherThread("REST ProtocolError = 404");
                }
            );

            Assert.That(listener.FoundText, Is.False);
        }

        private static void RunWithListener(TraceListener listener, Action action)
        {
            int listenerCountBefore = Trace.Listeners.Count;
            Trace.Listeners.Add(listener);
            try
            {
                action();
            }
            finally
            {
                Trace.Listeners.Remove(listener);
            }
            Assert.That(Trace.Listeners, Has.Count.EqualTo(listenerCountBefore));
        }

        /// <summary>
        /// Traces <paramref name="message"/> on a dedicated thread and waits for it. A dedicated
        /// <see cref="Thread"/> rather than <c>Task.Run(...).Wait()</c>, because <c>Wait</c> may
        /// inline a not-yet-started task on the waiting thread, which would make the "other
        /// thread" the test thread.
        /// </summary>
        private static void TraceOnOtherThread(string message)
        {
            int callerThreadId = Environment.CurrentManagedThreadId;
            int tracingThreadId = callerThreadId;
            Thread thread =
                new(() =>
                {
                    tracingThreadId = Environment.CurrentManagedThreadId;
                    Trace.TraceWarning(message);
                })
                {
                    IsBackground = true,
                };
            thread.Start();
            thread.Join();

            Assert.That(
                tracingThreadId,
                Is.Not.EqualTo(callerThreadId),
                "precondition: the trace must run on a different thread"
            );
        }
    }
}
