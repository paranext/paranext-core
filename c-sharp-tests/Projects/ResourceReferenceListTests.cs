using System.Diagnostics.CodeAnalysis;
using System.Text.Json;
using Paranext.DataProvider.JsonUtils;
using Paranext.DataProvider.Projects;

namespace TestParanextDataProvider.Projects;

[TestFixture]
[ExcludeFromCodeCoverage]
public class ResourceReferenceListTests
{
    #region Serialization — ResourceReferenceList constants

    [Test]
    public void CurrentMajorVersion_Is1()
    {
        Assert.That(ResourceReferenceList.CurrentMajorVersion, Is.EqualTo(1));
    }

    [Test]
    public void CurrentFormatVersion_StartsWithMajor1()
    {
        Assert.That(ResourceReferenceList.CurrentFormatVersion, Does.StartWith("1."));
    }

    [Test]
    public void CurrentDataVersion_StartsWithMajor1()
    {
        Assert.That(ResourceReferenceList.CurrentDataVersion, Does.StartWith("1."));
    }

    [Test]
    public void DefaultInstance_HasCurrentDataVersionAndEmptyItems()
    {
        var list = new ResourceReferenceList();
        Assert.That(list.DataVersion, Is.EqualTo(ResourceReferenceList.CurrentDataVersion));
        Assert.That(list.Items, Is.Empty);
    }

    #endregion

    #region Serialization — known types round-trip

    [Test]
    public void ProjectReference_SerializesAndDeserializesCorrectly()
    {
        var list = new ResourceReferenceList
        {
            Items = [new ProjectReference { Name = "My Project", Id = "aabbcc" }],
        };
        string json = list.SerializeToJson();
        var result = json.DeserializeFromJson<ResourceReferenceList>();

        Assert.That(result, Is.Not.Null);
        Assert.That(result!.Items, Has.Count.EqualTo(1));
        var item = result.Items[0] as ProjectReference;
        Assert.That(item, Is.Not.Null);
        Assert.That(item!.Name, Is.EqualTo("My Project"));
        Assert.That(item.Id, Is.EqualTo("aabbcc"));
    }

    [Test]
    public void DblResourceReference_SerializesAndDeserializesCorrectly()
    {
        var list = new ResourceReferenceList
        {
            Items = [new DblResourceReference { Name = "DBL Resource", Id = "112233445566" }],
        };
        string json = list.SerializeToJson();
        var result = json.DeserializeFromJson<ResourceReferenceList>();

        Assert.That(result, Is.Not.Null);
        var item = result!.Items[0] as DblResourceReference;
        Assert.That(item, Is.Not.Null);
        Assert.That(item!.Name, Is.EqualTo("DBL Resource"));
        Assert.That(item.Id, Is.EqualTo("112233445566"));
    }

    [Test]
    public void EnhancedResourceReference_SerializesAndDeserializesCorrectly()
    {
        var list = new ResourceReferenceList
        {
            Items = [new EnhancedResourceReference { Name = "MyEnhancedResource" }],
        };
        string json = list.SerializeToJson();
        var result = json.DeserializeFromJson<ResourceReferenceList>();

        Assert.That(result, Is.Not.Null);
        var item = result!.Items[0] as EnhancedResourceReference;
        Assert.That(item, Is.Not.Null);
        Assert.That(item!.Name, Is.EqualTo("MyEnhancedResource"));
    }

    [Test]
    public void XmlResourceReference_SerializesAndDeserializesCorrectly()
    {
        var list = new ResourceReferenceList
        {
            Items = [new XmlResourceReference { Name = "MyXmlResource" }],
        };
        string json = list.SerializeToJson();
        var result = json.DeserializeFromJson<ResourceReferenceList>();

        Assert.That(result, Is.Not.Null);
        var item = result!.Items[0] as XmlResourceReference;
        Assert.That(item, Is.Not.Null);
        Assert.That(item!.Name, Is.EqualTo("MyXmlResource"));
    }

