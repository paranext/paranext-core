using Paranext.DataProvider.MessageHandlers;
using Paranext.DataProvider.Messages;
using PtxUtils;

namespace TestParanextDataProvider.MessageHandlers;

public class MessageHandlerEventTests
{
    [Test]
    public void HandleMessage_NoHandlers_NothingHappens()
    {
        MessageHandlerEvent mhe = new();

        VerifyResults(mhe.HandleMessage(TestMessage), 0);
    }

    [Test]
    public void HandleMessage_OneHandler_RegistrationWorks()
    {
        MessageHandlerEvent mhe = new();

        mhe.RegisterEventHandler(TestEventType, ProcessEvent1);
        VerifyResults(mhe.HandleMessage(TestMessage), 1);

        mhe.RegisterEventHandler(TestEventType, ProcessEvent1);
        VerifyResults(mhe.HandleMessage(TestMessage), 1);

        mhe.UnregisterEventHandler(TestEventType, ProcessEvent1);
        VerifyResults(mhe.HandleMessage(TestMessage), 0);
    }

    [Test]
    public void HandleMessage_SeveralHandlers_RegistrationWorks()
    {
        MessageHandlerEvent mhe = new();

        mhe.RegisterEventHandler(TestEventType, ProcessEvent1);
        mhe.RegisterEventHandler(TestEventType, ProcessEvent2);
        VerifyResults(mhe.HandleMessage(TestMessage), 2);

        mhe.UnregisterEventHandler(TestEventType, ProcessEvent2);
        VerifyResults(mhe.HandleMessage(TestMessage), 1);

        mhe.RegisterEventHandler(TestEventType, ProcessEvent2);
        mhe.RegisterEventHandler(TestEventType, ProcessEvent3);
        VerifyResults(mhe.HandleMessage(TestMessage), 3);

        mhe.RegisterEventHandler(TestEventType, ProcessEvent1);
        VerifyResults(mhe.HandleMessage(TestMessage), 3);
    }

    private static void VerifyResults(IEnumerable<Message> messages, int expectedCount)
    {
        Assert.That(messages.Count(), Is.EqualTo(expectedCount));

        if (expectedCount == 0)
            return;

        List<string> messageContents = new();
        foreach (var msg in messages)
        {
            messageContents.Add(((MessageEvent)msg).Event);
        }
        messageContents.Sort();
        for (int i = 0; i < expectedCount; i++)
        {
            Assert.That(messageContents[i], Is.EqualTo((i + 1).ToString()));
        }
    }

    private static Enum<EventType> TestEventType => EventType.ObjectDispose;

    private static MessageEvent TestMessage => new MessageEventObjectDispose("test");

    private Message? ProcessEvent1(MessageEvent messageEvent)
    {
        return new MessageEventObjectDispose("1");
    }

    private Message? ProcessEvent2(MessageEvent messageEvent)
    {
        return new MessageEventObjectDispose("2");
    }

    private Message? ProcessEvent3(MessageEvent messageEvent)
    {
        return new MessageEventObjectDispose("3");
    }
}
