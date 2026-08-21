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
    /// error code to key off. That check lives in <c>isBookNotFoundError</c> in
    /// <c>extensions/src/platform-scripture-editor/src/platform-scripture-editor.utils.ts</c>,
    /// which applies the regex duplicated below.
    ///
    /// Without this test the coupling is advisory only: rewording the message here still compiles
    /// and still passes every other test, but silently turns both Scripture tabs' honest "this book
    /// does not exist" message back into an empty editor. If this test fails because the message
    /// changed deliberately, update the regex in the TypeScript helper in the same commit.
    /// </remarks>
    [ExcludeFromCodeCoverage]
    public class MissingBookExceptionTests
    {
        /// <summary>
        /// Must stay character-for-character identical to <c>BOOK_NOT_FOUND_REGEX</c> in
        /// <c>platform-scripture-editor.utils.ts</c>.
        /// </summary>
        private const string ExtensionBookNotFoundRegex = @"Book number \d+ not found in project";

        [Test]
        public void Message_MatchesRegexTheScriptureEditorExtensionUses()
        {
            var exception = new MissingBookException(40, "ProjectName");

            Assert.That(exception.Message, Does.Match(ExtensionBookNotFoundRegex));
        }

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
        public void Message_MatchesTheExtensionRegexForAnyBookNumber()
        {
            foreach (var bookNum in new[] { 1, 40, 66 })
            {
                var exception = new MissingBookException(bookNum, "ProjectName");

                Assert.That(
                    Regex.IsMatch(exception.Message, ExtensionBookNotFoundRegex),
                    Is.True,
                    $"Book number {bookNum} should be detected as book-not-found by the extension"
                );
            }
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
