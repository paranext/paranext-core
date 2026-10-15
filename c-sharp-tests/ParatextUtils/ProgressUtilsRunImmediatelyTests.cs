using System;
using System.Diagnostics.CodeAnalysis;
using Paranext.DataProvider.ParatextUtils;
using PtxUtils.Progress;

namespace TestParanextDataProvider.ParatextUtils
{
    /// <summary>
    /// Pins that <see cref="ProgressUtilsRunImmediately"/> runs a progress action on the calling
    /// thread. Code that watches a ParatextData call with a thread-scoped
    /// <see cref="TextSearchingTraceListener"/> (the DBL catalog fetch's 401 detection) relies on
    /// this: ParatextData wraps such calls in <see cref="ProgressUtils.Execute(ThreadStart)"/>, and
    /// an implementation that moved the action to a worker thread would make those listeners miss
    /// their trace silently.
    /// </summary>
    [TestFixture]
    [ExcludeFromCodeCoverage]
    internal class ProgressUtilsRunImmediatelyTests
    {
        private ProgressUtils _previousImplementation = null!;

        [SetUp]
        public void SetUp()
        {
            _previousImplementation = ProgressUtils.Implementation;
            ProgressUtils.Implementation = new ProgressUtilsRunImmediately();
        }

        [TearDown]
        public void TearDown()
        {
            ProgressUtils.Implementation = _previousImplementation;
        }

        [Test]
        public void Execute_RunsActionOnCallingThread()
        {
            int callingThreadId = Environment.CurrentManagedThreadId;
            int? actionThreadId = null;

            ProgressUtils.Execute(
                "title",
                CancelModes.Cancelable,
                () => actionThreadId = Environment.CurrentManagedThreadId
            );

            Assert.That(actionThreadId, Is.EqualTo(callingThreadId));
        }

        [Test]
        public void ExecuteOnSameThread_RunsActionOnCallingThread()
        {
            int callingThreadId = Environment.CurrentManagedThreadId;
            int? actionThreadId = null;

            ProgressUtils.ExecuteOnSameThread(
                "title",
                CancelModes.Cancelable,
                () => actionThreadId = Environment.CurrentManagedThreadId
            );

            Assert.That(actionThreadId, Is.EqualTo(callingThreadId));
        }
    }
}
