using System.Diagnostics.CodeAnalysis;
using System.Xml.Linq;
using NUnit.Framework;
using Paranext.DataProvider.Projects;

namespace TestParanextDataProvider.Projects;

[TestFixture]
[ExcludeFromCodeCoverage]
public class ResourceReferenceListXmlTests
{
    // --- ToXml ---

    [Test]
    public void ToXml_EmptyList_ProducesEmptyItemsElement()
    {
        var list = new ResourceReferenceList();
        XElement result = ResourceReferenceList.ToXml(list);
        Assert.That(result.Name.LocalName, Is.EqualTo("Items"));
        Assert.That(result.Elements("Item"), Is.Empty);
    }

    [Test]
    public void ToXml_ProjectReference_ProducesCorrectAttributes()
    {
        var list = new ResourceReferenceList
        {
            Items = [new ProjectReference { Name = "ESV", Id = "aabbcc" }],
        };
        XElement result = ResourceReferenceList.ToXml(list);
        XElement item = result.Elements("Item").Single();
        Assert.That(item.Attribute("type")?.Value, Is.EqualTo("project"));
        Assert.That(item.Attribute("name")?.Value, Is.EqualTo("ESV"));
        Assert.That(item.Attribute("id")?.Value, Is.EqualTo("aabbcc"));
    }

    [Test]
    public void ToXml_DblResourceReference_ProducesCorrectAttributes()
    {
        var list = new ResourceReferenceList
        {
            Items = [new DblResourceReference { Name = "UBS Greek", Id = "ddeeff" }],
        };
        XElement result = ResourceReferenceList.ToXml(list);
        XElement item = result.Elements("Item").Single();
        Assert.That(item.Attribute("type")?.Value, Is.EqualTo("dblResource"));
        Assert.That(item.Attribute("name")?.Value, Is.EqualTo("UBS Greek"));
        Assert.That(item.Attribute("id")?.Value, Is.EqualTo("ddeeff"));
    }

    [Test]
    public void ToXml_EnhancedResourceReference_HasNoIdAttribute()
    {
        var list = new ResourceReferenceList
        {
            Items = [new EnhancedResourceReference { Name = "BDAG" }],
        };
        XElement result = ResourceReferenceList.ToXml(list);
        XElement item = result.Elements("Item").Single();
        Assert.That(item.Attribute("type")?.Value, Is.EqualTo("enhancedResource"));
        Assert.That(item.Attribute("name")?.Value, Is.EqualTo("BDAG"));
        Assert.That(item.Attribute("id"), Is.Null);
    }

    [Test]
    public void ToXml_XmlResourceReference_HasNoIdAttribute()
    {
        var list = new ResourceReferenceList
        {
            Items = [new XmlResourceReference { Name = "SomeXml" }],
        };
        XElement result = ResourceReferenceList.ToXml(list);
        XElement item = result.Elements("Item").Single();
        Assert.That(item.Attribute("type")?.Value, Is.EqualTo("xmlResource"));
        Assert.That(item.Attribute("id"), Is.Null);
    }

    [Test]
    public void ToXml_SourceLanguageResourceReference_HasNoIdAttribute()
    {
        var list = new ResourceReferenceList
        {
            Items = [new SourceLanguageResourceReference { Name = "SBLGNT" }],
        };
        XElement result = ResourceReferenceList.ToXml(list);
        XElement item = result.Elements("Item").Single();
        Assert.That(item.Attribute("type")?.Value, Is.EqualTo("sourceLanguageResource"));
        Assert.That(item.Attribute("id"), Is.Null);
    }

    // --- FromXml ---

    [Test]
    public void FromXml_EmptyItemsElement_ReturnsEmptyList()
    {
        var xml = new XElement("Items");
        ResourceReferenceList result = ResourceReferenceList.FromXml(
            xml,
            ResourceReferenceList.CurrentDataVersion
        );
        Assert.That(result.Items, Is.Empty);
        Assert.That(result.DataVersion, Is.EqualTo(ResourceReferenceList.CurrentDataVersion));
    }

