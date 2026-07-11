using Paranext.DataProvider.Services;

namespace TestParanextDataProvider.Services;

public class StartupTimingTests
{
    [Test]
    public void Mark_WhenEnabled_WritesParseableLineToConsole()
    {
        var originalOut = Console.Out;
        var originalEnabled = StartupTiming.Enabled;
        try
        {
            StartupTiming.Enabled = true;
            using var writer = new StringWriter();
            Console.SetOut(writer);

            StartupTiming.Mark("scan-start");

            var line = writer.ToString().Trim();
            Assert.That(line, Does.Match(@"^STARTUP_MARK \.net scan-start \d+$"));
        }
        finally
        {
            Console.SetOut(originalOut);
            StartupTiming.Enabled = originalEnabled;
        }
    }

    [Test]
    public void Mark_WhenDisabled_WritesNothing()
    {
        var originalOut = Console.Out;
        var originalEnabled = StartupTiming.Enabled;
        try
        {
            StartupTiming.Enabled = false;
            using var writer = new StringWriter();
            Console.SetOut(writer);

            StartupTiming.Mark("scan-start");

            Assert.That(writer.ToString(), Is.Empty);
        }
        finally
        {
            Console.SetOut(originalOut);
            StartupTiming.Enabled = originalEnabled;
        }
    }
}
