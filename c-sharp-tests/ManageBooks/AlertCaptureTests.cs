using System.Diagnostics.CodeAnalysis;
using Paranext.DataProvider.ParatextUtils;
using PtxUtils;

namespace TestParanextDataProvider.ManageBooks
{
    /// <summary>
    /// Tests for <see cref="AlertCapture"/> — Theme 8 infrastructure owned
    /// by CAP-010. Pure unit tests; no <see cref="Paratext.Data.ScrText"/>,
    /// no orchestrator, no PAPI client. These exercise the
    /// <see cref="AlertCapture.AlertScope"/> lifecycle, the
    /// <see cref="PtxUtils.Alert"/> plumbing, and the out-of-scope fallback.
    ///
    /// Capability: CAP-010 ImportBooks (Theme 8 AlertCapture)
    ///
    /// Contract reference:
    /// - <c>.context/features/manage-books/implementation/backend-alignment.md</c>
    ///   → "Alert Handling — AlertCapture"
    /// - <c>.context/features/manage-books/data-contracts.md</c> Section 3.9
    ///   (AlertEntry wire shape)
    ///
    /// Scope / Behavior assertions below mirror the "Additional in-capability
    /// work (Theme 8)" checklist in strategic-plan-backend.md:246-267
    /// ("Unit tests for AlertCapture: scope enter/exit, nested scopes,
    /// allow-list behavior, fallback to Console.WriteLine when no scope
    /// active, AlertResult.Positive/Negative routing per Comment 17").
    /// </summary>
    [TestFixture]
    [ExcludeFromCodeCoverage]
    internal class AlertCaptureTests
    {
        private Alert _previousImplementation = null!;
        private AlertCapture _capture = null!;

        [SetUp]
        public void Setup()
        {
            // Save the current Alert.Implementation so we can restore it in
            // teardown (other tests may depend on AlertStub or the default
            // NoAlert). Our AlertCapture becomes the active implementation
            // for the duration of each test.
            _previousImplementation = Alert.Implementation;
            _capture = new AlertCapture();
            Alert.Implementation = _capture;
        }

        [TearDown]
        public void Teardown()
        {
            Alert.Implementation = _previousImplementation;
        }

        // =====================================================================
        // Scope enter/exit lifecycle
        // =====================================================================

        [Test]
        [Category("Contract")]
        [Property("CapabilityId", "CAP-010")]
        [Property("Theme", "8")]
        [Description(
            "StartCapture returns a non-null AlertScope with an empty Entries "
                + "list. The scope itself is the caller's handle for capturing "
                + "alerts during a 'using' block."
        )]
        public void StartCapture_ReturnsNonNullScopeWithEmptyEntries()
        {
            using AlertCapture.AlertScope scope = AlertCapture.StartCapture();

            Assert.That(scope, Is.Not.Null, "StartCapture must return a scope");
            Assert.That(scope.Entries, Is.Not.Null, "Entries list must be initialized");
            Assert.That(scope.Entries, Is.Empty, "fresh scope must start with no entries");
        }

        [Test]
        [Category("Contract")]
        [Property("CapabilityId", "CAP-010")]
        [Property("Theme", "8")]
        [Description(
            "Alert.Show inside an active scope appends one entry to the "
                + "scope's Entries list — text, caption, and level match the "
                + "call-site arguments."
        )]
        public void ShowInternal_InsideScope_CapturesEntryWithTextCaptionLevel()
        {
            using AlertCapture.AlertScope scope = AlertCapture.StartCapture();

            Alert.Show(
                "This is a warning body",
                "Caption Title",
                AlertButtons.Ok,
                AlertLevel.Warning
            );

            Assert.That(scope.Entries, Has.Count.EqualTo(1), "one alert → one entry");
            AlertEntry entry = scope.Entries[0];
            Assert.That(entry.Text, Is.EqualTo("This is a warning body"));
            Assert.That(entry.Caption, Is.EqualTo("Caption Title"));
            Assert.That(entry.Level, Is.EqualTo(AlertLevel.Warning));
        }

        [Test]
        [Category("Contract")]
        [Property("CapabilityId", "CAP-010")]
        [Property("Theme", "8")]
        [Description(
            "AlertResult.Positive is returned when a scope is active — "
                + "ParatextData treats Positive as 'OK/continue', which is the "
                + "behavior we want because we've recorded the alert and the "
                + "caller already understands the situation. (Comment 17 routing.)"
        )]
        public void ShowInternal_InsideScope_ReturnsPositive()
        {
            using AlertCapture.AlertScope scope = AlertCapture.StartCapture();

            AlertResult result = Alert.Show("test", "caption");

            Assert.That(result, Is.EqualTo(AlertResult.Positive));
        }

