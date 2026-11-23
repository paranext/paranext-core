using System.Text;
using Paranext.DataProvider;

namespace TestParanextDataProvider;

[TestFixture]
public class ThreadingUtilsTests
{
    private TextWriter _originalError = null!;
    private SignalingTextWriter _writer = null!;

    [SetUp]
    public void SetUp()
    {
        _originalError = Console.Error;
        _writer = new SignalingTextWriter();
        Console.SetError(_writer);
    }

    [TearDown]
    public void TearDown()
    {
        // Restore stderr even when an assertion fails, so the redirect never leaks into the rest of
        // the run. Safe because no [Parallelizable] exists anywhere in c-sharp-tests, so this
        // process-global mutation does not race other fixtures.
        Console.SetError(_originalError);
        _writer.Dispose();
    }

    [Test]
    public async Task ObserveTaskLoggingErrorsToStderr_WhenTaskFaults_LogsDescriptionAndExceptionToStderr()
    {
        var faulted = Task.FromException(new InvalidOperationException("boom"));

        ThreadingUtils.ObserveTaskLoggingErrorsToStderr(faulted, "load-widgets");

        // The observer is fire-and-forget (it discards its ContinueWith task), so wait for the
        // continuation to run instead of reading stderr immediately.
        Assert.That(
            await _writer.WaitForWriteAsync(TimeSpan.FromSeconds(5)),
            Is.True,
            "Expected the fault observer to write to stderr"
        );
        Assert.That(_writer.Text, Does.Contain("load-widgets"));
        Assert.That(_writer.Text, Does.Contain("boom"));
    }

    [Test]
    public async Task ObserveTaskLoggingErrorsToStderr_WhenTaskHasMultipleFaults_LogsEveryFault()
    {
        // A WhenAll over two failed tasks faults with an AggregateException carrying both. Keeping
        // the ContinueWith(OnlyOnFaulted) shape (rather than an async-lambda try/catch) is what
        // preserves every fault in the logged output.
        var whenAll = Task.WhenAll(
            Task.FromException(new InvalidOperationException("first-fault")),
            Task.FromException(new InvalidOperationException("second-fault"))
        );

        ThreadingUtils.ObserveTaskLoggingErrorsToStderr(whenAll, "load-widgets");

        Assert.That(await _writer.WaitForWriteAsync(TimeSpan.FromSeconds(5)), Is.True);
        Assert.That(_writer.Text, Does.Contain("first-fault"));
        Assert.That(_writer.Text, Does.Contain("second-fault"));
    }

    [Test]
    public async Task ObserveTaskLoggingErrorsToStderr_WhenTaskSucceeds_WritesNothing()
    {
        ThreadingUtils.ObserveTaskLoggingErrorsToStderr(Task.CompletedTask, "load-widgets");

        // OnlyOnFaulted means the continuation must not run for a successful task. Give any
        // erroneous continuation ample time to fire before asserting nothing was written.
        Assert.That(await _writer.WaitForWriteAsync(TimeSpan.FromMilliseconds(250)), Is.False);
        Assert.That(_writer.Text, Is.Empty);
    }

    /// <summary>
    /// A stderr capture writer that also signals the first write, so a test can await a
    /// fire-and-forget continuation deterministically instead of polling or sleeping a fixed time.
    /// </summary>
    private sealed class SignalingTextWriter : TextWriter
    {
        private readonly StringBuilder _builder = new();
        private readonly object _lock = new();
        private readonly TaskCompletionSource _written =
            new(TaskCreationOptions.RunContinuationsAsynchronously);

        public override Encoding Encoding => Encoding.UTF8;

        public string Text
        {
            get
            {
                lock (_lock)
                    return _builder.ToString();
            }
        }

        public override void Write(char value)
        {
            lock (_lock)
                _builder.Append(value);
            _written.TrySetResult();
        }

        public override void Write(string? value)
        {
            if (value == null)
                return;
            lock (_lock)
                _builder.Append(value);
            _written.TrySetResult();
        }

        /// <summary>Resolves true if something was written within <paramref name="timeout"/>, else false.</summary>
        public async Task<bool> WaitForWriteAsync(TimeSpan timeout)
        {
            var finished = await Task.WhenAny(_written.Task, Task.Delay(timeout));
            return finished == _written.Task;
        }
    }
}
