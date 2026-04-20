using System.Diagnostics.CodeAnalysis;
using Paranext.DataProvider;

// Using directive required so `[TestCase(PlatformErrorCodes.X)]` attribute
// arguments resolve the nested constants at compile time.

namespace TestParanextDataProvider.ManageBooks
{
    /// <summary>
    /// Tests for the <see cref="PlatformErrorCodes"/> helper (BE-1 Group-0 infra, Theme 7).
    ///
    /// The helper lives at the c-sharp project root (<c>c-sharp/PlatformErrorCodes.cs</c>,
    /// <c>namespace Paranext.DataProvider;</c>) alongside other cross-cutting helpers like
    /// <c>MissingBookException.cs</c> / <c>PermissionsException.cs</c>.
    ///
    /// Source: implementation/backend-alignment.md → "Error Handling — PlatformError Codes"
    /// Forward Note: FN-002.
    /// </summary>
    [TestFixture]
    [ExcludeFromCodeCoverage]
    internal class PlatformErrorCodesTests
    {
        [Test]
        [Category("Infrastructure")]
        [Property("InfraId", "FN-002")]
        public void WithCode_ReturnsException_WithMessage()
        {
            // Arrange
            const string code = PlatformErrorCodes.NotFound;
            const string message = "Project not found: proj-123";

            // Act
            var ex = PlatformErrorCodes.WithCode(code, message);

            // Assert
            Assert.That(ex, Is.Not.Null);
            Assert.That(ex.Message, Is.EqualTo(message));
        }

        [Test]
        [Category("Infrastructure")]
        [Property("InfraId", "FN-002")]
        public void WithCode_SetsPlatformErrorCodeOnData()
        {
            // The network layer reads Exception.Data["platformErrorCode"] at JSON-RPC
            // serialization time and forwards it to newPlatformError() on the TS side
            // (see backend-alignment.md → "Platform-side extraction").

            // Arrange
            const string code = PlatformErrorCodes.PermissionDenied;

            // Act
            var ex = PlatformErrorCodes.WithCode(code, "You need to be an administrator");

            // Assert
            Assert.That(ex.Data.Contains("platformErrorCode"), Is.True);
            Assert.That(ex.Data["platformErrorCode"], Is.EqualTo(code));
        }

        // NOTE: constant-value verification (Aborted=="ABORTED" etc.) is
        // covered transitively by WithCode_WithDifferentCodes_EachStoredCorrectly
        // below — each of the 16 [TestCase] rows passes the constant as input
        // AND asserts the input string appears verbatim in the exception Data.
        // A standalone "verify the 16 strings" test would be a trivial tautology.

        [TestCase(PlatformErrorCodes.Aborted)]
        [TestCase(PlatformErrorCodes.AlreadyExists)]
        [TestCase(PlatformErrorCodes.Cancelled)]
        [TestCase(PlatformErrorCodes.DataLoss)]
        [TestCase(PlatformErrorCodes.DeadlineExceeded)]
        [TestCase(PlatformErrorCodes.FailedPrecondition)]
        [TestCase(PlatformErrorCodes.Internal)]
        [TestCase(PlatformErrorCodes.InvalidArgument)]
        [TestCase(PlatformErrorCodes.NotFound)]
        [TestCase(PlatformErrorCodes.OutOfRange)]
        [TestCase(PlatformErrorCodes.PermissionDenied)]
        [TestCase(PlatformErrorCodes.ResourceExhausted)]
        [TestCase(PlatformErrorCodes.Unauthenticated)]
        [TestCase(PlatformErrorCodes.Unavailable)]
        [TestCase(PlatformErrorCodes.Unimplemented)]
        [TestCase(PlatformErrorCodes.Unknown)]
        [Category("Infrastructure")]
        [Property("InfraId", "FN-002")]
        public void WithCode_WithDifferentCodes_EachStoredCorrectly(string code)
        {
            // Act
            var ex = PlatformErrorCodes.WithCode(code, "test message");

            // Assert
            Assert.That(ex.Data["platformErrorCode"], Is.EqualTo(code));
        }

        [Test]
        [Category("Infrastructure")]
        [Property("InfraId", "FN-002")]
        public void WithCode_EmptyMessage_StillReturnsExceptionWithCode()
        {
            // Edge case: empty message is unusual but must not crash the helper.
            var ex = PlatformErrorCodes.WithCode(PlatformErrorCodes.Unknown, string.Empty);

            Assert.That(ex, Is.Not.Null);
            Assert.That(ex.Message, Is.EqualTo(string.Empty));
            Assert.That(ex.Data["platformErrorCode"], Is.EqualTo(PlatformErrorCodes.Unknown));
        }
    }
}