    [Test]
    public void FromXml_PreservesPassedDataVersion()
    {
        var xml = new XElement("Items");
        ResourceReferenceList result = ResourceReferenceList.FromXml(xml, "1.1.0");
        Assert.That(result.DataVersion, Is.EqualTo("1.1.0"));
    }

    [Test]
    public void FromXml_ProjectReferenceItem_ParsesCorrectly()
    {
        var xml = new XElement(
            "Items",
            new XElement(
                "Item",
                new XAttribute("type", "project"),
                new XAttribute("name", "ESV"),
                new XAttribute("id", "aabbcc")
            )
        );
        ResourceReferenceList result = ResourceReferenceList.FromXml(
            xml,
            ResourceReferenceList.CurrentDataVersion
        );
        Assert.That(result.Items, Has.Count.EqualTo(1));
        var item = result.Items[0] as ProjectReference;
        Assert.That(item, Is.Not.Null);
        Assert.That(item!.Name, Is.EqualTo("ESV"));
        Assert.That(item.Id, Is.EqualTo("aabbcc"));
    }

    [Test]
    public void FromXml_UnknownType_ParsesAsUnknownResourceReference()
    {
        var xml = new XElement(
            "Items",
            new XElement(
                "Item",
                new XAttribute("type", "futureType"),
                new XAttribute("name", "Future"),
                new XAttribute("extraField", "preserved")
            )
        );
        ResourceReferenceList result = ResourceReferenceList.FromXml(
            xml,
            ResourceReferenceList.CurrentDataVersion
        );
        Assert.That(result.Items, Has.Count.EqualTo(1));
        var item = result.Items[0] as UnknownResourceReference;
        Assert.That(item, Is.Not.Null);
        Assert.That(item!.Name, Is.EqualTo("Future"));
    }

    // --- Round-trip ---

    [Test]
    public void RoundTrip_AllKnownTypes_PreservesAllData()
    {
        var original = new ResourceReferenceList
        {
            Items =
            [
                new ProjectReference { Name = "Proj", Id = "aaa" },
                new DblResourceReference { Name = "DBL", Id = "bbb" },
                new EnhancedResourceReference { Name = "Enh" },
                new XmlResourceReference { Name = "Xml" },
                new SourceLanguageResourceReference { Name = "Src" },
            ],
        };
        XElement xml = ResourceReferenceList.ToXml(original);
        ResourceReferenceList result = ResourceReferenceList.FromXml(
            xml,
            ResourceReferenceList.CurrentDataVersion
        );

        Assert.That(result.Items, Has.Count.EqualTo(5));
        Assert.That(result.Items[0], Is.InstanceOf<ProjectReference>());
        Assert.That(((ProjectReference)result.Items[0]).Id, Is.EqualTo("aaa"));
        Assert.That(result.Items[1], Is.InstanceOf<DblResourceReference>());
        Assert.That(((DblResourceReference)result.Items[1]).Id, Is.EqualTo("bbb"));
        Assert.That(result.Items[2], Is.InstanceOf<EnhancedResourceReference>());
        Assert.That(((EnhancedResourceReference)result.Items[2]).Name, Is.EqualTo("Enh"));
        Assert.That(result.Items[3], Is.InstanceOf<XmlResourceReference>());
        Assert.That(result.Items[4], Is.InstanceOf<SourceLanguageResourceReference>());
    }

    // --- IsInTextCollection XML round-trip ---

    [Test]
    public void ToXml_FromXml_ProjectReference_IsInTextCollectionTrue_RoundTripsCorrectly()
    {
        var list = new ResourceReferenceList
        {
            Items = [new ProjectReference { Name = "My Project", Id = "aabbcc", IsInTextCollection = true }],
        };
        var xml = ResourceReferenceList.ToXml(list);
        var result = ResourceReferenceList.FromXml(xml, list.DataVersion);

        var item = result.Items[0] as ProjectReference;
        Assert.That(item, Is.Not.Null);
        Assert.That(item!.IsInTextCollection, Is.EqualTo(true));
    }

