using System.Diagnostics.CodeAnalysis;
using Paranext.DataProvider.ParatextUtils;
using PtxUtils;

namespace TestParanextDataProvider.ParatextUtils
{
    /// <summary>
    /// Verifies the global Alert.Implementation install path performed by
    /// <see cref="ParatextGlobals.Initialize"/>. Distinct fixture from
    /// <c>AlertCaptureTests</c> because that fixture replaces
    /// <c>Alert.Implementation</c> per test in its <c>SetUp</c> — meaning
    /// it cannot observe what <c>ParatextGlobals.Initialize</c> actually
    /// installed at assembly OneTimeSetUp time.
    ///
    /// Theme 3 regression guard: prior to 2026-04-30 this assignment was
    /// <c>new AlertStub()</c>, which silently swallowed every ParatextData
    /// <c>Alert.Show</c> call and produced empty <c>AlertEntry[]</c> on
    /// import/copy/create results in production. Switching the install to
    /// <c>new AlertCapture()</c> makes the capture-scope contract real;
    /// this test asserts the install line and an end-to-end capture
    /// round-trip so any future revert is caught immediately.
    /// </summary>
    [TestFixture]
    [ExcludeFromCodeCoverage]
    internal class ParatextGlobalsAlertInstallTests
    {
        [Test]
        [Category("Contract")]
        [Property("Theme", "3")]
        [Description(
            "After ParatextGlobals.Initialize (run by FixtureSetup before any "
                + "test executes), Alert.Implementation must be an AlertCapture "
                + "instance — not AlertStub. Without this install, AlertCapture "
                + "scopes never receive entries because ParatextData routes "
                + "Alert.Show through the installed implementation, not "
                + "through any local AlertCapture instance."
        )]
        public void AlertImplementation_AfterGlobalInit_IsAlertCapture()
        {
            Assert.That(
                Alert.Implementation,
                Is.InstanceOf<AlertCapture>(),
                "ParatextGlobals.Initialize must install AlertCapture as the "
                    + "Alert.Implementation; otherwise the AlertCapture scope "
                    + "API is non-functional and import/copy/create alert "
                    + "capture is silently empty."
            );
        }

        [Test]
        [Category("Contract")]
        [Property("Theme", "3")]
        [Description(
            "End-to-end install verification: with the globally installed "
                + "AlertCapture, a manual Alert.Show inside a capture scope "
                + "must record exactly one AlertEntry. This is the regression "
                + "guard the brief asks for — the AlertStub install would "
                + "have silently produced zero entries."
        )]
        public void AlertShow_InsideScope_AfterGlobalInit_RecordsOneEntry()
        {
            using AlertCapture.AlertScope scope = AlertCapture.StartCapture();

            Alert.Show(
                "regression guard",
                "ParatextGlobalsAlertInstallTests",
                AlertButtons.Ok,
                AlertLevel.Warning
            );

            Assert.That(
                scope.Entries,
                Has.Count.EqualTo(1),
                "globally installed AlertCapture must record exactly one entry "
                    + "for one Alert.Show call inside an active scope"
            );
            AlertEntry entry = scope.Entries[0];
            Assert.That(entry.Text, Is.EqualTo("regression guard"));
            Assert.That(entry.Caption, Is.EqualTo("ParatextGlobalsAlertInstallTests"));
            Assert.That(entry.Level, Is.EqualTo(AlertLevel.Warning));
        }
    }
}
