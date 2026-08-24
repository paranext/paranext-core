using System.Diagnostics.CodeAnalysis;
using System.Text.RegularExpressions;
using Paranext.DataProvider;

namespace TestParanextDataProvider
{
    /// <summary>
    /// Pins the exact wording of <see cref="MissingBookException"/>'s message.
    /// </summary>
    /// <remarks>
    /// The Scripture editor extension detects "this book is not in this project/resource" by
    /// pattern-matching the message text of the error the PDP returns — there is no structured
    /// error code to key off, and a flat code could not carry the book number and project id
    /// anyway. Those checks live in <c>platform-scripture-editor.utils.ts</c>:
    /// <c>isMissingBookError</c> matches the invariant part of the sentence, and
    /// <c>parseMissingBookError</c> reads the two interpolated values back out POSITIONALLY.
    ///
    /// Without this test the coupling is advisory only: rewording the message here still compiles
    /// and still passes every other test, while silently turning every surface's honest "this book
    /// does not exist" message back into an empty editor or an endless spinner. Reordering or
    /// renaming the two interpolated values breaks the parse the same way.
    ///
    /// If a test here fails because the message changed deliberately, update both regexes in the
    /// TypeScript helper in the same commit.
    /// </remarks>
    [ExcludeFromCodeCoverage]
    public class MissingBookExceptionTests
    {
        /// <summary>
        /// Must stay character-for-character identical to <c>MISSING_BOOK_MESSAGE_REGEX</c> in
        /// <c>platform-scripture-editor.utils.ts</c>.
        /// </summary>
        private const string ExtensionDetectionRegex = @"Book number \d+ not found in project";

        /// <summary>
        /// Must stay character-for-character identical to <c>MISSING_BOOK_IDENTITY_REGEX</c> in
        /// <c>platform-scripture-editor.utils.ts</c>.
        /// </summary>
        private const string ExtensionIdentityRegex =
            @"Book number (\d+) not found in project (.+)\.";

        [Test]
        public void Message_HasTheExactExpectedWording()
        {
            var exception = new MissingBookException(40, "ProjectName");

            Assert.That(
                exception.Message,
                Is.EqualTo("Book number 40 not found in project ProjectName.")
            );
        }

        [Test]
        public void Message_IsDetectedByTheExtensionForAnyBookNumber()
        {
            foreach (var bookNum in new[] { 1, 40, 66 })
            {
                var exception = new MissingBookException(bookNum, "ProjectName");

                Assert.That(
                    Regex.IsMatch(exception.Message, ExtensionDetectionRegex),
                    Is.True,
                    $"Book number {bookNum} should be detected as book-not-found by the extension"
                );
            }
        }

        [Test]
        public void Message_YieldsBookNumAndProjectIdToTheExtensionsIdentityRegex()
        {
            // The extension compares these two values against what is on screen before it claims a
            // book is missing, so a message that matches detection but not this is a message that
            // silently falls back to rendering an empty editor.
            var exception = new MissingBookException(40, "ABC123");

            var match = Regex.Match(exception.Message, ExtensionIdentityRegex);

            Assert.Multiple(() =>
            {
                Assert.That(match.Success, Is.True);
                Assert.That(match.Groups[1].Value, Is.EqualTo("40"));
                Assert.That(match.Groups[2].Value, Is.EqualTo("ABC123"));
            });
        }

        [Test]
        public void Message_YieldsAProjectIdContainingPeriodsIntact()
        {
            // The identity group is greedy to the FINAL period for this reason: a truncated id
            // compares unequal, and the extension then shows no message at all.
            var exception = new MissingBookException(40, "abc.123.def");

            var match = Regex.Match(exception.Message, ExtensionIdentityRegex);

            Assert.That(match.Groups[2].Value, Is.EqualTo("abc.123.def"));
        }

        [Test]
        public void BookNumAndProjectId_ArePreserved()
        {
            var exception = new MissingBookException(40, "ProjectName");

            Assert.Multiple(() =>
            {
                Assert.That(exception.BookNum, Is.EqualTo(40));
                Assert.That(exception.ProjectId, Is.EqualTo("ProjectName"));
            });
        }
    }
}
