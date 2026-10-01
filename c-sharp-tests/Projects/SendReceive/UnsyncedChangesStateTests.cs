using System.Diagnostics.CodeAnalysis;
using System.Text.Json;
using Paranext.DataProvider.JsonUtils;
using Paranext.DataProvider.Projects.SendReceive;

namespace TestParanextDataProvider.Projects.SendReceive
{
    /// <summary>
    /// Unit tests for <see cref="UnsyncedChangesState"/>: value equality over the project id set and
    /// the camelCase wire shape.
    /// </summary>
    [TestFixture]
    [ExcludeFromCodeCoverage]
    internal class UnsyncedChangesStateTests
    {
        [Test]
        public void Equals_IgnoresOrderAndCase() =>
            Assert.That(
                new UnsyncedChangesState(new[] { "a", "B" }),
                Is.EqualTo(new UnsyncedChangesState(new[] { "b", "A" }))
            );

        [Test]
        public void Equals_DifferentSets_AreNotEqual() =>
            Assert.That(
                new UnsyncedChangesState(new[] { "a" }),
                Is.Not.EqualTo(new UnsyncedChangesState(new[] { "a", "b" }))
            );

        [Test]
        public void GetHashCode_EqualSets_Match() =>
            Assert.That(
                new UnsyncedChangesState(new[] { "a", "b" }).GetHashCode(),
                Is.EqualTo(new UnsyncedChangesState(new[] { "B", "A" }).GetHashCode())
            );

        [Test]
        public void SerializesToCamelCaseWireShape()
        {
            var json = JsonSerializer.Serialize(
                new UnsyncedChangesState(new[] { "PROJ1" }),
                SerializationOptions.CreateSerializationOptions()
            );
            Assert.That(json, Is.EqualTo("{\"projectIds\":[\"PROJ1\"]}"));
        }
    }
}
