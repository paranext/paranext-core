using Paranext.DataProvider.MessageHandlers;
using Paranext.DataProvider.Messages;

namespace TestParanextDataProvider.MessageHandlers;

public class MessageHandlerEventTest
{
    private readonly MessageEvent _testMessage = new(EventType.Test, "test");

    [Fact]
    public void TestNoHandler()
    {
        MessageHandlerEvent mhe = new();

        VerifyResults(mhe.HandleMessage(_testMessage), 0);
    }

    [Fact]
    public void TestSingleHandler()
    {
        MessageHandlerEvent mhe = new();

        mhe.RegisterEventHandler(EventType.Test, ProcessEvent1);
        VerifyResults(mhe.HandleMessage(_testMessage), 1);

        mhe.RegisterEventHandler(EventType.Test, ProcessEvent1);
        VerifyResults(mhe.HandleMessage(_testMessage), 1);

        mhe.UnregisterEventHandler(EventType.Test, ProcessEvent1);
        VerifyResults(mhe.HandleMessage(_testMessage), 0);
    }

    [Fact]
    public void TestMultipleHandlers()
    {
        MessageHandlerEvent mhe = new();

        mhe.RegisterEventHandler(EventType.Test, ProcessEvent1);
        mhe.RegisterEventHandler(EventType.Test, ProcessEvent2);
        VerifyResults(mhe.HandleMessage(_testMessage), 2);

        mhe.UnregisterEventHandler(EventType.Test, ProcessEvent2);
        VerifyResults(mhe.HandleMessage(_testMessage), 1);

        mhe.RegisterEventHandler(EventType.Test, ProcessEvent2);
        mhe.RegisterEventHandler(EventType.Test, ProcessEvent3);
        VerifyResults(mhe.HandleMessage(_testMessage), 3);

        mhe.RegisterEventHandler(EventType.Test, ProcessEvent1);
        VerifyResults(mhe.HandleMessage(_testMessage), 3);
    }

    private static void VerifyResults(IEnumerable<Message>? messages, int expectedCount)
    {
        if (expectedCount == 0)
        {
            Assert.Null(messages);
            return;
        }

        Assert.NotNull(messages);
        Assert.Equal(expectedCount, messages.Count());
        List<string> messageContents = new();
        foreach (var msg in messages)
        {
            messageContents.Add(((MessageEvent)msg).Event);
        }
        messageContents.Sort();
        for (int i = 0; i < expectedCount; i++)
        {
            Assert.Equal((i + 1).ToString(), messageContents[i]);
        }
    }

    private Message? ProcessEvent1(dynamic? eventContents)
    {
        return new MessageEvent(EventType.Test, "1");
    }

    private Message? ProcessEvent2(dynamic? eventContents)
    {
        return new MessageEvent(EventType.Test, "2");
    }

    private Message? ProcessEvent3(dynamic? eventContents)
    {
        return new MessageEvent(EventType.Test, "3");
    }
}
