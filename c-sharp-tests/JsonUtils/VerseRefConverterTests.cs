using System.Text.Json;
using Paranext.DataProvider.JsonUtils;
using SIL.Scripture;

namespace ParanextDataProviderTests.JsonUtils;

/// <summary>
/// Tests for <see cref="VerseRefConverter"/> serialization of a <see cref="VerseRef"/> that has no
/// versification. This is the exact shape <see cref="VerseRefConverter.Read"/> produces for a
/// <c>SerializedVerseRef</c> that carries no <c>versificationStr</c> (the common wire shape from
/// TypeScript), so <see cref="VerseRefConverter.Write"/> must not dereference a null
/// <c>Versification</c>.
/// </summary>
[TestFixture]
public class VerseRefConverterTests
{
    private static JsonSerializerOptions CreateOptions() =>
        SerializationOptions.CreateSerializationOptions();

    [Test]
    [Description(
        "A VerseRef with a null Versification serializes without throwing and omits "
            + "versificationStr, rather than NRE-ing on value.Versification.Type."
    )]
    public void Write_NullVersification_OmitsVersificationStrWithoutThrowing()
    {
        var verseRef = new VerseRef("PSA", "23", "1", null);
        Assert.That(verseRef.Versification, Is.Null, "Premise: ref must have no versification");

        var json = JsonSerializer.Serialize(verseRef, CreateOptions());

        Assert.That(json, Does.Contain("\"book\":\"PSA\""));
        Assert.That(
            json,
            Does.Not.Contain("versificationStr"),
            "a null versification must not emit versificationStr"
        );
    }

    [Test]
    [Description(
        "Round-trips a versification-less SerializedVerseRef through Read then Write (the exact "
            + "production path that crashed): deserialize a ref with no versificationStr, then "
            + "serialize it back."
    )]
    public void ReadThenWrite_VersificationLess_RoundTripsWithoutThrowing()
    {
        const string incoming = "{\"book\":\"PSA\",\"chapterNum\":23,\"verseNum\":1}";
        var options = CreateOptions();

        var verseRef = JsonSerializer.Deserialize<VerseRef>(incoming, options);
        Assert.That(
            verseRef.Versification,
            Is.Null,
            "Premise: deserialized ref has no versification"
        );

        var roundTripped = JsonSerializer.Serialize(verseRef, options);

        Assert.That(roundTripped, Does.Not.Contain("versificationStr"));
    }

    [Test]
    [Description("A VerseRef WITH a versification still emits versificationStr as before.")]
    public void Write_WithVersification_EmitsVersificationStr()
    {
        var verseRef = new VerseRef("PSA", "23", "1", new ScrVers(ScrVersType.English));

        var json = JsonSerializer.Serialize(verseRef, CreateOptions());

        Assert.That(json, Does.Contain("versificationStr"));
    }
}
