using Paranext.DataProvider.MessageHandlers;
using Paranext.DataProvider.Messages;
using System.Diagnostics.CodeAnalysis;

namespace TestParanextDataProvider.MessageHandlers;

[ExcludeFromCodeCoverage]
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
        var messageList = new List<Message>(messages);
        Assert.That(messageList, Has.Count.EqualTo(expectedCount));

        if (expectedCount == 0)
            return;

        List<string> messageContents = new();
        foreach (var msg in messageList)
        {
            messageContents.Add(((MessageEvent)msg).Event!.ToString()!);
        }
        messageContents.Sort();
        for (int i = 0; i < expectedCount; i++)
        {
            Assert.That(messageContents[i], Is.EqualTo((i + 1).ToString()));
        }
    }

    private static string TestEventType => EventType.OBJECT_DISPOSE;

    private static MessageEvent TestMessage => new MessageEventObjectDisposed("test");

    private static Message ProcessEvent1(MessageEvent messageEvent)
    {
        return new MessageEventObjectDisposed("1");
    }

    private static Message ProcessEvent2(MessageEvent messageEvent)
    {
        return new MessageEventObjectDisposed("2");
    }

    private static Message ProcessEvent3(MessageEvent messageEvent)
    {
        return new MessageEventObjectDisposed("3");
    }
}
