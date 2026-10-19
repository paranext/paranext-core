using System;
using System.Diagnostics;
using System.Diagnostics.CodeAnalysis;
using System.Linq;
using System.Threading;
using Paranext.DataProvider.ParatextUtils;

namespace TestParanextDataProvider.ParatextUtils
{
    /// <summary>
    /// Verifies <see cref="TextSearchingTraceListener.WasTracedDuring"/>: it reports a matching
    /// trace written while the watched call runs, ignores traces from other threads when
    /// <c>currentThreadOnly</c> is set, and removes its listener from the process-global
    /// <see cref="Trace.Listeners"/> even when the watched call throws.
    /// </summary>
    /// <remarks>
    /// Each test searches for its own text (the test name plus a GUID), so a listener that sees
    /// every thread cannot be tripped by a trace written elsewhere in the run.
    /// </remarks>
    // Serial-only: these tests add listeners to the process-global Trace.Listeners. Safe because no
    // [Parallelizable] exists anywhere in c-sharp-tests; [NonParallelizable] keeps this fixture
    // serial if that ever changes.
    [TestFixture]
    [NonParallelizable]
    [ExcludeFromCodeCoverage]
    internal class TextSearchingTraceListenerTests
    {
        [TestCase(false)]
        [TestCase(true)]
        public void WasTracedDuring_MatchingTraceOnSameThread_ReturnsTrue(bool currentThreadOnly)
        {
            string text = UniqueText();

            bool found = TextSearchingTraceListener.WasTracedDuring(
                text,
                () => Trace.TraceWarning($"Request failed: {text}"),
                currentThreadOnly
            );

            Assert.That(found, Is.True);
        }

        [Test]
        public void WasTracedDuring_Unscoped_MatchingTraceOnOtherThread_ReturnsTrue()
        {
            string text = UniqueText();

            bool found = TextSearchingTraceListener.WasTracedDuring(
                text,
                () => TraceOnOtherThread($"Request failed: {text}"),
                currentThreadOnly: false
            );

            Assert.That(found, Is.True, "an unscoped listener sees traces from every thread");
        }

        [Test]
        public void WasTracedDuring_CurrentThreadOnly_MatchingTraceOnOtherThread_ReturnsFalse()
        {
            string text = UniqueText();

            bool foundOnOtherThread = TextSearchingTraceListener.WasTracedDuring(
                text,
                () => TraceOnOtherThread($"Request failed: {text}"),
                currentThreadOnly: true
            );

            Assert.That(
                foundOnOtherThread,
                Is.False,
                "a thread-scoped listener must ignore traces from other threads"
            );

            // Positive control: the same text traced on this thread is found, so the negative
            // assertion above is not vacuous.
            Assert.That(
                TextSearchingTraceListener.WasTracedDuring(
                    text,
                    () => Trace.TraceWarning($"Request failed: {text}"),
                    currentThreadOnly: true
                ),
                Is.True
            );
        }

        [TestCase(false)]
        [TestCase(true)]
        public void WasTracedDuring_NonMatchingTrace_ReturnsFalse(bool currentThreadOnly)
        {
            string text = UniqueText();
            string nonMatching = text.Replace("Watch", "Other", StringComparison.Ordinal);

            bool found = TextSearchingTraceListener.WasTracedDuring(
                text,
                () =>
                {
                    Trace.TraceWarning(nonMatching);
                    TraceOnOtherThread(nonMatching);
                },
                currentThreadOnly
            );

            Assert.That(found, Is.False);

            // Positive control: the searched-for text, traced the same way, is found.
            Assert.That(
                TextSearchingTraceListener.WasTracedDuring(
                    text,
                    () => Trace.TraceWarning(text),
                    currentThreadOnly
                ),
                Is.True
            );
        }

        [Test]
        public void WasTracedDuring_TraceWrite_ReturnsTrue()
        {
            string text = UniqueText();

            bool found = TextSearchingTraceListener.WasTracedDuring(
                text,
                () => Trace.Write(text),
                currentThreadOnly: true
            );

            Assert.That(found, Is.True);
        }

        [Test]
        public void WasTracedDuring_TraceWriteLine_ReturnsTrue()
        {
            string text = UniqueText();

            bool found = TextSearchingTraceListener.WasTracedDuring(
                text,
                () => Trace.WriteLine(text),
                currentThreadOnly: true
            );

            Assert.That(found, Is.True);
        }

        [Test]
        public void WasTracedDuring_CallThrows_PropagatesAndRemovesListener()
        {
            string text = UniqueText();
            TraceListener[] listenersBefore = Trace.Listeners.Cast<TraceListener>().ToArray();
            TraceListener? addedListener = null;

            // A local function rather than a lambda: a lambda that only throws also converts to
            // Func<Task>, which binds to the overload that rejects async calls.
            void CaptureListenerThenThrow()
            {
                addedListener = Trace
                    .Listeners.Cast<TraceListener>()
                    .Except(listenersBefore)
                    .SingleOrDefault();
                throw new InvalidOperationException(text);
            }

            Assert.That(
                () =>
                    TextSearchingTraceListener.WasTracedDuring(
                        text,
                        CaptureListenerThenThrow,
                        currentThreadOnly: true
                    ),
                Throws.InvalidOperationException.With.Message.EqualTo(text)
            );
            Assert.That(
                addedListener,
                Is.InstanceOf<TextSearchingTraceListener>(),
                "precondition: the helper attached a listener while the call ran"
            );
            Assert.That(Trace.Listeners, Does.Not.Contain(addedListener));
        }

        [Test]
        public void WasTracedDuring_EmptyTextToFind_ThrowsWithoutRunningTheCall()
        {
            bool ran = false;

            Assert.That(
                () => TextSearchingTraceListener.WasTracedDuring("", () => ran = true, false),
                Throws.ArgumentException
            );
            Assert.That(ran, Is.False);
        }

        [Test]
        public void Constructor_EmptyTextToFind_Throws()
        {
            // A listener constructed directly, rather than through WasTracedDuring, must not be
            // able to search for empty text, which every message contains.
            Assert.That(() => new TextSearchingTraceListener(""), Throws.ArgumentException);
        }

        /// <summary>
        /// Text unique to the calling test, so a listener cannot match a trace another test wrote.
        /// </summary>
        private static string UniqueText() =>
            $"Watch {TestContext.CurrentContext.Test.Name} {Guid.NewGuid():N}";

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
