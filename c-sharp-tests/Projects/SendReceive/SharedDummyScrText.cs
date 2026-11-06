using System.Diagnostics.CodeAnalysis;
using Paratext.Data;
using Paratext.Data.Users;

namespace TestParanextDataProvider.Projects.SendReceive
{
    /// <summary>
    /// A <see cref="DummyScrText"/> that reports <see cref="ScrText.IsProjectShared"/> as
    /// <see langword="true"/>, for Send/Receive tests that need a shared project without a real
    /// permission file. Overrides <see cref="ScrText.Permissions"/> to return a
    /// <see cref="PermissionManager"/> whose data is non-null (making
    /// <c>HasPermissionsDefined</c>, and therefore <c>IsProjectShared</c>, true). Same shape as
    /// <c>NonAdminSharedScrText</c> in <c>DeleteBooksServiceTests</c>.
    /// </summary>
    /// <param name="currentUserRole">The role of <see cref="RegistrationInfo.DefaultUser"/> on the
    /// project, or <see langword="null"/> for a project the current user is not a member of.</param>
    [ExcludeFromCodeCoverage]
    internal sealed class SharedDummyScrText(UserRoles? currentUserRole = null) : DummyScrText
    {
        private readonly SharedPermissionManager _permissions = new(currentUserRole);

        public override PermissionManager Permissions => _permissions;

        private sealed class SharedPermissionManager : PermissionManager
        {
            public SharedPermissionManager(UserRoles? currentUserRole)
            {
                if (currentUserRole is UserRoles role)
                    Data.Users.Add(
                        new InternalProjectUserAccess(RegistrationInfo.DefaultUser.Name, role)
                    );
            }

            protected override InternalProjectUserAccessData Data { get; set; } =
                new InternalProjectUserAccessData();
        }
    }

    [TestFixture]
    [ExcludeFromCodeCoverage]
    internal class SharedDummyScrTextTests
    {
        [Test]
        public void SharedDummyScrText_IsShared_AndDummyScrTextIsNot()
        {
            Assert.Multiple(() =>
            {
                Assert.That(new SharedDummyScrText().IsProjectShared, Is.True);
                Assert.That(new DummyScrText().IsProjectShared, Is.False);
            });
        }
    }
}
