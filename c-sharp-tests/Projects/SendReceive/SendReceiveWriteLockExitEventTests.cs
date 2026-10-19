using System.Diagnostics.CodeAnalysis;
using Paranext.DataProvider.Projects.SendReceive;

namespace TestParanextDataProvider.Projects.SendReceive
{
    [TestFixture]
    [ExcludeFromCodeCoverage]
    internal class SendReceiveWriteLockExitEventTests
    {
        [TearDown]
        public void TearDown() => SendReceiveWriteLock.Clear();

        [Test]
        public void Dispose_RaisesWriteScopeExitedOnceWithTheProjectId()
        {
            var exited = new List<string>();
            Action<string> handler = exited.Add;
            SendReceiveWriteLock.WriteScopeExited += handler;
            try
            {
                var scope = SendReceiveWriteLock.EnterWrite("proj-a");
                Assert.That(exited, Is.Empty, "must not fire before Dispose");
                scope.Dispose();
                scope.Dispose(); // double-dispose is a documented no-op
                Assert.That(exited, Is.EqualTo(new[] { "proj-a" }));
            }
            finally
            {
                SendReceiveWriteLock.WriteScopeExited -= handler;
            }
        }

        [Test]
        public void Dispose_SubscriberThrows_DoesNotEscape()
        {
            Action<string> bad = _ => throw new InvalidOperationException("bad subscriber");
            SendReceiveWriteLock.WriteScopeExited += bad;
            try
            {
                var scope = SendReceiveWriteLock.EnterWrite("proj-a");
                Assert.That(() => scope.Dispose(), Throws.Nothing);
                Assert.That(SendReceiveWriteLock.GetBlockState().IsBlocking, Is.False);
            }
            finally
            {
                SendReceiveWriteLock.WriteScopeExited -= bad;
            }
        }
    }
}