    [Test]
    public void SourceLanguageResourceReference_SerializesAndDeserializesCorrectly()
    {
        var list = new ResourceReferenceList
        {
            Items = [new SourceLanguageResourceReference { Name = "Greek" }],
        };
        string json = list.SerializeToJson();
        var result = json.DeserializeFromJson<ResourceReferenceList>();

        Assert.That(result, Is.Not.Null);
        var item = result!.Items[0] as SourceLanguageResourceReference;
        Assert.That(item, Is.Not.Null);
        Assert.That(item!.Name, Is.EqualTo("Greek"));
    }

    [Test]
    public void ProjectReference_IsResourceShownByDefaultTrue_SerializesAndDeserializesCorrectly()
    {
        var list = new ResourceReferenceList
        {
            Items =
            [
                new ProjectReference
                {
                    Name = "My Project",
                    Id = "aabbcc",
                    IsResourceShownByDefault = true,
                },
            ],
        };
        string json = list.SerializeToJson();
        var result = json.DeserializeFromJson<ResourceReferenceList>();

        Assert.That(result, Is.Not.Null);
        var item = result!.Items[0] as ProjectReference;
        Assert.That(item, Is.Not.Null);
        Assert.That(item!.IsResourceShownByDefault, Is.EqualTo(true));
    }

    [Test]
    public void ProjectReference_IsResourceShownByDefaultAbsent_DeserializesAsNull()
    {
        const string json =
            """{"dataVersion":"1.0.0","items":[{"type":"project","name":"My Project","id":"aabbcc"}]}""";
        var result = json.DeserializeFromJson<ResourceReferenceList>();

        var item = result!.Items[0] as ProjectReference;
        Assert.That(item, Is.Not.Null);
        Assert.That(item!.IsResourceShownByDefault, Is.Null);
    }

    [Test]
    public void ProjectReference_IsResourceShownByDefaultNull_NotPresentInSerializedJson()
    {
        var list = new ResourceReferenceList
        {
            Items = [new ProjectReference { Name = "P", Id = "abc" }],
        };
        string json = list.SerializeToJson();
        Assert.That(json, Does.Not.Contain("isResourceShownByDefault"));
    }

    [Test]
    public void DblResourceReference_IsResourceShownByDefaultFalse_SerializesAndDeserializesCorrectly()
    {
        var list = new ResourceReferenceList
        {
            Items =
            [
                new DblResourceReference
                {
                    Name = "Web English",
                    Id = "aabbccddeeff00112233445566778899aabbccddeeff0011",
                    IsResourceShownByDefault = false,
                },
            ],
        };
        string json = list.SerializeToJson();
        var result = json.DeserializeFromJson<ResourceReferenceList>();

        var item = result!.Items[0] as DblResourceReference;
        Assert.That(item, Is.Not.Null);
        Assert.That(item!.IsResourceShownByDefault, Is.EqualTo(false));
    }

    [Test]
    public void EnhancedResourceReference_IsResourceShownByDefaultTrue_SerializesAndDeserializesCorrectly()
    {
        var list = new ResourceReferenceList
        {
            Items =
            [
                new EnhancedResourceReference { Name = "BDAG", IsResourceShownByDefault = true },
            ],
        };
        string json = list.SerializeToJson();
        var result = json.DeserializeFromJson<ResourceReferenceList>();

        var item = result!.Items[0] as EnhancedResourceReference;
        Assert.That(item, Is.Not.Null);
        Assert.That(item!.IsResourceShownByDefault, Is.EqualTo(true));
    }

    [Test]
    public void XmlResourceReference_IsResourceShownByDefaultFalse_SerializesAndDeserializesCorrectly()
    {
        var list = new ResourceReferenceList
        {
            Items =
            [
                new XmlResourceReference { Name = "SomeXml", IsResourceShownByDefault = false },
            ],
        };
        string json = list.SerializeToJson();
        var result = json.DeserializeFromJson<ResourceReferenceList>();

        var item = result!.Items[0] as XmlResourceReference;
        Assert.That(item, Is.Not.Null);
        Assert.That(item!.IsResourceShownByDefault, Is.EqualTo(false));
    }

