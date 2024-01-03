using Paranext.DataProvider.JsonUtils;

namespace TestParanextDataProvider.JsonUtils
{
    internal class TupleTreeTests
    {
        private static List<(string key, string val)> ConvertStringsToTuples(params string[] pairs)
        {
            var retVal = new List<(string key, string val)>();
            if (pairs.Length % 2 != 0)
                throw new ArgumentException("keys and values must be provided in pairs");
            for (int i = 0; i < pairs.Length; i += 2)
            {
                retVal.Add((pairs[i], pairs[i + 1]));
            }
            return retVal;
        }

        [TestCase(new[] { "a", "b" }, new[] { "2" })]
        [TestCase(new[] { "a", "b", "c", "d" }, new[] { "2" })]
        [TestCase(new[] { "a", "b", "c", "d", "e", "f" }, new[] { "3" })]
        [TestCase(new[] { "g", "h" }, new[] { "1" })]
        [TestCase(new[] { "y", "z" }, new[] { "4" })]
        [TestCase(new[] { "a", "b", "y", "z" }, new[] { "2", "4" })]
        [TestCase(new[] { "a", "b", "c", "d", "y", "z" }, new[] { "2", "4" })]
        [TestCase(new[] { "a", "b", "c", "d", "e", "f", "y", "z" }, new[] { "3", "4" })]
        [TestCase(new string[0], new[] { "1" })]
        public void TupleTree_FindAllResults_IsAccurate(string[] nameValuePairs, string[] expected)
        {
            var tree = new TupleTree<string, string, string>("1");
            var values = new List<(string val1, string val2)> { ("a", "b") };
            tree.Add(values, "2");
            values = new List<(string val1, string val2)> { ("a", "b"), ("c", "d"), ("e", "f") };
            tree.Add(values, "3");
            values = new List<(string val1, string val2)> { ("y", "z") };
            tree.Add(values, "4");
            var results = tree.FindAllResults(ConvertStringsToTuples(nameValuePairs));
            var resultsList = results.ToArray();
            Assert.That(resultsList, Is.EquivalentTo(expected));
        }
    }
}
