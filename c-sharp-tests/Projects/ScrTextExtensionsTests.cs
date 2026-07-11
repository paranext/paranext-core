using System.Diagnostics.CodeAnalysis;
using Paranext.DataProvider.Projects;
using Paratext.Data;
using PtxUtils;

namespace TestParanextDataProvider.Projects;

/// <summary>
/// Characterizes <see cref="ScrTextExtensions.GetProjectDetails"/>'s population of the six display
/// fields on <see cref="ProjectMetadata"/> (Name/FullName/Language/LanguageTag/IsEditable/
/// IsPublished). Each assertion pins the field to the exact same source expression the
/// corresponding <c>platform.*</c> setting getter in
/// <c>ParatextProjectDataProvider.GetProjectSetting</c> uses, so a regression here would mean the
/// project-picker/Home lists (fed straight from this metadata, no PDP round-trip) disagree with
/// what <c>pdp.getSetting('platform.*')</c> returns.
/// </summary>
[ExcludeFromCodeCoverage]
[TestFixture]
internal class ScrTextExtensionsTests
{
    [Test]
    public void GetProjectDetails_PopulatedProject_MetadataMatchesPlatformSettingGetters()
    {
        using var scrText = new DummyScrText();
        scrText.Settings.SetSetting("FullName", "English Standard Version 2016");
        scrText.Settings.SetSetting("Language", "English");
        scrText.Settings.Editable = true;

        var details = scrText.GetProjectDetails();

        Assert.That(details.Metadata.Name, Is.EqualTo(scrText.Name));
        Assert.That(
            details.Metadata.FullName,
            Is.EqualTo("English Standard Version 2016"),
            "FullName must come from the raw 'FullName' Paratext setting, same as the "
                + "platform.fullName getSetting path"
        );
        Assert.That(
            details.Metadata.Language,
            Is.EqualTo("English"),
            "Language must come from the raw 'Language' Paratext setting, same as the "
                + "platform.language getSetting path"
        );
        Assert.That(
            details.Metadata.LanguageTag,
            Is.EqualTo(scrText.Language.LanguageId.Id),
            "LanguageTag must come from scrText.Language.LanguageId.Id, same as the "
                + "platform.languageTag getSetting path"
        );
        Assert.That(details.Metadata.IsEditable, Is.True);
        Assert.That(
            details.Metadata.IsPublished,
            Is.False,
            "a non-resource ScrText must report IsPublished = false"
        );
    }

    [Test]
    public void GetProjectDetails_EditableFalse_IsEditableFalse()
    {
        using var scrText = new DummyScrText();
        scrText.Settings.Editable = false;

        var details = scrText.GetProjectDetails();

        Assert.That(details.Metadata.IsEditable, Is.False);
    }

    [Test]
    public void GetProjectDetails_FullNameAndLanguageUnset_AreNull()
    {
        // A fresh DummyScrText's ProjectSettings sets FullName = "Test ScrText" via object
        // initializer at construction (CreateProjectSettings), which - like SetSetting - writes
        // through to ParametersDictionary. 'Language' is never set by DummyScrText, so it's
        // already absent; RemoveSetting explicitly clears 'FullName' too so both keys are
        // genuinely absent from ParametersDictionary, exercising the "setting not present" branch.
        using var scrText = new DummyScrText();
        scrText.Settings.RemoveSetting("FullName");

        var details = scrText.GetProjectDetails();

        Assert.That(
            scrText.Settings.ParametersDictionary.ContainsKey("FullName"),
            Is.False,
            "test precondition: 'FullName' must be absent from ParametersDictionary"
        );
        Assert.That(
            scrText.Settings.ParametersDictionary.ContainsKey("Language"),
            Is.False,
            "test precondition: 'Language' must be absent from ParametersDictionary"
        );
        Assert.That(
            details.Metadata.FullName,
            Is.Null,
            "FullName must be null (not a guessed placeholder) when the Paratext setting is absent"
        );
        Assert.That(
            details.Metadata.Language,
            Is.Null,
            "Language must be null (not a guessed placeholder) when the Paratext setting is absent"
        );
    }

    [Test]
    public void GetProjectDetails_ResourceProject_IsPublishedTrueAndIsEditableFalse()
    {
        // ResourceDummyScrText overrides IsResourceProject so we can exercise resource-project
        // behavior without needing a real on-disk zipped resource, mirroring the pattern already
        // established in ManageBooks/ProjectFilterServiceTests.cs.
        using var scrText = new ResourceDummyScrText();
        // Some resource projects are flagged Editable=T in their raw settings; platform.isEditable
        // must still report false for resources regardless (ParatextProjectDataProvider.cs
        // ~1603-1606).
        scrText.Settings.Editable = true;

        var details = scrText.GetProjectDetails();

        Assert.That(details.Metadata.IsPublished, Is.True);
        Assert.That(
            details.Metadata.IsEditable,
            Is.False,
            "a resource project must never report IsEditable = true, even with raw Editable = T"
        );
    }

    // ScrText.IsResourceProject is `virtual` and defaults to false on DummyScrText. Resources in
    // production override it to true (see ResourceScrText.cs / JoinedScrText.cs). This subclass
    // mirrors the identical pattern in ManageBooks/ProjectFilterServiceTests.cs.
    private sealed class ResourceDummyScrText : DummyScrText
    {
        public override bool IsResourceProject => true;
    }
}