    [Test]
    public void SourceLanguageResourceReference_IsResourceShownByDefaultTrue_SerializesAndDeserializesCorrectly()
    {
        var list = new ResourceReferenceList
        {
            Items =
            [
                new SourceLanguageResourceReference
                {
                    Name = "Greek",
                    IsResourceShownByDefault = true,
                },
            ],
        };
        string json = list.SerializeToJson();
        var result = json.DeserializeFromJson<ResourceReferenceList>();

        var item = result!.Items[0] as SourceLanguageResourceReference;
        Assert.That(item, Is.Not.Null);
        Assert.That(item!.IsResourceShownByDefault, Is.EqualTo(true));
    }

    #endregion

    #region Serialization — unknown type round-trip

    [Test]
    public void UnknownType_DeserializesToUnknownResourceReference_AndRoundTrips()
    {
        // JSON with a future/unknown type discriminant
        const string json =
            """{"dataVersion":"1.0.0","items":[{"type":"futureType","name":"Future","extraField":"preserved"}]}""";

        var result = json.DeserializeFromJson<ResourceReferenceList>();

        Assert.That(result, Is.Not.Null);
        Assert.That(result!.Items, Has.Count.EqualTo(1));
        var item = result.Items[0] as UnknownResourceReference;
        Assert.That(item, Is.Not.Null);

        // Re-serialize and verify extra field is preserved
        string reSerialised = result.SerializeToJson();
        Assert.That(reSerialised, Does.Contain("futureType"));
        Assert.That(reSerialised, Does.Contain("extraField"));
        Assert.That(reSerialised, Does.Contain("preserved"));
    }

    [Test]
    public void UnknownType_WithNonStringName_DeserializesToEmptyName()
    {
        // A numeric "name" passes the TypeScript validator (unknown types accept any shape)
        // but previously threw InvalidOperationException in C#. Verify it now deserializes safely.
        const string json = """{"dataVersion":"1.0.0","items":[{"type":"futureType","name":42}]}""";

        var result = json.DeserializeFromJson<ResourceReferenceList>();

        Assert.That(result, Is.Not.Null);
        Assert.That(result!.Items, Has.Count.EqualTo(1));
        var item = result.Items[0] as UnknownResourceReference;
        Assert.That(item, Is.Not.Null);
        Assert.That(item!.Name, Is.EqualTo(""));
    }
    #endregion

    #region Serialization — JSON property names are camelCase

    [Test]
    public void SerializedJson_UsesExpectedPropertyNames()
    {
        var list = new ResourceReferenceList
        {
            Items = [new ProjectReference { Name = "P", Id = "123" }],
        };
        string json = list.SerializeToJson();

        // dataVersion and items use camelCase
        Assert.That(json, Does.Contain("\"dataVersion\""));
        Assert.That(json, Does.Contain("\"items\""));
        // type discriminant and known property names
        Assert.That(json, Does.Contain("\"type\""));
        Assert.That(json, Does.Contain("\"name\""));
        Assert.That(json, Does.Contain("\"id\""));
    }

    #endregion

    #region Serialization — mixed-type list

    [Test]
    public void MixedTypeList_AllItemsRoundTrip()
    {
        var list = new ResourceReferenceList
        {
            Items =
            [
                new ProjectReference { Name = "Proj", Id = "aaa" },
                new EnhancedResourceReference { Name = "Enh" },
                new SourceLanguageResourceReference { Name = "Heb" },
            ],
        };

        string json = list.SerializeToJson();
        var result = json.DeserializeFromJson<ResourceReferenceList>();

        Assert.That(result, Is.Not.Null);
        Assert.That(result!.Items, Has.Count.EqualTo(3));
        Assert.That(result.Items[0], Is.InstanceOf<ProjectReference>());
        Assert.That(result.Items[1], Is.InstanceOf<EnhancedResourceReference>());
        Assert.That(result.Items[2], Is.InstanceOf<SourceLanguageResourceReference>());
    }

