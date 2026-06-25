using System;
using System.Collections.Generic;
using NUnit.Framework;
using Paranext.DataProvider.ParatextUtils;
using PtxUtils.Progress;

namespace TestParanextDataProvider.ParatextUtils
{
    /// <summary>
    /// Pure unit tests for <see cref="ProgressCapture"/>: status forwarding,
    /// cross-thread-safe cancellation flag, and scope cleanup. No ScrText,
    /// no PAPI, no network. Mirrors the AlertCaptureTests style.
    /// </summary>
    [TestFixture]
    internal class ProgressCaptureTests
    {
        [TearDown]
        public void Teardown() => Progress.Mgr.Reset();

        [Test]
        public void SetProgressText_ForwardsParatextDataStatusToCallback()
        {
            var captured = new List<string>();
            using var scope = ProgressCapture.StartCapture(captured.Add);

            // Simulate ParatextData reporting status through Progress.Mgr.
            using (var session = Progress.Mgr.StartIndefiniteTask())
                session.Text = "Connection to server lost. Retrying...";

            Assert.That(captured, Does.Contain("Connection to server lost. Retrying..."));
        }

        [Test]
        public void SetProgressText_SwallowsCallbackException()
        {
            // A callback that throws must NOT escape into ParatextData's status-update path
            // (it runs synchronously inside the retry loop), or it would turn an otherwise
            // recoverable reconnect into a hard Send/Receive failure.
            using var scope = ProgressCapture.StartCapture(_ =>
                throw new InvalidOperationException("callback boom")
            );

            Assert.DoesNotThrow(() =>
            {
                using var session = Progress.Mgr.StartIndefiniteTask();
                session.Text = "trigger";
            });
        }

        [Test]
        public void Cancel_SetsCancelledFlagOnActiveProgress()
        {
            using var scope = ProgressCapture.StartCapture();
            Assert.That(scope.Cancelled, Is.False);

            scope.Cancel();

            Assert.That(scope.Cancelled, Is.True);
            Assert.That(Progress.Mgr.Cancelled, Is.True);
        }

        [Test]
        public void Dispose_ClearsCancelledAndStopsForwarding()
        {
            var captured = new List<string>();
            var scope = ProgressCapture.StartCapture(captured.Add);
            scope.Cancel();
            scope.Dispose();

            Assert.That(Progress.Mgr.Cancelled, Is.False, "Reset() should clear stale cancel state");

            using (var session = Progress.Mgr.StartIndefiniteTask())
                session.Text = "after dispose";
            Assert.That(captured, Does.Not.Contain("after dispose"), "display detached on dispose");
        }
    }
}
