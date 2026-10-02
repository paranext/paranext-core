using System.Diagnostics.CodeAnalysis;
using System.Text.Json;
using Paranext.DataProvider.JsonUtils;
using Paranext.DataProvider.Projects.SendReceive;

namespace TestParanextDataProvider.Projects.SendReceive
{
    /// <summary>
    /// Unit tests for <see cref="UnsyncedChangesState"/>: value equality over both project id sets
    /// and the camelCase wire shape.
    /// </summary>
    [TestFixture]
    [ExcludeFromCodeCoverage]
    internal class UnsyncedChangesStateTests
    {
        [Test]
        public void Equals_IgnoresOrderAndCase_OnBothSets() =>
            Assert.That(
                new UnsyncedChangesState(new[] { "a", "B" }, new[] { "c" }),
                Is.EqualTo(new UnsyncedChangesState(new[] { "b", "A" }, new[] { "C" }))
            );

        [Test]
        public void Equals_DifferentToReceive_AreNotEqual() =>
            Assert.That(
                new UnsyncedChangesState(new[] { "a" }, new[] { "c" }),
                Is.Not.EqualTo(new UnsyncedChangesState(new[] { "a" }, Array.Empty<string>()))
            );

        [Test]
        public void Equals_SetsAreNotInterchangeable() =>
            Assert.That(
                new UnsyncedChangesState(new[] { "a" }, Array.Empty<string>()),
                Is.Not.EqualTo(new UnsyncedChangesState(Array.Empty<string>(), new[] { "a" }))
            );

        [Test]
        public void GetHashCode_EqualStates_Match() =>
            Assert.That(
                new UnsyncedChangesState(new[] { "a", "b" }, new[] { "c" }).GetHashCode(),
                Is.EqualTo(
                    new UnsyncedChangesState(new[] { "B", "A" }, new[] { "C" }).GetHashCode()
                )
            );

        [Test]
        public void Empty_HasNoProjects()
        {
            Assert.That(UnsyncedChangesState.Empty.ToSend, Is.Empty);
            Assert.That(UnsyncedChangesState.Empty.ToReceive, Is.Empty);
        }

        [Test]
        public void SerializesToCamelCaseWireShape()
        {
            var json = JsonSerializer.Serialize(
                new UnsyncedChangesState(new[] { "PROJ1" }, new[] { "PROJ2" }),
                SerializationOptions.CreateSerializationOptions()
            );
            Assert.That(json, Is.EqualTo("{\"toSend\":[\"PROJ1\"],\"toReceive\":[\"PROJ2\"]}"));
        }
    }
}