    #endregion

    #region Serialization — two-flag schema (PT-4050)

    [Test]
    public void CurrentFormatAndDataVersion_AreMinor1_1()
    {
        Assert.That(ResourceReferenceList.CurrentFormatVersion, Is.EqualTo("1.1.0"));
        Assert.That(ResourceReferenceList.CurrentDataVersion, Is.EqualTo("1.1.0"));
        // Major MUST stay 1 — a downstream private S/R reader keys on it.
        Assert.That(ResourceReferenceList.CurrentMajorVersion, Is.EqualTo(1));
    }

    [Test]
    public void ProjectReference_WithBothFlags_RoundTripsThroughJson()
    {
        var list = new ResourceReferenceList
        {
            Items =
            [
                new ProjectReference
                {
                    Name = "P",
                    Id = "aabbcc",
                    IsResourceShownByDefault = true,
                    InTextCollectionUser = false,
                },
            ],
        };
        var result = list.SerializeToJson().DeserializeFromJson<ResourceReferenceList>();

        var item = result!.Items[0] as ProjectReference;
        Assert.That(item!.IsResourceShownByDefault, Is.True);
        Assert.That(item.InTextCollectionUser, Is.False);
    }

    [Test]
    public void ResourceReference_WithNullFlags_OmitsAttributesFromJson()
    {
        var list = new ResourceReferenceList
        {
            Items = [new ProjectReference { Name = "P", Id = "aabbcc" }],
        };
        string json = list.SerializeToJson();

        // Old-build files must stay clean: unset flags are absent, not `false`.
        Assert.That(json, Does.Not.Contain("isResourceShownByDefault"));
        Assert.That(json, Does.Not.Contain("inTextCollectionUser"));
    }

    [Test]
    public void OldJson_WithoutFlags_DeserializesWithNullFlags()
    {
        // A file written by an old build (1.0.0, no flag keys) must read cleanly.
        const string json =
            """{"dataVersion":"1.0.0","items":[{"type":"project","name":"P","id":"aabbcc"}]}""";
        var result = json.DeserializeFromJson<ResourceReferenceList>();

        var item = result!.Items[0] as ProjectReference;
        Assert.That(item!.IsResourceShownByDefault, Is.Null);
        Assert.That(item.InTextCollectionUser, Is.Null);
    }

    [Test]
    public void KnownType_PreservesUnknownJsonFields_OnReSerialize()
    {
        // Forward-compat: a build that doesn't know "futureFlag" must not drop it.
        const string json =
            """{"dataVersion":"1.1.0","items":[{"type":"project","name":"P","id":"aabbcc","futureFlag":123}]}""";
        var result = json.DeserializeFromJson<ResourceReferenceList>();
        string reSerialized = result!.SerializeToJson();

        Assert.That(reSerialized, Does.Contain("futureFlag"));
        Assert.That(reSerialized, Does.Contain("123"));
    }

    [Test]
    public void ProjectReference_WithFlags_RoundTripsThroughXml()
    {
        var list = new ResourceReferenceList
        {
            DataVersion = ResourceReferenceList.CurrentDataVersion,
            Items =
            [
                new DblResourceReference
                {
                    Name = "D",
                    Id = "112233445566",
                    IsResourceShownByDefault = false,
                    InTextCollectionUser = true,
                },
            ],
        };
        var xml = ResourceReferenceList.ToXml(list);
        var result = ResourceReferenceList.FromXml(xml, ResourceReferenceList.CurrentDataVersion);

        var item = result.Items[0] as DblResourceReference;
        Assert.That(item!.IsResourceShownByDefault, Is.False);
        Assert.That(item.InTextCollectionUser, Is.True);
    }

    [Test]
    public void Xml_WithNullFlags_OmitsAttributes()
    {
        var list = new ResourceReferenceList
        {
            Items = [new ProjectReference { Name = "P", Id = "aabbcc" }],
        };
        var xml = ResourceReferenceList.ToXml(list);
        var itemEl = xml.Elements("Item").First();

        Assert.That(itemEl.Attribute("isResourceShownByDefault"), Is.Null);
        Assert.That(itemEl.Attribute("inTextCollectionUser"), Is.Null);
    }