        [Test]
        [Category("Contract")]
        [Property("CapabilityId", "CAP-010")]
        [Property("Theme", "8")]
        [Description(
            "After Dispose, the scope's Entries list is still readable (captured "
                + "data survives exit) — callers typically inspect entries after "
                + "the `using` block closes."
        )]
        public void AlertScope_EntriesReadableAfterDispose()
        {
            AlertCapture.AlertScope scope = AlertCapture.StartCapture();
            Alert.Show("captured before dispose", "cap");
            scope.Dispose();

            Assert.That(scope.Entries, Has.Count.EqualTo(1));
            Assert.That(scope.Entries[0].Text, Is.EqualTo("captured before dispose"));
        }

        [Test]
        [Category("Contract")]
        [Property("CapabilityId", "CAP-010")]
        [Property("Theme", "8")]
        [Description(
            "After a scope is disposed, subsequent Alert.Show calls are NOT "
                + "appended to the disposed scope's Entries list — the capture "
                + "has ended."
        )]
        public void AlertScope_AfterDispose_DoesNotCaptureNewEntries()
        {
            AlertCapture.AlertScope scope = AlertCapture.StartCapture();
            scope.Dispose();

            Alert.Show("after dispose", "caption");

            Assert.That(
                scope.Entries,
                Is.Empty,
                "disposed scope must not receive alerts raised after disposal"
            );
        }

        // =====================================================================
        // Multiple entries, multiple levels
        // =====================================================================

        [Test]
        [Category("Contract")]
        [Property("CapabilityId", "CAP-010")]
        [Property("Theme", "8")]
        [Description(
            "Multiple alerts inside the same scope are captured in raise-order. "
                + "Information + Warning + Error all appear with correct levels."
        )]
        public void ShowInternal_MultipleAlerts_CapturedInOrderWithLevels()
        {
            using AlertCapture.AlertScope scope = AlertCapture.StartCapture();

            Alert.Show("first info", "c1", AlertButtons.Ok, AlertLevel.Information);
            Alert.Show("second warn", "c2", AlertButtons.Ok, AlertLevel.Warning);
            Alert.Show("third error", "c3", AlertButtons.Ok, AlertLevel.Error);

            Assert.That(scope.Entries, Has.Count.EqualTo(3));
            Assert.That(scope.Entries[0].Text, Is.EqualTo("first info"));
            Assert.That(scope.Entries[0].Level, Is.EqualTo(AlertLevel.Information));
            Assert.That(scope.Entries[1].Text, Is.EqualTo("second warn"));
            Assert.That(scope.Entries[1].Level, Is.EqualTo(AlertLevel.Warning));
            Assert.That(scope.Entries[2].Text, Is.EqualTo("third error"));
            Assert.That(scope.Entries[2].Level, Is.EqualTo(AlertLevel.Error));
        }

        // =====================================================================
        // ShowLater (fire-and-forget) path
        // =====================================================================

        [Test]
        [Category("Contract")]
        [Property("CapabilityId", "CAP-010")]
        [Property("Theme", "8")]
        [Description(
            "Alert.ShowLater (the async-queued variant PT9 uses for non-blocking "
                + "info messages) is captured to the active scope just like "
                + "Alert.Show — PT9 uses both paths inside ImportSfmText."
        )]
        public void ShowLaterInternal_InsideScope_CapturesEntry()
        {
            using AlertCapture.AlertScope scope = AlertCapture.StartCapture();

            Alert.ShowLater("async info body", "async caption", AlertLevel.Information);

            Assert.That(scope.Entries, Has.Count.EqualTo(1));
            Assert.That(scope.Entries[0].Text, Is.EqualTo("async info body"));
            Assert.That(scope.Entries[0].Caption, Is.EqualTo("async caption"));
            Assert.That(scope.Entries[0].Level, Is.EqualTo(AlertLevel.Information));
        }

        // =====================================================================
        // English-language-definition allow-list
        // =====================================================================

        [Test]
        [Category("Contract")]
        [Property("CapabilityId", "CAP-010")]
        [Property("Theme", "8")]
        [Description(
            "The ParatextData initialization routine raises a recurring "
                + "'unable to find a language definition file for English' alert "
                + "in headless environments. AlertCapture allow-lists this "
                + "message so it does NOT pollute captured entries. The caller "
                + "sees a clean Entries list focused on import-time alerts."
        )]
        public void ShowInternal_EnglishLanguageDefinitionAlert_AllowListedAndNotCaptured()
        {
            using AlertCapture.AlertScope scope = AlertCapture.StartCapture();

            AlertResult result = Alert.Show(
                "ParatextData is unable to find a language definition file for English. Details follow.",
                "Startup"
            );

            Assert.That(
                result,
                Is.EqualTo(AlertResult.Positive),
                "allow-listed alert must return Positive so ParatextData continues"
            );
            Assert.That(
                scope.Entries,
                Is.Empty,
                "allow-listed alert must NOT be captured in Entries"
            );
        }

