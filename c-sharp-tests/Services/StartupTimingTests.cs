using System.Diagnostics.CodeAnalysis;
using Paranext.DataProvider.Services;

namespace TestParanextDataProvider.Services;

[ExcludeFromCodeCoverage]
internal class StartupTimingTests
{
    private TextWriter _originalOut = null!;
    private bool _originalEnabled;
    private StringWriter _writer = null!;

    [SetUp]
    public void SetUp()
    {
        _originalOut = Console.Out;
        _originalEnabled = StartupTiming.Enabled;
        _writer = new StringWriter();
        Console.SetOut(_writer);
    }

    [TearDown]
    public void TearDown()
    {
        // Runs even when a test's assertion fails, so a redirected Console.Out or a flipped Enabled
        // flag never leaks into the rest of the run. Safe because no [Parallelizable] exists
        // anywhere in c-sharp-tests, so these process-global mutations don't race other fixtures.
        Console.SetOut(_originalOut);
        StartupTiming.Enabled = _originalEnabled;
        _writer.Dispose();
    }

    [Test]
    public void Mark_WhenEnabled_WritesParseableLineToConsole()
    {
        StartupTiming.Enabled = true;

        StartupTiming.Mark("scan-start");

        var line = _writer.ToString().Trim();
        Assert.That(line, Does.Match(@"^STARTUP_MARK \.net scan-start \d+$"));
    }

    [Test]
    public void Mark_WhenDisabled_WritesNothing()
    {
        StartupTiming.Enabled = false;

        StartupTiming.Mark("scan-start");

        Assert.That(_writer.ToString(), Is.Empty);
    }

    [Test]
    public void MarkOnce_EmitsAtMostOncePerName()
    {
        StartupTiming.Enabled = true;

        // Unique name: the once-set is a static that persists across tests in the process.
        StartupTiming.MarkOnce("mark-once-test-name");
        StartupTiming.MarkOnce("mark-once-test-name");
        StartupTiming.MarkOnce("mark-once-test-name");

        var lines = _writer.ToString().Split('\n', StringSplitOptions.RemoveEmptyEntries);
        Assert.That(lines, Has.Length.EqualTo(1));
    }
}