    [Test]
    public void ToXml_FromXml_ProjectReference_IsInTextCollectionNull_RoundTripsAsNull()
    {
        var list = new ResourceReferenceList
        {
            Items = [new ProjectReference { Name = "My Project", Id = "aabbcc" }],
        };
        var xml = ResourceReferenceList.ToXml(list);
        var result = ResourceReferenceList.FromXml(xml, list.DataVersion);

        var item = result.Items[0] as ProjectReference;
        Assert.That(item, Is.Not.Null);
        Assert.That(item!.IsInTextCollection, Is.Null);
    }

    [Test]
    public void ToXml_ProjectReference_IsInTextCollectionNull_NoAttributeInXml()
    {
        var list = new ResourceReferenceList
        {
            Items = [new ProjectReference { Name = "P", Id = "abc" }],
        };
        var xml = ResourceReferenceList.ToXml(list);
        var itemEl = xml.Elements("Item").First();
        Assert.That(itemEl.Attribute("isInTextCollection"), Is.Null);
    }

    [Test]
    public void ToXml_FromXml_EnhancedResourceReference_IsInTextCollectionTrue_RoundTripsCorrectly()
    {
        var list = new ResourceReferenceList
        {
            Items = [new EnhancedResourceReference { Name = "BDAG", IsInTextCollection = true }],
        };
        var xml = ResourceReferenceList.ToXml(list);
        var result = ResourceReferenceList.FromXml(xml, list.DataVersion);

        var item = result.Items[0] as EnhancedResourceReference;
        Assert.That(item, Is.Not.Null);
        Assert.That(item!.IsInTextCollection, Is.EqualTo(true));
    }

    [Test]
    public void ToXml_FromXml_XmlResourceReference_IsInTextCollectionFalse_RoundTripsCorrectly()
    {
        var list = new ResourceReferenceList
        {
            Items = [new XmlResourceReference { Name = "SomeXml", IsInTextCollection = false }],
        };
        var xml = ResourceReferenceList.ToXml(list);
        var result = ResourceReferenceList.FromXml(xml, list.DataVersion);

        var item = result.Items[0] as XmlResourceReference;
        Assert.That(item, Is.Not.Null);
        Assert.That(item!.IsInTextCollection, Is.EqualTo(false));
    }

    [Test]
    public void ToXml_FromXml_SourceLanguageResourceReference_IsInTextCollectionTrue_RoundTripsCorrectly()
    {
        var list = new ResourceReferenceList
        {
            Items = [new SourceLanguageResourceReference { Name = "Greek", IsInTextCollection = true }],
        };
        var xml = ResourceReferenceList.ToXml(list);
        var result = ResourceReferenceList.FromXml(xml, list.DataVersion);

        var item = result.Items[0] as SourceLanguageResourceReference;
        Assert.That(item, Is.Not.Null);
        Assert.That(item!.IsInTextCollection, Is.EqualTo(true));
    }

    [Test]
    public void RoundTrip_UnknownType_PreservesExtraAttributes()
    {
        var original = new XElement(
            "Items",
            new XElement(
                "Item",
                new XAttribute("type", "futureType"),
                new XAttribute("name", "Future"),
                new XAttribute("extraField", "preserved")
            )
        );
        ResourceReferenceList parsed = ResourceReferenceList.FromXml(
            original,
            ResourceReferenceList.CurrentDataVersion
        );
        XElement roundTripped = ResourceReferenceList.ToXml(parsed);
        // All original attributes must survive the round-trip
        XElement item = roundTripped.Elements("Item").Single();
        Assert.That(item.Attribute("type")?.Value, Is.EqualTo("futureType"));
        Assert.That(item.Attribute("name")?.Value, Is.EqualTo("Future"));
        Assert.That(item.Attribute("extraField")?.Value, Is.EqualTo("preserved"));
    }
}