        [Test]
        [Category("Contract")]
        [Property("CapabilityId", "CAP-010")]
        [Property("Theme", "8")]
        [Description(
            "The allow-list for the English-language-definition message applies "
                + "to the ShowLater path as well (PT9 raises this message via "
                + "Alert.ShowLater in some boot paths)."
        )]
        public void ShowLaterInternal_EnglishLanguageDefinitionAlert_AllowListed()
        {
            using AlertCapture.AlertScope scope = AlertCapture.StartCapture();

            Alert.ShowLater(
                "ParatextData is unable to find a language definition file for English. Some features may be limited.",
                "Startup",
                AlertLevel.Warning
            );

            Assert.That(scope.Entries, Is.Empty);
        }

        // =====================================================================
        // Out-of-scope fallback (no active capture)
        // =====================================================================

        [Test]
        [Category("Contract")]
        [Property("CapabilityId", "CAP-010")]
        [Property("Theme", "8")]
        [Description(
            "When no scope is active, Alert.Show routes to the fallback — "
                + "Console.WriteLine prints the message and the call returns "
                + "AlertResult.Negative (matches the AlertStub baseline so "
                + "existing non-manage-books flows see no regression)."
        )]
        public void ShowInternal_OutOfScope_FallsBackAndReturnsNegative()
        {
            using var output = new StringWriter();
            TextWriter previousOut = Console.Out;
            Console.SetOut(output);
            try
            {
                // No StartCapture() — we're deliberately outside a scope.
                AlertResult result = Alert.Show("unexpected import-time alert", "caption here");

                Assert.That(
                    result,
                    Is.EqualTo(AlertResult.Negative),
                    "out-of-scope default mirrors AlertStub: Negative"
                );
                Assert.That(
                    output.ToString(),
                    Does.Contain("unexpected import-time alert"),
                    "fallback must write the message to Console.Out"
                );
            }
            finally
            {
                Console.SetOut(previousOut);
            }
        }

        [Test]
        [Category("Contract")]
        [Property("CapabilityId", "CAP-010")]
        [Property("Theme", "8")]
        [Description(
            "Out-of-scope Alert.ShowLater also routes to Console.WriteLine "
                + "without throwing — matches the AlertStub ShowLaterInternal "
                + "fallback path."
        )]
        public void ShowLaterInternal_OutOfScope_FallsBackToConsole()
        {
            using var output = new StringWriter();
            TextWriter previousOut = Console.Out;
            Console.SetOut(output);
            try
            {
                Assert.DoesNotThrow(
                    () => Alert.ShowLater("out-of-scope later", "caption", AlertLevel.Information),
                    "ShowLater out-of-scope must not throw"
                );
                Assert.That(output.ToString(), Does.Contain("out-of-scope later"));
            }
            finally
            {
                Console.SetOut(previousOut);
            }
        }

        // =====================================================================
        // Null text handling (defensive)
        // =====================================================================

        [Test]
        [Category("Contract")]
        [Property("CapabilityId", "CAP-010")]
        [Property("Theme", "8")]
        [Description(
            "Null or empty text / caption strings must be tolerated — PT9's "
                + "Alert.Show signature accepts optional parameters that default "
                + "to empty strings. AlertCapture stores the empty value rather "
                + "than throwing."
        )]
        public void ShowInternal_WithEmptyTextAndCaption_DoesNotThrowAndCapturesEmpty()
        {
            using AlertCapture.AlertScope scope = AlertCapture.StartCapture();

            Alert.Show(string.Empty, string.Empty);

            Assert.That(scope.Entries, Has.Count.EqualTo(1));
            Assert.That(scope.Entries[0].Text, Is.EqualTo(string.Empty));
            Assert.That(scope.Entries[0].Caption, Is.EqualTo(string.Empty));
        }

        // =====================================================================
        // Nested scopes (CAP-010 v1: inner replaces outer; outer not restored)
        // =====================================================================

        [Test]
        [Category("Contract")]
        [Property("CapabilityId", "CAP-010")]
        [Property("Theme", "8")]
        [Description(
            "Starting a second scope while an outer scope is active — alerts "
                + "raised inside the inner block are captured to the INNER scope. "
                + "The outer scope remains independent (not populated by inner "
                + "alerts). This matches the simple AsyncLocal replace semantics "
                + "documented in backend-alignment.md."
        )]
        public void StartCapture_NestedScope_InnerCapturesInnerAlerts()
        {
            using AlertCapture.AlertScope outer = AlertCapture.StartCapture();
            Alert.Show("in outer", "c1");

            using (AlertCapture.AlertScope inner = AlertCapture.StartCapture())
            {
                Alert.Show("in inner", "c2");

                Assert.That(
                    inner.Entries.Select(e => e.Text),
                    Is.EqualTo(new[] { "in inner" }),
                    "inner scope captures only the inner alert"
                );
            }

            Assert.That(
                outer.Entries.Select(e => e.Text).ToArray(),
                Does.Contain("in outer"),
                "outer scope retains its own pre-inner alert"
            );
        }
    }
}