    [Test]
    public void OldXml_WithoutFlags_ParsesWithNullFlags()
    {
        var xml = System.Xml.Linq.XElement.Parse(
            """<Items><Item type="project" name="P" id="aabbcc" /></Items>"""
        );
        var result = ResourceReferenceList.FromXml(xml, "1.0.0");

        var item = result.Items[0] as ProjectReference;
        Assert.That(item!.IsResourceShownByDefault, Is.Null);
        Assert.That(item.InTextCollectionUser, Is.Null);
    }

    [Test]
    public void KnownXmlItem_PreservesUnknownAttributes_OnXmlRoundTrip()
    {
        // Forward-compat: a build that doesn't know "futureAttr" must not drop it from XML.
        var xml = System.Xml.Linq.XElement.Parse(
            """<Items><Item type="project" name="P" id="aabbcc" futureAttr="keep-me" /></Items>"""
        );
        var list = ResourceReferenceList.FromXml(xml, "1.1.0");
        var rewritten = ResourceReferenceList.ToXml(list);
        var itemEl = rewritten.Elements("Item").First();

        Assert.That(itemEl.Attribute("futureAttr")?.Value, Is.EqualTo("keep-me"));
    }

    [Test]
    public void KnownJsonItem_WithBooleanExtra_EmitsLowercaseJsonTextInXml()
    {
        // A JSON-sourced boolean extra must not degrade to "True" on a JSON->XML transition.
        const string json =
            """{"dataVersion":"1.1.0","items":[{"type":"project","name":"P","id":"aabbcc","futureFlag":true}]}""";
        var list = json.DeserializeFromJson<ResourceReferenceList>()!;
        var xml = ResourceReferenceList.ToXml(list);
        var itemEl = xml.Elements("Item").First();

        Assert.That(itemEl.Attribute("futureFlag")?.Value, Is.EqualTo("true"));
    }

    [Test]
    public void NamedOnlyType_PreservesBibleTextOnlyProperties_OnJsonRoundTrip()
    {
        // A name-only type (enhancedResource) never natively handles "id" or "inTextCollectionUser"
        // (both are Bible-text-only). A future build that attaches them must not have them silently
        // dropped: they flow through ExtraData (captured against the narrower
        // KnownNamedOnlyPropertyNames set) and are re-emitted. isResourceShownByDefault, by contrast,
        // is understood on every type, so it is a real field rather than a passthrough.
        const string json =
            """{"dataVersion":"1.1.0","items":[{"type":"enhancedResource","name":"Enh","id":"keep-id","inTextCollectionUser":true}]}""";
        var result = json.DeserializeFromJson<ResourceReferenceList>();
        Assert.That(result!.Items[0], Is.InstanceOf<EnhancedResourceReference>());

        string reSerialized = result.SerializeToJson();
        Assert.That(reSerialized, Does.Contain("keep-id"));
        Assert.That(reSerialized, Does.Contain("inTextCollectionUser"));
    }

    [Test]
    public void NamedOnlyType_PreservesBibleTextOnlyAttributes_OnXmlRoundTrip()
    {
        // Same passthrough guarantee for XML: an xmlResource carrying an "id" attribute (which this
        // type does not natively handle) must survive an XML round-trip via ExtraData.
        var xml = System.Xml.Linq.XElement.Parse(
            """<Items><Item type="xmlResource" name="X" id="keep-id" /></Items>"""
        );
        var list = ResourceReferenceList.FromXml(xml, "1.1.0");
        Assert.That(list.Items[0], Is.InstanceOf<XmlResourceReference>());

        var rewritten = ResourceReferenceList.ToXml(list);
        var itemEl = rewritten.Elements("Item").First();
        Assert.That(itemEl.Attribute("id")?.Value, Is.EqualTo("keep-id"));
    }

    #endregion
}
