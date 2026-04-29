using System.Collections.Generic;

namespace MarbleSchemaExtractor.Pocos
{
    public static class MarbleTextData // REVIEW: What is the point of this outer class
    {
        #region EmdrosDatabase class
        public class EmdrosDatabase
        {
            public string db_kind { get; set; }
            public string db_name { get; set; }
        }
        #endregion

        #region EmdrosInput class
        public class EmdrosInput
        {
            public EmdrosDatabase db { get; set; }
            public string interface_language { get; set; } = "eng";
            public string locator_kind { get; set; }
            public List<string> locator_list { get; set; }
            public string stylesheet_kind { get; set; }
            public string stylesheet_name { get; set; }
            public int first_monad { get; set; }
            public int last_monad { get; set; }
        }
        #endregion

        #region EmdrosOutput class
        public class EmdrosOutput
        {
            public bool success { get; set; } = false;
            public List<EmdrosResult> result_list { get; set; }
        }
        #endregion

        #region EmdrosResult class
        public class EmdrosResult
        {
            public EmdrosResultType locateandrender_result { get; set; }
            public EmdrosResultType locate_result { get; set; }
            public EmdrosResultType render_result { get; set; }
        }
        #endregion

        #region EmdrosResultType class
        public class EmdrosResultType
        {
            public EmdrosResultParameters parameters { get; set; }
            public string locator_kind { get; set; }
            public string locator { get; set; }
            public string result { get; set; }
        }
        #endregion

        #region EmdrosResultParameters class
        public class EmdrosResultParameters
        {
            public EmdrosDatabase db { get; set; }
            public string stylesheet_kind { get; set; }
            public string stylesheet_name { get; set; }
            public int first_monad { get; set; }
            public int last_monad { get; set; }
        }
        #endregion
    }
}
