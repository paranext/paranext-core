using System;
using System.Collections.Generic;
using System.Threading;
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
        public void Dispose_ClearsCancelledStopsForwardingAndEmitsNoSpuriousText()
        {
            var captured = new List<string>();
            var scope = ProgressCapture.StartCapture(captured.Add);
            scope.Cancel();

            int countBeforeDispose = captured.Count;
            scope.Dispose();

            Assert.That(
                Progress.Mgr.Cancelled,
                Is.False,
                "Reset() should clear stale cancel state"
            );
            // Dispose detaches the display before Reset()'s `Text = ""`, so it must NOT forward a
            // spurious empty status to the callback. A bare Does.Not.Contain("after dispose") would
            // pass even if captured were [""], so assert the count is exactly unchanged.
            Assert.That(
                captured,
                Has.Count.EqualTo(countBeforeDispose),
                "Dispose must not forward any status (including an empty string) to the callback"
            );

            using (var session = Progress.Mgr.StartIndefiniteTask())
                session.Text = "after dispose";
            Assert.That(
                captured,
                Has.Count.EqualTo(countBeforeDispose),
                "display detached on dispose — no forwarding after dispose"
            );
            Assert.That(captured, Does.Not.Contain("after dispose"));
        }

        [Test]
        public void SetProgressValue_ForwardsValueToOnValueCallback()
        {
            var values = new List<double>();
            using (ProgressCapture.StartCapture(_ => { }, v => values.Add(v)))
            {
                // Drive SetProgressValue via a determinate task session (StartTask maps
                // Value → SetProgressValue as a 0..1 fraction; Value=42 on a 0..100 task → 0.42).
                using var session = Progress.Mgr.StartTask(0, 100, "");
                session.Value = 42;
            }
            Assert.That(values, Does.Contain(0.42));
        }

        [Test]
        public void SetProgressValue_SwallowsCallbackException()
        {
            using var scope = ProgressCapture.StartCapture(
                _ => { },
                _ => throw new InvalidOperationException("value callback boom")
            );

            Assert.DoesNotThrow(() =>
            {
                using var session = Progress.Mgr.StartTask(0, 100, "");
                session.Value = 42;
            });
        }

        [Test]
        public void Cancel_FromAnotherThread_SetsFlagOnCapturedInstanceNotTheCaller()
        {
            // The whole point of ProgressScope holding a direct Progress reference (instead of
            // re-reading the [ThreadStatic] Progress.Mgr) is that Cancel() works from a thread
            // other than the one running the captured operation. Single-threaded tests can't
            // exercise that — there scope._progress and Progress.Mgr are the same instance.
            ProgressCapture.ProgressScope? scope = null;
            Progress workerProgress = null!;
            using var started = new ManualResetEventSlim();
            using var release = new ManualResetEventSlim();

            var worker = new Thread(() =>
            {
                workerProgress = Progress.Mgr; // this thread's own [ThreadStatic] instance
                scope = ProgressCapture.StartCapture();
                started.Set();
                release.Wait(); // keep the captured instance alive until the assertions run
            })
            {
                IsBackground = true,
            };
            worker.Start();
            started.Wait();

            Assert.That(
                Progress.Mgr,
                Is.Not.SameAs(workerProgress),
                "precondition: caller and worker must have distinct thread-static Progress instances"
            );

            scope!.Cancel(); // called from the test thread, not the worker thread

            Assert.That(
                workerProgress.Cancelled,
                Is.True,
                "cross-thread Cancel must set the flag on the captured (worker) instance"
            );
            Assert.That(
                Progress.Mgr.Cancelled,
                Is.False,
                "Cancel must not touch the cancelling thread's own Progress.Mgr"
            );

            release.Set();
            worker.Join();
            workerProgress.Reset();
        }
    }
}
