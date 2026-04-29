namespace MarbleSchemaExtractor.Tests;

[TestFixture]
public class CommandDispatcherTests
{
    [Test]
    public void Dispatch_NoArgs_ThrowsUsage()
    {
        Assert.That(() => CommandDispatcher.Dispatch([]), Throws.InstanceOf<UsageException>());
    }

    [Test]
    public void Dispatch_UnknownCommand_ThrowsUsage()
    {
        Assert.That(
            () => CommandDispatcher.Dispatch(["--whatever"]),
            Throws.InstanceOf<UsageException>()
        );
    }

    [Test]
    public void Dispatch_ListMissingPath_ThrowsUsage()
    {
        Assert.That(
            () => CommandDispatcher.Dispatch(["--list"]),
            Throws.InstanceOf<UsageException>()
        );
    }

    [Test]
    public void Dispatch_StatsMissingType_ThrowsUsage()
    {
        Assert.That(
            () => CommandDispatcher.Dispatch(["--stats", "/tmp/x.zip"]),
            Throws.InstanceOf<UsageException>()
        );
    }

    [Test]
    public void Dispatch_StatsUnknownType_ThrowsUsage()
    {
        Assert.That(
            () => CommandDispatcher.Dispatch(["--stats", "/tmp/x.zip", "--type", "bogus"]),
            Throws.InstanceOf<UsageException>()
        );
    }
}
